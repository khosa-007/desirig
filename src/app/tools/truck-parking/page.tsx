import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, ParkingCircle, Fuel, Coffee, Wifi, ShowerHead, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Ontario Truck Parking & Rest Stops | DesiRig",
  description:
    "Find truck parking in Ontario: truck stops, rest areas, and service centres along Highway 401, 400, and QEW. Amenities, GPS coordinates, and trucker tips.",
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
          Ontario Truck Parking
        </h1>
        <p className="mt-1 font-gurmukhi text-lg text-[#FACC15]">
          ਓਨਟਾਰੀਓ ਟਰੱਕ ਪਾਰਕਿੰਗ
        </p>
        <p className="mt-2 text-muted-foreground">
          Truck stops, rest areas, and service centres with parking. GPS links included.
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
