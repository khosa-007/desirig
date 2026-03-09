import type { Metadata } from "next";
import { getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";
import { TopTruckingCompaniesContent } from "./blog-content";

const post = getBlogPost("top-trucking-companies-brampton")!;

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

export const revalidate = 86400;

export default async function BlogPost() {
  const supabase = await createClient();

  // Get Brampton city ID
  const { data: city } = await supabase
    .from("cities")
    .select("id")
    .eq("slug", "brampton-on")
    .single();

  // Get trucking company category
  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", "trucking-company")
    .single();

  let topCompanies: {
    name: string;
    slug: string;
    google_rating: number | null;
    google_review_count: number | null;
    phone: string | null;
    is_desi_owned: boolean | null;
  }[] = [];

  if (city && category) {
    const { data } = await supabase
      .from("businesses")
      .select("name, slug, google_rating, google_review_count, phone, is_desi_owned")
      .eq("city_id", city.id)
      .eq("category_id", category.id)
      .not("google_rating", "is", null)
      .gte("google_rating", 4.0)
      .order("google_rating", { ascending: false })
      .limit(15);
    topCompanies = data ?? [];
  }

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
      <TopTruckingCompaniesContent
        title={post.title}
        description={post.description}
        date={post.date}
        readTime={post.readTime}
        topCompanies={topCompanies}
      />
    </>
  );
}
