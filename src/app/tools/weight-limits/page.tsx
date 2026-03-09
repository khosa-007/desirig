import type { Metadata } from "next";
import { WeightContent } from "./weight-content";

export const metadata: Metadata = {
  title: "Canadian Truck Weight Limits by Province (2026)",
  description:
    "Quick reference for truck axle weight limits across Canadian provinces. Steer axle, tandem, tridem, and gross vehicle weight limits for Ontario, BC, Alberta, Quebec, and more.",
  alternates: {
    canonical: "https://desirig.com/tools/weight-limits",
  },
};

export default function WeightLimitsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the maximum truck weight in Ontario?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The maximum gross vehicle weight in Ontario is 63,500 kg. Steer axle limit is 5,500 kg, single axle is 9,100 kg, tandem axle is 18,000 kg, and tridem is 21,300 kg. Reduced load restrictions apply during spring thaw (March-May).",
        },
      },
      {
        "@type": "Question",
        name: "What are spring weight restrictions in Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most Canadian provinces enforce reduced weight limits during spring thaw, typically March through May. Weights are reduced by 10-25% on many highways to prevent road damage. Check your province's transportation ministry website for exact dates and affected roads.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if my truck is overweight at a scale?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fines for overweight trucks in Canada range from $100 to $20,000+ depending on the province and how much you're overweight. Your truck can be held at the scale until weight is redistributed or removed. Repeated violations can lead to carrier safety rating downgrades.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <WeightContent />
    </>
  );
}
