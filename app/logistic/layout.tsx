import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Logistics",
  "Enterprise logistics and bulk cargo for growing businesses.",
  "/logistic"
);

export default function LogisticLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
