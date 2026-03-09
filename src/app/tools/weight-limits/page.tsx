import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Canadian Truck Weight Limits by Province (2026)",
  description:
    "Quick reference for truck axle weight limits across Canadian provinces. Steer axle, tandem, tridem, and gross vehicle weight limits for Ontario, BC, Alberta, Quebec, and more.",
  alternates: {
    canonical: "https://desirig.com/tools/weight-limits",
  },
};

const provinces = [
  {
    name: "Ontario",
    gross: "63,500 kg",
    steer: "5,500 kg",
    single: "9,100 kg",
    tandem: "18,000 kg",
    tridem: "21,300 kg",
    notes: "Reduced load (half-load) restrictions apply March-May on many highways.",
  },
  {
    name: "Quebec",
    gross: "62,500 kg",
    steer: "6,000 kg",
    single: "10,000 kg",
    tandem: "18,000 kg",
    tridem: "24,000 kg",
    notes: "Spring thaw weight restrictions typically March 1 to May 31.",
  },
  {
    name: "British Columbia",
    gross: "63,500 kg",
    steer: "5,500 kg",
    single: "9,100 kg",
    tandem: "17,000 kg",
    tridem: "24,000 kg",
    notes: "Mountain highways may have additional restrictions. Check DriveBC.",
  },
  {
    name: "Alberta",
    gross: "63,500 kg",
    steer: "5,500 kg",
    single: "9,100 kg",
    tandem: "17,000 kg",
    tridem: "21,000 kg",
    notes: "Weight varies by road classification. Primary highways are highest.",
  },
  {
    name: "Saskatchewan",
    gross: "62,500 kg",
    steer: "5,500 kg",
    single: "9,100 kg",
    tandem: "17,000 kg",
    tridem: "21,000 kg",
    notes: "Spring road ban reduces weights by 10-25% depending on road class.",
  },
  {
    name: "Manitoba",
    gross: "62,500 kg",
    steer: "5,500 kg",
    single: "9,100 kg",
    tandem: "17,000 kg",
    tridem: "21,000 kg",
    notes: "Spring weight restrictions usually mid-March to end of May.",
  },
];

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
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Weight Limits</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Scale className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          Canadian Truck Weight Limits by Province
        </h1>
        <p className="mt-2 text-muted-foreground">
          Quick reference for axle weights and gross vehicle weight limits. Updated for 2026.
        </p>
      </div>

      <div className="mt-8 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> These are general reference values. Actual limits vary by
            road classification, axle spacing, tire type, and seasonal restrictions.
            Always verify with your provincial transportation ministry before loading.
          </p>
        </div>
      </div>

      {/* Weight table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-4 py-3 text-left font-semibold">Province</th>
              <th className="px-4 py-3 text-right font-semibold">Gross</th>
              <th className="px-4 py-3 text-right font-semibold">Steer</th>
              <th className="px-4 py-3 text-right font-semibold">Single</th>
              <th className="px-4 py-3 text-right font-semibold">Tandem</th>
              <th className="px-4 py-3 text-right font-semibold">Tridem</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map((p) => (
              <tr key={p.name} className="border-b hover:bg-muted/20">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-right">{p.gross}</td>
                <td className="px-4 py-3 text-right">{p.steer}</td>
                <td className="px-4 py-3 text-right">{p.single}</td>
                <td className="px-4 py-3 text-right">{p.tandem}</td>
                <td className="px-4 py-3 text-right">{p.tridem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Province details */}
      <div className="mt-8 space-y-4">
        {provinces.map((p) => (
          <div key={p.name} className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold text-foreground">{p.name}</h2>
            <div className="mt-2 grid grid-cols-5 gap-2 text-center text-xs">
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.gross}</div>
                <div className="text-muted-foreground">Gross</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.steer}</div>
                <div className="text-muted-foreground">Steer</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.single}</div>
                <div className="text-muted-foreground">Single</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.tandem}</div>
                <div className="text-muted-foreground">Tandem</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-2">
                <div className="font-bold text-foreground">{p.tridem}</div>
                <div className="text-muted-foreground">Tridem</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{p.notes}</p>
          </div>
        ))}
      </div>

      {/* FAQ section */}
      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Common Questions</h2>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">What happens if I&apos;m overweight at the scale?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Fines range from $100 to $20,000+ depending on the province and how much
            you&apos;re over. Your truck will be held at the scale until the load is
            redistributed or removed. Repeated violations affect your carrier&apos;s
            safety rating.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">What are spring weight restrictions?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Most provinces reduce weight limits by 10-25% during spring thaw
            (typically March to May). This protects roads from damage when the ground
            is soft. Dates vary by region — check your province&apos;s transportation
            website.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground">How do I slide tandems to redistribute weight?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sliding tandems forward moves weight to the drive axles; sliding back
            moves weight to the trailer tandems. Each hole on the slider rail shifts
            approximately 200-400 lbs (90-180 kg). Always re-scale after adjusting.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          About This Reference
        </h2>
        <p>
          This page provides a general reference for truck weight limits across major
          Canadian provinces. Weight limits depend on many factors including road class,
          axle spacing, tire type, number of tires, and seasonal restrictions. This guide
          covers the most common configurations for Class 8 tractor-trailers. For the most
          accurate limits for your specific vehicle and route, consult your provincial
          transportation ministry.
        </p>
      </div>
    </div>
  );
}
