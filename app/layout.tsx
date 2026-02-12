import React from "react";
import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Traveling Partner",
  description: "Your ultimate travel companion app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} font-poppins antialiased bg-white text-gray-900 flex min-h-screen flex-col`}
      >
        {/* Top Navigation */}
        <Navigation />

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer (Always at Bottom) */}
        <Footer />
      </body>
    </html>
  );
}
