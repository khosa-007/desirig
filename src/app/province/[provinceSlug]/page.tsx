import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Truck } from "lucide-react";
import { getProvinceBySlug, provinces } from "@/lib/provinces";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ provinceSlug: string }>;
}

export async function generateStaticParams() {
  return Object.values(provinces).map((p) => ({ provinceSlug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);
  if (!province) return {};

  return {
    title: `Desi Businesses in ${province.name}`,
    description: `Browse Desi trucking companies, mechanics, restaurants, and community businesses across ${province.name}. Find trusted listings with ratings and reviews on DesiRig.`,
    alternates: {
      canonical: `https://desirig.com/province/${provinceSlug}`,
    },
  };
}

export default async function ProvincePage({ params }: PageProps) {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);
  if (!province) notFound();

  const supabase = await createClient();

  // Get all cities in this province
  const { data: cities } = await supabase
    .from("cities")
    .select("id, name, slug, province, listing_count")
    .eq("province", province.code)
    .order("listing_count", { ascending: false });

  const allCities = cities ?? [];
  const totalListings = allCities.reduce(
    (sum, c) => sum + (c.listing_count ?? 0),
    0
  );

  // Get top categories in this province
  const cityIds = allCities.map((c) => c.id);
  let topCategories: { id: number; name: string; slug: string; is_trucking: boolean; count: number }[] = [];

  if (cityIds.length > 0) {
    const { data: bizData } = await supabase
      .from("businesses")
      .select("category_id, categories(id, name, slug, is_trucking)")
      .in("city_id", cityIds)
      .limit(2000);

    const catMap = new Map<number, { name: string; slug: string; is_trucking: boolean; count: number }>();
    (bizData ?? []).forEach((row) => {
      const cat = row.categories as unknown as { id: number; name: string; slug: string; is_trucking: boolean } | null;
      if (cat) {
        const existing = catMap.get(cat.id);
        if (existing) {
          existing.count++;
        } else {
          catMap.set(cat.id, { name: cat.name, slug: cat.slug, is_trucking: cat.is_trucking ?? false, count: 1 });
        }
      }
    });
    topCategories = Array.from(catMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  const truckingCats = topCategories.filter((c) => c.is_trucking);
  const communityCats = topCategories.filter((c) => !c.is_trucking);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{province.name}</span>
      </nav>

      <div className="mb-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Desi Businesses in {province.name}
        </h1>
        <p className="mt-2 text-orange-100">
          {totalListings.toLocaleString()} listings across {allCities.length} cities.
          Trucking companies, mechanics, grocery stores, restaurants, and more.
        </p>
      </div>

      {/* Top categories */}
      {truckingCats.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Truck className="h-5 w-5 text-orange-500" />
            Top Trucking Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {truckingCats.map((cat) => (
              <span
                key={cat.id}
                className="rounded-lg border bg-card px-4 py-2 text-sm font-medium"
              >
                {cat.name}
                <span className="ml-1 text-muted-foreground">({cat.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {communityCats.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-green-500" />
            Top Community Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {communityCats.map((cat) => (
              <span
                key={cat.id}
                className="rounded-lg border bg-card px-4 py-2 text-sm font-medium"
              >
                {cat.name}
                <span className="ml-1 text-muted-foreground">({cat.count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cities grid */}
      <h2 className="mb-4 text-xl font-semibold">
        Cities in {province.name}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {allCities.map((city) => (
          <Link
            key={city.id}
            href={`/${city.slug}`}
            className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold group-hover:text-orange-600">
                {city.name}
              </span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {city.listing_count} listings
            </div>
          </Link>
        ))}
      </div>

      {/* SEO content */}
      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          About Desi Businesses in {province.name}
        </h2>
        <p>
          DesiRig lists {totalListings.toLocaleString()} businesses across{" "}
          {allCities.length} cities in {province.name}. Our directory includes
          trucking companies, truck mechanics, driving schools, Indian grocery
          stores, gurdwaras, restaurants, immigration consultants, and more.
          Every listing includes phone numbers, addresses, and Google ratings
          from real customers. Browse by city above to find what you need.
        </p>
      </div>
    </div>
  );
}
