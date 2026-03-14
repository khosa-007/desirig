import { NextRequest, NextResponse } from "next/server";
import { getTruckingNewsByRegion } from "@/lib/news";

export const revalidate = 300; // ISR: 5 minutes

export async function GET(request: NextRequest) {
  // Detect country from Vercel geo headers, query param, or default to CA
  const country =
    request.nextUrl.searchParams.get("country") ??
    request.headers.get("x-vercel-ip-country") ??
    "CA";

  const news = await getTruckingNewsByRegion(country, 20);
  return NextResponse.json(news);
}
