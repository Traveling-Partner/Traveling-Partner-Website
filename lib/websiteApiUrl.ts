/**
 * Website API URLs — live production API only.
 * Blog/client fetches always use https://api.traveling-partner.com/api/website/*
 * (never same-origin /website proxy on staging hosts).
 */

export const PUBLIC_WEBSITE_API_BASE =
  "https://api.traveling-partner.com/api/website";

function envBaseToWebsiteApiBase(base: string): string {
  const normalized = base.replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/website`;
  }
  return `${normalized}/api/website`;
}

/** Same resolver the admin portal should use (from NEXT_PUBLIC_API_BASE_URL). */
export function getWebsiteApiBase(): string {
  const fromEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_URL?.trim() ||
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) return envBaseToWebsiteApiBase(fromEnv);
  return PUBLIC_WEBSITE_API_BASE;
}

export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${getWebsiteApiBase()}${segment}`;
}

/**
 * Browser fetch targets — production API only.
 * Always https://api.traveling-partner.com/api/website/...
 */
export function websiteApiUrlsForBrowser(path: string): string[] {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return [`${PUBLIC_WEBSITE_API_BASE}${segment}`];
}
