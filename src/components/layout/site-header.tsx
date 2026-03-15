import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

/* D-Fixed logo — truck with "DesiRig" text integrated on trailer, rear wheel, speed lines */
export function DesiRigLogo({ className = "", height = 46 }: { className?: string; height?: number }) {
  return (
    <svg
      height={height}
      viewBox="0 0 690 197"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g transform="translate(-328.75 -651.52)">
        {/* Cab + trailer body */}
        <path fill="#FACC15" d="M782.68,787.1a14.08,14.08,0,0,0-10-4.14H543.77L540.83,768c0-.18-.05-.36-.08-.54-.53-2.62-1.13-5.62-1.77-8.86l-1-5.21c-3.05-15.54-6.68-34.89-8.48-47.58a7,7,0,0,0-3.63-5.19c-1.76-15.43-.46-23.36-.15-24.91l6.16-18.61a4.26,4.26,0,0,0-2.13-5.24,4.12,4.12,0,0,0-5.6,2.45l-6.42,19.47c-.36,1.68-2,10.61,0,27.88a7,7,0,0,0-2.16,6.13c1.83,12.9,5.48,32.37,8.55,48l0,.1,1.19,6.06,4.13,21h-7.06s-11.07-53.11-14.2-77.15,0-34.92,0-34.92C414.9,674,399.43,710.41,399.43,710.41c-32.83,4-34.7,41.81-34.7,41.81-26.76,5-36.38,13.6-36,28.65s6.7,30.34,6.7,30.34l10.13,7.37a47.26,47.26,0,0,1,14.88-29.2,43.21,43.21,0,0,1,58.41,0,47.23,47.23,0,0,1,14.87,29.21,36.27,36.27,0,0,0,.21-7.37H772.69a14.12,14.12,0,0,0,10-24.11Zm-346.8-64.84s-3.06,24-7,27.45-55.48,10.88-55.48,10.88,2-25.65,12.55-37.07,72.62-11,72.62-11l-41.4,12.13Z" />
        {/* Front wheel */}
        <path fill="#FACC15" d="M389.67,791.69a26.9,26.9,0,1,0,26.9,26.89A26.9,26.9,0,0,0,389.67,791.69Zm9.23,43a18.55,18.55,0,1,1,6.87-25.33A18.55,18.55,0,0,1,398.9,834.68Z" />
        <path fill="#FACC15" d="M393.1,803.08a15.75,15.75,0,0,1,10.35,7.59,16.44,16.44,0,0,1,2,6.27,15.66,15.66,0,0,1-.7,6.5,14.27,14.27,0,0,1-8.37,9,16.86,16.86,0,0,0,6-9.63,15.05,15.05,0,0,0-9.95-17.34,16.85,16.85,0,0,0-11.34.31A14.32,14.32,0,0,1,393.1,803.08Z" />
        {/* Rear wheel — positioned where text ends */}
        <circle cx="890" cy="818.58" r="26.9" fill="#FACC15" />
        <circle cx="890" cy="818.58" r="18.55" fill="#111" />
        <circle cx="890" cy="818.58" r="8" fill="#FACC15" opacity="0.4" />
        {/* Frame between wheels */}
        <rect x="770" y="783" width="95" height="10" rx="5" fill="#FACC15" />
        {/* Speed lines behind rear wheel */}
        <rect x="930" y="783" width="80" height="8" rx="4" fill="#fff" />
        <rect x="945" y="800" width="50" height="7" rx="3.5" fill="#fff" opacity="0.7" />
        {/* DesiRig text on trailer */}
        <text x="555" y="768" fontFamily="Outfit,system-ui,sans-serif" fontWeight="900" fontSize="110" letterSpacing="-4">
          <tspan fill="#fff">Desi</tspan>
          <tspan fill="#FACC15">Rig</tspan>
        </text>
      </g>
    </svg>
  );
}

/* Small truck icon for other uses (no text) */
export function TruckCabIcon({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.29}
      viewBox="323 651 470 200"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M782.68,787.1a14.08,14.08,0,0,0-10-4.14H543.77L540.83,768c0-.18-.05-.36-.08-.54-.53-2.62-1.13-5.62-1.77-8.86l-1-5.21c-3.05-15.54-6.68-34.89-8.48-47.58a7,7,0,0,0-3.63-5.19c-1.76-15.43-.46-23.36-.15-24.91l6.16-18.61a4.26,4.26,0,0,0-2.13-5.24,4.12,4.12,0,0,0-5.6,2.45l-6.42,19.47c-.36,1.68-2,10.61,0,27.88a7,7,0,0,0-2.16,6.13c1.83,12.9,5.48,32.37,8.55,48l0,.1,1.19,6.06,4.13,21h-7.06s-11.07-53.11-14.2-77.15,0-34.92,0-34.92C414.9,674,399.43,710.41,399.43,710.41c-32.83,4-34.7,41.81-34.7,41.81-26.76,5-36.38,13.6-36,28.65s6.7,30.34,6.7,30.34l10.13,7.37a47.26,47.26,0,0,1,14.88-29.2,43.21,43.21,0,0,1,58.41,0,47.23,47.23,0,0,1,14.87,29.21,36.27,36.27,0,0,0,.21-7.37H772.69a14.12,14.12,0,0,0,10-24.11Zm-346.8-64.84s-3.06,24-7,27.45-55.48,10.88-55.48,10.88,2-25.65,12.55-37.07,72.62-11,72.62-11l-41.4,12.13Z" />
        <path d="M389.67,791.69a26.9,26.9,0,1,0,26.9,26.89A26.9,26.9,0,0,0,389.67,791.69Zm9.23,43a18.55,18.55,0,1,1,6.87-25.33A18.55,18.55,0,0,1,398.9,834.68Z" />
        <path d="M393.1,803.08a15.75,15.75,0,0,1,10.35,7.59,16.44,16.44,0,0,1,2,6.27,15.66,15.66,0,0,1-.7,6.5,14.27,14.27,0,0,1-8.37,9,16.86,16.86,0,0,0,6-9.63,15.05,15.05,0,0,0-9.95-17.34,16.85,16.85,0,0,0-11.34.31A14.32,14.32,0,0,1,393.1,803.08Z" />
      </g>
    </svg>
  );
}

export function SemiTruckIcon({ className = "" }: { className?: string }) {
  return <TruckCabIcon className={className} size={26} />;
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[3px] border-[#FACC15] bg-[#111]">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* D-Fixed logo — integrated truck + DesiRig text */}
        <Link href="/" className="flex items-center">
          <DesiRigLogo height={36} />
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
