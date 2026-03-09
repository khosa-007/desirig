"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Truck, Coffee, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

interface TruckStopData {
  name: string;
  slug: string;
  address: string | null;
  google_rating: number | null;
  google_review_count: number | null;
  city_id: number | null;
  category_id: number | null;
  cities: { slug: string; name: string } | null;
  categories: { slug: string } | null;
}

export function BestTruckStopsContent({
  title,
  description,
  date,
  readTime,
  truckStops,
}: {
  title: string;
  description: string;
  date: string;
  readTime: string;
  truckStops: TruckStopData[];
}) {
  const { t } = useLanguage();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">{t({ en: "Truck Stops Ontario", pa: "Ontario ਟਰੱਕ ਸਟੌਪ" })}</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {t({ en: "Guides", pa: "ਗਾਈਡ" })}
        </span>
        <LanguageToggle />
      </div>

      <header>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {t({ en: title, pa: "Ontario ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਟਰੱਕ ਸਟੌਪ, ਡਰਾਈਵਰ ਗਾਈਡ" })}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t({ en: description, pa: "Ontario ਦੇ ਮੁੱਖ ਹਾਈਵੇ ਤੇ ਸਭ ਤੋਂ ਵਧੀਆ ਟਰੱਕ ਸਟੌਪ, ਡੀਜ਼ਲ, ਪਾਰਕਿੰਗ, ਖਾਣਾ ਤੇ ਸਰਵਿਸ।" })}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {date} &middot; {readTime}
        </p>
      </header>

      <div className="prose-custom mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          {t({
            en: "Ontario has the busiest trucking corridors in Canada. The 401, 400, 403, and QEW carry millions of loads every year. You need to know where to stop for fuel, food, parking, and rest. Here are the best truck stops across Ontario.",
            pa: "Ontario ਵਿੱਚ ਕੈਨੇਡਾ ਦੇ ਸਭ ਤੋਂ ਬਿਜ਼ੀ ਟਰੱਕਿੰਗ ਰੂਟ ਹਨ। 401, 400, 403 ਤੇ QEW ਹਰ ਸਾਲ ਲੱਖਾਂ ਲੋਡ ਚੁੱਕਦੇ ਹਨ। ਹਰ ਲੌਂਗ-ਹੌਲ ਡਰਾਈਵਰ ਲਈ ਡੀਜ਼ਲ, ਖਾਣਾ, ਪਾਰਕਿੰਗ ਤੇ ਆਰਾਮ ਲਈ ਕਿੱਥੇ ਰੁਕਣਾ ਹੈ ਜਾਣਨਾ ਜ਼ਰੂਰੀ ਹੈ। ਇਹ ਹਨ Ontario ਦੇ ਸਭ ਤੋਂ ਵਧੀਆ ਟਰੱਕ ਸਟੌਪ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "What Makes a Good Truck Stop", pa: "ਚੰਗੇ ਟਰੱਕ ਸਟੌਪ ਵਿੱਚ ਕੀ ਹੋਣਾ ਚਾਹੀਦਾ" })}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Fuel className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">{t({ en: "Diesel Availability", pa: "ਡੀਜ਼ਲ ਉਪਲਬਧਤਾ" })}</p>
              <p className="text-xs">{t({ en: "High-speed diesel lanes, DEF fluid, and competitive pricing", pa: "ਹਾਈ-ਸਪੀਡ ਡੀਜ਼ਲ ਲੇਨ, DEF ਫਲੂਇਡ, ਤੇ ਵਾਜਬ ਕੀਮਤ" })}</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">{t({ en: "Truck Parking", pa: "ਟਰੱਕ ਪਾਰਕਿੰਗ" })}</p>
              <p className="text-xs">{t({ en: "Ample, well-lit parking with security cameras", pa: "ਕਾਫ਼ੀ, ਰੌਸ਼ਨੀ ਵਾਲੀ ਪਾਰਕਿੰਗ ਤੇ ਸਿਕਿਓਰਿਟੀ ਕੈਮਰੇ" })}</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Coffee className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">{t({ en: "Food Options", pa: "ਖਾਣੇ ਦੇ ਵਿਕਲਪ" })}</p>
              <p className="text-xs">{t({ en: "Hot meals, dhabas nearby, microwaves for home food", pa: "ਗਰਮ ਖਾਣਾ, ਨੇੜੇ ਢਾਬੇ, ਘਰ ਦਾ ਖਾਣਾ ਗਰਮ ਕਰਨ ਲਈ ਮਾਈਕ੍ਰੋਵੇਵ" })}</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
            <Truck className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">{t({ en: "Truck Services", pa: "ਟਰੱਕ ਸਰਵਿਸ" })}</p>
              <p className="text-xs">{t({ en: "Tire repair, scales, truck wash, mechanic on call", pa: "ਟਾਇਰ ਮੁਰੰਮਤ, ਸਕੇਲ, ਟਰੱਕ ਵਾਸ਼, ਮਕੈਨਿਕ ਦੀ ਸੁਵਿਧਾ" })}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Top Ontario Truck Stops by Highway", pa: "ਹਾਈਵੇ ਅਨੁਸਾਰ Ontario ਦੇ ਟੌਪ ਟਰੱਕ ਸਟੌਪ" })}
        </h2>

        <h3 className="text-lg font-semibold text-foreground">
          {t({ en: "Highway 401 Corridor", pa: "Highway 401 ਕੌਰੀਡੋਰ" })}
        </h3>
        <p>
          {t({
            en: "The 401 is Canada's busiest highway and the main east-west trucking artery. From Windsor to the Quebec border, you need reliable stops for fuel and rest.",
            pa: "401 ਕੈਨੇਡਾ ਦਾ ਸਭ ਤੋਂ ਬਿਜ਼ੀ ਹਾਈਵੇ ਤੇ ਮੁੱਖ ਪੂਰਬ-ਪੱਛਮ ਟਰੱਕਿੰਗ ਰੂਟ ਹੈ। Windsor ਤੋਂ Quebec ਬਾਰਡਰ ਤੱਕ, ਡੀਜ਼ਲ ਤੇ ਆਰਾਮ ਲਈ ਭਰੋਸੇਯੋਗ ਸਟੌਪ ਚਾਹੀਦੇ ਹਨ।",
          })}
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">Flying J / Pilot, {t({ en: "various 401 locations", pa: "401 ਤੇ ਕਈ ਥਾਵਾਂ" })}</strong> &ndash; {t({
                en: "Reliable chain with truck-specific fueling, showers, and parking. Locations near London, Cambridge, and Belleville.",
                pa: "ਭਰੋਸੇਯੋਗ ਚੇਨ ਜਿਸ ਵਿੱਚ ਟਰੱਕ ਫਿਊਲਿੰਗ, ਸ਼ਾਵਰ ਤੇ ਪਾਰਕਿੰਗ। London, Cambridge ਤੇ Belleville ਨੇੜੇ ਲੋਕੇਸ਼ਨ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">ONroute, {t({ en: "across the 401", pa: "401 ਤੇ" })}</strong> &ndash; {t({
                en: "Clean facilities, Tim Hortons, but limited truck parking. Better for quick stops than overnight.",
                pa: "ਸਾਫ਼ ਸੁਵਿਧਾਵਾਂ, Tim Hortons, ਪਰ ਟਰੱਕ ਪਾਰਕਿੰਗ ਘੱਟ। ਰਾਤ ਰੁਕਣ ਨਾਲੋਂ ਛੋਟੇ ਸਟੌਪ ਲਈ ਵਧੀਆ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">Truckworld, Woodstock {t({ en: "area", pa: "ਏਰੀਆ" })}</strong> &ndash; {t({
                en: "Popular with Desi drivers. Good parking, food options nearby, and mechanic services available.",
                pa: "ਦੇਸੀ ਡਰਾਈਵਰਾਂ ਵਿੱਚ ਮਸ਼ਹੂਰ। ਚੰਗੀ ਪਾਰਕਿੰਗ, ਨੇੜੇ ਖਾਣੇ ਦੇ ਵਿਕਲਪ, ਤੇ ਮਕੈਨਿਕ ਸਰਵਿਸ ਉਪਲਬਧ।",
              })}
            </span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">
          {t({ en: "Highway 400 North", pa: "Highway 400 ਉੱਤਰ" })}
        </h3>
        <p>
          {t({
            en: "Running from Toronto to Barrie and beyond, the 400 gets busy with freight heading to Northern Ontario and the Prairies.",
            pa: "Toronto ਤੋਂ Barrie ਤੇ ਅੱਗੇ ਜਾਣ ਵਾਲਾ 400 ਉੱਤਰੀ Ontario ਤੇ Prairies ਜਾਣ ਵਾਲੇ ਮਾਲ ਨਾਲ ਬਿਜ਼ੀ ਰਹਿੰਦਾ ਹੈ।",
          })}
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Barrie-area truck stops", pa: "Barrie ਏਰੀਆ ਟਰੱਕ ਸਟੌਪ" })}</strong> &ndash; {t({
                en: "Several options near the 400/11 split. Good refueling point before the long stretch north.",
                pa: "400/11 ਸਪਲਿਟ ਨੇੜੇ ਕਈ ਵਿਕਲਪ। ਉੱਤਰ ਵੱਲ ਲੰਬੇ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਡੀਜ਼ਲ ਪਾਉਣ ਦੀ ਵਧੀਆ ਥਾਂ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Parry Sound rest areas", pa: "Parry Sound ਰੈਸਟ ਏਰੀਆ" })}</strong> &ndash; {t({
                en: "Limited but available. Plan your HOS carefully north of Barrie. Stops get sparse up there.",
                pa: "ਘੱਟ ਪਰ ਉਪਲਬਧ। Barrie ਤੋਂ ਉੱਤਰ HOS ਧਿਆਨ ਨਾਲ ਪਲਾਨ ਕਰੋ। ਸਟੌਪ ਘੱਟ ਮਿਲਦੇ ਹਨ।",
              })}
            </span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground">
          {t({ en: "GTA / Brampton Area", pa: "GTA / Brampton ਏਰੀਆ" })}
        </h3>
        <p>
          {t({
            en: "The GTA is the hub of Desi trucking in Canada. Brampton alone has over 1,200 trucking companies. Stops here cater to the community with dhabas, Punjabi food, and familiar services.",
            pa: "GTA ਕੈਨੇਡਾ ਵਿੱਚ ਦੇਸੀ ਟਰੱਕਿੰਗ ਦਾ ਕੇਂਦਰ ਹੈ। ਇਕੱਲੇ Brampton ਵਿੱਚ 1,200 ਤੋਂ ਵੱਧ ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ ਹਨ। ਇੱਥੇ ਸਟੌਪ ਕਮਿਊਨਿਟੀ ਲਈ ਢਾਬੇ, ਪੰਜਾਬੀ ਖਾਣਾ ਤੇ ਜਾਣੀਆਂ-ਪਛਾਣੀਆਂ ਸਰਵਿਸ ਦਿੰਦੇ ਹਨ।",
          })}
        </p>

        {truckStops && truckStops.length > 0 && (
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-500" />
              {t({ en: "Top-Rated Truck Stops on DesiRig", pa: "DesiRig ਤੇ ਟੌਪ-ਰੇਟਿਡ ਟਰੱਕ ਸਟੌਪ" })}
            </h3>
            <div className="mt-3 space-y-3">
              {truckStops.map((stop, i) => {
                const city = stop.cities as { slug: string; name: string } | null;
                const cat = stop.categories as { slug: string } | null;
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
                        {stop.google_rating} ({stop.google_review_count} {t({ en: "reviews", pa: "ਰਿਵਿਊ" })})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Tips for Desi Truckers", pa: "ਦੇਸੀ ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਲਈ ਟਿਪਸ" })}
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Coffee className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Carry a hot plate or electric cooker.", pa: "ਹੌਟ ਪਲੇਟ ਜਾਂ ਇਲੈਕਟ੍ਰਿਕ ਕੁੱਕਰ ਰੱਖੋ।" })}</strong>{" "}
              {t({
                en: "Many truck stops have power outlets. A roti and sabzi beats fast food every time.",
                pa: "ਕਈ ਟਰੱਕ ਸਟੌਪ ਤੇ ਪਾਵਰ ਆਊਟਲੈਟ ਹਨ। ਰੋਟੀ-ਸਬਜ਼ੀ ਹਮੇਸ਼ਾ ਫਾਸਟ ਫੂਡ ਤੋਂ ਵਧੀਆ ਹੈ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Know your dhabas.", pa: "ਢਾਬੇ ਪਤਾ ਰੱਖੋ।" })}</strong>{" "}
              {t({
                en: "There are Punjabi dhabas along the 401 near Cambridge, Milton, and Whitby. Ask other drivers for the latest spots.",
                pa: "401 ਤੇ Cambridge, Milton ਤੇ Whitby ਨੇੜੇ ਪੰਜਾਬੀ ਢਾਬੇ ਹਨ। ਨਵੀਆਂ ਥਾਵਾਂ ਬਾਰੇ ਹੋਰ ਡਰਾਈਵਰਾਂ ਤੋਂ ਪੁੱਛੋ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Fuel className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Fuel up in Ontario before crossing into Quebec.", pa: "Quebec ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ Ontario ਵਿੱਚ ਡੀਜ਼ਲ ਪਾ ਲਓ।" })}</strong>{" "}
              {t({
                en: "Diesel prices jump once you cross the border.",
                pa: "ਬਾਰਡਰ ਪਾਰ ਕਰਦੇ ਹੀ ਡੀਜ਼ਲ ਮਹਿੰਗਾ ਹੋ ਜਾਂਦਾ ਹੈ।",
              })}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Truck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            <span>
              <strong className="text-foreground">{t({ en: "Plan your HOS stops.", pa: "HOS ਸਟੌਪ ਪਲਾਨ ਕਰੋ।" })}</strong>{" "}
              {t({
                en: "Download the DesiRig app (coming soon) to find truck-friendly stops along your route.",
                pa: "ਆਪਣੇ ਰੂਟ ਤੇ ਟਰੱਕ-ਫ੍ਰੈਂਡਲੀ ਸਟੌਪ ਲੱਭਣ ਲਈ DesiRig ਐਪ ਡਾਊਨਲੋਡ ਕਰੋ (ਜਲਦੀ ਆ ਰਹੀ)।",
              })}
            </span>
          </li>
        </ul>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-center text-white">
          <MapPin className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">{t({ en: "Find Truck Stops Near You", pa: "ਆਪਣੇ ਨੇੜੇ ਟਰੱਕ ਸਟੌਪ ਲੱਭੋ" })}</h3>
          <p className="mt-1 text-orange-100">
            {t({
              en: "Browse truck stops, mechanics, and tire shops across Ontario.",
              pa: "ਪੂਰੇ Ontario ਵਿੱਚ ਟਰੱਕ ਸਟੌਪ, ਮਕੈਨਿਕ ਤੇ ਟਾਇਰ ਦੁਕਾਨਾਂ ਦੇਖੋ।",
            })}
          </p>
          <Link href="/categories/truck-stop" className="mt-4 inline-block">
            <Button size="lg" className="bg-white text-orange-700 hover:bg-orange-50">
              {t({ en: "Browse Truck Stops", pa: "ਟਰੱਕ ਸਟੌਪ ਦੇਖੋ" })}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
