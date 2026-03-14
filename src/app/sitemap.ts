import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { blogPosts } from "@/lib/blog";
import { provinces } from "@/lib/provinces";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = "https://desirig.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/cities`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/safety`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/search`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/fuel-cost-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/weight-limits`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/hos-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/speed-fuel-savings`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/license-quiz`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/truck-parking`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/tools/weigh-scales`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/tools/border-times`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/tools/trip-planner`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/fuel-prices`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/news`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/top-rated`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/desi-owned`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/submit`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.2 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.2 },
  ];

  // City pages — /brampton-on, /surrey-bc, etc.
  const { data: cities } = await supabase
    .from("cities")
    .select("slug, listing_count")
    .order("listing_count", { ascending: false });

  const cityPages: MetadataRoute.Sitemap = (cities ?? []).map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    changeFrequency: "weekly" as const,
    priority: city.listing_count > 100 ? 0.8 : 0.6,
  }));

  // Category pages — /categories/trucking-company, etc.
  const { data: categories } = await supabase
    .from("categories")
    .select("slug");

  const categoryPages: MetadataRoute.Sitemap = (categories ?? []).map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // City × Category combo pages (programmatic SEO gold)
  // Only include combos that actually have listings
  const { data: combos } = await supabase
    .from("businesses")
    .select("city_id, category_id")
    .not("city_id", "is", null);

  // Count unique combos
  const comboSet = new Set<string>();
  (combos ?? []).forEach((row) => {
    if (row.city_id && row.category_id) {
      comboSet.add(`${row.city_id}-${row.category_id}`);
    }
  });

  // Build city and category lookup maps
  const cityMap = new Map<number, string>();
  (cities ?? []).forEach((c) => {
    // We need the id too — fetch it
  });

  // Fetch cities with IDs
  const { data: citiesWithId } = await supabase
    .from("cities")
    .select("id, slug");
  const cityIdToSlug = new Map<number, string>();
  (citiesWithId ?? []).forEach((c) => cityIdToSlug.set(c.id, c.slug));

  const { data: catsWithId } = await supabase
    .from("categories")
    .select("id, slug");
  const catIdToSlug = new Map<number, string>();
  (catsWithId ?? []).forEach((c) => catIdToSlug.set(c.id, c.slug));

  const comboPages: MetadataRoute.Sitemap = [];
  comboSet.forEach((key) => {
    const [cityId, catId] = key.split("-").map(Number);
    const citySlug = cityIdToSlug.get(cityId);
    const catSlug = catIdToSlug.get(catId);
    if (citySlug && catSlug) {
      comboPages.push({
        url: `${baseUrl}/${citySlug}/${catSlug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  });

  // Top business detail pages (only top-rated ones to stay under sitemap limits)
  // Google will discover the rest via internal links
  const { data: topBusinesses } = await supabase
    .from("businesses")
    .select("slug, city_id, category_id, google_rating")
    .not("google_rating", "is", null)
    .gte("google_rating", 4.0)
    .order("google_rating", { ascending: false })
    .limit(10000);

  const businessPages: MetadataRoute.Sitemap = (topBusinesses ?? [])
    .map((biz) => {
      const citySlug = cityIdToSlug.get(biz.city_id ?? 0);
      const catSlug = catIdToSlug.get(biz.category_id);
      if (!citySlug || !catSlug) return null;
      return {
        url: `${baseUrl}/${citySlug}/${catSlug}/${biz.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  // Province pages
  const provincePages: MetadataRoute.Sitemap = Object.values(provinces).map((p) => ({
    url: `${baseUrl}/province/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    { url: `${baseUrl}/province`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...provincePages,
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    ...blogPages,
    ...cityPages,
    ...categoryPages,
    ...comboPages,
    ...businessPages,
  ];
}
