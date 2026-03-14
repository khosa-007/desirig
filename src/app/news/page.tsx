import type { Metadata } from "next";
import { getTruckingNews } from "@/lib/news";
import { LiveNewsTicker } from "@/components/live-news-ticker";
import { NewsContent } from "./news-content";

export const revalidate = 1800; // refresh every 30 min

export const metadata: Metadata = {
  title: "Trucking News | Live Industry Updates | English & Punjabi",
  description:
    "Live trucking news from across Canada and Punjabi media. Safety updates, regulations, fuel prices, industry trends. Stay informed on the road.",
  alternates: {
    canonical: "https://desirig.com/news",
  },
};

export default async function NewsPage() {
  const news = await getTruckingNews(30);

  return (
    <>
      <LiveNewsTicker initialNews={news} />
      <NewsContent news={news} />
    </>
  );
}
