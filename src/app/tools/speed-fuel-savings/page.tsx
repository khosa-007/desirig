"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Gauge, Fuel, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export default function SpeedFuelSavingsPage() {
  const { lang, t } = useLanguage();
  const [currentSpeed, setCurrentSpeed] = useState("105");
  const [newSpeed, setNewSpeed] = useState("100");
  const [fuelPrice, setFuelPrice] = useState("1.65");
  const [weeklyKm, setWeeklyKm] = useState("4000");
  const [baseMpg, setBaseMpg] = useState("6.0");
  const [result, setResult] = useState<{
    oldLper100: number;
    newLper100: number;
    savedPerWeek: number;
    savedPerMonth: number;
    savedPerYear: number;
    litresSavedWeek: number;
    percentSaved: number;
  } | null>(null);

  function calculate() {
    const sOld = parseFloat(currentSpeed);
    const sNew = parseFloat(newSpeed);
    const price = parseFloat(fuelPrice);
    const km = parseFloat(weeklyKm);
    const mpg = parseFloat(baseMpg);

    if (!sOld || !sNew || !price || !km || !mpg || sOld <= 0 || sNew <= 0) return;
    if (sNew >= sOld) { setResult(null); return; }

    const baseLper100 = 235.215 / mpg;
    const refSpeed = 90;
    const penaltyPerKmh = 0.013;

    const oldPenalty = sOld > refSpeed ? 1 + (sOld - refSpeed) * penaltyPerKmh : 1;
    const newPenalty = sNew > refSpeed ? 1 + (sNew - refSpeed) * penaltyPerKmh : 1;

    const oldLper100 = baseLper100 * oldPenalty;
    const newLper100 = baseLper100 * newPenalty;

    const oldWeeklyCost = (km / 100) * oldLper100 * price;
    const newWeeklyCost = (km / 100) * newLper100 * price;

    const savedPerWeek = oldWeeklyCost - newWeeklyCost;
    const litresSavedWeek = (km / 100) * (oldLper100 - newLper100);
    const percentSaved = ((oldLper100 - newLper100) / oldLper100) * 100;

    setResult({
      oldLper100: Math.round(oldLper100 * 10) / 10,
      newLper100: Math.round(newLper100 * 10) / 10,
      savedPerWeek: Math.round(savedPerWeek * 100) / 100,
      savedPerMonth: Math.round(savedPerWeek * 4.33 * 100) / 100,
      savedPerYear: Math.round(savedPerWeek * 52 * 100) / 100,
      litresSavedWeek: Math.round(litresSavedWeek * 10) / 10,
      percentSaved: Math.round(percentSaved * 10) / 10,
    });
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Speed vs Fuel Savings Calculator for Trucks",
            url: "https://desirig.com/tools/speed-fuel-savings",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          }),
        }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "Speed vs Fuel Savings", pa: "ਸਪੀਡ ਬਨਾਮ ਬਾਲਣ ਬੱਚਤ" })}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Gauge className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({ en: "Speed vs Fuel Savings Calculator", pa: "ਸਪੀਡ ਬਨਾਮ ਬਾਲਣ ਬੱਚਤ ਕੈਲਕੁਲੇਟਰ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "See how much you save by dropping a few km/h. Every owner-operator knows speed kills your wallet.",
            pa: "ਦੇਖੋ ਕਿ ਕੁਝ km/h ਘਟਾ ਕੇ ਤੁਸੀਂ ਕਿੰਨੀ ਬੱਚਤ ਕਰ ਸਕਦੇ ਹੋ। ਹਰ ਓਨਰ-ਆਪਰੇਟਰ ਜਾਣਦਾ, ਸਪੀਡ ਜੇਬ ਖਾਲੀ ਕਰਦੀ ਹੈ।",
          })}
        </p>
      </div>

      {/* Real driver quote */}
      <div className="mt-6 rounded-xl border-l-4 border-[#FF6E40] bg-orange-50 p-4">
        <p className="text-sm text-orange-800 italic">
          {t({
            en: '"My owner-operator reduced our truck speed from 105 to 100 km/h. Small change, big savings over a year."',
            pa: '"ਮੇਰੇ ਓਨਰ-ਆਪਰੇਟਰ ਨੇ ਸਾਡੇ ਟਰੱਕ ਦੀ ਸਪੀਡ 105 ਤੋਂ 100 km/h ਕਰ ਦਿੱਤੀ। ਛੋਟੀ ਤਬਦੀਲੀ, ਸਾਲ ਭਰ ਵਿੱਚ ਵੱਡੀ ਬੱਚਤ।"',
          })}
        </p>
        <p className="mt-1 text-xs text-orange-600">
          {t({ en: "Long-haul driver, Ontario", pa: "ਲੌਂਗ-ਹਾਲ ਡਰਾਈਵਰ, ਓਨਟਾਰੀਓ" })}
        </p>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                {t({ en: "Current Speed (km/h)", pa: "ਮੌਜੂਦਾ ਸਪੀਡ (km/h)" })}
              </label>
              <Input type="number" value={currentSpeed} onChange={(e) => setCurrentSpeed(e.target.value)} placeholder="e.g. 105" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                {t({ en: "New Speed (km/h)", pa: "ਨਵੀਂ ਸਪੀਡ (km/h)" })}
              </label>
              <Input type="number" value={newSpeed} onChange={(e) => setNewSpeed(e.target.value)} placeholder="e.g. 100" className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Diesel Price ($/litre)", pa: "ਡੀਜ਼ਲ ਦੀ ਕੀਮਤ ($/ਲੀਟਰ)" })}
            </label>
            <Input type="number" step="0.01" value={fuelPrice} onChange={(e) => setFuelPrice(e.target.value)} placeholder="e.g. 1.65" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Weekly Distance (km)", pa: "ਹਫ਼ਤਾਵਾਰੀ ਦੂਰੀ (km)" })}
            </label>
            <Input type="number" value={weeklyKm} onChange={(e) => setWeeklyKm(e.target.value)} placeholder="e.g. 4000" className="mt-1" />
            <p className="mt-1 text-xs text-muted-foreground">
              {t({ en: "Average long-haul: 3,500-5,000 km/week", pa: "ਔਸਤ ਲੌਂਗ-ਹਾਲ: 3,500-5,000 km/ਹਫ਼ਤਾ" })}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Base Fuel Efficiency (MPG at current speed)", pa: "ਮੌਜੂਦਾ ਸਪੀਡ ਤੇ ਬਾਲਣ ਕਾਰਗੁਜ਼ਾਰੀ (MPG)" })}
            </label>
            <Input type="number" step="0.1" value={baseMpg} onChange={(e) => setBaseMpg(e.target.value)} placeholder="e.g. 6.0" className="mt-1" />
            <p className="mt-1 text-xs text-muted-foreground">
              {t({ en: "Loaded semi: 5.0-6.5 MPG · Empty: 7.0-8.0 MPG", pa: "ਲੋਡ ਨਾਲ: 5.0-6.5 MPG · ਖਾਲੀ: 7.0-8.0 MPG" })}
            </p>
          </div>
          <Button onClick={calculate} className="w-full bg-green-600 hover:bg-green-700">
            <Gauge className="mr-2 h-4 w-4" />
            {t({ en: "Calculate Savings", pa: "ਬੱਚਤ ਪਤਾ ਕਰੋ" })}
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-green-50 p-6 text-center">
              <p className="text-sm font-medium text-green-600">{t({ en: "You save", pa: "ਤੁਹਾਡੀ ਬੱਚਤ" })}</p>
              <div className="mt-1 text-4xl font-black text-green-700">${result.savedPerYear.toLocaleString()}</div>
              <p className="text-sm text-green-600">{t({ en: "per year", pa: "ਪ੍ਰਤੀ ਸਾਲ" })}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">${result.savedPerWeek.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{t({ en: "Per Week", pa: "ਪ੍ਰਤੀ ਹਫ਼ਤਾ" })}</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">${result.savedPerMonth.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">{t({ en: "Per Month", pa: "ਪ੍ਰਤੀ ਮਹੀਨਾ" })}</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">{result.litresSavedWeek}L</div>
                <div className="text-xs text-muted-foreground">{t({ en: "Litres/Week", pa: "ਲੀਟਰ/ਹਫ਼ਤਾ" })}</div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">{currentSpeed} km/h:</span>
                  <span className="ml-2 font-medium">{result.oldLper100} L/100km</span>
                </div>
                <TrendingDown className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-muted-foreground">{newSpeed} km/h:</span>
                  <span className="ml-2 font-medium text-green-700">{result.newLper100} L/100km</span>
                </div>
              </div>
              <p className="mt-2 text-center text-sm font-medium text-green-700">
                {result.percentSaved}% {t({ en: "less fuel", pa: "ਘੱਟ ਬਾਲਣ" })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick presets */}
      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="font-semibold text-foreground">
          {t({ en: "Try These Common Scenarios", pa: "ਇਹ ਆਮ ਹਾਲਾਤ ਅਜ਼ਮਾਓ" })}
        </h2>
        <div className="mt-3 space-y-2 text-sm">
          {[
            { label: t({ en: "105 → 100 km/h (company speed limiter)", pa: "105 → 100 km/h (ਕੰਪਨੀ ਸਪੀਡ ਲਿਮਿਟਰ)" }), from: "105", to: "100" },
            { label: t({ en: "110 → 100 km/h (aggressive to moderate)", pa: "110 → 100 km/h (ਤੇਜ਼ ਤੋਂ ਦਰਮਿਆਨੀ)" }), from: "110", to: "100" },
            { label: t({ en: "105 → 95 km/h (max savings mode)", pa: "105 → 95 km/h (ਵੱਧ ਤੋਂ ਵੱਧ ਬੱਚਤ)" }), from: "105", to: "95" },
            { label: t({ en: "115 → 105 km/h (Alberta highway)", pa: "115 → 105 km/h (ਅਲਬਰਟਾ ਹਾਈਵੇ)" }), from: "115", to: "105" },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => { setCurrentSpeed(s.from); setNewSpeed(s.to); }}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted transition-colors"
            >
              <span className="text-foreground">{s.label}</span>
              <span className="text-muted-foreground">{s.from} → {s.to}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Why speed matters */}
      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Fuel className="h-5 w-5 text-orange-500" />
          {t({ en: "Why Speed Kills Your Fuel Budget", pa: "ਸਪੀਡ ਤੁਹਾਡਾ ਬਾਲਣ ਬਜਟ ਕਿਉਂ ਮਾਰਦੀ ਹੈ" })}
        </h2>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground">
          <p>
            {t({
              en: "Aerodynamic drag increases with the square of speed. Going from 100 to 110 km/h doesn&apos;t use 10% more fuel. It uses about 13-15% more. Wind resistance at highway speed is the single biggest fuel consumer on a semi.",
              pa: "ਹਵਾ ਦਾ ਵਿਰੋਧ ਸਪੀਡ ਦੇ ਵਰਗ ਨਾਲ ਵਧਦਾ ਹੈ। 100 ਤੋਂ 110 km/h ਜਾਣ ਨਾਲ 10% ਨਹੀਂ, ਲਗਭਗ 13-15% ਵੱਧ ਬਾਲਣ ਲੱਗਦਾ ਹੈ। ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਹਵਾ ਦਾ ਵਿਰੋਧ ਸੈਮੀ ਟਰੱਕ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਧ ਬਾਲਣ ਖਾਣ ਵਾਲਾ ਕਾਰਨ ਹੈ।",
            })}
          </p>
          <p>
            <strong>{t({ en: "The sweet spot for most semis is 90-100 km/h (55-62 mph).", pa: "ਜ਼ਿਆਦਾਤਰ ਸੈਮੀ ਟਰੱਕਾਂ ਲਈ ਸਹੀ ਸਪੀਡ 90-100 km/h (55-62 mph) ਹੈ।" })}</strong>{" "}
            {t({
              en: "Above that, every km/h costs you roughly 1.3% more fuel. Below 90, you barely save anything because engine efficiency drops.",
              pa: "ਇਸ ਤੋਂ ਉੱਪਰ, ਹਰ km/h ਤੁਹਾਨੂੰ ਲਗਭਗ 1.3% ਵੱਧ ਬਾਲਣ ਖਰਚਾਉਂਦੀ ਹੈ। 90 ਤੋਂ ਹੇਠਾਂ, ਇੰਜਣ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ ਘਟਣ ਕਰਕੇ ਬੱਚਤ ਨਹੀਂ ਹੁੰਦੀ।",
            })}
          </p>
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="font-medium text-foreground">{t({ en: "Rule of thumb:", pa: "ਅੰਗੂਠੇ ਦਾ ਨਿਯਮ:" })}</p>
            <p>
              {t({
                en: "Dropping 5 km/h from highway speed saves about $2,000-4,000/year for a typical long-haul truck running 200,000+ km annually.",
                pa: "ਹਾਈਵੇ ਸਪੀਡ ਤੋਂ 5 km/h ਘਟਾਉਣ ਨਾਲ ਲਗਭਗ $2,000-4,000/ਸਾਲ ਦੀ ਬੱਚਤ ਹੁੰਦੀ ਹੈ, ਜੋ ਟਰੱਕ ਸਾਲਾਨਾ 200,000+ km ਚੱਲਦਾ ਹੈ।",
              })}
            </p>
          </div>
          <p><strong>{t({ en: "Other fuel-saving tips:", pa: "ਹੋਰ ਬਾਲਣ ਬਚਾਉਣ ਦੇ ਤਰੀਕੇ:" })}</strong></p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>{t({ en: "Keep tires at proper PSI. Under-inflation wastes 3-5% fuel", pa: "ਟਾਇਰਾਂ ਦੀ ਹਵਾ ਸਹੀ ਰੱਖੋ। ਘੱਟ ਹਵਾ ਨਾਲ 3-5% ਬਾਲਣ ਬਰਬਾਦ ਹੁੰਦਾ" })}</li>
            <li>{t({ en: "Use cruise control on flat highways", pa: "ਸਿੱਧੇ ਹਾਈਵੇ ਤੇ ਕਰੂਜ਼ ਕੰਟਰੋਲ ਵਰਤੋ" })}</li>
            <li>{t({ en: "Cut idle time. 1 hour of idling burns 3-4 litres", pa: "ਖੜ੍ਹੇ ਇੰਜਣ ਦਾ ਸਮਾਂ ਘਟਾਓ। 1 ਘੰਟਾ ਖੜ੍ਹੇ ਵਿੱਚ 3-4 ਲੀਟਰ ਸੜਦਾ" })}</li>
            <li>{t({ en: "Check your air filter. A dirty filter can cost you 5-10% efficiency", pa: "ਏਅਰ ਫਿਲਟਰ ਚੈੱਕ ਕਰੋ। ਗੰਦੇ ਫਿਲਟਰ ਨਾਲ 5-10% ਕਾਰਗੁਜ਼ਾਰੀ ਘਟਦੀ" })}</li>
            <li>{t({ en: "Plan your fuel stops. Prices can vary $0.15-0.25/L between stops", pa: "ਬਾਲਣ ਭਰਨ ਦੀ ਥਾਂ ਪਲੈਨ ਕਰੋ। ਕੀਮਤ ਵਿੱਚ $0.15-0.25/ਲੀਟਰ ਫ਼ਰਕ ਹੋ ਸਕਦਾ" })}</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Calculator", pa: "ਇਸ ਕੈਲਕੁਲੇਟਰ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "This calculator estimates fuel savings based on how speed affects drag. Results are estimates. Actual savings depend on load, terrain, wind, tire pressure, and driving style. Uses a 1.3% fuel penalty per km/h above 90 km/h, consistent with NRCan and DOE fleet studies.",
            pa: "ਇਹ ਕੈਲਕੁਲੇਟਰ ਸਪੀਡ ਅਤੇ ਬਾਲਣ ਖਪਤ ਦੇ ਸਬੰਧ ਦੇ ਆਧਾਰ ਤੇ ਬਾਲਣ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਾਉਂਦਾ ਹੈ। ਨਤੀਜੇ ਅੰਦਾਜ਼ੇ ਹਨ। ਅਸਲ ਬੱਚਤ ਲੋਡ, ਰਸਤੇ, ਹਵਾ, ਟਾਇਰ ਪ੍ਰੈਸ਼ਰ, ਤੇ ਡਰਾਈਵਿੰਗ ਸਟਾਈਲ ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ। 90 km/h ਤੋਂ ਉੱਪਰ ਹਰ km/h ਲਈ 1.3% ਬਾਲਣ ਜੁਰਮਾਨਾ ਲਾਗੂ ਹੈ।",
          })}
        </p>
      </div>
    </div>
  );
}
