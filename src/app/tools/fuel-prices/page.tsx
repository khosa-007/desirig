import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Fuel, TrendingUp, TrendingDown, Minus, ExternalLink, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "North America Diesel Prices — Canada & US | DesiRig",
  description:
    "Live diesel fuel prices across Canada and US. Canadian cities from NRCan, US regions from EIA. Updated hourly. Essential for cross-border truckers.",
  alternates: {
    canonical: "https://desirig.com/tools/fuel-prices",
  },
};

export const revalidate = 3600; // 1 hour

interface CanadaPrice {
  city: string;
  province: string;
  price: number;
  date: string;
}

interface USPrice {
  region: string;
  price: number;
  pricePerLitre: number;
  date: string;
}

interface FuelData {
  canada: CanadaPrice[];
  us: USPrice[];
  canadaAvg: number;
  usAvg: number;
  usAvgPerLitre: number;
  updated: string;
}

async function getFuelData(): Promise<FuelData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/fuel-prices`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch {
    // fall through
  }

  // Inline fallback if API fails during build
  return {
    canada: [
      { city: "Vancouver", province: "British Columbia", price: 209.5, date: "2026-03-14" },
      { city: "Calgary", province: "Alberta", price: 168.3, date: "2026-03-14" },
      { city: "Regina", province: "Saskatchewan", price: 176.2, date: "2026-03-14" },
      { city: "Winnipeg", province: "Manitoba", price: 179.8, date: "2026-03-14" },
      { city: "Toronto", province: "Ontario", price: 200.4, date: "2026-03-14" },
      { city: "Ottawa", province: "Ontario", price: 198.7, date: "2026-03-14" },
      { city: "Montreal", province: "Quebec", price: 202.7, date: "2026-03-14" },
      { city: "Halifax", province: "Nova Scotia", price: 195.1, date: "2026-03-14" },
      { city: "Charlottetown", province: "Prince Edward Island", price: 192.4, date: "2026-03-14" },
      { city: "St. John's", province: "Newfoundland and Labrador", price: 212.2, date: "2026-03-14" },
      { city: "Saint John", province: "New Brunswick", price: 193.8, date: "2026-03-14" },
    ],
    us: [
      { region: "East Coast", price: 4.901, pricePerLitre: 1.295, date: "2026-03-09" },
      { region: "Midwest", price: 4.801, pricePerLitre: 1.268, date: "2026-03-09" },
      { region: "Gulf Coast", price: 4.627, pricePerLitre: 1.222, date: "2026-03-09" },
      { region: "Rocky Mountain", price: 4.397, pricePerLitre: 1.162, date: "2026-03-09" },
      { region: "West Coast", price: 5.556, pricePerLitre: 1.468, date: "2026-03-09" },
    ],
    canadaAvg: 194.5,
    usAvg: 4.859,
    usAvgPerLitre: 1.284,
    updated: "2026-03-14T00:00:00.000Z",
  };
}

export default async function FuelPricesPage() {
  const data = await getFuelData();

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
          North America Diesel Prices
        </h1>
        <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
          ਉੱਤਰੀ ਅਮਰੀਕਾ ਡੀਜ਼ਲ ਕੀਮਤਾਂ
        </p>
        <p className="mt-2 text-muted-foreground">
          Live diesel prices for cross-border truckers. Canada + US in one place.
        </p>
        <p className="mt-1 flex items-center justify-center gap-1 text-xs text-gray-500">
          <RefreshCw className="h-3 w-3" />
          Updated {new Date(data.updated).toLocaleDateString("en-CA")}
        </p>
      </div>

      {/* Side-by-side national averages */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#FACC15]/30 bg-[#FACC15]/5 p-6 text-center">
          <p className="text-sm text-gray-400">🇨🇦 Canada Average</p>
          <p className="mt-1 text-3xl font-bold text-[#FACC15]">
            {data.canadaAvg.toFixed(1)}¢/L
          </p>
          <p className="mt-1 text-sm text-white">
            CAD ${(data.canadaAvg / 100).toFixed(3)}/litre
          </p>
          <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]/70">
            ਕੈਨੇਡਾ ਔਸਤ
          </p>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6 text-center">
          <p className="text-sm text-gray-400">🇺🇸 US Average</p>
          <p className="mt-1 text-3xl font-bold text-blue-400">
            ${data.usAvg.toFixed(3)}/gal
          </p>
          <p className="mt-1 text-sm text-white">
            USD ${data.usAvgPerLitre.toFixed(3)}/litre
          </p>
          <p className="mt-1 font-gurmukhi text-xs text-blue-400/70">
            ਅਮਰੀਕਾ ਔਸਤ
          </p>
        </div>
      </div>

      {/* ── CANADA ── */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          🇨🇦 Canada — By City
        </h2>
        <p className="text-sm text-gray-500">Cents per litre (CAD), includes taxes • Source: NRCan</p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#333]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333] bg-[#1A1A1A]">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">City</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Province</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">¢/L</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">$/L</th>
              </tr>
            </thead>
            <tbody>
              {data.canada
                .sort((a, b) => a.price - b.price)
                .map((p, i) => (
                  <tr
                    key={p.city}
                    className={`border-b border-[#222] ${i % 2 === 0 ? "bg-[#111]" : "bg-[#161616]"}`}
                  >
                    <td className="px-4 py-3 font-medium text-white">{p.city}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{p.province}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-lg font-bold ${
                        p.price <= data.canadaAvg * 0.95 ? "text-green-400" :
                        p.price >= data.canadaAvg * 1.05 ? "text-red-400" : "text-white"
                      }`}>
                        {p.price.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      ${(p.price / 100).toFixed(3)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── UNITED STATES ── */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          🇺🇸 United States — By Region
        </h2>
        <p className="text-sm text-gray-500">USD per gallon, includes taxes • Source: EIA</p>

        <div className="mt-4 overflow-hidden rounded-xl border border-[#333]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333] bg-[#1A1A1A]">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Region</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">$/gallon</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">$/litre</th>
                <th className="hidden px-4 py-3 text-left text-sm font-medium text-gray-400 sm:table-cell">Key States</th>
              </tr>
            </thead>
            <tbody>
              {data.us
                .sort((a, b) => a.price - b.price)
                .map((r, i) => (
                  <tr
                    key={r.region}
                    className={`border-b border-[#222] ${i % 2 === 0 ? "bg-[#111]" : "bg-[#161616]"}`}
                  >
                    <td className="px-4 py-3 font-medium text-white">{r.region}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-lg font-bold ${
                        r.price <= data.usAvg * 0.95 ? "text-green-400" :
                        r.price >= data.usAvg * 1.05 ? "text-red-400" : "text-white"
                      }`}>
                        ${r.price.toFixed(3)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-400">
                      ${r.pricePerLitre.toFixed(3)}
                    </td>
                    <td className="hidden px-4 py-3 text-sm text-gray-500 sm:table-cell">
                      {REGION_STATES[r.region] ?? ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross-border tip */}
      <div className="mt-8 rounded-xl border border-[#FACC15]/20 bg-[#FACC15]/5 p-5">
        <h3 className="font-semibold text-white">Cross-Border Fuel Strategy</h3>
        <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]">ਕ੍ਰਾਸ-ਬਾਰਡਰ ਬਾਲਣ ਰਣਨੀਤੀ</p>
        <ul className="mt-3 space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span>
              <strong className="text-white">Canada → US:</strong> US diesel is usually cheaper per litre.
              Fill up on the US side when crossing at Buffalo, Detroit, or Pacific Highway.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span>
              <strong className="text-white">IFTA tip:</strong> Buy fuel in the cheapest jurisdiction on your route.
              Your IFTA filing reconciles the tax differences — you legally save on fuel cost.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span>
              <strong className="text-white">Alberta corridor:</strong> Consistently cheapest in Canada.
              If running Calgary–Toronto, fill up in AB before heading east.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span>
              <strong className="text-white">Gulf Coast (PADD 3):</strong> Usually cheapest in the US.
              If running to Texas, Louisiana, or Mississippi — fuel up there.
            </span>
          </li>
        </ul>
      </div>

      {/* Trucker tips */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
          <h3 className="font-semibold text-white">Price Difference Impact</h3>
          <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]">ਕੀਮਤ ਫ਼ਰਕ ਦਾ ਅਸਰ</p>
          <p className="mt-2 text-sm text-gray-400">
            A 10¢/L difference on a 1,000L fill = $100 per fill.
            At 2 fills/week, that&apos;s <strong className="text-white">$10,400/year</strong>. Plan your stops.
          </p>
        </div>
        <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
          <h3 className="font-semibold text-white">Speed = Fuel</h3>
          <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]">ਸਪੀਡ = ਬਾਲਣ</p>
          <p className="mt-2 text-sm text-gray-400">
            Dropping from 110 to 105 km/h saves ~5% on fuel.
            At $200K fuel/year, that&apos;s <strong className="text-white">$10,000 saved</strong>.{" "}
            <Link href="/tools/speed-fuel-savings" className="text-[#FACC15] hover:underline">
              Calculate yours →
            </Link>
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
        <Link
          href="/tools/truck-parking"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#333] bg-[#1A1A1A] px-4 py-2 text-sm font-medium text-[#FACC15] hover:border-[#FACC15]"
        >
          Truck Parking →
        </Link>
      </div>

      {/* Source attribution */}
      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>
          Canada data:{" "}
          <a
            href="https://www2.nrcan.gc.ca/eneene/sources/pripri/prices_bycity_e.cfm?productID=5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FACC15] hover:underline"
          >
            NRCan <ExternalLink className="h-3 w-3" />
          </a>
          {" • "}
          US data:{" "}
          <a
            href="https://www.eia.gov/petroleum/gasdiesel/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#FACC15] hover:underline"
          >
            EIA <ExternalLink className="h-3 w-3" />
          </a>
        </p>
        <p className="mt-1 text-xs">
          Canadian prices are daily averages (NRCan). US prices are weekly averages (EIA, Mondays).
          Prices include taxes and may vary at the pump.
        </p>
      </div>
    </div>
  );
}

const REGION_STATES: Record<string, string> = {
  "East Coast": "NY, NJ, PA, MA, CT",
  "Midwest": "IL, OH, MI, IN, WI",
  "Gulf Coast": "TX, LA, MS, AL, FL",
  "Rocky Mountain": "CO, WY, MT, UT, ID",
  "West Coast": "CA, WA, OR, NV, AZ",
};
