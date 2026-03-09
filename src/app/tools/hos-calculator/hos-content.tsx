"use client";

import Link from "next/link";
import { ChevronRight, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export function HosContent() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "Hours of Service", pa: "ਸੇਵਾ ਦੇ ਘੰਟੇ" })}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <Clock className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({
            en: "Canadian Hours of Service (HOS) — Quick Reference",
            pa: "ਕੈਨੇਡੀਅਨ ਸੇਵਾ ਦੇ ਘੰਟੇ (HOS) — ਤੁਰੰਤ ਹਵਾਲਾ",
          })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Know your limits. A clear, simple breakdown of Canadian HOS rules.",
            pa: "ਆਪਣੀਆਂ ਹੱਦਾਂ ਜਾਣੋ। ਕੈਨੇਡੀਅਨ HOS ਨਿਯਮਾਂ ਦੀ ਸਾਫ਼ ਤੇ ਸਰਲ ਜਾਣਕਾਰੀ।",
          })}
        </p>
      </div>

      {/* Daily limits */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">
          {t({ en: "Daily Driving Limits", pa: "ਰੋਜ਼ਾਨਾ ਡਰਾਈਵਿੰਗ ਹੱਦਾਂ" })}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-orange-600">13 {t({ en: "hrs", pa: "ਘੰਟੇ" })}</div>
            <div className="mt-1 text-sm font-medium">{t({ en: "Maximum Driving Time", pa: "ਵੱਧ ਤੋਂ ਵੱਧ ਡਰਾਈਵਿੰਗ ਸਮਾਂ" })}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t({
                en: "After 13 hours of driving, you must stop driving.",
                pa: "13 ਘੰਟੇ ਡਰਾਈਵਿੰਗ ਤੋਂ ਬਾਅਦ, ਤੁਹਾਨੂੰ ਗੱਡੀ ਚਲਾਉਣੀ ਬੰਦ ਕਰਨੀ ਪਵੇਗੀ।",
              })}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-blue-600">14 {t({ en: "hrs", pa: "ਘੰਟੇ" })}</div>
            <div className="mt-1 text-sm font-medium">{t({ en: "Maximum On-Duty Window", pa: "ਵੱਧ ਤੋਂ ਵੱਧ ਡਿਊਟੀ ਸਮਾਂ" })}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t({
                en: "After 14 hours on-duty (driving + other work), you must stop all work.",
                pa: "14 ਘੰਟੇ ਡਿਊਟੀ (ਡਰਾਈਵਿੰਗ + ਹੋਰ ਕੰਮ) ਤੋਂ ਬਾਅਦ, ਸਾਰਾ ਕੰਮ ਬੰਦ ਕਰਨਾ ਪਵੇਗਾ।",
              })}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-green-600">8 {t({ en: "hrs", pa: "ਘੰਟੇ" })}</div>
            <div className="mt-1 text-sm font-medium">{t({ en: "Mandatory Off-Duty", pa: "ਲਾਜ਼ਮੀ ਛੁੱਟੀ" })}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t({
                en: "Must take at least 8 consecutive hours off before driving again.",
                pa: "ਦੁਬਾਰਾ ਗੱਡੀ ਚਲਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਲਗਾਤਾਰ 8 ਘੰਟੇ ਛੁੱਟੀ ਲੈਣੀ ਜ਼ਰੂਰੀ ਹੈ।",
              })}
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-purple-600">10 {t({ en: "hrs", pa: "ਘੰਟੇ" })}</div>
            <div className="mt-1 text-sm font-medium">{t({ en: "Total Off-Duty Required", pa: "ਕੁੱਲ ਛੁੱਟੀ ਲੋੜੀਂਦੀ" })}</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t({
                en: "Must have at least 10 hours off-duty in each 24-hour period.",
                pa: "ਹਰ 24 ਘੰਟੇ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 10 ਘੰਟੇ ਛੁੱਟੀ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Cycle options */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">
          {t({ en: "Cycle Options", pa: "ਸਾਈਕਲ ਵਿਕਲਪ" })}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-orange-200 bg-card p-5">
            <h3 className="font-bold text-orange-600">
              {t({ en: "Cycle 1 (Most Common)", pa: "ਸਾਈਕਲ 1 (ਸਭ ਤੋਂ ਆਮ)" })}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
                <span><strong>70 {t({ en: "hours", pa: "ਘੰਟੇ" })}</strong> {t({ en: "on-duty in", pa: "ਡਿਊਟੀ" })} <strong>7 {t({ en: "days", pa: "ਦਿਨਾਂ ਵਿੱਚ" })}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
                <span>{t({ en: "Reset:", pa: "ਰੀਸੈੱਟ:" })} <strong>{t({ en: "36 consecutive hours off-duty", pa: "ਲਗਾਤਾਰ 36 ਘੰਟੇ ਛੁੱਟੀ" })}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                <span>{t({ en: "Best for: most long-haul drivers", pa: "ਸਭ ਤੋਂ ਵਧੀਆ: ਲੌਂਗ-ਹਾਲ ਡਰਾਈਵਰਾਂ ਲਈ" })}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-bold text-blue-600">
              {t({ en: "Cycle 2", pa: "ਸਾਈਕਲ 2" })}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>120 {t({ en: "hours", pa: "ਘੰਟੇ" })}</strong> {t({ en: "on-duty in", pa: "ਡਿਊਟੀ" })} <strong>14 {t({ en: "days", pa: "ਦਿਨਾਂ ਵਿੱਚ" })}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                <span>{t({ en: "Reset:", pa: "ਰੀਸੈੱਟ:" })} <strong>{t({ en: "72 consecutive hours off-duty", pa: "ਲਗਾਤਾਰ 72 ਘੰਟੇ ਛੁੱਟੀ" })}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                <span>{t({ en: "Best for: team drivers, multi-week trips", pa: "ਸਭ ਤੋਂ ਵਧੀਆ: ਟੀਮ ਡਰਾਈਵਰ, ਕਈ ਹਫ਼ਤਿਆਂ ਦੇ ਸਫ਼ਰ" })}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandatory rest */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">
          {t({ en: "Mandatory Rest Breaks", pa: "ਲਾਜ਼ਮੀ ਆਰਾਮ ਬ੍ਰੇਕ" })}
        </h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{t({ en: "24-Hour Rule", pa: "24-ਘੰਟੇ ਦਾ ਨਿਯਮ" })}</p>
                <p className="text-sm text-muted-foreground">
                  {t({
                    en: "Must take at least 24 consecutive hours off-duty every 14 days (under either cycle).",
                    pa: "ਹਰ 14 ਦਿਨਾਂ ਵਿੱਚ ਲਗਾਤਾਰ 24 ਘੰਟੇ ਛੁੱਟੀ ਲੈਣੀ ਜ਼ਰੂਰੀ ਹੈ (ਕਿਸੇ ਵੀ ਸਾਈਕਲ ਵਿੱਚ)।",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{t({ en: "Sleeper Berth Split", pa: "ਸਲੀਪਰ ਬਰਥ ਸਪਲਿਟ" })}</p>
                <p className="text-sm text-muted-foreground">
                  {t({
                    en: "You can split your 10 hours off-duty into two periods: one must be at least 2 hours (in sleeper berth), and the other must be at least 8 hours (in sleeper berth). Neither period counts against your 14-hour window.",
                    pa: "ਤੁਸੀਂ ਆਪਣੇ 10 ਘੰਟੇ ਛੁੱਟੀ ਨੂੰ ਦੋ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਸਕਦੇ ਹੋ: ਇੱਕ ਘੱਟੋ-ਘੱਟ 2 ਘੰਟੇ (ਸਲੀਪਰ ਬਰਥ ਵਿੱਚ), ਅਤੇ ਦੂਜਾ ਘੱਟੋ-ਘੱਟ 8 ਘੰਟੇ (ਸਲੀਪਰ ਬਰਥ ਵਿੱਚ)। ਕੋਈ ਵੀ ਹਿੱਸਾ ਤੁਹਾਡੇ 14-ਘੰਟੇ ਵਿੰਡੋ ਵਿੱਚ ਨਹੀਂ ਗਿਣਿਆ ਜਾਂਦਾ।",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{t({ en: "Deferral (Day 1 / Day 2)", pa: "ਡਿਫਰਲ (ਦਿਨ 1 / ਦਿਨ 2)" })}</p>
                <p className="text-sm text-muted-foreground">
                  {t({
                    en: "You can defer up to 2 hours of off-duty from Day 1 to Day 2, effectively driving up to 15 hours in one day — but you must make it up the next day with 2 extra hours off.",
                    pa: "ਤੁਸੀਂ ਦਿਨ 1 ਦੀ ਛੁੱਟੀ ਵਿੱਚੋਂ 2 ਘੰਟੇ ਦਿਨ 2 ਤੇ ਪਾ ਸਕਦੇ ਹੋ, ਮਤਲਬ ਇੱਕ ਦਿਨ 15 ਘੰਟੇ ਤੱਕ ਡਰਾਈਵ ਕਰ ਸਕਦੇ ਹੋ — ਪਰ ਅਗਲੇ ਦਿਨ 2 ਘੰਟੇ ਵਾਧੂ ਛੁੱਟੀ ਲੈਣੀ ਪਵੇਗੀ।",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Violations */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">
          {t({ en: "What Happens If You Violate HOS?", pa: "HOS ਦੀ ਉਲੰਘਣਾ ਕਰਨ ਤੇ ਕੀ ਹੁੰਦਾ?" })}
        </h2>
        <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-red-800">
              <p>
                <strong>{t({ en: "Fines:", pa: "ਜੁਰਮਾਨੇ:" })}</strong> {t({
                  en: "$200 to $5,000+ per violation, depending on province and severity.",
                  pa: "$200 ਤੋਂ $5,000+ ਪ੍ਰਤੀ ਉਲੰਘਣਾ, ਪ੍ਰਾਂਤ ਤੇ ਗੰਭੀਰਤਾ ਦੇ ਹਿਸਾਬ ਨਾਲ।",
                })}
              </p>
              <p>
                <strong>{t({ en: "Out-of-service (OOS) order:", pa: "ਆਊਟ-ਆਫ-ਸਰਵਿਸ (OOS) ਹੁਕਮ:" })}</strong> {t({
                  en: "You cannot drive until you're back in compliance. This means sitting at a truck stop until your hours reset.",
                  pa: "ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਨਿਯਮ ਪੂਰੇ ਨਹੀਂ ਕਰਦੇ ਗੱਡੀ ਨਹੀਂ ਚਲਾ ਸਕਦੇ। ਮਤਲਬ ਟਰੱਕ ਸਟਾਪ ਤੇ ਬੈਠੇ ਰਹੋ ਜਦੋਂ ਤੱਕ ਘੰਟੇ ਰੀਸੈੱਟ ਨਹੀਂ ਹੁੰਦੇ।",
                })}
              </p>
              <p>
                <strong>{t({ en: "Safety record impact:", pa: "ਸੇਫਟੀ ਰਿਕਾਰਡ ਤੇ ਅਸਰ:" })}</strong> {t({
                  en: "Violations go on both your record and your carrier's record. Too many violations = lower safety rating = higher insurance = possible shutdown.",
                  pa: "ਉਲੰਘਣਾ ਤੁਹਾਡੇ ਅਤੇ ਤੁਹਾਡੇ ਕੈਰੀਅਰ ਦੋਵਾਂ ਦੇ ਰਿਕਾਰਡ ਤੇ ਆਉਂਦੀ ਹੈ। ਜ਼ਿਆਦਾ ਉਲੰਘਣਾ = ਘੱਟ ਸੇਫਟੀ ਰੇਟਿੰਗ = ਵੱਧ ਇੰਸ਼ੋਰੈਂਸ = ਬੰਦ ਹੋ ਸਕਦਾ।",
                })}
              </p>
              <p>
                <strong>{t({ en: "ELD enforcement:", pa: "ELD ਲਾਗੂ:" })}</strong> {t({
                  en: "Electronic logging devices make it nearly impossible to fake logs. Officers can see violations instantly during an inspection.",
                  pa: "ਇਲੈਕਟ੍ਰਾਨਿਕ ਲੌਗਿੰਗ ਡਿਵਾਈਸ ਨਾਲ ਲੌਗ ਫ਼ਰਜ਼ੀ ਬਣਾਉਣਾ ਲਗਭਗ ਨਾਮੁਮਕਿਨ ਹੈ। ਇੰਸਪੈਕਸ਼ਨ ਦੌਰਾਨ ਅਫ਼ਸਰ ਤੁਰੰਤ ਉਲੰਘਣਾ ਦੇਖ ਸਕਦੇ ਹਨ।",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip box */}
      <div className="mt-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <h2 className="text-xl font-bold">
          {t({ en: "Pro Tips for Managing Your Hours", pa: "ਆਪਣੇ ਘੰਟੇ ਸੰਭਾਲਣ ਲਈ ਪ੍ਰੋ ਟਿਪਸ" })}
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-orange-100">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{t({
              en: "Plan your trip with stops BEFORE you start driving. Know where you'll park tonight.",
              pa: "ਗੱਡੀ ਚਲਾਉਣ ਤੋਂ ਪਹਿਲਾਂ ਸਫ਼ਰ ਦੀ ਪਲੈਨ ਬਣਾਓ। ਪਤਾ ਹੋਵੇ ਕਿ ਅੱਜ ਰਾਤ ਕਿੱਥੇ ਖੜ੍ਹਣਾ।",
            })}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{t({
              en: "Use the deferral option wisely — save it for days when loading/unloading eats your clock.",
              pa: "ਡਿਫਰਲ ਸਮਝਦਾਰੀ ਨਾਲ ਵਰਤੋ — ਉਹਨਾਂ ਦਿਨਾਂ ਲਈ ਬਚਾਓ ਜਦੋਂ ਲੋਡਿੰਗ/ਅਨਲੋਡਿੰਗ ਸਮਾਂ ਖਾ ਜਾਵੇ।",
            })}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{t({
              en: "Take your 36-hour reset over a weekend when freight is slower anyway.",
              pa: "36 ਘੰਟੇ ਰੀਸੈੱਟ ਵੀਕੈਂਡ ਤੇ ਲਓ ਜਦੋਂ ਫ਼ਰੇਟ ਵੈਸੇ ਵੀ ਘੱਟ ਹੁੰਦਾ।",
            })}</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>{t({
              en: "Never let a dispatcher push you to drive tired. Your licence, your responsibility.",
              pa: "ਕਦੇ ਵੀ ਡਿਸਪੈਚਰ ਨੂੰ ਥੱਕੇ ਹੋਏ ਡਰਾਈਵ ਕਰਨ ਲਈ ਨਾ ਮੰਨੋ। ਤੁਹਾਡਾ ਲਾਇਸੈਂਸ, ਤੁਹਾਡੀ ਜ਼ਿੰਮੇਵਾਰੀ।",
            })}</span>
          </li>
        </ul>
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Reference", pa: "ਇਸ ਹਵਾਲੇ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "This page covers federal Canadian Hours of Service (HOS) rules as defined under the Commercial Vehicle Drivers Hours of Service Regulations (SOR/2005-313). Provincial variations may apply. This is a simplified reference — for the complete regulations, consult the official Transport Canada documentation. Always follow the most restrictive applicable rule.",
            pa: "ਇਹ ਪੰਨਾ ਕੈਨੇਡੀਅਨ ਫੈਡਰਲ ਸੇਵਾ ਦੇ ਘੰਟੇ (HOS) ਦੇ ਨਿਯਮ ਦੱਸਦਾ ਹੈ ਜੋ ਕਮਰਸ਼ੀਅਲ ਵਹੀਕਲ ਡਰਾਈਵਰਜ਼ ਅਵਰਜ਼ ਆਫ਼ ਸਰਵਿਸ ਰੈਗੂਲੇਸ਼ਨਜ਼ (SOR/2005-313) ਅਧੀਨ ਹਨ। ਪ੍ਰਾਂਤਕ ਫ਼ਰਕ ਹੋ ਸਕਦੇ ਹਨ। ਇਹ ਸਰਲ ਹਵਾਲਾ ਹੈ — ਪੂਰੇ ਨਿਯਮਾਂ ਲਈ ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ ਦੇ ਅਧਿਕਾਰਤ ਦਸਤਾਵੇਜ਼ ਵੇਖੋ।",
          })}
        </p>
      </div>
    </div>
  );
}
