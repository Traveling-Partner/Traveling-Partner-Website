/**
 * URLs for Spring "website" APIs.
 *
 * Local dev (`next dev`): `/website/*` → proxied by next.config rewrites.
 * Production static host (DigitalOcean, etc.): direct `https://api.../api/website/*`
 * (no server proxy — `/website` on the site origin would 404).
 */

export const PUBLIC_WEBSITE_API_BASE =
  "https://api.traveling-partner.com/api/website";

function isLocalDevHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

function envBaseToWebsiteApiBase(base: string): string {
  const normalized = base.replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/website`;
  }
  return `${normalized}/api/website`;
}

function resolveServerWebsiteApiBase(): string {
  const baseFromApiUrl =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_URL?.trim();
  const legacyBase =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_BASE_URL?.trim();
  const base = baseFromApiUrl || legacyBase;
  if (base) return envBaseToWebsiteApiBase(base);
  return PUBLIC_WEBSITE_API_BASE;
}

export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined") {
    if (isLocalDevHost()) {
      return `/website${segment}`;
    }
    return `${resolveServerWebsiteApiBase()}${segment}`;
  }

  return `${resolveServerWebsiteApiBase()}${segment}`;
}
