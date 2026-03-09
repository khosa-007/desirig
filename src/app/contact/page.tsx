import type { Metadata } from "next";
import { Mail, MessageSquare, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact DesiRig.com — report issues, claim your listing, or request removal.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        Have a question, correction, or request? We&apos;re here to help.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-semibold">General Inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Questions, feedback, or partnership inquiries.
          </p>
          <a
            href="mailto:rig@desirig.com"
            className="mt-3 inline-block text-sm font-medium text-orange-600 hover:underline"
          >
            rig@desirig.com
          </a>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Shield className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-semibold">Business Owners</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Claim your listing, request corrections, or remove your business.
          </p>
          <a
            href="mailto:rig@desirig.com?subject=Business%20Listing%20Request"
            className="mt-3 inline-block text-sm font-medium text-orange-600 hover:underline"
          >
            rig@desirig.com
          </a>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-semibold">Report an Issue</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Wrong information? Closed business? Let us know.
          </p>
          <a
            href="mailto:rig@desirig.com?subject=Report%20Issue"
            className="mt-3 inline-block text-sm font-medium text-orange-600 hover:underline"
          >
            rig@desirig.com
          </a>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Mail className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-semibold">Privacy Requests</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Data access, correction, or deletion requests under PIPEDA.
          </p>
          <a
            href="mailto:rig@desirig.com?subject=Privacy%20Request"
            className="mt-3 inline-block text-sm font-medium text-orange-600 hover:underline"
          >
            rig@desirig.com
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Response time:</strong> We aim to respond
          within 2 business days. Listing removal requests are processed within 7 business days.
        </p>
      </div>
    </div>
  );
}
