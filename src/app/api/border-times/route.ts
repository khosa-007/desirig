import { NextResponse } from "next/server";

export const revalidate = 300; // ISR: revalidate every 5 minutes

interface BorderCrossing {
  office: string;
  location: string;
  province: string;
  lastUpdated: string;
  commercialCanada: string;
  commercialUS: string;
  travellersCanada: string;
  travellersUS: string;
}

function extractProvince(location: string): string {
  // Location format: "City, XX/US City, YY"
  const match = location.match(/,\s*([A-Z]{2})\s*\//);
  if (match) {
    const code = match[1];
    const provinceMap: Record<string, string> = {
      ON: "Ontario",
      QC: "Quebec",
      BC: "British Columbia",
      AB: "Alberta",
      MB: "Manitoba",
      SK: "Saskatchewan",
      NB: "New Brunswick",
      NS: "Nova Scotia",
      PE: "Prince Edward Island",
      NL: "Newfoundland and Labrador",
    };
    return provinceMap[code] || code;
  }
  return "Other";
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

export async function GET() {
  try {
    const res = await fetch("https://www.cbsa-asfc.gc.ca/bwt-taf/bwt-eng.csv", {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch CBSA data", status: res.status },
        { status: 502 }
      );
    }

    const text = await res.text();
    const lines = text.trim().split("\n");

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "No data available from CBSA" },
        { status: 502 }
      );
    }

    // Skip header row
    const crossings: BorderCrossing[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const fields = parseCSVLine(line);
      if (fields.length < 7) continue;

      const [office, location, lastUpdated, commercialCanada, commercialUS, travellersCanada, travellersUS] = fields;

      crossings.push({
        office,
        location,
        province: extractProvince(location),
        lastUpdated,
        commercialCanada,
        commercialUS,
        travellersCanada,
        travellersUS,
      });
    }

    // Group by province
    const byProvince: Record<string, BorderCrossing[]> = {};
    for (const crossing of crossings) {
      if (!byProvince[crossing.province]) {
        byProvince[crossing.province] = [];
      }
      byProvince[crossing.province].push(crossing);
    }

    // Sort provinces: Ontario first (most relevant for truckers), then alphabetical
    const sortedProvinces = Object.keys(byProvince).sort((a, b) => {
      if (a === "Ontario") return -1;
      if (b === "Ontario") return 1;
      if (a === "Quebec") return -1;
      if (b === "Quebec") return 1;
      if (a === "British Columbia") return -1;
      if (b === "British Columbia") return 1;
      return a.localeCompare(b);
    });

    return NextResponse.json({
      crossings,
      byProvince,
      sortedProvinces,
      totalCrossings: crossings.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Border times fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch border wait times" },
      { status: 500 }
    );
  }
}
