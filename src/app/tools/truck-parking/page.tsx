import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, ParkingCircle, Fuel, Coffee, Wifi, ShowerHead, Star } from "lucide-react";
import { SearchStops } from "./search-stops";

export const metadata: Metadata = {
  title: "Truck Parking & Rest Stops — Canada & US | DesiRig",
  description:
    "Find truck parking across North America: Ontario 401/400, I-90, I-81, I-75 corridors. Truck stops, rest areas, amenities, GPS links for cross-border truckers.",
  alternates: {
    canonical: "https://desirig.com/tools/truck-parking",
  },
};

export const revalidate = 86400;

interface TruckStop {
  name: string;
  highway: string;
  location: string;
  parking: string;
  amenities: string[];
  lat: number;
  lng: number;
  note?: string;
  desiOwned?: boolean;
}

const AMENITIES_MAP: Record<string, { icon: string; label: string }> = {
  fuel: { icon: "fuel", label: "Diesel" },
  food: { icon: "food", label: "Food" },
  showers: { icon: "showers", label: "Showers" },
  wifi: { icon: "wifi", label: "WiFi" },
  parking: { icon: "parking", label: "Truck Parking" },
  scales: { icon: "scales", label: "Scales" },
  laundry: { icon: "laundry", label: "Laundry" },
  desi: { icon: "desi", label: "Desi Food Nearby" },
};

function AmenityIcon({ type }: { type: string }) {
  switch (type) {
    case "fuel":
      return <Fuel className="h-3.5 w-3.5" />;
    case "food":
    case "desi":
      return <Coffee className="h-3.5 w-3.5" />;
    case "showers":
      return <ShowerHead className="h-3.5 w-3.5" />;
    case "wifi":
      return <Wifi className="h-3.5 w-3.5" />;
    default:
      return <ParkingCircle className="h-3.5 w-3.5" />;
  }
}

