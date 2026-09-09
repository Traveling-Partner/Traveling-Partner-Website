import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Taxi Ride",
  "Book a taxi with upfront fares, verified drivers, and live tracking.",
  "/taxi-ride"
);

export default function TaxiRideLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
