"use client";

import Link from "next/link";
import { ChevronRight, Scale, AlertTriangle } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

const provinces = [
  {
    name: { en: "Ontario", pa: "ਓਨਟਾਰੀਓ" },
    gross: "139,991 lbs (63,500 kg)",
    steer: "12,125 lbs (5,500 kg)",
    single: "20,062 lbs (9,100 kg)",
    tandem: "39,683 lbs (18,000 kg)",
    tridem: "46,958 lbs (21,300 kg)",
    notes: { en: "Reduced load (half-load) restrictions apply March-May on many highways.", pa: "ਮਾਰਚ-ਮਈ ਵਿੱਚ ਕਈ ਹਾਈਵੇ ਤੇ ਘੱਟ ਲੋਡ (ਅੱਧਾ ਲੋਡ) ਪਾਬੰਦੀਆਂ ਲਾਗੂ ਹੁੰਦੀਆਂ ਹਨ।" },
  },
  {
    name: { en: "Quebec", pa: "ਕਿਊਬੈੱਕ" },
    gross: "137,789 lbs (62,500 kg)",
    steer: "13,228 lbs (6,000 kg)",
    single: "22,046 lbs (10,000 kg)",
    tandem: "39,683 lbs (18,000 kg)",
    tridem: "52,911 lbs (24,000 kg)",
    notes: { en: "Spring thaw weight restrictions typically March 1 to May 31.", pa: "ਬਸੰਤ ਪਿਘਲਣ ਦੀਆਂ ਭਾਰ ਪਾਬੰਦੀਆਂ ਆਮ ਤੌਰ ਤੇ 1 ਮਾਰਚ ਤੋਂ 31 ਮਈ ਤੱਕ।" },
  },
  {
    name: { en: "British Columbia", pa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ" },
    gross: "139,991 lbs (63,500 kg)",
    steer: "12,125 lbs (5,500 kg)",
    single: "20,062 lbs (9,100 kg)",
    tandem: "37,479 lbs (17,000 kg)",
    tridem: "52,911 lbs (24,000 kg)",
    notes: { en: "Mountain highways may have additional restrictions. Check DriveBC.", pa: "ਪਹਾੜੀ ਹਾਈਵੇ ਤੇ ਵਾਧੂ ਪਾਬੰਦੀਆਂ ਹੋ ਸਕਦੀਆਂ ਹਨ। DriveBC ਚੈੱਕ ਕਰੋ।" },
  },
  {
    name: { en: "Alberta", pa: "ਅਲਬਰਟਾ" },
    gross: "139,991 lbs (63,500 kg)",
    steer: "12,125 lbs (5,500 kg)",
    single: "20,062 lbs (9,100 kg)",
    tandem: "37,479 lbs (17,000 kg)",
    tridem: "46,297 lbs (21,000 kg)",
    notes: { en: "Weight varies by road classification. Primary highways are highest.", pa: "ਭਾਰ ਸੜਕ ਦੀ ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਬਦਲਦਾ ਹੈ। ਮੁੱਖ ਹਾਈਵੇ ਸਭ ਤੋਂ ਵੱਧ ਹਨ।" },
  },
  {
    name: { en: "Saskatchewan", pa: "ਸਸਕੈਚਵਨ" },
    gross: "137,789 lbs (62,500 kg)",
    steer: "12,125 lbs (5,500 kg)",
    single: "20,062 lbs (9,100 kg)",
    tandem: "37,479 lbs (17,000 kg)",
    tridem: "46,297 lbs (21,000 kg)",
    notes: { en: "Spring road ban reduces weights by 10-25% depending on road class.", pa: "ਬਸੰਤ ਸੜਕ ਪਾਬੰਦੀ ਸੜਕ ਦੀ ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ ਭਾਰ 10-25% ਘਟਾਉਂਦੀ ਹੈ।" },
  },
  {
    name: { en: "Manitoba", pa: "ਮੈਨੀਟੋਬਾ" },
    gross: "137,789 lbs (62,500 kg)",
    steer: "12,125 lbs (5,500 kg)",
    single: "20,062 lbs (9,100 kg)",
    tandem: "37,479 lbs (17,000 kg)",
    tridem: "46,297 lbs (21,000 kg)",
    notes: { en: "Spring weight restrictions usually mid-March to end of May.", pa: "ਬਸੰਤ ਭਾਰ ਪਾਬੰਦੀਆਂ ਆਮ ਤੌਰ ਤੇ ਮਾਰਚ ਦੇ ਅੱਧ ਤੋਂ ਮਈ ਦੇ ਅੰਤ ਤੱਕ।" },
  },
];

export function WeightContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "Weight Limits", pa: "ਭਾਰ ਹੱਦਾਂ" })}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Scale className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({ en: "Canadian Truck Weight Limits by Province", pa: "ਪ੍ਰਾਂਤ ਅਨੁਸਾਰ ਕੈਨੇਡੀਅਨ ਟਰੱਕ ਭਾਰ ਹੱਦਾਂ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Quick reference for axle weights and gross vehicle weight limits. Updated for 2026.",
            pa: "ਐਕਸਲ ਭਾਰ ਅਤੇ ਕੁੱਲ ਵਾਹਨ ਭਾਰ ਹੱਦਾਂ ਦਾ ਤੁਰੰਤ ਹਵਾਲਾ। 2026 ਲਈ ਅੱਪਡੇਟ।",
          })}
        </p>
      </div>

      <div className="mt-8 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            <strong>{t({ en: "Disclaimer:", pa: "ਬੇਦਾਅਵਾ:" })}</strong> {t({
              en: "These are general reference values. Actual limits vary by road classification, axle spacing, tire type, and seasonal restrictions. Always verify with your provincial transportation ministry before loading.",
              pa: "ਇਹ ਆਮ ਹਵਾਲਾ ਅੰਕੜੇ ਹਨ। ਅਸਲ ਹੱਦਾਂ ਸੜਕ ਦੀ ਸ਼੍ਰੇਣੀ, ਐਕਸਲ ਦੂਰੀ, ਟਾਇਰ ਕਿਸਮ ਤੇ ਮੌਸਮੀ ਪਾਬੰਦੀਆਂ ਅਨੁਸਾਰ ਬਦਲਦੀਆਂ ਹਨ। ਲੋਡ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਹਮੇਸ਼ਾ ਆਪਣੇ ਪ੍ਰਾਂਤਕ ਟ੍ਰਾਂਸਪੋਰਟ ਮੰਤਰਾਲੇ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰੋ।",
            })}
          </p>
        </div>
      </div>

      {/* Weight table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-4 py-3 text-left font-semibold">{t({ en: "Province", pa: "ਪ੍ਰਾਂਤ" })}</th>
              <th className="px-4 py-3 text-right font-semibold">{t({ en: "Gross", pa: "ਕੁੱਲ" })}</th>
              <th className="px-4 py-3 text-right font-semibold">{t({ en: "Steer", pa: "ਸਟੀਅਰ" })}</th>
              <th className="px-4 py-3 text-right font-semibold">{t({ en: "Single", pa: "ਸਿੰਗਲ" })}</th>
              <th className="px-4 py-3 text-right font-semibold">{t({ en: "Tandem", pa: "ਟੈਂਡਮ" })}</th>
              <th className="px-4 py-3 text-right font-semibold">{t({ en: "Tridem", pa: "ਟ੍ਰਾਈਡਮ" })}</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map((p) => (
              <tr key={p.name.en} className="border-b hover:bg-muted/20">
                <td className="px-4 py-3 font-medium">{t(p.name)}</td>
                <td className="px-4 py-3 text-right">{p.gross}</td>
                <td className="px-4 py-3 text-right">{p.steer}</td>
                <td className="px-4 py-3 text-right">{p.single}</td>
                <td className="px-4 py-3 text-right">{p.tandem}</td>
                <td className="px-4 py-3 text-right">{p.tridem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Province details */}
      <div className="mt-8 space-y-4">
        {provinces.map((p) => (
          <div key={p.name.en} className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold text-foreground">{t(p.name)}</h2>
            <div className="mt-2 grid grid-cols-5 gap-2 text-center text-xs">
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.gross}</div>
                <div className="text-muted-foreground">{t({ en: "Gross", pa: "ਕੁੱਲ" })}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.steer}</div>
                <div className="text-muted-foreground">{t({ en: "Steer", pa: "ਸਟੀਅਰ" })}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.single}</div>
                <div className="text-muted-foreground">{t({ en: "Single", pa: "ਸਿੰਗਲ" })}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.tandem}</div>
                <div className="text-muted-foreground">{t({ en: "Tandem", pa: "ਟੈਂਡਮ" })}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.tridem}</div>
                <div className="text-muted-foreground">{t({ en: "Tridem", pa: "ਟ੍ਰਾਈਡਮ" })}</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t(p.notes)}</p>
          </div>
        ))}
      </div>

      {/* FAQ section */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight">
          {t({ en: "Common Questions", pa: "ਆਮ ਸਵਾਲ" })}
        </h2>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">
            {t({ en: "What happens if I'm overweight at the scale?", pa: "ਜੇ ਸਕੇਲ ਤੇ ਭਾਰ ਵੱਧ ਆਵੇ ਤਾਂ ਕੀ ਹੁੰਦਾ?" })}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t({
              en: "Fines range from $100 to $20,000+ depending on the province and how much you're over. Your truck will be held at the scale until the load is redistributed or removed. Repeated violations affect your carrier's safety rating.",
              pa: "ਜੁਰਮਾਨੇ $100 ਤੋਂ $20,000+ ਤੱਕ ਹੋ ਸਕਦੇ ਹਨ, ਪ੍ਰਾਂਤ ਤੇ ਕਿੰਨਾ ਵੱਧ ਹੈ ਇਸ ਤੇ ਨਿਰਭਰ। ਤੁਹਾਡਾ ਟਰੱਕ ਸਕੇਲ ਤੇ ਰੋਕਿਆ ਜਾਵੇਗਾ ਜਦੋਂ ਤੱਕ ਲੋਡ ਵੰਡਿਆ ਜਾਂ ਲਾਹਿਆ ਨਹੀਂ ਜਾਂਦਾ। ਵਾਰ-ਵਾਰ ਉਲੰਘਣਾ ਤੁਹਾਡੇ ਕੈਰੀਅਰ ਦੀ ਸੇਫਟੀ ਰੇਟਿੰਗ ਤੇ ਅਸਰ ਪਾਉਂਦੀ ਹੈ।",
            })}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">
            {t({ en: "What are spring weight restrictions?", pa: "ਬਸੰਤ ਭਾਰ ਪਾਬੰਦੀਆਂ ਕੀ ਹਨ?" })}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t({
              en: "Most provinces cut weight limits by 10-25% during spring thaw (March to May). Soft ground means road damage. Dates vary by region, so check your province&apos;s transportation website.",
              pa: "ਜ਼ਿਆਦਾਤਰ ਪ੍ਰਾਂਤ ਬਸੰਤ ਪਿਘਲਣ ਦੌਰਾਨ (ਮਾਰਚ ਤੋਂ ਮਈ) ਭਾਰ ਹੱਦਾਂ 10-25% ਘਟਾ ਦਿੰਦੇ ਹਨ। ਨਰਮ ਜ਼ਮੀਨ ਤੇ ਸੜਕਾਂ ਨੂੰ ਨੁਕਸਾਨ ਹੁੰਦਾ। ਤਾਰੀਖ਼ਾਂ ਖੇਤਰ ਅਨੁਸਾਰ ਬਦਲਦੀਆਂ ਹਨ, ਆਪਣੇ ਪ੍ਰਾਂਤ ਦੀ ਟ੍ਰਾਂਸਪੋਰਟ ਵੈੱਬਸਾਈਟ ਚੈੱਕ ਕਰੋ।",
            })}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">
            {t({ en: "How do I slide tandems to redistribute weight?", pa: "ਭਾਰ ਵੰਡਣ ਲਈ ਟੈਂਡਮ ਕਿਵੇਂ ਸਲਾਈਡ ਕਰੀਏ?" })}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t({
              en: "Sliding tandems forward moves weight to the drive axles; sliding back moves weight to the trailer tandems. Each hole on the slider rail shifts approximately 200-400 lbs (90-180 kg). Always re-scale after adjusting.",
              pa: "ਟੈਂਡਮ ਅੱਗੇ ਸਲਾਈਡ ਕਰਨ ਨਾਲ ਭਾਰ ਡਰਾਈਵ ਐਕਸਲ ਤੇ ਜਾਂਦਾ; ਪਿੱਛੇ ਸਲਾਈਡ ਕਰਨ ਨਾਲ ਟ੍ਰੇਲਰ ਟੈਂਡਮ ਤੇ। ਸਲਾਈਡਰ ਰੇਲ ਦਾ ਹਰ ਮੋਰੀ ਲਗਭਗ 200-400 ਪੌਂਡ (90-180 kg) ਸ਼ਿਫ਼ਟ ਕਰਦਾ ਹੈ। ਐਡਜਸਟ ਕਰਨ ਤੋਂ ਬਾਅਦ ਹਮੇਸ਼ਾ ਦੁਬਾਰਾ ਸਕੇਲ ਕਰੋ।",
            })}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Reference", pa: "ਇਸ ਹਵਾਲੇ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "This page provides a general reference for truck weight limits across major Canadian provinces. Weight limits depend on many factors including road class, axle spacing, tire type, number of tires, and seasonal restrictions. This guide covers the most common configurations for Class 8 tractor-trailers. For the most accurate limits for your specific vehicle and route, consult your provincial transportation ministry.",
            pa: "ਇਹ ਪੰਨਾ ਮੁੱਖ ਕੈਨੇਡੀਅਨ ਪ੍ਰਾਂਤਾਂ ਵਿੱਚ ਟਰੱਕ ਭਾਰ ਹੱਦਾਂ ਦਾ ਆਮ ਹਵਾਲਾ ਦਿੰਦਾ ਹੈ। ਭਾਰ ਹੱਦਾਂ ਕਈ ਕਾਰਨਾਂ ਤੇ ਨਿਰਭਰ ਕਰਦੀਆਂ ਹਨ ਜਿਵੇਂ ਸੜਕ ਸ਼੍ਰੇਣੀ, ਐਕਸਲ ਦੂਰੀ, ਟਾਇਰ ਕਿਸਮ, ਟਾਇਰਾਂ ਦੀ ਗਿਣਤੀ ਤੇ ਮੌਸਮੀ ਪਾਬੰਦੀਆਂ। ਆਪਣੇ ਖ਼ਾਸ ਵਾਹਨ ਤੇ ਰੂਟ ਲਈ ਸਹੀ ਹੱਦਾਂ ਵਾਸਤੇ ਆਪਣੇ ਪ੍ਰਾਂਤਕ ਟ੍ਰਾਂਸਪੋਰਟ ਮੰਤਰਾਲੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
          })}
        </p>
      </div>
    </div>
  );
}
