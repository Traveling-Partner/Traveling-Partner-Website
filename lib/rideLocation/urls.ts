/**
 * Ride-location share page — staging API only (for testing staging tokens).
 * Switch these back to production when live Share is ready.
 */

export const RIDE_LOCATION_API_ORIGIN =
  "https://staging.api.traveling-partner.com";

export function getRideLocationApiOrigin(): string {
  return RIDE_LOCATION_API_ORIGIN;
}

export function getRideLocationWsOrigin(): string {
  return RIDE_LOCATION_API_ORIGIN;
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
