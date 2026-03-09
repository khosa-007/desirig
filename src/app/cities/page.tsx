import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "All Cities",
  description: "Browse Desi trucking and community businesses by city across Canada.",
};

export const revalidate = 86400;

export default async function CitiesPage() {
  const supabase = await createClient();
  const { data: cities } = await supabase
    .from("cities")
    .select("*")
    .order("listing_count", { ascending: false });

  // Group by province
  const allCities = cities ?? [];
  const byProvince = new Map<string, typeof allCities>();
  allCities.forEach((city) => {
    const existing = byProvince.get(city.province_name) ?? [];
    existing.push(city);
    byProvince.set(city.province_name, existing);
  });

  // Sort provinces by total listing count
  const provinces = Array.from(byProvince.entries()).sort((a, b) => {
    const totalA = a[1].reduce((sum, c) => sum + (c.listing_count ?? 0), 0);
    const totalB = b[1].reduce((sum, c) => sum + (c.listing_count ?? 0), 0);
    return totalB - totalA;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        All Cities
      </h1>
      <p className="mt-1 text-muted-foreground">
        {(cities ?? []).length} cities across {provinces.length} provinces
      </p>

      <div className="mt-8 space-y-10">
        {provinces.map(([provinceName, provinceCities]) => (
          <div key={provinceName}>
            <h2 className="mb-3 text-xl font-semibold">
              {provinceName}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({provinceCities.length} cities)
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {provinceCities.map((city) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
