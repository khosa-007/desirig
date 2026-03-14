"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  MapPin,
  Fuel,
  Coffee,
  Wifi,
  Star,
  Filter,
  ChevronDown,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface TruckStop {
  id: number;
  name: string;
  type: string;
  chain: string | null;
  city: string;
  state_province: string;
  country: string;
  lat: number;
  lng: number;
  phone: string | null;
  has_diesel: boolean;
  has_showers: boolean;
  has_wifi: boolean;
  has_food: boolean;
  has_scales: boolean;
  has_desi_food: boolean;
  is_desi_owned: boolean;
  notes: string | null;
}

const COUNTRIES = [
  { value: "", label: "All" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "US", label: "🇺🇸 United States" },
];

const TYPES = [
  { value: "", label: "All Types" },
  { value: "truck_stop", label: "Truck Stops" },
  { value: "rest_area", label: "Rest Areas" },
  { value: "restaurant", label: "Desi Restaurants" },
  { value: "gurdwara", label: "Gurdwaras" },
  { value: "grocery", label: "Indian Grocery" },
];

const CA_PROVINCES = ["ON", "BC", "AB", "SK", "MB", "QC", "NB", "NS", "PE", "NL"];
const US_STATES_POPULAR = [
  "NY", "PA", "OH", "MI", "IN", "IL", "CA", "TX", "NJ", "GA", "FL",
  "TN", "VA", "NC", "WI", "MN", "MO", "KY", "WA", "OR",
];

