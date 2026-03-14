import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Business name is required" }, { status: 400 });
    }
    if (!body.city?.trim()) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("submissions").insert({
      type: body.type || "business",
      name: body.name.trim(),
      category: body.category?.trim() || null,
      address: body.address?.trim() || null,
      city: body.city.trim(),
      province_state: body.province_state?.trim() || null,
      country: body.country || "CA",
      phone: body.phone?.trim() || null,
      website: body.website?.trim() || null,
      is_desi_owned: body.is_desi_owned ?? false,
      has_desi_food: body.has_desi_food ?? false,
      languages: body.languages?.trim() || null,
      submitter_name: body.submitter_name?.trim() || null,
      submitter_email: body.submitter_email?.trim() || null,
      description: body.description?.trim() || null,
      status: "pending",
    });

    if (error) {
      console.error("Submission error:", error);
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
