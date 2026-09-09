import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Pool Ride",
  "Share your route and save on fares with Pool Ride.",
  "/pool-ride"
);

export default function PoolRideLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
