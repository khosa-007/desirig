import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { createHash } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Hash IP for rate limiting (don't store raw IPs)
function hashIP(ip: string): string {
  return createHash("sha256").update(ip + (process.env.SUPABASE_SERVICE_ROLE_KEY || "")).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { business_id, reviewer_name, email, rating, comment, is_driver, honeypot, load_time } = body;

    // --- Bot checks ---
    if (honeypot) {
      // Honeypot filled = bot. Return fake success so bot thinks it worked.
      return NextResponse.json({ success: true });
    }

    if (load_time && Date.now() - load_time < 3000) {
      return NextResponse.json({ error: "Too fast. Please wait a moment." }, { status: 429 });
    }

    // --- Validation ---
    if (!business_id || typeof business_id !== "string") {
      return NextResponse.json({ error: "Invalid business." }, { status: 400 });
    }

    const trimmedName = (reviewer_name || "").trim();
    if (!trimmedName || trimmedName.length > 50) {
      return NextResponse.json({ error: "Name is required (max 50 chars)." }, { status: 400 });
    }

    const trimmedEmail = (email || "").trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json({ error: "Rating must be 1-5." }, { status: 400 });
    }

    const trimmedComment = (comment || "").trim().slice(0, 500);

    // --- Rate limiting: max 3 reviews per email per day ---
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: emailCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("email", trimmedEmail)
      .gte("created_at", oneDayAgo);

    if ((emailCount ?? 0) >= 3) {
      return NextResponse.json(
        { error: "You've reached the review limit for today. Try again tomorrow." },
        { status: 429 }
      );
    }

    // --- Duplicate check: same email + same business ---
    const { count: dupeCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("email", trimmedEmail)
      .eq("business_id", business_id);

    if ((dupeCount ?? 0) > 0) {
      return NextResponse.json(
        { error: "You've already reviewed this business." },
        { status: 409 }
      );
    }

    // --- IP rate limiting: max 5 reviews per IP per day ---
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
    const ipHash = hashIP(ip);

    const { count: ipCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneDayAgo);

    if ((ipCount ?? 0) >= 5) {
      return NextResponse.json(
        { error: "Too many reviews from this location today." },
        { status: 429 }
      );
    }

    // --- Check business exists ---
    const { data: business } = await supabase
      .from("businesses")
      .select("id")
      .eq("id", business_id)
      .maybeSingle();

    if (!business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    // --- Insert review ---
    // If Resend API key is configured, set status to 'pending' and send verification email
    // Otherwise, auto-verify (still requires email for rate limiting / duplicate prevention)
    const hasResend = !!process.env.RESEND_API_KEY;
    const verificationToken = hasResend ? randomUUID() : null;

    const { error: dbError } = await supabase.from("reviews").insert({
      business_id,
      reviewer_name: trimmedName,
      email: trimmedEmail,
      rating,
      comment: trimmedComment || null,
      is_driver: !!is_driver,
      status: hasResend ? "pending" : "verified",
      verification_token: verificationToken,
      verified_at: hasResend ? null : new Date().toISOString(),
      ip_hash: ipHash,
    });

    if (dbError) {
      console.error("Review insert error:", dbError);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }

    // --- Send verification email if Resend is configured ---
    if (hasResend && verificationToken) {
      try {
        const { resend } = await import("@/lib/resend");
        await resend.emails.send({
          from: "DesiRig <noreply@desirig.com>",
          to: trimmedEmail,
          subject: "Verify your DesiRig review",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #ea580c;">Verify your review on DesiRig</h2>
              <p>Hi ${trimmedName},</p>
              <p>Click the button below to publish your review:</p>
              <a href="https://desirig.com/api/reviews/verify?token=${verificationToken}"
                 style="display: inline-block; background: #ea580c; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                Verify & Publish Review
              </a>
              <p style="color: #666; font-size: 14px; margin-top: 24px;">
                If you didn't write this review, just ignore this email.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email send error:", emailError);
        // Review is saved as pending — they can try again or we can retry later
      }
    }

    return NextResponse.json({
      success: true,
      needsVerification: hasResend,
      message: hasResend
        ? "Check your email to verify your review."
        : "Review posted successfully!",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
