import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";
import { BestTruckStopsContent } from "./blog-content";

const post = getBlogPost("best-truck-stops-ontario")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://desirig.com/blog/${post.slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
  },
};

export default async function BlogPost() {
  const supabase = await createClient();

  // Fetch real truck stops in Ontario from our database
  const { data: rawTruckStops } = await supabase
    .from("businesses")
    .select("name, slug, address, google_rating, google_review_count, city_id, category_id, cities(slug, name), categories(slug)")
    .eq("province", "ON")
    .ilike("categories.name", "%truck stop%")
    .not("google_rating", "is", null)
    .gte("google_rating", 4.0)
    .order("google_review_count", { ascending: false })
    .limit(15);

  // Normalize the joined data for the client component
  const truckStops = (rawTruckStops ?? []).map((stop) => ({
    name: stop.name,
    slug: stop.slug,
    address: stop.address,
    google_rating: stop.google_rating,
    google_review_count: stop.google_review_count,
    city_id: stop.city_id,
    category_id: stop.category_id,
    cities: stop.cities as unknown as { slug: string; name: string } | null,
    categories: stop.categories as unknown as { slug: string } | null,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "DesiRig",
      url: "https://desirig.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BestTruckStopsContent
        title={post.title}
        description={post.description}
        date={post.date}
        readTime={post.readTime}
        truckStops={truckStops}
      />
    </>
  );
}
