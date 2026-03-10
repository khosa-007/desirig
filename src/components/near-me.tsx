"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Navigation, Loader2 } from "lucide-react";

interface NearbyCity {
  name: string;
  slug: string;
  province: string;
  listingCount: number;
}

type NearMeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; city: NearbyCity; distanceKm: number }
  | { status: "denied" }
  | { status: "error" };

export function NearMe() {
  const [state, setState] = useState<NearMeState>({ status: "idle" });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState({ status: "denied" });
      return;
    }

    setState({ status: "loading" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `/api/near-me?lat=${latitude}&lng=${longitude}`
          );
          if (!res.ok) throw new Error("API error");
          const data = await res.json();
          setState({
            status: "found",
            city: data.city,
            distanceKm: data.distanceKm,
          });
        } catch {
          setState({ status: "error" });
        }
      },
      () => {
        // User denied location or error
        setState({ status: "denied" });
      },
      { timeout: 10000, maximumAge: 300000 } // 5 min cache
    );
  }, []);

  // Don't render anything if idle, denied, or errored (graceful fallback = invisible)
  if (state.status === "idle" || state.status === "denied" || state.status === "error") {
    return null;
  }

  if (state.status === "loading") {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950/30">
          <Loader2 className="h-5 w-5 animate-spin text-[#FF6E40]" />
          <span className="text-sm text-muted-foreground">
            Finding businesses near you...
          </span>
        </div>
      </div>
    );
  }

  const { city, distanceKm } = state;

  return (
    <div className="container mx-auto px-4 py-6">
      <Link
        href={`/${city.slug}`}
        className="group flex items-center gap-4 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-white p-4 transition-all hover:border-[#FF6E40] hover:shadow-md dark:border-orange-900 dark:from-orange-950/30 dark:to-slate-900"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6E40]/10">
          <Navigation className="h-5 w-5 text-[#FF6E40]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Looks like you&apos;re near {city.name}!
          </p>
          <p className="text-xs text-muted-foreground">
            {city.listingCount.toLocaleString()} businesses in {city.name}, {city.province}
            {distanceKm > 0 && distanceKm < 200 ? ` (about ${distanceKm} km away)` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FF6E40] px-3 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-[#FF5722]">
          <MapPin className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Browse</span>
        </div>
      </Link>
    </div>
  );
}
