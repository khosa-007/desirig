import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://desirig.com"),
  title: {
    default: "DesiRig | Desi Trucking & Business Toolkit for Canada",
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
    "south asian business directory",
    "truck mechanic brampton",
    "driving school surrey",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://desirig.com",
    siteName: "DesiRig",
    title: "DesiRig | Desi Trucking & Business Toolkit for Canada",
    description:
      "Find trusted Desi trucking companies, mechanics, driving schools, and community businesses across Canada.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DesiRig | Desi Trucking & Business Toolkit for Canada",
    description:
      "Find trusted Desi trucking companies, mechanics, and community businesses across Canada.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://desirig.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@800;900&family=Noto+Sans+Gurmukhi:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DesiRig",
              url: "https://desirig.com",
              logo: "https://desirig.com/icon",
              description:
                "The trusted platform for South Asian trucking and community businesses across Canada.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "rig@desirig.com",
                contactType: "customer service",
              },
              sameAs: [],
            }),
          }}
        />
        <LanguageProvider>
          <div className="flex min-h-screen flex-col bg-[#111]">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
