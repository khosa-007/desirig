import type { Metadata } from "next";
import { BusinessCard } from "@/components/business/business-card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Desi Owned Businesses | Support Our Community",
  description:
    "Browse Desi-owned businesses across Canada. Trucking companies, restaurants, grocery stores, and services owned by our community.",
  alternates: { canonical: "https://desirig.com/desi-owned" },
};

export const revalidate = 86400;

export default async function DesiOwnedPage() {
  const supabase = await createClient();

  const { data, count } = await supabase
    .from("businesses")
    .select("*, categories(name, slug, icon), cities(name, slug, province)", {
      count: "exact",
    })
    .eq("is_desi_owned", true)
    .not("google_rating", "is", null)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(60);

  const businesses = data ?? [];
  const total = count ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-white md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Desi Owned Businesses
        </h1>
        <p className="mt-2 text-green-100">
          {total.toLocaleString()} businesses owned by our community across
          Canada. Support Desi entrepreneurs.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((biz) => (
          <BusinessCard key={biz.id} business={biz} />
        ))}
      </div>
    </div>
  );
}
