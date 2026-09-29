/**
 * Public ride-location API hosts.
 * The live site talks to production. A staging hostname talks to staging.
 */

function envApiOrigin(): string | null {
  const fromEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!fromEnv) return null;
  return fromEnv.replace(/\/api\/?$/, "").replace(/\/$/, "");
}

export function getRideLocationApiOrigin(): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host === "traveling-partner.com" || host === "www.traveling-partner.com") {
      return "https://api.traveling-partner.com";
    }
    if (host.includes("stagging") || host.includes("staging")) {
      return "https://staging.api.traveling-partner.com";
    }
  }
  return envApiOrigin() || "https://api.traveling-partner.com";
}

export function getRideLocationWsOrigin(): string {
  return getRideLocationApiOrigin();
}

function wsScheme(origin: string): string {
  return origin.startsWith("http://") ? "ws" : "wss";
}

/** WebSocket URL. Caller must pass the token — do not log the result. */
export function buildRideLocationSocketUrl(token: string): string {
  const origin = getRideLocationWsOrigin();
  const host = origin.replace(/^https?:\/\//, "");
  const params = new URLSearchParams({ shareToken: token });
  return `${wsScheme(origin)}://${host}/ws/ride-location?${params.toString()}`;
}

export function buildRideLocationSnapshotUrl(token: string): string {
  const origin = getRideLocationApiOrigin();
  return `${origin}/api/ridePlans/location-share/${encodeURIComponent(token)}/snapshot`;
}

export function buildRideLocationCurrentUrl(token: string): string {
  const origin = getRideLocationApiOrigin();
  return `${origin}/api/ridePlans/location-share/${encodeURIComponent(token)}/current`;
}
