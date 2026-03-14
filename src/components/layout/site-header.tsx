import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function SemiTruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" className={className}>
      {/* Peterbilt-style front-facing semi */}
      <rect x="2" y="0" width="2.5" height="10" rx="1.2" />
      <rect x="27.5" y="0" width="2.5" height="10" rx="1.2" />
      <rect x="1.5" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
      <rect x="27" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
      <rect x="7" y="3" width="18" height="4" rx="1" fill="white" opacity="0.9" />
      <text x="16" y="6.2" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">DESIRIG</text>
      <rect x="6" y="7" width="20" height="10" rx="2" />
      <rect x="8.5" y="8" width="15" height="6" rx="1" fill="white" opacity="0.85" />
      <line x1="16" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="0.8" />
      <rect x="5" y="17" width="22" height="6" rx="1.5" />
      <line x1="16" y1="17" x2="16" y2="23" stroke="white" strokeWidth="0.6" opacity="0.3" />
      <rect x="8" y="18" width="16" height="4" rx="0.8" fill="white" opacity="0.2" />
      <line x1="10" y1="18" x2="10" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="12.5" y1="18" x2="12.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="18" x2="15" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="17" y1="18" x2="17" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="19.5" y1="18" x2="19.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="22" y1="18" x2="22" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <circle cx="6.5" cy="19.5" r="2" fill="#FCD34D" />
      <circle cx="25.5" cy="19.5" r="2" fill="#FCD34D" />
      <circle cx="6.5" cy="19.5" r="1" fill="white" opacity="0.5" />
      <circle cx="25.5" cy="19.5" r="1" fill="white" opacity="0.5" />
      <rect x="4" y="23" width="24" height="2.5" rx="1" fill="white" opacity="0.3" />
      <rect x="4" y="23" width="24" height="2.5" rx="1" />
      <rect x="1" y="9" width="4" height="3" rx="1" />
      <rect x="27" y="9" width="4" height="3" rx="1" />
      <circle cx="9" cy="28" r="2.5" />
      <circle cx="23" cy="28" r="2.5" />
      <circle cx="9" cy="28" r="1" fill="white" opacity="0.3" />
      <circle cx="23" cy="28" r="1" fill="white" opacity="0.3" />
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
        <Link href="/" className="flex items-center gap-2">
          <TurbanIcon />
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
