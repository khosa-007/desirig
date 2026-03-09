import type { Metadata } from "next";
import Link from "next/link";
import { Search, Truck, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/business/business-card";
import { searchBusinesses, getTruckingCategories, getCommunityCategories, getFeaturedCities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Search Businesses",
  description: "Search for trucking companies, mechanics, driving schools, and community businesses across Canada.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  let results: Awaited<ReturnType<typeof searchBusinesses>> = [];

  if (q && q.trim()) {
    results = await searchBusinesses(q.trim(), 40);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Search Businesses
        </h1>
        <p className="mt-1 text-muted-foreground">
          Find trucking companies, mechanics, restaurants, and more
        </p>

        <form className="mt-6 flex gap-2" action="/search">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search by name, address, or keyword..."
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Search
          </Button>
        </form>
      </div>

      {q ? (
        <div className="mt-8">
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} results for &ldquo;{q}&rdquo;
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border bg-muted/40 p-12 text-center">
              <p className="text-lg font-medium">No results found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try different keywords or browse by category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((biz) => (
                <BusinessCard key={biz.id} business={biz as unknown as Parameters<typeof BusinessCard>[0]["business"]} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <BrowseSuggestions />
      )}
    </div>
  );
}

async function BrowseSuggestions() {
  const [truckingCats, communityCats, cities] = await Promise.all([
    getTruckingCategories(),
    getCommunityCategories(),
    getFeaturedCities(),
  ]);

  return (
    <div className="mt-10 space-y-10">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Truck className="h-5 w-5 text-orange-500" />
          Trucking Categories
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {truckingCats.slice(0, 12).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-green-500" />
          Community Categories
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {communityCats.slice(0, 12).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-orange-500" />
          Popular Cities
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${city.slug}`}
              className="rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              {city.name}, {city.province}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
