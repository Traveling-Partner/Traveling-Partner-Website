import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Tourism",
  "Plan trips, group tours, and weekend getaways across Pakistan.",
  "/tourism"
);

export default function TourismLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
