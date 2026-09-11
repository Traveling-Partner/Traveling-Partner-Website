/**
 * Read the share token from the public tracking URL.
 * Backend hands out /ride-location/{token}. Static hosting falls back to
 * /ride-location?shareToken= via the 404.html redirect (same pattern as /blog/{id}).
 */

const PATH_RE = /^\/ride-location\/([^/]+)\/?$/;

export function isRideLocationPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/ride-location" || pathname.startsWith("/ride-location/");
}

export function isLiveTrackingPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/trip/track" || isRideLocationPath(pathname);
}

export function tokenFromPathname(pathname: string): string | null {
  const match = pathname.match(PATH_RE);
  if (!match) return null;
  try {
    const token = decodeURIComponent(match[1] || "").trim();
    return token || null;
  } catch {
    return null;
  }
}

export function tokenFromSearch(search: string): string | null {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const token = (params.get("shareToken") || params.get("token") || "").trim();
  return token || null;
}

/** Browser-only. Never log the return value. */
export function getRideShareTokenFromLocation(): string | null {
  if (typeof window === "undefined") return null;
  return (
    tokenFromPathname(window.location.pathname) ||
    tokenFromSearch(window.location.search)
  );
}
