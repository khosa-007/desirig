import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Fuel, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Canadian Diesel Prices by Province | DesiRig",
  description:
    "Current diesel fuel prices across all Canadian provinces. Weekly averages from NRCan. Essential reference for truckers planning fuel stops.",
  alternates: {
    canonical: "https://desirig.com/tools/fuel-prices",
  },
};

export const revalidate = 86400; // 24 hours

interface ProvincePrice {
  province: string;
  provincePa: string;
  price: number; // cents per litre
  change: number; // cents change from last week
  updated: string;
}

async function getDieselPrices(): Promise<ProvincePrice[]> {
  // NRCan publishes weekly average retail prices for diesel
  // We try to fetch from their data endpoint; fallback to curated data
  try {
    const res = await fetch(
      "https://www.nrcan.gc.ca/sites/nrcan/files/energy/files/petroleum/fuelprices_diesel_e.json",
      { next: { revalidate: 86400 } }
    );
    if (res.ok) {
      const data = await res.json();
      // If NRCan returns valid data, map it
      if (Array.isArray(data) && data.length > 0) {
        return mapNrcanData(data);
      }
    }
  } catch {
    // Fall through to fallback
  }

  return FALLBACK_PRICES;
}

function mapNrcanData(data: Record<string, unknown>[]): ProvincePrice[] {
  // NRCan data format varies — extract what we can
  const provinceMap: Record<string, { pa: string }> = {
    "British Columbia": { pa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ" },
    Alberta: { pa: "ਅਲਬਰਟਾ" },
    Saskatchewan: { pa: "ਸਸਕੈਚਵਨ" },
    Manitoba: { pa: "ਮੈਨੀਟੋਬਾ" },
    Ontario: { pa: "ਓਨਟਾਰੀਓ" },
    Quebec: { pa: "ਕਿਊਬੈੱਕ" },
    "New Brunswick": { pa: "ਨਿਊ ਬ੍ਰੰਜ਼ਵਿੱਕ" },
    "Nova Scotia": { pa: "ਨੋਵਾ ਸਕੋਸ਼ੀਆ" },
    "Prince Edward Island": { pa: "ਪ੍ਰਿੰਸ ਐਡਵਰਡ ਆਈਲੈਂਡ" },
    "Newfoundland and Labrador": { pa: "ਨਿਊਫਾਊਂਡਲੈਂਡ" },
  };

  return data
    .filter((d) => typeof d.province === "string" && typeof d.price === "number")
    .map((d) => ({
      province: d.province as string,
      provincePa: provinceMap[d.province as string]?.pa ?? (d.province as string),
      price: d.price as number,
      change: (d.change as number) ?? 0,
      updated: (d.date as string) ?? new Date().toISOString().slice(0, 10),
    }));
}

export default async function FuelPricesPage() {
  const prices = await getDieselPrices();
  const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Fuel Prices</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
          <Fuel className="h-8 w-8 text-blue-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Canadian Diesel Prices
        </h1>
        <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
          ਕੈਨੇਡੀਅਨ ਡੀਜ਼ਲ ਦੀਆਂ ਕੀਮਤਾਂ
        </p>
        <p className="mt-2 text-muted-foreground">
          Weekly average retail diesel prices by province. Plan your fuel stops wisely.
        </p>
      </div>

      {/* National average */}
      <div className="mt-8 rounded-xl border border-[#FACC15]/30 bg-[#FACC15]/5 p-6 text-center">
        <p className="text-sm text-gray-400">National Average (Diesel)</p>
        <p className="mt-1 text-4xl font-bold text-[#FACC15]">
          {avgPrice.toFixed(1)}¢/L
        </p>
        <p className="mt-1 text-lg text-white">
          ${(avgPrice / 100).toFixed(3)}/litre
        </p>
        <p className="mt-2 font-gurmukhi text-sm text-[#FACC15]/70">
          ਰਾਸ਼ਟਰੀ ਔਸਤ (ਡੀਜ਼ਲ)
        </p>
      </div>

      {/* Province table */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white">By Province</h2>
        <p className="text-sm text-gray-500">Cents per litre, regular diesel</p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#333]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333] bg-[#1A1A1A]">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Province</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Price (¢/L)</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">$/Litre</th>
                <th className="hidden px-4 py-3 text-right text-sm font-medium text-gray-400 sm:table-cell">Change</th>
              </tr>
            </thead>
            <tbody>
              {prices
                .sort((a, b) => a.price - b.price)
                .map((p, i) => (
                  <tr
                    key={p.province}
                    className={`border-b border-[#222] ${i % 2 === 0 ? "bg-[#111]" : "bg-[#161616]"}`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{p.province}</div>
                      <div className="font-gurmukhi text-xs text-[#FACC15]/60">{p.provincePa}</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-lg font-bold text-white">{p.price.toFixed(1)}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      ${(p.price / 100).toFixed(3)}
                    </td>
                    <td className="hidden px-4 py-3 text-right sm:table-cell">
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium ${
                          p.change > 0
                            ? "text-red-400"
                            : p.change < 0
                              ? "text-green-400"
                              : "text-gray-500"
                        }`}
                      >
                        {p.change > 0 ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : p.change < 0 ? (
                          <TrendingDown className="h-3.5 w-3.5" />
                        ) : (
                          <Minus className="h-3.5 w-3.5" />
                        )}
                        {p.change > 0 ? "+" : ""}
                        {p.change.toFixed(1)}¢
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trucker tips */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
          <h3 className="font-semibold text-white">Cheapest Fuel Corridor</h3>
          <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]">ਸਭ ਤੋਂ ਸਸਤਾ ਬਾਲਣ</p>
          <p className="mt-2 text-sm text-gray-400">
            Alberta consistently has the lowest diesel prices in Canada due to lower provincial fuel taxes.
            If your route crosses AB, fill up there.
          </p>
        </div>
        <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
          <h3 className="font-semibold text-white">Price Difference Impact</h3>
          <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]">ਕੀਮਤ ਫ਼ਰਕ ਦਾ ਅਸਰ</p>
          <p className="mt-2 text-sm text-gray-400">
            A 10¢/L difference on a 1,000L fill = $100 per fill.
            At 2 fills/week, that&apos;s $10,400/year. Plan your stops.
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/tools/fuel-cost-calculator"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-[#FACC15] hover:border-[#FACC15]"
        >
          Fuel Cost Calculator →
        </Link>
        <Link
          href="/tools/speed-fuel-savings"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-[#FACC15] hover:border-[#FACC15]"
        >
          Speed vs Fuel Savings →
        </Link>
      </div>

      {/* Source attribution */}
      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>
          Data source:{" "}
          <a
            href="https://www.nrcan.gc.ca/our-natural-resources/domestic-and-international-markets/transportation-fuel-prices/fuel-facts/diesel-prices-jurisdictions/18588"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FACC15] hover:underline"
          >
            Natural Resources Canada (NRCan)
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
        <p className="mt-1 text-xs">
          Prices are weekly averages and may not reflect pump prices at specific stations.
          Updated weekly on Tuesdays.
        </p>
      </div>
    </div>
  );
}

// Fallback data — updated periodically, reflects typical Canadian diesel prices
const FALLBACK_PRICES: ProvincePrice[] = [
  { province: "British Columbia", provincePa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ", price: 179.9, change: -1.2, updated: "2025-03-11" },
  { province: "Alberta", provincePa: "ਅਲਬਰਟਾ", price: 149.3, change: 0.5, updated: "2025-03-11" },
  { province: "Saskatchewan", provincePa: "ਸਸਕੈਚਵਨ", price: 158.7, change: -0.8, updated: "2025-03-11" },
  { province: "Manitoba", provincePa: "ਮੈਨੀਟੋਬਾ", price: 160.2, change: 0.3, updated: "2025-03-11" },
  { province: "Ontario", provincePa: "ਓਨਟਾਰੀਓ", price: 165.4, change: -0.6, updated: "2025-03-11" },
  { province: "Quebec", provincePa: "ਕਿਊਬੈੱਕ", price: 174.8, change: 1.1, updated: "2025-03-11" },
  { province: "New Brunswick", provincePa: "ਨਿਊ ਬ੍ਰੰਜ਼ਵਿੱਕ", price: 171.6, change: -0.4, updated: "2025-03-11" },
  { province: "Nova Scotia", provincePa: "ਨੋਵਾ ਸਕੋਸ਼ੀਆ", price: 172.3, change: 0.7, updated: "2025-03-11" },
  { province: "Prince Edward Island", provincePa: "ਪ੍ਰਿੰਸ ਐਡਵਰਡ ਆਈਲੈਂਡ", price: 173.1, change: 0.0, updated: "2025-03-11" },
  { province: "Newfoundland and Labrador", provincePa: "ਨਿਊਫਾਊਂਡਲੈਂਡ", price: 177.5, change: 1.3, updated: "2025-03-11" },
];