export function SearchStops() {
  const [stops, setStops] = useState<TruckStop[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [type, setType] = useState("");
  const [desiOnly, setDesiOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 50;

  const search = useCallback(async (resetPage = true) => {
    setLoading(true);
    if (resetPage) setPage(0);

    const supabase = createClient();
    let q = supabase
      .from("truck_stops")
      .select("*", { count: "exact" })
      .order("name")
      .range(resetPage ? 0 : page * PAGE_SIZE, (resetPage ? 0 : page) * PAGE_SIZE + PAGE_SIZE - 1);

    if (query.trim()) {
      q = q.ilike("name", `%${query.trim()}%`);
    }
    if (country) {
      q = q.eq("country", country);
    }
    if (stateProvince) {
      q = q.eq("state_province", stateProvince);
    }
    if (type) {
      q = q.eq("type", type);
    }
    if (desiOnly) {
      q = q.eq("has_desi_food", true);
    }

    const { data, count, error } = await q;
    if (!error && data) {
      if (resetPage) {
        setStops(data);
      } else {
        setStops((prev) => [...prev, ...data]);
      }
      setTotalCount(count ?? 0);
    }
    setLoading(false);
  }, [query, country, stateProvince, type, desiOnly, page]);

  // Initial load
  useEffect(() => {
    search(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => search(true);
  const loadMore = () => {
    setPage((p) => p + 1);
  };

  useEffect(() => {
    if (page > 0) search(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const stateOptions = country === "CA" ? CA_PROVINCES : country === "US" ? US_STATES_POPULAR : [...CA_PROVINCES, ...US_STATES_POPULAR];

  return (
    <div className="mt-10">
      <div className="border-t border-[#333] pt-8">
        <h2 className="text-2xl font-bold text-white">
          Search All Stops
        </h2>
        <p className="mt-1 font-gurmukhi text-sm text-[#FACC15]">
          ਸਾਰੇ ਸਟਾਪ ਖੋਜੋ
        </p>
        <p className="text-sm text-gray-400">
          {totalCount.toLocaleString()} truck stops, rest areas, desi restaurants, and gurdwaras across North America
        </p>
      </div>

      {/* Search bar */}
      <div className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search by name, chain, or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border-[#333] bg-[#1A1A1A] pl-10 text-white placeholder:text-gray-500"
          />
        </div>
        <Button onClick={handleSearch} className="bg-[#FACC15] text-black hover:bg-[#FACC15]/90">
          Search
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-[#333] text-gray-400"
        >
          <Filter className="mr-1 h-4 w-4" />
          Filters
          <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mt-3 grid gap-3 rounded-xl border border-[#333] bg-[#1A1A1A] p-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs text-gray-500">Country</label>
            <select
              value={country}
              onChange={(e) => { setCountry(e.target.value); setStateProvince(""); }}
              className="w-full rounded-lg border border-[#333] bg-[#111] px-3 py-2 text-sm text-white"
            >
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">State / Province</label>
            <select
              value={stateProvince}
              onChange={(e) => setStateProvince(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#111] px-3 py-2 text-sm text-white"
            >
              <option value="">All</option>
              {stateOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-500">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-[#333] bg-[#111] px-3 py-2 text-sm text-white"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/5 px-3 py-2 text-sm text-green-400">
              <input
                type="checkbox"
                checked={desiOnly}
                onChange={(e) => setDesiOnly(e.target.checked)}
                className="accent-green-500"
              />
              <Star className="h-3.5 w-3.5 fill-green-400" />
              Desi Only
            </label>
          </div>
        </div>
      )}

      {/* Quick filter buttons */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => { setDesiOnly(true); setType(""); search(true); }}
          className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400 hover:bg-green-500/20"
        >
          🍛 Desi Restaurants
        </button>
        <button
          onClick={() => { setType("gurdwara"); setDesiOnly(false); search(true); }}
          className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-400 hover:bg-orange-500/20"
        >
          🙏 Gurdwaras
        </button>
        <button
          onClick={() => { setType("truck_stop"); setDesiOnly(false); search(true); }}
          className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 hover:bg-blue-500/20"
        >
          ⛽ Truck Stops
        </button>
        <button
          onClick={() => { setType("rest_area"); setDesiOnly(false); search(true); }}
          className="rounded-full border border-[#FACC15]/30 bg-[#FACC15]/10 px-3 py-1 text-xs text-[#FACC15] hover:bg-[#FACC15]/20"
        >
          🅿️ Rest Areas
        </button>
      </div>

      {/* Results */}
      <div className="mt-6">
        {loading && stops.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#FACC15]" />
          </div>
        ) : stops.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No stops found. Try different filters.
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              {stops.map((stop) => (
                <StopCard key={stop.id} stop={stop} />
              ))}
            </div>
            {stops.length < totalCount && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={loading}
                  className="border-[#333] text-gray-400"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Load More ({stops.length} of {totalCount.toLocaleString()})
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StopCard({ stop }: { stop: TruckStop }) {
  const typeColors: Record<string, string> = {
    truck_stop: "text-blue-400",
    rest_area: "text-yellow-400",
    restaurant: "text-orange-400",
    gurdwara: "text-orange-300",
    grocery: "text-green-400",
  };

  const typeLabels: Record<string, string> = {
    truck_stop: "Truck Stop",
    rest_area: "Rest Area",
    restaurant: "Restaurant",
    gurdwara: "Gurdwara",
    grocery: "Grocery",
  };

  return (
    <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-white">{stop.name}</h3>
            {stop.has_desi_food && (
              <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                <Star className="mr-0.5 inline h-2.5 w-2.5 fill-green-400" />
                Desi
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`text-xs font-medium ${typeColors[stop.type] ?? "text-gray-400"}`}>
              {typeLabels[stop.type] ?? stop.type}
            </span>
            {stop.chain && (
              <span className="text-xs text-gray-500">• {stop.chain}</span>
            )}
          </div>
        </div>
        <span className="shrink-0 text-xs text-gray-500">
          {stop.country === "CA" ? "🇨🇦" : "🇺🇸"} {stop.state_province}
        </span>
      </div>

      {stop.city && (
        <p className="mt-2 flex items-center gap-1 text-sm text-gray-400">
          <MapPin className="h-3 w-3 shrink-0" />
          {stop.city}, {stop.state_province}
        </p>
      )}

      {/* Amenity badges */}
      <div className="mt-2 flex flex-wrap gap-1">
        {stop.has_diesel && (
          <span className="inline-flex items-center gap-0.5 rounded bg-[#222] px-1.5 py-0.5 text-[10px] text-gray-400">
            <Fuel className="h-2.5 w-2.5" /> Diesel
          </span>
        )}
        {stop.has_food && (
          <span className="inline-flex items-center gap-0.5 rounded bg-[#222] px-1.5 py-0.5 text-[10px] text-gray-400">
            <Coffee className="h-2.5 w-2.5" /> Food
          </span>
        )}
        {stop.has_wifi && (
          <span className="inline-flex items-center gap-0.5 rounded bg-[#222] px-1.5 py-0.5 text-[10px] text-gray-400">
            <Wifi className="h-2.5 w-2.5" /> WiFi
          </span>
        )}
        {stop.has_showers && (
          <span className="inline-flex items-center gap-0.5 rounded bg-[#222] px-1.5 py-0.5 text-[10px] text-gray-400">
            🚿 Showers
          </span>
        )}
        {stop.has_scales && (
          <span className="inline-flex items-center gap-0.5 rounded bg-[#222] px-1.5 py-0.5 text-[10px] text-gray-400">
            ⚖️ Scales
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-2 flex items-center gap-3">
        <a
          href={`https://www.google.com/maps?q=${stop.lat},${stop.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#FACC15] hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          Maps
        </a>
        {stop.phone && (
          <a
            href={`tel:${stop.phone.replace(/[^\d+]/g, "")}`}
            className="text-xs text-[#FACC15] hover:underline"
          >
            📞 {stop.phone}
          </a>
        )}
      </div>
    </div>
  );
}
