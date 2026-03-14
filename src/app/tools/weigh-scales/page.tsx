import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Ontario Weigh Scales & Inspection Stations | DesiRig",
  description:
    "All 30 Ontario MTO truck inspection stations and weigh scales. Locations, highways, directions, phone numbers. Free reference for truckers.",
  alternates: {
    canonical: "https://desirig.com/tools/weigh-scales",
  },
};

export const revalidate = 86400; // 24 hours — stations don't change often

interface Station {
  id: number;
  name: string;
  highway: string;
  direction: string;
  location: string;
  phone: string;
  region: string;
  lat: number;
  lng: number;
}

async function getStations(): Promise<Station[]> {
  try {
    const res = await fetch("https://511on.ca/api/v2/get/inspectionstations", {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return FALLBACK_STATIONS;
    const data = await res.json();
    return data.map((s: Record<string, unknown>) => ({
      id: s.Id,
      name: s.Name,
      highway: s.Highway,
      direction: s.Direction,
      location: s.Location,
      phone: (s.ContactInformation as string || "").replace(/Fax:.*/, "").replace("Tel:", "").trim(),
      region: s.Region,
      lat: s.Latitude,
      lng: s.Longitude,
    }));
  } catch {
    return FALLBACK_STATIONS;
  }
}

const REGIONS = ["Central", "Eastern", "Southwestern", "Northeastern", "Northwestern"];

export default async function WeighScalesPage() {
  const stations = await getStations();

  const byRegion = new Map<string, Station[]>();
  for (const s of stations) {
    const list = byRegion.get(s.region) || [];
    list.push(s);
    byRegion.set(s.region, list);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Weigh Scales</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FACC15]/10">
          <Scale className="h-8 w-8 text-[#FACC15]" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Ontario Weigh Scales
        </h1>
        <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
          ਓਨਟਾਰੀਓ ਵੇਅ ਸਕੇਲ
        </p>
        <p className="mt-2 text-muted-foreground">
          All {stations.length} MTO truck inspection stations. Locations, highways, phone numbers.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-[#FACC15]/30 bg-[#FACC15]/5 p-4 text-center text-sm text-gray-400">
        <p>
          Ontario 511 does not publish real-time open/closed status. Call the station before you arrive.
        </p>
        <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]/70">
          ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਟੇਸ਼ਨ ਨੂੰ ਕਾਲ ਕਰੋ
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {REGIONS.map((region) => {
          const regionStations = byRegion.get(region);
          if (!regionStations || regionStations.length === 0) return null;

          return (
            <div key={region}>
              <div className="mb-4 border-b border-[#333] pb-2">
                <h2 className="text-lg font-bold text-white">{region} Ontario</h2>
                <p className="text-sm text-gray-500">{regionStations.length} stations</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {regionStations.map((station) => (
                  <div
                    key={station.id}
                    className="rounded-xl border border-[#333] bg-[#1A1A1A] p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-white">{station.name}</h3>
                        <p className="mt-1 text-sm text-[#FACC15]">
                          {station.highway} — {station.direction}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 flex items-start gap-1.5 text-sm text-gray-400">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                      {station.location}
                    </p>
                    {station.phone && (
                      <a
                        href={`tel:${station.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-2 flex items-center gap-1.5 text-sm text-[#FACC15] hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {station.phone}
                      </a>
                    )}
                    {station.lat && station.lng && (
                      <a
                        href={`https://www.google.com/maps?q=${station.lat},${station.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-xs text-gray-500 hover:text-[#FACC15]"
                      >
                        Open in Google Maps
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>Data from Ontario 511 API. Updated daily.</p>
        <p className="mt-1">
          Missing a station? <Link href="/contact" className="text-[#FACC15] hover:underline">Let us know</Link>.
        </p>
      </div>
    </div>
  );
}

// Fallback data in case API is down
const FALLBACK_STATIONS: Station[] = [
  { id: 1, name: "407 ETR N", highway: "Highway 407", direction: "Westbound", location: "0.5 km east of Tremain Rd", phone: "905-827-6535", region: "Central", lat: 43.42532, lng: -79.808123 },
  { id: 2, name: "Port Hope", highway: "Highway 401", direction: "Westbound", location: "1 km west of County Rd 2", phone: "905-885-8136", region: "Central", lat: 43.95306, lng: -78.32479 },
  { id: 3, name: "Lancaster", highway: "Highway 401", direction: "Westbound", location: "2 km west of South Service Rd", phone: "613-347-3498", region: "Eastern", lat: 45.17969, lng: -74.52889 },
];
