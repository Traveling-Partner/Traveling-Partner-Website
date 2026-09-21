import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  "How Traveling Partner collects, uses, and protects your information.",
  "/privacy-policy"
);

export default function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
