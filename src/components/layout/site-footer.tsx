import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" className="text-[#FF6E40]">
                <rect x="2" y="0" width="2.5" height="10" rx="1.2" />
                <rect x="27.5" y="0" width="2.5" height="10" rx="1.2" />
                <rect x="1.5" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
                <rect x="27" y="0" width="3.5" height="1.5" rx="0.7" fill="white" opacity="0.5" />
                <rect x="7" y="3" width="18" height="4" rx="1" fill="white" opacity="0.9" />
                <text x="16" y="6.2" textAnchor="middle" fontSize="3.8" fontWeight="bold" fill="currentColor" fontFamily="sans-serif">DESIRIG</text>
                <rect x="6" y="7" width="20" height="10" rx="2" />
                <rect x="8.5" y="8" width="15" height="6" rx="1" fill="white" opacity="0.85" />
                <line x1="16" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="0.8" />
                <rect x="5" y="17" width="22" height="6" rx="1.5" />
                <line x1="16" y1="17" x2="16" y2="23" stroke="white" strokeWidth="0.6" opacity="0.3" />
                <rect x="8" y="18" width="16" height="4" rx="0.8" fill="white" opacity="0.2" />
                <line x1="10" y1="18" x2="10" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="12.5" y1="18" x2="12.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="15" y1="18" x2="15" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="17" y1="18" x2="17" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="19.5" y1="18" x2="19.5" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <line x1="22" y1="18" x2="22" y2="22" stroke="white" strokeWidth="0.5" opacity="0.4" />
                <circle cx="6.5" cy="19.5" r="2" fill="#FCD34D" />
                <circle cx="25.5" cy="19.5" r="2" fill="#FCD34D" />
                <circle cx="6.5" cy="19.5" r="1" fill="white" opacity="0.5" />
                <circle cx="25.5" cy="19.5" r="1" fill="white" opacity="0.5" />
                <rect x="4" y="23" width="24" height="2.5" rx="1" fill="white" opacity="0.3" />
                <rect x="4" y="23" width="24" height="2.5" rx="1" />
                <rect x="1" y="9" width="4" height="3" rx="1" />
                <rect x="27" y="9" width="4" height="3" rx="1" />
                <circle cx="9" cy="28" r="2.5" />
                <circle cx="23" cy="28" r="2.5" />
                <circle cx="9" cy="28" r="1" fill="white" opacity="0.3" />
                <circle cx="23" cy="28" r="1" fill="white" opacity="0.3" />
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

        {/* Email signup */}
        <div className="mt-8 border-t pt-8">
          <div className="mx-auto max-w-md text-center">
            <h3 className="font-semibold">Get trucking news in your inbox</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Safety alerts, new tools, industry updates. No spam, just the stuff that matters.
            </p>
            <div className="mt-3">
              <EmailSignup />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DesiRig.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
