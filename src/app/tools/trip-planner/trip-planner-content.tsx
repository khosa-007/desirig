"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Wind, Thermometer, AlertTriangle, Loader2, Clock, Navigation } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";
import { TRUCK_ROUTES } from "@/lib/routes";

interface WeatherData {
  city: string;
  province: string;
  temperature: number | null;
  conditions: string;
  windSpeed: string;
  windDirection: string;
  humidity: string;
  alerts: string[];
  iconCode: string;
  observedAt: string;
}

interface CityWeather {
  key: string;
  name: string;
  province: string;
  km: number;
  etaHours: number;
  weather: WeatherData | null;
}

interface TripData {
  route: {
    id: string;
    name: { en: string; pa: string };
    totalKm: number;
    estimatedHours: number;
  };
  cities: CityWeather[];
}

function formatEta(hours: number): string {
  if (hours === 0) return "0h";
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function tempColor(temp: number | null): string {
  if (temp === null) return "text-white";
  if (temp < 0) return "text-blue-400";
  if (temp > 25) return "text-yellow-400";
  return "text-white";
}

export function TripPlannerContent() {
  const { t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function selectRoute(routeId: string) {
    setSelectedRoute(routeId);
    setLoading(true);
    setError("");
    setTripData(null);

    try {
      const res = await fetch(`/api/trip-weather?route=${routeId}`);
      if (!res.ok) throw new Error("Failed to fetch weather data");
      const data = await res.json();
      setTripData(data);
    } catch {
      setError(t({ en: "Could not load weather data. Try again.", pa: "ਮੌਸਮ ਡਾਟਾ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।" }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "Trip Planner", pa: "ਟ੍ਰਿਪ ਪਲੈਨਰ" })}</span>
      </nav>

      {/* Language toggle */}
      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      {/* Title */}
      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FACC15]/10">
          <MapPin className="h-8 w-8 text-[#FACC15]" />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {t({ en: "Trip Planner & Weather", pa: "ਟ੍ਰਿਪ ਪਲੈਨਰ ਤੇ ਮੌਸਮ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: "Pick a route, see live weather at every stop",
            pa: "ਰੂਟ ਚੁਣੋ, ਹਰ ਸਟਾਪ ਤੇ ਲਾਈਵ ਮੌਸਮ ਦੇਖੋ",
          })}
        </p>
      </div>

      {/* Route selector grid */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TRUCK_ROUTES.map((route) => (
          <button
            key={route.id}
            onClick={() => selectRoute(route.id)}
            className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
              selectedRoute === route.id
                ? "border-[#FACC15] bg-[#FACC15]/10"
                : "border-[#333] bg-[#1A1A1A] hover:border-[#FACC15]"
            }`}
          >
            <p className="font-semibold text-white">
              {t({ en: route.name.en, pa: route.name.pa })}
            </p>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Navigation className="h-3.5 w-3.5" />
                {route.totalKm.toLocaleString()} km
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatEta(route.estimatedHours)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="mt-10 flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-[#FACC15]" />
          <p>{t({ en: "Loading weather...", pa: "ਮੌਸਮ ਲੋਡ ਹੋ ਰਿਹਾ..." })}</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </div>
      )}

      {/* Results */}
      {tripData && !loading && (
        <div className="mt-10 space-y-6">
          {/* Route summary */}
          <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-6">
            <h2 className="text-xl font-bold text-[#FACC15]">
              {t({ en: tripData.route.name.en, pa: tripData.route.name.pa })}
            </h2>
            <div className="mt-3 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">{t({ en: "Total Distance", pa: "ਕੁੱਲ ਦੂਰੀ" })}</span>
                <p className="text-lg font-semibold text-white">{tripData.route.totalKm.toLocaleString()} km</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t({ en: "Est. Drive Time", pa: "ਅੰਦਾਜ਼ਨ ਸਮਾਂ" })}</span>
                <p className="text-lg font-semibold text-white">{formatEta(tripData.route.estimatedHours)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t({ en: "Stops", pa: "ਸਟਾਪ" })}</span>
                <p className="text-lg font-semibold text-white">{tripData.cities.length}</p>
              </div>
            </div>
          </div>

          {/* City-by-city weather */}
          <div className="space-y-3">
            {tripData.cities.map((city, idx) => (
              <div
                key={city.key}
                className="rounded-xl border border-[#333] bg-[#111] p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: city info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FACC15]/20 text-xs font-bold text-[#FACC15]">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-white">
                        {city.name}, {city.province}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{city.km.toLocaleString()} km {t({ en: "from start", pa: "ਸ਼ੁਰੂ ਤੋਂ" })}</span>
                      <span>ETA: {formatEta(city.etaHours)}</span>
                    </div>
                  </div>

                  {/* Right: weather */}
                  <div className="flex items-center gap-6">
                    {city.weather ? (
                      <>
                        {/* Temperature */}
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-5 w-5 text-muted-foreground" />
                            <span className={`text-2xl font-bold ${tempColor(city.weather.temperature)}`}>
                              {city.weather.temperature !== null
                                ? `${city.weather.temperature}°C`
                                : "N/A"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{city.weather.conditions}</p>
                        </div>

                        {/* Wind */}
                        <div className="text-center">
                          <div className="flex items-center gap-1">
                            <Wind className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-white">{city.weather.windSpeed}</span>
                          </div>
                          {city.weather.windDirection && (
                            <p className="text-xs text-muted-foreground">{city.weather.windDirection}</p>
                          )}
                        </div>

                        {/* Humidity */}
                        <div className="text-center">
                          <span className="text-sm text-white">{city.weather.humidity}</span>
                          <p className="text-xs text-muted-foreground">{t({ en: "Humidity", pa: "ਨਮੀ" })}</p>
                        </div>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {t({ en: "Weather data unavailable", pa: "ਮੌਸਮ ਡਾਟਾ ਉਪਲਬਧ ਨਹੀਂ" })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Weather alerts */}
                {city.weather?.alerts && city.weather.alerts.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {city.weather.alerts.map((alert, alertIdx) => (
                      <div
                        key={alertIdx}
                        className="flex items-center gap-2 rounded-lg bg-[#FACC15]/10 px-3 py-2 text-sm text-[#FACC15]"
                      >
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
