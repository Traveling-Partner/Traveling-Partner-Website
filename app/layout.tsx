import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AppSplashLoader from "@/components/AppSplashLoader";
import { getSiteUrl } from "@/lib/blogShare";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Traveling Partner — One app, every way to move",
    template: "%s | Traveling Partner",
  },
  description:
    "Book taxis, pool rides, deliveries, logistics, and trips across Pakistan — upfront fares and live tracking.",
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    type: "website",
    siteName: "Traveling Partner",
    title: "Traveling Partner — One app, every way to move",
    description:
      "Book taxis, pool rides, deliveries, logistics, and trips across Pakistan — upfront fares and live tracking.",
    url: getSiteUrl(),
    images: [
      {
        url: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png",
        width: 512,
        height: 512,
        alt: "Traveling Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveling Partner — One app, every way to move",
    description:
      "Book taxis, pool rides, deliveries, logistics, and trips across Pakistan — upfront fares and live tracking.",
    images: [
      "https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png",
    ],
  },
  other: {
    "google-adsense-account": "ca-pub-9237873671718047",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-poppins antialiased bg-white text-gray-900 flex min-h-screen flex-col overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Script id="gtm-datalayer" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-5DX45P56"
          strategy="afterInteractive"
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DX45P56"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9237873671718047"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <AppSplashLoader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#0b0b0b] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FCE001] focus:outline-none focus:ring-2 focus:ring-[#FCE001]"
        >
          Skip to content
        </a>

        {/* Top Navigation */}
        <Navigation />

        {/* Page Content */}
        <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>

        {/* Footer (Always at Bottom) */}
        <Footer />
      </body>
    </html>
  );
}
