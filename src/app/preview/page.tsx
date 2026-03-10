"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Shield, Star, MapPin, ArrowRight, Truck } from "lucide-react";

/* ───────── LOGO OPTIONS ───────── */
function LogoA({ color = "text-orange-500" }: { color?: string }) {
  // Bold text-only logo — clean, modern
  return (
    <span className="text-2xl font-black tracking-tight">
      DESI<span className={color}>RIG</span>
    </span>
  );
}

function LogoB({ bg = "bg-orange-500", accent = "text-orange-500" }: { bg?: string; accent?: string }) {
  // Letter D in circle + text
  return (
    <div className="flex items-center gap-2">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} text-white font-black text-xl`}>
        D
      </div>
      <span className="text-xl font-bold tracking-tight">
        Desi<span className={accent}>Rig</span>
      </span>
    </div>
  );
}

function LogoC({ accent = "text-orange-500" }: { accent?: string }) {
  // Custom semi truck SVG silhouette + text
  return (
    <div className="flex items-center gap-2.5">
      <svg width="36" height="24" viewBox="0 0 36 24" fill="currentColor" className={accent}>
        {/* Semi truck / 18-wheeler silhouette */}
        <path d="M0 10h20V6h6l4 4v6h-2.1a3 3 0 0 1-5.8 0H9.9a3 3 0 0 1-5.8 0H0V10zm7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 8H2v6h2.1a3 3 0 0 1 5.8 0h8.2a3 3 0 0 1 1.9-2.8V8zm2 0v4h5.2l-2.5-4H22z" />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        Desi<span className={accent}>Rig</span>
      </span>
    </div>
  );
}

function LogoD({ accent = "text-orange-500" }: { accent?: string }) {
  // Highway road icon + text
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className={accent}>
          <path d="M14 2L8 26h3l1-8h4l1 8h3L14 2zm-1 12l1-7 1 7h-2z" fill="currentColor"/>
          <path d="M2 22h8M18 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight">
        Desi<span className={accent}>Rig</span>
      </span>
    </div>
  );
}

/* ───────── THEME CONFIGS ───────── */
const themes = [
  {
    id: "tangerine",
    name: "Tangerine Blaze",
    desc: "Your fav: bold tangerine gradient, warm and energetic",
    heroBg: "bg-gradient-to-br from-[#FF9966] via-[#FF6E40] to-[#E64A19]",
    heroText: "text-white",
    heroSub: "text-orange-100",
    accent: "bg-[#FF6E40]",
    accentHover: "hover:bg-[#E64A19]",
    accentText: "text-[#FF6E40]",
    cardBorder: "hover:border-orange-300",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-700",
    statBg: "bg-white/15",
    logoColor: "text-[#FF6E40]",
    logoBg: "bg-[#FF6E40]",
  },
  {
    id: "black-yellow",
    name: "Black & Gold",
    desc: "Black and yellow, premium, bold, construction/industrial feel",
    heroBg: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    heroText: "text-white",
    heroSub: "text-yellow-200",
    accent: "bg-yellow-400",
    accentHover: "hover:bg-yellow-500",
    accentText: "text-yellow-500",
    cardBorder: "hover:border-yellow-300",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-800",
    statBg: "bg-white/10",
    logoColor: "text-yellow-400",
    logoBg: "bg-yellow-400",
  },
  {
    id: "tangerine-dark",
    name: "Tangerine + Dark",
    desc: "Dark premium base with tangerine accents. Modern, clean",
    heroBg: "bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900",
    heroText: "text-white",
    heroSub: "text-orange-200",
    accent: "bg-[#FF6E40]",
    accentHover: "hover:bg-[#FF5722]",
    accentText: "text-[#FF6E40]",
    cardBorder: "hover:border-orange-400",
    badgeBg: "bg-orange-950",
    badgeText: "text-orange-300",
    statBg: "bg-white/10",
    logoColor: "text-[#FF6E40]",
    logoBg: "bg-[#FF6E40]",
  },
  {
    id: "black-yellow-stripe",
    name: "Highway Warning",
    desc: "Black base with bold yellow stripes. Unmistakable trucker brand",
    heroBg: "bg-black",
    heroText: "text-white",
    heroSub: "text-yellow-300",
    accent: "bg-yellow-400",
    accentHover: "hover:bg-yellow-300",
    accentText: "text-yellow-400",
    cardBorder: "hover:border-yellow-400",
    badgeBg: "bg-yellow-400/10",
    badgeText: "text-yellow-400",
    statBg: "bg-yellow-400/10",
    logoColor: "text-yellow-400",
    logoBg: "bg-yellow-400",
  },
];

export default function PreviewPage() {
  const [selected, setSelected] = useState(0);
  const t = themes[selected];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Theme selector bar */}
      <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <p className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Pick a Theme
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {themes.map((theme, i) => (
              <button
                key={theme.id}
                onClick={() => setSelected(i)}
                className={`shrink-0 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                  selected === i
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-400">{t.desc}</p>
        </div>
      </div>

      {/* Logo options */}
      <div className="container mx-auto px-4 py-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Logo Options
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 text-center">
            <div className="flex justify-center"><LogoA color={t.logoColor} /></div>
            <p className="mt-2 text-xs text-gray-500">A: Text Only</p>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center">
            <div className="flex justify-center"><LogoB bg={t.logoBg} accent={t.logoColor} /></div>
            <p className="mt-2 text-xs text-gray-500">B: Letter D + Text</p>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center">
            <div className="flex justify-center"><LogoC accent={t.logoColor} /></div>
            <p className="mt-2 text-xs text-gray-500">C: Semi Truck + Text</p>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center">
            <div className="flex justify-center"><LogoD accent={t.logoColor} /></div>
            <p className="mt-2 text-xs text-gray-500">D: Highway + Text</p>
          </div>
        </div>
      </div>

      {/* MOCK HEADER */}
      <div className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <LogoC accent={t.logoColor} />
          <div className="hidden items-center gap-6 text-sm font-medium text-gray-500 md:flex">
            <span>Categories</span>
            <span>Cities</span>
            <span>Safety Lookup</span>
            <span>Tools</span>
            <span>Blog</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg border p-2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className={`relative overflow-hidden ${t.heroBg} ${t.heroText}`}>
        {selected === 3 && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(250,204,21,0.3) 20px, rgba(250,204,21,0.3) 22px)",
            }} />
          </div>
        )}
        <div className="container relative mx-auto px-4 py-20 text-center md:py-28">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Your Trusted Desi Toolkit
          </h1>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${t.heroSub} md:text-xl`}>
            Find trucking companies, mechanics, driving schools, and community
            businesses across Canada. Real ratings, safety data, and verified listings.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-2xl">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                placeholder="Search businesses, categories, cities..."
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button className={`rounded-lg ${t.accent} px-5 py-2.5 text-sm font-semibold ${
              selected === 1 || selected === 3 ? "text-black" : "text-white"
            } ${t.accentHover} transition-colors`}>
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-10 flex max-w-lg justify-center gap-6 text-center">
            <div className={`rounded-xl ${t.statBg} px-5 py-3`}>
              <div className="text-2xl font-bold">38,000+</div>
              <div className={`text-sm ${t.heroSub}`}>Businesses</div>
            </div>
            <div className={`rounded-xl ${t.statBg} px-5 py-3`}>
              <div className="text-2xl font-bold">244</div>
              <div className={`text-sm ${t.heroSub}`}>Cities</div>
            </div>
            <div className={`rounded-xl ${t.statBg} px-5 py-3`}>
              <div className="text-2xl font-bold">84</div>
              <div className={`text-sm ${t.heroSub}`}>Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* SAMPLE CARDS SECTION */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">For Truckers</h2>
            <p className="mt-1 text-gray-500">Everything a trucker needs, in one place</p>
          </div>
          <button className={`flex items-center gap-1 text-sm font-medium ${t.accentText}`}>
            All Categories <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {["Trucking Company", "Truck Mechanic", "Driving School", "Truck Tires", "Truck Stop"].map((name) => (
            <div
              key={name}
              className={`group cursor-pointer rounded-xl border bg-white p-4 text-center transition-all ${t.cardBorder} hover:shadow-sm`}
            >
              <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ${t.badgeBg} ${t.badgeText} transition-colors`}>
                <Truck className="h-5 w-5" />
              </div>
              <p className="mt-2 text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE BUSINESS CARDS */}
      <section className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight">Sample Listings</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { name: "Singh Transport Ltd.", rating: 4.8, reviews: 127, city: "Brampton, ON", cat: "Trucking Company" },
              { name: "GTA Truck Repair", rating: 4.6, reviews: 89, city: "Mississauga, ON", cat: "Truck Mechanic" },
              { name: "Punjab Driving Academy", rating: 4.5, reviews: 203, city: "Surrey, BC", cat: "Driving School" },
            ].map((biz) => (
              <div key={biz.name} className={`rounded-xl border bg-white p-5 transition-all ${t.cardBorder} hover:shadow-md`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{biz.name}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">{biz.cat}</p>
                  </div>
                  <span className={`rounded-full ${t.badgeBg} px-2 py-0.5 text-xs font-medium ${t.badgeText}`}>
                    {biz.cat === "Trucking Company" ? "Desi Owned" : ""}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <strong>{biz.rating}</strong>
                    <span className="text-gray-400">({biz.reviews})</span>
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {biz.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY CTA */}
      <section className={`${selected === 0 ? "bg-gradient-to-r from-slate-900 to-slate-800" : selected === 2 ? "bg-gradient-to-r from-[#FF6E40] to-[#E64A19]" : "bg-gradient-to-r from-gray-900 to-black"} text-white`}>
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-2 rounded-full ${selected === 2 ? "bg-white/20" : "bg-green-500/20"} px-3 py-1 text-sm font-medium ${selected === 2 ? "text-white" : "text-green-400"}`}>
              <Shield className="h-4 w-4" />
              Live Safety Data
            </div>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              Check Any Carrier&apos;s Safety Record
            </h2>
            <p className={`mt-2 ${selected === 2 ? "text-orange-100" : "text-slate-300"}`}>
              Real-time safety ratings, crash data, and inspection records.
            </p>
          </div>
          <button className={`rounded-lg ${selected === 1 || selected === 3 ? "bg-yellow-400 text-black" : "bg-green-500 text-white"} px-6 py-3 font-semibold`}>
            <Shield className="mr-2 inline h-5 w-5" />
            Safety Lookup
          </button>
        </div>
      </section>

      {/* Instructions */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-8">
          <h2 className="text-xl font-bold">Pick Your Favorites</h2>
          <p className="mt-2 text-gray-500">
            Tell me which <strong>theme</strong> (1-4) and which <strong>logo</strong> (A-D) you want.
            <br />
            You can also mix, e.g. &ldquo;Theme 1 with Logo C&rdquo; or &ldquo;Theme 3 colors but Theme 4 stripes&rdquo;
          </p>
          <p className="mt-4 text-sm text-gray-400">
            This is a preview page. Your live site is unchanged until you decide.
          </p>
        </div>
      </div>
    </div>
  );
}
