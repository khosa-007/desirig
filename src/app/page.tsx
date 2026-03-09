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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Trucker character */}
            <div className="shrink-0 md:order-2">
              <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                {/* Turban */}
                <ellipse cx="100" cy="52" rx="42" ry="38" fill="#FF6E40"/>
                <path d="M62 55c0-22 17-40 38-40s38 18 38 40" fill="#FF5722"/>
                <path d="M70 45c5-18 15-28 30-28s25 10 30 28" fill="#FF6E40"/>
                <ellipse cx="100" cy="30" rx="8" ry="5" fill="#E64A19"/>
                {/* Face */}
                <ellipse cx="100" cy="78" rx="30" ry="28" fill="#C68642"/>
                {/* Eyes */}
                <ellipse cx="90" cy="74" rx="3.5" ry="4" fill="#1a1a1a"/>
                <ellipse cx="110" cy="74" rx="3.5" ry="4" fill="#1a1a1a"/>
                <circle cx="91.5" cy="73" r="1.2" fill="white"/>
                <circle cx="111.5" cy="73" r="1.2" fill="white"/>
                {/* Eyebrows */}
                <path d="M84 68c2-3 5-4 9-3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                <path d="M107 65c4-1 7 0 9 3" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                {/* Smile */}
                <path d="M88 86c4 5 10 7 16 5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                {/* Beard */}
                <path d="M72 82c0 18 12 28 28 28s28-10 28-28" fill="#1a1a1a" opacity="0.8"/>
                <path d="M75 82c0 15 11 24 25 24s25-9 25-24" fill="#333"/>
                {/* Body / jacket */}
                <path d="M55 120c0-8 20-14 45-14s45 6 45 14v60H55v-60z" fill="#FF6E40"/>
                {/* Jacket collar */}
                <path d="M80 106l20 14 20-14" stroke="#E64A19" strokeWidth="3" fill="none"/>
                {/* Hands pointing down — presenting */}
                <path d="M52 150c-8 4-15 12-15 20l12 4c2-8 6-14 10-18" fill="#C68642"/>
                <path d="M148 150c8 4 15 12 15 20l-12 4c-2-8-6-14-10-18" fill="#C68642"/>
                {/* Belt */}
                <rect x="55" y="175" width="90" height="5" rx="2" fill="#E64A19"/>
                {/* Legs */}
                <rect x="65" y="180" width="25" height="55" rx="4" fill="#2D3748"/>
                <rect x="110" y="180" width="25" height="55" rx="4" fill="#2D3748"/>
                {/* Boots */}
                <rect x="62" y="228" width="30" height="10" rx="5" fill="#1a1a1a"/>
                <rect x="108" y="228" width="30" height="10" rx="5" fill="#1a1a1a"/>
              </svg>
            </div>
            {/* Text content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6E40]/20 px-3 py-1 text-sm font-medium text-orange-300">
                Driver&apos;s Real Toolkit
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Your Trusted<br />Desi Directory
              </h1>
              <p className="mt-4 max-w-xl text-lg text-orange-200 md:text-xl">
                Find trucking companies, mechanics, driving schools, and community
                businesses across Canada. Real ratings, safety data — keep it in your pocket.
              </p>
            </div>
          </div>

          {/* Search bar */}
          <form
            action="/search"
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-2xl md:mx-0"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Search companies, mechanics, cities..."
                className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
            <Button type="submit" className="bg-[#FF6E40] hover:bg-[#FF5722] text-white">
              Search
            </Button>
          </form>

          {/* Popular searches — crawlable links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm md:justify-start">
            <span className="text-orange-300">Quick:</span>
            {[
              { label: "Safety Lookup", href: "/safety" },
              { label: "Trucking Companies", href: "/brampton-on/trucking-company" },
              { label: "Truck Mechanics", href: "/brampton-on/truck-mechanic" },
              { label: "HOS Rules", href: "/tools/hos-calculator" },
              { label: "Weight Limits", href: "/tools/weight-limits" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/20 px-3 py-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-lg justify-center gap-4 text-center md:mx-0 md:justify-start">
            <div className="rounded-xl bg-white/10 px-5 py-3">
              <div className="text-2xl font-bold">
                {businessCount.toLocaleString()}
              </div>
              <div className="text-sm text-orange-200">Businesses</div>
            </div>
            <div className="rounded-xl bg-white/10 px-5 py-3">
              <div className="text-2xl font-bold">{cityCount}</div>
              <div className="text-sm text-orange-200">Cities</div>
            </div>
            <div className="rounded-xl bg-white/10 px-5 py-3">
              <div className="text-2xl font-bold">84</div>
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

      {/* Driver's Toolkit — the reason truckers come back */}
      <section className="border-t bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Driver&apos;s Real Toolkit
            </h2>
            <p className="mt-1 text-slate-400">
              Everything you need on the road — keep it in your pocket
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/safety"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">
                Safety Lookup
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Check any carrier&apos;s DOT record before signing
              </p>
            </Link>
            <Link
              href="/tools/fuel-cost-calculator"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <Truck className="h-6 w-6 text-blue-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">
                Fuel Calculator
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Calculate trip fuel costs for any route
              </p>
            </Link>
            <Link
              href="/tools/weight-limits"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">
                Weight Limits
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Axle weights by province — in pounds
              </p>
            </Link>
            <Link
              href="/tools/hos-calculator"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <MapPin className="h-6 w-6 text-orange-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">
                HOS Rules
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Hours of service limits — quick reference
              </p>
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/top-rated"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <Star className="h-6 w-6 text-orange-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">Top Rated</h3>
              <p className="mt-1 text-sm text-slate-400">Highest-rated businesses across Canada</p>
            </Link>
            <Link
              href="/desi-owned"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">Desi Owned</h3>
              <p className="mt-1 text-sm text-slate-400">Support community-owned businesses</p>
            </Link>
            <Link
              href="/province"
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-5 transition-all hover:border-[#FF6E40] hover:shadow-lg hover:shadow-[#FF6E40]/10"
            >
              <MapPin className="h-6 w-6 text-blue-400" />
              <h3 className="mt-3 font-semibold group-hover:text-[#FF6E40]">Browse by Province</h3>
              <p className="mt-1 text-sm text-slate-400">Ontario, BC, Alberta, and more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FMCSA Safety CTA */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
              <Shield className="h-4 w-4" />
              Live Safety Data
            </div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Check Any Carrier&apos;s Safety Record
            </h2>
            <p className="mt-2 text-slate-300">
              Real-time safety ratings, crash data, and inspection records
              pulled from government records. Never stale, always accurate.
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

      {/* Trust signals — driver-focused, not corporate */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-2 text-center text-2xl font-bold tracking-tight">
          Built by a Trucker, for Truckers
        </h2>
        <p className="mb-8 text-center text-muted-foreground">
          We know what it&apos;s like on the road — because we&apos;re out there too
        </p>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">No Fake Reviews</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Real Google ratings from real customers. No paid placements,
              no BS. What you see is what you get.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">Live Safety Data</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Check any company before signing on. DOT records, fleet size,
              safety ratings — pulled fresh from government data.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Truck className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">Free Forever</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every tool, every lookup, every listing — free for drivers.
              No sign-up required. No hidden fees. Ever.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA — comfort, not sales */}
      <section className="border-t bg-muted/40">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Your Road, Your Tools
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            {businessCount.toLocaleString()} businesses, {cityCount} cities, safety lookups,
            fuel calculators, weight limits, HOS rules — all in one place.
            Bookmark it, share it with your crew.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/tools">
              <Button size="lg" className="bg-[#FF6E40] hover:bg-[#FF5722]">
                Open Toolkit
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                Browse Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
