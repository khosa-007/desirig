import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about DesiRig, Canada's trusted Desi trucking and business directory. Safety lookups, business listings, and more.",
  alternates: {
    canonical: "https://desirig.com/faq",
  },
};

const faqs = [
  {
    q: "What is DesiRig?",
    a: "DesiRig is the trusted directory for South Asian trucking and community businesses across Canada. We list 38,000+ businesses across 244 cities with real Google ratings and live carrier safety data.",
  },
  {
    q: "Is DesiRig free to use?",
    a: "Yes, DesiRig is completely free for drivers and users. Searching, browsing, and looking up carrier safety records will always be free.",
  },
  {
    q: "How do I look up a trucking company's safety record?",
    a: "Go to our Safety Lookup page and enter the company's DOT number or name. You'll see their safety rating, fleet size, driver count, and more.",
  },
  {
    q: "What does a 'Satisfactory' safety rating mean?",
    a: "A 'Satisfactory' rating is the best safety rating a carrier can receive. It means the company has passed federal safety audits and meets all required safety standards. 'Conditional' means issues were found, and 'Unsatisfactory' means the carrier failed safety requirements.",
  },
  {
    q: "How do I add my business to DesiRig?",
    a: "Email rig@desirig.com with your business name, address, phone number, and category. We'll add your listing within a few business days.",
  },
  {
    q: "How do I claim or update my listing?",
    a: "Email rig@desirig.com with your business name and the changes you'd like to make. We verify business ownership before making updates.",
  },
  {
    q: "How do I remove my business from DesiRig?",
    a: "Email rig@desirig.com with your business name and a request for removal. Removal requests are processed within 7 business days.",
  },
  {
    q: "Where does DesiRig get its data?",
    a: "We collect business info from public sources and user submissions. Safety data comes from official government records. Google ratings come directly from Google.",
  },
  {
    q: "Can I look up US trucking companies?",
    a: "Yes. Enter any US DOT number in our Safety Lookup and you'll get the carrier's safety info right away.",
  },
  {
    q: "What is Driver Inc. and why should I care?",
    a: "Driver Inc. is a scheme where trucking companies misclassify employees as independent contractors through numbered companies. This means you lose CPP, EI, WSIB, vacation pay, and overtime protections. Always ask if a company hires on payroll before signing on.",
  },
  {
    q: "How many businesses does DesiRig list?",
    a: "We currently list over 38,000 businesses across 244 Canadian cities in 84 categories, from trucking companies and mechanics to grocery stores and gurdwaras.",
  },
  {
    q: "Does DesiRig have a mobile app?",
    a: "Not yet, but our website works great on mobile. You can add DesiRig to your home screen on iPhone or Android for quick access. A dedicated app is planned for the future.",
  },
  {
    q: "How do I report incorrect information?",
    a: "On any business page, click 'Report incorrect info' at the bottom of the sidebar, or email rig@desirig.com with the business name and the correction.",
  },
  {
    q: "Is DesiRig only for Desi/South Asian businesses?",
    a: "We list all businesses in our categories, not just South Asian ones. However, we put extra effort into highlighting Desi-owned businesses and services that cater to the South Asian community.",
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
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
        <span className="text-foreground">FAQ</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-muted-foreground">
        Everything you need to know about DesiRig.
      </p>

      <div className="mt-8 space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <h2 className="font-semibold text-foreground">{faq.q}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-muted/40 p-6 text-center">
        <h2 className="font-semibold text-foreground">Still have questions?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Email us at{" "}
          <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
            rig@desirig.com
          </a>{" "}
          and we&apos;ll get back to you within 2 business days.
        </p>
      </div>
    </div>
  );
}
