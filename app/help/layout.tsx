import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Help Center",
  "Find answers about rides, deliveries, payments, and trips with Traveling Partner.",
  "/help"
);

export default function HelpLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
