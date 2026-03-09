import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("how-to-check-trucking-company-safety-before-signing")!;

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
        <span className="text-foreground line-clamp-1">Safety Check Guide</span>
      </nav>

      <header>
        <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
          Safety
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
          Every year, hundreds of Desi truckers sign on with companies without
          checking their safety records first. Some of these companies have
          &ldquo;Unsatisfactory&rdquo; ratings, active out-of-service orders, or
          a history of crashes. Don&apos;t be one of those drivers.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Why Safety Records Matter
        </h2>
        <p>
          A company&apos;s safety record tells you how they maintain trucks, how
          many crashes they&apos;ve had, and whether the government considers
          them safe to operate. This isn&apos;t just paperwork — it&apos;s your
          life on the line.
        </p>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Red Flags to Watch For
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span><strong>&ldquo;Conditional&rdquo; or &ldquo;Unsatisfactory&rdquo; safety rating</strong> — means the government found serious problems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span><strong>More power units than drivers</strong> — could mean trucks are poorly maintained or they&apos;re churning drivers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span><strong>Status is &ldquo;Inactive&rdquo; or &ldquo;Not Authorized&rdquo;</strong> — this company can&apos;t legally operate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span><strong>No phone number or physical address</strong> — legitimate carriers always have these on record</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          How to Look Up Any Carrier on DesiRig
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">Get the company&apos;s DOT number</p>
              <p className="text-sm">
                Ask the company directly, or check their truck doors — the DOT
                number is required to be displayed on every commercial vehicle.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">Go to DesiRig Safety Lookup</p>
              <p className="text-sm">
                Visit our{" "}
                <Link href="/safety" className="text-orange-600 hover:underline">
                  Safety Lookup
                </Link>{" "}
                page and enter the DOT number. We pull live data from government
                records so you get the most current information.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-600">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">Check these 4 things</p>
              <p className="text-sm">
                Safety rating, fleet size (drivers vs. power units ratio),
                active status, and physical address.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            What a Good Company Looks Like
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span><strong>&ldquo;Satisfactory&rdquo; safety rating</strong> — the best rating you can get</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span><strong>Balanced driver-to-truck ratio</strong> — roughly 1:1 or more drivers than trucks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span><strong>Active operating authority</strong> — means they&apos;re authorized and in good standing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span><strong>Real physical address</strong> — not a PO box or virtual office</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Talk to Other Drivers
        </h2>
        <p>
          Safety records tell you one side of the story. Talk to current and
          former drivers. Ask about pay, maintenance, and whether the company
          treats drivers fairly. The Desi trucking community is tight — word
          travels fast.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Bottom Line
        </h2>
        <p>
          Checking a company takes 2 minutes. Getting hurt because of a poorly
          maintained truck takes a lifetime. Use the{" "}
          <Link href="/safety" className="text-orange-600 hover:underline">
            DesiRig Safety Lookup
          </Link>{" "}
          before signing anything.
        </p>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-center text-white">
          <Shield className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">Check Any Carrier Now</h3>
          <p className="mt-1 text-green-100">
            Live safety data from government records. Always free.
          </p>
          <Link href="/safety" className="mt-4 inline-block">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50"
            >
              Safety Lookup
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
