import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

export const HERO_BODY =
  "Work in the morning. A pickup from the airport. A parcel that needs to get across town. Or maybe you're just heading out of the city for the weekend. Traveling Partner is a ride hailing app in Pakistan that puts you in touch with verified drivers, at fair prices you can actually see upfront, with real-time tracking the whole way.";

const HERO_BOLD = [
  "Traveling Partner",
  "ride hailing app in Pakistan",
  "verified drivers",
  "fair prices",
  "real-time tracking",
] as const;

export function HeroBodyCopy(): ReactNode {
  return emphasizePhrases(HERO_BODY, HERO_BOLD);
}
