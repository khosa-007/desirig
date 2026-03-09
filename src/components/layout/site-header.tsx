import Link from "next/link";
import { Truck, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
            <Truck className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Desi<span className="text-orange-500">Rig</span>
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
