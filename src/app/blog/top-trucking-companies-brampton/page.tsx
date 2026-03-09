import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Star, Shield, MapPin } from "lucide-react";
import { getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";

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
  // Fetch real data — top rated trucking companies in Brampton
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
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">Brampton Trucking</span>
      </nav>

      <header>
        <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
          Trucking
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {post.date} &middot; {post.readTime}
        </p>
      </header>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          Brampton is the trucking capital of Canada. With over 50% South Asian
          population, it&apos;s home to hundreds of trucking companies. But
          which ones are actually good? We pulled the data.
        </p>

        <p>
          Below are the highest-rated trucking companies in Brampton based on
          Google reviews. These ratings come from real customers — not paid
          placements.
        </p>

        {topCompanies.length > 0 ? (
          <div className="space-y-3">
            {topCompanies.map((company, i) => (
              <Link
                key={company.slug}
                href={`/brampton-on/trucking-company/${company.slug}`}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground truncate">
                    {company.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-3 text-sm">
                    {company.google_rating && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                        {company.google_rating.toFixed(1)}
                        {company.google_review_count && (
                          <span className="text-xs text-muted-foreground">
                            ({company.google_review_count})
                          </span>
                        )}
                      </span>
                    )}
                    {company.is_desi_owned && (
                      <span className="text-xs text-green-600">Desi Owned</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border bg-muted/40 p-6 text-center">
            Loading top companies...
          </p>
        )}

        <h2 className="text-xl font-semibold text-foreground pt-4">
          How We Ranked These Companies
        </h2>
        <p>
          We sorted by Google rating (4.0+) from real customer reviews. We
          didn&apos;t accept payment for placement. The data updates
          automatically.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Before You Sign On
        </h2>
        <p>
          A high Google rating is a good start, but always check the
          company&apos;s{" "}
          <Link href="/safety" className="text-orange-600 hover:underline">
            safety record
          </Link>{" "}
          too. Ask for the DOT number and look up their safety rating, fleet
          size, and crash history.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/brampton-on/trucking-company">
            <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <MapPin className="h-4 w-4 text-orange-500" />
              All Brampton Trucking Companies
            </div>
          </Link>
          <Link href="/safety">
            <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Shield className="h-4 w-4 text-green-600" />
              Safety Lookup
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
