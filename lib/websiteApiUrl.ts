/**
 * Website API URLs — same base as admin portal (NEXT_PUBLIC_API_BASE_URL).
 * Browser: same-origin /website/* when on HTTPS (needs host proxy on DigitalOcean).
 * Server/build: direct API URL from env.
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
 * Browser fetch targets: live API only (portal source of truth).
 * 1) /website/* — same-origin proxy (local dev + DO App Platform with api-proxy)
 * 2) Direct env API URL — same endpoint family as admin portal
 */
export function websiteApiUrlsForBrowser(path: string): string[] {
  const segment = path.startsWith("/") ? path : `/${path}`;
  const direct = `${getWebsiteApiBase()}${segment}`;

  if (typeof window === "undefined") {
    return [direct];
  }

  return [`/website${segment}`, direct];
}
