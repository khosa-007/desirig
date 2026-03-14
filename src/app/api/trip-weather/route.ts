import { NextRequest, NextResponse } from "next/server";
import { TRUCK_ROUTES } from "@/lib/routes";
import { getWeatherForCity } from "@/lib/weather";

export async function GET(request: NextRequest) {
  const routeId = request.nextUrl.searchParams.get("route");

  if (!routeId) {
    return NextResponse.json({ error: "Missing route parameter" }, { status: 400 });
  }

  const route = TRUCK_ROUTES.find((r) => r.id === routeId);
  if (!route) {
    return NextResponse.json({ error: "Route not found" }, { status: 404 });
  }

  // Fetch weather for all cities in parallel
  const weatherResults = await Promise.all(
    route.cities.map(async (city) => {
      const weather = await getWeatherForCity(city.key);
      const etaHours = city.km / 90; // avg truck speed 90 km/h
      return {
        ...city,
        etaHours: Math.round(etaHours * 10) / 10,
        weather,
      };
    })
  );

  return NextResponse.json({
    route: {
      id: route.id,
      name: route.name,
      totalKm: route.totalKm,
      estimatedHours: route.estimatedHours,
    },
    cities: weatherResults,
  });
}
