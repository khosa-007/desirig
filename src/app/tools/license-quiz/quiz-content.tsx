"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Wind,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

/* ───────── Types ───────── */
interface Bilingual {
  en: string;
  pa: string;
}

interface Question {
  q: Bilingual;
  options: Bilingual[];
  correct: number;
  explanation: Bilingual;
}

import { g1Ontario, g1BC, g1AB, roadSignsQuestions } from "./car-questions";
import type { Question as CarQuestion } from "./car-questions";

type LicenseType = "truck" | "car" | null;
type ProvinceKey = "ON" | "BC" | "AB" | "SK" | "MB" | "QC";
type CategoryKey = "general" | "airbrakes" | "hos" | "g1" | "roadsigns";

interface Province {
  key: ProvinceKey;
  name: Bilingual;
}

interface Category {
  key: CategoryKey;
  name: Bilingual;
  icon: CategoryKey;
  count: number;
  desc: Bilingual;
}

/* ───────── Provinces ───────── */
const truckProvinces: Province[] = [
  { key: "ON", name: { en: "Ontario", pa: "ਓਨਟਾਰੀਓ" } },
  { key: "BC", name: { en: "British Columbia", pa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ" } },
  { key: "AB", name: { en: "Alberta", pa: "ਅਲਬਰਟਾ" } },
  { key: "SK", name: { en: "Saskatchewan", pa: "ਸਸਕੈਚਵਨ" } },
  { key: "MB", name: { en: "Manitoba", pa: "ਮੈਨੀਟੋਬਾ" } },
  { key: "QC", name: { en: "Quebec", pa: "ਕਿਊਬੈੱਕ" } },
];

const carProvinces: Province[] = [
  { key: "ON", name: { en: "Ontario (G1)", pa: "ਓਨਟਾਰੀਓ (G1)" } },
  { key: "BC", name: { en: "British Columbia (L)", pa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ (L)" } },
  { key: "AB", name: { en: "Alberta (Class 7)", pa: "ਅਲਬਰਟਾ (Class 7)" } },
];

const truckCategories: Category[] = [
  {
    key: "general",
    name: { en: "General Knowledge", pa: "ਆਮ ਗਿਆਨ" },
    icon: "general",
    count: 20,
    desc: {
      en: "Road rules, safety, inspections & province-specific regulations",
      pa: "ਸੜਕ ਨਿਯਮ, ਸੇਫਟੀ, ਜਾਂਚ ਤੇ ਸੂਬਾ-ਵਿਸ਼ੇਸ਼ ਨਿਯਮ",
    },
  },
  {
    key: "airbrakes",
    name: { en: "Air Brakes", pa: "ਏਅਰ ਬ੍ਰੇਕ" },
    icon: "airbrakes",
    count: 20,
    desc: {
      en: "Complete A-to-Z air brake system, inspection & emergency procedures",
      pa: "ਪੂਰਾ ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ, ਜਾਂਚ ਤੇ ਐਮਰਜੈਂਸੀ ਤਰੀਕੇ",
    },
  },
  {
    key: "hos",
    name: { en: "Hours of Service", pa: "ਸੇਵਾ ਦੇ ਘੰਟੇ" },
    icon: "hos",
    count: 10,
    desc: {
      en: "HOS rules, ELD, cycle limits & rest requirements",
      pa: "HOS ਨਿਯਮ, ELD, ਸਾਈਕਲ ਹੱਦਾਂ ਤੇ ਆਰਾਮ ਲੋੜਾਂ",
    },
  },
];

const carCategories: Category[] = [
  {
    key: "g1",
    name: { en: "Knowledge Test", pa: "ਨੌਲਿਜ ਟੈਸਟ" },
    icon: "general" as CategoryKey,
    count: 91,
    desc: {
      en: "Road rules, signs, safety & province-specific driving laws",
      pa: "ਸੜਕ ਨਿਯਮ, ਸਾਈਨ, ਸੇਫਟੀ ਤੇ ਸੂਬਾ-ਵਿਸ਼ੇਸ਼ ਡਰਾਈਵਿੰਗ ਕਾਨੂੰਨ",
    },
  },
  {
    key: "roadsigns",
    name: { en: "Road Signs", pa: "ਸੜਕ ਚਿੰਨ੍ਹ" },
    icon: "general" as CategoryKey,
    count: 54,
    desc: {
      en: "Learn all Canadian road signs — shapes, colours & meanings",
      pa: "ਸਾਰੇ ਕੈਨੇਡੀਅਨ ਸੜਕ ਚਿੰਨ੍ਹ ਸਿੱਖੋ — ਆਕਾਰ, ਰੰਗ ਤੇ ਅਰਥ",
    },
  },
];

/* ───────── Truck SVG ───────── */
function TruckSVG() {
  return (
    <svg
      width="80"
      height="40"
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="truck-drive"
    >
      {/* Trailer */}
      <rect x="0" y="8" width="38" height="22" rx="2" fill="#FF6E40" opacity="0.85" />
      <rect x="2" y="10" width="34" height="18" rx="1" fill="#FF8A65" />
      {/* Cab */}
      <rect x="38" y="12" width="22" height="18" rx="2" fill="#FF6E40" />
      {/* Windshield */}
      <rect x="52" y="14" width="7" height="10" rx="1" fill="#B2EBF2" />
      {/* Hood */}
      <rect x="60" y="18" width="12" height="12" rx="2" fill="#FF6E40" />
      {/* Bumper */}
      <rect x="72" y="22" width="4" height="8" rx="1" fill="#D84315" />
      {/* Exhaust stack */}
      <rect x="55" y="4" width="3" height="10" rx="1" fill="#455A64" />
      <circle cx="56.5" cy="4" r="2" fill="#78909C" />
      {/* Wheels */}
      <circle cx="12" cy="32" r="5" fill="#37474F" />
      <circle cx="12" cy="32" r="2.5" fill="#78909C" />
      <circle cx="28" cy="32" r="5" fill="#37474F" />
      <circle cx="28" cy="32" r="2.5" fill="#78909C" />
      <circle cx="50" cy="32" r="5" fill="#37474F" />
      <circle cx="50" cy="32" r="2.5" fill="#78909C" />
      <circle cx="66" cy="32" r="5" fill="#37474F" />
      <circle cx="66" cy="32" r="2.5" fill="#78909C" />
      {/* Lights */}
      <rect x="72" y="23" width="2" height="2" rx="0.5" fill="#FDD835" />
      <rect x="72" y="27" width="2" height="2" rx="0.5" fill="#EF5350" />
    </svg>
  );
}

/* ───────── QUESTION BANKS ───────── */


/* === GENERAL KNOWLEDGE: Province-specific banks === */

const generalON: Question[] = [
  {
    q: { en: "What is the blood alcohol limit for commercial vehicle drivers in Ontario?", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਡਰਾਈਵਰਾਂ ਲਈ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ਰਾਬ ਦੀ ਹੱਦ ਕੀ ਹੈ?" },
    options: [
      { en: "Zero (0.00%)", pa: "ਜ਼ੀਰੋ (0.00%)" },
      { en: "0.05%", pa: "0.05%" },
      { en: "0.08%", pa: "0.08%" },
      { en: "0.02%", pa: "0.02%" },
    ],
    correct: 0,
    explanation: { en: "Commercial vehicle drivers in Ontario must have zero blood alcohol content (BAC). Any amount results in immediate licence suspension.", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਡਰਾਈਵਰਾਂ ਦੇ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ਰਾਬ ਜ਼ੀਰੋ ਹੋਣੀ ਚਾਹੀਦੀ। ਕੋਈ ਵੀ ਮਾਤਰਾ ਤੁਰੰਤ ਲਾਇਸੈਂਸ ਮੁਅੱਤਲ ਕਰਵਾਉਂਦੀ ਹੈ।" },
  },
  {
    q: { en: "If you are involved in a collision causing more than $2,000 damage in Ontario, you must:", pa: "ਜੇ ਓਨਟਾਰੀਓ ਵਿੱਚ $2,000 ਤੋਂ ਵੱਧ ਨੁਕਸਾਨ ਵਾਲੀ ਟੱਕਰ ਹੋਵੇ, ਤਾਂ ਤੁਹਾਨੂੰ:" },
    options: [
      { en: "Exchange information and leave", pa: "ਜਾਣਕਾਰੀ ਦਾ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਕਰੋ ਤੇ ਚਲੇ ਜਾਓ" },
      { en: "Report to a Collision Reporting Centre or police within 24 hours", pa: "24 ਘੰਟਿਆਂ ਵਿੱਚ ਟੱਕਰ ਰਿਪੋਰਟਿੰਗ ਸੈਂਟਰ ਜਾਂ ਪੁਲਿਸ ਨੂੰ ਰਿਪੋਰਟ ਕਰੋ" },
      { en: "Call your insurance only", pa: "ਸਿਰਫ਼ ਆਪਣੀ ਇੰਸ਼ੋਰੈਂਸ ਨੂੰ ਕਾਲ ਕਰੋ" },
      { en: "Wait 48 hours then file a report", pa: "48 ਘੰਟੇ ਉਡੀਕ ਕਰੋ ਫਿਰ ਰਿਪੋਰਟ ਦਰਜ ਕਰੋ" },
    ],
    correct: 1,
    explanation: { en: "In Ontario, collisions with over $2,000 damage or injuries must be reported to a Collision Reporting Centre or police within 24 hours.", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ $2,000 ਤੋਂ ਵੱਧ ਨੁਕਸਾਨ ਜਾਂ ਸੱਟਾਂ ਵਾਲੀ ਟੱਕਰ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਰਿਪੋਰਟ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ।" },
  },
  {
    q: { en: "What is the maximum gross vehicle weight in Ontario for a standard tractor-trailer?", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਸਟੈਂਡਰਡ ਟਰੈਕਟਰ-ਟ੍ਰੇਲਰ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਕੁੱਲ ਵਾਹਨ ਭਾਰ ਕਿੰਨਾ ਹੈ?" },
    options: [
      { en: "80,000 lbs (36,287 kg)", pa: "80,000 ਪੌਂਡ (36,287 kg)" },
      { en: "105,500 lbs (47,854 kg)", pa: "105,500 ਪੌਂਡ (47,854 kg)" },
      { en: "139,991 lbs (63,500 kg)", pa: "139,991 ਪੌਂਡ (63,500 kg)" },
      { en: "150,000 lbs (68,039 kg)", pa: "150,000 ਪੌਂਡ (68,039 kg)" },
    ],
    correct: 2,
    explanation: { en: "The maximum gross vehicle weight in Ontario is 63,500 kg (139,991 lbs) for standard configurations.", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਸਟੈਂਡਰਡ ਕੌਨਫ਼ਿਗਰੇਸ਼ਨ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਕੁੱਲ ਵਾਹਨ ਭਾਰ 63,500 kg (139,991 ਪੌਂਡ) ਹੈ।" },
  },
  {
    q: { en: "How far before a turn must you signal in Ontario?", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਮੋੜ ਤੋਂ ਕਿੰਨੀ ਦੂਰ ਪਹਿਲਾਂ ਸਿਗਨਲ ਦੇਣਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "30 metres (100 feet)", pa: "30 ਮੀਟਰ (100 ਫੁੱਟ)" },
      { en: "60 metres (200 feet)", pa: "60 ਮੀਟਰ (200 ਫੁੱਟ)" },
      { en: "100 metres (300 feet)", pa: "100 ਮੀਟਰ (300 ਫੁੱਟ)" },
      { en: "15 metres (50 feet)", pa: "15 ਮੀਟਰ (50 ਫੁੱਟ)" },
    ],
    correct: 0,
    explanation: { en: "In Ontario under the HTA, you must signal at least 30 metres (100 feet) before making a turn.", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ HTA ਅਧੀਨ ਮੋੜ ਲੈਣ ਤੋਂ ਘੱਟੋ-ਘੱਟ 30 ਮੀਟਰ (100 ਫੁੱਟ) ਪਹਿਲਾਂ ਸਿਗਨਲ ਦੇਣਾ ਜ਼ਰੂਰੀ ਹੈ।" },
  },
  {
    q: { en: "Which Ontario agency administers commercial truck licensing?", pa: "ਕਿਹੜੀ ਓਨਟਾਰੀਓ ਏਜੰਸੀ ਕਮਰਸ਼ੀਅਲ ਟਰੱਕ ਲਾਇਸੈਂਸ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦੀ ਹੈ?" },
    options: [
      { en: "Ministry of Transportation Ontario (MTO)", pa: "ਮਿਨਿਸਟਰੀ ਆਫ਼ ਟਰਾਂਸਪੋਰਟੇਸ਼ਨ ਓਨਟਾਰੀਓ (MTO)" },
      { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
      { en: "Ontario Provincial Police (OPP)", pa: "ਓਨਟਾਰੀਓ ਪ੍ਰੋਵਿੰਸ਼ੀਅਲ ਪੁਲਿਸ (OPP)" },
      { en: "ServiceOntario", pa: "ਸਰਵਿਸ ਓਨਟਾਰੀਓ" },
    ],
    correct: 0,
    explanation: { en: "The Ministry of Transportation Ontario (MTO) administers commercial vehicle licensing, road safety, and the Highway Traffic Act.", pa: "ਮਿਨਿਸਟਰੀ ਆਫ਼ ਟਰਾਂਸਪੋਰਟੇਸ਼ਨ ਓਨਟਾਰੀਓ (MTO) ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ, ਸੜਕ ਸੇਫਟੀ ਤੇ ਹਾਈਵੇ ਟ੍ਰੈਫਿਕ ਐਕਟ ਦਾ ਪ੍ਰਬੰਧ ਕਰਦੀ ਹੈ।" },
  },
  {
    q: { en: "What does a flashing red light at an intersection mean?", pa: "ਚੌਰਾਹੇ ਤੇ ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਦਾ ਕੀ ਮਤਲਬ ਹੈ?" },
    options: [
      { en: "Slow down and proceed with caution", pa: "ਹੌਲੀ ਕਰੋ ਤੇ ਧਿਆਨ ਨਾਲ ਅੱਗੇ ਵਧੋ" },
      { en: "Come to a complete stop, then proceed when safe", pa: "ਪੂਰੀ ਤਰ੍ਹਾਂ ਰੁਕੋ, ਫਿਰ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਅੱਗੇ ਵਧੋ" },
      { en: "Speed up to clear the intersection", pa: "ਚੌਰਾਹਾ ਪਾਰ ਕਰਨ ਲਈ ਤੇਜ਼ ਕਰੋ" },
      { en: "Yield to traffic on the right only", pa: "ਸਿਰਫ਼ ਸੱਜੇ ਪਾਸੇ ਦੀ ਟ੍ਰੈਫਿਕ ਨੂੰ ਰਸਤਾ ਦਿਓ" },
    ],
    correct: 1,
    explanation: { en: "A flashing red light is treated like a stop sign. Come to a complete stop, then go when safe.", pa: "ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਸਟਾਪ ਸਾਈਨ ਵਾਂਗ ਹੈ। ਪੂਰੀ ਤਰ੍ਹਾਂ ਰੁਕੋ, ਫਿਰ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਅੱਗੇ ਵਧੋ।" },
  },
  {
    q: { en: "When approaching a railway crossing, a commercial vehicle must stop at least how far from the nearest rail?", pa: "ਰੇਲਵੇ ਕਰਾਸਿੰਗ ਤੇ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਨੂੰ ਨਜ਼ਦੀਕੀ ਪਟੜੀ ਤੋਂ ਘੱਟੋ-ਘੱਟ ਕਿੰਨੀ ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "3 metres (10 feet)", pa: "3 ਮੀਟਰ (10 ਫੁੱਟ)" },
      { en: "5 metres (15 feet)", pa: "5 ਮੀਟਰ (15 ਫੁੱਟ)" },
      { en: "10 metres (30 feet)", pa: "10 ਮੀਟਰ (30 ਫੁੱਟ)" },
      { en: "15 metres (50 feet)", pa: "15 ਮੀਟਰ (50 ਫੁੱਟ)" },
    ],
    correct: 1,
    explanation: { en: "Commercial vehicles must stop at least 5 metres (15 feet) from the nearest rail at railway crossings.", pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਰੇਲਵੇ ਕਰਾਸਿੰਗ ਤੇ ਨਜ਼ਦੀਕੀ ਪਟੜੀ ਤੋਂ ਘੱਟੋ-ਘੱਟ 5 ਮੀਟਰ ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ।" },
  },
  {
    q: { en: "When making a right turn with a large truck, you should:", pa: "ਵੱਡੇ ਟਰੱਕ ਨਾਲ ਸੱਜੇ ਮੋੜ ਲੈਂਦੇ ਸਮੇਂ ਤੁਹਾਨੂੰ:" },
    options: [
      { en: "Swing wide to the left first, then turn right", pa: "ਪਹਿਲਾਂ ਖੱਬੇ ਪਾਸੇ ਖੁੱਲ੍ਹਾ ਮੋੜ ਲਓ, ਫਿਰ ਸੱਜੇ ਮੁੜੋ" },
      { en: "Stay in the right lane and use your mirrors to check for vehicles beside you", pa: "ਸੱਜੀ ਲੇਨ ਵਿੱਚ ਰਹੋ ਤੇ ਸ਼ੀਸ਼ਿਆਂ ਨਾਲ ਨਾਲ ਵਾਲੇ ਵਾਹਨ ਚੈੱਕ ਕਰੋ" },
      { en: "Honk your horn before turning", pa: "ਮੋੜ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਹਾਰਨ ਵਜਾਓ" },
      { en: "Speed up to complete the turn quickly", pa: "ਮੋੜ ਜਲਦੀ ਪੂਰਾ ਕਰਨ ਲਈ ਤੇਜ਼ ਕਰੋ" },
    ],
    correct: 1,
    explanation: { en: "Stay in your lane and use mirrors. Swinging wide into the left lane is dangerous. Other vehicles may try to pass on the right.", pa: "ਆਪਣੀ ਲੇਨ ਵਿੱਚ ਰਹੋ ਤੇ ਸ਼ੀਸ਼ੇ ਵਰਤੋ। ਖੱਬੇ ਪਾਸੇ ਖੁੱਲ੍ਹਾ ਮੋੜ ਖ਼ਤਰਨਾਕ ਹੈ।" },
  },
  {
    q: { en: "What should you check first during a pre-trip inspection?", pa: "ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਜਾਂਚ ਵਿੱਚ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਚੈੱਕ ਕਰਨਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "Radio and air conditioning", pa: "ਰੇਡੀਓ ਤੇ AC" },
      { en: "Previous driver's inspection report (VCR)", pa: "ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ (VCR)" },
      { en: "Windshield wipers", pa: "ਵਿੰਡਸ਼ੀਲਡ ਵਾਈਪਰ" },
      { en: "Seat adjustment", pa: "ਸੀਟ ਦੀ ਐਡਜਸਟਮੈਂਟ" },
    ],
    correct: 1,
    explanation: { en: "Always check the previous driver's vehicle condition report (VCR) first to know about any outstanding defects.", pa: "ਹਮੇਸ਼ਾ ਪਹਿਲਾਂ ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਵਾਹਨ ਹਾਲਤ ਰਿਪੋਰਟ (VCR) ਚੈੱਕ ਕਰੋ।" },
  },
  {
    q: { en: "What does a solid yellow line on your side of the road mean?", pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਸੜਕ ਤੇ ਪੱਕੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਕੀ ਮਤਲਬ ਹੈ?" },
    options: [
      { en: "You may pass when safe", pa: "ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਲੰਘ ਸਕਦੇ ਹੋ" },
      { en: "No passing allowed from your side", pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਤੋਂ ਲੰਘਣਾ ਮਨ੍ਹਾ ਹੈ" },
      { en: "Construction zone ahead", pa: "ਅੱਗੇ ਉਸਾਰੀ ਜ਼ੋਨ" },
      { en: "Lane ends ahead", pa: "ਅੱਗੇ ਲੇਨ ਖ਼ਤਮ ਹੁੰਦੀ ਹੈ" },
    ],
    correct: 1,
    explanation: { en: "A solid yellow line on your side means no passing. A broken yellow line means you may pass when safe.", pa: "ਪੱਕੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਮਤਲਬ ਲੰਘਣਾ ਮਨ੍ਹਾ। ਟੁੱਟੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਮਤਲਬ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਲੰਘ ਸਕਦੇ ਹੋ।" },
  },
  {
    q: { en: "When is it legal to pass another vehicle using the shoulder of the road?", pa: "ਸੜਕ ਦੇ ਕਿਨਾਰੇ (ਸ਼ੋਲਡਰ) ਵਰਤ ਕੇ ਲੰਘਣਾ ਕਦੋਂ ਕਾਨੂੰਨੀ ਹੈ?" },
    options: [
      { en: "When the vehicle ahead is turning left", pa: "ਜਦੋਂ ਅੱਗੇ ਵਾਲਾ ਵਾਹਨ ਖੱਬੇ ਮੁੜ ਰਿਹਾ ਹੋਵੇ" },
      { en: "When traffic is heavy", pa: "ਜਦੋਂ ਟ੍ਰੈਫਿਕ ਜ਼ਿਆਦਾ ਹੋਵੇ" },
      { en: "It is never legal", pa: "ਇਹ ਕਦੇ ਵੀ ਕਾਨੂੰਨੀ ਨਹੀਂ ਹੈ" },
      { en: "When the speed limit is under 50 km/h", pa: "ਜਦੋਂ ਸਪੀਡ ਲਿਮਿਟ 50 km/h ਤੋਂ ਘੱਟ ਹੋਵੇ" },
    ],
    correct: 2,
    explanation: { en: "It is never legal to pass using the shoulder. The shoulder is for emergencies only.", pa: "ਸ਼ੋਲਡਰ ਵਰਤ ਕੇ ਲੰਘਣਾ ਕਦੇ ਵੀ ਕਾਨੂੰਨੀ ਨਹੀਂ। ਸ਼ੋਲਡਰ ਸਿਰਫ਼ ਐਮਰਜੈਂਸੀ ਲਈ ਹੈ।" },
  },
  {
    q: { en: "What must you do when an emergency vehicle with flashing lights approaches from behind?", pa: "ਜਦੋਂ ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲਾ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਪਿੱਛੇ ਤੋਂ ਆਵੇ ਤਾਂ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "Speed up to get out of the way", pa: "ਰਸਤੇ ਤੋਂ ਹਟਣ ਲਈ ਤੇਜ਼ ਕਰੋ" },
      { en: "Pull over to the right and stop", pa: "ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕੋ" },
      { en: "Move to the left lane", pa: "ਖੱਬੀ ਲੇਨ ਵਿੱਚ ਚਲੇ ਜਾਓ" },
      { en: "Continue at the same speed", pa: "ਉਸੇ ਸਪੀਡ ਨਾਲ ਜਾਰੀ ਰੱਖੋ" },
    ],
    correct: 1,
    explanation: { en: "You must pull over to the right and stop to let the emergency vehicle pass safely.", pa: "ਤੁਹਾਨੂੰ ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕਣਾ ਚਾਹੀਦਾ ਤਾਂ ਜੋ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਸੁਰੱਖਿਅਤ ਲੰਘ ਸਕੇ।" },
  },
  {
    q: { en: "What is the minimum following distance for a commercial vehicle at highway speed?", pa: "ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਫਾਲੋਇੰਗ ਦੂਰੀ ਕਿੰਨੀ ਹੈ?" },
    options: [
      { en: "2 seconds", pa: "2 ਸਕਿੰਟ" },
      { en: "3 seconds", pa: "3 ਸਕਿੰਟ" },
      { en: "4 seconds or more", pa: "4 ਸਕਿੰਟ ਜਾਂ ਵੱਧ" },
      { en: "1 truck length per 10 km/h", pa: "ਹਰ 10 km/h ਲਈ 1 ਟਰੱਕ ਲੰਬਾਈ" },
    ],
    correct: 2,
    explanation: { en: "Commercial vehicles should maintain at least 4 seconds following distance at highway speed. Increase in bad weather.", pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਘੱਟੋ-ਘੱਟ 4 ਸਕਿੰਟ ਦੀ ਦੂਰੀ ਰੱਖਣੀ ਚਾਹੀਦੀ। ਮਾੜੇ ਮੌਸਮ ਵਿੱਚ ਵਧਾਓ।" },
  },
  {
    q: { en: "What should you do if your brakes fail while driving downhill?", pa: "ਜੇ ਢਲਾਣ ਤੋਂ ਉਤਰਦੇ ਸਮੇਂ ਬ੍ਰੇਕ ਫੇਲ੍ਹ ਹੋ ਜਾਣ ਤਾਂ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "Turn off the engine immediately", pa: "ਤੁਰੰਤ ਇੰਜਣ ਬੰਦ ਕਰੋ" },
      { en: "Pump the brakes rapidly and downshift to lower gears", pa: "ਬ੍ਰੇਕ ਤੇਜ਼ੀ ਨਾਲ ਦਬਾਓ ਤੇ ਨੀਵੇਂ ਗੇਅਰ ਵਿੱਚ ਪਾਓ" },
      { en: "Put the transmission in neutral", pa: "ਟ੍ਰਾਂਸਮਿਸ਼ਨ ਨਿਊਟ੍ਰਲ ਵਿੱਚ ਪਾਓ" },
      { en: "Steer into oncoming traffic to slow down", pa: "ਸਾਹਮਣਿਓਂ ਆ ਰਹੀ ਟ੍ਰੈਫਿਕ ਵੱਲ ਮੋੜੋ" },
    ],
    correct: 1,
    explanation: { en: "Pump the brakes to build up air pressure. Downshift to use engine braking. Use the escape ramp if available. Never put in neutral.", pa: "ਹਵਾ ਦਾ ਦਬਾਅ ਬਣਾਉਣ ਲਈ ਬ੍ਰੇਕ ਦਬਾਓ। ਇੰਜਣ ਬ੍ਰੇਕਿੰਗ ਲਈ ਨੀਵਾਂ ਗੇਅਰ ਪਾਓ। ਐਸਕੇਪ ਰੈਂਪ ਵਰਤੋ। ਕਦੇ ਨਿਊਟ੍ਰਲ ਨਾ ਪਾਓ।" },
  },
  {
    q: { en: "How often must a truck driver perform a pre-trip inspection?", pa: "ਟਰੱਕ ਡਰਾਈਵਰ ਨੂੰ ਪ੍ਰੀ-ਟ੍ਰਿਪ ਜਾਂਚ ਕਿੰਨੀ ਵਾਰ ਕਰਨੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "Once a week", pa: "ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "Before every trip or every 24 hours", pa: "ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਹਰ 24 ਘੰਟੇ" },
      { en: "Once a month", pa: "ਮਹੀਨੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "Only when requested by the carrier", pa: "ਸਿਰਫ਼ ਜਦੋਂ ਕੈਰੀਅਰ ਕਹੇ" },
    ],
    correct: 1,
    explanation: { en: "A pre-trip inspection must be done before every trip or at least once every 24 hours.", pa: "ਪ੍ਰੀ-ਟ੍ਰਿਪ ਜਾਂਚ ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਘੱਟੋ-ਘੱਟ ਹਰ 24 ਘੰਟੇ ਬਾਅਦ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ।" },
  },
  {
    q: { en: "When driving on a wet road, you should increase your following distance by:", pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਫਾਲੋਇੰਗ ਦੂਰੀ ਕਿੰਨੀ ਵਧਾਉਣੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "No change needed", pa: "ਕੋਈ ਬਦਲਾਅ ਦੀ ਲੋੜ ਨਹੀਂ" },
      { en: "Double the normal distance", pa: "ਆਮ ਦੂਰੀ ਤੋਂ ਦੁੱਗਣੀ" },
      { en: "Triple the normal distance", pa: "ਆਮ ਦੂਰੀ ਤੋਂ ਤਿੱਗਣੀ" },
      { en: "Add 1 second only", pa: "ਸਿਰਫ਼ 1 ਸਕਿੰਟ ਵਧਾਓ" },
    ],
    correct: 1,
    explanation: { en: "On wet roads, at least double your following distance because stopping distance increases significantly.", pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਫਾਲੋਇੰਗ ਦੂਰੀ ਘੱਟੋ-ਘੱਟ ਦੁੱਗਣੀ ਕਰੋ ਕਿਉਂਕਿ ਰੁਕਣ ਦੀ ਦੂਰੀ ਬਹੁਤ ਵਧ ਜਾਂਦੀ ਹੈ।" },
  },
  {
    q: { en: "What is 'Driver Inc.' and why should you avoid it?", pa: "'ਡਰਾਈਵਰ ਇੰਕ.' ਕੀ ਹੈ ਤੇ ਇਸ ਤੋਂ ਕਿਉਂ ਬਚਣਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "A legitimate trucking company", pa: "ਇੱਕ ਜਾਇਜ਼ ਟਰੱਕਿੰਗ ਕੰਪਨੀ" },
      { en: "A scheme where drivers are misclassified as independent contractors to avoid taxes and benefits", pa: "ਇੱਕ ਘਪਲਾ ਜਿਸ ਵਿੱਚ ਡਰਾਈਵਰਾਂ ਨੂੰ ਟੈਕਸ ਤੇ ਲਾਭ ਬਚਾਉਣ ਲਈ ਗ਼ਲਤ ਤਰੀਕੇ ਨਾਲ ਠੇਕੇਦਾਰ ਦੱਸਿਆ ਜਾਂਦਾ" },
      { en: "A new type of driving licence", pa: "ਇੱਕ ਨਵੀਂ ਕਿਸਮ ਦਾ ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ" },
      { en: "A government program for truckers", pa: "ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਲਈ ਸਰਕਾਰੀ ਪ੍ਰੋਗਰਾਮ" },
    ],
    correct: 1,
    explanation: { en: "Driver Inc. is a scheme where carriers misclassify employees as contractors. Drivers lose EI, CPP, vacation pay, and WSIB coverage.", pa: "ਡਰਾਈਵਰ ਇੰਕ. ਇੱਕ ਸਕੀਮ ਹੈ ਜਿੱਥੇ ਕੈਰੀਅਰ ਮੁਲਾਜ਼ਮਾਂ ਨੂੰ ਠੇਕੇਦਾਰ ਦੱਸਦੇ ਹਨ। ਡਰਾਈਵਰ EI, CPP, ਛੁੱਟੀ ਤਨਖ਼ਾਹ ਤੇ WSIB ਕਵਰੇਜ ਗੁਆ ਲੈਂਦੇ ਹਨ।" },
  },
  {
    q: { en: "In Ontario, what is the 'Move Over' law?", pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ 'ਮੂਵ ਓਵਰ' ਕਾਨੂੰਨ ਕੀ ਹੈ?" },
    options: [
      { en: "Move to the right when slower traffic approaches", pa: "ਜਦੋਂ ਹੌਲੀ ਟ੍ਰੈਫਿਕ ਆਵੇ ਤਾਂ ਸੱਜੇ ਪਾਸੇ ਹੋ ਜਾਓ" },
      { en: "Slow down and move over one lane when passing stopped emergency vehicles with lights flashing", pa: "ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲੇ ਖੜ੍ਹੇ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਕੋਲੋਂ ਲੰਘਦੇ ਸਮੇਂ ਹੌਲੀ ਕਰੋ ਤੇ ਇੱਕ ਲੇਨ ਹਟ ਕੇ ਲੰਘੋ" },
      { en: "Pull over for school buses only", pa: "ਸਿਰਫ਼ ਸਕੂਲ ਬੱਸਾਂ ਲਈ ਕਿਨਾਰੇ ਲੱਗੋ" },
      { en: "Move to the shoulder on highways", pa: "ਹਾਈਵੇ ਤੇ ਸ਼ੋਲਡਰ ਤੇ ਚਲੇ ਜਾਓ" },
    ],
    correct: 1,
    explanation: { en: "Ontario's Move Over law requires drivers to slow down and, if safe, move over one lane when passing stopped emergency vehicles, tow trucks, or maintenance vehicles with flashing lights.", pa: "ਓਨਟਾਰੀਓ ਦਾ ਮੂਵ ਓਵਰ ਕਾਨੂੰਨ ਕਹਿੰਦਾ ਹੈ ਕਿ ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲੇ ਖੜ੍ਹੇ ਐਮਰਜੈਂਸੀ ਵਾਹਨਾਂ, ਟੋ ਟਰੱਕਾਂ ਜਾਂ ਮੇਨਟੇਨੈਂਸ ਵਾਹਨਾਂ ਕੋਲੋਂ ਲੰਘਦੇ ਸਮੇਂ ਹੌਲੀ ਕਰੋ ਤੇ ਇੱਕ ਲੇਨ ਹਟੋ।" },
  },
];

const generalBC: Question[] = [
  {
    q: { en: "Which agency oversees commercial vehicle licensing in British Columbia?", pa: "ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ ਕਿਹੜੀ ਏਜੰਸੀ ਸੰਭਾਲਦੀ ਹੈ?" },
    options: [
      { en: "ICBC (Insurance Corporation of British Columbia)", pa: "ICBC (ਇੰਸ਼ੋਰੈਂਸ ਕਾਰਪੋਰੇਸ਼ਨ ਆਫ਼ ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ)" },
      { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
      { en: "BC Highways Ministry", pa: "BC ਹਾਈਵੇ ਮਿਨਿਸਟਰੀ" },
      { en: "WorkSafeBC", pa: "ਵਰਕਸੇਫ਼BC" },
    ],
    correct: 0,
    explanation: { en: "ICBC handles driver licensing, vehicle registration, and insurance in British Columbia.", pa: "ICBC ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ ਵਿੱਚ ਡਰਾਈਵਰ ਲਾਇਸੈਂਸ, ਵਾਹਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤੇ ਇੰਸ਼ੋਰੈਂਸ ਸੰਭਾਲਦੀ ਹੈ।" },
  },
  {
    q: { en: "When are tire chains required in BC mountain passes?", pa: "BC ਦੇ ਪਹਾੜੀ ਦੱਰਿਆਂ ਵਿੱਚ ਟਾਇਰ ਚੇਨ ਕਦੋਂ ਲਾਉਣੇ ਜ਼ਰੂਰੀ ਹਨ?" },
    options: [
      { en: "Only when it is snowing", pa: "ਸਿਰਫ਼ ਜਦੋਂ ਬਰਫ਼ ਪੈ ਰਹੀ ਹੋਵੇ" },
      { en: "When chain-up signs are posted (Oct 1 – Apr 30 season)", pa: "ਜਦੋਂ ਚੇਨ-ਅੱਪ ਸਾਈਨ ਲੱਗੇ ਹੋਣ (1 ਅਕਤੂਬਰ – 30 ਅਪ੍ਰੈਲ ਸੀਜ਼ਨ)" },
      { en: "Only on the Coquihalla Highway", pa: "ਸਿਰਫ਼ ਕੋਕੀਹੱਲਾ ਹਾਈਵੇ ਤੇ" },
      { en: "Chains are never required for commercial vehicles", pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਲਈ ਚੇਨ ਕਦੇ ਜ਼ਰੂਰੀ ਨਹੀਂ" },
    ],
    correct: 1,
    explanation: { en: "BC law requires commercial vehicles to carry and use chains when chain-up signs are posted, typically Oct 1 – Apr 30 on designated highways.", pa: "BC ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਜਦੋਂ ਚੇਨ-ਅੱਪ ਸਾਈਨ ਲੱਗੇ ਹੋਣ ਤਾਂ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਚੇਨ ਰੱਖਣੇ ਤੇ ਵਰਤਣੇ ਜ਼ਰੂਰੀ ਹਨ, ਆਮ ਤੌਰ ਤੇ 1 ਅਕਤੂਬਰ – 30 ਅਪ੍ਰੈਲ।" },
  },
  {
    q: { en: "What is the speed limit for commercial vehicles on BC highways unless otherwise posted?", pa: "BC ਹਾਈਵੇ ਤੇ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਦੀ ਸਪੀਡ ਲਿਮਿਟ ਕੀ ਹੈ ਜੇ ਹੋਰ ਨਾ ਲਿਖਿਆ ਹੋਵੇ?" },
    options: [
      { en: "100 km/h", pa: "100 km/h" },
      { en: "110 km/h", pa: "110 km/h" },
      { en: "80 km/h", pa: "80 km/h" },
      { en: "90 km/h", pa: "90 km/h" },
    ],
    correct: 0,
    explanation: { en: "The default highway speed limit for commercial vehicles in BC is 100 km/h unless signs indicate otherwise. Some corridors allow higher speeds for cars but trucks are often restricted.", pa: "BC ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਲਈ ਡਿਫ਼ਾਲਟ ਹਾਈਵੇ ਸਪੀਡ ਲਿਮਿਟ 100 km/h ਹੈ। ਕੁਝ ਥਾਵਾਂ ਤੇ ਟਰੱਕਾਂ ਲਈ ਘੱਟ ਹੋ ਸਕਦੀ ਹੈ।" },
  },
  {
    q: { en: "What technique should you use when driving down a long steep grade in BC mountains?", pa: "BC ਦੇ ਪਹਾੜਾਂ ਵਿੱਚ ਲੰਬੀ ਢਲਾਣ ਉਤਰਦੇ ਸਮੇਂ ਕਿਹੜੀ ਤਕਨੀਕ ਵਰਤਣੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "Ride the brakes continuously", pa: "ਲਗਾਤਾਰ ਬ੍ਰੇਕ ਦੱਬ ਕੇ ਰੱਖੋ" },
      { en: "Select proper low gear BEFORE the descent and use engine braking with light brake applications", pa: "ਢਲਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸਹੀ ਨੀਵਾਂ ਗੇਅਰ ਚੁਣੋ ਤੇ ਇੰਜਣ ਬ੍ਰੇਕਿੰਗ ਵਰਤੋ ਹਲਕੇ ਬ੍ਰੇਕ ਨਾਲ" },
      { en: "Put in neutral and coast down", pa: "ਨਿਊਟ੍ਰਲ ਵਿੱਚ ਪਾ ਕੇ ਉਤਰੋ" },
      { en: "Use the jake brake only, never the foot brake", pa: "ਸਿਰਫ਼ ਜੈਕ ਬ੍ਰੇਕ ਵਰਤੋ, ਫੁੱਟ ਬ੍ਰੇਕ ਕਦੇ ਨਹੀਂ" },
    ],
    correct: 1,
    explanation: { en: "Select the right gear BEFORE the descent. Use engine braking as primary control with light, intermittent brake applications to avoid brake fade.", pa: "ਢਲਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸਹੀ ਗੇਅਰ ਚੁਣੋ। ਇੰਜਣ ਬ੍ਰੇਕਿੰਗ ਮੁੱਖ ਤੌਰ ਤੇ ਵਰਤੋ ਤੇ ਹਲਕੇ ਬ੍ਰੇਕ ਲਗਾਓ ਤਾਂ ਜੋ ਬ੍ਰੇਕ ਫੇਡ ਨਾ ਹੋਵੇ।" },
  },
  {
    q: { en: "What does a flashing red light at an intersection mean?", pa: "ਚੌਰਾਹੇ ਤੇ ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਦਾ ਕੀ ਮਤਲਬ ਹੈ?" },
    options: [
      { en: "Slow down and proceed", pa: "ਹੌਲੀ ਕਰੋ ਤੇ ਅੱਗੇ ਵਧੋ" },
      { en: "Complete stop, then proceed when safe", pa: "ਪੂਰੀ ਤਰ੍ਹਾਂ ਰੁਕੋ, ਫਿਰ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਅੱਗੇ ਵਧੋ" },
      { en: "Speed up to clear intersection", pa: "ਚੌਰਾਹਾ ਪਾਰ ਕਰਨ ਲਈ ਤੇਜ਼ ਕਰੋ" },
      { en: "Yield to right only", pa: "ਸਿਰਫ਼ ਸੱਜੇ ਨੂੰ ਰਸਤਾ ਦਿਓ" },
    ],
    correct: 1,
    explanation: { en: "A flashing red light is treated like a stop sign across all provinces.", pa: "ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਸਾਰੇ ਸੂਬਿਆਂ ਵਿੱਚ ਸਟਾਪ ਸਾਈਨ ਵਾਂਗ ਹੈ।" },
  },
  {
    q: { en: "When approaching a railway crossing in BC, a commercial vehicle must stop at least how far from the nearest rail?", pa: "BC ਵਿੱਚ ਰੇਲਵੇ ਕਰਾਸਿੰਗ ਤੇ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਨੂੰ ਕਿੰਨੀ ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "3 metres", pa: "3 ਮੀਟਰ" },
      { en: "5 metres (15 feet)", pa: "5 ਮੀਟਰ (15 ਫੁੱਟ)" },
      { en: "10 metres", pa: "10 ਮੀਟਰ" },
      { en: "15 metres", pa: "15 ਮੀਟਰ" },
    ],
    correct: 1,
    explanation: { en: "Commercial vehicles must stop at least 5 metres from the nearest rail at all railway crossings.", pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਸਾਰੀਆਂ ਰੇਲਵੇ ਕਰਾਸਿੰਗਾਂ ਤੇ ਘੱਟੋ-ਘੱਟ 5 ਮੀਟਰ ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ।" },
  },
  {
    q: { en: "What is the blood alcohol limit for commercial vehicle drivers in BC?", pa: "BC ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰਾਂ ਲਈ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ਰਾਬ ਦੀ ਹੱਦ ਕੀ ਹੈ?" },
    options: [
      { en: "Zero (0.00%)", pa: "ਜ਼ੀਰੋ (0.00%)" },
      { en: "0.05%", pa: "0.05%" },
      { en: "0.08%", pa: "0.08%" },
      { en: "0.04%", pa: "0.04%" },
    ],
    correct: 0,
    explanation: { en: "Commercial drivers in BC must have zero BAC. BC has strict impaired driving laws with immediate roadside prohibitions.", pa: "BC ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰਾਂ ਲਈ BAC ਜ਼ੀਰੋ ਹੋਣੀ ਚਾਹੀਦੀ। BC ਵਿੱਚ ਸਖ਼ਤ ਨਸ਼ਾ ਡਰਾਈਵਿੰਗ ਕਾਨੂੰਨ ਹਨ।" },
  },
  {
    q: { en: "When making a right turn with a large truck, you should:", pa: "ਵੱਡੇ ਟਰੱਕ ਨਾਲ ਸੱਜੇ ਮੋੜ ਲੈਂਦੇ ਸਮੇਂ:" },
    options: [
      { en: "Swing wide left first", pa: "ਪਹਿਲਾਂ ਖੱਬੇ ਖੁੱਲ੍ਹਾ ਮੋੜ ਲਓ" },
      { en: "Stay in the right lane, use mirrors to check for vehicles beside you", pa: "ਸੱਜੀ ਲੇਨ ਵਿੱਚ ਰਹੋ, ਸ਼ੀਸ਼ਿਆਂ ਨਾਲ ਨਾਲ ਵਾਲੇ ਵਾਹਨ ਚੈੱਕ ਕਰੋ" },
      { en: "Honk before turning", pa: "ਮੋੜ ਤੋਂ ਪਹਿਲਾਂ ਹਾਰਨ ਵਜਾਓ" },
      { en: "Speed up to complete the turn quickly", pa: "ਤੇਜ਼ ਕਰੋ" },
    ],
    correct: 1,
    explanation: { en: "Stay in your lane and use mirrors. Swinging wide is dangerous. Other vehicles may try to pass on the right.", pa: "ਆਪਣੀ ਲੇਨ ਵਿੱਚ ਰਹੋ ਤੇ ਸ਼ੀਸ਼ੇ ਵਰਤੋ। ਖੁੱਲ੍ਹਾ ਮੋੜ ਖ਼ਤਰਨਾਕ ਹੈ।" },
  },
  {
    q: { en: "What should you check first during a pre-trip inspection?", pa: "ਪ੍ਰੀ-ਟ੍ਰਿਪ ਜਾਂਚ ਵਿੱਚ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਚੈੱਕ ਕਰੋ?" },
    options: [
      { en: "Radio", pa: "ਰੇਡੀਓ" },
      { en: "Previous driver's inspection report", pa: "ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ" },
      { en: "Windshield wipers", pa: "ਵਾਈਪਰ" },
      { en: "Seat belt", pa: "ਸੀਟ ਬੈਲਟ" },
    ],
    correct: 1,
    explanation: { en: "Always check the previous driver's vehicle condition report first.", pa: "ਹਮੇਸ਼ਾ ਪਹਿਲਾਂ ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਵਾਹਨ ਹਾਲਤ ਰਿਪੋਰਟ ਚੈੱਕ ਕਰੋ।" },
  },
  {
    q: { en: "What is a runaway lane used for on BC mountain highways?", pa: "BC ਦੇ ਪਹਾੜੀ ਹਾਈਵੇ ਤੇ ਰਨਅਵੇ ਲੇਨ ਕਿਸ ਲਈ ਹੈ?" },
    options: [
      { en: "Resting area for tired drivers", pa: "ਥੱਕੇ ਡਰਾਈਵਰਾਂ ਲਈ ਆਰਾਮ ਥਾਂ" },
      { en: "Emergency escape ramp for vehicles that have lost braking ability on steep grades", pa: "ਢਲਾਣ ਤੇ ਬ੍ਰੇਕ ਗੁਆ ਚੁੱਕੇ ਵਾਹਨਾਂ ਲਈ ਐਮਰਜੈਂਸੀ ਐਸਕੇਪ ਰੈਂਪ" },
      { en: "Truck passing lane", pa: "ਟਰੱਕ ਲੰਘਣ ਵਾਲੀ ਲੇਨ" },
      { en: "Chain-up area", pa: "ਚੇਨ ਲਾਉਣ ਦੀ ਥਾਂ" },
    ],
    correct: 1,
    explanation: { en: "Runaway lanes (escape ramps) are gravel-filled uphill ramps designed to safely stop vehicles that have lost their brakes on steep descents.", pa: "ਰਨਅਵੇ ਲੇਨ (ਐਸਕੇਪ ਰੈਂਪ) ਬੱਜਰੀ ਵਾਲੀ ਚੜ੍ਹਾਈ ਹੈ ਜੋ ਢਲਾਣ ਤੇ ਬ੍ਰੇਕ ਗੁਆ ਚੁੱਕੇ ਵਾਹਨਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੋਕਣ ਲਈ ਬਣੀ ਹੈ।" },
  },
  {
    q: { en: "How often must a pre-trip inspection be done?", pa: "ਪ੍ਰੀ-ਟ੍ਰਿਪ ਜਾਂਚ ਕਿੰਨੀ ਵਾਰ ਕਰਨੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "Once a week", pa: "ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "Before every trip or every 24 hours", pa: "ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਹਰ 24 ਘੰਟੇ" },
      { en: "Monthly", pa: "ਮਹੀਨੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "When carrier asks", pa: "ਜਦੋਂ ਕੈਰੀਅਰ ਕਹੇ" },
    ],
    correct: 1,
    explanation: { en: "Pre-trip inspections are required before every trip or at least every 24 hours.", pa: "ਪ੍ਰੀ-ਟ੍ਰਿਪ ਜਾਂਚ ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਹਰ 24 ਘੰਟੇ ਜ਼ਰੂਰੀ ਹੈ।" },
  },
  {
    q: { en: "What is the minimum following distance for trucks at highway speed?", pa: "ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਟਰੱਕਾਂ ਲਈ ਘੱਟੋ-ਘੱਟ ਫਾਲੋਇੰਗ ਦੂਰੀ ਕੀ ਹੈ?" },
    options: [
      { en: "2 seconds", pa: "2 ਸਕਿੰਟ" },
      { en: "3 seconds", pa: "3 ਸਕਿੰਟ" },
      { en: "4 seconds or more", pa: "4 ਸਕਿੰਟ ਜਾਂ ਵੱਧ" },
      { en: "1 truck length per 10 km/h", pa: "ਹਰ 10 km/h ਲਈ 1 ਟਰੱਕ ਲੰਬਾਈ" },
    ],
    correct: 2,
    explanation: { en: "At least 4 seconds following distance at highway speed. Increase in bad weather.", pa: "ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਘੱਟੋ-ਘੱਟ 4 ਸਕਿੰਟ। ਮਾੜੇ ਮੌਸਮ ਵਿੱਚ ਵਧਾਓ।" },
  },
  {
    q: { en: "On wet roads, following distance should be:", pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਫਾਲੋਇੰਗ ਦੂਰੀ:" },
    options: [
      { en: "Same as dry", pa: "ਸੁੱਕੀ ਵਾਂਗ" },
      { en: "Doubled", pa: "ਦੁੱਗਣੀ" },
      { en: "Tripled", pa: "ਤਿੱਗਣੀ" },
      { en: "1 second more", pa: "1 ਸਕਿੰਟ ਵੱਧ" },
    ],
    correct: 1,
    explanation: { en: "Double your following distance on wet roads.", pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਫਾਲੋਇੰਗ ਦੂਰੀ ਦੁੱਗਣੀ ਕਰੋ।" },
  },
  {
    q: { en: "It is legal to pass using the shoulder:", pa: "ਸ਼ੋਲਡਰ ਵਰਤ ਕੇ ਲੰਘਣਾ ਕਾਨੂੰਨੀ ਹੈ:" },
    options: [
      { en: "When vehicle ahead turns left", pa: "ਜਦੋਂ ਅੱਗੇ ਵਾਲਾ ਖੱਬੇ ਮੁੜੇ" },
      { en: "In heavy traffic", pa: "ਭਾਰੀ ਟ੍ਰੈਫਿਕ ਵਿੱਚ" },
      { en: "It is never legal", pa: "ਇਹ ਕਦੇ ਕਾਨੂੰਨੀ ਨਹੀਂ" },
      { en: "Under 50 km/h", pa: "50 km/h ਤੋਂ ਘੱਟ ਸਪੀਡ ਤੇ" },
    ],
    correct: 2,
    explanation: { en: "Passing on the shoulder is never legal. Shoulders are for emergencies only.", pa: "ਸ਼ੋਲਡਰ ਤੋਂ ਲੰਘਣਾ ਕਦੇ ਕਾਨੂੰਨੀ ਨਹੀਂ। ਸ਼ੋਲਡਰ ਸਿਰਫ਼ ਐਮਰਜੈਂਸੀ ਲਈ ਹੈ।" },
  },
  {
    q: { en: "An emergency vehicle with flashing lights approaches. You must:", pa: "ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲਾ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਆ ਰਿਹਾ। ਤੁਹਾਨੂੰ:" },
    options: [
      { en: "Speed up", pa: "ਤੇਜ਼ ਕਰੋ" },
      { en: "Pull to the right and stop", pa: "ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕੋ" },
      { en: "Move to left lane", pa: "ਖੱਬੀ ਲੇਨ ਵਿੱਚ ਜਾਓ" },
      { en: "Continue driving", pa: "ਚਲਦੇ ਰਹੋ" },
    ],
    correct: 1,
    explanation: { en: "Pull to the right and stop to let emergency vehicles pass.", pa: "ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕੋ ਤਾਂ ਜੋ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਲੰਘ ਸਕੇ।" },
  },
  {
    q: { en: "A solid yellow line on your side means:", pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਪੱਕੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਮਤਲਬ:" },
    options: [
      { en: "Pass when safe", pa: "ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਲੰਘੋ" },
      { en: "No passing from your side", pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਤੋਂ ਲੰਘਣਾ ਮਨ੍ਹਾ" },
      { en: "Construction zone", pa: "ਉਸਾਰੀ ਜ਼ੋਨ" },
      { en: "Lane ends", pa: "ਲੇਨ ਖ਼ਤਮ" },
    ],
    correct: 1,
    explanation: { en: "Solid yellow = no passing. Broken yellow = may pass when safe.", pa: "ਪੱਕੀ ਪੀਲੀ = ਲੰਘਣਾ ਮਨ੍ਹਾ। ਟੁੱਟੀ ਪੀਲੀ = ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਲੰਘ ਸਕਦੇ ਹੋ।" },
  },
  {
    q: { en: "What is 'Driver Inc.' and why should you avoid it?", pa: "'ਡਰਾਈਵਰ ਇੰਕ.' ਕੀ ਹੈ?" },
    options: [
      { en: "A legit trucking company", pa: "ਜਾਇਜ਼ ਟਰੱਕਿੰਗ ਕੰਪਨੀ" },
      { en: "A scheme misclassifying employees as contractors to avoid taxes and benefits", pa: "ਟੈਕਸ ਤੇ ਲਾਭ ਬਚਾਉਣ ਲਈ ਮੁਲਾਜ਼ਮਾਂ ਨੂੰ ਠੇਕੇਦਾਰ ਦੱਸਣ ਦਾ ਘਪਲਾ" },
      { en: "New licence type", pa: "ਨਵੀਂ ਲਾਇਸੈਂਸ ਕਿਸਮ" },
      { en: "Government program", pa: "ਸਰਕਾਰੀ ਪ੍ਰੋਗਰਾਮ" },
    ],
    correct: 1,
    explanation: { en: "Driver Inc. is a scheme where carriers misclassify employees as contractors. Drivers lose EI, CPP, vacation pay, and coverage.", pa: "ਡਰਾਈਵਰ ਇੰਕ. ਘਪਲਾ ਹੈ ਜਿੱਥੇ ਮੁਲਾਜ਼ਮਾਂ ਨੂੰ ਠੇਕੇਦਾਰ ਦੱਸ ਕੇ ਲਾਭ ਖੋਹੇ ਜਾਂਦੇ ਹਨ।" },
  },
  {
    q: { en: "What is the 'Slow Down Move Over' law in BC?", pa: "BC ਵਿੱਚ 'ਸਲੋ ਡਾਊਨ ਮੂਵ ਓਵਰ' ਕਾਨੂੰਨ ਕੀ ਹੈ?" },
    options: [
      { en: "Slow down for slow traffic", pa: "ਹੌਲੀ ਟ੍ਰੈਫਿਕ ਲਈ ਹੌਲੀ ਕਰੋ" },
      { en: "Slow down and move over when passing stopped emergency or roadside vehicles with flashing lights", pa: "ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲੇ ਖੜ੍ਹੇ ਐਮਰਜੈਂਸੀ/ਸੜਕ ਕਿਨਾਰੇ ਵਾਹਨ ਕੋਲੋਂ ਲੰਘਦੇ ਸਮੇਂ ਹੌਲੀ ਕਰੋ ਤੇ ਹਟ ਕੇ ਲੰਘੋ" },
      { en: "School buses only", pa: "ਸਿਰਫ਼ ਸਕੂਲ ਬੱਸ" },
      { en: "Move to shoulder", pa: "ਸ਼ੋਲਡਰ ਤੇ ਜਾਓ" },
    ],
    correct: 1,
    explanation: { en: "BC's Slow Down Move Over law requires drivers to slow down and move over when passing emergency vehicles, tow trucks, or other roadside vehicles with flashing lights.", pa: "BC ਦੇ ਇਸ ਕਾਨੂੰਨ ਅਨੁਸਾਰ ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲੇ ਖੜ੍ਹੇ ਵਾਹਨਾਂ ਕੋਲੋਂ ਹੌਲੀ ਕਰ ਕੇ ਤੇ ਹਟ ਕੇ ਲੰਘੋ।" },
  },
];

/* For AB, SK, MB, QC: use a factory that copies common questions with province tweaks */
function makeGeneralQuestions(province: ProvinceKey): Question[] {
  if (province === "ON") return generalON;
  if (province === "BC") return generalBC;

  /* AB, SK, MB, QC share most of the same federal rules. Clone ON with minor province name swaps */
  const provinceNames: Record<string, Bilingual> = {
    AB: { en: "Alberta", pa: "ਅਲਬਰਟਾ" },
    SK: { en: "Saskatchewan", pa: "ਸਸਕੈਚਵਨ" },
    MB: { en: "Manitoba", pa: "ਮੈਨੀਟੋਬਾ" },
    QC: { en: "Quebec", pa: "ਕਿਊਬੈੱਕ" },
  };
  const pName = provinceNames[province] || provinceNames.AB;

  /* Province-specific first question */
  const agencyQ: Record<string, Question> = {
    AB: {
      q: { en: "Which department administers commercial vehicle licensing in Alberta?", pa: "ਅਲਬਰਟਾ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ ਕਿਹੜਾ ਵਿਭਾਗ ਸੰਭਾਲਦਾ ਹੈ?" },
      options: [
        { en: "Alberta Transportation and Economic Corridors", pa: "ਅਲਬਰਟਾ ਟਰਾਂਸਪੋਰਟੇਸ਼ਨ ਐਂਡ ਇਕਨੌਮਿਕ ਕੌਰੀਡੋਰਜ਼" },
        { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
        { en: "RCMP", pa: "RCMP" },
        { en: "Alberta Motor Association", pa: "ਅਲਬਰਟਾ ਮੋਟਰ ਐਸੋਸੀਏਸ਼ਨ" },
      ],
      correct: 0,
      explanation: { en: "Alberta Transportation and Economic Corridors administers commercial licensing and highway safety regulations.", pa: "ਅਲਬਰਟਾ ਟਰਾਂਸਪੋਰਟੇਸ਼ਨ ਕਮਰਸ਼ੀਅਲ ਲਾਇਸੈਂਸ ਤੇ ਹਾਈਵੇ ਸੇਫਟੀ ਨਿਯਮ ਸੰਭਾਲਦਾ ਹੈ।" },
    },
    SK: {
      q: { en: "Which agency administers commercial vehicle licensing in Saskatchewan?", pa: "ਸਸਕੈਚਵਨ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ ਕਿਹੜੀ ਏਜੰਸੀ ਸੰਭਾਲਦੀ ਹੈ?" },
      options: [
        { en: "SGI (Saskatchewan Government Insurance)", pa: "SGI (ਸਸਕੈਚਵਨ ਗਵਰਨਮੈਂਟ ਇੰਸ਼ੋਰੈਂਸ)" },
        { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
        { en: "Saskatchewan Highways", pa: "ਸਸਕੈਚਵਨ ਹਾਈਵੇਜ਼" },
        { en: "RCMP", pa: "RCMP" },
      ],
      correct: 0,
      explanation: { en: "SGI administers driver licensing and vehicle registration in Saskatchewan.", pa: "SGI ਸਸਕੈਚਵਨ ਵਿੱਚ ਡਰਾਈਵਰ ਲਾਇਸੈਂਸ ਤੇ ਵਾਹਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸੰਭਾਲਦੀ ਹੈ।" },
    },
    MB: {
      q: { en: "Which agency administers commercial vehicle licensing in Manitoba?", pa: "ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ ਕਿਹੜੀ ਏਜੰਸੀ ਸੰਭਾਲਦੀ ਹੈ?" },
      options: [
        { en: "MPI (Manitoba Public Insurance)", pa: "MPI (ਮੈਨੀਟੋਬਾ ਪਬਲਿਕ ਇੰਸ਼ੋਰੈਂਸ)" },
        { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
        { en: "Manitoba Highways", pa: "ਮੈਨੀਟੋਬਾ ਹਾਈਵੇਜ਼" },
        { en: "RCMP", pa: "RCMP" },
      ],
      correct: 0,
      explanation: { en: "MPI handles driver licensing and vehicle registration in Manitoba.", pa: "MPI ਮੈਨੀਟੋਬਾ ਵਿੱਚ ਡਰਾਈਵਰ ਲਾਇਸੈਂਸ ਤੇ ਵਾਹਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸੰਭਾਲਦੀ ਹੈ।" },
    },
    QC: {
      q: { en: "Which agency administers commercial vehicle licensing in Quebec?", pa: "ਕਿਊਬੈੱਕ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਾਇਸੈਂਸ ਕਿਹੜੀ ਏਜੰਸੀ ਸੰਭਾਲਦੀ ਹੈ?" },
      options: [
        { en: "SAAQ (Société de l'assurance automobile du Québec)", pa: "SAAQ (ਸੋਸਿਏਤੇ ਦੇ ਲ'ਅਸੂਰੌਂਸ ਔਟੋਮੋਬੀਲ ਦੂ ਕਿਊਬੈੱਕ)" },
        { en: "Transport Canada", pa: "ਟਰਾਂਸਪੋਰਟ ਕੈਨੇਡਾ" },
        { en: "Quebec Highways", pa: "ਕਿਊਬੈੱਕ ਹਾਈਵੇਜ਼" },
        { en: "Sûreté du Québec", pa: "ਸ਼ੁਰਤੇ ਦੂ ਕਿਊਬੈੱਕ" },
      ],
      correct: 0,
      explanation: { en: "SAAQ administers driver licensing, vehicle registration, and road safety in Quebec.", pa: "SAAQ ਕਿਊਬੈੱਕ ਵਿੱਚ ਡਰਾਈਵਰ ਲਾਇਸੈਂਸ, ਵਾਹਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਤੇ ਸੜਕ ਸੇਫਟੀ ਸੰਭਾਲਦੀ ਹੈ।" },
    },
  };

  /* Take common questions from ON (skip ON-specific ones at index 0,1,2,3,4,19) and prepend province agency Q */
  const common = generalON.filter((_, i) => i >= 5 && i <= 18);
  return [agencyQ[province] || agencyQ.AB, ...common].slice(0, 20);
}

/* === AIR BRAKES: 20 comprehensive questions === */
const airBrakesQuestions: Question[] = [
  {
    q: { en: "What is the function of the air compressor in an air brake system?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਏਅਰ ਕੰਪ੍ਰੈਸਰ ਦਾ ਕੰਮ ਕੀ ਹੈ?" },
    options: [
      { en: "Cool the brakes", pa: "ਬ੍ਰੇਕ ਠੰਡੇ ਕਰਨਾ" },
      { en: "Pump air into the storage tanks to provide the pressure needed to operate the brakes", pa: "ਸਟੋਰੇਜ ਟੈਂਕਾਂ ਵਿੱਚ ਹਵਾ ਭਰਨਾ ਜੋ ਬ੍ਰੇਕ ਚਲਾਉਣ ਲਈ ਦਬਾਅ ਦਿੰਦੀ ਹੈ" },
      { en: "Apply the parking brake", pa: "ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ ਲਗਾਉਣਾ" },
      { en: "Release the spring brakes", pa: "ਸਪਰਿੰਗ ਬ੍ਰੇਕ ਛੱਡਣਾ" },
    ],
    correct: 1,
    explanation: { en: "The air compressor is engine-driven and pumps air into the storage reservoirs, building the pressure needed to apply the service brakes.", pa: "ਏਅਰ ਕੰਪ੍ਰੈਸਰ ਇੰਜਣ ਨਾਲ ਚੱਲਦਾ ਹੈ ਤੇ ਸਟੋਰੇਜ ਟੈਂਕਾਂ ਵਿੱਚ ਹਵਾ ਭਰਦਾ ਹੈ ਜੋ ਸਰਵਿਸ ਬ੍ਰੇਕ ਲਗਾਉਣ ਲਈ ਲੋੜੀਂਦਾ ਦਬਾਅ ਬਣਾਉਂਦੀ ਹੈ।" },
  },
  {
    q: { en: "What does the governor do in an air brake system?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਗਵਰਨਰ ਕੀ ਕਰਦਾ ਹੈ?" },
    options: [
      { en: "Controls engine speed", pa: "ਇੰਜਣ ਦੀ ਸਪੀਡ ਕੰਟਰੋਲ ਕਰਦਾ" },
      { en: "Controls the air compressor cut-in and cut-out pressures to maintain proper system pressure", pa: "ਸਿਸਟਮ ਦਾ ਸਹੀ ਦਬਾਅ ਬਣਾਈ ਰੱਖਣ ਲਈ ਕੰਪ੍ਰੈਸਰ ਦੇ ਕੱਟ-ਇਨ ਤੇ ਕੱਟ-ਆਊਟ ਪ੍ਰੈਸ਼ਰ ਕੰਟਰੋਲ ਕਰਦਾ" },
      { en: "Applies the emergency brake", pa: "ਐਮਰਜੈਂਸੀ ਬ੍ਰੇਕ ਲਗਾਉਂਦਾ" },
      { en: "Drains moisture from the tanks", pa: "ਟੈਂਕਾਂ ਤੋਂ ਨਮੀ ਕੱਢਦਾ" },
    ],
    correct: 1,
    explanation: { en: "The governor controls the compressor. It cuts out (stops pumping) at 120-125 psi and cuts in (starts pumping) at about 100 psi.", pa: "ਗਵਰਨਰ ਕੰਪ੍ਰੈਸਰ ਨੂੰ ਕੰਟਰੋਲ ਕਰਦਾ ਹੈ। ਇਹ 120-125 psi ਤੇ ਬੰਦ ਹੁੰਦਾ (ਕੱਟ-ਆਊਟ) ਤੇ ਲਗਭਗ 100 psi ਤੇ ਚਾਲੂ ਹੁੰਦਾ (ਕੱਟ-ਇਨ)।" },
  },
  {
    q: { en: "What is the purpose of the air dryer in the air brake system?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਏਅਰ ਡ੍ਰਾਇਰ ਦਾ ਕੀ ਕੰਮ ਹੈ?" },
    options: [
      { en: "Increase air pressure", pa: "ਹਵਾ ਦਾ ਦਬਾਅ ਵਧਾਉਣਾ" },
      { en: "Remove moisture and contaminants from compressed air before it reaches the storage tanks", pa: "ਸਟੋਰੇਜ ਟੈਂਕਾਂ ਤੱਕ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਦੱਬੀ ਹਵਾ ਵਿੱਚੋਂ ਨਮੀ ਤੇ ਗੰਦਗੀ ਕੱਢਣਾ" },
      { en: "Cool the brakes during use", pa: "ਵਰਤੋਂ ਦੌਰਾਨ ਬ੍ਰੇਕ ਠੰਡੇ ਕਰਨਾ" },
      { en: "Lubricate the compressor", pa: "ਕੰਪ੍ਰੈਸਰ ਨੂੰ ਲੁਬਰੀਕੇਟ ਕਰਨਾ" },
    ],
    correct: 1,
    explanation: { en: "The air dryer removes moisture, oil, and contaminants from compressed air. Moisture in the system can freeze in winter and cause brake failure.", pa: "ਏਅਰ ਡ੍ਰਾਇਰ ਦੱਬੀ ਹਵਾ ਵਿੱਚੋਂ ਨਮੀ, ਤੇਲ ਤੇ ਗੰਦਗੀ ਕੱਢਦਾ ਹੈ। ਸਿਸਟਮ ਵਿੱਚ ਨਮੀ ਸਰਦੀਆਂ ਵਿੱਚ ਜੰਮ ਕੇ ਬ੍ਰੇਕ ਫੇਲ੍ਹ ਕਰ ਸਕਦੀ ਹੈ।" },
  },
  {
    q: { en: "What are the air reservoirs (tanks) in an air brake system used for?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਏਅਰ ਟੈਂਕ ਕਿਸ ਲਈ ਹਨ?" },
    options: [
      { en: "Cooling the engine", pa: "ਇੰਜਣ ਠੰਡਾ ਕਰਨ ਲਈ" },
      { en: "Storing compressed air so the brakes can be applied even if the compressor stops working temporarily", pa: "ਦੱਬੀ ਹਵਾ ਸਟੋਰ ਕਰਨ ਲਈ ਤਾਂ ਜੋ ਕੰਪ੍ਰੈਸਰ ਅਸਥਾਈ ਤੌਰ ਤੇ ਬੰਦ ਹੋ ਜਾਵੇ ਤਾਂ ਵੀ ਬ੍ਰੇਕ ਲੱਗ ਸਕਣ" },
      { en: "Mixing fuel and air", pa: "ਬਾਲਣ ਤੇ ਹਵਾ ਮਿਲਾਉਣ ਲਈ" },
      { en: "Storing brake fluid", pa: "ਬ੍ਰੇਕ ਤਰਲ ਸਟੋਰ ਕਰਨ ਲਈ" },
    ],
    correct: 1,
    explanation: { en: "Air reservoirs store compressed air. This reserve allows multiple brake applications even if the compressor temporarily fails. They also help cool the air and collect moisture.", pa: "ਏਅਰ ਟੈਂਕ ਦੱਬੀ ਹਵਾ ਸਟੋਰ ਕਰਦੇ ਹਨ। ਇਹ ਰਿਜ਼ਰਵ ਕੰਪ੍ਰੈਸਰ ਬੰਦ ਹੋਣ ਤੇ ਵੀ ਕਈ ਵਾਰ ਬ੍ਰੇਕ ਲਗਾਉਣ ਦਿੰਦੀ ਹੈ। ਇਹ ਹਵਾ ਠੰਡੀ ਕਰਨ ਤੇ ਨਮੀ ਇਕੱਠੀ ਕਰਨ ਵਿੱਚ ਵੀ ਮਦਦ ਕਰਦੇ ਹਨ।" },
  },
  {
    q: { en: "What is the function of the brake chamber in an air brake system?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਬ੍ਰੇਕ ਚੈਂਬਰ ਦਾ ਕੀ ਕੰਮ ਹੈ?" },
    options: [
      { en: "Store compressed air", pa: "ਦੱਬੀ ਹਵਾ ਸਟੋਰ ਕਰਨਾ" },
      { en: "Convert air pressure into mechanical force that pushes the pushrod to apply the brakes", pa: "ਹਵਾ ਦੇ ਦਬਾਅ ਨੂੰ ਮਕੈਨੀਕਲ ਤਾਕਤ ਵਿੱਚ ਬਦਲਣਾ ਜੋ ਪੁਸ਼ਰਾਡ ਧੱਕ ਕੇ ਬ੍ਰੇਕ ਲਗਾਉਂਦੀ ਹੈ" },
      { en: "Filter the air", pa: "ਹਵਾ ਫਿਲਟਰ ਕਰਨਾ" },
      { en: "Control the governor", pa: "ਗਵਰਨਰ ਕੰਟਰੋਲ ਕਰਨਾ" },
    ],
    correct: 1,
    explanation: { en: "The brake chamber contains a diaphragm that converts air pressure into mechanical force. This pushes the pushrod outward to apply the brakes through the slack adjuster and S-cam.", pa: "ਬ੍ਰੇਕ ਚੈਂਬਰ ਵਿੱਚ ਇੱਕ ਡਾਇਆਫ੍ਰਾਮ ਹੈ ਜੋ ਹਵਾ ਦੇ ਦਬਾਅ ਨੂੰ ਮਕੈਨੀਕਲ ਤਾਕਤ ਵਿੱਚ ਬਦਲਦਾ ਹੈ। ਇਹ ਪੁਸ਼ਰਾਡ ਨੂੰ ਬਾਹਰ ਧੱਕਦਾ ਹੈ ਜੋ ਸਲੈਕ ਅਡਜਸਟਰ ਤੇ S-ਕੈਮ ਰਾਹੀਂ ਬ੍ਰੇਕ ਲਗਾਉਂਦਾ ਹੈ।" },
  },
  {
    q: { en: "What is the role of the slack adjuster?", pa: "ਸਲੈਕ ਅਡਜਸਟਰ ਦਾ ਕੀ ਕੰਮ ਹੈ?" },
    options: [
      { en: "Adjusts the engine speed", pa: "ਇੰਜਣ ਦੀ ਸਪੀਡ ਐਡਜਸਟ ਕਰਦਾ" },
      { en: "Converts the pushrod's linear motion into rotational force to turn the S-cam and adjusts brake shoe clearance", pa: "ਪੁਸ਼ਰਾਡ ਦੀ ਸਿੱਧੀ ਗਤੀ ਨੂੰ ਘੁੰਮਣ ਵਾਲੀ ਤਾਕਤ ਵਿੱਚ ਬਦਲਦਾ ਹੈ ਤੇ ਬ੍ਰੇਕ ਸ਼ੂ ਦੀ ਦੂਰੀ ਐਡਜਸਟ ਕਰਦਾ" },
      { en: "Releases the parking brake", pa: "ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ ਛੱਡਦਾ" },
      { en: "Controls the air dryer", pa: "ਏਅਰ ਡ੍ਰਾਇਰ ਕੰਟਰੋਲ ਕਰਦਾ" },
    ],
    correct: 1,
    explanation: { en: "The slack adjuster is a lever that connects the pushrod to the S-cam shaft. It converts linear motion to rotational motion and maintains proper brake adjustment.", pa: "ਸਲੈਕ ਅਡਜਸਟਰ ਇੱਕ ਲੀਵਰ ਹੈ ਜੋ ਪੁਸ਼ਰਾਡ ਨੂੰ S-ਕੈਮ ਸ਼ਾਫ਼ਟ ਨਾਲ ਜੋੜਦਾ ਹੈ। ਇਹ ਸਿੱਧੀ ਗਤੀ ਨੂੰ ਘੁੰਮਣ ਵਾਲੀ ਗਤੀ ਵਿੱਚ ਬਦਲਦਾ ਹੈ ਤੇ ਸਹੀ ਬ੍ਰੇਕ ਐਡਜਸਟਮੈਂਟ ਬਣਾਈ ਰੱਖਦਾ ਹੈ।" },
  },
  {
    q: { en: "What does the S-cam do when the brakes are applied?", pa: "ਬ੍ਰੇਕ ਲਗਾਉਣ ਤੇ S-ਕੈਮ ਕੀ ਕਰਦਾ ਹੈ?" },
    options: [
      { en: "Pumps air into the system", pa: "ਸਿਸਟਮ ਵਿੱਚ ਹਵਾ ਭਰਦਾ" },
      { en: "Rotates and pushes the brake shoes outward against the brake drum to create friction", pa: "ਘੁੰਮਦਾ ਹੈ ਤੇ ਬ੍ਰੇਕ ਸ਼ੂ ਨੂੰ ਬਾਹਰ ਵੱਲ ਬ੍ਰੇਕ ਡਰੱਮ ਨਾਲ ਦਬਾਉਂਦਾ ਹੈ ਤਾਂ ਜੋ ਰਗੜ ਪੈਦਾ ਹੋਵੇ" },
      { en: "Releases the spring brake", pa: "ਸਪਰਿੰਗ ਬ੍ਰੇਕ ਛੱਡਦਾ" },
      { en: "Adjusts the governor setting", pa: "ਗਵਰਨਰ ਦੀ ਸੈਟਿੰਗ ਐਡਜਸਟ ਕਰਦਾ" },
    ],
    correct: 1,
    explanation: { en: "The S-cam (named for its S-shape) rotates when the slack adjuster turns it, forcing the brake shoes outward against the drum to create the friction that slows the wheel.", pa: "S-ਕੈਮ (S-ਸ਼ਕਲ ਕਰਕੇ ਨਾਮ) ਘੁੰਮਦਾ ਹੈ ਜਦੋਂ ਸਲੈਕ ਅਡਜਸਟਰ ਇਸਨੂੰ ਮੋੜਦਾ ਹੈ, ਬ੍ਰੇਕ ਸ਼ੂ ਨੂੰ ਡਰੱਮ ਨਾਲ ਦਬਾ ਕੇ ਰਗੜ ਪੈਦਾ ਕਰਦਾ ਹੈ ਜੋ ਪਹੀਆ ਹੌਲੀ ਕਰਦੀ ਹੈ।" },
  },
  {
    q: { en: "At what air pressure does the governor typically cut out (stop the compressor)?", pa: "ਗਵਰਨਰ ਆਮ ਤੌਰ ਤੇ ਕਿੰਨੇ ਦਬਾਅ ਤੇ ਕੰਪ੍ਰੈਸਰ ਬੰਦ ਕਰਦਾ ਹੈ (ਕੱਟ-ਆਊਟ)?" },
    options: [
      { en: "80-90 psi", pa: "80-90 psi" },
      { en: "100-110 psi", pa: "100-110 psi" },
      { en: "120-125 psi", pa: "120-125 psi" },
      { en: "150 psi", pa: "150 psi" },
    ],
    correct: 2,
    explanation: { en: "The governor typically cuts out at 120-125 psi, stopping the compressor from pumping more air. It cuts back in at about 100 psi.", pa: "ਗਵਰਨਰ ਆਮ ਤੌਰ ਤੇ 120-125 psi ਤੇ ਕੱਟ-ਆਊਟ ਕਰਦਾ ਹੈ ਤੇ ਕੰਪ੍ਰੈਸਰ ਬੰਦ ਕਰਦਾ ਹੈ। ਇਹ ਲਗਭਗ 100 psi ਤੇ ਦੁਬਾਰਾ ਚਾਲੂ ਹੁੰਦਾ।" },
  },
  {
    q: { en: "At what pressure does the governor cut in (restart the compressor)?", pa: "ਗਵਰਨਰ ਕਿੰਨੇ ਦਬਾਅ ਤੇ ਕੰਪ੍ਰੈਸਰ ਦੁਬਾਰਾ ਚਾਲੂ ਕਰਦਾ ਹੈ (ਕੱਟ-ਇਨ)?" },
    options: [
      { en: "55 psi", pa: "55 psi" },
      { en: "80 psi", pa: "80 psi" },
      { en: "100 psi", pa: "100 psi" },
      { en: "120 psi", pa: "120 psi" },
    ],
    correct: 2,
    explanation: { en: "The governor cuts in at about 100 psi, restarting the compressor to rebuild pressure. The 20-25 psi range between cut-in and cut-out is normal.", pa: "ਗਵਰਨਰ ਲਗਭਗ 100 psi ਤੇ ਕੱਟ-ਇਨ ਕਰਦਾ ਹੈ ਤੇ ਦਬਾਅ ਬਣਾਉਣ ਲਈ ਕੰਪ੍ਰੈਸਰ ਚਾਲੂ ਕਰਦਾ ਹੈ। ਕੱਟ-ਇਨ ਤੇ ਕੱਟ-ਆਊਟ ਵਿੱਚ 20-25 psi ਦਾ ਫ਼ਰਕ ਆਮ ਹੈ।" },
  },
  {
    q: { en: "At what pressure does the low air pressure warning activate?", pa: "ਘੱਟ ਹਵਾ ਦੇ ਦਬਾਅ ਦੀ ਚੇਤਾਵਨੀ ਕਿੰਨੇ psi ਤੇ ਚਾਲੂ ਹੁੰਦੀ ਹੈ?" },
    options: [
      { en: "20 psi", pa: "20 psi" },
      { en: "40 psi", pa: "40 psi" },
      { en: "55 psi", pa: "55 psi" },
      { en: "80 psi", pa: "80 psi" },
    ],
    correct: 2,
    explanation: { en: "The low air pressure warning (buzzer and/or light) must activate before pressure drops below 55 psi. If this comes on while driving, pull over safely immediately.", pa: "ਘੱਟ ਹਵਾ ਦੇ ਦਬਾਅ ਦੀ ਚੇਤਾਵਨੀ (ਬਜ਼ਰ/ਲਾਈਟ) 55 psi ਤੋਂ ਘੱਟ ਹੋਣ ਤੋਂ ਪਹਿਲਾਂ ਚਾਲੂ ਹੋਣੀ ਚਾਹੀਦੀ। ਜੇ ਡਰਾਈਵਿੰਗ ਦੌਰਾਨ ਵੱਜੇ ਤਾਂ ਤੁਰੰਤ ਸੁਰੱਖਿਅਤ ਥਾਂ ਰੁਕੋ।" },
  },
  {
    q: { en: "At what pressure range do spring brakes (parking brakes) automatically apply?", pa: "ਸਪਰਿੰਗ ਬ੍ਰੇਕ (ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ) ਕਿੰਨੇ ਦਬਾਅ ਤੇ ਆਪਣੇ-ਆਪ ਲੱਗ ਜਾਂਦੇ ਹਨ?" },
    options: [
      { en: "55-60 psi", pa: "55-60 psi" },
      { en: "20-45 psi", pa: "20-45 psi" },
      { en: "80-100 psi", pa: "80-100 psi" },
      { en: "10 psi", pa: "10 psi" },
    ],
    correct: 1,
    explanation: { en: "Spring brakes automatically apply when air pressure falls to 20-45 psi. The powerful springs inside the brake chamber engage the brakes mechanically, independent of air pressure.", pa: "ਸਪਰਿੰਗ ਬ੍ਰੇਕ ਆਪਣੇ-ਆਪ ਲੱਗ ਜਾਂਦੇ ਹਨ ਜਦੋਂ ਹਵਾ ਦਾ ਦਬਾਅ 20-45 psi ਤੱਕ ਡਿੱਗ ਜਾਵੇ। ਬ੍ਰੇਕ ਚੈਂਬਰ ਅੰਦਰ ਤਾਕਤਵਰ ਸਪਰਿੰਗ ਬ੍ਰੇਕ ਨੂੰ ਮਕੈਨੀਕਲੀ ਲਗਾ ਦਿੰਦੇ ਹਨ।" },
  },
  {
    q: { en: "What is air brake lag time?", pa: "ਏਅਰ ਬ੍ਰੇਕ ਲੈਗ ਟਾਈਮ ਕੀ ਹੈ?" },
    options: [
      { en: "Time to build full air pressure from zero", pa: "ਜ਼ੀਰੋ ਤੋਂ ਪੂਰਾ ਦਬਾਅ ਬਣਾਉਣ ਦਾ ਸਮਾਂ" },
      { en: "The delay (about 0.4 seconds) between pressing the brake pedal and the brakes actually engaging at the wheels", pa: "ਬ੍ਰੇਕ ਪੈਡਲ ਦੱਬਣ ਤੇ ਪਹੀਆਂ ਤੇ ਬ੍ਰੇਕ ਅਸਲ ਵਿੱਚ ਲੱਗਣ ਵਿਚਕਾਰ ਦੇਰੀ (ਲਗਭਗ 0.4 ਸਕਿੰਟ)" },
      { en: "The time to drain the air tanks", pa: "ਏਅਰ ਟੈਂਕ ਖਾਲੀ ਕਰਨ ਦਾ ਸਮਾਂ" },
      { en: "The time the compressor takes to restart", pa: "ਕੰਪ੍ਰੈਸਰ ਦੁਬਾਰਾ ਚਾਲੂ ਹੋਣ ਦਾ ਸਮਾਂ" },
    ],
    correct: 1,
    explanation: { en: "Air brake lag time is the approximately 0.4 second delay for air to travel through the lines from the brake valve to the brake chambers. This adds about 32 feet of stopping distance at 55 mph compared to hydraulic brakes.", pa: "ਏਅਰ ਬ੍ਰੇਕ ਲੈਗ ਟਾਈਮ ਲਗਭਗ 0.4 ਸਕਿੰਟ ਦੀ ਦੇਰੀ ਹੈ ਜਦੋਂ ਹਵਾ ਬ੍ਰੇਕ ਵਾਲਵ ਤੋਂ ਬ੍ਰੇਕ ਚੈਂਬਰ ਤੱਕ ਪਹੁੰਚਦੀ ਹੈ। ਇਹ 55 mph ਤੇ ਹਾਈਡ੍ਰੌਲਿਕ ਬ੍ਰੇਕ ਨਾਲੋਂ ਲਗਭਗ 32 ਫੁੱਟ ਵਧੇਰੇ ਰੁਕਣ ਦੀ ਦੂਰੀ ਜੋੜਦਾ ਹੈ।" },
  },
  {
    q: { en: "What causes brake fade?", pa: "ਬ੍ਰੇਕ ਫੇਡ ਕਿਸ ਕਰਕੇ ਹੁੰਦੀ ਹੈ?" },
    options: [
      { en: "Cold brakes", pa: "ਠੰਡੇ ਬ੍ਰੇਕ" },
      { en: "Excessive heat from overuse. Brakes lose friction and stopping ability", pa: "ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਨਾਲ ਬਹੁਤ ਗਰਮੀ। ਬ੍ਰੇਕ ਰਗੜ ਤੇ ਰੁਕਣ ਦੀ ਸਮਰੱਥਾ ਗੁਆ ਲੈਂਦੇ" },
      { en: "Too much air pressure", pa: "ਬਹੁਤ ਜ਼ਿਆਦਾ ਹਵਾ ਦਾ ਦਬਾਅ" },
      { en: "Wet brake drums", pa: "ਗਿੱਲੇ ਬ੍ਰੇਕ ਡਰੱਮ" },
    ],
    correct: 1,
    explanation: { en: "Brake fade occurs when brakes overheat from excessive use (like riding the brakes on a long downgrade). The brake drums expand and shoes can't make full contact, drastically reducing braking power.", pa: "ਬ੍ਰੇਕ ਫੇਡ ਉਦੋਂ ਹੁੰਦੀ ਹੈ ਜਦੋਂ ਬ੍ਰੇਕ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਨਾਲ ਬਹੁਤ ਗਰਮ ਹੋ ਜਾਂਦੇ ਹਨ। ਡਰੱਮ ਫੈਲ ਜਾਂਦੇ ਹਨ ਤੇ ਸ਼ੂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਨਹੀਂ ਲੱਗਦੇ, ਬ੍ਰੇਕ ਦੀ ਤਾਕਤ ਬਹੁਤ ਘਟ ਜਾਂਦੀ ਹੈ।" },
  },
  {
    q: { en: "What is the difference between service brakes and emergency/parking brakes?", pa: "ਸਰਵਿਸ ਬ੍ਰੇਕ ਤੇ ਐਮਰਜੈਂਸੀ/ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ ਵਿੱਚ ਕੀ ਫ਼ਰਕ ਹੈ?" },
    options: [
      { en: "They are the same thing", pa: "ਇਹ ਇੱਕੋ ਚੀਜ਼ ਹਨ" },
      { en: "Service brakes use air pressure to stop; emergency/parking brakes use spring force when air is released", pa: "ਸਰਵਿਸ ਬ੍ਰੇਕ ਰੁਕਣ ਲਈ ਹਵਾ ਦਾ ਦਬਾਅ ਵਰਤਦੇ; ਐਮਰਜੈਂਸੀ/ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ ਹਵਾ ਛੱਡਣ ਤੇ ਸਪਰਿੰਗ ਦੀ ਤਾਕਤ ਵਰਤਦੇ" },
      { en: "Emergency brakes only work above 60 km/h", pa: "ਐਮਰਜੈਂਸੀ ਬ੍ਰੇਕ ਸਿਰਫ਼ 60 km/h ਤੋਂ ਵੱਧ ਤੇ ਕੰਮ ਕਰਦੇ" },
      { en: "Service brakes are on the trailer only", pa: "ਸਰਵਿਸ ਬ੍ਰੇਕ ਸਿਰਫ਼ ਟ੍ਰੇਲਰ ਤੇ ਹਨ" },
    ],
    correct: 1,
    explanation: { en: "Service brakes use air pressure applied by the foot pedal. Emergency/parking brakes use powerful springs that engage when air pressure is released. They work even with zero air.", pa: "ਸਰਵਿਸ ਬ੍ਰੇਕ ਪੈਰ ਨਾਲ ਦੱਬੇ ਪੈਡਲ ਰਾਹੀਂ ਹਵਾ ਦਾ ਦਬਾਅ ਵਰਤਦੇ ਹਨ। ਐਮਰਜੈਂਸੀ/ਪਾਰਕਿੰਗ ਬ੍ਰੇਕ ਤਾਕਤਵਰ ਸਪਰਿੰਗ ਵਰਤਦੇ ਹਨ ਜੋ ਹਵਾ ਛੱਡਣ ਤੇ ਲੱਗ ਜਾਂਦੇ ਹਨ। ਇਹ ਜ਼ੀਰੋ ਹਵਾ ਤੇ ਵੀ ਕੰਮ ਕਰਦੇ ਹਨ।" },
  },
  {
    q: { en: "How should air tanks be drained?", pa: "ਏਅਰ ਟੈਂਕ ਕਿਵੇਂ ਖਾਲੀ ਕਰਨੇ ਚਾਹੀਦੇ ਹਨ?" },
    options: [
      { en: "Never. They are sealed units", pa: "ਕਦੇ ਨਹੀਂ। ਇਹ ਸੀਲ ਯੂਨਿਟ ਹਨ" },
      { en: "Daily if equipped with manual drains; automatic drains also need periodic checks", pa: "ਜੇ ਮੈਨੂਅਲ ਡ੍ਰੇਨ ਹੋਣ ਤਾਂ ਰੋਜ਼; ਆਟੋਮੈਟਿਕ ਡ੍ਰੇਨ ਦੀ ਵੀ ਸਮੇਂ-ਸਮੇਂ ਜਾਂਚ ਕਰੋ" },
      { en: "Once a month only", pa: "ਮਹੀਨੇ ਵਿੱਚ ਸਿਰਫ਼ ਇੱਕ ਵਾਰ" },
      { en: "Only during annual inspection", pa: "ਸਿਰਫ਼ ਸਾਲਾਨਾ ਜਾਂਚ ਦੌਰਾਨ" },
    ],
    correct: 1,
    explanation: { en: "Manual drain valves should be drained daily to remove water and oil buildup. Even with automatic drains or air dryers, periodic manual checks are essential to prevent freeze-ups in winter.", pa: "ਮੈਨੂਅਲ ਡ੍ਰੇਨ ਵਾਲਵ ਰੋਜ਼ ਖੋਲ੍ਹ ਕੇ ਪਾਣੀ ਤੇ ਤੇਲ ਕੱਢੋ। ਆਟੋਮੈਟਿਕ ਡ੍ਰੇਨ ਜਾਂ ਏਅਰ ਡ੍ਰਾਇਰ ਹੋਣ ਤੇ ਵੀ ਸਮੇਂ-ਸਮੇਂ ਮੈਨੂਅਲ ਜਾਂਚ ਜ਼ਰੂਰੀ ਹੈ ਤਾਂ ਜੋ ਸਰਦੀਆਂ ਵਿੱਚ ਜੰਮਣ ਤੋਂ ਬਚਿਆ ਜਾ ਸਕੇ।" },
  },
  {
    q: { en: "What is a dual air brake system?", pa: "ਡੁਅਲ ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਕੀ ਹੈ?" },
    options: [
      { en: "Two separate brake pedals", pa: "ਦੋ ਵੱਖਰੇ ਬ੍ਰੇਕ ਪੈਡਲ" },
      { en: "Two independent air circuits (primary and secondary) so if one fails, the other still provides braking", pa: "ਦੋ ਸੁਤੰਤਰ ਏਅਰ ਸਰਕਟ (ਪ੍ਰਾਇਮਰੀ ਤੇ ਸੈਕੰਡਰੀ) ਤਾਂ ਜੋ ਇੱਕ ਫੇਲ੍ਹ ਹੋਵੇ ਤਾਂ ਦੂਜਾ ਬ੍ਰੇਕ ਦੇਵੇ" },
      { en: "Brakes on both axles", pa: "ਦੋਵੇਂ ਐਕਸਲਾਂ ਤੇ ਬ੍ਰੇਕ" },
      { en: "Air brakes plus hydraulic brakes together", pa: "ਏਅਰ ਬ੍ਰੇਕ ਤੇ ਹਾਈਡ੍ਰੌਲਿਕ ਬ੍ਰੇਕ ਇਕੱਠੇ" },
    ],
    correct: 1,
    explanation: { en: "A dual air brake system has two independent air circuits. The primary circuit typically operates the rear brakes and the secondary operates the front. If one circuit fails or leaks, the other still provides braking.", pa: "ਡੁਅਲ ਏਅਰ ਬ੍ਰੇਕ ਸਿਸਟਮ ਵਿੱਚ ਦੋ ਸੁਤੰਤਰ ਏਅਰ ਸਰਕਟ ਹਨ। ਪ੍ਰਾਇਮਰੀ ਆਮ ਤੌਰ ਤੇ ਪਿਛਲੇ ਬ੍ਰੇਕ ਚਲਾਉਂਦਾ ਹੈ ਤੇ ਸੈਕੰਡਰੀ ਅਗਲੇ। ਜੇ ਇੱਕ ਫੇਲ੍ਹ ਹੋਵੇ ਤਾਂ ਦੂਜਾ ਬ੍ਰੇਕ ਦਿੰਦਾ ਹੈ।" },
  },
  {
    q: { en: "During a pre-trip air brake inspection, what is the maximum allowable pushrod stroke (applied stroke) for most brake chambers?", pa: "ਪ੍ਰੀ-ਟ੍ਰਿਪ ਏਅਰ ਬ੍ਰੇਕ ਜਾਂਚ ਦੌਰਾਨ, ਜ਼ਿਆਦਾਤਰ ਬ੍ਰੇਕ ਚੈਂਬਰਾਂ ਲਈ ਪੁਸ਼ਰਾਡ ਸਟ੍ਰੋਕ ਦੀ ਵੱਧ ਤੋਂ ਵੱਧ ਹੱਦ ਕੀ ਹੈ?" },
    options: [
      { en: "1/2 inch", pa: "1/2 ਇੰਚ" },
      { en: "Depends on chamber size, typically 1.5 to 2 inches (check the data tag)", pa: "ਚੈਂਬਰ ਸਾਈਜ਼ ਤੇ ਨਿਰਭਰ, ਆਮ ਤੌਰ ਤੇ 1.5 ਤੋਂ 2 ਇੰਚ (ਡੇਟਾ ਟੈਗ ਚੈੱਕ ਕਰੋ)" },
      { en: "3 inches for all types", pa: "ਸਾਰੀਆਂ ਕਿਸਮਾਂ ਲਈ 3 ਇੰਚ" },
      { en: "There is no limit", pa: "ਕੋਈ ਹੱਦ ਨਹੀਂ" },
    ],
    correct: 1,
    explanation: { en: "Maximum pushrod travel depends on the brake chamber size (Type 20, 24, 30, etc.). Generally 1.5-2 inches. Exceeding the limit means brakes are out of adjustment. That is a major safety defect.", pa: "ਪੁਸ਼ਰਾਡ ਟ੍ਰੈਵਲ ਬ੍ਰੇਕ ਚੈਂਬਰ ਸਾਈਜ਼ ਤੇ ਨਿਰਭਰ ਹੈ (ਟਾਈਪ 20, 24, 30 ਆਦਿ)। ਆਮ ਤੌਰ ਤੇ 1.5-2 ਇੰਚ। ਹੱਦ ਤੋਂ ਵੱਧ ਮਤਲਬ ਬ੍ਰੇਕ ਐਡਜਸਟਮੈਂਟ ਤੋਂ ਬਾਹਰ ਹਨ। ਵੱਡਾ ਸੇਫਟੀ ਨੁਕਸ।" },
  },
  {
    q: { en: "What is the maximum allowable air loss rate with brakes fully applied (engine off)?", pa: "ਬ੍ਰੇਕ ਪੂਰੇ ਲੱਗੇ ਹੋਣ ਤੇ (ਇੰਜਣ ਬੰਦ) ਹਵਾ ਦੇ ਲੀਕ ਹੋਣ ਦੀ ਵੱਧ ਤੋਂ ਵੱਧ ਦਰ ਕੀ ਹੈ?" },
    options: [
      { en: "1 psi per minute", pa: "1 psi ਪ੍ਰਤੀ ਮਿੰਟ" },
      { en: "3 psi per minute for a single vehicle; 4 psi for a combination", pa: "ਸਿੰਗਲ ਵਾਹਨ ਲਈ 3 psi ਪ੍ਰਤੀ ਮਿੰਟ; ਕੰਬੀਨੇਸ਼ਨ ਲਈ 4 psi" },
      { en: "5 psi per minute", pa: "5 psi ਪ੍ਰਤੀ ਮਿੰਟ" },
      { en: "10 psi per minute", pa: "10 psi ਪ੍ਰਤੀ ਮਿੰਟ" },
    ],
    correct: 1,
    explanation: { en: "With brakes fully applied and engine off, air loss must not exceed 3 psi in 1 minute for a single vehicle, or 4 psi for a combination vehicle. Greater loss indicates a dangerous leak.", pa: "ਬ੍ਰੇਕ ਪੂਰੇ ਲੱਗੇ ਤੇ ਇੰਜਣ ਬੰਦ ਹੋਣ ਤੇ, ਹਵਾ ਦਾ ਲੀਕ 1 ਮਿੰਟ ਵਿੱਚ ਸਿੰਗਲ ਵਾਹਨ ਲਈ 3 psi ਤੋਂ ਵੱਧ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ, ਜਾਂ ਕੰਬੀਨੇਸ਼ਨ ਲਈ 4 psi। ਵੱਧ ਲੀਕ ਖ਼ਤਰਨਾਕ ਹੈ।" },
  },
  {
    q: { en: "What are signs that brakes are out of adjustment?", pa: "ਬ੍ਰੇਕ ਐਡਜਸਟਮੈਂਟ ਤੋਂ ਬਾਹਰ ਹੋਣ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ ਕੀ ਹਨ?" },
    options: [
      { en: "Brakes feel normal", pa: "ਬ੍ਰੇਕ ਆਮ ਮਹਿਸੂਸ ਹੁੰਦੇ" },
      { en: "Excessive pushrod travel, vehicle pulls to one side, longer stopping distance, or brake drum is very hot after driving", pa: "ਪੁਸ਼ਰਾਡ ਬਹੁਤ ਵੱਧ ਜਾਂਦਾ, ਵਾਹਨ ਇੱਕ ਪਾਸੇ ਖਿੱਚਦਾ, ਰੁਕਣ ਦੀ ਦੂਰੀ ਵਧਦੀ, ਜਾਂ ਡਰੱਮ ਡਰਾਈਵਿੰਗ ਬਾਅਦ ਬਹੁਤ ਗਰਮ" },
      { en: "Engine runs louder", pa: "ਇੰਜਣ ਉੱਚੀ ਚੱਲਦਾ" },
      { en: "Steering becomes lighter", pa: "ਸਟੀਅਰਿੰਗ ਹਲਕੀ ਹੋ ਜਾਂਦੀ" },
    ],
    correct: 1,
    explanation: { en: "Out-of-adjustment signs: pushrod travel exceeds limits, vehicle pulls to one side during braking, stopping distance increases, one drum is much hotter than others, or air pressure drops rapidly.", pa: "ਐਡਜਸਟਮੈਂਟ ਤੋਂ ਬਾਹਰ ਹੋਣ ਦੀਆਂ ਨਿਸ਼ਾਨੀਆਂ: ਪੁਸ਼ਰਾਡ ਹੱਦ ਤੋਂ ਵੱਧ, ਬ੍ਰੇਕ ਲਗਾਉਣ ਤੇ ਵਾਹਨ ਇੱਕ ਪਾਸੇ ਖਿੱਚਣਾ, ਰੁਕਣ ਦੀ ਦੂਰੀ ਵਧਣਾ, ਇੱਕ ਡਰੱਮ ਦੂਜਿਆਂ ਨਾਲੋਂ ਬਹੁਤ ਗਰਮ।" },
  },
  {
    q: { en: "What is the minimum air pressure at which you should start driving?", pa: "ਗੱਡੀ ਚਲਾਉਣੀ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਹਵਾ ਦਾ ਦਬਾਅ ਕਿੰਨਾ ਹੋਣਾ ਚਾਹੀਦਾ?" },
    options: [
      { en: "55 psi", pa: "55 psi" },
      { en: "At least 100 psi (full system pressure)", pa: "ਘੱਟੋ-ਘੱਟ 100 psi (ਪੂਰਾ ਸਿਸਟਮ ਦਬਾਅ)" },
      { en: "80 psi", pa: "80 psi" },
      { en: "60 psi", pa: "60 psi" },
    ],
    correct: 1,
    explanation: { en: "Never drive until the air system has built to at least full operating pressure (typically 100+ psi, where the governor cuts in). Driving with low pressure means inadequate braking and risk of spring brake engagement.", pa: "ਜਦੋਂ ਤੱਕ ਏਅਰ ਸਿਸਟਮ ਪੂਰੇ ਓਪਰੇਟਿੰਗ ਦਬਾਅ (ਆਮ ਤੌਰ ਤੇ 100+ psi) ਤੱਕ ਨਾ ਪਹੁੰਚ ਜਾਵੇ ਕਦੇ ਨਾ ਚਲਾਓ। ਘੱਟ ਦਬਾਅ ਨਾਲ ਬ੍ਰੇਕ ਕਮਜ਼ੋਰ ਤੇ ਸਪਰਿੰਗ ਬ੍ਰੇਕ ਲੱਗਣ ਦਾ ਖ਼ਤਰਾ।" },
  },
];

/* === HOURS OF SERVICE: 10 questions (federal, same across provinces) === */
const hosQuestions: Question[] = [
  {
    q: { en: "What is the maximum driving time allowed per day under Canadian HOS rules?", pa: "ਕੈਨੇਡੀਅਨ HOS ਨਿਯਮਾਂ ਅਧੀਨ ਪ੍ਰਤੀ ਦਿਨ ਵੱਧ ਤੋਂ ਵੱਧ ਕਿੰਨੇ ਘੰਟੇ ਡਰਾਈਵ ਕਰ ਸਕਦੇ ਹੋ?" },
    options: [
      { en: "10 hours", pa: "10 ਘੰਟੇ" },
      { en: "11 hours", pa: "11 ਘੰਟੇ" },
      { en: "13 hours", pa: "13 ਘੰਟੇ" },
      { en: "14 hours", pa: "14 ਘੰਟੇ" },
    ],
    correct: 2,
    explanation: { en: "Under Canadian federal HOS, the maximum driving time is 13 hours per day, within a 14-hour on-duty window.", pa: "ਕੈਨੇਡੀਅਨ ਫੈਡਰਲ HOS ਅਧੀਨ ਵੱਧ ਤੋਂ ਵੱਧ ਡਰਾਈਵਿੰਗ ਸਮਾਂ 13 ਘੰਟੇ ਪ੍ਰਤੀ ਦਿਨ ਹੈ, 14-ਘੰਟੇ ਡਿਊਟੀ ਵਿੰਡੋ ਵਿੱਚ।" },
  },
  {
    q: { en: "Under Cycle 1, how many on-duty hours are allowed in 7 days?", pa: "ਸਾਈਕਲ 1 ਅਧੀਨ 7 ਦਿਨਾਂ ਵਿੱਚ ਕਿੰਨੇ ਡਿਊਟੀ ਘੰਟੇ ਮਨਜ਼ੂਰ ਹਨ?" },
    options: [
      { en: "60 hours", pa: "60 ਘੰਟੇ" },
      { en: "70 hours", pa: "70 ਘੰਟੇ" },
      { en: "80 hours", pa: "80 ਘੰਟੇ" },
      { en: "120 hours", pa: "120 ਘੰਟੇ" },
    ],
    correct: 1,
    explanation: { en: "Cycle 1 allows 70 hours on-duty in 7 days. It resets with 36 consecutive hours off-duty.", pa: "ਸਾਈਕਲ 1 ਵਿੱਚ 7 ਦਿਨਾਂ ਵਿੱਚ 70 ਘੰਟੇ ਡਿਊਟੀ ਮਨਜ਼ੂਰ ਹੈ। ਇਹ 36 ਘੰਟੇ ਲਗਾਤਾਰ ਛੁੱਟੀ ਨਾਲ ਰੀਸੈੱਟ ਹੁੰਦਾ।" },
  },
  {
    q: { en: "Under Cycle 2, how many on-duty hours are allowed in 14 days?", pa: "ਸਾਈਕਲ 2 ਅਧੀਨ 14 ਦਿਨਾਂ ਵਿੱਚ ਕਿੰਨੇ ਡਿਊਟੀ ਘੰਟੇ ਮਨਜ਼ੂਰ ਹਨ?" },
    options: [
      { en: "70 hours", pa: "70 ਘੰਟੇ" },
      { en: "80 hours", pa: "80 ਘੰਟੇ" },
      { en: "120 hours", pa: "120 ਘੰਟੇ" },
      { en: "100 hours", pa: "100 ਘੰਟੇ" },
    ],
    correct: 2,
    explanation: { en: "Cycle 2 allows 120 hours on-duty in 14 days. It resets with 72 consecutive hours off-duty.", pa: "ਸਾਈਕਲ 2 ਵਿੱਚ 14 ਦਿਨਾਂ ਵਿੱਚ 120 ਘੰਟੇ ਡਿਊਟੀ ਮਨਜ਼ੂਰ ਹੈ। ਇਹ 72 ਘੰਟੇ ਲਗਾਤਾਰ ਛੁੱਟੀ ਨਾਲ ਰੀਸੈੱਟ ਹੁੰਦਾ।" },
  },
  {
    q: { en: "How many consecutive hours off-duty are required to reset Cycle 1?", pa: "ਸਾਈਕਲ 1 ਰੀਸੈੱਟ ਕਰਨ ਲਈ ਕਿੰਨੇ ਲਗਾਤਾਰ ਘੰਟੇ ਛੁੱਟੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "24 hours", pa: "24 ਘੰਟੇ" },
      { en: "36 hours", pa: "36 ਘੰਟੇ" },
      { en: "48 hours", pa: "48 ਘੰਟੇ" },
      { en: "72 hours", pa: "72 ਘੰਟੇ" },
    ],
    correct: 1,
    explanation: { en: "Cycle 1 resets with 36 consecutive hours off-duty. Cycle 2 requires 72 consecutive hours.", pa: "ਸਾਈਕਲ 1 ਰੀਸੈੱਟ ਲਈ 36 ਲਗਾਤਾਰ ਘੰਟੇ ਛੁੱਟੀ ਚਾਹੀਦੀ। ਸਾਈਕਲ 2 ਲਈ 72 ਘੰਟੇ।" },
  },
  {
    q: { en: "What is the purpose of an ELD (Electronic Logging Device)?", pa: "ELD (ਇਲੈਕਟ੍ਰਾਨਿਕ ਲੌਗਿੰਗ ਡਿਵਾਈਸ) ਦਾ ਮਕਸਦ ਕੀ ਹੈ?" },
    options: [
      { en: "Track fuel consumption", pa: "ਬਾਲਣ ਦੀ ਖਪਤ ਟ੍ਰੈਕ ਕਰਨਾ" },
      { en: "Monitor vehicle speed only", pa: "ਸਿਰਫ਼ ਸਪੀਡ ਦੀ ਨਿਗਰਾਨੀ" },
      { en: "Automatically record driving time and HOS compliance", pa: "ਡਰਾਈਵਿੰਗ ਸਮਾਂ ਤੇ HOS ਪਾਲਣਾ ਆਪਣੇ-ਆਪ ਰਿਕਾਰਡ ਕਰਨਾ" },
      { en: "Replace the vehicle GPS", pa: "ਵਾਹਨ GPS ਦੀ ਥਾਂ ਲੈਣਾ" },
    ],
    correct: 2,
    explanation: { en: "ELDs automatically record driving time and ensure Hours of Service compliance. They replaced paper logbooks in Canada as of June 2021.", pa: "ELD ਆਪਣੇ-ਆਪ ਡਰਾਈਵਿੰਗ ਸਮਾਂ ਰਿਕਾਰਡ ਕਰਦੇ ਹਨ ਤੇ HOS ਪਾਲਣਾ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ। ਜੂਨ 2021 ਤੋਂ ਕੈਨੇਡਾ ਵਿੱਚ ਕਾਗਜ਼ੀ ਲੌਗਬੁੱਕ ਦੀ ਥਾਂ ਲਈ।" },
  },
  {
    q: { en: "What is the mandatory daily off-duty time requirement?", pa: "ਰੋਜ਼ਾਨਾ ਲਾਜ਼ਮੀ ਛੁੱਟੀ ਦਾ ਸਮਾਂ ਕਿੰਨਾ ਹੈ?" },
    options: [
      { en: "8 consecutive hours", pa: "8 ਲਗਾਤਾਰ ਘੰਟੇ" },
      { en: "10 hours off-duty, including 8 consecutive hours in the sleeper berth or off-duty", pa: "10 ਘੰਟੇ ਛੁੱਟੀ, ਜਿਸ ਵਿੱਚ 8 ਲਗਾਤਾਰ ਘੰਟੇ ਸਲੀਪਰ ਬਰਥ ਜਾਂ ਆਫ਼-ਡਿਊਟੀ ਵਿੱਚ" },
      { en: "6 hours", pa: "6 ਘੰਟੇ" },
      { en: "12 hours", pa: "12 ਘੰਟੇ" },
    ],
    correct: 1,
    explanation: { en: "Canadian HOS requires at least 10 hours off-duty per day, with at least 8 of those being consecutive (in sleeper berth or off-duty).", pa: "ਕੈਨੇਡੀਅਨ HOS ਅਨੁਸਾਰ ਰੋਜ਼ਾਨਾ ਘੱਟੋ-ਘੱਟ 10 ਘੰਟੇ ਛੁੱਟੀ, ਜਿਸ ਵਿੱਚ 8 ਲਗਾਤਾਰ ਘੰਟੇ (ਸਲੀਪਰ ਬਰਥ ਜਾਂ ਆਫ਼-ਡਿਊਟੀ) ਜ਼ਰੂਰੀ ਹਨ।" },
  },
  {
    q: { en: "What is the maximum on-duty time (including driving) allowed in a day?", pa: "ਇੱਕ ਦਿਨ ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ ਡਿਊਟੀ ਸਮਾਂ (ਡਰਾਈਵਿੰਗ ਸਮੇਤ) ਕਿੰਨਾ ਹੈ?" },
    options: [
      { en: "13 hours", pa: "13 ਘੰਟੇ" },
      { en: "14 hours", pa: "14 ਘੰਟੇ" },
      { en: "15 hours", pa: "15 ਘੰਟੇ" },
      { en: "16 hours", pa: "16 ਘੰਟੇ" },
    ],
    correct: 1,
    explanation: { en: "The maximum on-duty window is 14 hours per day. Within that, you can drive a maximum of 13 hours. The remaining hour can be other on-duty work.", pa: "ਵੱਧ ਤੋਂ ਵੱਧ ਡਿਊਟੀ ਵਿੰਡੋ 14 ਘੰਟੇ ਪ੍ਰਤੀ ਦਿਨ ਹੈ। ਇਸ ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ 13 ਘੰਟੇ ਡਰਾਈਵ ਕਰ ਸਕਦੇ ਹੋ। ਬਾਕੀ 1 ਘੰਟਾ ਹੋਰ ਡਿਊਟੀ ਕੰਮ ਹੋ ਸਕਦਾ।" },
  },
  {
    q: { en: "When must a driver declare their duty status on the ELD?", pa: "ਡਰਾਈਵਰ ਨੂੰ ELD ਤੇ ਆਪਣੀ ਡਿਊਟੀ ਸਥਿਤੀ ਕਦੋਂ ਦੱਸਣੀ ਚਾਹੀਦੀ?" },
    options: [
      { en: "Only at the start of the day", pa: "ਸਿਰਫ਼ ਦਿਨ ਦੀ ਸ਼ੁਰੂਆਤ ਤੇ" },
      { en: "Every time their status changes (driving, on-duty, sleeper, off-duty)", pa: "ਹਰ ਵਾਰ ਜਦੋਂ ਸਥਿਤੀ ਬਦਲੇ (ਡਰਾਈਵਿੰਗ, ਡਿਊਟੀ, ਸਲੀਪਰ, ਛੁੱਟੀ)" },
      { en: "Only when an officer asks", pa: "ਸਿਰਫ਼ ਜਦੋਂ ਅਫ਼ਸਰ ਪੁੱਛੇ" },
      { en: "Once per trip", pa: "ਹਰ ਸਫ਼ਰ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
    ],
    correct: 1,
    explanation: { en: "Drivers must update their status on the ELD every time it changes: driving, on-duty not driving, sleeper berth, or off-duty.", pa: "ਡਰਾਈਵਰ ਨੂੰ ELD ਤੇ ਹਰ ਵਾਰ ਸਥਿਤੀ ਅਪਡੇਟ ਕਰਨੀ ਚਾਹੀਦੀ: ਡਰਾਈਵਿੰਗ, ਡਿਊਟੀ ਤੇ ਪਰ ਡਰਾਈਵ ਨਹੀਂ, ਸਲੀਪਰ ਬਰਥ, ਜਾਂ ਛੁੱਟੀ।" },
  },
  {
    q: { en: "What happens if you exceed your HOS limits?", pa: "ਜੇ ਤੁਸੀਂ HOS ਹੱਦਾਂ ਤੋਂ ਵੱਧ ਜਾਓ ਤਾਂ ਕੀ ਹੁੰਦਾ?" },
    options: [
      { en: "Nothing. It is just a guideline", pa: "ਕੁਝ ਨਹੀਂ। ਇਹ ਸਿਰਫ਼ ਗਾਈਡਲਾਈਨ ਹੈ" },
      { en: "Fines, out-of-service orders, and potential criminal charges for both driver and carrier", pa: "ਜੁਰਮਾਨੇ, ਆਊਟ-ਆਫ਼-ਸਰਵਿਸ ਆਰਡਰ, ਤੇ ਡਰਾਈਵਰ ਤੇ ਕੈਰੀਅਰ ਦੋਵਾਂ ਲਈ ਫ਼ੌਜਦਾਰੀ ਦੋਸ਼ ਲੱਗ ਸਕਦੇ" },
      { en: "A verbal warning only", pa: "ਸਿਰਫ਼ ਜ਼ੁਬਾਨੀ ਚੇਤਾਵਨੀ" },
      { en: "Points on your licence only", pa: "ਸਿਰਫ਼ ਲਾਇਸੈਂਸ ਤੇ ਪੁਆਇੰਟ" },
    ],
    correct: 1,
    explanation: { en: "HOS violations can result in significant fines ($1,000-$25,000), out-of-service orders (forced to stop driving), and in serious cases, criminal charges. Both driver and carrier can be penalized.", pa: "HOS ਉਲੰਘਣਾ ਨਾਲ ਭਾਰੀ ਜੁਰਮਾਨੇ ($1,000-$25,000), ਆਊਟ-ਆਫ਼-ਸਰਵਿਸ ਆਰਡਰ (ਡਰਾਈਵ ਬੰਦ ਕਰਨਾ ਪਵੇ), ਤੇ ਗੰਭੀਰ ਮਾਮਲਿਆਂ ਵਿੱਚ ਫ਼ੌਜਦਾਰੀ ਦੋਸ਼ ਲੱਗ ਸਕਦੇ ਹਨ। ਡਰਾਈਵਰ ਤੇ ਕੈਰੀਅਰ ਦੋਵਾਂ ਨੂੰ ਸਜ਼ਾ ਹੋ ਸਕਦੀ।" },
  },
  {
    q: { en: "Can a driver split their required daily off-duty time?", pa: "ਕੀ ਡਰਾਈਵਰ ਰੋਜ਼ਾਨਾ ਲੋੜੀਂਦੇ ਛੁੱਟੀ ਸਮੇਂ ਨੂੰ ਵੰਡ ਸਕਦਾ ਹੈ?" },
    options: [
      { en: "No, it must all be consecutive", pa: "ਨਹੀਂ, ਸਾਰਾ ਲਗਾਤਾਰ ਹੋਣਾ ਚਾਹੀਦਾ" },
      { en: "Yes. 8 consecutive hours required, remaining 2 hours can be split into periods of at least 30 minutes", pa: "ਹਾਂ। 8 ਲਗਾਤਾਰ ਘੰਟੇ ਜ਼ਰੂਰੀ, ਬਾਕੀ 2 ਘੰਟੇ ਘੱਟੋ-ਘੱਟ 30 ਮਿੰਟ ਦੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵੰਡ ਸਕਦੇ" },
      { en: "Yes, any combination adding up to 10 hours", pa: "ਹਾਂ, ਕੋਈ ਵੀ ਜੋੜ ਜੋ 10 ਘੰਟੇ ਬਣੇ" },
      { en: "Only if carrier approves", pa: "ਸਿਰਫ਼ ਜੇ ਕੈਰੀਅਰ ਮਨਜ਼ੂਰ ਕਰੇ" },
    ],
    correct: 1,
    explanation: { en: "You must take at least 8 consecutive hours off-duty (or sleeper berth). The remaining 2 hours can be taken in blocks of at least 30 minutes each.", pa: "ਘੱਟੋ-ਘੱਟ 8 ਲਗਾਤਾਰ ਘੰਟੇ ਛੁੱਟੀ (ਜਾਂ ਸਲੀਪਰ ਬਰਥ) ਜ਼ਰੂਰੀ ਹਨ। ਬਾਕੀ 2 ਘੰਟੇ ਘੱਟੋ-ਘੱਟ 30-30 ਮਿੰਟ ਦੇ ਹਿੱਸਿਆਂ ਵਿੱਚ ਲੈ ਸਕਦੇ ਹੋ।" },
  },
];

/* ───────── Question bank accessor ───────── */
function getQuestions(province: ProvinceKey, category: CategoryKey): Question[] {
  if (category === "airbrakes") return airBrakesQuestions;
  if (category === "hos") return hosQuestions;
  if (category === "roadsigns") return roadSignsQuestions as Question[];
  if (category === "g1") {
    if (province === "BC") return g1BC as Question[];
    if (province === "AB") return g1AB as Question[];
    return g1Ontario as Question[]; // ON default + fallback
  }
  return makeGeneralQuestions(province);
}

/* ───────── Main Component ───────── */
export function LicenseQuizContent() {
  const { t } = useLanguage();

  /* Navigation state */
  const [licenseType, setLicenseType] = useState<LicenseType>(null);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceKey | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  const provinces = licenseType === "car" ? carProvinces : truckProvinces;
  const categories = licenseType === "car" ? carCategories : truckCategories;

  /* Quiz state */
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [showTruck, setShowTruck] = useState(false);

  const questions = selectedProvince && selectedCategory ? getQuestions(selectedProvince, selectedCategory) : [];
  const question = questions[currentQ];

  function startQuiz(cat: CategoryKey) {
    setSelectedCategory(cat);
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
    setQuizDone(false);
    setShowTruck(true);
    setTimeout(() => setShowTruck(false), 3200);
  }

  function handleSelect(index: number) {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
    setAnswered((a) => a + 1);
    if (index === question.correct) {
      setScore((s) => s + 1);
    }
  }

  function nextQuestion() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setQuizDone(true);
    }
  }

  function restart() {
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setAnswered(0);
    setQuizDone(false);
    setShowTruck(true);
    setTimeout(() => setShowTruck(false), 3200);
  }

  function goBack() {
    if (selectedCategory) {
      setSelectedCategory(null);
      setCurrentQ(0);
      setSelected(null);
      setShowAnswer(false);
      setScore(0);
      setAnswered(0);
      setQuizDone(false);
    } else if (selectedProvince) {
      setSelectedProvince(null);
    } else if (licenseType) {
      setLicenseType(null);
    }
  }

  /* ── Breadcrumb ── */
  const breadcrumb = (
    <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
      <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
      <ChevronRight className="h-3.5 w-3.5" />
      {!selectedProvince ? (
        <span className="text-foreground">{t({ en: "License Quiz", pa: "ਲਾਇਸੈਂਸ ਕੁਇਜ਼" })}</span>
      ) : !selectedCategory ? (
        <>
          <button onClick={() => setSelectedProvince(null)} className="hover:text-foreground">
            {t({ en: "License Quiz", pa: "ਲਾਇਸੈਂਸ ਕੁਇਜ਼" })}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">
            {t(provinces.find((p) => p.key === selectedProvince)!.name)}
          </span>
        </>
      ) : (
        <>
          <button onClick={() => { setSelectedProvince(null); setSelectedCategory(null); }} className="hover:text-foreground">
            {t({ en: "License Quiz", pa: "ਲਾਇਸੈਂਸ ਕੁਇਜ਼" })}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button onClick={goBack} className="hover:text-foreground">
            {t(provinces.find((p) => p.key === selectedProvince)!.name)}
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">
            {t(categories.find((c) => c.key === selectedCategory)!.name)}
          </span>
        </>
      )}
    </nav>
  );

  const categoryIcon = (key: CategoryKey) => {
    if (key === "airbrakes") return <Wind className="h-8 w-8 text-[#FF6E40]" />;
    if (key === "hos") return <Clock className="h-8 w-8 text-[#FF6E40]" />;
    return <BookOpen className="h-8 w-8 text-[#FF6E40]" />;
  };

  /* ═══════════════ RENDER ═══════════════ */
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      {breadcrumb}

      <div className="flex items-center justify-between">
        {(selectedProvince || selectedCategory) ? (
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {t({ en: "Back", pa: "ਵਾਪਸ" })}
          </button>
        ) : <div />}
        <LanguageToggle />
      </div>

      {/* ── Truck animation bar ── */}
      {showTruck && (
        <div className="mt-4 overflow-hidden h-12 relative">
          <TruckSVG />
        </div>
      )}

      {/* ═══ STEP 0: License Type Selection ═══ */}
      {!licenseType && (
        <>
          <div className="mt-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <BookOpen className="h-8 w-8 text-[#FF6E40]" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              {t({ en: "License Exam Practice", pa: "ਲਾਇਸੈਂਸ ਪ੍ਰੀਖਿਆ ਅਭਿਆਸ" })}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t({
                en: "300+ practice questions in English and ਪੰਜਾਬੀ. Choose your license type.",
                pa: "300+ ਅਭਿਆਸ ਸਵਾਲ English ਤੇ ਪੰਜਾਬੀ ਵਿੱਚ। ਆਪਣਾ ਲਾਇਸੈਂਸ ਟਾਈਪ ਚੁਣੋ।",
              })}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => setLicenseType("truck")}
              className="group flex flex-col items-center gap-3 rounded-xl border-2 border-transparent bg-card p-8 transition-all hover:border-[#FF6E40] hover:shadow-lg"
            >
              <div className="text-5xl">🚛</div>
              <span className="text-xl font-bold group-hover:text-[#FF6E40]">
                {t({ en: "Truck License (AZ/DZ)", pa: "ਟਰੱਕ ਲਾਇਸੈਂਸ (AZ/DZ)" })}
              </span>
              <span className="text-sm text-muted-foreground text-center">
                {t({ en: "General knowledge, air brakes, hours of service — 6 provinces", pa: "ਆਮ ਗਿਆਨ, ਏਅਰ ਬ੍ਰੇਕ, ਸੇਵਾ ਦੇ ਘੰਟੇ — 6 ਸੂਬੇ" })}
              </span>
              <span className="rounded-full bg-[#FF6E40]/10 px-3 py-1 text-xs font-bold text-[#FF6E40]">71 {t({ en: "questions", pa: "ਸਵਾਲ" })}</span>
            </button>
            <button
              onClick={() => setLicenseType("car")}
              className="group flex flex-col items-center gap-3 rounded-xl border-2 border-transparent bg-card p-8 transition-all hover:border-[#FACC15] hover:shadow-lg"
            >
              <div className="text-5xl">🚗</div>
              <span className="text-xl font-bold group-hover:text-[#FACC15]">
                {t({ en: "Car License (G1/L/Class 7)", pa: "ਕਾਰ ਲਾਇਸੈਂਸ (G1/L/Class 7)" })}
              </span>
              <span className="text-sm text-muted-foreground text-center">
                {t({ en: "Knowledge test + road signs — Ontario, BC, Alberta", pa: "ਨੌਲਿਜ ਟੈਸਟ + ਸੜਕ ਚਿੰਨ੍ਹ — ਓਨਟਾਰੀਓ, BC, ਅਲਬਰਟਾ" })}
              </span>
              <span className="rounded-full bg-[#FACC15]/10 px-3 py-1 text-xs font-bold text-[#FACC15]">233 {t({ en: "questions", pa: "ਸਵਾਲ" })}</span>
            </button>
          </div>
        </>
      )}

      {/* ═══ STEP 1: Province Selection ═══ */}
      {licenseType && !selectedProvince && (
        <>
          <div className="mt-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              {licenseType === "truck" ? <span className="text-3xl">🚛</span> : <span className="text-3xl">🚗</span>}
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              {licenseType === "truck"
                ? t({ en: "Truck License Exam Practice", pa: "ਟਰੱਕ ਲਾਇਸੈਂਸ ਪ੍ਰੀਖਿਆ ਅਭਿਆਸ" })
                : t({ en: "Car License Exam Practice", pa: "ਕਾਰ ਲਾਇਸੈਂਸ ਪ੍ਰੀਖਿਆ ਅਭਿਆਸ" })}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t({
                en: "Select your province to start practicing. Available in English and ਪੰਜਾਬੀ.",
                pa: "ਅਭਿਆਸ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਆਪਣਾ ਸੂਬਾ ਚੁਣੋ। English ਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਉਪਲਬਧ।",
              })}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {provinces.map((prov) => (
              <button
                key={prov.key}
                onClick={() => setSelectedProvince(prov.key)}
                className="flex flex-col items-center gap-2 rounded-xl border bg-card p-5 transition-all hover:border-[#FF6E40] hover:shadow-md"
              >
                <MapPin className="h-6 w-6 text-[#FF6E40]" />
                <span className="text-sm font-semibold">{t(prov.name)}</span>
                <span className="text-xs text-muted-foreground">{prov.key}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ═══ STEP 2: Category Selection ═══ */}
      {selectedProvince && !selectedCategory && (
        <>
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t(provinces.find((p) => p.key === selectedProvince)!.name)}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t({ en: "Choose a quiz category", pa: "ਕੁਇਜ਼ ਕੈਟੇਗਰੀ ਚੁਣੋ" })}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => startQuiz(cat.key)}
                className="flex w-full items-center gap-4 rounded-xl border bg-card p-5 text-left transition-all hover:border-[#FF6E40] hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-50">
                  {categoryIcon(cat.key)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{t(cat.name)}</div>
                  <div className="text-sm text-muted-foreground">{t(cat.desc)}</div>
                </div>
                <div className="shrink-0 rounded-full bg-[#FF6E40]/10 px-3 py-1 text-sm font-bold text-[#FF6E40]">
                  {cat.count} {t({ en: "Q", pa: "ਸਵਾਲ" })}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ═══ STEP 3: Quiz ═══ */}
      {selectedProvince && selectedCategory && !quizDone && question && (
        <>
          {/* Score bar */}
          <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 text-sm">
            <span>
              {t({ en: "Question", pa: "ਸਵਾਲ" })} {currentQ + 1}/{questions.length}
            </span>
            <span className="font-semibold text-green-600">
              {t({ en: "Score:", pa: "ਸਕੋਰ:" })} {score}/{answered}
            </span>
          </div>

          {/* Question card */}
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold leading-snug">{t(question.q)}</h2>

            <div className="mt-4 space-y-3">
              {question.options.map((opt, i) => {
                let optionStyle = "border bg-card hover:bg-muted/40 cursor-pointer";
                if (showAnswer) {
                  if (i === question.correct) {
                    optionStyle = "border-2 border-green-500 bg-green-50 dark:bg-green-950/30";
                  } else if (i === selected && i !== question.correct) {
                    optionStyle = "border-2 border-red-400 bg-red-50 dark:bg-red-950/30";
                  } else {
                    optionStyle = "border bg-card opacity-50";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={showAnswer}
                    className={`flex w-full items-start gap-3 rounded-xl p-4 text-left transition-all ${optionStyle}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm">{t(opt)}</span>
                    {showAnswer && i === question.correct && (
                      <CheckCircle className="ml-auto h-5 w-5 shrink-0 text-green-600" />
                    )}
                    {showAnswer && i === selected && i !== question.correct && (
                      <XCircle className="ml-auto h-5 w-5 shrink-0 text-red-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {showAnswer && (
              <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 p-4">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  {t({ en: "Explanation:", pa: "ਵਿਆਖਿਆ:" })}
                </p>
                <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
                  {t(question.explanation)}
                </p>
              </div>
            )}
          </div>

          {showAnswer && (
            <Button onClick={nextQuestion} className="mt-4 w-full bg-[#FF6E40] hover:bg-[#FF5722]">
              {currentQ < questions.length - 1
                ? t({ en: "Next Question", pa: "ਅਗਲਾ ਸਵਾਲ" })
                : t({ en: "See Results", pa: "ਨਤੀਜੇ ਵੇਖੋ" })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </>
      )}

      {/* ═══ STEP 4: Results ═══ */}
      {selectedProvince && selectedCategory && quizDone && (
        <div className="mt-6 rounded-xl border bg-card p-8 text-center">
          <div className="text-5xl font-black">
            {score}/{questions.length}
          </div>
          <p className="mt-2 text-lg font-semibold">
            {score >= questions.length * 0.8
              ? t({ en: "Excellent! You're ready!", pa: "ਬਹੁਤ ਵਧੀਆ! ਤੁਸੀਂ ਤਿਆਰ ਹੋ!" })
              : score >= questions.length * 0.6
              ? t({ en: "Good, but review the ones you missed.", pa: "ਵਧੀਆ, ਪਰ ਜੋ ਗ਼ਲਤ ਹੋਏ ਉਹ ਦੁਬਾਰਾ ਪੜ੍ਹੋ।" })
              : t({ en: "Keep studying. You&apos;ll get there!", pa: "ਪੜ੍ਹਾਈ ਜਾਰੀ ਰੱਖੋ। ਤੁਸੀਂ ਕਰ ਲਓਗੇ!" })}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t({
              en: `You got ${score} out of ${questions.length} correct (${Math.round((score / questions.length) * 100)}%)`,
              pa: `ਤੁਸੀਂ ${questions.length} ਵਿੱਚੋਂ ${score} ਸਹੀ ਕੀਤੇ (${Math.round((score / questions.length) * 100)}%)`,
            })}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button onClick={restart} className="bg-[#FF6E40] hover:bg-[#FF5722]">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t({ en: "Try Again", pa: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ" })}
            </Button>
            <Button variant="outline" onClick={goBack}>
              {t({ en: "Other Quizzes", pa: "ਹੋਰ ਕੁਇਜ਼" })}
            </Button>
            <Button variant="outline" onClick={() => { setSelectedProvince(null); setSelectedCategory(null); }}>
              {t({ en: "Change Province", pa: "ਸੂਬਾ ਬਦਲੋ" })}
            </Button>
          </div>
        </div>
      )}

      {/* About section */}
      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Quiz", pa: "ਇਸ ਕੁਇਜ਼ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "Practice questions for Canadian commercial truck driver knowledge tests including General Knowledge, Air Brakes (comprehensive A-to-Z), and Hours of Service. Province-specific rules included for Ontario (MTO), British Columbia (ICBC), Alberta, Saskatchewan, Manitoba, and Quebec. Available in English and Gurmukhi Punjabi. These are practice questions only. Study the official handbook for your province for complete preparation.",
            pa: "ਕੈਨੇਡੀਅਨ ਕਮਰਸ਼ੀਅਲ ਟਰੱਕ ਡਰਾਈਵਰ ਨੌਲਿਜ ਟੈਸਟ ਲਈ ਅਭਿਆਸ ਸਵਾਲ ਜਿਸ ਵਿੱਚ ਆਮ ਗਿਆਨ, ਏਅਰ ਬ੍ਰੇਕ (ਪੂਰਾ A ਤੋਂ Z), ਤੇ ਸੇਵਾ ਦੇ ਘੰਟੇ ਸ਼ਾਮਲ ਹਨ। ਓਨਟਾਰੀਓ (MTO), ਬ੍ਰਿਟਿਸ਼ ਕੋਲੰਬੀਆ (ICBC), ਅਲਬਰਟਾ, ਸਸਕੈਚਵਨ, ਮੈਨੀਟੋਬਾ ਤੇ ਕਿਊਬੈੱਕ ਲਈ ਸੂਬਾ-ਵਿਸ਼ੇਸ਼ ਨਿਯਮ ਸ਼ਾਮਲ। English ਤੇ ਗੁਰਮੁਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਉਪਲਬਧ। ਇਹ ਸਿਰਫ਼ ਅਭਿਆਸ ਸਵਾਲ ਹਨ। ਪੂਰੀ ਤਿਆਰੀ ਲਈ ਆਪਣੇ ਸੂਬੇ ਦੀ ਅਧਿਕਾਰਤ ਹੈਂਡਬੁੱਕ ਪੜ੍ਹੋ।",
          })}
        </p>
      </div>
    </div>
  );
}
