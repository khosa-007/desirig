import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BusinessCard } from "@/components/business/business-card";
import { getCityBySlug, getCategoryBySlug, getBusinesses } from "@/lib/queries";

export const revalidate = 86400; // ISR: 24 hours

interface PageProps {
  params: Promise<{ citySlug: string; categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug, categorySlug } = await params;
  const [city, category] = await Promise.all([
    getCityBySlug(citySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!city || !category) return {};

  const title = `${category.name} in ${city.name}, ${city.province}`;
  const description = `Find the best ${category.name.toLowerCase()} in ${city.name}, ${city.province}. Browse listings with ratings, reviews, phone numbers, and addresses on DesiRig.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | DesiRig`,
      description,
      url: `https://desirig.com/${citySlug}/${categorySlug}`,
    },
  };
}

export default async function ListingPage({ params, searchParams }: PageProps) {
  const { citySlug, categorySlug } = await params;
  const { page: pageParam } = await searchParams;

  const [city, category] = await Promise.all([
    getCityBySlug(citySlug),
    getCategoryBySlug(categorySlug),
  ]);

  if (!city || !category) notFound();

  const page = Math.max(1, parseInt(pageParam || "1", 10));
  const limit = 20;
  const offset = (page - 1) * limit;

  const { businesses, total } = await getBusinesses({
    cityId: city.id,
    categoryId: category.id,
    limit,
    offset,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/${city.slug}`} className="hover:text-foreground">
          {city.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {category.name} in {city.name}, {city.province}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {total} {total === 1 ? "listing" : "listings"} found
        </p>
      </div>

      {/* Results */}
      {businesses.length === 0 ? (
        <div className="rounded-xl border bg-muted/40 p-12 text-center">
          <p className="text-lg font-medium">No listings found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different category or city.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {businesses.map((biz) => (
            <BusinessCard key={biz.id} business={biz} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/${citySlug}/${categorySlug}?page=${page - 1}`}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/${citySlug}/${categorySlug}?page=${page + 1}`}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
