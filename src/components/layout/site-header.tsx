import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

function SemiTruckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="18" viewBox="0 0 36 24" fill="currentColor" className={className}>
      <path d="M0 10h20V6h6l4 4v6h-2.1a3 3 0 0 1-5.8 0H9.9a3 3 0 0 1-5.8 0H0V10zm7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 8H2v6h2.1a3 3 0 0 1 5.8 0h8.2a3 3 0 0 1 1.9-2.8V8zm2 0v4h5.2l-2.5-4H22z" />
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
