import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTruckingNewsByRegion } from "@/lib/news";
import { LiveNewsTicker } from "@/components/live-news-ticker";
import { NewsContent } from "./news-content";

export const revalidate = 1800; // refresh every 30 min

export const metadata: Metadata = {
  title: "Trucking News | Live Industry Updates | English & Punjabi",
  description:
    "Live trucking news from your region and Punjabi media. Safety updates, regulations, fuel prices, industry trends. Stay informed on the road.",
  alternates: {
    canonical: "https://desirig.com/news",
  },
};

export default async function NewsPage() {
  const hdrs = await headers();
  const country = hdrs.get("x-vercel-ip-country") ?? "CA";
  const news = await getTruckingNewsByRegion(country, 30);

  return (
    <>
      <LiveNewsTicker initialNews={news} />
      <NewsContent news={news} country={country} />
    </>
  );
}
