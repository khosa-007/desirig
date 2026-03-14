import { NextResponse } from "next/server";
import { getTruckingNews } from "@/lib/news";

export const revalidate = 300; // ISR: 5 minutes

export async function GET() {
  const news = await getTruckingNews(20);
  return NextResponse.json(news);
}
