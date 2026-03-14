import type { Metadata } from "next";
import Link from "next/link";
import { Truck, MapPin } from "lucide-react";
import { getTruckingCategories, getCommunityCategories } from "@/lib/queries";
import { CategoryIcon, isDesiCategory, DesiBadge } from "@/components/category-icon";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all business categories on DesiRig: trucking, community services, restaurants, and more.",
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
          <Truck className="h-5 w-5 text-[#FACC15]" />
          Trucking ({truckingCats.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {truckingCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]"
            >
              <div className="flex items-center justify-between">
                <CategoryIcon icon={cat.icon} size={28} className="text-[#FACC15]" />
                {isDesiCategory(cat.slug) && <DesiBadge compact />}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-200 group-hover:text-[#FACC15]">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <MapPin className="h-5 w-5 text-green-400" />
          Community & Services ({communityCats.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {communityCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group rounded-xl border border-[#333] bg-[#1A1A1A] p-4 transition-all hover:border-[#FACC15]"
            >
              <div className="flex items-center justify-between">
                <CategoryIcon icon={cat.icon} size={28} className="text-green-400" />
                {isDesiCategory(cat.slug) && <DesiBadge compact />}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-200 group-hover:text-[#FACC15]">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
