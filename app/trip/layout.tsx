import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Out-of-town trips",
  "Book reliable intercity trips with Traveling Partner.",
  "/trip"
);

export default function TripLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
