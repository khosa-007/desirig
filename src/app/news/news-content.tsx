"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, Newspaper, Clock } from "lucide-react";
import type { NewsItem } from "@/lib/news";
import { timeAgo } from "@/lib/news";

type LangFilter = "all" | "en" | "pa";

export function NewsContent({ news }: { news: NewsItem[] }) {
  const [filter, setFilter] = useState<LangFilter>("all");

  const filtered = filter === "all" ? news : news.filter((item) => item.lang === filter);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">News</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC15]/10">
          <Newspaper className="h-6 w-6 text-[#FACC15]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Trucking News
          </h1>
          <p className="text-sm text-muted-foreground">
            Live updates from Canadian trucking and Punjabi media. Refreshes every 30 minutes.
          </p>
        </div>
      </div>

      {/* Language filter tabs */}
      <div className="mt-6 flex gap-2">
        {([
          { value: "all" as const, label: "All" },
          { value: "en" as const, label: "English" },
          { value: "pa" as const, label: "ਪੰਜਾਬੀ" },
        ]).map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-[#FACC15] text-black"
                : "bg-[#1A1A1A] text-gray-400 hover:bg-[#333] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border bg-card p-5 transition-all hover:border-[#FACC15]/50 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h2 className="font-semibold leading-snug group-hover:text-[#FACC15]">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={`rounded-full px-2 py-0.5 font-medium ${
                      item.lang === "pa"
                        ? "bg-[#FACC15]/20 text-[#FACC15]"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {item.lang === "pa" ? "ਪੰਜਾਬੀ" : "English"}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                      {item.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {timeAgo(item.pubDate)}
                    </span>
                  </div>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[#FACC15]" />
              </div>
            </a>
          ))
        ) : (
          <div className="rounded-xl border bg-muted/30 p-8 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-muted-foreground">
              No news found for this filter. Try &quot;All&quot; to see everything.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>
          News sourced from Canadian trucking and Punjabi publications.
          DesiRig does not control or endorse external content.
        </p>
      </div>
    </div>
  );
}
