/**
 * Website API URLs.
 * - Local dev: `/website/*` (Next.js rewrite in next.config.mjs)
 * - Live static host (DigitalOcean): direct https://api.traveling-partner.com/...
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

function resolveWebsiteApiBase(): string {
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

  if (typeof window !== "undefined" && isLocalDevHost()) {
    return `/website${segment}`;
  }

  return `${resolveWebsiteApiBase()}${segment}`;
}
