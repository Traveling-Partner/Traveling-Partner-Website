import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/blogShare";

export const metadata: Metadata = {
  title: "Taxi Ride",
  description: "This page has moved to Taxi Ride.",
  robots: { index: false, follow: true },
  alternates: { canonical: `${getSiteUrl()}/taxi-ride` },
};

export default function TaxiStandLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
