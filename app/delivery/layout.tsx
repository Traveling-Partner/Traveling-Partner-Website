import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Delivery",
  "Send parcels across the city with live status updates.",
  "/delivery"
);

export default function DeliveryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
