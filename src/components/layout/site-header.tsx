import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

/* Truck cab silhouette extracted from MrBobtail logo — just the cab portion */
export function TruckCabIcon({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="60 100 220 170"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Truck cab body — Peterbilt sleeper silhouette */}
      <path d="M71.43,135.58c-32.83,4-34.7,41.81-34.7,41.81-26.76,5-36.38,13.6-36,28.65s6.7,30.34,6.7,30.34l10.13,7.37a47.26,47.26,0,0,1,14.88-29.2,43.21,43.21,0,0,1,58.41,0,47.23,47.23,0,0,1,14.87,29.21c.14-2.46.21-4.92.21-7.37h160v-10h-160s-11.07-53.11-14.2-77.15,0-34.92,0-34.92C86.4,122.48,71.43,135.58,71.43,135.58Zm36.45,57.42s-3.06,24-7,27.45-55.48,10.88-55.48,10.88,2-25.65,12.55-37.07,72.62-11,72.62-11l-41.4,12.13Z" />
      {/* Drive wheel */}
      <circle cx="61" cy="240" r="26.9" />
      <circle cx="61" cy="240" r="18.55" fill="#111" />
      <circle cx="61" cy="240" r="8" opacity="0.4" />
    </svg>
  );
}

/* Keep SemiTruckIcon for other uses */
export function SemiTruckIcon({ className = "" }: { className?: string }) {
  return <TruckCabIcon className={className} size={26} />;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#FACC15] bg-[#111]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo: truck cab + DesiRig text + speed lines */}
        <Link href="/" className="flex items-center gap-0.5">
          <TruckCabIcon className="text-[#FACC15]" size={34} />
          <div className="relative flex items-center">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Desi<span className="text-[#FACC15]">Rig</span>
            </span>
            {/* Speed lines */}
            <div className="ml-1.5 flex flex-col gap-[3px]">
              <div className="h-[2px] w-6 rounded-full bg-white/50" />
              <div className="h-[2px] w-4 rounded-full bg-white/30" />
            </div>
          </div>
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
