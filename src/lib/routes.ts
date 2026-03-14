export interface RouteCity {
  key: string; // matches CITY_STATIONS key
  name: string;
  province: string;
  km: number; // km from start
}

export interface TruckRoute {
  id: string;
  name: { en: string; pa: string };
  totalKm: number;
  estimatedHours: number; // at 90 km/h average truck speed
  cities: RouteCity[];
}

export const TRUCK_ROUTES: TruckRoute[] = [
  {
    id: "toronto-montreal",
    name: { en: "Toronto \u2192 Montreal", pa: "\u0A1F\u0A4B\u0A30\u0A3E\u0A02\u0A1F\u0A4B \u2192 \u0A2E\u0A3E\u0A02\u0A1F\u0A30\u0A40\u0A05\u0A32" },
    totalKm: 540,
    estimatedHours: 6,
    cities: [
      { key: "toronto", name: "Toronto", province: "ON", km: 0 },
      { key: "oshawa", name: "Oshawa", province: "ON", km: 60 },
      { key: "kingston", name: "Kingston", province: "ON", km: 260 },
      { key: "cornwall", name: "Cornwall", province: "ON", km: 440 },
      { key: "montreal", name: "Montreal", province: "QC", km: 540 },
    ],
  },
  {
    id: "toronto-winnipeg",
    name: { en: "Toronto \u2192 Winnipeg", pa: "\u0A1F\u0A4B\u0A30\u0A3E\u0A02\u0A1F\u0A4B \u2192 \u0A35\u0A3F\u0A28\u0A40\u0A2A\u0A48\u0A71\u0A17" },
    totalKm: 2100,
    estimatedHours: 23,
    cities: [
      { key: "toronto", name: "Toronto", province: "ON", km: 0 },
      { key: "sudbury", name: "Sudbury", province: "ON", km: 390 },
      { key: "sault-ste-marie", name: "Sault Ste. Marie", province: "ON", km: 690 },
      { key: "thunder-bay", name: "Thunder Bay", province: "ON", km: 1380 },
      { key: "winnipeg", name: "Winnipeg", province: "MB", km: 2100 },
    ],
  },
  {
    id: "toronto-calgary",
    name: { en: "Toronto \u2192 Calgary", pa: "\u0A1F\u0A4B\u0A30\u0A3E\u0A02\u0A1F\u0A4B \u2192 \u0A15\u0A48\u0A32\u0A17\u0A30\u0A40" },
    totalKm: 3400,
    estimatedHours: 38,
    cities: [
      { key: "toronto", name: "Toronto", province: "ON", km: 0 },
      { key: "sudbury", name: "Sudbury", province: "ON", km: 390 },
      { key: "thunder-bay", name: "Thunder Bay", province: "ON", km: 1380 },
      { key: "winnipeg", name: "Winnipeg", province: "MB", km: 2100 },
      { key: "regina", name: "Regina", province: "SK", km: 2700 },
      { key: "calgary", name: "Calgary", province: "AB", km: 3400 },
    ],
  },
  {
    id: "toronto-vancouver",
    name: { en: "Toronto \u2192 Vancouver", pa: "\u0A1F\u0A4B\u0A30\u0A3E\u0A02\u0A1F\u0A4B \u2192 \u0A35\u0A48\u0A28\u0A15\u0A42\u0A35\u0A30" },
    totalKm: 4400,
    estimatedHours: 49,
    cities: [
      { key: "toronto", name: "Toronto", province: "ON", km: 0 },
      { key: "sudbury", name: "Sudbury", province: "ON", km: 390 },
      { key: "thunder-bay", name: "Thunder Bay", province: "ON", km: 1380 },
      { key: "winnipeg", name: "Winnipeg", province: "MB", km: 2100 },
      { key: "regina", name: "Regina", province: "SK", km: 2700 },
      { key: "calgary", name: "Calgary", province: "AB", km: 3400 },
      { key: "kamloops", name: "Kamloops", province: "BC", km: 3980 },
      { key: "vancouver", name: "Vancouver", province: "BC", km: 4400 },
    ],
  },
  {
    id: "brampton-detroit",
    name: { en: "Brampton \u2192 Detroit", pa: "\u0A2C\u0A30\u0A48\u0A02\u0A2A\u0A1F\u0A28 \u2192 \u0A21\u0A40\u0A1F\u0A4D\u0A30\u0A4B\u0A07\u0A1F" },
    totalKm: 380,
    estimatedHours: 4.5,
    cities: [
      { key: "brampton", name: "Brampton", province: "ON", km: 0 },
      { key: "london", name: "London", province: "ON", km: 185 },
      { key: "windsor", name: "Windsor/Detroit", province: "ON", km: 380 },
    ],
  },
  {
    id: "surrey-edmonton",
    name: { en: "Surrey \u2192 Edmonton", pa: "\u0A38\u0A30\u0A40 \u2192 \u0A10\u0A21\u0A2E\u0A70\u0A1F\u0A28" },
    totalKm: 1160,
    estimatedHours: 13,
    cities: [
      { key: "surrey", name: "Surrey", province: "BC", km: 0 },
      { key: "kamloops", name: "Kamloops", province: "BC", km: 370 },
      { key: "calgary", name: "Calgary", province: "AB", km: 870 },
      { key: "red-deer", name: "Red Deer", province: "AB", km: 1020 },
      { key: "edmonton", name: "Edmonton", province: "AB", km: 1160 },
    ],
  },
  {
    id: "montreal-halifax",
    name: { en: "Montreal \u2192 Halifax", pa: "\u0A2E\u0A3E\u0A02\u0A1F\u0A30\u0A40\u0A05\u0A32 \u2192 \u0A39\u0A48\u0A32\u0A40\u0A2B\u0A48\u0A15\u0A38" },
    totalKm: 1270,
    estimatedHours: 14,
    cities: [
      { key: "montreal", name: "Montreal", province: "QC", km: 0 },
      { key: "quebec", name: "Quebec City", province: "QC", km: 250 },
      { key: "fredericton", name: "Fredericton", province: "NB", km: 900 },
      { key: "moncton", name: "Moncton", province: "NB", km: 1070 },
      { key: "halifax", name: "Halifax", province: "NS", km: 1270 },
    ],
  },
  {
    id: "calgary-edmonton",
    name: { en: "Calgary \u2192 Edmonton", pa: "\u0A15\u0A48\u0A32\u0A17\u0A30\u0A40 \u2192 \u0A10\u0A21\u0A2E\u0A70\u0A1F\u0A28" },
    totalKm: 300,
    estimatedHours: 3.5,
    cities: [
      { key: "calgary", name: "Calgary", province: "AB", km: 0 },
      { key: "red-deer", name: "Red Deer", province: "AB", km: 150 },
      { key: "edmonton", name: "Edmonton", province: "AB", km: 300 },
    ],
  },
  {
    id: "winnipeg-calgary",
    name: { en: "Winnipeg \u2192 Calgary", pa: "\u0A35\u0A3F\u0A28\u0A40\u0A2A\u0A48\u0A71\u0A17 \u2192 \u0A15\u0A48\u0A32\u0A17\u0A30\u0A40" },
    totalKm: 1330,
    estimatedHours: 15,
    cities: [
      { key: "winnipeg", name: "Winnipeg", province: "MB", km: 0 },
      { key: "brandon", name: "Brandon", province: "MB", km: 210 },
      { key: "regina", name: "Regina", province: "SK", km: 570 },
      { key: "calgary", name: "Calgary", province: "AB", km: 1330 },
    ],
  },
];
