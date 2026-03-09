import type { Metadata } from "next";
import Link from "next/link";
import { Star, MapPin, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Top Rated Businesses — Highest Rated Desi Businesses in Canada",
  description:
    "The highest-rated Desi businesses across Canada based on Google reviews. Trucking companies, restaurants, grocery stores, and more.",
  alternates: { canonical: "https://desirig.com/top-rated" },
};

export const revalidate = 86400;

export default async function TopRatedPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("businesses")
    .select(
      "id, name, slug, phone, address, google_rating, google_review_count, is_desi_owned, categories(name, slug), cities(name, slug, province)"
    )
    .not("google_rating", "is", null)
    .gte("google_rating", 4.5)
    .gte("google_review_count", 10)
    .order("google_review_count", { ascending: false })
    .limit(50);

  const businesses = data ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Top Rated Businesses
        </h1>
        <p className="mt-1 text-muted-foreground">
          The highest-rated Desi businesses in Canada (4.5+ stars, 10+ reviews)
        </p>
      </div>

      <div className="space-y-3">
        {businesses.map((biz, i) => {
          const city = biz.cities as unknown as {
            name: string;
            slug: string;
            province: string;
          } | null;
          const cat = biz.categories as unknown as {
            name: string;
            slug: string;
          } | null;

          return (
            <Link
              key={biz.id}
              href={`/${city?.slug ?? ""}/${cat?.slug ?? ""}/${biz.slug}`}
              className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-semibold group-hover:text-orange-600">
                    {biz.name}
                  </h2>
                  {biz.is_desi_owned && (
                    <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                      Desi
                    </span>
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
                  {cat && <span>{cat.name}</span>}
                  {city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {city.name}, {city.province}
                    </span>
                  )}
                  {biz.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {biz.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-50 px-3 py-1.5 text-sm font-bold text-orange-700">
                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                {biz.google_rating?.toFixed(1)}
                <span className="text-xs font-normal text-orange-500">
                  ({biz.google_review_count})
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
