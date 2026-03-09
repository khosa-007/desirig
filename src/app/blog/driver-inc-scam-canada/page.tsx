import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, AlertTriangle, CheckCircle, Shield, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/blog";

const post = getBlogPost("driver-inc-scam-canada")!;

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
        <span className="text-foreground line-clamp-1">Driver Inc. Scam</span>
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
          &ldquo;Driver Inc.&rdquo; is the biggest scam in Canadian trucking right now. Thousands
          of Desi truckers are being classified as &ldquo;independent contractors&rdquo; through
          numbered companies — when they&apos;re really employees. Here&apos;s what you need
          to know to protect yourself.
        </p>

        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
          <h2 className="font-semibold text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            What Is the Driver Inc. Scam?
          </h2>
          <p className="mt-2 text-sm text-red-700">
            A trucking company tells you to incorporate a numbered company (like
            &ldquo;1234567 Ontario Inc.&rdquo;). They pay your company instead of
            paying you as an employee. This lets them avoid paying CPP, EI, WSIB,
            vacation pay, and overtime. <strong>You lose all worker protections.</strong>
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          How the Scam Works — Step by Step
        </h2>
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
              1
            </div>
            <div>
              <p className="font-medium text-foreground">Company says &ldquo;incorporate to get paid more&rdquo;</p>
              <p className="text-sm">
                They promise higher per-mile rates because there are &ldquo;no deductions.&rdquo;
                This sounds good — until you realize what you&apos;re losing.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
              2
            </div>
            <div>
              <p className="font-medium text-foreground">You incorporate a numbered company</p>
              <p className="text-sm">
                A paralegal or accountant (often recommended by the trucking company)
                sets up a numbered Ontario Inc. for you. Costs $500-$1,000.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
              3
            </div>
            <div>
              <p className="font-medium text-foreground">You drive their truck, follow their rules — but you&apos;re &ldquo;not an employee&rdquo;</p>
              <p className="text-sm">
                You drive their equipment, follow their dispatch, wear their uniform —
                but on paper, your corporation is an &ldquo;independent contractor.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
              4
            </div>
            <div>
              <p className="font-medium text-foreground">You lose everything employees get</p>
              <p className="text-sm">
                No CPP contributions (smaller pension), no EI (no safety net if laid off),
                no WSIB (no coverage if injured on the job), no vacation pay, no overtime.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          What You Lose as &ldquo;Driver Inc.&rdquo;
        </h2>
        <div className="rounded-xl border bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">CPP contributions</strong>
                <p>~$3,800/yr in lost pension credits</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">EI benefits</strong>
                <p>No unemployment insurance if you lose your job</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">WSIB coverage</strong>
                <p>No workplace injury coverage — one accident could bankrupt you</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">Vacation pay (4%)</strong>
                <p>~$2,000-$3,000/yr you&apos;re not getting</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">Overtime pay</strong>
                <p>No 1.5x after standard hours</p>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <DollarSign className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <strong className="text-foreground">Accounting costs</strong>
                <p>$1,500-$3,000/yr for corporate tax filing</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-red-600">
            Total loss: $10,000-$15,000+ per year compared to being a regular employee.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          How to Protect Yourself
        </h2>
        <div className="rounded-xl border bg-card p-5">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span><strong className="text-foreground">Ask if they hire employees.</strong> Legitimate companies hire you on payroll with T4 slips, not through a numbered company.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span><strong className="text-foreground">Check their safety record.</strong> Use our <Link href="/safety" className="text-orange-600 hover:underline">Safety Lookup</Link> to verify the company before signing anything.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span><strong className="text-foreground">Talk to current drivers.</strong> Ask if they&apos;re on payroll or through a numbered company. The Desi trucking community talks — use that network.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span><strong className="text-foreground">Never let the company choose your accountant.</strong> If the company is setting up your corporation and choosing who does your books, that&apos;s a red flag.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span><strong className="text-foreground">Know the CRA test.</strong> If you drive their truck, follow their schedule, and can&apos;t work for anyone else — you&apos;re an employee, regardless of what the contract says.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          The Government Is Cracking Down
        </h2>
        <p>
          The CRA and Ontario Ministry of Labour are actively investigating Driver Inc.
          schemes. Companies caught misclassifying workers face penalties, and drivers
          may be reassessed for back taxes. The federal government has called it
          &ldquo;the single biggest issue in Canadian trucking.&rdquo;
        </p>

        <p>
          If you&apos;re currently working through a numbered company but feel like an employee,
          you can file a complaint with the CRA or your provincial employment standards office.
          You may be entitled to back pay for CPP, EI, and vacation.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          Bottom Line
        </h2>
        <p>
          If a company tells you to incorporate, walk away. Legitimate carriers hire
          employees on payroll. The &ldquo;higher rate&rdquo; they promise doesn&apos;t
          cover what you lose in benefits, protections, and pension. Check any
          company&apos;s record on DesiRig before signing anything.
        </p>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-center text-white">
          <Shield className="mx-auto h-8 w-8" />
          <h3 className="mt-3 text-xl font-bold">Check Any Carrier&apos;s Record</h3>
          <p className="mt-1 text-green-100">
            Look up safety ratings, fleet size, and driver count before signing on.
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
