import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block all known scrapers and AI bots
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Bytespider",
          "PetalBot",
          "SemrushBot",
          "AhrefsBot",
          "MJ12bot",
          "DotBot",
          "Scrapy",
          "wget",
          "curl",
        ],
        disallow: "/",
      },
      {
        // Default: allow search engines, block everything else from scraping
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search?"],
      },
    ],
    sitemap: "https://desirig.com/sitemap.xml",
  };
}
