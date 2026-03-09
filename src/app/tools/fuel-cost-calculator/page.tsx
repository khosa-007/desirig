"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Fuel, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FuelCostCalculator() {
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

    // Convert MPG to L/100km: L/100km = 235.215 / MPG
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
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "CAD",
            },
          }),
        }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Fuel Cost Calculator</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Fuel className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          Truck Fuel Cost Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate how much fuel you&apos;ll need and what it&apos;ll cost for any trip.
        </p>
      </div>

      <div className="mt-8 rounded-xl border bg-card p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Trip Distance (km)
            </label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g. 550 (Toronto to Montreal)"
              className="mt-1"
            />
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
            <p className="mt-1 text-xs text-muted-foreground">
              Average Ontario diesel: ~$1.55-$1.75/L
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Fuel Efficiency (MPG)
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
              Average semi truck: 5.5-7.5 MPG (loaded vs empty)
            </p>
          </div>
          <Button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Fuel Cost
          </Button>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-blue-50 p-5">
            <h2 className="font-semibold text-blue-900">Trip Fuel Estimate</h2>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.litres.toLocaleString()}L
                </div>
                <div className="text-xs text-blue-600">Fuel Needed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  ${result.cost.toLocaleString()}
                </div>
                <div className="text-xs text-blue-600">Total Cost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  ${result.costPerKm}
                </div>
                <div className="text-xs text-blue-600">Per km</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Common routes */}
      <div className="mt-8 rounded-xl border bg-card p-6">
        <h2 className="font-semibold text-foreground">Common Canadian Routes</h2>
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
          About This Calculator
        </h2>
        <p>
          This fuel cost calculator helps Canadian truck drivers estimate fuel expenses
          for any trip. Enter your distance in kilometres, current diesel price per litre,
          and your truck&apos;s fuel efficiency in MPG. The calculator converts MPG to
          litres per 100km and computes total fuel needed and total cost. Results are
          estimates — actual consumption depends on load weight, terrain, weather, and
          driving style.
        </p>
      </div>
    </div>
  );
}
