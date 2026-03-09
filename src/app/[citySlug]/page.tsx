import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Truck } from "lucide-react";
import { getCityBySlug, getCategories } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ citySlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title: `Businesses in ${city.name}, ${city.province}`,
    description: `Browse ${city.listing_count} businesses in ${city.name}, ${city.province}. Trucking companies, mechanics, Indian grocery, restaurants, and more on DesiRig.`,
    alternates: {
      canonical: `https://desirig.com/${citySlug}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { citySlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const categories = await getCategories();

  // Get counts per category for this city
  const supabase = await createClient();
  const { data: counts } = await supabase
    .from("businesses")
    .select("category_id")
    .eq("city_id", city.id);

  const countMap: Record<number, number> = {};
  (counts ?? []).forEach((row) => {
    countMap[row.category_id] = (countMap[row.category_id] || 0) + 1;
  });

  const categoriesWithCount = categories
    .map((cat) => ({ ...cat, count: countMap[cat.id] || 0 }))
    .filter((cat) => cat.count > 0)
    .sort((a, b) => b.count - a.count);

  const truckingCats = categoriesWithCount.filter((c) => c.is_trucking);
  const communityCats = categoriesWithCount.filter((c) => !c.is_trucking);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{city.name}, {city.province}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Businesses in {city.name}, {city.province}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {city.listing_count} listings across {categoriesWithCount.length} categories
        </p>
      </div>

      {truckingCats.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Truck className="h-5 w-5 text-orange-500" />
            Trucking
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {truckingCats.map((cat) => (
              <Link
                key={cat.id}
                href={`/${city.slug}/${cat.slug}`}
                className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <p className="font-medium group-hover:text-orange-600">{cat.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.count} {cat.count === 1 ? "listing" : "listings"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {communityCats.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <MapPin className="h-5 w-5 text-green-500" />
            Community & Services
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {communityCats.map((cat) => (
              <Link
                key={cat.id}
                href={`/${city.slug}/${cat.slug}`}
                className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <p className="font-medium group-hover:text-orange-600">{cat.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.count} {cat.count === 1 ? "listing" : "listings"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
