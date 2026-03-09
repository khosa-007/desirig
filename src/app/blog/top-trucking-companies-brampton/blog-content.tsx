"use client";

import Link from "next/link";
import { ChevronRight, Star, Shield, MapPin } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

interface CompanyData {
  name: string;
  slug: string;
  google_rating: number | null;
  google_review_count: number | null;
  phone: string | null;
  is_desi_owned: boolean | null;
}

export function TopTruckingCompaniesContent({
  title,
  description,
  date,
  readTime,
  topCompanies,
}: {
  title: string;
  description: string;
  date: string;
  readTime: string;
  topCompanies: CompanyData[];
}) {
  const { t } = useLanguage();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">{t({ en: "Brampton Trucking", pa: "Brampton ਟਰੱਕਿੰਗ" })}</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
          {t({ en: "Trucking", pa: "ਟਰੱਕਿੰਗ" })}
        </span>
        <LanguageToggle />
      </div>

      <header>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {t({ en: title, pa: "Brampton ਦੀਆਂ ਸਭ ਤੋਂ ਵਧੀਆ ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ, ਰੇਟਿੰਗ ਅਨੁਸਾਰ" })}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t({ en: description, pa: "Google ਰਿਵਿਊ ਦੇ ਅਧਾਰ ਤੇ Brampton ਦੀਆਂ ਟੌਪ-ਰੇਟਿਡ ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ। ਅਸਲ ਡੇਟਾ, ਕੋਈ ਪੇਡ ਪਲੇਸਮੈਂਟ ਨਹੀਂ।" })}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {date} &middot; {readTime}
        </p>
      </header>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          {t({
            en: "Brampton is the trucking capital of Canada. With over 50% South Asian population, it's home to hundreds of trucking companies. But which ones are actually good? We pulled the data.",
            pa: "Brampton ਕੈਨੇਡਾ ਦੀ ਟਰੱਕਿੰਗ ਰਾਜਧਾਨੀ ਹੈ। 50% ਤੋਂ ਵੱਧ ਸਾਊਥ ਏਸ਼ੀਅਨ ਅਬਾਦੀ ਨਾਲ, ਇੱਥੇ ਸੈਂਕੜੇ ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ ਹਨ। ਪਰ ਕਿਹੜੀਆਂ ਅਸਲ ਵਿੱਚ ਚੰਗੀਆਂ ਹਨ? ਅਸੀਂ ਡੇਟਾ ਕੱਢਿਆ।",
          })}
        </p>

        <p>
          {t({
            en: "Here are the highest-rated trucking companies in Brampton based on Google reviews. Real customers, not paid placements.",
            pa: "ਹੇਠਾਂ Google ਰਿਵਿਊ ਦੇ ਅਧਾਰ ਤੇ Brampton ਦੀਆਂ ਸਭ ਤੋਂ ਉੱਚ-ਰੇਟਿਡ ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ ਹਨ। ਇਹ ਰੇਟਿੰਗ ਅਸਲ ਕਸਟਮਰਾਂ ਤੋਂ ਹਨ, ਪੇਡ ਪਲੇਸਮੈਂਟ ਨਹੀਂ।",
          })}
        </p>

        {topCompanies.length > 0 ? (
          <div className="space-y-3">
            {topCompanies.map((company, i) => (
              <Link
                key={company.slug}
                href={`/brampton-on/trucking-company/${company.slug}`}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground truncate">
                    {company.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-3 text-sm">
                    {company.google_rating && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                        {company.google_rating.toFixed(1)}
                        {company.google_review_count && (
                          <span className="text-xs text-muted-foreground">
                            ({company.google_review_count})
                          </span>
                        )}
                      </span>
                    )}
                    {company.is_desi_owned && (
                      <span className="text-xs text-green-600">{t({ en: "Desi Owned", pa: "ਦੇਸੀ ਮਾਲਕੀ" })}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border bg-muted/40 p-6 text-center">
            {t({ en: "Loading top companies...", pa: "ਟੌਪ ਕੰਪਨੀਆਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ..." })}
          </p>
        )}

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "How We Ranked These Companies", pa: "ਅਸੀਂ ਇਹ ਰੈਂਕਿੰਗ ਕਿਵੇਂ ਕੀਤੀ" })}
        </h2>
        <p>
          {t({
            en: "We sorted by Google rating (4.0+) from real customer reviews. We didn't accept payment for placement. The data updates automatically.",
            pa: "ਅਸੀਂ ਅਸਲ ਕਸਟਮਰ ਰਿਵਿਊ ਤੋਂ Google ਰੇਟਿੰਗ (4.0+) ਅਨੁਸਾਰ ਲੜੀਬੱਧ ਕੀਤਾ। ਅਸੀਂ ਪਲੇਸਮੈਂਟ ਲਈ ਕੋਈ ਪੈਸੇ ਨਹੀਂ ਲਏ। ਡੇਟਾ ਆਪਣੇ ਆਪ ਅੱਪਡੇਟ ਹੁੰਦਾ ਹੈ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Before You Sign On", pa: "ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ" })}
        </h2>
        <p>
          {t({
            en: <>A high Google rating is a good start, but always check the company&apos;s{" "}
              <Link href="/safety" className="text-orange-600 hover:underline">safety record</Link>{" "}
              too. Ask for the DOT number and look up their safety rating, fleet size, and crash history.</>,
            pa: <>ਚੰਗੀ Google ਰੇਟਿੰਗ ਵਧੀਆ ਸ਼ੁਰੂਆਤ ਹੈ, ਪਰ ਕੰਪਨੀ ਦਾ{" "}
              <Link href="/safety" className="text-orange-600 hover:underline">ਸੇਫਟੀ ਰਿਕਾਰਡ</Link>{" "}
              ਵੀ ਜ਼ਰੂਰ ਚੈੱਕ ਕਰੋ। DOT ਨੰਬਰ ਮੰਗੋ ਤੇ ਸੇਫਟੀ ਰੇਟਿੰਗ, ਫਲੀਟ ਸਾਈਜ਼ ਤੇ ਕਰੈਸ਼ ਹਿਸਟਰੀ ਦੇਖੋ।</>,
          })}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/brampton-on/trucking-company">
            <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <MapPin className="h-4 w-4 text-orange-500" />
              {t({ en: "All Brampton Trucking Companies", pa: "ਸਾਰੀਆਂ Brampton ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ" })}
            </div>
          </Link>
          <Link href="/safety">
            <div className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
              <Shield className="h-4 w-4 text-green-600" />
              {t({ en: "Safety Lookup", pa: "ਸੇਫਟੀ ਲੁੱਕਅੱਪ" })}
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
