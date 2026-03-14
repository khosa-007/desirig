"use client";

import { useState, useRef } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const loadTime = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Bot checks
    if (honeypot) return;
    if (Date.now() - loadTime.current < 3000) { setError("Too fast. Try again."); return; }

    if (!email.trim() || !email.includes("@")) { setError("Enter a valid email"); return; }

    setSubmitting(true);
    setError("");

    const supabase = createClient();
    const { error: dbError } = await supabase.from("subscribers").insert({
      email: email.trim().toLowerCase(),
    });

    setSubmitting(false);

    if (dbError) {
      if (dbError.code === "23505") {
        setDone(true); // already subscribed, just show success
        return;
      }
      setError("Something went wrong. Try again.");
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400">
        <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
        <span>You're in! We'll send you the good stuff.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-[#FACC15] hover:bg-[#E5B800] text-black shrink-0"
        >
          {submitting ? "..." : "Join"}
        </Button>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </form>
  );
}
