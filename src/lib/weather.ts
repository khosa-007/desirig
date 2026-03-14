// Environment Canada weather data fetcher
// XML feeds: https://dd.weather.gc.ca/citypage_weather/xml/{province}/{stationId}_e.xml

export interface WeatherData {
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

// Major trucker stops — station IDs from Environment Canada
export const CITY_STATIONS: Record<string, { name: string; province: string; stationId: string; provinceCode: string }> = {
  toronto: { name: "Toronto", province: "ON", stationId: "s0000458", provinceCode: "ON" },
  brampton: { name: "Brampton", province: "ON", stationId: "s0000785", provinceCode: "ON" },
  oshawa: { name: "Oshawa", province: "ON", stationId: "s0000657", provinceCode: "ON" },
  kingston: { name: "Kingston", province: "ON", stationId: "s0000245", provinceCode: "ON" },
  cornwall: { name: "Cornwall", province: "ON", stationId: "s0000327", provinceCode: "ON" },
  ottawa: { name: "Ottawa", province: "ON", stationId: "s0000623", provinceCode: "ON" },
  montreal: { name: "Montreal", province: "QC", stationId: "s0000635", provinceCode: "QC" },
  sudbury: { name: "Sudbury", province: "ON", stationId: "s0000680", provinceCode: "ON" },
  "sault-ste-marie": { name: "Sault Ste. Marie", province: "ON", stationId: "s0000616", provinceCode: "ON" },
  "thunder-bay": { name: "Thunder Bay", province: "ON", stationId: "s0000411", provinceCode: "ON" },
  winnipeg: { name: "Winnipeg", province: "MB", stationId: "s0000193", provinceCode: "MB" },
  regina: { name: "Regina", province: "SK", stationId: "s0000788", provinceCode: "SK" },
  calgary: { name: "Calgary", province: "AB", stationId: "s0000047", provinceCode: "AB" },
  edmonton: { name: "Edmonton", province: "AB", stationId: "s0000045", provinceCode: "AB" },
  kamloops: { name: "Kamloops", province: "BC", stationId: "s0000568", provinceCode: "BC" },
  vancouver: { name: "Vancouver", province: "BC", stationId: "s0000141", provinceCode: "BC" },
  surrey: { name: "Surrey", province: "BC", stationId: "s0000141", provinceCode: "BC" },
  halifax: { name: "Halifax", province: "NS", stationId: "s0000318", provinceCode: "NS" },
  moncton: { name: "Moncton", province: "NB", stationId: "s0000654", provinceCode: "NB" },
  fredericton: { name: "Fredericton", province: "NB", stationId: "s0000250", provinceCode: "NB" },
  quebec: { name: "Quebec City", province: "QC", stationId: "s0000620", provinceCode: "QC" },
  london: { name: "London", province: "ON", stationId: "s0000326", provinceCode: "ON" },
  windsor: { name: "Windsor", province: "ON", stationId: "s0000538", provinceCode: "ON" },
  detroit: { name: "Windsor/Detroit", province: "ON", stationId: "s0000538", provinceCode: "ON" },
  brandon: { name: "Brandon", province: "MB", stationId: "s0000492", provinceCode: "MB" },
  "red-deer": { name: "Red Deer", province: "AB", stationId: "s0000036", provinceCode: "AB" },
};

function extractXmlText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function extractAttribute(xml: string, tag: string, attr: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i"));
  return match?.[1]?.trim() ?? "";
}

export async function getWeatherForCity(stationKey: string): Promise<WeatherData | null> {
  const station = CITY_STATIONS[stationKey];
  if (!station) return null;

  try {
    const url = `https://dd.weather.gc.ca/citypage_weather/xml/${station.provinceCode}/${station.stationId}_e.xml`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const xml = await res.text();

    // Current conditions
    const currentBlock = xml.match(/<currentConditions>([\s\S]*?)<\/currentConditions>/i)?.[1] ?? "";
    const temp = extractXmlText(currentBlock, "temperature");
    const condition = extractXmlText(currentBlock, "condition");
    const windSpd = extractXmlText(currentBlock, "speed");
    const windDir = extractXmlText(currentBlock, "direction");
    const humidity = extractXmlText(currentBlock, "relativeHumidity");
    const iconCode = extractAttribute(currentBlock, "iconCode", "code") || extractXmlText(currentBlock, "iconCode");
    const dateTime = currentBlock.match(/<dateTime[^>]*zone="[^U][^"]*"[^>]*>([\s\S]*?)<\/dateTime>/i)?.[1] ?? "";
    const observedHour = extractXmlText(dateTime, "hour");
    const observedMinute = extractXmlText(dateTime, "minute");

    // Alerts/warnings
    const alerts: string[] = [];
    const warningMatches = xml.match(/<event[^>]*description="([^"]*)"/gi) ?? [];
    for (const w of warningMatches) {
      const desc = w.match(/description="([^"]*)"/)?.[1];
      if (desc && !alerts.includes(desc)) alerts.push(desc);
    }

    return {
      city: station.name,
      province: station.province,
      temperature: temp ? parseFloat(temp) : null,
      conditions: condition || "N/A",
      windSpeed: windSpd ? `${windSpd} km/h` : "N/A",
      windDirection: windDir || "",
      humidity: humidity ? `${humidity}%` : "N/A",
      alerts,
      iconCode,
      observedAt: observedHour ? `${observedHour}:${observedMinute}` : "",
    };
  } catch {
    return null;
  }
}
