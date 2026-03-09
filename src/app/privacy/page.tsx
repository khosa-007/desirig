import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for DesiRig.com",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Effective Date: March 9, 2026 | Last Modified: March 9, 2026
      </p>

      <div className="mt-8 space-y-6 text-xs leading-relaxed text-muted-foreground [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:mt-8 [&_h2]:mb-2">

        <p>
          This Privacy Policy (&quot;Policy&quot;) describes how DesiRig (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;,
          or &quot;our&quot;) collects, uses, discloses, and protects information in connection with
          the website located at desirig.com (the &quot;Service&quot;). This Policy applies to all
          users of the Service, including visitors, registered users, and listed business
          entities. By accessing or using the Service, you consent to the data practices
          described in this Policy. If you do not agree, you must discontinue use of the
          Service immediately.
        </p>

        <h2>1. INFORMATION WE COLLECT</h2>
        <p>
          1.1 <strong className="text-foreground">Business and Entity Information.</strong> We compile
          and aggregate publicly available business information from government databases, public
          registries, regulatory filings, open data portals, and other publicly accessible
          sources. This information may include, without limitation: business names, trade names,
          registered addresses, publicly listed telephone numbers, regulatory identifiers, safety
          records, fleet information, operational status, and other data filed with or published
          by government agencies. Such information is already part of the public record prior to
          its inclusion on the Service.
        </p>
        <p>
          1.2 <strong className="text-foreground">User Account Information.</strong> When you create
          an account on the Service, we collect your email address, display name, and any
          additional profile information you voluntarily provide. We may also collect
          authentication credentials issued by third-party identity providers if you choose
          to authenticate via such services.
        </p>
        <p>
          1.3 <strong className="text-foreground">User-Generated Content.</strong> If you submit
          reviews, ratings, corrections, or other content through the Service, we collect and
          store such content along with associated metadata (submission date, account identifier,
          IP address).
        </p>
        <p>
          1.4 <strong className="text-foreground">Automatically Collected Information.</strong> We
          automatically collect certain technical information when you access the Service,
          including: IP address, browser type and version, device type, operating system,
          referring URL, pages visited, time and duration of visits, and other standard web
          server log data. We may also use cookies, web beacons, pixel tags, and similar
          tracking technologies to collect usage information and facilitate core Service
          functionality.
        </p>

        <h2>2. HOW WE USE INFORMATION</h2>
        <p>
          2.1 We use information collected through the Service for the following purposes:
          (a) to operate, maintain, and improve the Service; (b) to compile, organize, and
          display business directory listings; (c) to provide search, filtering, and safety
          lookup functionality; (d) to process account registration and manage user accounts;
          (e) to send transactional communications (account verification, password resets,
          service notifications); (f) to analyze usage patterns, diagnose technical issues,
          and optimize Service performance; (g) to detect, prevent, and address fraud, abuse,
          security incidents, and violations of our Terms of Service; (h) to comply with
          applicable legal obligations, regulatory requirements, and lawful government requests;
          and (i) to enforce our Terms of Service and protect the rights, property, and safety
          of the Company, our users, and the public.
        </p>
        <p>
          2.2 We do NOT sell, rent, lease, or otherwise commercially transfer personal
          information to third parties for their direct marketing purposes. We do NOT send
          unsolicited marketing communications without explicit prior consent.
        </p>

        <h2>3. PUBLICLY AVAILABLE BUSINESS INFORMATION</h2>
        <p>
          3.1 Business listings displayed on the Service are derived from publicly available
          sources. Business contact information (names, addresses, telephone numbers) displayed
          on the Service is already part of the public record through government filings,
          regulatory databases, or the business&apos;s own public presence. The Company does not
          display non-public personal information (such as personal email addresses or home
          addresses of individuals) on public-facing pages of the Service.
        </p>
        <p>
          3.2 The Company may maintain additional information about Listed Entities in internal
          databases for the purposes of data quality management, deduplication, enrichment, and
          classification. Such internal data is not displayed publicly and is subject to the
          security measures described in Section 6 of this Policy.
        </p>
        <p>
          3.3 The Company employs automated algorithmic methods to apply community-related
          classifications to Listed Entities. These classifications are probabilistic
          approximations and do not constitute verified statements of fact. Listed Entities
          may request modification or removal of such classifications by contacting the Company.
        </p>

        <h2>4. INFORMATION SHARING AND DISCLOSURE</h2>
        <p>
          4.1 We may share information in the following limited circumstances: (a) with service
          providers and processors who assist in operating the Service, subject to contractual
          obligations of confidentiality and data protection; (b) in response to lawful requests
          by public authorities, including to meet national security, law enforcement, or
          regulatory requirements; (c) to protect and defend the rights, property, or safety
          of the Company, our users, or the public; (d) in connection with a merger, acquisition,
          reorganization, or sale of assets, in which case the acquiring entity will be bound
          by this Policy with respect to previously collected data; or (e) with your explicit
          consent.
        </p>
        <p>
          4.2 We may disclose aggregated, anonymized, or de-identified data that cannot
          reasonably be used to identify any individual or specific business entity, without
          restriction.
        </p>

        <h2>5. DATA RETENTION</h2>
        <p>
          5.1 We retain personal information for as long as reasonably necessary to fulfill
          the purposes for which it was collected, to comply with legal obligations, to resolve
          disputes, and to enforce our agreements. Business listing information derived from
          public sources may be retained indefinitely as part of the Company&apos;s proprietary
          database, subject to removal requests as described in Section 8.
        </p>
        <p>
          5.2 Upon deletion of a user account, we will delete or anonymize personal account
          information within thirty (30) days, except where retention is required by law or
          for legitimate business purposes (such as maintaining audit logs or resolving disputes).
        </p>

        <h2>6. DATA SECURITY</h2>
        <p>
          6.1 We implement industry-standard administrative, technical, and physical safeguards
          designed to protect information against unauthorized access, alteration, disclosure,
          or destruction. These measures include, without limitation: encrypted data transmission
          (TLS/HTTPS), database-level access controls and row-level security policies, secure
          hosting infrastructure with geographic redundancy, regular security assessments, and
          principle-of-least-privilege access management.
        </p>
        <p>
          6.2 Notwithstanding the foregoing, no method of electronic transmission or storage
          is completely secure, and the Company cannot guarantee absolute security. The Company
          shall not be liable for any unauthorized access to or disclosure of information
          resulting from circumstances beyond its reasonable control, including but not limited
          to acts of hackers, failures of third-party infrastructure, or force majeure events.
        </p>

        <h2>7. COOKIES AND TRACKING TECHNOLOGIES</h2>
        <p>
          7.1 The Service uses essential cookies necessary for core functionality, including
          authentication, session management, and security. The Service may also use analytics
          cookies and similar technologies to understand usage patterns and improve the Service.
        </p>
        <p>
          7.2 You may control cookie behavior through your browser settings. Disabling essential
          cookies may impair the functionality of the Service. The Company does not use cookies
          for behavioral advertising or cross-site tracking purposes.
        </p>

        <h2>8. YOUR RIGHTS UNDER APPLICABLE LAW</h2>
        <p>
          8.1 Under the Personal Information Protection and Electronic Documents Act (PIPEDA)
          and applicable provincial privacy legislation, you have the right to: (a) request
          access to the personal information we hold about you; (b) request correction of
          inaccurate or incomplete personal information; (c) request deletion of your personal
          information, subject to applicable legal retention requirements; (d) withdraw consent
          for the processing of your personal information, subject to legal or contractual
          restrictions; and (e) file a complaint with the Office of the Privacy Commissioner
          of Canada if you believe your privacy rights have been violated.
        </p>
        <p>
          8.2 To exercise any of these rights, submit a written request to rig@desirig.com.
          We will verify your identity before processing any request and will respond within
          thirty (30) days of receipt of a verifiable request, or such other timeframe as
          required by applicable law.
        </p>

        <h2>9. BUSINESS OWNER AND LISTED ENTITY RIGHTS</h2>
        <p>
          9.1 If you are a business owner or authorized representative of a Listed Entity,
          you may: (a) request correction of inaccurate listing information; (b) request
          removal of your listing from the Service; (c) request addition, modification, or
          removal of community-related designations or classifications; or (d) claim ownership
          of your listing to manage your profile (where such functionality is available).
        </p>
        <p>
          9.2 Requests should be directed to rig@desirig.com and must include sufficient
          information to verify your identity and authority to act on behalf of the Listed
          Entity. The Company will process verified requests within seven (7) business days.
        </p>

        <h2>10. INTERNATIONAL DATA TRANSFERS</h2>
        <p>
          10.1 The Service is operated from Canada. Information may be processed and stored
          in Canada, the United States, or other jurisdictions where our service providers
          maintain facilities. By using the Service, you consent to the transfer of your
          information to jurisdictions that may have different data protection laws than your
          jurisdiction of residence.
        </p>

        <h2>11. CHILDREN&apos;S PRIVACY</h2>
        <p>
          11.1 The Service is not directed at and is not intended for use by individuals under
          the age of thirteen (13). We do not knowingly collect personal information from
          children under 13. If we become aware that we have collected personal information
          from a child under 13, we will take steps to delete such information promptly.
        </p>

        <h2>12. CHANGES TO THIS POLICY</h2>
        <p>
          12.1 We reserve the right to modify this Privacy Policy at any time. Changes will
          be effective upon posting of the revised Policy on the Service. Your continued use
          of the Service following the posting of changes constitutes your acceptance of such
          changes. Material modifications will be indicated by updating the &quot;Last Modified&quot;
          date at the top of this Policy.
        </p>

        <h2>13. CONTACT INFORMATION</h2>
        <p>
          For privacy-related questions, data access requests, or concerns regarding this
          Privacy Policy, contact us at:{" "}
          <a href="mailto:rig@desirig.com" className="text-orange-600 hover:underline">
            rig@desirig.com
          </a>
        </p>
        <p className="mt-2">DesiRig &mdash; Ontario, Canada</p>
      </div>
    </div>
  );
}
