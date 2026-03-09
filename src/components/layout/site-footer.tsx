import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <svg width="24" height="16" viewBox="0 0 36 24" fill="currentColor" className="text-[#FF6E40]">
                <path d="M0 10h20V6h6l4 4v6h-2.1a3 3 0 0 1-5.8 0H9.9a3 3 0 0 1-5.8 0H0V10zm7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm18 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM20 8H2v6h2.1a3 3 0 0 1 5.8 0h8.2a3 3 0 0 1 1.9-2.8V8zm2 0v4h5.2l-2.5-4H22z" />
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
