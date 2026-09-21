import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Contact Us",
  "Send a message to Traveling Partner. We're here for riders, drivers, and businesses.",
  "/contact"
);

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
