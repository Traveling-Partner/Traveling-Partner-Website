import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "About Us",
  "Learn how Traveling Partner connects riders, drivers, and businesses across Pakistan.",
  "/about"
);

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
