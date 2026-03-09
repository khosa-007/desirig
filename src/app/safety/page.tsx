import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Search, Truck, AlertTriangle, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";
import { fetchFmcsaLive } from "@/lib/fmcsa";

export const metadata: Metadata = {
  title: "Carrier Safety Lookup — Check Any Trucking Company",
  description:
    "Look up any trucking company's safety record using their DOT number. Real-time safety ratings, fleet size, and carrier data.",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SafetyPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  interface CarrierResult {
    id: string;
    dot_number: string;
    legal_name: string;
    dba_name: string | null;
    phy_city: string | null;
    phy_state: string | null;
    total_drivers: number;
    power_units: number;
    safety_rating: string | null;
    is_desi_owned: boolean | null;
  }

  let results: CarrierResult[] = [];
  let searched = false;

  if (q && q.trim()) {
    searched = true;
    const supabase = await createClient();
    const query = q.trim();

    if (/^\d+$/.test(query)) {
      // DOT number search — try DB first, then live API
      const { data } = await supabase
        .from("fmcsa_carriers")
        .select("id, dot_number, legal_name, dba_name, phy_city, phy_state, total_drivers, power_units, safety_rating, is_desi_owned")
        .eq("dot_number", query)
        .limit(1);
      results = (data ?? []) as CarrierResult[];

      // If not in our DB, try live API (covers US carriers not in our scrape)
      if (results.length === 0) {
        const live = await fetchFmcsaLive(query);
        if (live) {
          results = [{
            id: "live",
            dot_number: live.dot_number,
            legal_name: live.legal_name,
            dba_name: live.dba_name,
            phy_city: live.phy_city,
            phy_state: live.phy_state,
            total_drivers: live.total_drivers,
            power_units: live.power_units,
            safety_rating: live.safety_rating,
            is_desi_owned: false,
          }];
        }
      }
    } else {
      const { data } = await supabase
        .from("fmcsa_carriers")
        .select("id, dot_number, legal_name, dba_name, phy_city, phy_state, total_drivers, power_units, safety_rating, is_desi_owned")
        .ilike("legal_name", `%${query}%`)
        .order("total_drivers", { ascending: false })
        .limit(20);
      results = (data ?? []) as CarrierResult[];
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            Carrier Safety Lookup
          </h1>
          <p className="mt-2 text-muted-foreground">
            Search by DOT number or company name. Data from 15,688 active Canadian carriers.
          </p>
        </div>

        {/* Search form */}
        <form className="mt-8 flex gap-2" action="/safety">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Enter DOT number or company name..."
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Look Up
          </Button>
        </form>

        {/* Quick Tips — show when no search */}
        {!searched && (
          <div className="mt-10 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-card p-5 text-center">
                <Shield className="mx-auto h-6 w-6 text-green-600" />
                <div className="mt-2 text-2xl font-bold">15,688</div>
                <div className="text-sm text-muted-foreground">Carriers Tracked</div>
              </div>
              <div className="rounded-xl border bg-card p-5 text-center">
                <Users className="mx-auto h-6 w-6 text-orange-500" />
                <div className="mt-2 text-2xl font-bold">Live Data</div>
                <div className="text-sm text-muted-foreground">Real-Time from Gov Records</div>
              </div>
              <div className="rounded-xl border bg-card p-5 text-center">
                <CheckCircle className="mx-auto h-6 w-6 text-blue-500" />
                <div className="mt-2 text-2xl font-bold">Free</div>
                <div className="text-sm text-muted-foreground">Always Free for Drivers</div>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/40 p-6">
              <h2 className="font-semibold">Before You Sign On With a Company</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Check their <strong>safety rating</strong> — Satisfactory is good, Conditional means issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Look at <strong>fleet size</strong> — more power units usually means more stability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Verify they&apos;re <strong>active</strong> — inactive authority means they can&apos;t legally operate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span>Check <strong>driver count vs. power units</strong> — a good ratio means they&apos;re not overloading drivers</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Results */}
        {searched && (
          <div className="mt-8">
            {results.length === 0 ? (
              <div className="rounded-xl border bg-muted/40 p-8 text-center">
                <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 font-medium">No carriers found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different DOT number or company name.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {results.length} {results.length === 1 ? "carrier" : "carriers"} found
                </p>
                {results.map((carrier) => (
                  <Link
                    key={carrier.dot_number}
                    href={`/safety/${carrier.dot_number}`}
                    className="block rounded-xl border bg-card p-5 transition-all hover:border-green-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">
                          {carrier.legal_name}
                        </h3>
                        {carrier.dba_name && (
                          <p className="text-sm text-muted-foreground">
                            DBA: {carrier.dba_name}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-muted-foreground">
                          {carrier.phy_city}, {carrier.phy_state}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-700">
                          DOT# {carrier.dot_number}
                        </div>
                        {carrier.safety_rating && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Safety: {carrier.safety_rating}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        {carrier.power_units} units
                      </span>
                      <span>
                        {carrier.total_drivers} drivers
                      </span>
                      {carrier.is_desi_owned && (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                          Desi Owned
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
