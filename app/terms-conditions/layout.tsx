import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Terms & Conditions",
  "The terms that apply when you use Traveling Partner.",
  "/terms-conditions"
);

export default function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
