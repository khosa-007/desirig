import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink, Newspaper, Clock } from "lucide-react";
import { getTruckingNews, timeAgo } from "@/lib/news";

export const revalidate = 1800; // refresh every 30 min

export const metadata: Metadata = {
  title: "Trucking News | Live Industry Updates",
  description:
    "Live trucking news from across Canada. Safety updates, regulations, fuel prices, industry trends. Stay informed on the road.",
  alternates: {
    canonical: "https://desirig.com/news",
  },
};

export default async function NewsPage() {
  const news = await getTruckingNews(20);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">News</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Newspaper className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Trucking News
          </h1>
          <p className="text-sm text-muted-foreground">
            Live updates from across the industry. Refreshes every 30 minutes.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {news.length > 0 ? (
          news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border bg-card p-5 transition-all hover:border-orange-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h2 className="font-semibold leading-snug group-hover:text-[#FF6E40]">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                      {item.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo(item.pubDate)}
                    </span>
                  </div>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[#FF6E40]" />
              </div>
            </a>
          ))
        ) : (
          <div className="rounded-xl border bg-muted/30 p-8 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">
              News feed is loading. Check back in a few minutes.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>
          News sourced from Canadian trucking publications.
          DesiRig does not control or endorse external content.
        </p>
      </div>
    </div>
  );
}
