import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for DesiRig.com — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: March 9, 2026</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3">

        <section>
          <h2>1. Information We Collect</h2>
          <p><strong className="text-foreground">Business Data:</strong> We compile publicly available
            business information from government databases (FMCSA, WSIB Ontario, Statistics Canada),
            search engines, and public directories. This includes business names, addresses, phone
            numbers, and publicly filed government records.</p>
          <p className="mt-2"><strong className="text-foreground">User Data:</strong> When you create an
            account, we collect your email address and display name. When you submit a review, we
            store your review content and rating.</p>
          <p className="mt-2"><strong className="text-foreground">Automatic Data:</strong> We collect
            standard web server logs (IP address, browser type, pages visited) for security and
            analytics purposes.</p>
        </section>

        <section>
          <h2>2. How We Use Information</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>To operate and display the business directory</li>
            <li>To provide search and safety lookup features</li>
            <li>To send transactional emails (account verification, password reset)</li>
            <li>To analyze usage patterns and improve the Service</li>
            <li>To prevent abuse and enforce our Terms of Service</li>
          </ul>
          <p className="mt-2">
            We do <strong className="text-foreground">not</strong> sell personal data to third parties.
            We do <strong className="text-foreground">not</strong> send marketing emails without consent.
          </p>
        </section>

        <section>
          <h2>3. Public Business Information</h2>
          <p>
            Business listings on DesiRig.com are compiled from publicly available sources. Business
            contact information (name, address, phone number) displayed on the site is already part
            of the public record through government filings, Google Places, or the business&apos;s own
            public presence.
          </p>
          <p className="mt-2">
            We do not display business email addresses or personal information of company officers
            on our public pages. Business owners may request corrections or removal by emailing{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>.
          </p>
        </section>

        <section>
          <h2>4. FMCSA Data</h2>
          <p>
            Carrier safety information is sourced from the Federal Motor Carrier Safety
            Administration (FMCSA), a public government database. This data is in the public
            domain and available to anyone at{" "}
            <a href="https://data.transportation.gov" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
              data.transportation.gov
            </a>.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We use industry-standard security measures including encrypted connections (HTTPS),
            secure database hosting (Supabase with row-level security), and access controls.
            However, no system is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            We use essential cookies for authentication and session management. We may use
            analytics cookies to understand how visitors use the site. You can control cookies
            through your browser settings.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Vercel</strong> — hosting and CDN</li>
            <li><strong className="text-foreground">Supabase</strong> — database and authentication</li>
            <li><strong className="text-foreground">Cloudflare</strong> — DNS, CDN, and DDoS protection</li>
            <li><strong className="text-foreground">FMCSA API</strong> — real-time carrier safety data</li>
          </ul>
          <p className="mt-2">Each service has its own privacy policy governing their handling of data.</p>
        </section>

        <section>
          <h2>8. Your Rights</h2>
          <p>Under Canadian privacy law (PIPEDA) and applicable provincial legislation, you have the right to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and personal data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, email{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2>9. Business Owner Rights</h2>
          <p>
            If you are a business owner and want to:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong className="text-foreground">Update your listing</strong> — email us with corrections</li>
            <li><strong className="text-foreground">Remove your listing</strong> — email us and we will remove it within 7 business days</li>
            <li><strong className="text-foreground">Claim your listing</strong> — verify your ownership to manage your profile (coming soon)</li>
            <li><strong className="text-foreground">Remove the &quot;Desi Owned&quot; tag</strong> — email us and we will remove it immediately</li>
          </ul>
          <p className="mt-2">
            Contact:{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>
          </p>
        </section>

        <section>
          <h2>10. Children&apos;s Privacy</h2>
          <p>
            DesiRig.com is not intended for use by children under 13. We do not knowingly
            collect personal information from children.
          </p>
        </section>

        <section>
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected
            by updating the &quot;Last updated&quot; date. Continued use of the Service after changes
            constitutes acceptance.
          </p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>
            For privacy-related questions or requests, contact:{" "}
            <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
              rig@desirig.com
            </a>
          </p>
          <p className="mt-2">DesiRig.com — Guelph, Ontario, Canada</p>
        </section>
      </div>
    </div>
  );
}
