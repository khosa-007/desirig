"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Fuel, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

export default function FuelCostCalculator() {
  const { lang, t } = useLanguage();
  const [distance, setDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("1.65");
  const [mpg, setMpg] = useState("6.5");
  const [result, setResult] = useState<{
    litres: number;
    cost: number;
    costPerKm: number;
  } | null>(null);

  function calculate() {
    const d = parseFloat(distance);
    const price = parseFloat(fuelPrice);
    const efficiency = parseFloat(mpg);
    if (!d || !price || !efficiency || d <= 0 || price <= 0 || efficiency <= 0) return;

    const lPer100 = 235.215 / efficiency;
    const litres = (d / 100) * lPer100;
    const cost = litres * price;
    const costPerKm = cost / d;

    setResult({
      litres: Math.round(litres * 10) / 10,
      cost: Math.round(cost * 100) / 100,
      costPerKm: Math.round(costPerKm * 100) / 100,
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
            name: "Truck Fuel Cost Calculator",
            url: "https://desirig.com/tools/fuel-cost-calculator",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          }),
        }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          {t({ en: "Home", pa: "ਹੋਮ" })}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          {t({ en: "Tools", pa: "ਟੂਲ" })}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">
          {t({ en: "Fuel Cost Calculator", pa: "ਬਾਲਣ ਖ਼ਰਚਾ ਕੈਲਕੁਲੇਟਰ" })}
        </span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Fuel className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({ en: "Truck Fuel Cost Calculator", pa: "ਟਰੱਕ ਬਾਲਣ ਖ਼ਰਚਾ ਕੈਲਕੁਲੇਟਰ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Calculate how much fuel you'll need and what it'll cost for any trip.",
            pa: "ਪਤਾ ਕਰੋ ਕਿ ਤੁਹਾਡੇ ਸਫ਼ਰ ਲਈ ਕਿੰਨਾ ਬਾਲਣ ਚਾਹੀਦਾ ਤੇ ਕਿੰਨਾ ਖ਼ਰਚਾ ਆਵੇਗਾ।",
          })}
        </p>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Trip Distance (km)", pa: "ਸਫ਼ਰ ਦੀ ਦੂਰੀ (ਕਿਲੋਮੀਟਰ)" })}
            </label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder={t({ en: "e.g. 550 (Toronto to Montreal)", pa: "ਜਿਵੇਂ 550 (ਟੋਰਾਂਟੋ ਤੋਂ ਮਾਂਟਰੀਅਲ)" })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Diesel Price ($/litre)", pa: "ਡੀਜ਼ਲ ਦੀ ਕੀਮਤ ($/ਲੀਟਰ)" })}
            </label>
            <Input
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="e.g. 1.65"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t({
                en: "Average Ontario diesel: ~$1.55-$1.75/L",
                pa: "ਔਸਤ ਓਨਟਾਰੀਓ ਡੀਜ਼ਲ: ~$1.55-$1.75/ਲੀਟਰ",
              })}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              {t({ en: "Fuel Efficiency (MPG)", pa: "ਬਾਲਣ ਦੀ ਕਾਰਗੁਜ਼ਾਰੀ (MPG)" })}
            </label>
            <Input
              type="number"
              step="0.1"
              value={mpg}
              onChange={(e) => setMpg(e.target.value)}
              placeholder="e.g. 6.5"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              {t({
                en: "Average semi truck: 5.5-7.5 MPG (loaded vs empty)",
                pa: "ਔਸਤ ਸੈਮੀ ਟਰੱਕ: 5.5-7.5 MPG (ਲੋਡ ਨਾਲ ਤੇ ਖਾਲੀ)",
              })}
            </p>
          </div>
          <Button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700">
            <Calculator className="mr-2 h-4 w-4" />
            {t({ en: "Calculate Fuel Cost", pa: "ਬਾਲਣ ਦਾ ਖ਼ਰਚਾ ਪਤਾ ਕਰੋ" })}
          </Button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-blue-50 p-5">
            <h2 className="font-semibold text-blue-900">
              {t({ en: "Trip Fuel Estimate", pa: "ਸਫ਼ਰ ਦਾ ਬਾਲਣ ਅੰਦਾਜ਼ਾ" })}
            </h2>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.litres.toLocaleString()}L
                </div>
                <div className="text-xs text-blue-600">
                  {t({ en: "Fuel Needed", pa: "ਬਾਲਣ ਲੋੜੀਂਦਾ" })}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  ${result.cost.toLocaleString()}
                </div>
                <div className="text-xs text-blue-600">
                  {t({ en: "Total Cost", pa: "ਕੁੱਲ ਖ਼ਰਚਾ" })}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  ${result.costPerKm}
                </div>
                <div className="text-xs text-blue-600">
                  {t({ en: "Per km", pa: "ਪ੍ਰਤੀ ਕਿ.ਮੀ." })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Common routes */}
      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="font-semibold text-foreground">
          {t({ en: "Common Canadian Routes", pa: "ਆਮ ਕੈਨੇਡੀਅਨ ਰੂਟ" })}
        </h2>
        <div className="mt-3 space-y-2 text-sm">
          {[
            { route: "Toronto → Montreal", km: 540 },
            { route: "Toronto → Winnipeg", km: 2200 },
            { route: "Toronto → Calgary", km: 3400 },
            { route: "Toronto → Vancouver", km: 4400 },
            { route: "Brampton → Detroit", km: 380 },
            { route: "Surrey → Edmonton", km: 1200 },
            { route: "Montreal → Halifax", km: 1250 },
          ].map((r) => (
            <button
              key={r.route}
              onClick={() => setDistance(r.km.toString())}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-muted transition-colors"
            >
              <span className="text-foreground">{r.route}</span>
              <span className="text-muted-foreground">{r.km.toLocaleString()} km</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Calculator", pa: "ਇਸ ਕੈਲਕੁਲੇਟਰ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "Plug in your distance, diesel price, and MPG. This calculator does the math for you. Results are estimates. Actual consumption depends on load weight, terrain, weather, and driving style.",
            pa: "ਆਪਣੀ ਦੂਰੀ, ਡੀਜ਼ਲ ਦੀ ਕੀਮਤ, ਤੇ MPG ਪਾਓ। ਇਹ ਕੈਲਕੁਲੇਟਰ ਹਿਸਾਬ ਲਾ ਦੇਵੇਗਾ। ਨਤੀਜੇ ਅੰਦਾਜ਼ੇ ਹਨ। ਅਸਲ ਖਪਤ ਲੋਡ, ਰਸਤੇ, ਮੌਸਮ ਤੇ ਡਰਾਈਵਿੰਗ ਦੇ ਤਰੀਕੇ ਉੱਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",
          })}
        </p>
      </div>
    </div>
  );
}
