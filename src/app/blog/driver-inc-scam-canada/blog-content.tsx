"use client";

import Link from "next/link";
import { ChevronRight, AlertTriangle, CheckCircle, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export function DriverIncScamContent({
  title,
  description,
  date,
  readTime,
}: {
  title: string;
  description: string;
  date: string;
  readTime: string;
}) {
  const { t } = useLanguage();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">{t({ en: "Driver Inc. Scam", pa: "Driver Inc. ਘਪਲਾ" })}</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
          {t({ en: "Safety", pa: "ਸੇਫਟੀ" })}
        </span>
        <LanguageToggle />
      </div>

      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t({ en: title, pa: "Driver Inc. ਘਪਲਾ: ਕੈਨੇਡਾ ਵਿੱਚ ਹਰ ਦੇਸੀ ਟਰੱਕ ਡਰਾਈਵਰ ਨੂੰ ਕੀ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ" })}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t({ en: description, pa: "\"Driver Inc.\" ਘਪਲੇ ਤੋਂ ਆਪਣੇ ਆਪ ਨੂੰ ਬਚਾਓ। ਜਾਣੋ ਇਹ ਕੀ ਹੈ, ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਤੇ ਇਸ ਤੋਂ ਕਿਵੇਂ ਦੂਰ ਰਹੀਏ।" })}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {date} &middot; {readTime}
        </p>
      </header>

      <div className="prose-custom mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          {t({
            en: "\"Driver Inc.\" is the biggest scam in Canadian trucking right now. Thousands of Desi truckers are being classified as \"independent contractors\" through numbered companies, even though they&apos;re really employees. Here&apos;s what you need to know to protect yourself.",
            pa: "\"Driver Inc.\" ਇਸ ਵੇਲੇ ਕੈਨੇਡੀਅਨ ਟਰੱਕਿੰਗ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਡਾ ਘਪਲਾ ਹੈ। ਹਜ਼ਾਰਾਂ ਦੇਸੀ ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਨੂੰ ਨੰਬਰਡ ਕੰਪਨੀਆਂ ਰਾਹੀਂ \"ਇੰਡੀਪੈਂਡੈਂਟ ਕੰਟਰੈਕਟਰ\" ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ, ਜਦੋਂ ਕਿ ਉਹ ਅਸਲ ਵਿੱਚ ਕਰਮਚਾਰੀ ਹਨ। ਆਪਣੇ ਆਪ ਨੂੰ ਬਚਾਉਣ ਲਈ ਇਹ ਜਾਣੋ।",
          })}
        </p>

        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {t({ en: "What Is the Driver Inc. Scam?", pa: "Driver Inc. ਘਪਲਾ ਕੀ ਹੈ?" })}
          </h2>
          <p className="mt-2 text-sm text-red-700">
            {t({
              en: "A trucking company tells you to incorporate a numbered company (like \"1234567 Ontario Inc.\"). They pay your company instead of paying you as an employee. This lets them avoid paying CPP, EI, WSIB, vacation pay, and overtime. You lose all worker protections.",
              pa: "ਟਰੱਕਿੰਗ ਕੰਪਨੀ ਤੁਹਾਨੂੰ ਨੰਬਰਡ ਕੰਪਨੀ ਬਣਾਉਣ ਲਈ ਕਹਿੰਦੀ ਹੈ (ਜਿਵੇਂ \"1234567 Ontario Inc.\")। ਉਹ ਤੁਹਾਡੀ ਕੰਪਨੀ ਨੂੰ ਪੈਸੇ ਦਿੰਦੇ ਹਨ, ਤੁਹਾਨੂੰ ਕਰਮਚਾਰੀ ਵਜੋਂ ਨਹੀਂ। ਇਸ ਨਾਲ ਉਹ CPP, EI, WSIB, ਛੁੱਟੀਆਂ ਦੀ ਤਨਖ਼ਾਹ ਤੇ ਓਵਰਟਾਈਮ ਦੇਣ ਤੋਂ ਬਚਦੇ ਹਨ। ਤੁਸੀਂ ਸਾਰੀਆਂ ਕਰਮਚਾਰੀ ਸੁਰੱਖਿਆਵਾਂ ਗੁਆ ਲੈਂਦੇ ਹੋ।",
            })}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "How the Scam Works, Step by Step", pa: "ਘਪਲਾ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ, ਕਦਮ-ਦਰ-ਕਦਮ" })}
        </h2>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">1</div>
            <div>
              <p className="font-medium text-foreground">
                {t({ en: "Company says \"incorporate to get paid more\"", pa: "ਕੰਪਨੀ ਕਹਿੰਦੀ \"ਇੰਕਾਰਪੋਰੇਟ ਕਰੋ, ਜ਼ਿਆਦਾ ਪੈਸੇ ਮਿਲਣਗੇ\"" })}
              </p>
              <p className="text-sm">
                {t({
                  en: "They promise higher per-mile rates because there are \"no deductions.\" Sounds good, right? Until you see what you&apos;re actually losing.",
                  pa: "ਉਹ ਵੱਧ ਪ੍ਰਤੀ-ਮੀਲ ਰੇਟ ਦਾ ਲਾਲਚ ਦਿੰਦੇ ਹਨ ਕਿਉਂਕਿ \"ਕੋਈ ਕਟੌਤੀ ਨਹੀਂ।\" ਸੁਣਨ ਨੂੰ ਚੰਗਾ ਲੱਗਦਾ, ਜਦ ਤੱਕ ਪਤਾ ਨਹੀਂ ਲੱਗਦਾ ਕਿ ਕੀ ਗੁਆ ਰਹੇ ਹੋ।",
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">2</div>
            <div>
              <p className="font-medium text-foreground">
                {t({ en: "You incorporate a numbered company", pa: "ਤੁਸੀਂ ਨੰਬਰਡ ਕੰਪਨੀ ਬਣਾਉਂਦੇ ਹੋ" })}
              </p>
              <p className="text-sm">
                {t({
                  en: "A paralegal or accountant (often recommended by the trucking company) sets up a numbered Ontario Inc. for you. Costs $500-$1,000.",
                  pa: "ਇੱਕ ਪੈਰਾਲੀਗਲ ਜਾਂ ਅਕਾਊਂਟੈਂਟ (ਅਕਸਰ ਟਰੱਕਿੰਗ ਕੰਪਨੀ ਵੱਲੋਂ ਸਿਫ਼ਾਰਸ਼ ਕੀਤਾ) ਤੁਹਾਡੇ ਲਈ ਨੰਬਰਡ Ontario Inc. ਬਣਾ ਦਿੰਦਾ ਹੈ। ਖ਼ਰਚਾ $500-$1,000।",
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">3</div>
            <div>
              <p className="font-medium text-foreground">
                {t({ en: "You drive their truck, follow their rules, but you&apos;re \"not an employee\"", pa: "ਤੁਸੀਂ ਉਹਨਾਂ ਦਾ ਟਰੱਕ ਚਲਾਉਂਦੇ ਹੋ, ਉਹਨਾਂ ਦੇ ਨਿਯਮ ਮੰਨਦੇ ਹੋ, ਪਰ ਤੁਸੀਂ \"ਕਰਮਚਾਰੀ ਨਹੀਂ\"" })}
              </p>
              <p className="text-sm">
                {t({
                  en: "You drive their equipment, follow their dispatch, wear their uniform. But on paper, your corporation is an \"independent contractor.\"",
                  pa: "ਤੁਸੀਂ ਉਹਨਾਂ ਦਾ ਸਾਮਾਨ ਵਰਤਦੇ ਹੋ, ਉਹਨਾਂ ਦੀ ਡਿਸਪੈਚ ਮੰਨਦੇ ਹੋ, ਉਹਨਾਂ ਦੀ ਵਰਦੀ ਪਾਉਂਦੇ ਹੋ। ਪਰ ਕਾਗਜ਼ਾਂ ਤੇ ਤੁਹਾਡੀ ਕਾਰਪੋਰੇਸ਼ਨ \"ਇੰਡੀਪੈਂਡੈਂਟ ਕੰਟਰੈਕਟਰ\" ਹੈ।",
                })}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">4</div>
            <div>
              <p className="font-medium text-foreground">
                {t({ en: "You lose everything employees get", pa: "ਤੁਸੀਂ ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਮਿਲਣ ਵਾਲਾ ਸਭ ਕੁਝ ਗੁਆ ਲੈਂਦੇ ਹੋ" })}
              </p>
              <p className="text-sm">
                {t({
                  en: "No CPP contributions (smaller pension), no EI (no safety net if laid off), no WSIB (no coverage if injured on the job), no vacation pay, no overtime.",
                  pa: "CPP ਯੋਗਦਾਨ ਨਹੀਂ (ਘੱਟ ਪੈਨਸ਼ਨ), EI ਨਹੀਂ (ਨੌਕਰੀ ਜਾਵੇ ਤਾਂ ਕੋਈ ਸਹਾਰਾ ਨਹੀਂ), WSIB ਨਹੀਂ (ਕੰਮ ਤੇ ਸੱਟ ਲੱਗੇ ਤਾਂ ਕੋਈ ਕਵਰ ਨਹੀਂ), ਛੁੱਟੀਆਂ ਦੀ ਤਨਖ਼ਾਹ ਨਹੀਂ, ਓਵਰਟਾਈਮ ਨਹੀਂ।",
                })}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "What You Lose as \"Driver Inc.\"", pa: "\"Driver Inc.\" ਵਜੋਂ ਤੁਸੀਂ ਕੀ ਗੁਆਉਂਦੇ ਹੋ" })}
        </h2>
        <div className="rounded-xl border bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "CPP contributions", pa: "CPP ਯੋਗਦਾਨ" })}</strong>
                <p>{t({ en: "~$3,800/yr in lost pension credits", pa: "~$3,800/ਸਾਲ ਪੈਨਸ਼ਨ ਕ੍ਰੈਡਿਟ ਦਾ ਨੁਕਸਾਨ" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "EI benefits", pa: "EI ਲਾਭ" })}</strong>
                <p>{t({ en: "No unemployment insurance if you lose your job", pa: "ਨੌਕਰੀ ਜਾਵੇ ਤਾਂ ਬੇਰੋਜ਼ਗਾਰੀ ਬੀਮਾ ਨਹੀਂ" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "WSIB coverage", pa: "WSIB ਕਵਰੇਜ" })}</strong>
                <p>{t({ en: "No workplace injury coverage. One accident could bankrupt you.", pa: "ਕੰਮ ਤੇ ਸੱਟ ਦੀ ਕਵਰੇਜ ਨਹੀਂ। ਇੱਕ ਐਕਸੀਡੈਂਟ ਤੁਹਾਨੂੰ ਤਬਾਹ ਕਰ ਸਕਦਾ।" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "Vacation pay (4%)", pa: "ਛੁੱਟੀਆਂ ਦੀ ਤਨਖ਼ਾਹ (4%)" })}</strong>
                <p>{t({ en: "~$2,000-$3,000/yr you're not getting", pa: "~$2,000-$3,000/ਸਾਲ ਜੋ ਤੁਹਾਨੂੰ ਨਹੀਂ ਮਿਲ ਰਹੇ" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "Overtime pay", pa: "ਓਵਰਟਾਈਮ ਤਨਖ਼ਾਹ" })}</strong>
                <p>{t({ en: "No 1.5x after standard hours", pa: "ਸਟੈਂਡਰਡ ਘੰਟਿਆਂ ਤੋਂ ਬਾਅਦ 1.5 ਗੁਣਾ ਨਹੀਂ" })}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">{t({ en: "Accounting costs", pa: "ਅਕਾਊਂਟਿੰਗ ਖ਼ਰਚੇ" })}</strong>
                <p>{t({ en: "$1,500-$3,000/yr for corporate tax filing", pa: "$1,500-$3,000/ਸਾਲ ਕਾਰਪੋਰੇਟ ਟੈਕਸ ਫਾਇਲਿੰਗ ਲਈ" })}</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-red-600">
            {t({
              en: "Total loss: $10,000-$15,000+ per year compared to being a regular employee.",
              pa: "ਕੁੱਲ ਨੁਕਸਾਨ: ਰੈਗੂਲਰ ਕਰਮਚਾਰੀ ਦੇ ਮੁਕਾਬਲੇ $10,000-$15,000+ ਪ੍ਰਤੀ ਸਾਲ।",
            })}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "How to Protect Yourself", pa: "ਆਪਣੇ ਆਪ ਨੂੰ ਕਿਵੇਂ ਬਚਾਈਏ" })}
        </h2>
        <div className="rounded-xl border bg-card p-5">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                <strong className="text-foreground">{t({ en: "Ask if they hire employees.", pa: "ਪੁੱਛੋ ਕਿ ਕੀ ਉਹ ਕਰਮਚਾਰੀ ਰੱਖਦੇ ਹਨ।" })}</strong>{" "}
                {t({
                  en: "Legitimate companies hire you on payroll with T4 slips, not through a numbered company.",
                  pa: "ਜਾਇਜ਼ ਕੰਪਨੀਆਂ ਤੁਹਾਨੂੰ T4 ਸਲਿੱਪ ਨਾਲ ਪੇਰੋਲ ਤੇ ਰੱਖਦੀਆਂ ਹਨ, ਨੰਬਰਡ ਕੰਪਨੀ ਰਾਹੀਂ ਨਹੀਂ।",
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                <strong className="text-foreground">{t({ en: "Check their safety record.", pa: "ਉਹਨਾਂ ਦਾ ਸੇਫਟੀ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ।" })}</strong>{" "}
                {t({
                  en: <>Use our <Link href="/safety" className="text-orange-600 hover:underline">Safety Lookup</Link> to verify the company before signing anything.</>,
                  pa: <>ਕੁਝ ਵੀ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਡੇ <Link href="/safety" className="text-orange-600 hover:underline">ਸੇਫਟੀ ਲੁੱਕਅੱਪ</Link> ਨਾਲ ਕੰਪਨੀ ਵੈਰੀਫਾਈ ਕਰੋ।</>,
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                <strong className="text-foreground">{t({ en: "Talk to current drivers.", pa: "ਮੌਜੂਦਾ ਡਰਾਈਵਰਾਂ ਨਾਲ ਗੱਲ ਕਰੋ।" })}</strong>{" "}
                {t({
                  en: "Ask if they&apos;re on payroll or through a numbered company. The Desi trucking community talks. Use that network.",
                  pa: "ਪੁੱਛੋ ਕਿ ਕੀ ਉਹ ਪੇਰੋਲ ਤੇ ਹਨ ਜਾਂ ਨੰਬਰਡ ਕੰਪਨੀ ਰਾਹੀਂ। ਦੇਸੀ ਟਰੱਕਿੰਗ ਕਮਿਊਨਿਟੀ ਵਿੱਚ ਗੱਲ ਫੈਲਦੀ ਹੈ। ਇਸ ਨੈੱਟਵਰਕ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                <strong className="text-foreground">{t({ en: "Never let the company choose your accountant.", pa: "ਕੰਪਨੀ ਨੂੰ ਆਪਣਾ ਅਕਾਊਂਟੈਂਟ ਨਾ ਚੁਣਨ ਦਿਓ।" })}</strong>{" "}
                {t({
                  en: "If the company is setting up your corporation and choosing who does your books, that's a red flag.",
                  pa: "ਜੇ ਕੰਪਨੀ ਤੁਹਾਡੀ ਕਾਰਪੋਰੇਸ਼ਨ ਬਣਾ ਰਹੀ ਹੈ ਤੇ ਅਕਾਊਂਟੈਂਟ ਵੀ ਆਪ ਚੁਣ ਰਹੀ ਹੈ, ਤਾਂ ਇਹ ਖ਼ਤਰੇ ਦਾ ਨਿਸ਼ਾਨ ਹੈ।",
                })}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>
                <strong className="text-foreground">{t({ en: "Know the CRA test.", pa: "CRA ਦਾ ਟੈਸਟ ਜਾਣੋ।" })}</strong>{" "}
                {t({
                  en: "If you drive their truck, follow their schedule, and can&apos;t work for anyone else, you&apos;re an employee. Doesn&apos;t matter what the contract says.",
                  pa: "ਜੇ ਤੁਸੀਂ ਉਹਨਾਂ ਦਾ ਟਰੱਕ ਚਲਾਉਂਦੇ ਹੋ, ਉਹਨਾਂ ਦਾ ਸ਼ੈਡਿਊਲ ਮੰਨਦੇ ਹੋ, ਤੇ ਕਿਸੇ ਹੋਰ ਲਈ ਕੰਮ ਨਹੀਂ ਕਰ ਸਕਦੇ, ਤੁਸੀਂ ਕਰਮਚਾਰੀ ਹੋ। ਭਾਵੇਂ ਕੰਟਰੈਕਟ ਕੁਝ ਵੀ ਕਹੇ।",
                })}
              </span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "The Government Is Cracking Down", pa: "ਸਰਕਾਰ ਸਖ਼ਤੀ ਕਰ ਰਹੀ ਹੈ" })}
        </h2>
        <p>
          {t({
            en: "The CRA and Ontario Ministry of Labour are actively investigating Driver Inc. schemes. Companies caught misclassifying workers face penalties, and drivers may be reassessed for back taxes. The federal government has called it \"the single biggest issue in Canadian trucking.\"",
            pa: "CRA ਤੇ Ontario Ministry of Labour Driver Inc. ਘਪਲਿਆਂ ਦੀ ਸਰਗਰਮੀ ਨਾਲ ਜਾਂਚ ਕਰ ਰਹੇ ਹਨ। ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਗਲਤ ਵਰਗੀਕਰਨ ਕਰਨ ਵਾਲੀਆਂ ਕੰਪਨੀਆਂ ਨੂੰ ਜੁਰਮਾਨੇ ਹੋਣਗੇ, ਤੇ ਡਰਾਈਵਰਾਂ ਦੇ ਪੁਰਾਣੇ ਟੈਕਸ ਮੁੜ ਲਗਾਏ ਜਾ ਸਕਦੇ ਹਨ। ਫੈਡਰਲ ਸਰਕਾਰ ਨੇ ਇਸ ਨੂੰ \"ਕੈਨੇਡੀਅਨ ਟਰੱਕਿੰਗ ਦਾ ਸਭ ਤੋਂ ਵੱਡਾ ਮਸਲਾ\" ਕਿਹਾ ਹੈ।",
          })}
        </p>

        <p>
          {t({
            en: "If you're currently working through a numbered company but feel like an employee, you can file a complaint with the CRA or your provincial employment standards office. You may be entitled to back pay for CPP, EI, and vacation.",
            pa: "ਜੇ ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਨੰਬਰਡ ਕੰਪਨੀ ਰਾਹੀਂ ਕੰਮ ਕਰ ਰਹੇ ਹੋ ਪਰ ਮਹਿਸੂਸ ਕਰਦੇ ਹੋ ਕਿ ਤੁਸੀਂ ਕਰਮਚਾਰੀ ਹੋ, ਤਾਂ CRA ਜਾਂ ਸੂਬੇ ਦੇ ਰੋਜ਼ਗਾਰ ਮਿਆਰ ਦਫ਼ਤਰ ਵਿੱਚ ਸ਼ਿਕਾਇਤ ਕਰ ਸਕਦੇ ਹੋ। ਤੁਹਾਨੂੰ CPP, EI, ਤੇ ਛੁੱਟੀਆਂ ਦੀ ਪਿਛਲੀ ਤਨਖ਼ਾਹ ਮਿਲ ਸਕਦੀ ਹੈ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Bottom Line", pa: "ਸਿੱਟਾ" })}
        </h2>
        <p>
          {t({
            en: "If a company tells you to incorporate, walk away. Legitimate carriers hire employees on payroll. The \"higher rate\" they promise doesn't cover what you lose in benefits, protections, and pension. Check any company's record on DesiRig before signing anything.",
            pa: "ਜੇ ਕੋਈ ਕੰਪਨੀ ਇੰਕਾਰਪੋਰੇਟ ਕਰਨ ਲਈ ਕਹੇ, ਉੱਥੋਂ ਚੱਲੇ ਜਾਓ। ਜਾਇਜ਼ ਕੈਰੀਅਰ ਕਰਮਚਾਰੀਆਂ ਨੂੰ ਪੇਰੋਲ ਤੇ ਰੱਖਦੇ ਹਨ। ਉਹ \"ਵੱਧ ਰੇਟ\" ਜੋ ਦੱਸਦੇ ਹਨ ਉਹ ਤੁਹਾਡੇ ਗੁਆਚੇ ਲਾਭਾਂ, ਸੁਰੱਖਿਆ ਤੇ ਪੈਨਸ਼ਨ ਦੀ ਭਰਪਾਈ ਨਹੀਂ ਕਰਦਾ। ਕੁਝ ਵੀ ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ DesiRig ਤੇ ਕੰਪਨੀ ਦਾ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ।",
          })}
        </p>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-center text-white">
          <Shield className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">{t({ en: "Check Any Carrier's Record", pa: "ਕਿਸੇ ਵੀ ਕੈਰੀਅਰ ਦਾ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ" })}</h3>
          <p className="mt-1 text-green-100">
            {t({
              en: "Look up safety ratings, fleet size, and driver count before signing on.",
              pa: "ਸਾਈਨ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸੇਫਟੀ ਰੇਟਿੰਗ, ਫਲੀਟ ਸਾਈਜ਼ ਤੇ ਡਰਾਈਵਰਾਂ ਦੀ ਗਿਣਤੀ ਚੈੱਕ ਕਰੋ।",
            })}
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
