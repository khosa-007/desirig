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
  total_cdl: number;
  power_units: number;
  truck_units: number;
  bus_units: number;
  safety_rating: string | null;
  safety_rating_date: string | null;
  carrier_operation: string | null;
  status_code: string | null;
  fleetsize: string | null;
  classdef: string | null;
  business_org_desc: string | null;
  hm_ind: string | null;
  mcs150_mileage: number;
  mcs150_mileage_year: number | null;
  owntruck: number;
  owntrail: number;
  // Cargo types
  crgo_general: boolean;
  crgo_metal: boolean;
  crgo_motor_vehicles: boolean;
  crgo_drivetow: boolean;
  crgo_logs: boolean;
  crgo_bldgmat: boolean;
  crgo_mobile_homes: boolean;
  crgo_machinery: boolean;
  crgo_fresh_produce: boolean;
  crgo_liq_gas: boolean;
  crgo_grain: boolean;
  crgo_coal: boolean;
  crgo_meat: boolean;
  crgo_garbage: boolean;
  crgo_us_mail: boolean;
  crgo_chemicals: boolean;
  crgo_dry_bulk: boolean;
  crgo_refrigerated: boolean;
  crgo_beverages: boolean;
  crgo_paper: boolean;
  crgo_utility: boolean;
  crgo_farm_supplies: boolean;
  crgo_construct: boolean;
  crgo_intermodal: boolean;
  crgo_oilfield: boolean;
  crgo_livestock: boolean;
  crgo_passengers: boolean;
  crgo_household: boolean;
  crgo_cargoothr: boolean;
  crgo_cargoothr_desc: string | null;
  // Operations
  interstate_beyond_100_miles: number;
  interstate_within_100_miles: number;
  intrastate_beyond_100_miles: number;
  intrastate_within_100_miles: number;
  // Review info
  review_type: string | null;
  review_date: string | null;
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

    // Decode safety rating code
    const safetyMap: Record<string, string> = {
      S: "Satisfactory",
      C: "Conditional",
      U: "Unsatisfactory",
    };

    // Decode carrier operation code
    const operationMap: Record<string, string> = {
      A: "Interstate",
      B: "Intrastate Only (Hazmat)",
      C: "Intrastate Only (Non-Hazmat)",
    };

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
      total_cdl: parseInt(row.total_cdl || "0", 10),
      power_units: parseInt(row.power_units || "0", 10),
      truck_units: parseInt(row.truck_units || "0", 10),
      bus_units: parseInt(row.bus_units || "0", 10),
      safety_rating: safetyMap[row.safety_rating] || row.safety_rating || null,
      safety_rating_date: row.safety_rating_date || null,
      carrier_operation: operationMap[row.carrier_operation] || row.carrier_operation || null,
      status_code: row.status_code || null,
      fleetsize: row.fleetsize || null,
      classdef: row.classdef || null,
      business_org_desc: row.business_org_desc || null,
      hm_ind: row.hm_ind || null,
      mcs150_mileage: parseInt(row.mcs150_mileage || "0", 10),
      mcs150_mileage_year: row.mcs150_mileage_year ? parseInt(row.mcs150_mileage_year, 10) : null,
      owntruck: parseInt(row.owntruck || "0", 10),
      owntrail: parseInt(row.owntrail || "0", 10),
      // Cargo types
      crgo_general: row.crgo_general === "X",
      crgo_metal: row.crgo_metal === "X",
      crgo_motor_vehicles: row.crgo_motor_vehicles === "X",
      crgo_drivetow: row.crgo_drivetow === "X",
      crgo_logs: row.crgo_logs === "X",
      crgo_bldgmat: row.crgo_bldgmat === "X",
      crgo_mobile_homes: row.crgo_mobile_homes === "X",
      crgo_machinery: row.crgo_machinery === "X",
      crgo_fresh_produce: row.crgo_fresh_produce === "X",
      crgo_liq_gas: row.crgo_liq_gas === "X",
      crgo_grain: row.crgo_grain === "X",
      crgo_coal: row.crgo_coal === "X",
      crgo_meat: row.crgo_meat === "X",
      crgo_garbage: row.crgo_garbage === "X",
      crgo_us_mail: row.crgo_us_mail === "X",
      crgo_chemicals: row.crgo_chemicals === "X",
      crgo_dry_bulk: row.crgo_dry_bulk === "X",
      crgo_refrigerated: row.crgo_refrigerated === "X",
      crgo_beverages: row.crgo_beverages === "X",
      crgo_paper: row.crgo_paper === "X",
      crgo_utility: row.crgo_utility === "X",
      crgo_farm_supplies: row.crgo_farm_supplies === "X",
      crgo_construct: row.crgo_construct === "X",
      crgo_intermodal: row.crgo_intermodal === "X",
      crgo_oilfield: row.crgo_oilfield === "X",
      crgo_livestock: row.crgo_livestock === "X",
      crgo_passengers: row.crgo_passengers === "X",
      crgo_household: row.crgo_household === "X",
      crgo_cargoothr: row.crgo_cargoothr === "X",
      crgo_cargoothr_desc: row.crgo_cargoothr_desc || null,
      // Operations
      interstate_beyond_100_miles: parseInt(row.interstate_beyond_100_miles || "0", 10),
      interstate_within_100_miles: parseInt(row.interstate_within_100_miles || "0", 10),
      intrastate_beyond_100_miles: parseInt(row.intrastate_beyond_100_miles || "0", 10),
      intrastate_within_100_miles: parseInt(row.intrastate_within_100_miles || "0", 10),
      // Review info
      review_type: row.review_type || null,
      review_date: row.review_date || null,
    };
  } catch {
    return null;
  }
}
