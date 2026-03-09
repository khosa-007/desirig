import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("display_order");
  return data ?? [];
}

export async function getTruckingCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("is_trucking", true)
    .order("display_order");
  return data ?? [];
}

export async function getCommunityCategories() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("is_trucking", false)
    .order("display_order");
  return data ?? [];
}

export async function getFeaturedCities() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cities")
    .select("*")
    .eq("is_featured", true)
    .order("listing_count", { ascending: false })
    .limit(20);
  return data ?? [];
}

export async function getCityBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getBusinesses({
  cityId,
  categoryId,
  limit = 20,
  offset = 0,
  search,
}: {
  cityId?: number;
  categoryId?: number;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("businesses")
    .select("*, categories(name, slug, icon), cities(name, slug, province)", {
      count: "exact",
    });

  if (cityId) query = query.eq("city_id", cityId);
  if (categoryId) query = query.eq("category_id", categoryId);
  if (search) query = query.textSearch("fts", search);

  const { data, count } = await query
    .order("google_rating", { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  return { businesses: data ?? [], total: count ?? 0 };
}

export async function getBusinessBySlug(slug: string, citySlug: string) {
  const supabase = await createClient();

  // First get city
  const { data: city } = await supabase
    .from("cities")
    .select("id")
    .eq("slug", citySlug)
    .single();

  if (!city) return null;

  const { data } = await supabase
    .from("businesses")
    .select("*, categories(name, slug, icon), cities(name, slug, province)")
    .eq("slug", slug)
    .eq("city_id", city.id)
    .single();

  return data;
}

export async function getFmcsaByDot(dotNumber: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("fmcsa_carriers")
    .select("*")
    .eq("dot_number", dotNumber)
    .single();
  return data;
}

export async function getBusinessCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("businesses")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getCityCount() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("cities")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getRelatedCategoriesInCity(cityId: number, excludeCategoryId: number, limit = 6) {
  const supabase = await createClient();
  // Get categories that have listings in this city, excluding current
  const { data } = await supabase
    .from("businesses")
    .select("category_id, categories(name, slug, icon)")
    .eq("city_id", cityId)
    .neq("category_id", excludeCategoryId)
    .limit(500);

  // Dedupe by category and count
  const catMap = new Map<number, { name: string; slug: string; icon: string; count: number }>();
  (data ?? []).forEach((row) => {
    const cat = row.categories as unknown as { name: string; slug: string; icon: string } | null;
    if (cat && row.category_id) {
      const existing = catMap.get(row.category_id);
      if (existing) {
        existing.count++;
      } else {
        catMap.set(row.category_id, { ...cat, count: 1 });
      }
    }
  });

  return Array.from(catMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function getSameCategoryInOtherCities(categoryId: number, excludeCityId: number, limit = 6) {
  const supabase = await createClient();
  // Get cities that have this category, excluding current city
  const { data } = await supabase
    .from("businesses")
    .select("city_id, cities(name, slug, province)")
    .eq("category_id", categoryId)
    .neq("city_id", excludeCityId)
    .limit(500);

  // Dedupe by city and count
  const cityMap = new Map<number, { name: string; slug: string; province: string; count: number }>();
  (data ?? []).forEach((row) => {
    const c = row.cities as unknown as { name: string; slug: string; province: string } | null;
    if (c && row.city_id) {
      const existing = cityMap.get(row.city_id);
      if (existing) {
        existing.count++;
      } else {
        cityMap.set(row.city_id, { ...c, count: 1 });
      }
    }
  });

  return Array.from(cityMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function searchBusinesses(query: string, limit = 20) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("businesses")
    .select("id, name, slug, phone, address, website, google_rating, google_review_count, is_desi_owned, is_verified, province, categories(name, slug, icon), cities(name, slug, province)")
    .textSearch("fts", query)
    .limit(limit);
  return data ?? [];
}
