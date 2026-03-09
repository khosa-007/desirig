export const provinces: Record<string, { name: string; slug: string; code: string }> = {
  ON: { name: "Ontario", slug: "ontario", code: "ON" },
  BC: { name: "British Columbia", slug: "british-columbia", code: "BC" },
  AB: { name: "Alberta", slug: "alberta", code: "AB" },
  QC: { name: "Quebec", slug: "quebec", code: "QC" },
  MB: { name: "Manitoba", slug: "manitoba", code: "MB" },
  SK: { name: "Saskatchewan", slug: "saskatchewan", code: "SK" },
  NS: { name: "Nova Scotia", slug: "nova-scotia", code: "NS" },
  NB: { name: "New Brunswick", slug: "new-brunswick", code: "NB" },
  NL: { name: "Newfoundland and Labrador", slug: "newfoundland-labrador", code: "NL" },
  PE: { name: "Prince Edward Island", slug: "prince-edward-island", code: "PE" },
  NT: { name: "Northwest Territories", slug: "northwest-territories", code: "NT" },
  YT: { name: "Yukon", slug: "yukon", code: "YT" },
  NU: { name: "Nunavut", slug: "nunavut", code: "NU" },
};

export function getProvinceBySlug(slug: string) {
  return Object.values(provinces).find((p) => p.slug === slug) ?? null;
}

export function getProvinceByCode(code: string) {
  return provinces[code] ?? null;
}
