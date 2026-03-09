import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" className="text-[#FF6E40]">
                <rect x="7" y="1" width="18" height="5" rx="1.5" fill="white" opacity="0.9" />
                <text x="16" y="5" textAnchor="middle" fontSize="4" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">DESIRIG</text>
                <rect x="5" y="6" width="22" height="16" rx="3" />
                <rect x="8" y="8" width="16" height="7" rx="1.5" fill="white" opacity="0.85" />
                <line x1="16" y1="8" x2="16" y2="15" stroke="currentColor" strokeWidth="1" />
                <rect x="9" y="17" width="14" height="3" rx="1" fill="white" opacity="0.3" />
                <line x1="12" y1="17" x2="12" y2="20" stroke="currentColor" strokeWidth="0.8" />
                <line x1="16" y1="17" x2="16" y2="20" stroke="currentColor" strokeWidth="0.8" />
                <line x1="20" y1="17" x2="20" y2="20" stroke="currentColor" strokeWidth="0.8" />
                <rect x="4" y="22" width="24" height="3" rx="1.5" />
                <circle cx="7" cy="18" r="2" fill="#FCD34D" />
                <circle cx="25" cy="18" r="2" fill="#FCD34D" />
                <rect x="1" y="10" width="3" height="5" rx="1" />
                <rect x="28" y="10" width="3" height="5" rx="1" />
                <circle cx="8" cy="27" r="2.5" />
                <circle cx="24" cy="27" r="2.5" />
                <rect x="3" y="2" width="2" height="6" rx="1" />
                <rect x="27" y="2" width="2" height="6" rx="1" />
              </svg>
              <span className="text-lg font-bold">
                Desi<span className="text-[#FF6E40]">Rig</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Built by a trucker, for truckers. Your toolkit and directory for
              Desi businesses across Canada.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">For Truckers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/brampton-on/trucking-company" className="hover:text-foreground">
                  Trucking Companies
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/truck-mechanic" className="hover:text-foreground">
                  Truck Mechanics
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/driving-school" className="hover:text-foreground">
                  Driving Schools
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/truck-wash" className="hover:text-foreground">
                  Truck Washes
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-foreground">
                  Safety Lookup
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-foreground">
                  Trucker Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/brampton-on/indian-grocery" className="hover:text-foreground">
                  Indian Grocery
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/gurdwara" className="hover:text-foreground">
                  Gurdwaras
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/dhaba-restaurant" className="hover:text-foreground">
                  Dhabas & Restaurants
                </Link>
              </li>
              <li>
                <Link href="/brampton-on/immigration-consultant" className="hover:text-foreground">
                  Immigration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DesiRig.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
