"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, BookOpen, CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

interface Question {
  q: { en: string; pa: string };
  options: { en: string; pa: string }[];
  correct: number; // 0-based index
  explanation: { en: string; pa: string };
}

const questions: Question[] = [
  {
    q: {
      en: "What is the maximum driving time allowed per day under Canadian HOS rules?",
      pa: "ਕੈਨੇਡੀਅਨ HOS ਨਿਯਮਾਂ ਅਧੀਨ ਪ੍ਰਤੀ ਦਿਨ ਵੱਧ ਤੋਂ ਵੱਧ ਕਿੰਨੇ ਘੰਟੇ ਡਰਾਈਵ ਕਰ ਸਕਦੇ ਹੋ?",
    },
    options: [
      { en: "10 hours", pa: "10 ਘੰਟੇ" },
      { en: "11 hours", pa: "11 ਘੰਟੇ" },
      { en: "13 hours", pa: "13 ਘੰਟੇ" },
      { en: "14 hours", pa: "14 ਘੰਟੇ" },
    ],
    correct: 2,
    explanation: {
      en: "Under Canadian federal HOS, the maximum driving time is 13 hours per day, within a 14-hour on-duty window.",
      pa: "ਕੈਨੇਡੀਅਨ ਫੈਡਰਲ HOS ਅਧੀਨ, ਵੱਧ ਤੋਂ ਵੱਧ ਡਰਾਈਵਿੰਗ ਸਮਾਂ 13 ਘੰਟੇ ਪ੍ਰਤੀ ਦਿਨ ਹੈ, 14-ਘੰਟੇ ਡਿਊਟੀ ਵਿੰਡੋ ਵਿੱਚ।",
    },
  },
  {
    q: {
      en: "When approaching a railway crossing, a commercial vehicle must stop at least how far from the nearest rail?",
      pa: "ਰੇਲਵੇ ਕਰਾਸਿੰਗ ਤੇ ਪਹੁੰਚਣ ਵੇਲੇ, ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਨੂੰ ਨਜ਼ਦੀਕੀ ਪਟੜੀ ਤੋਂ ਘੱਟੋ-ਘੱਟ ਕਿੰਨੀ ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "3 metres (10 feet)", pa: "3 ਮੀਟਰ (10 ਫੁੱਟ)" },
      { en: "5 metres (15 feet)", pa: "5 ਮੀਟਰ (15 ਫੁੱਟ)" },
      { en: "10 metres (30 feet)", pa: "10 ਮੀਟਰ (30 ਫੁੱਟ)" },
      { en: "15 metres (50 feet)", pa: "15 ਮੀਟਰ (50 ਫੁੱਟ)" },
    ],
    correct: 1,
    explanation: {
      en: "Commercial vehicles must stop at least 5 metres (15 feet) from the nearest rail at railway crossings.",
      pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਰੇਲਵੇ ਕਰਾਸਿੰਗ ਤੇ ਨਜ਼ਦੀਕੀ ਪਟੜੀ ਤੋਂ ਘੱਟੋ-ਘੱਟ 5 ਮੀਟਰ (15 ਫੁੱਟ) ਦੂਰ ਰੁਕਣਾ ਚਾਹੀਦਾ।",
    },
  },
  {
    q: {
      en: "What does a flashing red light at an intersection mean?",
      pa: "ਚੌਰਾਹੇ ਤੇ ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਦਾ ਕੀ ਮਤਲਬ ਹੈ?",
    },
    options: [
      { en: "Slow down and proceed with caution", pa: "ਹੌਲੀ ਕਰੋ ਤੇ ਧਿਆਨ ਨਾਲ ਅੱਗੇ ਵਧੋ" },
      { en: "Come to a complete stop, then proceed when safe", pa: "ਪੂਰੀ ਤਰ੍ਹਾਂ ਰੁਕੋ, ਫਿਰ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਅੱਗੇ ਵਧੋ" },
      { en: "Speed up to clear the intersection", pa: "ਚੌਰਾਹਾ ਪਾਰ ਕਰਨ ਲਈ ਤੇਜ਼ ਕਰੋ" },
      { en: "Yield to traffic on the right only", pa: "ਸਿਰਫ਼ ਸੱਜੇ ਪਾਸੇ ਦੀ ਟ੍ਰੈਫਿਕ ਨੂੰ ਰਸਤਾ ਦਿਓ" },
    ],
    correct: 1,
    explanation: {
      en: "A flashing red light is treated like a stop sign. You must come to a complete stop and proceed only when it's safe.",
      pa: "ਲਾਲ ਝਪਕਦੀ ਬੱਤੀ ਸਟਾਪ ਸਾਈਨ ਵਾਂਗ ਹੈ। ਤੁਹਾਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਰੁਕਣਾ ਪਵੇਗਾ ਤੇ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਹੀ ਅੱਗੇ ਵਧੋ।",
    },
  },
  {
    q: {
      en: "What is the blood alcohol limit for commercial vehicle drivers in Ontario?",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਡਰਾਈਵਰਾਂ ਲਈ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ਰਾਬ ਦੀ ਹੱਦ ਕੀ ਹੈ?",
    },
    options: [
      { en: "Zero (0.00%)", pa: "ਜ਼ੀਰੋ (0.00%)" },
      { en: "0.05%", pa: "0.05%" },
      { en: "0.08%", pa: "0.08%" },
      { en: "0.02%", pa: "0.02%" },
    ],
    correct: 0,
    explanation: {
      en: "Commercial vehicle drivers in Ontario must have zero blood alcohol content (BAC). Any amount results in immediate licence suspension.",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਡਰਾਈਵਰਾਂ ਦੇ ਖ਼ੂਨ ਵਿੱਚ ਸ਼ਰਾਬ ਜ਼ੀਰੋ ਹੋਣੀ ਚਾਹੀਦੀ। ਕੋਈ ਵੀ ਮਾਤਰਾ ਤੁਰੰਤ ਲਾਇਸੈਂਸ ਮੁਅੱਤਲ ਕਰਵਾਉਂਦੀ ਹੈ।",
    },
  },
  {
    q: {
      en: "When making a right turn with a large truck, you should:",
      pa: "ਵੱਡੇ ਟਰੱਕ ਨਾਲ ਸੱਜੇ ਮੋੜ ਲੈਂਦੇ ਸਮੇਂ ਤੁਹਾਨੂੰ:",
    },
    options: [
      { en: "Swing wide to the left first, then turn right", pa: "ਪਹਿਲਾਂ ਖੱਬੇ ਪਾਸੇ ਖੁੱਲ੍ਹਾ ਮੋੜ ਲਓ, ਫਿਰ ਸੱਜੇ ਮੁੜੋ" },
      { en: "Stay in the right lane and use your mirrors to check for vehicles beside you", pa: "ਸੱਜੀ ਲੇਨ ਵਿੱਚ ਰਹੋ ਤੇ ਸ਼ੀਸ਼ਿਆਂ ਨਾਲ ਨਾਲ ਵਾਲੇ ਵਾਹਨ ਚੈੱਕ ਕਰੋ" },
      { en: "Honk your horn before turning", pa: "ਮੋੜ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ ਹਾਰਨ ਵਜਾਓ" },
      { en: "Speed up to complete the turn quickly", pa: "ਮੋੜ ਜਲਦੀ ਪੂਰਾ ਕਰਨ ਲਈ ਤੇਜ਼ ਕਰੋ" },
    ],
    correct: 1,
    explanation: {
      en: "Stay in your lane and use mirrors. Swinging wide into the left lane is dangerous — other vehicles may try to pass on the right.",
      pa: "ਆਪਣੀ ਲੇਨ ਵਿੱਚ ਰਹੋ ਤੇ ਸ਼ੀਸ਼ੇ ਵਰਤੋ। ਖੱਬੇ ਪਾਸੇ ਖੁੱਲ੍ਹਾ ਮੋੜ ਖ਼ਤਰਨਾਕ ਹੈ — ਹੋਰ ਵਾਹਨ ਸੱਜੇ ਪਾਸੇ ਤੋਂ ਲੰਘਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰ ਸਕਦੇ ਹਨ।",
    },
  },
  {
    q: {
      en: "What should you do if your brakes fail while driving downhill?",
      pa: "ਜੇ ਢਲਾਣ ਤੋਂ ਉਤਰਦੇ ਸਮੇਂ ਬ੍ਰੇਕ ਫੇਲ੍ਹ ਹੋ ਜਾਣ ਤਾਂ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "Turn off the engine immediately", pa: "ਤੁਰੰਤ ਇੰਜਣ ਬੰਦ ਕਰੋ" },
      { en: "Pump the brakes rapidly and downshift to lower gears", pa: "ਬ੍ਰੇਕ ਤੇਜ਼ੀ ਨਾਲ ਦਬਾਓ ਤੇ ਨੀਵੇਂ ਗੇਅਰ ਵਿੱਚ ਪਾਓ" },
      { en: "Put the transmission in neutral", pa: "ਟ੍ਰਾਂਸਮਿਸ਼ਨ ਨਿਊਟ੍ਰਲ ਵਿੱਚ ਪਾਓ" },
      { en: "Steer into oncoming traffic to slow down", pa: "ਹੌਲੀ ਕਰਨ ਲਈ ਸਾਹਮਣਿਓਂ ਆ ਰਹੀ ਟ੍ਰੈਫਿਕ ਵੱਲ ਮੋੜੋ" },
    ],
    correct: 1,
    explanation: {
      en: "Pump the brakes to build up air pressure. Downshift to use engine braking. Use the escape ramp if available. Never put the transmission in neutral.",
      pa: "ਹਵਾ ਦਾ ਦਬਾਅ ਬਣਾਉਣ ਲਈ ਬ੍ਰੇਕ ਦਬਾਓ। ਇੰਜਣ ਬ੍ਰੇਕਿੰਗ ਲਈ ਨੀਵਾਂ ਗੇਅਰ ਪਾਓ। ਉਪਲਬਧ ਹੋਵੇ ਤਾਂ ਐਸਕੇਪ ਰੈਂਪ ਵਰਤੋ। ਕਦੇ ਨਿਊਟ੍ਰਲ ਵਿੱਚ ਨਾ ਪਾਓ।",
    },
  },
  {
    q: {
      en: "How often must a truck driver perform a pre-trip inspection?",
      pa: "ਟਰੱਕ ਡਰਾਈਵਰ ਨੂੰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਜਾਂਚ ਕਿੰਨੀ ਵਾਰ ਕਰਨੀ ਚਾਹੀਦੀ?",
    },
    options: [
      { en: "Once a week", pa: "ਹਫ਼ਤੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "Before every trip or every 24 hours", pa: "ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਹਰ 24 ਘੰਟੇ" },
      { en: "Once a month", pa: "ਮਹੀਨੇ ਵਿੱਚ ਇੱਕ ਵਾਰ" },
      { en: "Only when requested by the carrier", pa: "ਸਿਰਫ਼ ਜਦੋਂ ਕੈਰੀਅਰ ਕਹੇ" },
    ],
    correct: 1,
    explanation: {
      en: "A pre-trip inspection must be done before every trip or at least once every 24 hours if the vehicle is in continuous operation.",
      pa: "ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਜਾਂਚ ਹਰ ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਜਾਂ ਘੱਟੋ-ਘੱਟ ਹਰ 24 ਘੰਟੇ ਬਾਅਦ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ।",
    },
  },
  {
    q: {
      en: "What is the minimum following distance for a commercial vehicle at highway speed?",
      pa: "ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਫਾਲੋਇੰਗ ਦੂਰੀ ਕਿੰਨੀ ਹੈ?",
    },
    options: [
      { en: "2 seconds", pa: "2 ਸਕਿੰਟ" },
      { en: "3 seconds", pa: "3 ਸਕਿੰਟ" },
      { en: "4 seconds or more", pa: "4 ਸਕਿੰਟ ਜਾਂ ਵੱਧ" },
      { en: "1 truck length per 10 km/h", pa: "ਹਰ 10 km/h ਲਈ 1 ਟਰੱਕ ਲੰਬਾਈ" },
    ],
    correct: 2,
    explanation: {
      en: "Commercial vehicles should maintain at least 4 seconds following distance at highway speed. Increase in bad weather or poor visibility.",
      pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨਾਂ ਨੂੰ ਹਾਈਵੇ ਸਪੀਡ ਤੇ ਘੱਟੋ-ਘੱਟ 4 ਸਕਿੰਟ ਦੀ ਫਾਲੋਇੰਗ ਦੂਰੀ ਰੱਖਣੀ ਚਾਹੀਦੀ। ਮਾੜੇ ਮੌਸਮ ਵਿੱਚ ਵਧਾਓ।",
    },
  },
  {
    q: {
      en: "Under Cycle 1, how many on-duty hours are allowed in 7 days?",
      pa: "ਸਾਈਕਲ 1 ਅਧੀਨ, 7 ਦਿਨਾਂ ਵਿੱਚ ਕਿੰਨੇ ਡਿਊਟੀ ਘੰਟੇ ਮਨਜ਼ੂਰ ਹਨ?",
    },
    options: [
      { en: "60 hours", pa: "60 ਘੰਟੇ" },
      { en: "70 hours", pa: "70 ਘੰਟੇ" },
      { en: "80 hours", pa: "80 ਘੰਟੇ" },
      { en: "120 hours", pa: "120 ਘੰਟੇ" },
    ],
    correct: 1,
    explanation: {
      en: "Cycle 1 allows 70 hours on-duty in 7 days. It resets with 36 consecutive hours off-duty.",
      pa: "ਸਾਈਕਲ 1 ਵਿੱਚ 7 ਦਿਨਾਂ ਵਿੱਚ 70 ਘੰਟੇ ਡਿਊਟੀ ਮਨਜ਼ੂਰ ਹੈ। ਇਹ ਲਗਾਤਾਰ 36 ਘੰਟੇ ਛੁੱਟੀ ਨਾਲ ਰੀਸੈੱਟ ਹੁੰਦਾ।",
    },
  },
  {
    q: {
      en: "What is the maximum gross vehicle weight in Ontario?",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਵੱਧ ਤੋਂ ਵੱਧ ਕੁੱਲ ਵਾਹਨ ਭਾਰ ਕਿੰਨਾ ਹੈ?",
    },
    options: [
      { en: "80,000 lbs (36,287 kg)", pa: "80,000 ਪੌਂਡ (36,287 kg)" },
      { en: "105,500 lbs (47,854 kg)", pa: "105,500 ਪੌਂਡ (47,854 kg)" },
      { en: "139,991 lbs (63,500 kg)", pa: "139,991 ਪੌਂਡ (63,500 kg)" },
      { en: "150,000 lbs (68,039 kg)", pa: "150,000 ਪੌਂਡ (68,039 kg)" },
    ],
    correct: 2,
    explanation: {
      en: "The maximum gross vehicle weight in Ontario is 63,500 kg (139,991 lbs) for standard configurations.",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਸਟੈਂਡਰਡ ਕੌਨਫ਼ਿਗਰੇਸ਼ਨ ਲਈ ਵੱਧ ਤੋਂ ਵੱਧ ਕੁੱਲ ਵਾਹਨ ਭਾਰ 63,500 kg (139,991 ਪੌਂਡ) ਹੈ।",
    },
  },
  {
    q: {
      en: "When is it legal to pass another vehicle using the shoulder of the road?",
      pa: "ਸੜਕ ਦੇ ਕਿਨਾਰੇ (ਸ਼ੋਲਡਰ) ਵਰਤ ਕੇ ਹੋਰ ਵਾਹਨ ਨੂੰ ਲੰਘਣਾ ਕਦੋਂ ਕਾਨੂੰਨੀ ਹੈ?",
    },
    options: [
      { en: "When the vehicle ahead is turning left", pa: "ਜਦੋਂ ਅੱਗੇ ਵਾਲਾ ਵਾਹਨ ਖੱਬੇ ਮੁੜ ਰਿਹਾ ਹੋਵੇ" },
      { en: "When traffic is heavy", pa: "ਜਦੋਂ ਟ੍ਰੈਫਿਕ ਜ਼ਿਆਦਾ ਹੋਵੇ" },
      { en: "It is never legal", pa: "ਇਹ ਕਦੇ ਵੀ ਕਾਨੂੰਨੀ ਨਹੀਂ ਹੈ" },
      { en: "When the speed limit is under 50 km/h", pa: "ਜਦੋਂ ਸਪੀਡ ਲਿਮਿਟ 50 km/h ਤੋਂ ਘੱਟ ਹੋਵੇ" },
    ],
    correct: 2,
    explanation: {
      en: "It is never legal to pass using the shoulder. The shoulder is for emergencies only.",
      pa: "ਸ਼ੋਲਡਰ ਵਰਤ ਕੇ ਲੰਘਣਾ ਕਦੇ ਵੀ ਕਾਨੂੰਨੀ ਨਹੀਂ। ਸ਼ੋਲਡਰ ਸਿਰਫ਼ ਐਮਰਜੈਂਸੀ ਲਈ ਹੈ।",
    },
  },
  {
    q: {
      en: "What must you do when an emergency vehicle with flashing lights approaches from behind?",
      pa: "ਜਦੋਂ ਝਪਕਦੀਆਂ ਬੱਤੀਆਂ ਵਾਲਾ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਪਿੱਛੇ ਤੋਂ ਆਵੇ ਤਾਂ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "Speed up to get out of the way", pa: "ਰਸਤੇ ਤੋਂ ਹਟਣ ਲਈ ਤੇਜ਼ ਕਰੋ" },
      { en: "Pull over to the right and stop", pa: "ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕੋ" },
      { en: "Move to the left lane", pa: "ਖੱਬੀ ਲੇਨ ਵਿੱਚ ਚਲੇ ਜਾਓ" },
      { en: "Continue at the same speed", pa: "ਉਸੇ ਸਪੀਡ ਨਾਲ ਜਾਰੀ ਰੱਖੋ" },
    ],
    correct: 1,
    explanation: {
      en: "You must pull over to the right side of the road and stop to let the emergency vehicle pass safely.",
      pa: "ਤੁਹਾਨੂੰ ਸੜਕ ਦੇ ਸੱਜੇ ਪਾਸੇ ਖੜ੍ਹੇ ਹੋ ਕੇ ਰੁਕਣਾ ਚਾਹੀਦਾ ਤਾਂ ਜੋ ਐਮਰਜੈਂਸੀ ਵਾਹਨ ਸੁਰੱਖਿਅਤ ਲੰਘ ਸਕੇ।",
    },
  },
  {
    q: {
      en: "What should you check first during a pre-trip inspection?",
      pa: "ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਦੀ ਜਾਂਚ ਵਿੱਚ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਚੈੱਕ ਕਰਨਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "Radio and air conditioning", pa: "ਰੇਡੀਓ ਤੇ AC" },
      { en: "Previous driver's inspection report", pa: "ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਜਾਂਚ ਰਿਪੋਰਟ" },
      { en: "Windshield wipers", pa: "ਵਿੰਡਸ਼ੀਲਡ ਵਾਈਪਰ" },
      { en: "Seat adjustment", pa: "ਸੀਟ ਦੀ ਐਡਜਸਟਮੈਂਟ" },
    ],
    correct: 1,
    explanation: {
      en: "Always check the previous driver's vehicle condition report (VCR) first to know about any outstanding defects.",
      pa: "ਹਮੇਸ਼ਾ ਪਹਿਲਾਂ ਪਿਛਲੇ ਡਰਾਈਵਰ ਦੀ ਵਾਹਨ ਹਾਲਤ ਰਿਪੋਰਟ (VCR) ਚੈੱਕ ਕਰੋ ਤਾਂ ਜੋ ਬਾਕੀ ਨੁਕਸਾਂ ਬਾਰੇ ਪਤਾ ਲੱਗੇ।",
    },
  },
  {
    q: {
      en: "What does a solid yellow line on your side of the road mean?",
      pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਸੜਕ ਤੇ ਪੱਕੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਕੀ ਮਤਲਬ ਹੈ?",
    },
    options: [
      { en: "You may pass when safe", pa: "ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਲੰਘ ਸਕਦੇ ਹੋ" },
      { en: "No passing allowed from your side", pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਤੋਂ ਲੰਘਣਾ ਮਨ੍ਹਾ ਹੈ" },
      { en: "Construction zone ahead", pa: "ਅੱਗੇ ਉਸਾਰੀ ਜ਼ੋਨ" },
      { en: "Lane ends ahead", pa: "ਅੱਗੇ ਲੇਨ ਖ਼ਤਮ ਹੁੰਦੀ ਹੈ" },
    ],
    correct: 1,
    explanation: {
      en: "A solid yellow line on your side means no passing. A broken yellow line means you may pass when safe.",
      pa: "ਤੁਹਾਡੇ ਪਾਸੇ ਪੱਕੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਮਤਲਬ ਲੰਘਣਾ ਮਨ੍ਹਾ। ਟੁੱਟੀ ਪੀਲੀ ਲਾਈਨ ਦਾ ਮਤਲਬ ਸੁਰੱਖਿਅਤ ਹੋਣ ਤੇ ਲੰਘ ਸਕਦੇ ਹੋ।",
    },
  },
  {
    q: {
      en: "If you are involved in a collision causing more than $2,000 damage, you must:",
      pa: "ਜੇ ਤੁਸੀਂ $2,000 ਤੋਂ ਵੱਧ ਨੁਕਸਾਨ ਵਾਲੀ ਟੱਕਰ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋ, ਤਾਂ ਤੁਹਾਨੂੰ:",
    },
    options: [
      { en: "Exchange information and leave", pa: "ਜਾਣਕਾਰੀ ਦਾ ਅਦਾਨ-ਪ੍ਰਦਾਨ ਕਰੋ ਤੇ ਚਲੇ ਜਾਓ" },
      { en: "Report to a Collision Reporting Centre or police within 24 hours", pa: "24 ਘੰਟਿਆਂ ਵਿੱਚ ਟੱਕਰ ਰਿਪੋਰਟਿੰਗ ਸੈਂਟਰ ਜਾਂ ਪੁਲਿਸ ਨੂੰ ਰਿਪੋਰਟ ਕਰੋ" },
      { en: "Call your insurance only", pa: "ਸਿਰਫ਼ ਆਪਣੀ ਇੰਸ਼ੋਰੈਂਸ ਨੂੰ ਕਾਲ ਕਰੋ" },
      { en: "Wait 48 hours then file a report", pa: "48 ਘੰਟੇ ਉਡੀਕ ਕਰੋ ਫਿਰ ਰਿਪੋਰਟ ਦਰਜ ਕਰੋ" },
    ],
    correct: 1,
    explanation: {
      en: "In Ontario, collisions with over $2,000 damage or injuries must be reported to a Collision Reporting Centre or police within 24 hours.",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ $2,000 ਤੋਂ ਵੱਧ ਨੁਕਸਾਨ ਜਾਂ ਸੱਟਾਂ ਵਾਲੀ ਟੱਕਰ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਟੱਕਰ ਰਿਪੋਰਟਿੰਗ ਸੈਂਟਰ ਜਾਂ ਪੁਲਿਸ ਨੂੰ ਰਿਪੋਰਟ ਕਰਨੀ ਜ਼ਰੂਰੀ ਹੈ।",
    },
  },
  {
    q: {
      en: "What is the purpose of an ELD (Electronic Logging Device)?",
      pa: "ELD (ਇਲੈਕਟ੍ਰਾਨਿਕ ਲੌਗਿੰਗ ਡਿਵਾਈਸ) ਦਾ ਮਕਸਦ ਕੀ ਹੈ?",
    },
    options: [
      { en: "Track fuel consumption", pa: "ਬਾਲਣ ਦੀ ਖਪਤ ਟ੍ਰੈਕ ਕਰਨਾ" },
      { en: "Monitor vehicle speed only", pa: "ਸਿਰਫ਼ ਵਾਹਨ ਦੀ ਸਪੀਡ ਦੀ ਨਿਗਰਾਨੀ ਕਰਨਾ" },
      { en: "Automatically record driving time and HOS compliance", pa: "ਡਰਾਈਵਿੰਗ ਸਮਾਂ ਤੇ HOS ਪਾਲਣਾ ਆਪਣੇ-ਆਪ ਰਿਕਾਰਡ ਕਰਨਾ" },
      { en: "Replace the vehicle's GPS system", pa: "ਵਾਹਨ ਦੇ GPS ਸਿਸਟਮ ਦੀ ਥਾਂ ਲੈਣਾ" },
    ],
    correct: 2,
    explanation: {
      en: "ELDs automatically record driving time and ensure compliance with Hours of Service regulations. They replaced paper logbooks in Canada.",
      pa: "ELD ਆਪਣੇ-ਆਪ ਡਰਾਈਵਿੰਗ ਸਮਾਂ ਰਿਕਾਰਡ ਕਰਦੇ ਹਨ ਤੇ ਸੇਵਾ ਦੇ ਘੰਟਿਆਂ ਦੇ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹਨ। ਇਹਨਾਂ ਨੇ ਕੈਨੇਡਾ ਵਿੱਚ ਕਾਗਜ਼ੀ ਲੌਗਬੁੱਕ ਦੀ ਥਾਂ ਲਈ।",
    },
  },
  {
    q: {
      en: "When driving on a wet road, you should increase your following distance by:",
      pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਗੱਡੀ ਚਲਾਉਂਦੇ ਸਮੇਂ ਫਾਲੋਇੰਗ ਦੂਰੀ ਕਿੰਨੀ ਵਧਾਉਣੀ ਚਾਹੀਦੀ?",
    },
    options: [
      { en: "No change needed", pa: "ਕੋਈ ਬਦਲਾਅ ਦੀ ਲੋੜ ਨਹੀਂ" },
      { en: "Double the normal distance", pa: "ਆਮ ਦੂਰੀ ਤੋਂ ਦੁੱਗਣੀ" },
      { en: "Triple the normal distance", pa: "ਆਮ ਦੂਰੀ ਤੋਂ ਤਿੱਗਣੀ" },
      { en: "Add 1 second only", pa: "ਸਿਰਫ਼ 1 ਸਕਿੰਟ ਵਧਾਓ" },
    ],
    correct: 1,
    explanation: {
      en: "On wet roads, you should at least double your following distance because stopping distance increases significantly.",
      pa: "ਗਿੱਲੀ ਸੜਕ ਤੇ ਫਾਲੋਇੰਗ ਦੂਰੀ ਘੱਟੋ-ਘੱਟ ਦੁੱਗਣੀ ਕਰੋ ਕਿਉਂਕਿ ਰੁਕਣ ਦੀ ਦੂਰੀ ਬਹੁਤ ਵਧ ਜਾਂਦੀ ਹੈ।",
    },
  },
  {
    q: {
      en: "What is 'Driver Inc.' and why should you avoid it?",
      pa: "'ਡਰਾਈਵਰ ਇੰਕ.' ਕੀ ਹੈ ਤੇ ਇਸ ਤੋਂ ਕਿਉਂ ਬਚਣਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "A legitimate trucking company", pa: "ਇੱਕ ਜਾਇਜ਼ ਟਰੱਕਿੰਗ ਕੰਪਨੀ" },
      { en: "A scam where drivers are misclassified as independent contractors to avoid taxes and benefits", pa: "ਇੱਕ ਘਪਲਾ ਜਿਸ ਵਿੱਚ ਡਰਾਈਵਰਾਂ ਨੂੰ ਟੈਕਸ ਤੇ ਲਾਭ ਬਚਾਉਣ ਲਈ ਗ਼ਲਤ ਤਰੀਕੇ ਨਾਲ ਸੁਤੰਤਰ ਠੇਕੇਦਾਰ ਦੱਸਿਆ ਜਾਂਦਾ" },
      { en: "A new type of driving licence", pa: "ਇੱਕ ਨਵੀਂ ਕਿਸਮ ਦਾ ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ" },
      { en: "A government program for truckers", pa: "ਟਰੱਕ ਡਰਾਈਵਰਾਂ ਲਈ ਸਰਕਾਰੀ ਪ੍ਰੋਗਰਾਮ" },
    ],
    correct: 1,
    explanation: {
      en: "Driver Inc. is a scheme where carriers misclassify employees as contractors. Drivers lose EI, CPP, vacation pay, and WSIB coverage — and owe taxes they weren't expecting.",
      pa: "ਡਰਾਈਵਰ ਇੰਕ. ਇੱਕ ਸਕੀਮ ਹੈ ਜਿੱਥੇ ਕੈਰੀਅਰ ਮੁਲਾਜ਼ਮਾਂ ਨੂੰ ਠੇਕੇਦਾਰ ਦੱਸਦੇ ਹਨ। ਡਰਾਈਵਰ EI, CPP, ਛੁੱਟੀ ਤਨਖ਼ਾਹ ਤੇ WSIB ਕਵਰੇਜ ਗੁਆ ਲੈਂਦੇ ਹਨ — ਤੇ ਅਣਕਿਆਸੇ ਟੈਕਸ ਦੇਣੇ ਪੈਂਦੇ ਹਨ।",
    },
  },
  {
    q: {
      en: "How far before a turn must you signal when driving a commercial vehicle?",
      pa: "ਕਮਰਸ਼ੀਅਲ ਵਾਹਨ ਚਲਾਉਂਦੇ ਸਮੇਂ ਮੋੜ ਤੋਂ ਕਿੰਨੀ ਦੂਰ ਪਹਿਲਾਂ ਸਿਗਨਲ ਦੇਣਾ ਚਾਹੀਦਾ?",
    },
    options: [
      { en: "30 metres (100 feet)", pa: "30 ਮੀਟਰ (100 ਫੁੱਟ)" },
      { en: "60 metres (200 feet)", pa: "60 ਮੀਟਰ (200 ਫੁੱਟ)" },
      { en: "100 metres (300 feet)", pa: "100 ਮੀਟਰ (300 ਫੁੱਟ)" },
      { en: "15 metres (50 feet)", pa: "15 ਮੀਟਰ (50 ਫੁੱਟ)" },
    ],
    correct: 0,
    explanation: {
      en: "In Ontario, you must signal at least 30 metres (100 feet) before making a turn.",
      pa: "ਓਨਟਾਰੀਓ ਵਿੱਚ ਮੋੜ ਲੈਣ ਤੋਂ ਘੱਟੋ-ਘੱਟ 30 ਮੀਟਰ (100 ਫੁੱਟ) ਪਹਿਲਾਂ ਸਿਗਨਲ ਦੇਣਾ ਜ਼ਰੂਰੀ ਹੈ।",
    },
  },
];

export function LicenseQuizContent() {
  const { t } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const question = questions[currentQ];

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
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/tools" className="hover:text-foreground">{t({ en: "Tools", pa: "ਟੂਲ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{t({ en: "License Quiz", pa: "ਲਾਇਸੈਂਸ ਕੁਇਜ਼" })}</span>
      </nav>

      <div className="flex items-center justify-between">
        <div />
        <LanguageToggle />
      </div>

      <div className="mt-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
          <BookOpen className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
          {t({ en: "Truck License Exam Practice", pa: "ਟਰੱਕ ਲਾਇਸੈਂਸ ਪ੍ਰੀਖਿਆ ਅਭਿਆਸ" })}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {t({
            en: `${questions.length} practice questions for Ontario Class A/D knowledge test. Switch between English and ਪੰਜਾਬੀ anytime.`,
            pa: `ਓਨਟਾਰੀਓ ਕਲਾਸ A/D ਨੌਲਿਜ ਟੈਸਟ ਲਈ ${questions.length} ਅਭਿਆਸ ਸਵਾਲ। ਕਿਸੇ ਵੀ ਸਮੇਂ English ਤੇ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲੋ।`,
          })}
        </p>
      </div>

      {/* Score bar */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 text-sm">
        <span>
          {t({ en: "Question", pa: "ਸਵਾਲ" })} {currentQ + 1}/{questions.length}
        </span>
        <span className="font-semibold text-green-600">
          {t({ en: "Score:", pa: "ਸਕੋਰ:" })} {score}/{answered}
        </span>
      </div>

      {!quizDone ? (
        <>
          {/* Question */}
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h2 className="text-lg font-semibold leading-snug">
              {t(question.q)}
            </h2>

            <div className="mt-4 space-y-3">
              {question.options.map((opt, i) => {
                let optionStyle = "border bg-card hover:bg-muted/40 cursor-pointer";
                if (showAnswer) {
                  if (i === question.correct) {
                    optionStyle = "border-2 border-green-500 bg-green-50";
                  } else if (i === selected && i !== question.correct) {
                    optionStyle = "border-2 border-red-400 bg-red-50";
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

            {/* Explanation */}
            {showAnswer && (
              <div className="mt-4 rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-900">
                  {t({ en: "Explanation:", pa: "ਵਿਆਖਿਆ:" })}
                </p>
                <p className="mt-1 text-sm text-blue-800">
                  {t(question.explanation)}
                </p>
              </div>
            )}
          </div>

          {showAnswer && (
            <Button
              onClick={nextQuestion}
              className="mt-4 w-full bg-[#FF6E40] hover:bg-[#FF5722]"
            >
              {currentQ < questions.length - 1
                ? t({ en: "Next Question", pa: "ਅਗਲਾ ਸਵਾਲ" })
                : t({ en: "See Results", pa: "ਨਤੀਜੇ ਵੇਖੋ" })}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </>
      ) : (
        /* Results */
        <div className="mt-6 rounded-xl border bg-card p-8 text-center">
          <div className="text-5xl font-black">
            {score}/{questions.length}
          </div>
          <p className="mt-2 text-lg font-semibold">
            {score >= questions.length * 0.8
              ? t({ en: "Excellent! You're ready!", pa: "ਬਹੁਤ ਵਧੀਆ! ਤੁਸੀਂ ਤਿਆਰ ਹੋ!" })
              : score >= questions.length * 0.6
              ? t({ en: "Good, but review the ones you missed.", pa: "ਵਧੀਆ, ਪਰ ਜੋ ਗ਼ਲਤ ਹੋਏ ਉਹ ਦੁਬਾਰਾ ਪੜ੍ਹੋ।" })
              : t({ en: "Keep studying — you'll get there!", pa: "ਪੜ੍ਹਾਈ ਜਾਰੀ ਰੱਖੋ — ਤੁਸੀਂ ਕਰ ਲਓਗੇ!" })}
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
            <Link href="/tools">
              <Button variant="outline">
                {t({ en: "Back to Tools", pa: "ਟੂਲ ਤੇ ਵਾਪਸ" })}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-xl bg-muted/40 p-6 text-sm text-muted-foreground leading-relaxed">
        <h2 className="mb-2 text-base font-semibold text-foreground">
          {t({ en: "About This Quiz", pa: "ਇਸ ਕੁਇਜ਼ ਬਾਰੇ" })}
        </h2>
        <p>
          {t({
            en: "This practice quiz covers topics from the Ontario Class A and D commercial driver's knowledge test including Hours of Service, road rules, vehicle inspections, weight limits, and safety regulations. These are practice questions only — the actual MTO test may differ. Study the Official MTO Truck Handbook for complete preparation.",
            pa: "ਇਹ ਅਭਿਆਸ ਕੁਇਜ਼ ਓਨਟਾਰੀਓ ਕਲਾਸ A ਤੇ D ਕਮਰਸ਼ੀਅਲ ਡਰਾਈਵਰ ਨੌਲਿਜ ਟੈਸਟ ਦੇ ਵਿਸ਼ਿਆਂ ਨੂੰ ਕਵਰ ਕਰਦੀ ਹੈ ਜਿਵੇਂ ਸੇਵਾ ਦੇ ਘੰਟੇ, ਸੜਕ ਨਿਯਮ, ਵਾਹਨ ਜਾਂਚ, ਭਾਰ ਹੱਦਾਂ ਤੇ ਸੇਫਟੀ ਨਿਯਮ। ਇਹ ਸਿਰਫ਼ ਅਭਿਆਸ ਸਵਾਲ ਹਨ — ਅਸਲ MTO ਟੈਸਟ ਵੱਖਰਾ ਹੋ ਸਕਦਾ। ਪੂਰੀ ਤਿਆਰੀ ਲਈ ਅਧਿਕਾਰਤ MTO ਟਰੱਕ ਹੈਂਡਬੁੱਕ ਪੜ੍ਹੋ।",
          })}
        </p>
      </div>
    </div>
  );
}
