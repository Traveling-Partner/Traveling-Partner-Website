import type { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata(
  "Blog",
  "Guides, travel advice, and updates from Traveling Partner.",
  "/blog"
);

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
