import type { Metadata } from "next";
import { Truck, Shield, Star, Users, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About DesiRig",
  description:
    "DesiRig.com is built by truckers, for truckers. The most trusted Desi trucking and business platform in Canada.",
};

export default function AboutPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is DesiRig?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DesiRig is the trusted platform for South Asian trucking and community businesses across Canada. We list 38,000+ businesses across 244 cities with real Google ratings and live carrier safety data.",
        },
      },
      {
        "@type": "Question",
        name: "Is DesiRig free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, DesiRig is completely free for drivers and users. We will always be free to search and browse.",
        },
      },
      {
        "@type": "Question",
        name: "How do I add or claim my business on DesiRig?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Email rig@desirig.com with your business name and details. We'll help you claim and update your listing.",
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
      <h1 className="text-3xl font-bold tracking-tight">About DesiRig</h1>

      <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg text-foreground">
          DesiRig is the trusted platform for South Asian trucking and community
          businesses across Canada. Built by a trucker who knows what drivers
          actually need.
        </p>

        <p>
          Finding reliable trucking services shouldn&apos;t be a guessing game.
          Whether you&apos;re looking for a mechanic in Brampton, a driving school in
          Surrey, or checking a carrier&apos;s safety record before you sign on, DesiRig
          has your back.
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">What Makes Us Different</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <Shield className="h-6 w-6 text-green-600" />
            <h3 className="mt-3 font-semibold text-foreground">Real Safety Data</h3>
            <p className="mt-1 text-sm">
              Live safety ratings from official records.
              Always fresh, always accurate. Data you can trust.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <Star className="h-6 w-6 text-orange-500" />
            <h3 className="mt-3 font-semibold text-foreground">Honest Ratings</h3>
            <p className="mt-1 text-sm">
              Google ratings from real customers. No paid placements
              disguised as reviews. What you see is what you get.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <Truck className="h-6 w-6 text-orange-500" />
            <h3 className="mt-3 font-semibold text-foreground">Built for Truckers</h3>
            <p className="mt-1 text-sm">
              Categories that matter: truck mechanics, tire shops, permit
              services, drug testing, ELD suppliers. Not just restaurants.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <Heart className="h-6 w-6 text-red-500" />
            <h3 className="mt-3 font-semibold text-foreground">Community First</h3>
            <p className="mt-1 text-sm">
              From gurdwaras to grocery stores, from dhabas to driving schools.
              Everything the Desi community needs, in one place.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">By the Numbers</h2>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border bg-card p-5">
            <div className="text-2xl font-bold text-foreground">38,000+</div>
            <div className="mt-1 text-sm">Businesses Listed</div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="text-2xl font-bold text-foreground">15,600+</div>
            <div className="mt-1 text-sm">Carriers Tracked</div>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <div className="text-2xl font-bold text-foreground">244</div>
            <div className="mt-1 text-sm">Canadian Cities</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">Our Mission</h2>

        <p>
          Every Desi trucker deserves trusted information. Which companies are
          safe to drive for. Which mechanics won&apos;t rip you off. Where to find a
          good dhaba on the road. DesiRig is free for drivers and always will be.
        </p>

        <p>
          We&apos;re based in Ontario, Canada. Got feedback?{" "}
          <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
            rig@desirig.com
          </a>
        </p>
      </div>
    </div>
  );
}
