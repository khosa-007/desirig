import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour cache

// NRCan location IDs mapped to provinces/cities
const NRCAN_LOCATIONS: Record<number, { city: string; province: string }> = {
  9: { city: "Vancouver", province: "British Columbia" },
  17: { city: "Calgary", province: "Alberta" },
  47: { city: "Regina", province: "Saskatchewan" },
  75: { city: "Winnipeg", province: "Manitoba" },
  39: { city: "Toronto", province: "Ontario" },
  38: { city: "Ottawa", province: "Ontario" },
  25: { city: "Montreal", province: "Quebec" },
  2: { city: "Halifax", province: "Nova Scotia" },
  52: { city: "Charlottetown", province: "Prince Edward Island" },
  53: { city: "St. John's", province: "Newfoundland and Labrador" },
  71: { city: "Saint John", province: "New Brunswick" },
};

interface FuelData {
  canada: { city: string; province: string; price: number; date: string }[];
  us: { region: string; price: number; pricePerLitre: number; date: string }[];
  canadaAvg: number;
  usAvg: number;
  usAvgPerLitre: number;
  updated: string;
}

async function fetchNrcanPrices(): Promise<FuelData["canada"]> {
  const locationIds = Object.keys(NRCAN_LOCATIONS).join(",");
  const now = new Date();
  const url = `https://www2.nrcan.gc.ca/eneene/sources/pripri/prices_bycity_e.cfm?productID=5&locationID=${locationIds}&frequency=D&priceYear=${now.getFullYear()}&priceMonth=${now.getMonth() + 1}&priceDay=${now.getDate()}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const html = await res.text();

    // Extract data from the chart JavaScript — look for price arrays
    // NRCan embeds chart data as JavaScript arrays
    const dataMatches = html.match(/data:\s*\[([\d.,\s\n-]+)\]/g);
    if (!dataMatches || dataMatches.length === 0) return [];

    const locationEntries = Object.entries(NRCAN_LOCATIONS);
    const results: FuelData["canada"] = [];

    for (let i = 0; i < Math.min(dataMatches.length, locationEntries.length); i++) {
      const match = dataMatches[i];
      const values = match
        .replace(/data:\s*\[/, "")
        .replace(/\]/, "")
        .split(",")
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v) && v > 0);

      if (values.length > 0) {
        const latestPrice = values[values.length - 1];
        const [, loc] = locationEntries[i];
        results.push({
          city: loc.city,
          province: loc.province,
          price: latestPrice,
          date: now.toISOString().slice(0, 10),
        });
      }
    }

    return results;
  } catch {
    return [];
  }
}

async function fetchEiaPrices(): Promise<FuelData["us"]> {
  // EIA publishes weekly diesel prices — scrape the summary page
  try {
    const res = await fetch("https://www.eia.gov/petroleum/gasdiesel/", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_US;

    const html = await res.text();

    // Try to extract diesel prices from the page
    // Look for patterns like "$X.XXX" near region names
    const regions = [
      { name: "U.S. Average", pattern: /On-Highway Diesel[\s\S]*?(\$[\d.]+)/ },
      { name: "East Coast", pattern: /East Coast[\s\S]*?(\$[\d.]+)/ },
      { name: "Midwest", pattern: /Midwest[\s\S]*?(\$[\d.]+)/ },
      { name: "Gulf Coast", pattern: /Gulf Coast[\s\S]*?(\$[\d.]+)/ },
      { name: "Rocky Mountain", pattern: /Rocky Mountain[\s\S]*?(\$[\d.]+)/ },
      { name: "West Coast", pattern: /West Coast[\s\S]*?(\$[\d.]+)/ },
    ];

    const results: FuelData["us"] = [];
    for (const r of regions) {
      const match = html.match(r.pattern);
      if (match) {
        const price = parseFloat(match[1].replace("$", ""));
        if (!isNaN(price)) {
          results.push({
            region: r.name,
            price,
            pricePerLitre: price / 3.78541, // USD per gallon → USD per litre
            date: new Date().toISOString().slice(0, 10),
          });
        }
      }
    }

    return results.length > 0 ? results : FALLBACK_US;
  } catch {
    return FALLBACK_US;
  }
}

export async function GET() {
  const [canada, us] = await Promise.all([fetchNrcanPrices(), fetchEiaPrices()]);

  const canadaData = canada.length > 0 ? canada : FALLBACK_CANADA;
  const usData = us;

  const canadaAvg =
    canadaData.reduce((sum, p) => sum + p.price, 0) / canadaData.length;
  const usAvgEntry = usData.find((r) => r.region === "U.S. Average");
  const usAvg = usAvgEntry?.price ?? 0;

  const data: FuelData = {
    canada: canadaData,
    us: usData.filter((r) => r.region !== "U.S. Average"),
    canadaAvg,
    usAvg,
    usAvgPerLitre: usAvg / 3.78541,
    updated: new Date().toISOString(),
  };

  return NextResponse.json(data);
}

// Fallback data
const FALLBACK_CANADA: FuelData["canada"] = [
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
];

const FALLBACK_US: FuelData["us"] = [
  { region: "U.S. Average", price: 4.859, pricePerLitre: 1.284, date: "2026-03-09" },
  { region: "East Coast", price: 4.901, pricePerLitre: 1.295, date: "2026-03-09" },
  { region: "Midwest", price: 4.801, pricePerLitre: 1.268, date: "2026-03-09" },
  { region: "Gulf Coast", price: 4.627, pricePerLitre: 1.222, date: "2026-03-09" },
  { region: "Rocky Mountain", price: 4.397, pricePerLitre: 1.162, date: "2026-03-09" },
  { region: "West Coast", price: 5.556, pricePerLitre: 1.468, date: "2026-03-09" },
];
