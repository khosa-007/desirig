"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, MapPin, Send } from "lucide-react";

const TYPES = [
  { value: "desi_spot", label: "Hidden Desi Spot", desc: "Dhaba, food truck, desi shop at a truck stop" },
  { value: "business", label: "Desi Business", desc: "Punjabi-owned shop, mechanic, service" },
  { value: "truck_stop", label: "Truck Stop", desc: "Truck stop with desi food or services" },
  { value: "correction", label: "Correction", desc: "Fix wrong info on an existing listing" },
];

const CATEGORIES = [
  "Dhaba / Restaurant",
  "Indian Grocery",
  "Gurdwara",
  "Truck Stop with Desi Food",
  "Trucking Company",
  "Truck Mechanic",
  "Insurance Broker",
  "Driving School",
  "Towing Service",
  "Lawyer",
  "Accountant",
  "Other",
];

const PROVINCES = [
  "ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "YT", "NU",
  "---",
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

export function SubmitForm() {
  const [type, setType] = useState("desi_spot");
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    province_state: "ON",
    country: "CA",
    phone: "",
    website: "",
    is_desi_owned: true,
    has_desi_food: false,
    languages: "",
    submitter_name: "",
    submitter_email: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
        <h2 className="mt-4 text-xl font-bold text-white">Thank You!</h2>
        <p className="mt-2 text-gray-400">
          Your submission has been received. We&apos;ll review it and add it to
          DesiRig. You&apos;re helping the desi trucker community!
        </p>
        <p className="mt-1 font-gurmukhi text-sm text-[#FACC15]/70">
          ਤੁਹਾਡਾ ਧੰਨਵਾਦ — ਤੁਸੀਂ ਭਾਈਚਾਰੇ ਦੀ ਮਦਦ ਕਰ ਰਹੇ ਹੋ!
        </p>
        <Button
          className="mt-6 bg-[#FACC15] text-black hover:bg-[#FACC15]/80"
          onClick={() => {
            setStatus("idle");
            setForm({
              name: "", category: "", address: "", city: "",
              province_state: "ON", country: "CA", phone: "", website: "",
              is_desi_owned: true, has_desi_food: false, languages: "",
              submitter_name: "", submitter_email: "", description: "",
            });
          }}
        >
          Submit Another
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-[#333] bg-[#1A1A1A] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#FACC15] focus:outline-none focus:ring-1 focus:ring-[#FACC15]";
  const labelClass = "block text-sm font-medium text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type selector */}
      <div>
        <label className={labelClass}>What are you submitting?</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`rounded-lg border p-3 text-left text-sm transition-all ${
                type === t.value
                  ? "border-[#FACC15] bg-[#FACC15]/10 text-white"
                  : "border-[#333] bg-[#1A1A1A] text-gray-400 hover:border-[#555]"
              }`}
            >
              <div className="font-medium">{t.label}</div>
              <div className="mt-0.5 text-xs text-gray-500">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Business / Stop Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="e.g. Brar's Dhaba, Sikh Fuel Stop"
          className={`mt-1 ${inputClass}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className={labelClass}>Category</label>
        <select
          id="category"
          className={`mt-1 ${inputClass}`}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Location row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label htmlFor="city" className={labelClass}>
            City <span className="text-red-400">*</span>
          </label>
          <input
            id="city"
            type="text"
            required
            placeholder="Brampton"
            className={`mt-1 ${inputClass}`}
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="province" className={labelClass}>Province / State</label>
          <select
            id="province"
            className={`mt-1 ${inputClass}`}
            value={form.province_state}
            onChange={(e) => setForm({ ...form, province_state: e.target.value })}
          >
            {PROVINCES.map((p) =>
              p === "---" ? (
                <option key="sep" disabled>──── US States ────</option>
              ) : (
                <option key={p} value={p}>{p}</option>
              )
            )}
          </select>
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>Country</label>
          <select
            id="country"
            className={`mt-1 ${inputClass}`}
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="CA">Canada</option>
            <option value="US">USA</option>
          </select>
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className={labelClass}>Address</label>
        <input
          id="address"
          type="text"
          placeholder="123 Main St or Highway 401 Exit 312"
          className={`mt-1 ${inputClass}`}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      {/* Phone & Website */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="(905) 555-1234"
            className={`mt-1 ${inputClass}`}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>Website</label>
          <input
            id="website"
            type="text"
            placeholder="www.example.com"
            className={`mt-1 ${inputClass}`}
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
      </div>

      {/* Desi flags */}
      <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-4">
        <p className="text-sm font-medium text-orange-300">Desi Details</p>
        <div className="mt-3 space-y-3">
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.is_desi_owned}
              onChange={(e) => setForm({ ...form, is_desi_owned: e.target.checked })}
              className="h-4 w-4 rounded border-[#555] bg-[#1A1A1A] text-[#FACC15] accent-[#FACC15]"
            />
            Desi / South Asian owned
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={form.has_desi_food}
              onChange={(e) => setForm({ ...form, has_desi_food: e.target.checked })}
              className="h-4 w-4 rounded border-[#555] bg-[#1A1A1A] text-[#FACC15] accent-[#FACC15]"
            />
            Has desi food (roti, sabzi, dhaba style)
          </label>
          <div>
            <label htmlFor="languages" className="text-sm text-gray-400">
              Languages spoken
            </label>
            <input
              id="languages"
              type="text"
              placeholder="Punjabi, Hindi, Urdu"
              className={`mt-1 ${inputClass}`}
              value={form.languages}
              onChange={(e) => setForm({ ...form, languages: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>
          Tell us about this place
        </label>
        <textarea
          id="description"
          rows={3}
          placeholder="e.g. Hidden dhaba behind the Flying J at Exit 312. Amazing butter chicken and fresh roti. Open late nights. Ask for Bhai Sahib."
          className={`mt-1 ${inputClass}`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Your info */}
      <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
        <p className="text-sm font-medium text-gray-300">Your Info (optional)</p>
        <p className="text-xs text-gray-500">So we can follow up if needed</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="submitter_name" className="text-xs text-gray-400">Name</label>
            <input
              id="submitter_name"
              type="text"
              placeholder="Your name"
              className={`mt-1 ${inputClass}`}
              value={form.submitter_name}
              onChange={(e) => setForm({ ...form, submitter_name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="submitter_email" className="text-xs text-gray-400">Email</label>
            <input
              id="submitter_email"
              type="email"
              placeholder="your@email.com"
              className={`mt-1 ${inputClass}`}
              value={form.submitter_email}
              onChange={(e) => setForm({ ...form, submitter_email: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#FACC15] text-black hover:bg-[#FACC15]/80 disabled:opacity-50"
        size="lg"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit to DesiRig
          </>
        )}
      </Button>

      <p className="text-center text-xs text-gray-500">
        <MapPin className="mr-1 inline h-3 w-3" />
        Every submission is reviewed before going live.
      </p>
    </form>
  );
}
