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

/* MrBobtail-style integrated logo: truck cab + "DesiRig" as trailer */
function DesiRigLogo() {
  return (
    <svg width="140" height="36" viewBox="0 0 280 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* === TRUCK CAB (left side) — Peterbilt sleeper profile === */}
      {/* Exhaust stacks */}
      <rect x="52" y="2" width="3" height="16" rx="1.5" fill="#FACC15" />
      <rect x="57" y="5" width="3" height="13" rx="1.5" fill="#FACC15" />
      {/* Stack caps */}
      <rect x="50.5" y="0" width="6" height="3" rx="1" fill="#FACC15" />
      <rect x="55.5" y="3" width="6" height="3" rx="1" fill="#FACC15" />

      {/* Sleeper cab body */}
      <path d="M30 14 L30 50 L60 50 L60 14 Q60 10 56 10 L34 10 Q30 10 30 14Z" fill="#FACC15" />
      {/* Sleeper window */}
      <rect x="34" y="15" width="12" height="8" rx="2" fill="#111" opacity="0.7" />

      {/* Windshield */}
      <path d="M60 12 L68 18 L68 38 L60 38 Z" fill="#111" opacity="0.5" />
      <path d="M61 14 L67 19 L67 36 L61 36 Z" fill="white" opacity="0.15" />

      {/* Hood — long nose Peterbilt */}
      <path d="M68 18 L68 50 L100 50 L104 46 L104 22 L100 18 Z" fill="#FACC15" />
      {/* Hood detail lines */}
      <line x1="72" y1="22" x2="72" y2="46" stroke="#111" strokeWidth="1" opacity="0.15" />
      <line x1="78" y1="20" x2="78" y2="48" stroke="#111" strokeWidth="1" opacity="0.1" />

      {/* Front bumper */}
      <rect x="103" y="44" width="5" height="6" rx="1" fill="#FACC15" opacity="0.8" />
      {/* Headlight */}
      <rect x="104" y="28" width="4" height="6" rx="1.5" fill="#FDE68A" />
      <rect x="104" y="36" width="4" height="5" rx="1.5" fill="#EF4444" opacity="0.7" />

      {/* Front grille */}
      <rect x="102" y="22" width="3" height="28" rx="1" fill="#FACC15" opacity="0.6" />

      {/* Fuel tank */}
      <rect x="40" y="42" width="10" height="6" rx="2" fill="#FACC15" opacity="0.5" />

      {/* Front wheel */}
      <circle cx="92" cy="56" r="9" fill="#FACC15" />
      <circle cx="92" cy="56" r="5" fill="#111" />
      <circle cx="92" cy="56" r="2.5" fill="#FACC15" opacity="0.4" />

      {/* Drive wheels */}
      <circle cx="44" cy="56" r="9" fill="#FACC15" />
      <circle cx="44" cy="56" r="5" fill="#111" />
      <circle cx="44" cy="56" r="2.5" fill="#FACC15" opacity="0.4" />

      {/* === TEXT "DesiRig" as trailer body === */}
      {/* Frame rail / underline connecting truck to text */}
      <rect x="5" y="48" width="30" height="3" rx="1" fill="#FACC15" opacity="0.4" />

      {/* "Desi" in white */}
      <text x="115" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontSize="36" fontWeight="800" fill="white" letterSpacing="-1">
        Desi
      </text>
      {/* "Rig" in yellow */}
      <text x="190" y="44" fontFamily="system-ui, -apple-system, sans-serif" fontSize="36" fontWeight="800" fill="#FACC15" letterSpacing="-1">
        Rig
      </text>

      {/* Speed lines behind — trailing from text */}
      <rect x="218" y="48" width="50" height="2.5" rx="1" fill="white" opacity="0.6" />
      <rect x="230" y="53" width="38" height="2.5" rx="1" fill="white" opacity="0.4" />

      {/* Trailer wheel at end of text */}
      <circle cx="260" cy="56" r="7" fill="#FACC15" />
      <circle cx="260" cy="56" r="4" fill="#111" />
      <circle cx="260" cy="56" r="2" fill="#FACC15" opacity="0.4" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#FACC15] bg-[#111]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <DesiRigLogo />
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
