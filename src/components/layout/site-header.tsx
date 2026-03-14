import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function SemiTruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="30" height="22" viewBox="0 0 48 28" fill="currentColor" className={className}>
      {/* Peterbilt 389 side profile — long hood, stacks, sleeper */}
      {/* Exhaust stacks */}
      <rect x="27" y="1" width="1.5" height="8" rx="0.75" />
      <rect x="29.5" y="2" width="1.5" height="7" rx="0.75" />
      {/* Stack caps */}
      <rect x="26.5" y="0" width="2.5" height="1.5" rx="0.5" />
      <rect x="29" y="1" width="2.5" height="1.5" rx="0.5" />
      {/* Sleeper cab */}
      <rect x="18" y="5" width="10" height="14" rx="1.5" />
      {/* Sleeper window */}
      <rect x="20" y="7" width="6" height="4" rx="0.8" fill="white" opacity="0.7" />
      {/* Hood — long Peterbilt style */}
      <rect x="28" y="9" width="14" height="10" rx="1.5" />
      {/* Hood slope */}
      <path d="M42 9 L46 12 L46 19 L42 19 Z" />
      {/* Windshield */}
      <rect x="26.5" y="6" width="3" height="8" rx="0.8" fill="white" opacity="0.8" />
      {/* Headlight */}
      <rect x="45" y="13" width="2" height="3" rx="0.8" fill="#FDE68A" opacity="0.9" />
      {/* Bumper */}
      <rect x="45.5" y="17" width="2.5" height="2" rx="0.5" opacity="0.6" />
      {/* Fuel tank */}
      <rect x="22" y="17" width="5" height="3" rx="1" opacity="0.5" />
      {/* Frame rail */}
      <rect x="0" y="19" width="46" height="1.5" rx="0.5" opacity="0.4" />
      {/* Trailer (partial) */}
      <rect x="0" y="5" width="18" height="14" rx="1" opacity="0.6" />
      <rect x="1" y="6" width="16" height="12" rx="0.5" opacity="0.3" />
      {/* Fifth wheel connection */}
      <rect x="16" y="17" width="4" height="2" rx="0.5" opacity="0.5" />
      {/* Drive wheels (dual) */}
      <circle cx="22" cy="24" r="3.5" />
      <circle cx="22" cy="24" r="1.5" fill="white" opacity="0.2" />
      <circle cx="28" cy="24" r="3.5" />
      <circle cx="28" cy="24" r="1.5" fill="white" opacity="0.2" />
      {/* Steer wheel */}
      <circle cx="42" cy="24" r="3.5" />
      <circle cx="42" cy="24" r="1.5" fill="white" opacity="0.2" />
      {/* Trailer wheel */}
      <circle cx="8" cy="24" r="3.5" />
      <circle cx="8" cy="24" r="1.5" fill="white" opacity="0.2" />
    </svg>
  );
}

function TurbanIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="13" rx="12" ry="11" fill="#FACC15" />
      <path d="M5 14c0-6 5-11 11-11s11 5 11 11" fill="#E5B800" />
      <circle cx="16" cy="10" r="2.5" fill="#FACC15" />
      <circle cx="16" cy="10" r="1.2" fill="#FDE68A" />
      <ellipse cx="16" cy="20" rx="9" ry="8" fill="#C68642" />
      <circle cx="13" cy="19" r="1.2" fill="#1a1a1a" />
      <circle cx="19" cy="19" r="1.2" fill="#1a1a1a" />
      <path d="M13 23c1.5 2 3.5 2.5 5 1.5" stroke="#1a1a1a" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 22c0 5 3.5 7 8 7s8-2 8-7" fill="#333" opacity="0.6" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#FACC15] bg-[#111]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1">
          <SemiTruckIcon className="text-[#FACC15]" />
          <span className="text-xl font-extrabold tracking-tight text-white">
            Desi<span className="text-[#FACC15]">Rig</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "/categories", en: "Browse", pa: "ਖੋਜੋ" },
            { href: "/safety", en: "Safety", pa: "ਸੇਫਟੀ" },
            { href: "/tools", en: "Tools", pa: "ਟੂਲ" },
            { href: "/news", en: "News", pa: "ਖ਼ਬਰਾਂ" },
            { href: "/blog", en: "Blog", pa: "ਬਲੌਗ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#FACC15]/30"
            >
              {item.en}{" "}
              <span className="font-gurmukhi text-xs text-[#FACC15]/70">{item.pa}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button
              variant="ghost"
              size="icon"
              className="hidden rounded-lg border-2 border-[#FACC15] hover:bg-[#FACC15]/30 sm:flex"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
