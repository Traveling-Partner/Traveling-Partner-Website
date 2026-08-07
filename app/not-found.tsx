import type { Metadata } from "next";
import NotFoundPage from "@/components/404Page";

export const metadata: Metadata = {
  title: "404 — Page not found | Traveling Partner",
  description: "Looks like you're off route. Let's get you back on track.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundPage />;
}
