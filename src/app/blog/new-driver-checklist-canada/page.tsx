import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("new-driver-checklist-canada")!;

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

export default function BlogPost() {
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
        <span className="text-foreground line-clamp-1">New Driver Checklist</span>
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

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          Moving to Canada and want to drive truck? Already here with a G
          license and want to upgrade? Here&apos;s everything you need,
          step by step. No fluff.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Step 1: Get Your AZ/Class 1 License
        </h2>
        <div className="space-y-2">
          <Item>Find a driving school — check our{" "}
            <Link href="/brampton-on/driving-school" className="text-orange-600 hover:underline">
              Brampton driving schools
            </Link>
            {" "}or{" "}
            <Link href="/surrey-bc/driving-school" className="text-orange-600 hover:underline">
              Surrey driving schools
            </Link>
          </Item>
          <Item>Get a medical exam (need a doctor&apos;s clearance)</Item>
          <Item>Pass the written knowledge test at a DriveTest centre</Item>
          <Item>Complete mandatory training (MELT in Ontario, MELT in Alberta, etc.)</Item>
          <Item>Pass the road test with air brake endorsement</Item>
          <Item>Budget: $5,000 — $10,000 for driving school (shop around)</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Step 2: Get Your Medical & Drug Test
        </h2>
        <div className="space-y-2">
          <Item>DOT medical exam — find a{" "}
            <Link href="/brampton-on/medical-exam-clinic" className="text-orange-600 hover:underline">
              medical exam clinic
            </Link>
          </Item>
          <Item>Pre-employment drug and alcohol test — find a{" "}
            <Link href="/brampton-on/drug-alcohol-testing" className="text-orange-600 hover:underline">
              testing centre
            </Link>
          </Item>
          <Item>FAST card application (optional but helpful for cross-border)</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Step 3: Choose the Right Company
        </h2>
        <p>
          This is where most new drivers make mistakes. Don&apos;t just sign
          with the first company that offers you a job.
        </p>
        <div className="space-y-2">
          <Item>Check safety records on{" "}
            <Link href="/safety" className="text-orange-600 hover:underline">
              DesiRig Safety Lookup
            </Link>
          </Item>
          <Item>Ask about pay structure — per mile, per load, or hourly</Item>
          <Item>Ask about truck maintenance — who pays for repairs?</Item>
          <Item>Talk to current drivers (not just the recruiter)</Item>
          <Item>Read the contract carefully — especially termination clauses</Item>
          <Item>Avoid companies that want you to &ldquo;lease&rdquo; a truck with them immediately</Item>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-900">
            Warning: Driver Inc. Scams
          </h3>
          <p className="mt-2 text-sm text-red-700">
            Some companies will ask you to incorporate and work as an
            &ldquo;independent contractor&rdquo; even though you&apos;re really
            an employee. This is called &ldquo;Driver Inc.&rdquo; and it&apos;s
            illegal in many provinces. You lose EI, CPP, and workers comp
            protections. If they ask you to incorporate to get a job — run.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Step 4: Essential Gear
        </h2>
        <div className="space-y-2">
          <Item>Steel-toe boots (mandatory at most shippers/receivers)</Item>
          <Item>Hi-vis vest</Item>
          <Item>Work gloves</Item>
          <Item>Flashlight (headlamp is even better)</Item>
          <Item>Tire pressure gauge</Item>
          <Item>Logbook or ELD knowledge</Item>
          <Item>GPS (truck-specific, NOT regular car GPS)</Item>
          <Item>Good cooler and water bottles for the road</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Step 5: Know the Rules
        </h2>
        <div className="space-y-2">
          <Item>Hours of Service (HOS) — 13 hours driving, 14 hours on-duty max</Item>
          <Item>Pre-trip and post-trip inspections — do them, every time</Item>
          <Item>Weight limits — 80,000 lbs gross in most provinces</Item>
          <Item>Air brake check procedures — you WILL be tested at scales</Item>
          <Item>Chain laws in winter (BC, Alberta especially)</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          You&apos;re Ready
        </h2>
        <p>
          Trucking is hard work but it pays well. The Desi trucking community in
          Canada is strong — lean on it. Use DesiRig to find companies,
          mechanics, and services you can trust.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/brampton-on/trucking-company">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Find Trucking Companies
            </Button>
          </Link>
          <Link href="/safety">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Safety Lookup
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
      <span className="text-sm">{children}</span>
    </div>
  );
}
