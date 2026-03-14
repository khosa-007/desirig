import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Fallback coordinates for major Canadian cities (used if DB lat/lng is null)
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "brampton-on": { lat: 43.7315, lng: -79.7624 },
  "mississauga-on": { lat: 43.589, lng: -79.6441 },
  "toronto-on": { lat: 43.6532, lng: -79.3832 },
  "surrey-bc": { lat: 49.1913, lng: -122.849 },
  "vancouver-bc": { lat: 49.2827, lng: -123.1207 },
  "edmonton-ab": { lat: 53.5461, lng: -113.4938 },
  "calgary-ab": { lat: 51.0447, lng: -114.0719 },
  "winnipeg-mb": { lat: 49.8951, lng: -97.1384 },
  "ottawa-on": { lat: 45.4215, lng: -75.6972 },
  "montreal-qc": { lat: 45.5017, lng: -73.5673 },
  "hamilton-on": { lat: 43.2557, lng: -79.8711 },
  "london-on": { lat: 42.9849, lng: -81.2453 },
  "kitchener-on": { lat: 43.4516, lng: -80.4925 },
  "windsor-on": { lat: 42.3149, lng: -83.0364 },
  "regina-sk": { lat: 50.4452, lng: -104.6189 },
  "saskatoon-sk": { lat: 52.1332, lng: -106.67 },
  "halifax-ns": { lat: 44.6488, lng: -63.5752 },
  "victoria-bc": { lat: 48.4284, lng: -123.3656 },
  "kelowna-bc": { lat: 49.888, lng: -119.496 },
  "abbotsford-bc": { lat: 49.0504, lng: -122.3045 },
};

function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function GET(request: NextRequest) {
  const lat = parseFloat(request.nextUrl.searchParams.get("lat") ?? "");
  const lng = parseFloat(request.nextUrl.searchParams.get("lng") ?? "");

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: "lat and lng query parameters are required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  // Fetch all cities with their coordinates and listing counts
  const { data: cities, error } = await supabase
    .from("cities")
    .select("id, name, slug, province, latitude, longitude, listing_count")
    .gt("listing_count", 0);

  if (error || !cities || cities.length === 0) {
    return NextResponse.json(
      { error: "Could not load cities" },
      { status: 500 }
    );
  }

  // Find closest city
  let closestCity = cities[0];
  let closestDistance = Infinity;

  for (const city of cities) {
    // Use DB coordinates if available, fall back to hardcoded lookup
    const cityLat = city.latitude ?? CITY_COORDS[city.slug]?.lat;
    const cityLng = city.longitude ?? CITY_COORDS[city.slug]?.lng;

    if (cityLat == null || cityLng == null) continue;

    const dist = haversineDistance(lat, lng, cityLat, cityLng);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestCity = city;
    }
  }

  // If closest city is more than 200km away, user is likely outside Canada
  if (closestDistance > 200) {
    return NextResponse.json({ city: null, distanceKm: Math.round(closestDistance) });
  }

  return NextResponse.json({
    city: {
      name: closestCity.name,
      slug: closestCity.slug,
      province: closestCity.province,
      listingCount: closestCity.listing_count,
    },
    distanceKm: Math.round(closestDistance),
  });
}
