import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { provinces } from "@/lib/provinces";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Browse by Province",
  description:
    "Browse Desi businesses by province across Canada. Ontario, British Columbia, Alberta, and more.",
  alternates: { canonical: "https://desirig.com/province" },
};

export const revalidate = 86400;

export default async function ProvincesPage() {
  const supabase = await createClient();
  const { data: cities } = await supabase
    .from("cities")
    .select("province, listing_count");

  // Aggregate by province
  const provinceStats = new Map<string, { count: number; cities: number }>();
  (cities ?? []).forEach((c) => {
    const existing = provinceStats.get(c.province) ?? { count: 0, cities: 0 };
    existing.count += c.listing_count ?? 0;
    existing.cities++;
    provinceStats.set(c.province, existing);
  });

  const provinceList = Object.values(provinces)
    .map((p) => ({
      ...p,
      listings: provinceStats.get(p.code)?.count ?? 0,
      cityCount: provinceStats.get(p.code)?.cities ?? 0,
    }))
    .filter((p) => p.listings > 0)
    .sort((a, b) => b.listings - a.listings);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        Browse by Province
      </h1>
      <p className="mt-1 text-muted-foreground">
        {provinceList.length} provinces with Desi business listings
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {provinceList.map((p) => (
          <Link
            key={p.code}
            href={`/province/${p.slug}`}
            className="group rounded-xl border bg-card p-5 transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold group-hover:text-orange-600">
                  {p.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {p.listings.toLocaleString()} listings &middot; {p.cityCount} cities
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
