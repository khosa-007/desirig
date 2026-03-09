import type { Metadata } from "next";
import { HosContent } from "./hos-content";

export const metadata: Metadata = {
  title: "Hours of Service (HOS) Rules — Canada Quick Reference",
  description:
    "Canadian Hours of Service rules explained simply. Driving limits, mandatory rest periods, cycle options, and reset rules for truck drivers.",
  alternates: {
    canonical: "https://desirig.com/tools/hos-calculator",
  },
};

export default function HosCalculatorPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many hours can a truck driver drive in Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under Canadian HOS rules, a driver can drive a maximum of 13 hours in a day, within a 14-hour on-duty window. After 13 hours of driving or 14 hours on-duty, the driver must take at least 8 consecutive hours off-duty.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between Cycle 1 and Cycle 2 in Canadian HOS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cycle 1 allows 70 hours on-duty in 7 days. Cycle 2 allows 120 hours on-duty in 14 days. Cycle 1 resets with 36 consecutive hours off-duty. Cycle 2 resets with 72 consecutive hours off-duty. Most long-haul drivers use Cycle 1.",
        },
      },
      {
        "@type": "Question",
        name: "What happens if I violate HOS rules in Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HOS violations can result in fines from $200 to $5,000+ per violation, out-of-service orders (you can't drive until compliant), and negative marks on both the driver's and carrier's safety record. Repeated violations can lead to licence suspension.",
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
      <HosContent />
    </>
  );
}
