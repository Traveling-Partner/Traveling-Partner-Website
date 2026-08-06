import React from "react";
import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
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
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${poppins.variable} ${montserrat.variable} font-poppins antialiased bg-white text-gray-900 flex min-h-screen flex-col overflow-x-hidden`}
      >
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
