import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DesiRig — Desi Trucking & Business Directory Canada",
    template: "%s | DesiRig",
  },
  description:
    "Find trusted Desi trucking companies, mechanics, driving schools, and community businesses across Canada. Safety ratings, reviews, and more.",
  keywords: [
    "desi trucking",
    "punjabi trucking",
    "trucking directory canada",
    "desi business directory",
    "brampton trucking",
    "indian trucking companies",
    "carrier safety lookup",
    "dot number lookup",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://desirig.com",
    siteName: "DesiRig",
    title: "DesiRig — Desi Trucking & Business Directory Canada",
    description:
      "Find trusted Desi trucking companies, mechanics, driving schools, and community businesses across Canada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
