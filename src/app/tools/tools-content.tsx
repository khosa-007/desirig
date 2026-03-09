"use client";

import Link from "next/link";
import { Calculator, Fuel, Scale, Clock, Gauge, ChevronRight, BookOpen } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export function ToolsContent() {
  const { t } = useLanguage();

  const tools = [
    {
      slug: "fuel-cost-calculator",
      name: t({ en: "Fuel Cost Calculator", pa: "ਬਾਲਣ ਖ਼ਰਚਾ ਕੈਲਕੁਲੇਟਰ" }),
      description: t({
        en: "Calculate trip fuel costs based on distance, fuel price, and MPG. Plan your fuel budget.",
        pa: "ਦੂਰੀ, ਬਾਲਣ ਦੀ ਕੀਮਤ ਤੇ MPG ਦੇ ਆਧਾਰ ਤੇ ਸਫ਼ਰ ਦਾ ਬਾਲਣ ਖ਼ਰਚਾ ਪਤਾ ਕਰੋ।",
      }),
      icon: Fuel,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      slug: "weight-limits",
      name: t({ en: "Axle Weight Limits, Canada", pa: "ਐਕਸਲ ਭਾਰ ਹੱਦਾਂ, ਕੈਨੇਡਾ" }),
      description: t({
        en: "Quick reference for Canadian truck weight limits by province. Steer, drive, and tandem axle limits.",
        pa: "ਪ੍ਰਾਂਤ ਅਨੁਸਾਰ ਕੈਨੇਡੀਅਨ ਟਰੱਕ ਭਾਰ ਹੱਦਾਂ ਦਾ ਤੁਰੰਤ ਹਵਾਲਾ।",
      }),
      icon: Scale,
      color: "text-green-500",
      bg: "bg-green-50",
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
      bg: "bg-orange-50",
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
      bg: "bg-green-50",
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
      bg: "bg-purple-50",
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
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <Calculator className="h-8 w-8 text-orange-600" />
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

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-xl border bg-card p-6 transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.bg}`}>
              <tool.icon className={`h-6 w-6 ${tool.color}`} />
            </div>
            <h2 className="mt-4 font-semibold group-hover:text-orange-600">
              {tool.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
