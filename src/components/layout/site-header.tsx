import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function SemiTruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" className={className}>
      {/* Peterbilt-style front-facing semi */}
      {/* Exhaust stacks — tall chrome pipes */}
      <rect x="2" y="0" width="2.5" height="10" rx="1.2" />
      <rect x="27.5" y="0" width="2.5" height="10" rx="1.2" />
      {/* Stack tops */}
      <rect x="1.5" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
      <rect x="27" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
      {/* DESIRIG visor */}
      <rect x="7" y="3" width="18" height="4" rx="1" fill="white" opacity="0.9" />
      <text x="16" y="6.2" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">DESIRIG</text>
      {/* Cab — tall narrow Peterbilt shape */}
      <rect x="6" y="7" width="20" height="10" rx="2" />
      {/* Windshield — tall split */}
      <rect x="8.5" y="8" width="15" height="6" rx="1" fill="white" opacity="0.85" />
      <line x1="16" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="0.8" />
      {/* Long hood — Peterbilt signature */}
      <rect x="5" y="17" width="22" height="6" rx="1.5" />
      {/* Hood center ridge */}
      <line x1="16" y1="17" x2="16" y2="23" stroke="white" strokeWidth="0.6" opacity="0.3" />
      {/* Grille — vertical chrome slats */}
      <rect x="8" y="18" width="16" height="4" rx="0.8" fill="white" opacity="0.2" />
      <line x1="10" y1="18" x2="10" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="12.5" y1="18" x2="12.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="18" x2="15" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="17" y1="18" x2="17" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="19.5" y1="18" x2="19.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="22" y1="18" x2="22" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
      {/* Headlights — round Peterbilt style */}
      <circle cx="6.5" cy="19.5" r="2" fill="#FCD34D" />
      <circle cx="25.5" cy="19.5" r="2" fill="#FCD34D" />
      <circle cx="6.5" cy="19.5" r="1" fill="white" opacity="0.5" />
      <circle cx="25.5" cy="19.5" r="1" fill="white" opacity="0.5" />
      {/* Chrome bumper */}
      <rect x="4" y="23" width="24" height="2.5" rx="1" fill="white" opacity="0.3" />
      <rect x="4" y="23" width="24" height="2.5" rx="1" />
      {/* Side mirrors */}
      <rect x="1" y="9" width="4" height="3" rx="1" />
      <rect x="27" y="9" width="4" height="3" rx="1" />
      {/* Wheels */}
      <circle cx="9" cy="28" r="2.5" />
      <circle cx="23" cy="28" r="2.5" />
      <circle cx="9" cy="28" r="1" fill="white" opacity="0.3" />
      <circle cx="23" cy="28" r="1" fill="white" opacity="0.3" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <SemiTruckIcon className="text-[#FF6E40]" />
          <span className="text-xl font-bold tracking-tight">
            Desi<span className="text-[#FF6E40]">Rig</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/categories"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Categories
          </Link>
          <Link
            href="/cities"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cities
          </Link>
          <Link
            href="/safety"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Safety Lookup
          </Link>
          <Link
            href="/tools"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <Link
            href="/news"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            News
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
