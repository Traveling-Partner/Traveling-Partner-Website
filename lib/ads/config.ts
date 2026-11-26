export const ADSENSE_CLIENT = "ca-pub-9237873671718047";
export const ADSENSE_PUBLISHER = "pub-9237873671718047";

export type AdVariant = "rect" | "banner" | "sidebar" | "infeed";

export type AdPlacement =
  | "homeA"
  | "homeB"
  | "homeC"
  | "service1"
  | "service2"
  | "blogInfeed"
  | "blogArticle"
  | "blogSidebar"
  | "help"
  | "tourism";

const PLACEMENT_VARIANT: Record<AdPlacement, AdVariant> = {
  homeA: "banner",
  homeB: "rect",
  homeC: "banner",
  service1: "rect",
  service2: "banner",
  blogInfeed: "infeed",
  blogArticle: "rect",
  blogSidebar: "sidebar",
  help: "rect",
  tourism: "rect",
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
    dataLayer?: Record<string, unknown>[];
  }
}

const AD_FREE_PREFIXES = [
  "/privacy-policy",
  "/privacy",
  "/terms-conditions",
  "/contact",
  "/ride-location",
  "/trip",
];

function envFlag(value: string | undefined): boolean {
  if (value == null || value.trim() === "") return true;
  return !["0", "false", "off", "no"].includes(value.trim().toLowerCase());
}

export function areAdsEnabled(): boolean {
  return envFlag(process.env.NEXT_PUBLIC_ADS_ENABLED);
}

function slotIdFor(placement: AdPlacement): string {
  switch (placement) {
    case "homeA":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_A ?? "").trim();
    case "homeB":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_B ?? "").trim();
    case "homeC":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_C ?? "").trim();
    case "service1":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_1 ?? "").trim();
    case "service2":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_2 ?? "").trim();
    case "blogInfeed":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INFEED ?? "").trim();
    case "blogArticle":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_ARTICLE ?? "").trim();
    case "blogSidebar":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR ?? "").trim();
    case "help":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_HELP ?? "").trim();
    case "tourism":
      return (process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOURISM ?? "").trim();
    default:
      return "";
  }
}

export function getAdPlacement(placement: AdPlacement): {
  variant: AdVariant;
  slotId: string;
} {
  return {
    variant: PLACEMENT_VARIANT[placement],
    slotId: slotIdFor(placement),
  };
}

export function isAdsAllowedPath(pathname: string | null | undefined): boolean {
  if (!areAdsEnabled()) return false;
  if (!pathname) return true;
  const path = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  return !AD_FREE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export type TourismSponsor = {
  name: string;
  text: string;
  url: string;
  logo: string;
};

export function getActiveTourismSponsor(now = Date.now()): TourismSponsor | null {
  const name = (process.env.NEXT_PUBLIC_TOURISM_SPONSOR_NAME ?? "").trim();
  const url = (process.env.NEXT_PUBLIC_TOURISM_SPONSOR_URL ?? "").trim();
  if (!name || !url) return null;

  const start = Date.parse(process.env.NEXT_PUBLIC_TOURISM_SPONSOR_START ?? "");
  const end = Date.parse(process.env.NEXT_PUBLIC_TOURISM_SPONSOR_END ?? "");
  if (Number.isFinite(start) && now < start) return null;
  if (Number.isFinite(end) && now > end) return null;

  return {
    name,
    text: (process.env.NEXT_PUBLIC_TOURISM_SPONSOR_TEXT ?? "").trim(),
    url,
    logo: (process.env.NEXT_PUBLIC_TOURISM_SPONSOR_LOGO ?? "").trim(),
  };
}

export function trackAdEvent(
  event: string,
  payload: Record<string, string | number | undefined> = {}
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
