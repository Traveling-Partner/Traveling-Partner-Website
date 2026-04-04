/**
 * URLs for Spring "website" blog APIs.
 *
 * - Set NEXT_PUBLIC_API_BASE_URL (e.g. http://45.55.78.67:8080) for local dev → browser calls backend directly.
 * - Leave it unset or empty on Vercel → use same-origin /website-api/... (HTTPS) so the request is not mixed content.
 *   Vercel (vercel.json) and Next dev (next.config rewrites) proxy /website-api → backend /api/website.
 */
export function websiteApiUrl(path: string): string {
  const segment = path.startsWith("/") ? path : `/${path}`;
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (base) {
    return `${base.replace(/\/$/, "")}/api/website${segment}`;
  }
  return `/website-api${segment}`;
}
