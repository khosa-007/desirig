import type { Metadata } from "next";
import { BorderTimesContent } from "./border-times-content";

export const metadata: Metadata = {
  title: "CBSA Border Wait Times | Live Commercial & Traveller Delays",
  description:
    "Live border wait times at all Canada-US crossings. Commercial vehicle and traveller delays updated every 5 minutes from CBSA. Free tool for Canadian truckers.",
  openGraph: {
    title: "CBSA Border Wait Times | DesiRig",
    description:
      "Live commercial and traveller wait times at Canada-US border crossings. Updated every 5 minutes.",
  },
};

export default function BorderTimesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "CBSA Border Wait Times",
            url: "https://desirig.com/tools/border-times",
            applicationCategory: "UtilityApplication",
            description:
              "Live border wait times at all Canada-US crossings for commercial vehicles and travellers.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          }),
        }}
      />
      <BorderTimesContent />
    </>
  );
}
