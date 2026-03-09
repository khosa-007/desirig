/**
 * Live FMCSA API client.
 * Fetches carrier data in real-time from FMCSA Socrata API.
 * Free, unlimited, updated daily by FMCSA.
 */

const FMCSA_API_BASE = "https://data.transportation.gov/resource/az4n-8mr2.json";

export interface FmcsaCarrier {
  dot_number: string;
  legal_name: string;
  dba_name: string | null;
  phone: string | null;
  phy_street: string | null;
  phy_city: string | null;
  phy_state: string | null;
  phy_zip: string | null;
  phy_country: string | null;
  total_drivers: number;
  power_units: number;
  safety_rating: string | null;
  safety_rating_date: string | null;
  carrier_operation: string | null;
  status_code: string | null;
  fleetsize: string | null;
}

/**
 * Fetch a carrier by DOT number from FMCSA API (live, real-time).
 * Returns null if not found or API error (caller should fall back to DB).
 */
export async function fetchFmcsaLive(dotNumber: string): Promise<FmcsaCarrier | null> {
  try {
    const url = `${FMCSA_API_BASE}?dot_number=${encodeURIComponent(dotNumber)}&$limit=1`;
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour on Vercel edge
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || data.length === 0) return null;

    const row = data[0];
    return {
      dot_number: row.dot_number ?? dotNumber,
      legal_name: row.legal_name ?? "",
      dba_name: row.dba_name || null,
      phone: row.phone || null,
      phy_street: row.phy_street || null,
      phy_city: row.phy_city || null,
      phy_state: row.phy_state || null,
      phy_zip: row.phy_zip || null,
      phy_country: row.phy_country || null,
      total_drivers: parseInt(row.total_drivers || "0", 10),
      power_units: parseInt(row.power_units || "0", 10),
      safety_rating: row.safety_rating || null,
      safety_rating_date: row.safety_rating_date || null,
      carrier_operation: row.carrier_operation || null,
      status_code: row.status_code || null,
      fleetsize: row.fleetsize || null,
    };
  } catch {
    return null;
  }
}
