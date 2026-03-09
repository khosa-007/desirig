import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Shield,
  Truck,
  Users,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFmcsaByDot } from "@/lib/queries";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ dot: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { dot } = await params;
  const carrier = await getFmcsaByDot(dot);
  if (!carrier) return {};

  return {
    title: `${carrier.legal_name} — Safety Record (DOT# ${carrier.dot_number})`,
    description: `FMCSA safety record for ${carrier.legal_name} (DOT# ${carrier.dot_number}). ${carrier.total_drivers} drivers, ${carrier.power_units} power units. Safety rating: ${carrier.safety_rating || "Not rated"}.`,
  };
}

export default async function CarrierSafetyPage({ params }: PageProps) {
  const { dot } = await params;
  const carrier = await getFmcsaByDot(dot);
  if (!carrier) notFound();

  const ratingColor =
    carrier.safety_rating === "Satisfactory"
      ? "text-green-700 bg-green-50"
      : carrier.safety_rating === "Conditional"
        ? "text-yellow-700 bg-yellow-50"
        : carrier.safety_rating === "Unsatisfactory"
          ? "text-red-700 bg-red-50"
          : "text-muted-foreground bg-muted";

  const RatingIcon =
    carrier.safety_rating === "Satisfactory"
      ? CheckCircle
      : carrier.safety_rating === "Unsatisfactory"
        ? XCircle
        : AlertTriangle;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/safety" className="hover:text-foreground">Safety Lookup</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">DOT# {carrier.dot_number}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Shield className="h-6 w-6 text-green-600" />
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
                {carrier.is_desi_owned && (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    Desi Owned
                  </span>
                )}
                <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium capitalize">
                  {carrier.status_code === "A" ? "Active" : carrier.status_code}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Rating */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Safety Rating</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2 text-lg font-bold ${ratingColor}`}>
              <RatingIcon className="h-5 w-5" />
              {carrier.safety_rating || "Not Rated"}
            </div>
            {carrier.safety_rating_date && (
              <span className="text-sm text-muted-foreground">
                as of {carrier.safety_rating_date}
              </span>
            )}
          </div>
        </div>

        {/* Fleet Info */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5 text-center">
            <Users className="mx-auto h-6 w-6 text-orange-500" />
            <div className="mt-2 text-2xl font-bold">{carrier.total_drivers}</div>
            <div className="text-sm text-muted-foreground">Total Drivers</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <Truck className="mx-auto h-6 w-6 text-orange-500" />
            <div className="mt-2 text-2xl font-bold">{carrier.power_units}</div>
            <div className="text-sm text-muted-foreground">Power Units</div>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <Shield className="mx-auto h-6 w-6 text-orange-500" />
            <div className="mt-2 text-2xl font-bold">
              {carrier.carrier_operation || "N/A"}
            </div>
            <div className="text-sm text-muted-foreground">Operation Type</div>
          </div>
        </div>

        {/* Contact & Address */}
        <div className="mt-6 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="mt-4 space-y-3">
            {carrier.phy_street && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <span>
                  {carrier.phy_street}, {carrier.phy_city}, {carrier.phy_state}{" "}
                  {carrier.phy_zip}, {carrier.phy_country}
                </span>
              </div>
            )}
            {carrier.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a
                  href={`tel:${carrier.phone}`}
                  className="font-medium text-orange-600 hover:underline"
                >
                  {carrier.phone}
                </a>
              </div>
            )}
            {carrier.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a
                  href={`mailto:${carrier.email}`}
                  className="text-orange-600 hover:underline"
                >
                  {carrier.email}
                </a>
              </div>
            )}
          </div>

          {(carrier.company_officer_1 || carrier.company_officer_2) && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-semibold">Company Officers</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                {carrier.company_officer_1 && <p>{carrier.company_officer_1}</p>}
                {carrier.company_officer_2 && <p>{carrier.company_officer_2}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl bg-muted/40 p-4 text-center text-xs text-muted-foreground">
          <p>
            Data sourced from FMCSA (Federal Motor Carrier Safety
            Administration). Last synced from our database. For the most
            up-to-date information, visit{" "}
            <a
              href={`https://ai.fmcsa.dot.gov/SMS/Carrier/${carrier.dot_number}/Overview.aspx`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              FMCSA directly
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
