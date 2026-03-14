"use client";

import Link from "next/link";
import { Calculator, Fuel, Scale, Clock, Gauge, ChevronRight, BookOpen, MapPin, Shield } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

interface Tool {
  slug: string;
  name: string;
  description: string;
  icon: typeof Fuel;
  color: string;
  bg: string;
}

interface ToolGroup {
  title: string;
  titlePa: string;
  tools: Tool[];
}

export function ToolsContent() {
  const { t } = useLanguage();

  const groups: ToolGroup[] = [
    {
      title: "For Drivers",
      titlePa: "ਡਰਾਈਵਰਾਂ ਲਈ",
      tools: [
        {
          slug: "weight-limits",
          name: t({ en: "Axle Weight Limits, Canada", pa: "ਐਕਸਲ ਭਾਰ ਹੱਦਾਂ, ਕੈਨੇਡਾ" }),
          description: t({
            en: "Quick reference for Canadian truck weight limits by province. Steer, drive, and tandem axle limits.",
            pa: "ਪ੍ਰਾਂਤ ਅਨੁਸਾਰ ਕੈਨੇਡੀਅਨ ਟਰੱਕ ਭਾਰ ਹੱਦਾਂ ਦਾ ਤੁਰੰਤ ਹਵਾਲਾ।",
          }),
          icon: Scale,
          color: "text-green-500",
          bg: "bg-green-500/10",
        },
        {
          slug: "hos-calculator",
          name: t({ en: "Hours of Service Quick Reference", pa: "ਸੇਵਾ ਦੇ ਘੰਟੇ, ਤੁਰੰਤ ਹਵਾਲਾ" }),
          description: t({
            en: "Canadian HOS rules at a glance. Driving limits, rest requirements, cycle resets.",
            pa: "ਕੈਨੇਡੀਅਨ HOS ਨਿਯਮ ਇੱਕ ਨਜ਼ਰ ਵਿੱਚ। ਡਰਾਈਵਿੰਗ ਹੱਦਾਂ, ਆਰਾਮ ਲੋੜਾਂ, ਸਾਈਕਲ ਰੀਸੈੱਟ।",
          }),
          icon: Clock,
          color: "text-orange-500",
          bg: "bg-orange-500/10",
        },
        {
          slug: "license-quiz",
          name: t({ en: "License Exam Practice Quiz", pa: "ਲਾਇਸੈਂਸ ਪ੍ਰੀਖਿਆ ਅਭਿਆਸ ਕੁਇਜ਼" }),
          description: t({
            en: "Practice questions for Ontario truck driving knowledge test. In English and Punjabi.",
            pa: "ਓਨਟਾਰੀਓ ਟਰੱਕ ਡਰਾਈਵਿੰਗ ਨੌਲਿਜ ਟੈਸਟ ਲਈ ਅਭਿਆਸ ਸਵਾਲ। ਅੰਗਰੇਜ਼ੀ ਤੇ ਪੰਜਾਬੀ ਵਿੱਚ।",
          }),
          icon: BookOpen,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
        },
        {
          slug: "trip-planner",
          name: t({ en: "Trip Planner & Weather", pa: "ਟ੍ਰਿਪ ਪਲੈਨਰ ਤੇ ਮੌਸਮ" }),
          description: t({
            en: "Plan your route with live weather at every stop. Environment Canada data, free.",
            pa: "ਹਰ ਸਟਾਪ ਤੇ ਲਾਈਵ ਮੌਸਮ ਨਾਲ ਆਪਣਾ ਰੂਟ ਪਲੈਨ ਕਰੋ। ਮੁਫ਼ਤ।",
          }),
          icon: MapPin,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
        },
        {
          slug: "border-times",
          name: t({ en: "Border Wait Times", pa: "ਬਾਰਡਰ ਉਡੀਕ ਸਮਾਂ" }),
          description: t({
            en: "Live CBSA wait times at Canada-US border crossings. Commercial and traveller delays, updated every 5 minutes.",
            pa: "ਕੈਨੇਡਾ-ਅਮਰੀਕਾ ਬਾਰਡਰ ਤੇ ਲਾਈਵ CBSA ਉਡੀਕ ਸਮਾਂ। ਹਰ 5 ਮਿੰਟਾਂ ਬਾਅਦ ਅੱਪਡੇਟ।",
          }),
          icon: Clock,
          color: "text-cyan-500",
          bg: "bg-cyan-500/10",
        },
        {
          slug: "truck-parking",
          name: t({ en: "Truck Parking & Rest Stops", pa: "ਟਰੱਕ ਪਾਰਕਿੰਗ ਤੇ ਆਰਾਮ ਸਟਾਪ" }),
          description: t({
            en: "Find truck parking along Ontario highways. Truck stops, rest areas, amenities, GPS links.",
            pa: "ਓਨਟਾਰੀਓ ਹਾਈਵੇ ਤੇ ਟਰੱਕ ਪਾਰਕਿੰਗ ਲੱਭੋ। ਟਰੱਕ ਸਟਾਪ, ਸਹੂਲਤਾਂ, GPS ਲਿੰਕ।",
          }),
          icon: MapPin,
          color: "text-green-500",
          bg: "bg-green-500/10",
        },
        {
          slug: "weigh-scales",
          name: t({ en: "Ontario Weigh Scales", pa: "ਓਨਟਾਰੀਓ ਵੇਅ ਸਕੇਲ" }),
          description: t({
            en: "All 30 MTO truck inspection stations. Locations, highways, phone numbers, Google Maps links.",
            pa: "ਸਾਰੇ 30 MTO ਟਰੱਕ ਇੰਸਪੈਕਸ਼ਨ ਸਟੇਸ਼ਨ। ਟਿਕਾਣੇ, ਹਾਈਵੇ, ਫ਼ੋਨ ਨੰਬਰ।",
          }),
          icon: Scale,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
        },
      ],
    },
    {
      title: "For Owner-Operators",
      titlePa: "ਓਨਰ-ਆਪਰੇਟਰ ਲਈ",
      tools: [
        {
          slug: "fuel-prices",
          name: t({ en: "Diesel Prices by Province", pa: "ਪ੍ਰਾਂਤ ਅਨੁਸਾਰ ਡੀਜ਼ਲ ਕੀਮਤਾਂ" }),
          description: t({
            en: "Weekly average diesel prices across all Canadian provinces. Plan your fuel stops where it's cheapest.",
            pa: "ਸਾਰੇ ਕੈਨੇਡੀਅਨ ਪ੍ਰਾਂਤਾਂ ਵਿੱਚ ਹਫ਼ਤਾਵਾਰੀ ਔਸਤ ਡੀਜ਼ਲ ਕੀਮਤਾਂ।",
          }),
          icon: Fuel,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        },
        {
          slug: "fuel-cost-calculator",
          name: t({ en: "Fuel Cost Calculator", pa: "ਬਾਲਣ ਖ਼ਰਚਾ ਕੈਲਕੁਲੇਟਰ" }),
          description: t({
            en: "Calculate trip fuel costs based on distance, fuel price, and MPG. Plan your fuel budget.",
            pa: "ਦੂਰੀ, ਬਾਲਣ ਦੀ ਕੀਮਤ ਤੇ MPG ਦੇ ਆਧਾਰ ਤੇ ਸਫ਼ਰ ਦਾ ਬਾਲਣ ਖ਼ਰਚਾ ਪਤਾ ਕਰੋ।",
          }),
          icon: Fuel,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
        },
        {
          slug: "speed-fuel-savings",
          name: t({ en: "Speed vs Fuel Savings", pa: "ਸਪੀਡ ਬਨਾਮ ਬਾਲਣ ਬੱਚਤ" }),
          description: t({
            en: "See how much you save by dropping 5 km/h. Spoiler: it's thousands per year.",
            pa: "5 km/h ਘਟਾ ਕੇ ਕਿੰਨੀ ਬੱਚਤ ਹੁੰਦੀ ਦੇਖੋ। ਸਾਲ ਵਿੱਚ ਹਜ਼ਾਰਾਂ ਡਾਲਰ।",
          }),
          icon: Gauge,
          color: "text-green-500",
          bg: "bg-green-500/10",
        },
      ],
    },
    {
      title: "For Company Owners",
      titlePa: "ਕੰਪਨੀ ਮਾਲਕਾਂ ਲਈ",
      tools: [
        {
          slug: "../safety",
          name: t({ en: "Safety Lookup", pa: "ਸੇਫਟੀ ਚੈੱਕ" }),
          description: t({
            en: "Check your own safety record, vet competitors, review carrier profiles from government data.",
            pa: "ਆਪਣਾ ਸੇਫਟੀ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ, ਮੁਕਾਬਲੇਬਾਜ਼ਾਂ ਨੂੰ ਵੇਖੋ।",
          }),
          icon: Shield,
          color: "text-red-500",
          bg: "bg-red-500/10",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FACC15]/10">
          <Calculator className="h-8 w-8 text-[#FACC15]" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {t({ en: "Free Trucking Tools", pa: "ਮੁਫ਼ਤ ਟਰੱਕਿੰਗ ਟੂਲ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Calculators and reference guides built for Canadian truckers. Always free.",
            pa: "ਕੈਨੇਡੀਅਨ ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਲਈ ਬਣੇ ਕੈਲਕੁਲੇਟਰ ਤੇ ਹਵਾਲੇ। ਹਮੇਸ਼ਾ ਮੁਫ਼ਤ।",
          })}
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="mb-4 border-b border-[#333] pb-2">
              <h2 className="text-lg font-bold text-white">{group.title}</h2>
              <p className="font-gurmukhi text-sm text-[#FACC15]">{group.titlePa}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.slug.startsWith("..") ? tool.slug.replace("..", "") : `/tools/${tool.slug}`}
                  className="group rounded-xl border bg-[#1A1A1A] p-6 transition-all hover:border-[#FACC15] hover:shadow-md"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.bg}`}>
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <h3 className="mt-4 font-semibold group-hover:text-[#FACC15]">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
