import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Truck,
  Users,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Package,
  Route,
  Building,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchFmcsaLive } from "@/lib/fmcsa";
import { getFmcsaByDot } from "@/lib/queries";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ dot: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dot } = await params;
  const carrier = (await fetchFmcsaLive(dot)) ?? (await getFmcsaByDot(dot));
  if (!carrier) return {};

  return {
    title: `${carrier.legal_name} | Safety Record (DOT# ${carrier.dot_number})`,
    description: `Safety record for ${carrier.legal_name} (DOT# ${carrier.dot_number}). ${carrier.total_drivers} drivers, ${carrier.power_units} power units. Safety rating: ${carrier.safety_rating || "Not rated"}.`,
    alternates: {
      canonical: `https://desirig.com/safety/${dot}`,
    },
  };
}

// Helper: format FMCSA date (YYYYMMDD → readable)
function formatDate(d: string | null): string {
  if (!d || d.length < 8) return "N/A";
  const clean = d.replace(/\s.*/, ""); // remove time portion
  const y = clean.slice(0, 4);
  const m = clean.slice(4, 6);
  const day = clean.slice(6, 8);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m, 10) - 1] || m} ${parseInt(day, 10)}, ${y}`;
}

// Cargo label map
const cargoLabels: Record<string, string> = {
  crgo_general: "General Freight",
  crgo_metal: "Metal/Sheets/Coils",
  crgo_motor_vehicles: "Motor Vehicles",
  crgo_drivetow: "Drive/Tow Away",
  crgo_logs: "Logs/Poles/Lumber",
  crgo_bldgmat: "Building Materials",
  crgo_mobile_homes: "Mobile Homes",
  crgo_machinery: "Machinery/Large Objects",
  crgo_fresh_produce: "Fresh Produce",
  crgo_liq_gas: "Liquids/Gases",
  crgo_grain: "Grain/Feed/Hay",
  crgo_coal: "Coal/Coke",
  crgo_meat: "Meat",
  crgo_garbage: "Garbage/Refuse",
  crgo_us_mail: "US Mail",
  crgo_chemicals: "Chemicals",
  crgo_dry_bulk: "Dry Bulk",
  crgo_refrigerated: "Refrigerated Food",
  crgo_beverages: "Beverages",
  crgo_paper: "Paper Products",
  crgo_utility: "Utilities",
  crgo_farm_supplies: "Farm Supplies",
  crgo_construct: "Construction",
  crgo_intermodal: "Intermodal Containers",
  crgo_oilfield: "Oilfield Equipment",
  crgo_livestock: "Livestock",
  crgo_passengers: "Passengers",
  crgo_household: "Household Goods",
  crgo_cargoothr: "Other",
};

export default async function CarrierSafetyPage({ params }: PageProps) {
  const { dot } = await params;

  const liveCarrier = await fetchFmcsaLive(dot);
  const dbCarrier = !liveCarrier ? await getFmcsaByDot(dot) : null;
  const carrier = liveCarrier ?? dbCarrier;
  const isLive = !!liveCarrier;

  if (!carrier) notFound();

  // Check Desi ownership from our DB
  const dbData = dbCarrier ?? (liveCarrier ? await getFmcsaByDot(dot) : null);
  const isDesi = dbData?.is_desi_owned ?? false;

  const ratingColor =
    carrier.safety_rating === "Satisfactory"
      ? "text-green-700 bg-green-50 border-green-200"
      : carrier.safety_rating === "Conditional"
        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
        : carrier.safety_rating === "Unsatisfactory"
          ? "text-red-700 bg-red-50 border-red-200"
          : "text-muted-foreground bg-muted border-border";

  const RatingIcon =
    carrier.safety_rating === "Satisfactory"
      ? CheckCircle
      : carrier.safety_rating === "Unsatisfactory"
        ? XCircle
        : AlertTriangle;

  const isActive = carrier.status_code === "A";

  // Build cargo list
  const cargoTypes: string[] = [];
  for (const [key, label] of Object.entries(cargoLabels)) {
    if (key === "crgo_cargoothr") {
      if ((carrier as Record<string, unknown>)[key] && carrier.crgo_cargoothr_desc) {
        cargoTypes.push(carrier.crgo_cargoothr_desc);
      }
    } else if ((carrier as Record<string, unknown>)[key]) {
      cargoTypes.push(label);
    }
  }

  // Driver to truck ratio assessment
  const ratio = carrier.power_units > 0 ? carrier.total_drivers / carrier.power_units : 0;
  const ratioAssessment =
    ratio >= 1.0
      ? { text: "Good, more drivers than trucks", color: "text-green-700" }
      : ratio >= 0.7
        ? { text: "OK, slightly fewer drivers than trucks", color: "text-yellow-700" }
        : ratio > 0
          ? { text: "Caution: significantly fewer drivers than trucks", color: "text-red-700" }
          : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/safety" className="hover:text-foreground">Safety Lookup</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">DOT# {carrier.dot_number}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        {/* Header card */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isActive ? "bg-green-100" : "bg-red-100"}`}>
              <Shield className={`h-6 w-6 ${isActive ? "text-green-600" : "text-red-600"}`} />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold md:text-2xl">
                {carrier.legal_name}
              </h1>
              {carrier.dba_name && (
                <p className="text-muted-foreground">
                  DBA: {carrier.dba_name}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  DOT# {carrier.dot_number}
                </span>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {isActive ? "Active" : "Inactive"}
                </span>
                {isDesi && (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
                    Desi Owned
                  </span>
                )}
                {isLive && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <Zap className="h-3 w-3" />
                    Live Data
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Not active warning */}
        {!isActive && (
          <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">This carrier is not active</p>
                <p className="text-sm text-red-700">
                  An inactive carrier cannot legally operate commercial vehicles. Do not sign
                  with this company until their authority is restored.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Safety Rating — big and prominent */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safety Rating
          </h2>
          <div className="mt-4 flex items-center gap-4">
            <div className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-lg font-bold ${ratingColor}`}>
              <RatingIcon className="h-6 w-6" />
              {carrier.safety_rating || "Not Rated"}
            </div>
            {carrier.safety_rating_date && (
              <div className="text-sm text-muted-foreground">
                <span className="block font-medium text-foreground">Rating Date</span>
                {formatDate(carrier.safety_rating_date)}
              </div>
            )}
          </div>
          {!carrier.safety_rating && (
            <p className="mt-3 text-sm text-muted-foreground">
              This carrier hasn&apos;t been rated yet. This doesn&apos;t mean they&apos;re
              unsafe. Many small carriers haven&apos;t had a formal safety review.
            </p>
          )}
          {carrier.review_date && (
            <p className="mt-3 text-sm text-muted-foreground">
              Last safety review: {formatDate(carrier.review_date)}
              {carrier.review_type === "C" && " (Compliance Review)"}
              {carrier.review_type === "N" && " (New Entrant Audit)"}
            </p>
          )}
        </div>

        {/* Fleet breakdown */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Truck className="h-5 w-5" />
            Fleet Size
          </h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            <div className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{carrier.total_drivers}</div>
              <div className="text-xs text-muted-foreground">Total Drivers</div>
            </div>
            <div className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{carrier.power_units}</div>
              <div className="text-xs text-muted-foreground">Power Units</div>
            </div>
            <div className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{carrier.owntruck || carrier.truck_units || 0}</div>
              <div className="text-xs text-muted-foreground">Trucks Owned</div>
            </div>
            <div className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-bold">{carrier.owntrail || 0}</div>
              <div className="text-xs text-muted-foreground">Trailers Owned</div>
            </div>
          </div>
          {ratioAssessment && (
            <div className="mt-3 rounded-lg bg-muted/40 px-4 py-2 text-sm">
              <span className="font-medium">Driver-to-truck ratio: </span>
              <span className={ratioAssessment.color}>{ratio.toFixed(1)}:1, {ratioAssessment.text}</span>
            </div>
          )}
          {carrier.total_cdl > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              CDL drivers: {carrier.total_cdl} of {carrier.total_drivers}
            </p>
          )}
        </div>

        {/* Company info */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Details
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {carrier.classdef && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Authority Type</span>
                <p className="mt-0.5 font-medium capitalize">{carrier.classdef.toLowerCase()}</p>
              </div>
            )}
            {carrier.carrier_operation && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Operation</span>
                <p className="mt-0.5 font-medium">{carrier.carrier_operation}</p>
              </div>
            )}
            {carrier.business_org_desc && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Business Type</span>
                <p className="mt-0.5 font-medium capitalize">{carrier.business_org_desc.toLowerCase()}</p>
              </div>
            )}
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hazmat</span>
              <p className="mt-0.5 font-medium">{carrier.hm_ind === "Y" ? "Yes, carries hazardous materials" : "No"}</p>
            </div>
            {carrier.mcs150_mileage > 0 && (
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Annual Mileage</span>
                <p className="mt-0.5 font-medium">
                  {carrier.mcs150_mileage.toLocaleString()} miles
                  {carrier.mcs150_mileage_year && ` (${carrier.mcs150_mileage_year})`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Operations range */}
        {(carrier.interstate_beyond_100_miles > 0 || carrier.interstate_within_100_miles > 0 ||
          carrier.intrastate_beyond_100_miles > 0 || carrier.intrastate_within_100_miles > 0) && (
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Route className="h-5 w-5" />
              Operations Range
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {carrier.interstate_beyond_100_miles > 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Interstate (long-haul, 100+ mi)
                </div>
              )}
              {carrier.interstate_within_100_miles > 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Interstate (short-haul, &lt;100 mi)
                </div>
              )}
              {carrier.intrastate_beyond_100_miles > 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Intrastate (long-haul, 100+ mi)
                </div>
              )}
              {carrier.intrastate_within_100_miles > 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Intrastate (local, &lt;100 mi)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cargo types */}
        {cargoTypes.length > 0 && (
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5" />
              Cargo Carried
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {cargoTypes.map((cargo) => (
                <span key={cargo} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {cargo}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Address */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Contact & Location</h2>
          <div className="mt-4 space-y-3">
            {carrier.phy_street && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <span className="block">
                    {carrier.phy_street}, {carrier.phy_city}, {carrier.phy_state}{" "}
                    {carrier.phy_zip}
                  </span>
                  <span className="text-sm text-muted-foreground">{carrier.phy_country === "US" ? "United States" : "Canada"}</span>
                </div>
              </div>
            )}
            {carrier.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                <a
                  href={`tel:${carrier.phone}`}
                  className="font-medium text-orange-600 hover:underline"
                >
                  {carrier.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* What this means for YOU — driver-focused advice */}
        <div className="mt-6 rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
          <h2 className="text-lg font-semibold text-orange-900 flex items-center gap-2">
            <Scale className="h-5 w-5" />
            What This Means For You
          </h2>
          <div className="mt-3 space-y-3 text-sm text-orange-800">
            {carrier.safety_rating === "Satisfactory" && (
              <p className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600 shrink-0" />
                <span><strong>Satisfactory rating</strong>: this is the best rating. They passed their safety audit.</span>
              </p>
            )}
            {carrier.safety_rating === "Conditional" && (
              <p className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600 shrink-0" />
                <span><strong>Conditional rating</strong>: safety issues were found. Ask them what&apos;s being fixed before signing on.</span>
              </p>
            )}
            {carrier.safety_rating === "Unsatisfactory" && (
              <p className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 text-red-600 shrink-0" />
                <span><strong>Unsatisfactory rating</strong>: serious problems. Think twice before driving for this company.</span>
              </p>
            )}
            {ratioAssessment && ratio < 0.7 && (
              <p className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-red-600 shrink-0" />
                <span><strong>Low driver-to-truck ratio</strong>: could mean high turnover or trucks sitting unmaintained. Ask why.</span>
              </p>
            )}
            {carrier.total_drivers <= 5 && carrier.total_drivers > 0 && (
              <p className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-600 shrink-0" />
                <span><strong>Very small fleet</strong> ({carrier.total_drivers} drivers). Not necessarily bad, but make sure they have proper insurance and dispatch support.</span>
              </p>
            )}
            {carrier.total_drivers > 50 && (
              <p className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600 shrink-0" />
                <span><strong>Established fleet</strong> ({carrier.total_drivers} drivers). Larger companies usually mean more stability and consistent loads.</span>
              </p>
            )}
            <p className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 text-orange-600 shrink-0" />
              <span>Always talk to current drivers before signing. Ask about pay, maintenance, and home time. The community talks, so use that.</span>
            </p>
          </div>
        </div>

        {/* Note to check official sources */}
        <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
          <p>
            Want the full official record? Visit your provincial or federal transport authority website and search by DOT number.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl bg-muted/40 p-4 text-center text-xs text-muted-foreground">
          <p>
            {isLive ? (
              <>
                <span className="font-medium text-emerald-600">Live data</span> fetched
                in real-time from public government records.
              </>
            ) : (
              <>Data sourced from public government records.</>
            )}{" "}
            Safety information is provided for reference only. Always verify
            with the appropriate regulatory authority before making decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
