import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("businesses")
    .select(
      "id, name, slug, phone, google_rating, categories(name, slug), cities(name, slug, province)"
    )
    .textSearch("fts", q)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(10);

  return NextResponse.json({
    results: (data ?? []).map((biz) => {
      const city = biz.cities as unknown as { name: string; slug: string; province: string } | null;
      const cat = biz.categories as unknown as { name: string; slug: string } | null;
      return {
        name: biz.name,
        category: cat?.name,
        city: city ? `${city.name}, ${city.province}` : null,
        rating: biz.google_rating,
        href: `/${city?.slug ?? ""}/${cat?.slug ?? ""}/${biz.slug}`,
      };
    }),
  });
}
