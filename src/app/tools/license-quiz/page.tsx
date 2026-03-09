import type { Metadata } from "next";
import { LicenseQuizContent } from "./quiz-content";

export const metadata: Metadata = {
  title: "Truck License Exam Practice Quiz — English & Punjabi",
  description:
    "Practice for your Ontario Class A/D truck driving knowledge test. Questions in English and Punjabi (ਪੰਜਾਬੀ). Free, no sign-up required.",
  alternates: {
    canonical: "https://desirig.com/tools/license-quiz",
  },
};

export default function LicenseQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Truck License Exam Practice Quiz",
            url: "https://desirig.com/tools/license-quiz",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
          }),
        }}
      />
      <LicenseQuizContent />
    </>
  );
}
