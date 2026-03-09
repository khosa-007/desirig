import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Truck, Coffee, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";
import { createClient } from "@/lib/supabase/server";

const post = getBlogPost("best-truck-stops-ontario")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://desirig.com/blog/${post.slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    type: "article",
    publishedTime: post.date,
  },
};

export default async function BlogPost() {
  const supabase = await createClient();

  // Fetch real truck stops in Ontario from our database
  const { data: truckStops } = await supabase
    .from("businesses")
    .select("name, slug, address, google_rating, google_review_count, city_id, category_id, cities(slug, name), categories(slug)")
    .eq("province", "ON")
    .ilike("categories.name", "%truck stop%")
    .not("google_rating", "is", null)
    .gte("google_rating", 4.0)
    .order("google_review_count", { ascending: false })
    .limit(15);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "DesiRig",
      url: "https://desirig.com",
    },
  };

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">Truck Stops Ontario</span>
      </nav>

      <header>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          Guides
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {post.date} &middot; {post.readTime}
        </p>
      </header>

      <div className="prose-custom mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          Ontario has the busiest trucking corridors in Canada — the 401, 400, 403,
          and QEW carry millions of loads every year. Knowing where to stop for fuel,
          food, parking, and rest is essential for every long-haul driver. Here are
          the best truck stops across Ontario.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          What Makes a Good Truck Stop
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Fuel className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Diesel Availability</p>
              <p className="text-xs">High-speed diesel lanes, DEF fluid, and competitive pricing</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Truck Parking</p>
              <p className="text-xs">Ample, well-lit parking with security cameras</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Coffee className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Food Options</p>
              <p className="text-xs">Hot meals, dhabas nearby, microwaves for home food</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Truck className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Truck Services</p>
              <p className="text-xs">Tire repair, scales, truck wash, mechanic on call</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Top Ontario Truck Stops by Highway
        </h2>

        <h3 className="text-lg font-semibold text-foreground">Highway 401 Corridor</h3>
        <p>
          The 401 is Canada&apos;s busiest highway and the main east-west
          trucking artery. From Windsor to the Quebec border, you need reliable
          stops for fuel and rest.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Flying J / Pilot — various 401 locations</strong> — Reliable chain with truck-specific fueling, showers, and parking. Locations near London, Cambridge, and Belleville.</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">ONroute — across the 401</strong> — Clean facilities, Tim Hortons, but limited truck parking. Better for quick stops than overnight.</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Truckworld — Woodstock area</strong> — Popular with Desi drivers. Good parking, food options nearby, and mechanic services available.</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">Highway 400 North</h3>
        <p>
          Running from Toronto to Barrie and beyond, the 400 gets busy with freight
          heading to Northern Ontario and the Prairies.
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Barrie-area truck stops</strong> — Several options near the 400/11 split. Good refueling point before the long stretch north.</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Parry Sound rest areas</strong> — Limited but available. Plan your HOS carefully north of Barrie — stops get sparse.</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">GTA / Brampton Area</h3>
        <p>
          The GTA is the hub of Desi trucking in Canada. Brampton alone has over 1,200
          trucking companies. Stops here cater to the community with dhabas, Punjabi
          food, and familiar services.
        </p>

        {truckStops && truckStops.length > 0 && (
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-500" />
              Top-Rated Truck Stops on DesiRig
            </h3>
            <div className="mt-3 space-y-3">
              {truckStops.map((stop, i) => {
                const city = stop.cities as unknown as { slug: string; name: string } | null;
                const cat = stop.categories as unknown as { slug: string } | null;
                const href = city && cat
                  ? `/${city.slug}/${cat.slug}/${stop.slug}`
                  : null;

                return (
                  <div key={i} className="flex items-start justify-between gap-2 text-sm">
                    <div>
                      {href ? (
                        <Link href={href} className="font-medium text-orange-600 hover:underline">
                          {stop.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-foreground">{stop.name}</span>
                      )}
                      <p className="text-xs text-muted-foreground">{stop.address}</p>
                    </div>
                    {stop.google_rating && (
                      <span className="shrink-0 text-xs font-medium text-orange-600">
                        {stop.google_rating} ({stop.google_review_count} reviews)
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Tips for Desi Truckers
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Coffee className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Carry a hot plate or electric cooker.</strong> Many truck stops have power outlets. A roti and sabzi beats fast food every time.</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Know your dhabas.</strong> There are Punjabi dhabas along the 401 near Cambridge, Milton, and Whitby. Ask other drivers for the latest spots.</span>
          </li>
          <li className="flex items-start gap-2">
            <Fuel className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Fuel up in Ontario before crossing into Quebec.</strong> Diesel prices jump once you cross the border.</span>
          </li>
          <li className="flex items-start gap-2">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span><strong className="text-foreground">Plan your HOS stops.</strong> Download the DesiRig app (coming soon) to find truck-friendly stops along your route.</span>
          </li>
        </ul>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center text-white">
          <MapPin className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">Find Truck Stops Near You</h3>
          <p className="mt-1 text-orange-100">
            Browse truck stops, mechanics, and tire shops across Ontario.
          </p>
          <Link href="/categories/truck-stop" className="mt-4 inline-block">
            <Button
              size="lg"
              className="bg-white text-orange-700 hover:bg-orange-50"
            >
              Browse Truck Stops
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