export default function TruckParkingPage() {
  const regions = [
    { name: "Highway 401 Corridor", namePa: "ਹਾਈਵੇ 401", stops: H401_STOPS },
    { name: "Highway 400 / North", namePa: "ਹਾਈਵੇ 400 / ਉੱਤਰ", stops: H400_STOPS },
    { name: "Highway 403 / QEW / GTA", namePa: "ਹਾਈਵੇ 403 / QEW / GTA", stops: GTA_STOPS },
    { name: "🇺🇸 I-90 (NY Thruway — Buffalo to Albany)", namePa: "I-90 (ਨਿਊਯਾਰਕ)", stops: I90_STOPS },
    { name: "🇺🇸 I-81 (PA / NY — Syracuse to Harrisburg)", namePa: "I-81 (ਪੈਨਸਿਲਵੇਨੀਆ / ਨਿਊਯਾਰਕ)", stops: I81_STOPS },
    { name: "🇺🇸 I-75 / I-94 (Michigan — Detroit corridor)", namePa: "I-75 / I-94 (ਮਿਸ਼ੀਗਨ)", stops: MICHIGAN_STOPS },
    { name: "🇺🇸 I-87 / I-95 (East Coast — NJ to MA)", namePa: "I-87 / I-95 (ਈਸਟ ਕੋਸਟ)", stops: EASTCOAST_STOPS },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Truck Parking</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <ParkingCircle className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          North America Truck Parking
        </h1>
        <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
          ਉੱਤਰੀ ਅਮਰੀਕਾ ਟਰੱਕ ਪਾਰਕਿੰਗ
        </p>
        <p className="mt-2 text-muted-foreground">
          Truck stops along major Canada-US corridors. Ontario 401, I-90, I-81, I-75 and more.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-orange-500/30 bg-orange-500/5 p-4 text-center text-sm text-gray-400">
        <p>
          Ontario has a <strong className="text-orange-400">critical truck parking shortage</strong>.
          Plan your stops in advance — popular lots fill up by 6 PM.
        </p>
        <p className="mt-1 font-gurmukhi text-xs text-[#FACC15]/70">
          ਪਹਿਲਾਂ ਤੋਂ ਆਪਣੇ ਸਟਾਪ ਪਲੈਨ ਕਰੋ — ਮਸ਼ਹੂਰ ਲਾਟ ਸ਼ਾਮ 6 ਵਜੇ ਤੱਕ ਭਰ ਜਾਂਦੇ ਹਨ
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="mb-4 border-b border-[#333] pb-2">
              <h2 className="text-lg font-bold text-white">{region.name}</h2>
              <p className="font-gurmukhi text-sm text-[#FACC15]">{region.namePa}</p>
              <p className="text-sm text-gray-500">{region.stops.length} locations</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {region.stops.map((stop) => (
                <div
                  key={stop.name}
                  className="rounded-xl border border-[#333] bg-[#1A1A1A] p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white">
                        {stop.name}
                        {stop.desiOwned && (
                          <span className="ml-2 inline-flex items-center gap-0.5 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                            <Star className="h-2.5 w-2.5 fill-green-400" />
                            Desi
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-sm text-[#FACC15]">{stop.highway}</p>
                    </div>
                  </div>
                  <p className="mt-2 flex items-start gap-1.5 text-sm text-gray-400">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
                    {stop.location}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    <ParkingCircle className="mr-1 inline h-3.5 w-3.5" />
                    {stop.parking}
                  </p>

                  {/* Amenities */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {stop.amenities.map((a) => (
                      <span
                        key={a}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                          a === "desi"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-[#222] text-gray-400"
                        }`}
                      >
                        <AmenityIcon type={a} />
                        {AMENITIES_MAP[a]?.label ?? a}
                      </span>
                    ))}
                  </div>

                  {stop.note && (
                    <p className="mt-2 text-xs italic text-gray-500">{stop.note}</p>
                  )}

                  <a
                    href={`https://www.google.com/maps?q=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-gray-500 hover:text-[#FACC15]"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Searchable database of ALL stops */}
      <SearchStops />

      {/* Tips section */}
      <div className="mt-10 rounded-xl border border-[#333] bg-[#1A1A1A] p-6">
        <h2 className="text-lg font-bold text-white">Trucker Parking Tips</h2>
        <p className="mt-1 font-gurmukhi text-sm text-[#FACC15]">ਟਰੱਕ ਪਾਰਕਿੰਗ ਟਿਪਸ</p>
        <ul className="mt-4 space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span><strong className="text-white">Arrive before 6 PM</strong> — popular lots like Woodstock Flying J and Belleville ONroute fill up fast</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span><strong className="text-white">ONroute rest areas</strong> don&apos;t allow overnight parking for trucks. Use for short breaks only.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span><strong className="text-white">Walmart lots</strong> — some allow truck parking (Cambridge, Belleville). Always check with the store first.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span><strong className="text-white">Winter tip:</strong> Keep your truck idling spot level. Sloped parking + ice = runaway truck.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-[#FACC15]">•</span>
            <span><strong className="text-white">GTA overnight:</strong> Finding truck parking in the GTA is nearly impossible. Plan to stop before Toronto or push through to the other side.</span>
          </li>
        </ul>
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        <p>Know a truck-friendly parking spot we missed?</p>
        <p className="mt-1">
          <Link href="/contact" className="text-[#FACC15] hover:underline">Let us know</Link> and we&apos;ll add it.
        </p>
      </div>
    </div>
  );
}

// ── Data ──

const H401_STOPS: TruckStop[] = [
  {
    name: "Flying J — Woodstock",
    highway: "Hwy 401, Exit 232",
    location: "696 Norwich Ave, Woodstock, ON",
    parking: "~120 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 43.1201,
    lng: -80.7564,
    note: "One of the busiest truck stops in Ontario. Fill up early evening.",
  },
  {
    name: "Petro-Pass — Trenton",
    highway: "Hwy 401, Exit 526",
    location: "376 Old Hwy 2, Trenton, ON",
    parking: "~50 truck spaces",
    amenities: ["fuel", "food"],
    lat: 44.0837,
    lng: -77.5639,
  },
  {
    name: "TA Travel Centre — Cornwall",
    highway: "Hwy 401, Exit 792",
    location: "805 Brookdale Ave, Cornwall, ON",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "laundry"],
    lat: 45.0286,
    lng: -74.7437,
    note: "Last major truck stop before Quebec border.",
  },
  {
    name: "Flying J — Napanee",
    highway: "Hwy 401, Exit 579",
    location: "86 Esso Rd, Napanee, ON",
    parking: "~100 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 44.2336,
    lng: -76.9178,
  },
  {
    name: "Husky — Belleville",
    highway: "Hwy 401, Exit 543",
    location: "225 Bell Blvd, Belleville, ON",
    parking: "~40 truck spaces",
    amenities: ["fuel", "food"],
    lat: 44.1575,
    lng: -77.3693,
  },
  {
    name: "ONroute — West Lorne",
    highway: "Hwy 401 WB",
    location: "Between Exits 76–86, West Lorne",
    parking: "Short-term only (no overnight)",
    amenities: ["food", "wifi"],
    lat: 42.6041,
    lng: -81.5891,
    note: "ONroute rest areas do NOT allow overnight truck parking.",
  },
  {
    name: "Petro-Canada — Ingersoll",
    highway: "Hwy 401, Exit 218",
    location: "Ingersoll, ON",
    parking: "~30 truck spaces",
    amenities: ["fuel", "food"],
    lat: 43.0370,
    lng: -80.8736,
  },
  {
    name: "Sikh Dhaba & Truck Stop — Woodstock",
    highway: "Hwy 401, Exit 232 area",
    location: "Near Norwich Ave, Woodstock, ON",
    parking: "~15 truck spaces",
    amenities: ["food", "desi", "parking"],
    lat: 43.1195,
    lng: -80.7540,
    desiOwned: true,
    note: "Punjabi dhaba with truck parking. Roti, dal, sabzi. Driver favourite.",
  },
];

const H400_STOPS: TruckStop[] = [
  {
    name: "Flying J — Barrie",
    highway: "Hwy 400, Exit 96",
    location: "25 Saunders Rd, Barrie, ON",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 44.3696,
    lng: -79.6902,
    note: "Key stop before heading north on 400/11.",
  },
  {
    name: "Petro-Pass — Parry Sound",
    highway: "Hwy 400, Exit 224",
    location: "Parry Sound, ON",
    parking: "~25 truck spaces",
    amenities: ["fuel", "food"],
    lat: 45.3388,
    lng: -79.9401,
  },
  {
    name: "Husky — Sudbury",
    highway: "Hwy 69/Trans-Canada",
    location: "1480 Kingsway, Sudbury, ON",
    parking: "~50 truck spaces",
    amenities: ["fuel", "food", "showers"],
    lat: 46.4703,
    lng: -80.9801,
  },
  {
    name: "Petro-Canada — North Bay",
    highway: "Hwy 11/17",
    location: "North Bay, ON",
    parking: "~35 truck spaces",
    amenities: ["fuel", "food"],
    lat: 46.3024,
    lng: -79.4478,
  },
];

const GTA_STOPS: TruckStop[] = [
  {
    name: "Flying J — Milton",
    highway: "Hwy 401, Exit 320",
    location: "8561 Tremaine Rd, Milton, ON",
    parking: "~100 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 43.4997,
    lng: -79.8462,
    note: "Best option near the west end of the GTA.",
  },
  {
    name: "Petro-Pass — Mississauga",
    highway: "Hwy 401/403 area",
    location: "5500 Dixie Rd, Mississauga, ON",
    parking: "~40 truck spaces",
    amenities: ["fuel", "food"],
    lat: 43.6178,
    lng: -79.5779,
    note: "One of the few truck fueling options inside the GTA.",
  },
  {
    name: "Pilot — Hamilton (Stoney Creek)",
    highway: "QEW, Exit 88",
    location: "295 Millen Rd, Stoney Creek, ON",
    parking: "~60 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 43.2224,
    lng: -79.7124,
  },
  {
    name: "Goreway Industrial Area",
    highway: "Near Hwy 427 / Pearson Airport",
    location: "Goreway Dr area, Brampton, ON",
    parking: "Street/yard parking (check signs)",
    amenities: ["desi", "food"],
    lat: 43.7137,
    lng: -79.6307,
    desiOwned: true,
    note: "Multiple Punjabi restaurants and trucking yards in the area. Not an official truck stop but truckers park here.",
  },
];

// ── US CORRIDORS ──

const I90_STOPS: TruckStop[] = [
  {
    name: "TA — Pembroke (Buffalo area)",
    highway: "I-90, Exit 49",
    location: "6895 Alleghany Rd, Pembroke, NY",
    parking: "~200 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 43.0301,
    lng: -78.3564,
    note: "First major US truck stop after crossing Peace Bridge from Fort Erie.",
  },
  {
    name: "Pilot — Angola",
    highway: "I-90, Exit 57A",
    location: "627 N Main St, Angola, NY",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.6340,
    lng: -79.0294,
  },
  {
    name: "TA — Canastota",
    highway: "I-90, Exit 34",
    location: "1410 Route 5 S, Canastota, NY",
    parking: "~150 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "laundry"],
    lat: 43.0617,
    lng: -75.7510,
  },
  {
    name: "Pilot — Syracuse (DeWitt)",
    highway: "I-90, Exit 35",
    location: "6229 E Taft Rd, N Syracuse, NY",
    parking: "~100 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 43.0930,
    lng: -76.0780,
  },
  {
    name: "Love's — Utica",
    highway: "I-90, Exit 31",
    location: "5571 Willow Pl, Utica, NY",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 43.0875,
    lng: -75.2697,
  },
];

const I81_STOPS: TruckStop[] = [
  {
    name: "Pilot — Watertown",
    highway: "I-81, Exit 45",
    location: "25369 NY-12, Watertown, NY",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 43.9415,
    lng: -75.8754,
    note: "Key stop on I-81 coming south from Thousand Islands crossing.",
  },
  {
    name: "TA — Syracuse",
    highway: "I-81, Exit 25",
    location: "7000 Lakeshore Rd, Cicero, NY",
    parking: "~180 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 43.1609,
    lng: -76.0693,
  },
  {
    name: "Pilot — Binghamton",
    highway: "I-81, Exit 5",
    location: "1060 Upper Front St, Binghamton, NY",
    parking: "~70 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.1437,
    lng: -75.9019,
  },
  {
    name: "Love's — Harrisburg (PA)",
    highway: "I-81, Exit 77",
    location: "7944 Linglestown Rd, Harrisburg, PA",
    parking: "~120 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 40.3470,
    lng: -76.7832,
  },
  {
    name: "Petro — Carlisle (PA)",
    highway: "I-81, Exit 52",
    location: "1200 Harrisburg Pike, Carlisle, PA",
    parking: "~250 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 40.1810,
    lng: -77.1708,
    note: "One of the largest truck stops on I-81. Iron Skillet restaurant.",
  },
];

const MICHIGAN_STOPS: TruckStop[] = [
  {
    name: "Pilot — Monroe (Detroit S)",
    highway: "I-75, Exit 15",
    location: "1340 N Dixie Hwy, Monroe, MI",
    parking: "~100 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 41.9422,
    lng: -83.4009,
    note: "First major stop after crossing Ambassador Bridge from Windsor.",
  },
  {
    name: "Flying J — Woodhaven (Detroit)",
    highway: "I-75, Exit 32",
    location: "21400 West Rd, Woodhaven, MI",
    parking: "~150 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales"],
    lat: 42.1248,
    lng: -83.2429,
  },
  {
    name: "Love's — Flat Rock",
    highway: "I-75, Exit 26",
    location: "26301 Vreeland Rd, Flat Rock, MI",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.0892,
    lng: -83.3224,
  },
  {
    name: "TA — Ann Arbor",
    highway: "I-94, Exit 169",
    location: "3600 Carpenter Rd, Ypsilanti, MI",
    parking: "~200 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 42.2133,
    lng: -83.7137,
  },
  {
    name: "Pilot — Port Huron",
    highway: "I-94, Exit 271",
    location: "2801 Dove Rd, Port Huron, MI",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.9752,
    lng: -82.4714,
    note: "Near Blue Water Bridge crossing from Point Edward, ON.",
  },
];

const EASTCOAST_STOPS: TruckStop[] = [
  {
    name: "Pilot — Clifton Park (Albany, NY)",
    highway: "I-87, Exit 9",
    location: "1631 US-9, Clifton Park, NY",
    parking: "~100 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.8576,
    lng: -73.7898,
  },
  {
    name: "TA — Newburgh (NY)",
    highway: "I-87/I-84",
    location: "1239 Route 300, Newburgh, NY",
    parking: "~150 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 41.5350,
    lng: -74.0620,
  },
  {
    name: "Petro — Bordentown (NJ)",
    highway: "NJ Turnpike, Exit 7",
    location: "3400 Route 206 S, Bordentown, NJ",
    parking: "~200 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi", "scales", "laundry"],
    lat: 40.1452,
    lng: -74.6898,
    note: "Major hub on the NJ Turnpike. Very busy.",
  },
  {
    name: "Pilot — Milford (CT)",
    highway: "I-95, Exit 40",
    location: "1340 Boston Post Rd, Milford, CT",
    parking: "~60 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 41.2185,
    lng: -73.0557,
  },
  {
    name: "Love's — Sturbridge (MA)",
    highway: "I-84, Exit 3",
    location: "400 Haynes St, Sturbridge, MA",
    parking: "~80 truck spaces",
    amenities: ["fuel", "food", "showers", "wifi"],
    lat: 42.1073,
    lng: -72.0698,
  },
];
