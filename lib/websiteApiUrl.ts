/**
 * Website API URLs — production API only.
 * https://api.traveling-partner.com/api/website/*
 *
 * Blog listing and detail in the browser always use this live API.
 */

export const PUBLIC_WEBSITE_API_BASE =
  "https://api.traveling-partner.com/api/website";

/** Blog CRM API (read-only): GET /api/blog/getAll and /api/blog/getById/{id} */
export const PUBLIC_BLOG_API_BASE = PUBLIC_WEBSITE_API_BASE.replace(
  /\/api\/website\/?$/,
  "/api/blog"
);

export function blogApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${PUBLIC_BLOG_API_BASE}${segment}`;
}

export function blogApiUrlsForBrowser(path: string): string[] {
  return [blogApiUrl(path)];
}

function envBaseToWebsiteApiBase(base: string): string {
  const normalized = base.replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/website`;
  }
  return `${normalized}/api/website`;
}

/** Same resolver the admin portal should use (from NEXT_PUBLIC_API_BASE_URL). */
export function getWebsiteApiBase(): string {
  // Always prefer live production website API for blog/content endpoints.
  return PUBLIC_WEBSITE_API_BASE;
}

export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return `${PUBLIC_WEBSITE_API_BASE}${segment}`;
}

/**
 * Browser fetch targets — production API only (never staging /website proxy).
 */
export function websiteApiUrlsForBrowser(path: string): string[] {
  const segment = path.startsWith("/") ? path : `/${path}`;
  return [`${PUBLIC_WEBSITE_API_BASE}${segment}`];
}

/** Kept for tooling that still reads env (contact, scripts). */
export function getWebsiteApiBaseFromEnv(): string {
  const fromEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_URL?.trim() ||
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromEnv) return envBaseToWebsiteApiBase(fromEnv);
  return PUBLIC_WEBSITE_API_BASE;
}
