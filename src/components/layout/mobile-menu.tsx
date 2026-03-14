"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Search, Shield, MapPin, Grid3X3, BookOpen, Wrench, Newspaper, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SemiTruckIcon } from "./site-header";

function MenuPortal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (typeof window === "undefined") return null;
  return createPortal(
    <>
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-[9999] w-72 bg-[#1A1A1A] shadow-xl transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-lg border-2 border-[#FACC15] hover:bg-[#FACC15]/30 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-white" />
      </Button>

      <MenuPortal open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between border-b-[3px] border-[#FACC15] p-4">
          <div className="flex items-center gap-1">
            <SemiTruckIcon className="text-[#FACC15]" />
            <span className="text-lg font-extrabold text-white">
              Desi<span className="text-[#FACC15]">Rig</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="hover:bg-[#FACC15]/30"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1 p-4">
          {[
            { href: "/search", icon: Search, en: "Search", pa: "ਖੋਜੋ" },
            { href: "/categories", icon: Grid3X3, en: "Categories", pa: "ਸ਼੍ਰੇਣੀਆਂ" },
            { href: "/cities", icon: MapPin, en: "Cities", pa: "ਸ਼ਹਿਰ" },
            { href: "/safety", icon: Shield, en: "Safety Lookup", pa: "ਸੇਫਟੀ ਚੈੱਕ" },
            { href: "/tools", icon: Wrench, en: "Tools", pa: "ਟੂਲ" },
            { href: "/news", icon: Newspaper, en: "News", pa: "ਖ਼ਬਰਾਂ" },
            { href: "/blog", icon: BookOpen, en: "Blog", pa: "ਬਲੌਗ" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FACC15]/20"
            >
              <item.icon className="h-4 w-4" />
              {item.en}
              <span className="font-gurmukhi text-xs text-[#FACC15]/60">{item.pa}</span>
            </Link>
          ))}

          <div className="my-3 border-t-2 border-[#333]" />

          <p className="px-3 text-xs font-bold uppercase tracking-wider text-[#FACC15]/60">
            Top Cities
          </p>
          {[
            { href: "/brampton-on", name: "Brampton, ON" },
            { href: "/surrey-bc", name: "Surrey, BC" },
            { href: "/mississauga-on", name: "Mississauga, ON" },
            { href: "/edmonton-ab", name: "Edmonton, AB" },
          ].map((city) => (
            <Link
              key={city.href}
              href={city.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-[#FACC15]/20"
            >
              <Truck className="h-4 w-4 text-[#FACC15]" />
              {city.name}
            </Link>
          ))}

          <div className="my-3 border-t-2 border-[#333]" />

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-[#FACC15]/20"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-[#FACC15]/20"
          >
            Contact
          </Link>
        </nav>
      </MenuPortal>
    </>
  );
}
