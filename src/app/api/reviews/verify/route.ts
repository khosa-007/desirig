import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/?error=invalid-token", req.url));
  }

  // Find the pending review with this token
  const { data: review, error } = await supabase
    .from("reviews")
    .select("id, status")
    .eq("verification_token", token)
    .maybeSingle();

  if (error || !review) {
    return NextResponse.redirect(new URL("/?error=invalid-token", req.url));
  }

  if (review.status === "verified") {
    // Already verified — redirect to success
    return NextResponse.redirect(new URL("/?review=already-verified", req.url));
  }

  // Verify the review
  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      status: "verified",
      verified_at: new Date().toISOString(),
      verification_token: null, // Clear token after use
    })
    .eq("id", review.id);

  if (updateError) {
    return NextResponse.redirect(new URL("/?error=verification-failed", req.url));
  }

  return NextResponse.redirect(new URL("/?review=verified", req.url));
}
