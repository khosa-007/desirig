import Link from "next/link";
import { MapPin, Phone, Star, Globe, Shield } from "lucide-react";

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    slug: string;
    address: string | null;
    phone: string | null;
    website: string | null;
    google_rating: number | null;
    google_review_count: number | null;
    is_desi_owned: boolean | null;
    is_verified: boolean | null;
    province: string | null;
    categories: { name: string; slug: string; icon: string | null } | null;
    cities: { name: string; slug: string; province: string } | null;
  };
}

export function BusinessCard({ business }: BusinessCardProps) {
  const citySlug = business.cities?.slug ?? "";
  const categorySlug = business.categories?.slug ?? "";
  const href = `/${citySlug}/${categorySlug}/${business.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="rounded-xl border bg-card p-5 transition-all hover:border-orange-200 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold group-hover:text-orange-600">
              {business.name}
            </h3>

            {business.categories && (
              <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {business.categories.name}
              </span>
            )}
          </div>

          {business.google_rating && business.google_rating > 0 && (
            <div className="flex items-center gap-1 rounded-lg bg-orange-50 px-2 py-1 text-sm font-semibold text-orange-700">
              <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              {business.google_rating.toFixed(1)}
              {business.google_review_count ? (
                <span className="text-xs font-normal text-orange-500">
                  ({business.google_review_count})
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1.5">
          {business.address && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{business.address}</span>
            </div>
          )}

          {business.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}

          {business.website && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {business.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          {business.is_desi_owned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              Desi Owned
            </span>
          )}
          {business.is_verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
              <Shield className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
