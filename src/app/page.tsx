import Link from "next/link";
import { Search, MapPin, Shield, Star, ArrowRight, Gauge, BookOpen, Newspaper, Clock, Fuel } from "lucide-react";
import { SemiTruckIcon } from "@/components/layout/site-header";
import { CategoryIcon, isDesiCategory, DesiBadge } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NearMe } from "@/components/near-me";
import Image from "next/image";
import { LiveNewsTicker } from "@/components/live-news-ticker";
import { getTruckingNews, timeAgo } from "@/lib/news";
import {
  getTruckingCategories,
  getCommunityCategories,
  getFeaturedCities,
  getBusinessCount,
  getCityCount,
} from "@/lib/queries";

export const revalidate = 3600; // ISR: rebuild every hour

export async function generateMetadata() {
  return {
    title: "DesiRig | Desi Trucking & Business Directory for Canada & USA",
    description:
      "Find trusted Desi trucking companies, mechanics, driving schools, Indian grocery stores, gurdwaras, and 38,000+ businesses across Canada and USA. Free trucking tools, safety lookup, and live news.",
    alternates: { canonical: "https://desirig.com" },
  };
}

export default async function HomePage() {
  const [truckingCats, communityCats, featuredCities, businessCount, cityCount, latestNews] =
    await Promise.all([
      getTruckingCategories(),
      getCommunityCategories(),
      getFeaturedCities(),
      getBusinessCount(),
      getCityCount(),
      getTruckingNews(5),
    ]);

  return (
    <>
      {/* JSON-LD: WebSite + SearchAction for Google Sitelinks search box */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "DesiRig",
            url: "https://desirig.com",
            description:
              "Find trusted Desi trucking companies, mechanics, driving schools, and community businesses across Canada and USA.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://desirig.com/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#111] text-white">
        {/* Background: real trucker photo with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/heroes/sikh-trucker-4.jpeg"
            alt="Sikh truck driver standing in front of semi truck"
            fill
            className="object-cover object-top"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#111]" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          {/* Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FACC15]/20 px-3 py-1 text-sm font-medium text-[#FACC15]">
              <SemiTruckIcon className="h-4 w-4" />
              Desi Trucker&apos;s Co-Pilot
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Your Trucking Toolkit
            </h1>
            <p className="mt-2 font-gurmukhi text-2xl text-[#FACC15]">
              ਤੁਹਾਡੀ ਟਰੱਕਿੰਗ ਟੂਲਕਿੱਟ
            </p>
            <p className="mx-auto mt-3 text-xl font-semibold text-white/90">
              Find Your Desi Business
            </p>
            <p className="font-gurmukhi text-lg text-[#FACC15]/80">
              ਆਪਣਾ ਦੇਸੀ ਕਾਰੋਬਾਰ ਲੱਭੋ
            </p>
            <p className="mx-auto mt-3 max-w-xl text-lg text-gray-400">
              Safety lookups, fuel calculators, route weather, license prep. Built by a trucker who gets it.
            </p>
          </div>

          {/* Search bar */}
          <form
            action="/search"
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-2xl"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Find trucking companies, mechanics, dhabas..."
                className="border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus-visible:ring-0"
              />
            </div>
            <Button type="submit" className="bg-[#FACC15] text-black hover:bg-[#E5B800]">
              Search
            </Button>
          </form>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-lg justify-center gap-4 text-center">
            <div className="rounded-xl border border-[#FACC15]/20 bg-black/40 backdrop-blur-sm px-5 py-3">
              <div className="text-2xl font-bold text-[#FACC15]">
                {businessCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Businesses</div>
            </div>
            <div className="rounded-xl border border-[#FACC15]/20 bg-black/40 backdrop-blur-sm px-5 py-3">
              <div className="text-2xl font-bold text-[#FACC15]">{cityCount}</div>
              <div className="text-sm text-gray-400">Cities</div>
            </div>
            <div className="rounded-xl border border-[#FACC15]/20 bg-black/40 backdrop-blur-sm px-5 py-3">
              <div className="text-2xl font-bold text-[#FACC15]">84</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-[#FACC15]/50">Quick:</span>
            {[
              { label: "Safety Lookup", href: "/safety" },
              { label: "Trip Planner", href: "/tools/trip-planner" },
              { label: "Trucking Companies", href: "/brampton-on/trucking-company" },
              { label: "Fuel Calculator", href: "/tools/fuel-cost-calculator" },
              { label: "Truck Mechanics", href: "/brampton-on/truck-mechanic" },
              { label: "License Quiz", href: "/tools/license-quiz" },
              { label: "Weight Limits", href: "/tools/weight-limits" },
              { label: "Border Times", href: "/tools/border-times" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[#FACC15]/30 px-3 py-1 text-[#FACC15]/70 transition-colors hover:bg-[#FACC15]/10 hover:text-[#FACC15]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live News Ticker ── */}
      <LiveNewsTicker initialNews={latestNews} />

      {/* ── Near Me ── */}
      <NearMe />

      {/* ── Trucking Tools ── */}
      <section className="border-t-[3px] border-[#FACC15] bg-[#111]">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Driver&apos;s Real Toolkit
            </h2>
            <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
              ਡਰਾਈਵਰ ਦੀ ਟੂਲਕਿੱਟ
            </p>
            <p className="mt-1 text-gray-400">
              Tools you actually use. Right on your phone.
            </p>
          </div>

          {/* For Drivers */}
          <div className="mt-8">
            <div className="mb-3 border-b border-[#333] pb-2">
              <h3 className="text-lg font-bold text-white">For Drivers</h3>
              <p className="font-gurmukhi text-sm text-[#FACC15]">ਡਰਾਈਵਰਾਂ ਲਈ</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/tools/weight-limits"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Star className="h-6 w-6 text-yellow-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Weight Limits</h3>
                <p className="mt-1 text-sm text-gray-400">Axle weights by province, in pounds</p>
              </Link>
              <Link
                href="/tools/hos-calculator"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <MapPin className="h-6 w-6 text-orange-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">HOS Rules</h3>
                <p className="mt-1 text-sm text-gray-400">HOS limits, quick reference</p>
              </Link>
              <Link
                href="/tools/license-quiz"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <BookOpen className="h-6 w-6 text-purple-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">License Quiz</h3>
                <p className="mt-1 text-sm text-gray-400">Practice your truck license test in English &amp; Punjabi</p>
              </Link>
              <Link
                href="/tools/trip-planner"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <MapPin className="h-6 w-6 text-yellow-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Trip Planner</h3>
                <p className="mt-1 text-sm text-gray-400">Plan routes with live weather along the way</p>
              </Link>
              <Link
                href="/tools/border-times"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Clock className="h-6 w-6 text-cyan-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Border Wait Times</h3>
                <p className="mt-1 text-sm text-gray-400">Live CBSA wait times at Canada-US crossings</p>
              </Link>
              <Link
                href="/tools/truck-parking"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <MapPin className="h-6 w-6 text-green-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Truck Parking</h3>
                <p className="mt-1 text-sm text-gray-400">Rest stops &amp; parking along Ontario highways</p>
              </Link>
              <Link
                href="/tools/weigh-scales"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Star className="h-6 w-6 text-yellow-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Weigh Scales</h3>
                <p className="mt-1 text-sm text-gray-400">All 30 Ontario MTO inspection stations</p>
              </Link>
            </div>
          </div>

          {/* For Owner-Operators */}
          <div className="mt-8">
            <div className="mb-3 border-b border-[#333] pb-2">
              <h3 className="text-lg font-bold text-white">For Owner-Operators</h3>
              <p className="font-gurmukhi text-sm text-[#FACC15]">ਓਨਰ-ਆਪਰੇਟਰ ਲਈ</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/tools/fuel-prices"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Fuel className="h-6 w-6 text-blue-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Diesel Prices</h3>
                <p className="mt-1 text-sm text-gray-400">Current diesel prices by province</p>
              </Link>
              <Link
                href="/tools/fuel-cost-calculator"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <SemiTruckIcon className="h-6 w-6 text-blue-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Fuel Calculator</h3>
                <p className="mt-1 text-sm text-gray-400">Get trip fuel costs for any route</p>
              </Link>
              <Link
                href="/tools/speed-fuel-savings"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Gauge className="h-6 w-6 text-green-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Speed vs Fuel Savings</h3>
                <p className="mt-1 text-sm text-gray-400">Drop 5 km/h, save thousands a year</p>
              </Link>
            </div>
          </div>

          {/* For Company Owners */}
          <div className="mt-8">
            <div className="mb-3 border-b border-[#333] pb-2">
              <h3 className="text-lg font-bold text-white">For Company Owners</h3>
              <p className="font-gurmukhi text-sm text-[#FACC15]">ਕੰਪਨੀ ਮਾਲਕਾਂ ਲਈ</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/safety"
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
              >
                <Shield className="h-6 w-6 text-green-400" />
                <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Safety Lookup</h3>
                <p className="mt-1 text-sm text-gray-400">Check any carrier&apos;s DOT record</p>
              </Link>
            </div>
          </div>

          {/* Quick links row */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Link
              href="/top-rated"
              className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
            >
              <Star className="h-6 w-6 text-orange-400" />
              <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Top Rated</h3>
              <p className="mt-1 text-sm text-gray-400">The best-rated spots across Canada</p>
            </Link>
            <Link
              href="/desi-owned"
              className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
            >
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Desi Owned</h3>
              <p className="mt-1 text-sm text-gray-400">Support our own</p>
            </Link>
            <Link
              href="/province"
              className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-5 transition-all hover:border-[#FACC15]"
            >
              <MapPin className="h-6 w-6 text-blue-400" />
              <h3 className="mt-3 font-semibold text-white group-hover:text-[#FACC15]">Browse by Province</h3>
              <p className="mt-1 text-sm text-gray-400">Ontario, BC, Alberta, and more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── News + Weather Split ── */}
      <section className="bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: News */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Newspaper className="h-6 w-6 text-[#FACC15]" />
                <div>
                  <h2 className="text-xl font-bold text-white">Latest News</h2>
                  <p className="font-gurmukhi text-sm text-[#FACC15]">ਤਾਜ਼ੀਆਂ ਖ਼ਬਰਾਂ</p>
                </div>
              </div>
              <div className="space-y-3">
                {latestNews.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-[#333] bg-[#111] p-4 transition-colors hover:border-[#FACC15]/50"
                  >
                    <h3 className="font-medium text-white hover:text-[#FACC15] line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-xs ${
                        item.region === "CA"
                          ? "bg-red-500/20 text-red-400"
                          : item.region === "US"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-[#FACC15]/20 text-[#FACC15]"
                      }`}>
                        {item.region === "CA" ? "🇨🇦" : item.region === "US" ? "🇺🇸" : "ਪੰਜਾਬੀ"}
                      </span>
                      <span className="rounded bg-[#FACC15]/10 px-2 py-0.5 text-xs text-[#FACC15]/70">
                        {item.source}
                      </span>
                      <span className="text-xs text-gray-500">{timeAgo(item.pubDate)}</span>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
              <Link
                href="/news"
                className="mt-4 inline-flex items-center gap-1 text-sm text-[#FACC15] hover:underline"
              >
                View All News <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: Road Conditions placeholder */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[#FACC15]" />
                <div>
                  <h2 className="text-xl font-bold text-white">Road Conditions</h2>
                  <p className="font-gurmukhi text-sm text-[#FACC15]">ਸੜਕ ਦੀ ਹਾਲਤ</p>
                </div>
              </div>
              <div className="rounded-lg border border-[#FACC15]/30 bg-[#FACC15]/5 p-6">
                <p className="text-gray-400">
                  Weather alerts and road conditions coming soon
                </p>
                <p className="mt-2 font-gurmukhi text-sm text-gray-500">
                  ਮੌਸਮ ਅਲਰਟ ਤੇ ਸੜਕ ਦੀਆਂ ਸਥਿਤੀਆਂ ਜਲਦੀ ਆ ਰਹੀਆਂ ਹਨ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trucking Categories (PRIMARY) ── */}
      <section className="bg-[#111]">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Trucking Directory
              </h2>
              <p className="mt-1 font-gurmukhi text-[#FACC15]">ਟਰੱਕਿੰਗ ਡਾਇਰੈਕਟਰੀ</p>
              <p className="mt-1 text-sm text-gray-400">
                Companies, mechanics, parts, washes, schools, and more
              </p>
            </div>
            <Link href="/categories">
              <Button variant="ghost" className="gap-1 text-gray-400 hover:text-white">
                All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {truckingCats.slice(0, 15).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FACC15]/10">
                    <CategoryIcon icon={cat.icon} size={22} className="text-[#FACC15]" />
                  </div>
                  {isDesiCategory(cat.slug) && <DesiBadge compact />}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-200 group-hover:text-[#FACC15]">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Cities ── */}
      <section className="bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Top Cities
          </h2>
          <p className="mt-1 font-gurmukhi text-[#FACC15]">ਪ੍ਰਮੁੱਖ ਸ਼ਹਿਰ</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featuredCities.map((city) => (
              <Link
                key={city.id}
                href={`/${city.slug}`}
                className="group rounded-xl border border-[#333] bg-[#111] p-4 transition-all hover:border-[#FACC15]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FACC15]" />
                  <span className="text-sm font-semibold text-white group-hover:text-[#FACC15]">
                    {city.name}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                  <span>{city.province}</span>
                  <span>{city.listing_count} listings</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Safety CTA ── */}
      <section className="bg-[#FACC15] text-black">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Check Any Carrier&apos;s Safety Record
            </h2>
            <p className="mt-1 font-gurmukhi text-lg text-black/70">
              ਕਿਸੇ ਵੀ ਕੈਰੀਅਰ ਦਾ ਸੇਫਟੀ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ
            </p>
            <p className="mt-2 text-black/70">
              Safety ratings, crash data, inspections. Pulled straight from government records. Always fresh.
            </p>
          </div>
          <Link href="/safety">
            <Button
              size="lg"
              className="bg-black text-[#FACC15] hover:bg-[#222]"
            >
              <Shield className="mr-2 h-5 w-5" />
              Safety Lookup
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Desi Community (secondary, smaller) ── */}
      <section className="border-t border-[#333] bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-300">
                Also on DesiRig: Desi Community
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Grocery, restaurants, gurdwaras, immigration, and more
              </p>
            </div>
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="gap-1 text-gray-500 hover:text-white">
                See All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {communityCats.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group rounded-lg border border-[#333] bg-[#111] p-3 text-center transition-all hover:border-[#FACC15]/50"
              >
                <CategoryIcon icon={cat.icon} size={18} className="mx-auto text-green-400/70" />
                <p className="mt-1.5 text-xs font-medium text-gray-400 group-hover:text-white">{cat.name}</p>
                {isDesiCategory(cat.slug) && <div className="mt-1"><DesiBadge compact /></div>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="bg-[#111]">
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-white">
            Built by a Trucker, for Truckers
          </h2>
          <p className="mb-8 text-center font-gurmukhi text-[#FACC15]">
            ਟਰੱਕਰ ਨੇ ਬਣਾਇਆ, ਟਰੱਕਰਾਂ ਲਈ
          </p>
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC15]/10 text-[#FACC15]">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-white">No Fake Reviews</h3>
              <p className="mt-1 text-sm text-gray-400">
                Real Google ratings from real customers. No paid spots, no BS.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC15]/10 text-[#FACC15]">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-white">Live Safety Data</h3>
              <p className="mt-1 text-sm text-gray-400">
                Look up any company before you sign. DOT records, fleet size, safety ratings. Fresh from government data.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FACC15]/10 text-[#FACC15]">
                <SemiTruckIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-white">Free Forever</h3>
              <p className="mt-1 text-sm text-gray-400">
                Every tool, every lookup, every listing. Free for drivers. No sign-up, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-[#333] bg-[#1A1A1A]">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Your Road, Your Tools
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-400">
            {businessCount.toLocaleString()} businesses, {cityCount} cities, safety lookups, fuel calculators, weight limits, HOS rules. One spot. Bookmark it, send it to your crew.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/tools">
              <Button size="lg" className="bg-[#FACC15] text-black hover:bg-[#E5B800]">
                Open Toolkit
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15]/10">
                Browse Businesses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
