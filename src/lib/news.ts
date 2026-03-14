// Fetch trucking news from RSS feeds (server-side only)

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description: string;
  lang: "en" | "pa";
}

const RSS_FEEDS: { url: string; source: string; lang: "en" | "pa" }[] = [
  { url: "https://www.trucknews.com/feed/", source: "Truck News", lang: "en" },
  { url: "https://www.todaystrucking.com/feed/", source: "Today's Trucking", lang: "en" },
  { url: "https://5abinews.com/feed/", source: "5abi News", lang: "pa" },
  { url: "https://ptcnews.tv/feed/", source: "PTC News", lang: "pa" },
  { url: "https://rozanaspokesman.com/feed/", source: "Rozana Spokesman", lang: "pa" },
];

function extractCDATA(text: string): string {
  return text.replace(new RegExp("<!\\[CDATA\\[(.*?)\\]\\]>", "gs"), "$1").replace(/<[^>]+>/g, "").trim();
}

async function fetchRSS(feedUrl: string, source: string, lang: "en" | "pa"): Promise<NewsItem[]> {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 1800 } }); // cache 30 min
    if (!res.ok) return [];
    const xml = await res.text();

    const items: NewsItem[] = [];
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/gi) ?? [];

    for (const itemXml of itemMatches.slice(0, 10)) {
      const title = extractCDATA(itemXml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
      const link = itemXml.match(/<link>([\s\S]*?)<\/link>/i)?.[1]?.trim() ?? "";
      const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1]?.trim() ?? "";
      const desc = extractCDATA(
        itemXml.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? ""
      ).slice(0, 200);

      if (title && link) {
        items.push({ title, link, pubDate, source, description: desc, lang });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export async function getTruckingNews(limit = 15): Promise<NewsItem[]> {
  const feeds = await Promise.all(
    RSS_FEEDS.map((f) => fetchRSS(f.url, f.source, f.lang))
  );

  const all = feeds.flat();

  // Sort by date, newest first
  all.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return all.slice(0, limit);
}

export async function getTruckingNewsByLang(lang: "en" | "pa", limit = 15): Promise<NewsItem[]> {
  const all = await getTruckingNews(50);
  return all.filter((item) => item.lang === lang).slice(0, limit);
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
