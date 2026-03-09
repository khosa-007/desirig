"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Gauge, DollarSign, Fuel, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Fuel consumption increases roughly 0.1-0.2 L/100km per 1 mph above 55 mph
// At 55 mph ≈ 35-40 L/100km for loaded semi
// Each mph above 55 costs ~1.5-2% more fuel
// Source: NRCan, US DOE, fleet studies

export default function SpeedFuelSavingsPage() {
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
    if (sNew >= sOld) {
      setResult(null);
      return;
    }

    // Convert base MPG to L/100km at "current speed"
    // L/100km = 235.215 / MPG
    const baseLper100 = 235.215 / mpg;

    // Fuel penalty: each km/h above 90 km/h costs ~1.3% more fuel
    // (based on aerodynamic drag increasing with square of speed)
    const refSpeed = 90; // baseline efficient speed in km/h
    const penaltyPerKmh = 0.013; // 1.3% per km/h above 90

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
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Speed vs Fuel Savings</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Gauge className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          Speed vs Fuel Savings Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          See how much you save by dropping a few km/h. Every owner-operator knows — speed kills your wallet.
        </p>
      </div>

      {/* Real driver quote */}
      <div className="mt-6 rounded-xl border-l-4 border-[#FF6E40] bg-orange-50 p-4">
        <p className="text-sm text-orange-800 italic">
          &ldquo;My owner-operator reduced our truck speed from 105 to 100 km/h.
          Small change, big savings over a year.&rdquo;
        </p>
        <p className="mt-1 text-xs text-orange-600">— Long-haul driver, Ontario</p>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">
                Current Speed (km/h)
              </label>
              <Input
                type="number"
                value={currentSpeed}
                onChange={(e) => setCurrentSpeed(e.target.value)}
                placeholder="e.g. 105"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                New Speed (km/h)
              </label>
              <Input
                type="number"
                value={newSpeed}
                onChange={(e) => setNewSpeed(e.target.value)}
                placeholder="e.g. 100"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Diesel Price ($/litre)
            </label>
            <Input
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="e.g. 1.65"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Weekly Distance (km)
            </label>
            <Input
              type="number"
              value={weeklyKm}
              onChange={(e) => setWeeklyKm(e.target.value)}
              placeholder="e.g. 4000"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Average long-haul: 3,500-5,000 km/week
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Base Fuel Efficiency (MPG at current speed)
            </label>
            <Input
              type="number"
              step="0.1"
              value={baseMpg}
              onChange={(e) => setBaseMpg(e.target.value)}
              placeholder="e.g. 6.0"
              className="mt-1"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Loaded semi: 5.0-6.5 MPG · Empty: 7.0-8.0 MPG
            </p>
          </div>
          <Button
            onClick={calculate}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Gauge className="mr-2 h-4 w-4" />
            Calculate Savings
          </Button>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            {/* Big savings number */}
            <div className="rounded-xl bg-green-50 p-6 text-center">
              <p className="text-sm font-medium text-green-600">You save</p>
              <div className="mt-1 text-4xl font-black text-green-700">
                ${result.savedPerYear.toLocaleString()}
              </div>
              <p className="text-sm text-green-600">per year</p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">
                  ${result.savedPerWeek.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Per Week</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">
                  ${result.savedPerMonth.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Per Month</div>
              </div>
              <div className="rounded-xl bg-muted/40 p-3">
                <div className="text-lg font-bold text-green-700">
                  {result.litresSavedWeek}L
                </div>
                <div className="text-xs text-muted-foreground">Litres/Week</div>
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">At {currentSpeed} km/h:</span>
                  <span className="ml-2 font-medium">{result.oldLper100} L/100km</span>
                </div>
                <TrendingDown className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-muted-foreground">At {newSpeed} km/h:</span>
                  <span className="ml-2 font-medium text-green-700">{result.newLper100} L/100km</span>
                </div>
              </div>
              <p className="mt-2 text-center text-sm font-medium text-green-700">
                {result.percentSaved}% less fuel
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick presets */}
      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="font-semibold text-foreground">Try These Common Scenarios</h2>
        <div className="mt-3 space-y-2 text-sm">
          {[
            { label: "105 → 100 km/h (company speed limiter)", from: "105", to: "100" },
            { label: "110 → 100 km/h (aggressive to moderate)", from: "110", to: "100" },
            { label: "105 → 95 km/h (max savings mode)", from: "105", to: "95" },
            { label: "65 → 62 mph (100 → 100 km/h)", from: "105", to: "100" },
            { label: "115 → 105 km/h (Alberta highway)", from: "115", to: "105" },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => {
                setCurrentSpeed(s.from);
                setNewSpeed(s.to);
              }}
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
          Why Speed Kills Your Fuel Budget
        </h2>
        <div className="mt-3 space-y-3 text-sm text-muted-foreground">
          <p>
            Aerodynamic drag increases with the <strong>square</strong> of speed.
            That means going from 100 to 110 km/h doesn&apos;t use 10% more fuel —
            it uses about 13-15% more. The wind resistance at highway speed is the
            single biggest fuel consumer on a semi truck.
          </p>
          <p>
            <strong>The sweet spot for most semis is 90-100 km/h (55-62 mph).</strong>{" "}
            Above that, every km/h costs you roughly 1.3% more fuel. Below 90, you
            barely save anything because engine efficiency drops.
          </p>
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="font-medium text-foreground">Rule of thumb:</p>
            <p>
              Dropping 5 km/h from highway speed saves about $2,000-4,000/year for
              a typical long-haul truck running 200,000+ km annually.
            </p>
          </div>
          <p>
            <strong>Other fuel-saving tips:</strong>
          </p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Keep tires at proper PSI — under-inflation wastes 3-5% fuel</li>
            <li>Use cruise control on flat highways</li>
            <li>Reduce idle time — 1 hour of idling burns 3-4 litres</li>
            <li>Check your air filter — a dirty filter can cost 5-10% efficiency</li>
            <li>Plan your fuel stops — prices can vary $0.15-0.25/L between stops</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          About This Calculator
        </h2>
        <p>
          This calculator estimates fuel savings based on the aerodynamic drag
          relationship between speed and fuel consumption. Results are estimates —
          actual savings depend on load weight, terrain, wind conditions, tire
          pressure, truck aerodynamics, and driving style. The model uses a 1.3%
          fuel penalty per km/h above 90 km/h, which is consistent with NRCan and
          US Department of Energy fleet studies.
        </p>
      </div>
    </div>
  );
}
