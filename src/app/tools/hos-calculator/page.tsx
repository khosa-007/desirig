import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, AlertTriangle, CheckCircle } from "lucide-react";

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
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">Tools</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">Hours of Service</span>
      </nav>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
          <Clock className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          Canadian Hours of Service (HOS) — Quick Reference
        </h1>
        <p className="mt-2 text-muted-foreground">
          Know your limits. A clear, simple breakdown of Canadian HOS rules.
        </p>
      </div>

      {/* Daily limits */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Daily Driving Limits</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-orange-600">13 hrs</div>
            <div className="mt-1 text-sm font-medium">Maximum Driving Time</div>
            <p className="mt-2 text-xs text-muted-foreground">
              After 13 hours of driving, you must stop driving.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-blue-600">14 hrs</div>
            <div className="mt-1 text-sm font-medium">Maximum On-Duty Window</div>
            <p className="mt-2 text-xs text-muted-foreground">
              After 14 hours on-duty (driving + other work), you must stop all work.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-green-600">8 hrs</div>
            <div className="mt-1 text-sm font-medium">Mandatory Off-Duty</div>
            <p className="mt-2 text-xs text-muted-foreground">
              Must take at least 8 consecutive hours off before driving again.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5 text-center">
            <div className="text-3xl font-bold text-purple-600">10 hrs</div>
            <div className="mt-1 text-sm font-medium">Total Off-Duty Required</div>
            <p className="mt-2 text-xs text-muted-foreground">
              Must have at least 10 hours off-duty in each 24-hour period.
            </p>
          </div>
        </div>
      </div>

      {/* Cycle options */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Cycle Options</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-orange-200 bg-card p-5">
            <h3 className="font-bold text-orange-600">Cycle 1 (Most Common)</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
                <span><strong>70 hours</strong> on-duty in <strong>7 days</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-orange-500 shrink-0" />
                <span>Reset: <strong>36 consecutive hours</strong> off-duty</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                <span>Best for: most long-haul drivers</span>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="font-bold text-blue-600">Cycle 2</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                <span><strong>120 hours</strong> on-duty in <strong>14 days</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
                <span>Reset: <strong>72 consecutive hours</strong> off-duty</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                <span>Best for: team drivers, multi-week trips</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mandatory rest */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">Mandatory Rest Breaks</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">24-Hour Rule</p>
                <p className="text-sm text-muted-foreground">
                  Must take at least 24 consecutive hours off-duty every 14 days
                  (under either cycle).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Sleeper Berth Split</p>
                <p className="text-sm text-muted-foreground">
                  You can split your 10 hours off-duty into two periods: one must be at
                  least 2 hours (in sleeper berth), and the other must be at least 8 hours
                  (in sleeper berth). Neither period counts against your 14-hour window.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Deferral (Day 1 / Day 2)</p>
                <p className="text-sm text-muted-foreground">
                  You can defer up to 2 hours of off-duty from Day 1 to Day 2,
                  effectively driving up to 15 hours in one day — but you must make it
                  up the next day with 2 extra hours off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Violations */}
      <div className="mt-10">
        <h2 className="text-xl font-bold tracking-tight">What Happens If You Violate HOS?</h2>
        <div className="mt-4 rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm text-red-800">
              <p>
                <strong>Fines:</strong> $200 to $5,000+ per violation, depending on province
                and severity.
              </p>
              <p>
                <strong>Out-of-service (OOS) order:</strong> You cannot drive until you&apos;re
                back in compliance. This means sitting at a truck stop until your hours
                reset.
              </p>
              <p>
                <strong>Safety record impact:</strong> Violations go on both your record
                and your carrier&apos;s record. Too many violations = lower safety rating
                = higher insurance = possible shutdown.
              </p>
              <p>
                <strong>ELD enforcement:</strong> Electronic logging devices make it nearly
                impossible to fake logs. Officers can see violations instantly during an
                inspection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip box */}
      <div className="mt-10 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <h2 className="text-xl font-bold">Pro Tips for Managing Your Hours</h2>
        <ul className="mt-3 space-y-2 text-sm text-orange-100">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>Plan your trip with stops BEFORE you start driving. Know where you&apos;ll park tonight.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>Use the deferral option wisely — save it for days when loading/unloading eats your clock.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>Take your 36-hour reset over a weekend when freight is slower anyway.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
            <span>Never let a dispatcher push you to drive tired. Your licence, your responsibility.</span>
          </li>
        </ul>
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          About This Reference
        </h2>
        <p>
          This page covers federal Canadian Hours of Service (HOS) rules as defined under
          the Commercial Vehicle Drivers Hours of Service Regulations (SOR/2005-313).
          Provincial variations may apply. This is a simplified reference — for the
          complete regulations, consult the official Transport Canada documentation.
          Always follow the most restrictive applicable rule.
        </p>
      </div>
    </div>
  );
}
