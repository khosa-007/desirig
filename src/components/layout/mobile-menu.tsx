"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Truck, Search, Shield, MapPin, Grid3X3, BookOpen, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-background shadow-xl transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="text-lg font-bold">
            Desi<span className="text-orange-500">Rig</span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1 p-4">
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            Search
          </Link>
          <Link
            href="/categories"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            Categories
          </Link>
          <Link
            href="/cities"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Cities
          </Link>
          <Link
            href="/safety"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Shield className="h-4 w-4 text-muted-foreground" />
            Safety Lookup
          </Link>
          <Link
            href="/tools"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Wrench className="h-4 w-4 text-muted-foreground" />
            Tools
          </Link>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Blog
          </Link>

          <div className="my-3 border-t" />

          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Popular
          </p>
          <Link
            href="/brampton-on"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <Truck className="h-4 w-4 text-orange-500" />
            Brampton, ON
          </Link>
          <Link
            href="/surrey-bc"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <Truck className="h-4 w-4 text-orange-500" />
            Surrey, BC
          </Link>
          <Link
            href="/mississauga-on"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <Truck className="h-4 w-4 text-orange-500" />
            Mississauga, ON
          </Link>
          <Link
            href="/edmonton-ab"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            <Truck className="h-4 w-4 text-orange-500" />
            Edmonton, AB
          </Link>

          <div className="my-3 border-t" />

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
