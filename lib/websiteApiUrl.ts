/**
 * URLs for Spring "website" APIs.
 *
 * Preferred env: NEXT_PUBLIC_API_URL=https://api.traveling-partner.com/api
 * Resulting endpoint example: <base>/website/blog/list
 *
 * Backward compatibility:
 * - NEXT_PUBLIC_API_BASE_URL=https://api.traveling-partner.com
 *   -> <base>/api/website/blog/list
 *
 * Fallback:
 * - /website/... proxy path (rewrites in Next/Vercel).
 */
function apiBaseIsSameOriginAsPage(normalizedBase: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URL(normalizedBase).origin === window.location.origin;
  } catch {
    return false;
  }
}

export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  const proxyPath = `/website${segment}`;
  const baseFromApiUrl =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_URL?.trim();
  const legacyBase =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_BASE_URL?.trim();
  const base = baseFromApiUrl || legacyBase;

  if (base) {
    const normalizedBase = base.replace(/\/$/, "");
    // Same tab as the marketing site: always use the /website/* rewrite (like local dev),
    // not https://www.../website-api/... or double paths from a mis-set NEXT_PUBLIC_API_*.
    if (typeof window !== "undefined" && apiBaseIsSameOriginAsPage(normalizedBase)) {
      return proxyPath;
    }
    // Avoid mixed-content errors on HTTPS pages when env is still http://...
    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:" &&
      normalizedBase.startsWith("http://")
    ) {
      return proxyPath;
    }
    if (baseFromApiUrl) {
      return `${normalizedBase}/website${segment}`;
    }
    return `${normalizedBase}/api/website${segment}`;
  }

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    return proxyPath;
  }

  return proxyPath;
}
