import type { Metadata } from "next";
import { TripPlannerContent } from "./trip-planner-content";

export const metadata: Metadata = {
  title: "Trip Planner & Weather | Free Trucker Tool",
  description:
    "Plan your truck route across Canada with city-by-city weather from Environment Canada. Common routes, estimated drive times, and live weather conditions.",
  openGraph: {
    title: "Trip Planner & Weather | DesiRig",
    description: "Plan your truck route with live weather for every stop along the way.",
  },
};

export default function TripPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "DesiRig Trip Planner & Weather",
            url: "https://desirig.com/tools/trip-planner",
            applicationCategory: "TravelApplication",
            description: "Plan truck routes across Canada with live weather conditions at each stop.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          }),
        }}
      />
      <TripPlannerContent />
    </>
  );
}
