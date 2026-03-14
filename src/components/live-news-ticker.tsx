"use client";

import { useEffect, useState, useRef } from "react";
import type { NewsItem } from "@/lib/news";

export function LiveNewsTicker({ initialNews }: { initialNews: NewsItem[] }) {
  const [news, setNews] = useState(initialNews);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Refresh news every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        }
      } catch {
        // silent fail — keep showing old news
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="relative overflow-hidden border-y border-[#333] bg-[#0a0a0a]">
      <div className="flex items-center">
        {/* LIVE badge */}
        <div className="z-10 flex shrink-0 items-center gap-1.5 bg-[#0a0a0a] px-3 py-2.5">
          <span className="live-pulse inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">
            Live
          </span>
        </div>

        {/* Scrolling ticker */}
        <div
          ref={tickerRef}
          className="ticker-container flex-1 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="ticker-scroll flex items-center gap-8 whitespace-nowrap"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {/* Double the items for seamless loop */}
            {[...news, ...news].map((item, i) => (
              <a
                key={`${item.link}-${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm text-gray-300 transition-colors hover:text-[#FACC15]"
              >
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  item.region === "CA"
                    ? "bg-red-500/20 text-red-400"
                    : item.region === "US"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-[#FACC15]/20 text-[#FACC15]"
                }`}>
                  {item.region === "CA" ? "🇨🇦" : item.region === "US" ? "🇺🇸" : "ਪੰਜਾਬੀ"}
                </span>
                <span className="max-w-[300px] truncate sm:max-w-none">
                  {item.title}
                </span>
                <span className="text-xs text-gray-600">
                  {item.source}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
