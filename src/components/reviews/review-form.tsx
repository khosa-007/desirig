"use client";

import { useState, useRef } from "react";
import { Star, Send, Truck, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReviewFormProps {
  businessId: string;
  businessName: string;
  onReviewAdded?: () => void;
}

export function ReviewForm({ businessId, businessName, onReviewAdded }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isDriver, setIsDriver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const loadTime = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    if (!name.trim()) { setError("What's your name?"); return; }
    if (!email.trim()) { setError("Email is required to prevent spam."); return; }
    if (rating === 0) { setError("Tap a star to rate"); return; }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          reviewer_name: name.trim(),
          email: email.trim(),
          rating,
          comment: comment.trim(),
          is_driver: isDriver,
          honeypot,
          load_time: loadTime.current,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setNeedsVerification(data.needsVerification || false);
      if (!data.needsVerification) {
        onReviewAdded?.();
      }
    } catch {
      setError("Network error. Try again.");
    }

    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          {needsVerification ? (
            <Mail className="h-6 w-6 text-green-600" />
          ) : (
            <Star className="h-6 w-6 fill-green-600 text-green-600" />
          )}
        </div>
        <h3 className="mt-3 font-semibold text-green-900">
          {needsVerification ? "Check your email!" : "Thanks for your review!"}
        </h3>
        <p className="mt-1 text-sm text-green-700">
          {needsVerification
            ? "We sent a verification link to your email. Click it to publish your review."
            : "Your feedback helps other drivers make better decisions."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6">
      <h3 className="text-lg font-semibold">Share your experience</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Been to {businessName}? Let other drivers know how it went.
      </p>

      {/* Star rating */}
      <div className="mt-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= (hoverRating || rating)
                    ? "fill-orange-500 text-orange-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              {rating === 5 ? "Excellent" : rating === 4 ? "Good" : rating === 3 ? "Okay" : rating === 2 ? "Not great" : "Bad"}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="mt-4">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
      </div>

      {/* Email */}
      <div className="mt-3">
        <Input
          type="email"
          placeholder="Your email (won't be shown publicly)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
        />
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <ShieldCheck className="h-3 w-3" />
          Your email is private — only used to verify your review.
        </p>
      </div>

      {/* Comment */}
      <div className="mt-3">
        <textarea
          placeholder="How was your experience? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Driver badge toggle */}
      <label className="mt-3 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={isDriver}
          onChange={(e) => setIsDriver(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
        />
        <Truck className="h-4 w-4 text-orange-500" />
        <span className="text-sm">I&apos;m a truck driver</span>
      </label>

      {/* Honeypot: invisible to humans, bots fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full bg-[#FF6E40] hover:bg-[#FF5722]"
      >
        {submitting ? "Posting..." : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Post Review
          </>
        )}
      </Button>
    </form>
  );
}
