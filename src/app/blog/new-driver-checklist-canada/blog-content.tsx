"use client";

import Link from "next/link";
import { ChevronRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
      <span className="text-sm">{children}</span>
    </div>
  );
}

export function NewDriverChecklistContent({
  title,
  description,
  date,
  readTime,
}: {
  title: string;
  description: string;
  date: string;
  readTime: string;
}) {
  const { t } = useLanguage();

  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">{t({ en: "Home", pa: "ਹੋਮ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/blog" className="hover:text-foreground">{t({ en: "Blog", pa: "ਬਲੌਗ" })}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground line-clamp-1">{t({ en: "New Driver Checklist", pa: "ਨਵੇਂ ਡਰਾਈਵਰ ਦੀ ਚੈੱਕਲਿਸਟ" })}</span>
      </nav>

      <div className="flex items-center justify-between mb-4">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {t({ en: "Guides", pa: "ਗਾਈਡ" })}
        </span>
        <LanguageToggle />
      </div>

      <header>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t({ en: title, pa: "ਕੈਨੇਡਾ ਵਿੱਚ ਨਵੇਂ ਟਰੱਕ ਡਰਾਈਵਰ ਦੀ ਪੂਰੀ ਚੈੱਕਲਿਸਟ" })}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t({ en: description, pa: "ਕੈਨੇਡਾ ਵਿੱਚ ਟਰੱਕ ਚਲਾਉਣਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸਭ ਕੁਝ ਜੋ ਤੁਹਾਨੂੰ ਚਾਹੀਦਾ ਹੈ, ਲਾਇਸੈਂਸ ਤੋਂ ਲੈ ਕੇ ਪਹਿਲੀ ਨੌਕਰੀ ਤੱਕ।" })}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {date} &middot; {readTime}
        </p>
      </header>

      <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-foreground text-lg">
          {t({
            en: "Moving to Canada and want to drive truck? Already here with a G license and want to upgrade? Here's everything you need, step by step. No fluff.",
            pa: "ਕੈਨੇਡਾ ਆ ਕੇ ਟਰੱਕ ਚਲਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਜਾਂ ਪਹਿਲਾਂ ਹੀ ਇੱਥੇ ਹੋ ਤੇ G ਲਾਇਸੈਂਸ ਅੱਪਗ੍ਰੇਡ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? ਇਹ ਰਿਹਾ ਪੂਰਾ ਗਾਈਡ, ਕਦਮ-ਦਰ-ਕਦਮ। ਕੋਈ ਫ਼ਾਲਤੂ ਗੱਲ ਨਹੀਂ।",
          })}
        </p>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Step 1: Get Your AZ/Class 1 License", pa: "ਕਦਮ 1: AZ/Class 1 ਲਾਇਸੈਂਸ ਲਓ" })}
        </h2>
        <div className="space-y-2">
          <Item>{t({
            en: <>Find a driving school. Check our{" "}
              <Link href="/brampton-on/driving-school" className="text-orange-600 hover:underline">Brampton driving schools</Link>
              {" "}or{" "}
              <Link href="/surrey-bc/driving-school" className="text-orange-600 hover:underline">Surrey driving schools</Link></>,
            pa: <>ਡਰਾਈਵਿੰਗ ਸਕੂਲ ਲੱਭੋ, ਸਾਡੇ{" "}
              <Link href="/brampton-on/driving-school" className="text-orange-600 hover:underline">Brampton ਡਰਾਈਵਿੰਗ ਸਕੂਲ</Link>
              {" "}ਜਾਂ{" "}
              <Link href="/surrey-bc/driving-school" className="text-orange-600 hover:underline">Surrey ਡਰਾਈਵਿੰਗ ਸਕੂਲ</Link> ਦੇਖੋ</>
          })}</Item>
          <Item>{t({ en: "Get a medical exam (need a doctor's clearance)", pa: "ਮੈਡੀਕਲ ਟੈਸਟ ਕਰਾਓ (ਡਾਕਟਰ ਦੀ ਕਲੀਅਰੈਂਸ ਚਾਹੀਦੀ)" })}</Item>
          <Item>{t({ en: "Pass the written knowledge test at a DriveTest centre", pa: "DriveTest ਸੈਂਟਰ ਤੇ ਲਿਖਤੀ ਨਾਲਿਜ ਟੈਸਟ ਪਾਸ ਕਰੋ" })}</Item>
          <Item>{t({ en: "Complete mandatory training (MELT in Ontario, MELT in Alberta, etc.)", pa: "ਲਾਜ਼ਮੀ ਟ੍ਰੇਨਿੰਗ ਪੂਰੀ ਕਰੋ (Ontario ਵਿੱਚ MELT, Alberta ਵਿੱਚ MELT, ਆਦਿ)" })}</Item>
          <Item>{t({ en: "Pass the road test with air brake endorsement", pa: "ਏਅਰ ਬ੍ਰੇਕ ਐਂਡੋਰਸਮੈਂਟ ਨਾਲ ਰੋਡ ਟੈਸਟ ਪਾਸ ਕਰੋ" })}</Item>
          <Item>{t({ en: "Budget: $5,000 to $10,000 for driving school (shop around)", pa: "ਬਜਟ: $5,000 ਤੋਂ $10,000 ਡਰਾਈਵਿੰਗ ਸਕੂਲ ਲਈ (ਕਈ ਥਾਵਾਂ ਤੋਂ ਰੇਟ ਪੁੱਛੋ)" })}</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Step 2: Get Your Medical & Drug Test", pa: "ਕਦਮ 2: ਮੈਡੀਕਲ ਤੇ ਡਰੱਗ ਟੈਸਟ ਕਰਾਓ" })}
        </h2>
        <div className="space-y-2">
          <Item>{t({
            en: <>DOT medical exam. Find a{" "}
              <Link href="/brampton-on/medical-exam-clinic" className="text-orange-600 hover:underline">medical exam clinic</Link></>,
            pa: <>DOT ਮੈਡੀਕਲ ਟੈਸਟ,{" "}
              <Link href="/brampton-on/medical-exam-clinic" className="text-orange-600 hover:underline">ਮੈਡੀਕਲ ਟੈਸਟ ਕਲੀਨਿਕ</Link> ਲੱਭੋ</>
          })}</Item>
          <Item>{t({
            en: <>Pre-employment drug and alcohol test. Find a{" "}
              <Link href="/brampton-on/drug-alcohol-testing" className="text-orange-600 hover:underline">testing centre</Link></>,
            pa: <>ਨੌਕਰੀ ਤੋਂ ਪਹਿਲਾਂ ਡਰੱਗ ਤੇ ਅਲਕੋਹਲ ਟੈਸਟ,{" "}
              <Link href="/brampton-on/drug-alcohol-testing" className="text-orange-600 hover:underline">ਟੈਸਟਿੰਗ ਸੈਂਟਰ</Link> ਲੱਭੋ</>
          })}</Item>
          <Item>{t({ en: "FAST card application (optional but helpful for cross-border)", pa: "FAST ਕਾਰਡ ਅਪਲਾਈ ਕਰੋ (ਜ਼ਰੂਰੀ ਨਹੀਂ ਪਰ ਕਰਾਸ-ਬਾਰਡਰ ਲਈ ਫ਼ਾਇਦੇਮੰਦ)" })}</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Step 3: Choose the Right Company", pa: "ਕਦਮ 3: ਸਹੀ ਕੰਪਨੀ ਚੁਣੋ" })}
        </h2>
        <p>
          {t({
            en: "This is where most new drivers make mistakes. Don't just sign with the first company that offers you a job.",
            pa: "ਇੱਥੇ ਬਹੁਤੇ ਨਵੇਂ ਡਰਾਈਵਰ ਗਲਤੀ ਕਰਦੇ ਹਨ। ਪਹਿਲੀ ਕੰਪਨੀ ਜੋ ਨੌਕਰੀ ਦੇਵੇ ਉਸ ਨਾਲ ਸਾਈਨ ਨਾ ਕਰੋ।",
          })}
        </p>
        <div className="space-y-2">
          <Item>{t({
            en: <>Check safety records on{" "}
              <Link href="/safety" className="text-orange-600 hover:underline">DesiRig Safety Lookup</Link></>,
            pa: <><Link href="/safety" className="text-orange-600 hover:underline">DesiRig ਸੇਫਟੀ ਲੁੱਕਅੱਪ</Link> ਤੇ ਸੇਫਟੀ ਰਿਕਾਰਡ ਚੈੱਕ ਕਰੋ</>
          })}</Item>
          <Item>{t({ en: "Ask about pay structure: per mile, per load, or hourly", pa: "ਤਨਖ਼ਾਹ ਬਾਰੇ ਪੁੱਛੋ: ਪ੍ਰਤੀ ਮੀਲ, ਪ੍ਰਤੀ ਲੋਡ, ਜਾਂ ਘੰਟੇ ਮੁਤਾਬਕ" })}</Item>
          <Item>{t({ en: "Ask about truck maintenance. Who pays for repairs?", pa: "ਟਰੱਕ ਦੀ ਸਾਂਭ-ਸੰਭਾਲ ਬਾਰੇ ਪੁੱਛੋ। ਮੁਰੰਮਤ ਦਾ ਖ਼ਰਚਾ ਕੌਣ ਦਿੰਦਾ?" })}</Item>
          <Item>{t({ en: "Talk to current drivers (not just the recruiter)", pa: "ਮੌਜੂਦਾ ਡਰਾਈਵਰਾਂ ਨਾਲ ਗੱਲ ਕਰੋ (ਸਿਰਫ਼ ਰਿਕਰੂਟਰ ਨਾਲ ਨਹੀਂ)" })}</Item>
          <Item>{t({ en: "Read the contract carefully, especially termination clauses", pa: "ਕੰਟਰੈਕਟ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹੋ, ਖ਼ਾਸ ਕਰਕੇ ਨੌਕਰੀ ਛੱਡਣ ਦੀਆਂ ਸ਼ਰਤਾਂ" })}</Item>
          <Item>{t({ en: "Avoid companies that want you to \"lease\" a truck with them immediately", pa: "ਉਹ ਕੰਪਨੀਆਂ ਤੋਂ ਬਚੋ ਜੋ ਤੁਰੰਤ ਟਰੱਕ \"ਲੀਜ਼\" ਕਰਾਉਣਾ ਚਾਹੁਣ" })}</Item>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-900">
            {t({ en: "Warning: Driver Inc. Scams", pa: "ਖ਼ਬਰਦਾਰ: Driver Inc. ਘਪਲੇ" })}
          </h3>
          <p className="mt-2 text-sm text-red-700">
            {t({
              en: "Some companies will ask you to incorporate and work as an \"independent contractor\" even though you&apos;re really an employee. This is called \"Driver Inc.\" and it&apos;s illegal in many provinces. You lose EI, CPP, and workers comp protections. If they ask you to incorporate to get a job, run.",
              pa: "ਕੁਝ ਕੰਪਨੀਆਂ ਤੁਹਾਨੂੰ ਇੰਕਾਰਪੋਰੇਟ ਕਰਕੇ \"ਇੰਡੀਪੈਂਡੈਂਟ ਕੰਟਰੈਕਟਰ\" ਵਜੋਂ ਕੰਮ ਕਰਨ ਲਈ ਕਹਿਣਗੀਆਂ ਭਾਵੇਂ ਤੁਸੀਂ ਅਸਲ ਵਿੱਚ ਕਰਮਚਾਰੀ ਹੋ। ਇਸ ਨੂੰ \"Driver Inc.\" ਕਹਿੰਦੇ ਹਨ ਤੇ ਇਹ ਕਈ ਸੂਬਿਆਂ ਵਿੱਚ ਗੈਰ-ਕਾਨੂੰਨੀ ਹੈ। ਤੁਸੀਂ EI, CPP, ਤੇ ਵਰਕਰਜ਼ ਕੰਪ ਸੁਰੱਖਿਆ ਗੁਆ ਲੈਂਦੇ ਹੋ। ਜੇ ਨੌਕਰੀ ਲਈ ਇੰਕਾਰਪੋਰੇਟ ਕਰਨ ਲਈ ਕਹਿਣ, ਭੱਜ ਜਾਓ।",
            })}
          </p>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Step 4: Essential Gear", pa: "ਕਦਮ 4: ਜ਼ਰੂਰੀ ਸਾਮਾਨ" })}
        </h2>
        <div className="space-y-2">
          <Item>{t({ en: "Steel-toe boots (mandatory at most shippers/receivers)", pa: "ਸਟੀਲ-ਟੋ ਬੂਟ (ਜ਼ਿਆਦਾਤਰ ਸ਼ਿਪਰ/ਰਿਸੀਵਰ ਤੇ ਲਾਜ਼ਮੀ)" })}</Item>
          <Item>{t({ en: "Hi-vis vest", pa: "ਹਾਈ-ਵਿਜ਼ ਵੈਸਟ" })}</Item>
          <Item>{t({ en: "Work gloves", pa: "ਕੰਮ ਵਾਲੇ ਦਸਤਾਨੇ" })}</Item>
          <Item>{t({ en: "Flashlight (headlamp is even better)", pa: "ਫਲੈਸ਼ਲਾਈਟ (ਹੈੱਡਲੈਂਪ ਹੋਰ ਵੀ ਵਧੀਆ)" })}</Item>
          <Item>{t({ en: "Tire pressure gauge", pa: "ਟਾਇਰ ਪ੍ਰੈਸ਼ਰ ਗੇਜ" })}</Item>
          <Item>{t({ en: "Logbook or ELD knowledge", pa: "ਲੌਗਬੁੱਕ ਜਾਂ ELD ਦੀ ਜਾਣਕਾਰੀ" })}</Item>
          <Item>{t({ en: "GPS (truck-specific, NOT regular car GPS)", pa: "GPS (ਟਰੱਕ ਵਾਲਾ, ਕਾਰ ਵਾਲਾ ਨਹੀਂ)" })}</Item>
          <Item>{t({ en: "Good cooler and water bottles for the road", pa: "ਵਧੀਆ ਕੂਲਰ ਤੇ ਪਾਣੀ ਦੀਆਂ ਬੋਤਲਾਂ ਸਫ਼ਰ ਲਈ" })}</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "Step 5: Know the Rules", pa: "ਕਦਮ 5: ਨਿਯਮ ਜਾਣੋ" })}
        </h2>
        <div className="space-y-2">
          <Item>{t({ en: "Hours of Service (HOS): 13 hours driving, 14 hours on-duty max", pa: "Hours of Service (HOS): ਵੱਧ ਤੋਂ ਵੱਧ 13 ਘੰਟੇ ਡਰਾਈਵਿੰਗ, 14 ਘੰਟੇ ਡਿਊਟੀ ਤੇ" })}</Item>
          <Item>{t({ en: "Pre-trip and post-trip inspections. Do them every single time.", pa: "ਸਫ਼ਰ ਤੋਂ ਪਹਿਲਾਂ ਤੇ ਬਾਅਦ ਇੰਸਪੈਕਸ਼ਨ। ਹਰ ਵਾਰ ਕਰੋ।" })}</Item>
          <Item>{t({ en: "Weight limits: 80,000 lbs gross in most provinces", pa: "ਭਾਰ ਦੀ ਹੱਦ: ਜ਼ਿਆਦਾਤਰ ਸੂਬਿਆਂ ਵਿੱਚ 80,000 lbs ਗ੍ਰਾਸ" })}</Item>
          <Item>{t({ en: "Air brake check procedures. You WILL be tested at scales.", pa: "ਏਅਰ ਬ੍ਰੇਕ ਚੈੱਕ ਦਾ ਤਰੀਕਾ। ਸਕੇਲ ਤੇ ਜ਼ਰੂਰ ਚੈੱਕ ਹੋਵੇਗਾ।" })}</Item>
          <Item>{t({ en: "Chain laws in winter (BC, Alberta especially)", pa: "ਸਰਦੀਆਂ ਵਿੱਚ ਚੇਨ ਲਾਉਣ ਦੇ ਨਿਯਮ (ਖ਼ਾਸ ਕਰਕੇ BC, Alberta)" })}</Item>
        </div>

        <h2 className="text-xl font-semibold text-foreground pt-4">
          {t({ en: "You're Ready", pa: "ਤੁਸੀਂ ਤਿਆਰ ਹੋ" })}
        </h2>
        <p>
          {t({
            en: "Trucking is hard work but it pays well. The Desi trucking community in Canada is strong. Lean on it. Use DesiRig to find companies, mechanics, and services you can trust.",
            pa: "ਟਰੱਕਿੰਗ ਔਖਾ ਕੰਮ ਹੈ ਪਰ ਪੈਸੇ ਚੰਗੇ ਮਿਲਦੇ ਹਨ। ਕੈਨੇਡਾ ਵਿੱਚ ਦੇਸੀ ਟਰੱਕਿੰਗ ਕਮਿਊਨਿਟੀ ਮਜ਼ਬੂਤ ਹੈ, ਇਸ ਦਾ ਸਹਾਰਾ ਲਓ। ਭਰੋਸੇਯੋਗ ਕੰਪਨੀਆਂ, ਮਕੈਨਿਕ ਤੇ ਸਰਵਿਸ ਲੱਭਣ ਲਈ DesiRig ਵਰਤੋ।",
          })}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/brampton-on/trucking-company">
            <Button className="bg-orange-500 hover:bg-orange-600">
              {t({ en: "Find Trucking Companies", pa: "ਟਰੱਕਿੰਗ ਕੰਪਨੀਆਂ ਲੱਭੋ" })}
            </Button>
          </Link>
          <Link href="/safety">
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              {t({ en: "Safety Lookup", pa: "ਸੇਫਟੀ ਲੁੱਕਅੱਪ" })}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
