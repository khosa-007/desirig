import Link from "next/link";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function NearbyBusinesses({
  businessId,
  cityId,
  categoryId,
  citySlug,
  categorySlug,
}: {
  businessId: string;
  cityId: number;
  categoryId: number;
  citySlug: string;
  categorySlug: string;
}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("businesses")
    .select("id, name, slug, google_rating, google_review_count")
    .eq("city_id", cityId)
    .eq("category_id", categoryId)
    .neq("id", businessId)
    .order("google_rating", { ascending: false, nullsFirst: false })
    .limit(6);

  const nearby = data ?? [];
  if (nearby.length === 0) return null;

  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-lg font-semibold">More in This Category</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nearby.map((biz) => (
          <Link
            key={biz.id}
            href={`/${citySlug}/${categorySlug}/${biz.slug}`}
            className="rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
          >
            <p className="font-medium text-sm line-clamp-1">{biz.name}</p>
            {biz.google_rating && biz.google_rating > 0 && (
              <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                {biz.google_rating.toFixed(1)}
                {biz.google_review_count ? (
                  <span className="text-xs">({biz.google_review_count})</span>
                ) : null}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
