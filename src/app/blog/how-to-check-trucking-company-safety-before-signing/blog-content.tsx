"use client";

import Link from "next/link";
import { ChevronRight, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export function SafetyBlogContent({ title, description, date, readTime }: { title: string; description: string; date: string; readTime: string }) {
  const { t } = useLanguage();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">{t({ en: "Safety Check Guide", pa: "ਸੇਫਟੀ ਚੈੱਕ ਗਾਈਡ" })}</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
          {t({ en: "Safety", pa: "ਸੇਫਟੀ" })}
        </span>
        <LanguageToggle />
      </div>

      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t({ en: title, pa: "ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਟਰੱਕਿੰਗ ਕੰਪਨੀ ਦੀ ਸੇਫਟੀ ਕਿਵੇਂ ਚੈੱਕ ਕਰੀਏ" })}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t({ en: description, pa: "ਕਿਸੇ ਵੀ ਟਰੱਕਿੰਗ ਕੰਪਨੀ ਨਾਲ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਉਸਦੀ ਸੇਫਟੀ ਰੇਟਿੰਗ, ਫਲੀਟ ਸਾਈਜ਼ ਤੇ ਕਰੈਸ਼ ਹਿਸਟਰੀ ਚੈੱਕ ਕਰੋ। ਆਪਣੀ ਜ਼ਿੰਦਗੀ ਬਚਾਓ।" })}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{date} · {readTime}</p>
      </header>

      <div className="prose-custom mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          {t({
            en: "Every year, hundreds of Desi truckers sign on with companies without checking their safety records first. Some of these companies have \"Unsatisfactory\" ratings, active out-of-service orders, or a history of crashes. Don't be one of those drivers.",
            pa: "ਹਰ ਸਾਲ, ਸੈਂਕੜੇ ਦੇਸੀ ਟਰੱਕ ਡਰਾਈਵਰ ਬਿਨਾਂ ਸੇਫਟੀ ਰਿਕਾਰਡ ਚੈੱਕ ਕੀਤੇ ਕੰਪਨੀਆਂ ਨਾਲ ਸਾਈਨ ਕਰ ਲੈਂਦੇ ਹਨ। ਕੁਝ ਕੰਪਨੀਆਂ ਦੀ \"ਅਸੰਤੋਸ਼ਜਨਕ\" ਰੇਟਿੰਗ, ਆਊਟ-ਆਫ-ਸਰਵਿਸ ਹੁਕਮ, ਜਾਂ ਕਰੈਸ਼ ਦਾ ਇਤਿਹਾਸ ਹੈ। ਉਹਨਾਂ ਡਰਾਈਵਰਾਂ ਵਿੱਚੋਂ ਨਾ ਬਣੋ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Why Safety Records Matter", pa: "ਸੇਫਟੀ ਰਿਕਾਰਡ ਕਿਉਂ ਮਾਇਨੇ ਰੱਖਦੇ ਹਨ" })}
        </h2>
        <p>
          {t({
            en: "A company's safety record tells you how they maintain trucks, how many crashes they've had, and whether the government considers them safe to operate. This isn't just paperwork — it's your life on the line.",
            pa: "ਕੰਪਨੀ ਦਾ ਸੇਫਟੀ ਰਿਕਾਰਡ ਦੱਸਦਾ ਹੈ ਕਿ ਉਹ ਟਰੱਕ ਕਿਵੇਂ ਸਾਂਭਦੇ ਹਨ, ਕਿੰਨੇ ਕਰੈਸ਼ ਹੋਏ, ਤੇ ਸਰਕਾਰ ਉਹਨਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਮੰਨਦੀ ਹੈ ਜਾਂ ਨਹੀਂ। ਇਹ ਸਿਰਫ਼ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਨਹੀਂ — ਤੁਹਾਡੀ ਜ਼ਿੰਦਗੀ ਦਾ ਸਵਾਲ ਹੈ।",
          })}
        </p>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            {t({ en: "Red Flags to Watch For", pa: "ਇਹ ਖ਼ਤਰੇ ਦੇ ਨਿਸ਼ਾਨ ਧਿਆਨ ਰੱਖੋ" })}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{t({ en: "\"Conditional\" or \"Unsatisfactory\" safety rating — means the government found serious problems", pa: "\"ਸ਼ਰਤੀਆ\" ਜਾਂ \"ਅਸੰਤੋਸ਼ਜਨਕ\" ਸੇਫਟੀ ਰੇਟਿੰਗ — ਮਤਲਬ ਸਰਕਾਰ ਨੂੰ ਗੰਭੀਰ ਸਮੱਸਿਆਵਾਂ ਮਿਲੀਆਂ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{t({ en: "More power units than drivers — could mean trucks are poorly maintained or they're churning drivers", pa: "ਡਰਾਈਵਰਾਂ ਨਾਲੋਂ ਵੱਧ ਟਰੱਕ — ਮਤਲਬ ਟਰੱਕ ਠੀਕ ਨਹੀਂ ਸਾਂਭੇ ਜਾਂ ਡਰਾਈਵਰ ਟਿਕਦੇ ਨਹੀਂ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{t({ en: "Status is \"Inactive\" or \"Not Authorized\" — this company can't legally operate", pa: "ਸਥਿਤੀ \"ਅਕਿਰਿਆਸ਼ੀਲ\" ਜਾਂ \"ਅਣਅਧਿਕਾਰਤ\" — ਇਹ ਕੰਪਨੀ ਕਾਨੂੰਨੀ ਤੌਰ ਤੇ ਨਹੀਂ ਚੱਲ ਸਕਦੀ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span>{t({ en: "No phone number or physical address — legitimate carriers always have these on record", pa: "ਫ਼ੋਨ ਨੰਬਰ ਜਾਂ ਪਤਾ ਨਹੀਂ — ਜਾਇਜ਼ ਕੈਰੀਅਰ ਕੋਲ ਹਮੇਸ਼ਾ ਇਹ ਹੁੰਦੇ ਹਨ" })}</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "How to Look Up Any Carrier on DesiRig", pa: "DesiRig ਤੇ ਕੋਈ ਵੀ ਕੈਰੀਅਰ ਕਿਵੇਂ ਲੱਭੀਏ" })}
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">1</div>
            <div>
              <p className="font-medium text-foreground">{t({ en: "Get the company's DOT number", pa: "ਕੰਪਨੀ ਦਾ DOT ਨੰਬਰ ਲਓ" })}</p>
              <p className="text-sm">{t({ en: "Ask the company directly, or check their truck doors — the DOT number is required to be displayed on every commercial vehicle.", pa: "ਕੰਪਨੀ ਨੂੰ ਸਿੱਧਾ ਪੁੱਛੋ, ਜਾਂ ਟਰੱਕ ਦੇ ਦਰਵਾਜ਼ੇ ਚੈੱਕ ਕਰੋ — DOT ਨੰਬਰ ਹਰ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਤੇ ਲਿਖਣਾ ਜ਼ਰੂਰੀ ਹੈ।" })}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">2</div>
            <div>
              <p className="font-medium text-foreground">{t({ en: "Go to DesiRig Safety Lookup", pa: "DesiRig ਸੇਫਟੀ ਲੁੱਕਅੱਪ ਤੇ ਜਾਓ" })}</p>
              <p className="text-sm">{t({ en: "Visit our Safety Lookup page and enter the DOT number. We pull live data from government records.", pa: "ਸਾਡੇ ਸੇਫਟੀ ਲੁੱਕਅੱਪ ਪੇਜ ਤੇ ਜਾਓ ਤੇ DOT ਨੰਬਰ ਪਾਓ। ਅਸੀਂ ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਤੋਂ ਲਾਈਵ ਡੇਟਾ ਲੈਂਦੇ ਹਾਂ।" })}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">3</div>
            <div>
              <p className="font-medium text-foreground">{t({ en: "Check these 4 things", pa: "ਇਹ 4 ਚੀਜ਼ਾਂ ਚੈੱਕ ਕਰੋ" })}</p>
              <p className="text-sm">{t({ en: "Safety rating, fleet size (drivers vs. power units ratio), active status, and physical address.", pa: "ਸੇਫਟੀ ਰੇਟਿੰਗ, ਫਲੀਟ ਸਾਈਜ਼ (ਡਰਾਈਵਰ ਬਨਾਮ ਟਰੱਕ ਅਨੁਪਾਤ), ਐਕਟਿਵ ਸਥਿਤੀ, ਤੇ ਅਸਲ ਪਤਾ।" })}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            {t({ en: "What a Good Company Looks Like", pa: "ਚੰਗੀ ਕੰਪਨੀ ਕਿਹੋ ਜਿਹੀ ਲੱਗਦੀ ਹੈ" })}
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span>{t({ en: "\"Satisfactory\" safety rating — the best rating you can get", pa: "\"ਸੰਤੋਸ਼ਜਨਕ\" ਸੇਫਟੀ ਰੇਟਿੰਗ — ਸਭ ਤੋਂ ਵਧੀਆ ਰੇਟਿੰਗ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span>{t({ en: "Balanced driver-to-truck ratio — roughly 1:1 or more drivers than trucks", pa: "ਸੰਤੁਲਿਤ ਡਰਾਈਵਰ-ਟਰੱਕ ਅਨੁਪਾਤ — ਲਗਭਗ 1:1 ਜਾਂ ਟਰੱਕਾਂ ਨਾਲੋਂ ਵੱਧ ਡਰਾਈਵਰ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span>{t({ en: "Active operating authority — means they're authorized and in good standing", pa: "ਐਕਟਿਵ ਅਪਰੇਟਿੰਗ ਅਥਾਰਿਟੀ — ਮਤਲਬ ਅਧਿਕਾਰਤ ਤੇ ਚੰਗੀ ਹਾਲਤ ਵਿੱਚ" })}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span>{t({ en: "Real physical address — not a PO box or virtual office", pa: "ਅਸਲ ਪਤਾ — PO ਬਾਕਸ ਜਾਂ ਵਰਚੁਅਲ ਦਫ਼ਤਰ ਨਹੀਂ" })}</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Talk to Other Drivers", pa: "ਹੋਰ ਡਰਾਈਵਰਾਂ ਨਾਲ ਗੱਲ ਕਰੋ" })}
        </h2>
        <p>
          {t({
            en: "Safety records tell you one side of the story. Talk to current and former drivers. Ask about pay, maintenance, and whether the company treats drivers fairly. The Desi trucking community is tight — word travels fast.",
            pa: "ਸੇਫਟੀ ਰਿਕਾਰਡ ਸਿਰਫ਼ ਇੱਕ ਪਾਸਾ ਦੱਸਦੇ ਹਨ। ਮੌਜੂਦਾ ਤੇ ਪੁਰਾਣੇ ਡਰਾਈਵਰਾਂ ਨਾਲ ਗੱਲ ਕਰੋ। ਤਨਖ਼ਾਹ, ਟਰੱਕ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਤੇ ਡਰਾਈਵਰਾਂ ਨਾਲ ਵਰਤਾਅ ਬਾਰੇ ਪੁੱਛੋ। ਦੇਸੀ ਟਰੱਕਿੰਗ ਕਮਿਊਨਿਟੀ ਨੇੜੇ ਹੈ — ਗੱਲ ਜਲਦੀ ਫੈਲਦੀ ਹੈ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Bottom Line", pa: "ਸਿੱਟਾ" })}
        </h2>
        <p>
          {t({
            en: "Checking a company takes 2 minutes. Getting hurt because of a poorly maintained truck takes a lifetime. Use the DesiRig Safety Lookup before signing anything.",
            pa: "ਕੰਪਨੀ ਚੈੱਕ ਕਰਨ ਵਿੱਚ 2 ਮਿੰਟ ਲੱਗਦੇ ਹਨ। ਖ਼ਰਾਬ ਟਰੱਕ ਕਰਕੇ ਸੱਟ ਲੱਗਣ ਦਾ ਅਸਰ ਜ਼ਿੰਦਗੀ ਭਰ ਰਹਿੰਦਾ ਹੈ। ਕੁਝ ਵੀ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ DesiRig ਸੇਫਟੀ ਲੁੱਕਅੱਪ ਵਰਤੋ।",
          })}
        </p>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-center text-white">
          <Shield className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">{t({ en: "Check Any Carrier Now", pa: "ਹੁਣੇ ਕੋਈ ਵੀ ਕੈਰੀਅਰ ਚੈੱਕ ਕਰੋ" })}</h3>
          <p className="mt-1 text-green-100">
            {t({ en: "Live safety data from government records. Always free.", pa: "ਸਰਕਾਰੀ ਰਿਕਾਰਡ ਤੋਂ ਲਾਈਵ ਸੇਫਟੀ ਡੇਟਾ। ਹਮੇਸ਼ਾ ਮੁਫ਼ਤ।" })}
          </p>
          <Link href="/safety" className="mt-4 inline-block">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50">
              {t({ en: "Safety Lookup", pa: "ਸੇਫਟੀ ਲੁੱਕਅੱਪ" })}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
