import type { RideLocationViewData } from "./types";

/**
 * Local / QA preview only. Does not call snapshot, /current, or WebSocket.
 * Open: /ride-location?shareToken=demo-active
 */
export const RIDE_LOCATION_DEMO_TOKEN = "demo-active";

export function isRideLocationDemoToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const normalized = token.trim().toLowerCase();
  return normalized === "demo" || normalized === "demo-active";
}

/**
 * Complete sample of the public-share payload (snapshot + WS `data`).
 * Phone numbers are omitted on purpose — they are not on this API.
 */
export function getDemoRideLocationView(): RideLocationViewData {
  return {
    rideId: 181,
    partnerId: 36,
    latitude: 31.552,
    longitude: 74.351,
    heading: 87.5,
    sharingActive: true,
    rideStatus: "RIDE_STARTED",
    status: "live",
    partnerName: "Ayesha Khan",
    partnerPhoto: null,
    driverId: 50,
    driverName: "Bilal Ahmed",
    driverPhoto: null,
    driverRating: 4.8,
    vehicleMake: "Toyota",
    vehicleModel: "Corolla",
    vehiclePlate: "LEA-1234",
    vehicleColor: "White",
    pickupLatitude: 31.5204,
    pickupLongitude: 74.3587,
    pickupAddress: "Gulberg, Lahore",
    dropoffLatitude: 31.4697,
    dropoffLongitude: 74.4142,
    dropoffAddress: "DHA Phase 5, Lahore",
    etaMinutes: 13,
    passengerFirstName: "Ayesha",
    lastUpdatedAt: Date.now(),
  };
}
