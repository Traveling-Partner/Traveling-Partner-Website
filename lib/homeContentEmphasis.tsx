import type { ReactNode } from "react";

export const HERO_BODY =
  "Traveling Partner makes everyday journeys easier with convenient ride-hailing services. With trusted drivers, real-time tracking, and zero commission, we make every ride simpler and more transparent.";

/** Plain weight only — no emphasized/bold phrases in the hero body. */
export function HeroBodyCopy(): ReactNode {
  return HERO_BODY;
}
