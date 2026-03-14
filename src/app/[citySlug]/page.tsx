import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Truck } from "lucide-react";
import { getCityBySlug, getCategories, getFeaturedCities } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { CategoryCharacter } from "@/components/characters";

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

      <div className="mb-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Desi Businesses in {city.name}, {city.province}
        </h1>
        <p className="mt-2 text-orange-100">
          {city.listing_count} listings across {categoriesWithCount.length} categories.
          Find trucking companies, mechanics, grocery stores, restaurants, and more.
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
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]"
              >
                <div className="flex items-center gap-3">
                  <CategoryCharacter categorySlug={cat.slug} isTrucking={true} size={32} />
                  <div>
                    <p className="font-medium text-gray-200 group-hover:text-[#FACC15]">{cat.name}</p>
                    <p className="text-sm text-gray-500">
                      {cat.count} {cat.count === 1 ? "listing" : "listings"}
                    </p>
                  </div>
                </div>
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
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]"
              >
                <div className="flex items-center gap-3">
                  <CategoryCharacter categorySlug={cat.slug} isTrucking={false} size={32} />
                  <div>
                    <p className="font-medium text-gray-200 group-hover:text-[#FACC15]">{cat.name}</p>
                    <p className="text-sm text-gray-500">
                      {cat.count} {cat.count === 1 ? "listing" : "listings"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Other cities — internal linking */}
      <NearbyBrowse currentSlug={city.slug} />
    </div>
  );
}

async function NearbyBrowse({ currentSlug }: { currentSlug: string }) {
  const cities = await getFeaturedCities();
  const others = cities.filter((c) => c.slug !== currentSlug).slice(0, 10);
  if (others.length === 0) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-lg font-semibold">Browse Other Cities</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {others.map((c) => (
          <Link
            key={c.id}
            href={`/${c.slug}`}
            className="rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            {c.name}, {c.province}
            <span className="ml-1 text-muted-foreground">({c.listing_count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
