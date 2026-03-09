import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Phone,
  Globe,
  Star,
  Shield,
  ExternalLink,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBusinessBySlug, getCityBySlug } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { NearbyBusinesses } from "./nearby";
import { BusinessReviews } from "@/components/reviews/business-reviews";

export const revalidate = 3600; // revalidate every hour so new reviews show up

interface PageProps {
  params: Promise<{ citySlug: string; categorySlug: string; businessSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug, businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug, citySlug);

  if (!business) return {};

  const city = business.cities as { name: string; province: string } | null;
  const category = business.categories as { name: string } | null;
  const location = city ? `${city.name}, ${city.province}` : "";

  const title = `${business.name} — ${category?.name ?? ""} in ${location}`;
  const description = `${business.name} in ${location}. Phone: ${business.phone ?? "N/A"}. ${
    business.google_rating ? `Rated ${business.google_rating}/5` : ""
  }. Find address, hours, and reviews on DesiRig.`;

  const cat = business.categories as { slug: string } | null;
  return {
    title,
    description,
    alternates: {
      canonical: `https://desirig.com/${citySlug}/${cat?.slug ?? ""}/${businessSlug}`,
    },
    openGraph: {
      title: `${title} | DesiRig`,
      description,
    },
  };
}

export default async function BusinessDetailPage({ params }: PageProps) {
  const { citySlug, categorySlug, businessSlug } = await params;
  const business = await getBusinessBySlug(businessSlug, citySlug);

  if (!business) notFound();

  const city = business.cities as { name: string; slug: string; province: string } | null;
  const category = business.categories as { name: string; slug: string; icon: string | null } | null;

  // Check if this business has FMCSA data linked
  let fmcsa = null;
  if (business.phone) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("fmcsa_carriers")
      .select("*")
      .eq("phone", business.phone)
      .limit(1)
      .maybeSingle();
    fmcsa = data;
  }

  // Fetch DesiRig reviews
  const reviewSupabase = await createClient();
  const { data: reviewsData } = await reviewSupabase
    .from("reviews")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const reviews = reviewsData ?? [];
  const reviewCount = reviews.length;
  const reviewAvg = reviewCount > 0
    ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviewCount
    : 0;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    address: business.address
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address,
          addressLocality: city?.name,
          addressRegion: city?.province,
          addressCountry: "CA",
        }
      : undefined,
    telephone: business.phone,
    url: business.website,
    aggregateRating: business.google_rating
      ? {
          "@type": "AggregateRating",
          ratingValue: business.google_rating,
          reviewCount: business.google_review_count || 1,
        }
      : undefined,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        {city && (
          <>
            <Link href={`/${city.slug}`} className="hover:text-foreground">
              {city.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        {category && city && (
          <>
            <Link
              href={`/${city.slug}/${category.slug}`}
              className="hover:text-foreground"
            >
              {category.name}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
          </>
        )}
        <span className="text-foreground">{business.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {business.name}
                </h1>
                {category && (
                  <span className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
                    {category.name}
                  </span>
                )}
              </div>

              {business.google_rating && business.google_rating > 0 && (
                <div className="flex items-center gap-1.5 rounded-xl bg-orange-50 px-3 py-2 text-lg font-bold text-orange-700">
                  <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                  {business.google_rating.toFixed(1)}
                  {business.google_review_count ? (
                    <span className="text-sm font-normal text-orange-500">
                      ({business.google_review_count} reviews)
                    </span>
                  ) : null}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {business.is_desi_owned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                  Desi Owned
                </span>
              )}
              {business.is_verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  <Shield className="h-3.5 w-3.5" />
                  DesiRig Verified
                </span>
              )}
              {fmcsa && (
                <Link
                  href={`/safety/${fmcsa.dot_number}`}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                >
                  <Shield className="h-3.5 w-3.5" />
                  DOT# {fmcsa.dot_number}
                </Link>
              )}
            </div>

            {/* Contact details */}
            <div className="mt-6 space-y-3">
              {business.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <span>{business.address}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={`tel:${business.phone}`}
                    className="font-medium text-orange-600 hover:underline"
                  >
                    {business.phone}
                  </a>
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-600 hover:underline"
                  >
                    {business.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {business.phone && (
                <a href={`tel:${business.phone}`}>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              )}
              {business.website && (
                <a
                  href={business.website.startsWith("http") ? business.website : `https://${business.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </a>
              )}
            </div>

            {/* Report link */}
            <p className="mt-4 text-xs text-muted-foreground">
              See something wrong?{" "}
              <a
                href={`mailto:rig@desirig.com?subject=Incorrect%20Info%3A%20${encodeURIComponent(business.name)}&body=Business%3A%20${encodeURIComponent(business.name)}%0APage%3A%20${encodeURIComponent(`https://desirig.com/${citySlug}/${categorySlug}/${business.slug}`)}%0A%0AWhat%20is%20incorrect%3A%0A`}
                className="text-orange-600 hover:underline"
              >
                Report incorrect information
              </a>
            </p>
          </div>

          {/* FMCSA Safety Card */}
          {fmcsa && (
            <div className="mt-6 rounded-xl border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="h-5 w-5 text-green-600" />
                Carrier Safety Record
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Official government safety data
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">DOT Number</div>
                  <div className="mt-1 font-semibold">{fmcsa.dot_number}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">Total Drivers</div>
                  <div className="mt-1 flex items-center gap-1 font-semibold">
                    <Users className="h-4 w-4" />
                    {fmcsa.total_drivers}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">Power Units</div>
                  <div className="mt-1 flex items-center gap-1 font-semibold">
                    <Truck className="h-4 w-4" />
                    {fmcsa.power_units}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground">Safety Rating</div>
                  <div className="mt-1 font-semibold">
                    {fmcsa.safety_rating || "Not Rated"}
                  </div>
                </div>
              </div>

              <Link href={`/safety/${fmcsa.dot_number}`} className="mt-4 block">
                <Button variant="outline" size="sm" className="gap-1">
                  View Full Safety Report <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Map link */}
          {business.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + " " + business.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border bg-muted/40 p-8 text-center transition-colors hover:bg-muted/60"
            >
              <MapPin className="mx-auto h-8 w-8 text-orange-500" />
              <p className="mt-2 text-sm font-medium text-orange-600">
                View on Google Maps
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {business.address}
              </p>
            </a>
          )}

          {/* Quick info */}
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold">Quick Info</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {city && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">City</dt>
                  <dd className="font-medium">{city.name}, {city.province}</dd>
                </div>
              )}
              {category && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium">{category.name}</dd>
                </div>
              )}
              {business.google_rating && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Rating</dt>
                  <dd className="font-medium">{business.google_rating}/5</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Claim CTA */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
            <h3 className="font-semibold text-orange-900">Is this your business?</h3>
            <p className="mt-1 text-sm text-orange-700">
              Claim your listing to update info, respond to reviews, and get
              verified.
            </p>
            <Link href="/contact" className="mt-3 block">
              <Button
                size="sm"
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Claim This Listing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* DesiRig Reviews */}
      <BusinessReviews
        businessId={business.id}
        businessName={business.name}
        initialReviews={reviews}
        initialAvg={reviewAvg}
        initialCount={reviewCount}
      />

      {/* Nearby businesses */}
      <NearbyBusinesses
        businessId={business.id}
        cityId={business.city_id ?? 0}
        categoryId={business.category_id}
        citySlug={citySlug}
        categorySlug={categorySlug}
      />
    </div>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
