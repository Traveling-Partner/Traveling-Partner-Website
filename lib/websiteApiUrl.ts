/**
 * URLs for Spring "website" blog APIs.
 *
 * On HTTPS (e.g. Vercel), the browser must NOT call http://… (mixed content).
 * We always use same-origin /website-api/... there, even if NEXT_PUBLIC_API_BASE_URL
 * is still set in env — that var is only used for http pages (localhost).
 *
 * Vercel: vercel.json rewrites /website-api → backend.
 * Local: next.config.mjs rewrites /website-api → BACKEND_ORIGIN.
 */
export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  const proxyPath = `/website-api${segment}`;

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return proxyPath;
  }

  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (base) {
    return `${base.replace(/\/$/, "")}/api/website${segment}`;
  }
  return proxyPath;
}
