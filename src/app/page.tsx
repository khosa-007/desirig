import Link from "next/link";
import { Search, Truck, MapPin, Shield, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getTruckingCategories,
  getCommunityCategories,
  getFeaturedCities,
  getBusinessCount,
  getCityCount,
} from "@/lib/queries";

export const revalidate = 3600; // ISR: rebuild every hour

export default async function HomePage() {
  const [truckingCats, communityCats, featuredCities, businessCount, cityCount] =
    await Promise.all([
      getTruckingCategories(),
      getCommunityCategories(),
      getFeaturedCities(),
      getBusinessCount(),
      getCityCount(),
    ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative mx-auto px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Your Trusted Desi Directory
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-orange-100 md:text-xl">
            Find trucking companies, mechanics, driving schools, and community
            businesses across Canada. Real ratings, FMCSA safety data, and
            verified listings.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <form action="/search" className="flex-1">
                <Input
                  name="q"
                  placeholder="Search businesses, categories, cities..."
                  className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                />
              </form>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Search
            </Button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-lg justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">
                {businessCount.toLocaleString()}
              </div>
              <div className="text-sm text-orange-200">Businesses</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{cityCount}</div>
              <div className="text-sm text-orange-200">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold">84</div>
              <div className="text-sm text-orange-200">Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trucking Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              For Truckers
            </h2>
            <p className="mt-1 text-muted-foreground">
              Everything a trucker needs, in one place
            </p>
          </div>
          <Link href="/categories">
            <Button variant="ghost" className="gap-1">
              All Categories <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {truckingCats.slice(0, 15).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border bg-card p-4 text-center transition-all hover:border-orange-200 hover:shadow-sm"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100">
                <Truck className="h-5 w-5" />
              </div>
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Categories */}
      <section className="bg-muted/40">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Desi Community
          </h2>
          <p className="mt-1 text-muted-foreground">
            Grocery, restaurants, gurdwaras, and more
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {communityCats.slice(0, 15).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-xl border bg-card p-4 text-center transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mt-2 text-sm font-medium">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Top Cities
        </h2>
        <p className="mt-1 text-muted-foreground">
          Browse businesses by city
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {featuredCities.map((city) => (
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
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{city.province}</span>
                <span>{city.listing_count} listings</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FMCSA Safety CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
              <Shield className="h-4 w-4" />
              Live from FMCSA
            </div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Check Any Carrier&apos;s Safety Record
            </h2>
            <p className="mt-2 text-slate-300">
              Real-time safety ratings, crash data, and inspection records
              pulled directly from FMCSA. Never stale, always accurate.
            </p>
          </div>
          <Link href="/safety">
            <Button
              size="lg"
              className="bg-green-500 text-white hover:bg-green-600"
            >
              <Shield className="mr-2 h-5 w-5" />
              Safety Lookup
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust signals */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">Real Ratings</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Google ratings and reviews from real customers, not fake reviews.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">FMCSA Verified</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Carrier safety data pulled live from FMCSA. DOT numbers, crash
              rates, inspection records.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">Built for Truckers</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              By truckers, for truckers. We know what drivers need — from
              mechanics to dhabas to permit services.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
