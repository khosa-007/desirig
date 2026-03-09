import type { Metadata } from "next";
import Link from "next/link";
import { Truck, MapPin } from "lucide-react";
import { getTruckingCategories, getCommunityCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all business categories on DesiRig — trucking, community services, restaurants, and more.",
};

export const revalidate = 86400;

export default async function CategoriesPage() {
  const [truckingCats, communityCats] = await Promise.all([
    getTruckingCategories(),
    getCommunityCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
        All Categories
      </h1>
      <p className="mt-1 text-muted-foreground">
        {truckingCats.length + communityCats.length} categories across trucking and community services
      </p>

      <div className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Truck className="h-5 w-5 text-orange-500" />
          Trucking ({truckingCats.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {truckingCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-100">
                <Truck className="h-5 w-5" />
              </div>
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <MapPin className="h-5 w-5 text-green-500" />
          Community & Services ({communityCats.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {communityCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border bg-card p-4 transition-all hover:border-orange-200 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="mt-2 text-sm font-medium">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
