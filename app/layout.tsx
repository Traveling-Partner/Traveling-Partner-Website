import React from "react";
import type { Metadata } from "next";
import { Poppins, Montserrat, Bricolage_Grotesque } from "next/font/google";
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
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Traveling Partner",
  description: "Your ultimate travel companion app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${bricolage.variable} font-poppins antialiased bg-white text-gray-900 flex min-h-screen flex-col overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Hoisted by Next — preload so loader assets are ready on first paint */}
        <link
          rel="preload"
          href="/images/loader/tp-loader-ring.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/images/loader/tp-loader-logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <AppSplashLoader />

        {/* Top Navigation */}
        <Navigation />

        {/* Page Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>

        {/* Footer (Always at Bottom) */}
        <Footer />
      </body>
    </html>
  );
}
