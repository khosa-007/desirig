import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { getCategoryBySlug } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: `${category.name} | Browse by City`,
    description: `Find ${category.name.toLowerCase()} across Canada. Browse by city on DesiRig.`,
    alternates: {
      canonical: `https://desirig.com/categories/${slug}`,
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  // Get cities that have businesses in this category with counts
  const supabase = await createClient();
  const { data: cityData } = await supabase
    .from("businesses")
    .select("city_id")
    .eq("category_id", category.id)
    .not("city_id", "is", null);

  // Count per city_id
  const countMap = new Map<number, number>();
  (cityData ?? []).forEach((row) => {
    if (row.city_id) countMap.set(row.city_id, (countMap.get(row.city_id) || 0) + 1);
  });

  // Fetch city details
  const cityIds = Array.from(countMap.keys());
  const { data: cityRecords } = cityIds.length > 0
    ? await supabase.from("cities").select("id, name, slug, province").in("id", cityIds)
    : { data: [] };

  const cities = (cityRecords ?? [])
    .map((c) => ({ ...c, count: countMap.get(c.id) || 0 }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/categories" className="hover:text-foreground">Categories</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        {category.name}
      </h1>
      <p className="mt-1 text-muted-foreground">
        {cities.reduce((s, c) => s + c.count, 0)} listings across {cities.length} cities
      </p>

      {/* Group by province */}
      {(() => {
        const byProvince = new Map<string, typeof cities>();
        cities.forEach((c) => {
          const list = byProvince.get(c.province) ?? [];
          list.push(c);
          byProvince.set(c.province, list);
        });
        // Sort provinces by total count
        const sorted = Array.from(byProvince.entries()).sort(
          (a, b) => b[1].reduce((s, c) => s + c.count, 0) - a[1].reduce((s, c) => s + c.count, 0)
        );
        return sorted.map(([province, provinceCities]) => (
          <div key={province} className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">{province}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {provinceCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}/${category.slug}`}
                  className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold group-hover:text-orange-600">
                      {city.name}
                    </span>
                  </div>
                  <div className="mt-1 text-right text-xs text-muted-foreground">
                    {city.count} {city.count === 1 ? "listing" : "listings"}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ));
      })()}
    </div>
  );
}
