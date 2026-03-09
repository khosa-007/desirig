import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for DesiRig.com — Desi Trucking & Business Directory.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 9, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using DesiRig.com (&quot;the Service&quot;), you agree to be bound by these
            Terms of Service. If you do not agree, do not use the Service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            DesiRig.com is an online directory that aggregates publicly available business
            information, including but not limited to business names, addresses, phone numbers,
            and government safety records. We do not provide professional advice of any kind.
          </p>
        </section>

        <section>
          <h2>3. Data Sources and Accuracy</h2>
          <p>
            Business listings are compiled from publicly available sources including Google Places,
            the Federal Motor Carrier Safety Administration (FMCSA), WSIB Ontario open data, and
            other government databases. All data is provided under applicable open data licenses.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">We make no guarantees about the accuracy, completeness, or
            timeliness of any information on this site.</strong> While we strive to keep data current,
            business details change frequently. Always verify critical information (safety ratings,
            licensing status, contact details) directly with the business or the relevant government
            agency before making any decisions.
          </p>
        </section>

        <section>
          <h2>4. FMCSA Safety Data Disclaimer</h2>
          <p>
            Safety ratings and carrier information displayed on DesiRig.com are sourced from FMCSA
            public records. This data is provided for informational purposes only and should not be
            the sole basis for any business, employment, or safety decisions. For official and
            authoritative safety records, visit{" "}
            <a href="https://ai.fmcsa.dot.gov" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
              ai.fmcsa.dot.gov
            </a>.
          </p>
        </section>

        <section>
          <h2>5. No Professional Advice</h2>
          <p>
            Nothing on DesiRig.com constitutes legal, financial, insurance, medical, or professional
            advice. We are a directory service. Consult qualified professionals for specific advice
            relating to your situation.
          </p>
        </section>

        <section>
          <h2>6. Business Listings</h2>
          <p>
            Businesses listed on DesiRig.com are compiled from publicly available data sources.
            Listing on this directory does not imply endorsement, verification, or affiliation
            with DesiRig.com unless explicitly marked as &quot;DesiRig Verified.&quot;
          </p>
          <p className="mt-2">
            Business owners may request corrections or removal of their listing by contacting us
            at{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>. We will process removal requests within 7 business days.
          </p>
        </section>

        <section>
          <h2>7. &quot;Desi Owned&quot; Designation</h2>
          <p>
            The &quot;Desi Owned&quot; label is applied using automated name-matching algorithms against
            a list of South Asian surnames. This is an approximation and may contain errors —
            both false positives and false negatives. Business owners may request addition or
            removal of this designation by contacting us.
          </p>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DesiRig.com and its operators shall not be
            liable for any direct, indirect, incidental, consequential, or punitive damages
            arising from your use of the Service or reliance on any information provided.
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
          </p>
        </section>

        <section>
          <h2>9. User Conduct</h2>
          <p>
            You agree not to: (a) scrape, copy, or bulk-download data from the Service;
            (b) use the Service for spam, harassment, or unsolicited commercial messages;
            (c) attempt to circumvent any security or access controls;
            (d) misrepresent your identity or affiliation with any business.
          </p>
        </section>

        <section>
          <h2>10. Intellectual Property</h2>
          <p>
            The design, layout, and original content of DesiRig.com are the property of
            DesiRig. Government data (FMCSA, WSIB, StatCan) remains in the public domain
            under their respective licenses.
          </p>
        </section>

        <section>
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the
            Service after changes constitutes acceptance. Material changes will be noted
            by updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Province of Ontario, Canada.
            Any disputes shall be resolved in the courts of Ontario.
          </p>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
