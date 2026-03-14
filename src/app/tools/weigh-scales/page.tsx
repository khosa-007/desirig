import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Weigh Scales & Inspection Stations — Canada & US | DesiRig",
  description:
    "Ontario MTO inspection stations + US weigh station tips for cross-border truckers. Locations, bypass programs, and what to expect.",
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

      {/* US Weigh Station Guide */}
      <div className="mt-12 border-t border-[#333] pt-10">
        <h2 className="text-2xl font-bold text-white">
          🇺🇸 US Weigh Stations — What Cross-Border Truckers Need to Know
        </h2>
        <p className="mt-1 font-gurmukhi text-sm text-[#FACC15]">
          ਅਮਰੀਕਾ ਵੇਅ ਸਟੇਸ਼ਨ — ਜੋ ਤੁਹਾਨੂੰ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-[#FACC15]">PrePass / Drivewyze</h3>
            <p className="mt-2 text-sm text-gray-400">
              Transponder-based bypass systems. If your carrier has PrePass or Drivewyze,
              you get a green light to bypass open weigh stations ~60-70% of the time.
              <strong className="text-white"> Must have a good safety score.</strong>
            </p>
          </div>
          <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-[#FACC15]">Penalties</h3>
            <p className="mt-2 text-sm text-gray-400">
              Running a scale = instant out-of-service + fine ($300-$10,000+ depending on state).
              <strong className="text-white"> Always pull in when the sign says OPEN.</strong>
              They track who bypassed via cameras.
            </p>
          </div>
          <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-[#FACC15]">Level 1 vs Level 3 Inspection</h3>
            <p className="mt-2 text-sm text-gray-400">
              <strong className="text-white">Level 1:</strong> Full inspection — under the truck, brakes, lights, documents, ELD. Takes 45-90 min.
              <br />
              <strong className="text-white">Level 3:</strong> Driver-only — license, medical card, HOS/ELD, FAST card. Takes 15-20 min.
            </p>
          </div>
          <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5">
            <h3 className="font-semibold text-[#FACC15]">Key States for Canadian Truckers</h3>
            <p className="mt-2 text-sm text-gray-400">
              <strong className="text-white">New York:</strong> I-90 Thruway has multiple active scales.
              <br />
              <strong className="text-white">Michigan:</strong> Very active on I-75 and I-94 near border.
              <br />
              <strong className="text-white">Pennsylvania:</strong> Aggressive enforcement on I-81.
              <br />
              <strong className="text-white">Ohio:</strong> I-80/90 Turnpike scales almost always open.
            </p>
          </div>
        </div>

        {/* Common US weigh stations on cross-border routes */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-white">Major US Scales on Cross-Border Routes</h3>
          <p className="text-sm text-gray-500">Frequently active stations Canadian truckers encounter</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {US_WEIGH_STATIONS.map((station) => (
              <div
                key={station.name}
                className="rounded-xl border border-[#333] bg-[#1A1A1A] p-4"
              >
                <h4 className="font-semibold text-white">{station.name}</h4>
                <p className="mt-1 text-sm text-[#FACC15]">{station.highway}</p>
                <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-400">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                  {station.location}
                </p>
                {station.note && (
                  <p className="mt-2 text-xs italic text-gray-500">{station.note}</p>
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
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>Ontario data from Ontario 511 API. Updated daily. US data is curated for cross-border routes.</p>
        <p className="mt-1">
          Missing a station? <Link href="/contact" className="text-[#FACC15] hover:underline">Let us know</Link>.
        </p>
      </div>
    </div>
  );
}

interface USStation {
  name: string;
  highway: string;
  location: string;
  note?: string;
  lat: number;
  lng: number;
}

const US_WEIGH_STATIONS: USStation[] = [
  {
    name: "Ripley (NY)",
    highway: "I-90, Mile 8 EB",
    location: "Near PA border, Chautauqua County, NY",
    note: "First scale after entering NY from PA on I-90. Very active.",
    lat: 42.2645,
    lng: -79.7045,
  },
  {
    name: "Pembroke (NY)",
    highway: "I-90, Mile 393",
    location: "Between Buffalo and Rochester, NY",
    note: "Active on both EB and WB. Close to Peace Bridge route.",
    lat: 43.0198,
    lng: -78.3913,
  },
  {
    name: "Kirkwood (NY)",
    highway: "I-81, Mile 1 NB",
    location: "Near PA border, Broome County, NY",
    note: "First scale entering NY from PA on I-81.",
    lat: 42.0620,
    lng: -75.7904,
  },
  {
    name: "Champlain (NY)",
    highway: "I-87, Mile 179 SB",
    location: "Near Canadian border, Clinton County, NY",
    note: "Right after crossing from Lacolle, QC. Expect inspection.",
    lat: 44.9701,
    lng: -73.4499,
  },
  {
    name: "Monroe (MI)",
    highway: "I-75, Mile 13 NB",
    location: "Monroe County, MI",
    note: "First scale after Ambassador Bridge / Gordie Howe. Very active for Canadian trucks.",
    lat: 41.9212,
    lng: -83.4210,
  },
  {
    name: "Dundee (MI)",
    highway: "US-23 / I-75, Mile 7",
    location: "Monroe County, MI",
    note: "Catches trucks coming from the Toledo direction.",
    lat: 41.9023,
    lng: -83.6587,
  },
  {
    name: "Port Huron (MI)",
    highway: "I-94, Mile 274 WB",
    location: "St. Clair County, MI",
    note: "Right after Blue Water Bridge from Point Edward, ON.",
    lat: 42.9590,
    lng: -82.4593,
  },
  {
    name: "Conneaut (OH)",
    highway: "I-90, Mile 241 WB",
    location: "Ashtabula County, OH",
    note: "Ohio Turnpike. Near PA border. Weigh-in-motion system.",
    lat: 41.9250,
    lng: -80.5655,
  },
  {
    name: "Clarks Summit (PA)",
    highway: "I-81, Mile 194 NB/SB",
    location: "Lackawanna County, PA",
    note: "PA is aggressive on I-81. One of the busiest corridors for enforcement.",
    lat: 41.4893,
    lng: -75.7130,
  },
  {
    name: "Harrisburg East (PA)",
    highway: "I-81, Mile 77",
    location: "Dauphin County, PA",
    note: "Near I-78/I-81 junction. High enforcement area.",
    lat: 40.3453,
    lng: -76.7680,
  },
];

// Fallback data in case API is down
const FALLBACK_STATIONS: Station[] = [
  { id: 1, name: "407 ETR N", highway: "Highway 407", direction: "Westbound", location: "0.5 km east of Tremain Rd", phone: "905-827-6535", region: "Central", lat: 43.42532, lng: -79.808123 },
  { id: 2, name: "Port Hope", highway: "Highway 401", direction: "Westbound", location: "1 km west of County Rd 2", phone: "905-885-8136", region: "Central", lat: 43.95306, lng: -78.32479 },
  { id: 3, name: "Lancaster", highway: "Highway 401", direction: "Westbound", location: "2 km west of South Service Rd", phone: "613-347-3498", region: "Eastern", lat: 45.17969, lng: -74.52889 },
];
