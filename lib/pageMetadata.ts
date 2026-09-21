import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/blogShare";

export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const url = `${getSiteUrl()}${path === "/" ? "" : path}`;
  const fullTitle = title;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Traveling Partner",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
