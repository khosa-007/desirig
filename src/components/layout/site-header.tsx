import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

function SemiTruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" className={className}>
      {/* Front-facing semi truck */}
      {/* Cab body */}
      <rect x="5" y="4" width="22" height="18" rx="3" />
      {/* Windshield */}
      <rect x="8" y="6" width="16" height="8" rx="1.5" fill="white" opacity="0.85" />
      {/* Windshield divider */}
      <line x1="16" y1="6" x2="16" y2="14" stroke="currentColor" strokeWidth="1" />
      {/* Grill */}
      <rect x="9" y="16" width="14" height="4" rx="1" fill="white" opacity="0.3" />
      <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="16" y1="16" x2="16" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="16" x2="20" y2="20" stroke="currentColor" strokeWidth="0.8" />
      {/* Bumper */}
      <rect x="4" y="22" width="24" height="3" rx="1.5" />
      {/* Headlights */}
      <circle cx="7" cy="17" r="2" fill="#FCD34D" />
      <circle cx="25" cy="17" r="2" fill="#FCD34D" />
      {/* Side mirrors */}
      <rect x="1" y="8" width="3" height="5" rx="1" />
      <rect x="28" y="8" width="3" height="5" rx="1" />
      {/* Wheels */}
      <circle cx="8" cy="27" r="2.5" />
      <circle cx="24" cy="27" r="2.5" />
      {/* Exhaust stacks */}
      <rect x="3" y="1" width="2" height="6" rx="1" />
      <rect x="27" y="1" width="2" height="6" rx="1" />
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
