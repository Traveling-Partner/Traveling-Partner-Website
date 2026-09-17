/**
 * Public ride live-location share — socket + REST contract.
 * Token in the URL is the only credential. Do not log it.
 * Contract: Backend Live Ride Sharing handoff (staging + production).
 */

export type RideShareStatus = "live" | "ended" | "completed" | "cancelled";

export type RidePlanStatus =
  | "REQUESTED"
  | "COUNTER_OFFERED"
  | "ACCEPTED"
  | "DRIVER_ON_THE_WAY"
  | "DRIVER_ARRIVED"
  | "PARTNER_COMING"
  | "RIDE_STARTED"
  | "COMPLETED"
  | "CANCELED"
  | "EXPIRED";

export type RideLocationPageState =
  | "connecting"
  | "live"
  | "ended"
  | "completed"
  | "cancelled"
  | "invalid"
  | "expired";

export type RideLocationConnection = "connecting" | "live" | "reconnecting" | "polling";

/** Envelope on every WebSocket frame. */
export interface RideLocationSocketMessage {
  type: "RIDE_LOCATION_UPDATE";
  data: RideLocationUpdatePayload;
}

/**
 * Live update payload — WS `data` and GET `/current` (no envelope).
 * Phone numbers are intentionally never included.
 */
export interface RideLocationUpdatePayload {
  rideId?: number | null;
  partnerId?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  /** ISO string or legacy [y,m,d,h,min,s,nano] Karachi array */
  timestamp?: string | number[] | null;
  sharingActive?: boolean | null;
  rideStatus?: string | null;
  /** "live" | "ended" | "completed" | "cancelled" */
  status?: string | null;
  partnerName?: string | null;
  partnerPhoto?: string | null;
  driverId?: number | null;
  driverName?: string | null;
  driverRating?: number | null;
  vehicleMake?: string | null;
  vehicleModel?: string | null;
  vehiclePlate?: string | null;
  vehicleColor?: string | null;
  pickupLatitude?: number | null;
  pickupLongitude?: number | null;
  pickupAddress?: string | null;
  dropoffLatitude?: number | null;
  dropoffLongitude?: number | null;
  dropoffAddress?: string | null;
  etaMinutes?: number | null;
  heading?: number | null;
  passengerFirstName?: string | null;
}

/** @deprecated Prefer RideLocationUpdatePayload — kept as alias for older imports */
export type RideLocationSocketData = RideLocationUpdatePayload;

export interface RideLocationSnapshotData {
  rideId?: number | null;
  status?: string | null;
  driverName?: string | null;
  driverPhoto?: string | null;
  vehicleColor?: string | null;
  vehicleRegistrationNo?: string | null;
  pickupAddress?: string | null;
  dropoffAddress?: string | null;
  estimatedDuration?: string | null;
  estimatedDurationInSeconds?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  lastUpdatedAt?: string | null;
  sharingActive?: boolean | null;
}

/** GET /current — same fields as WS data (minus envelope). */
export type RideLocationCurrentData = RideLocationUpdatePayload;

/** Normalized view model used by the page. */
export interface RideLocationViewData {
  rideId: number | null;
  partnerId: number | null;
  latitude: number | null;
  longitude: number | null;
  heading: number | null;
  sharingActive: boolean;
  rideStatus: string | null;
  status: RideShareStatus;
  partnerName: string | null;
  partnerPhoto: string | null;
  driverId: number | null;
  driverName: string | null;
  driverPhoto: string | null;
  driverRating: number | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  vehiclePlate: string | null;
  vehicleColor: string | null;
  pickupLatitude: number | null;
  pickupLongitude: number | null;
  pickupAddress: string | null;
  dropoffLatitude: number | null;
  dropoffLongitude: number | null;
  dropoffAddress: string | null;
  etaMinutes: number | null;
  passengerFirstName: string | null;
  lastUpdatedAt: number | null;
}

export const RIDE_STATUS_LINE: Record<string, string> = {
  REQUESTED: "Ride requested",
  COUNTER_OFFERED: "Offer pending",
  ACCEPTED: "Ride accepted",
  DRIVER_ON_THE_WAY: "Driver is on the way",
  DRIVER_ARRIVED: "Driver has arrived",
  PARTNER_COMING: "Partner is coming",
  RIDE_STARTED: "Trip in progress",
  COMPLETED: "Ride completed",
  CANCELED: "Ride cancelled",
  EXPIRED: "Ride expired",
};

/** Generic public-page copy for bad / revoked / expired tokens (REST 404). */
export const LINK_NO_LONGER_ACTIVE = "This link is no longer active.";

export const CLOSE_MISSING_TOKEN = 4000;
export const CLOSE_INVALID_LINK = 4001;
export const CLOSE_EXPIRED_OR_ENDED = 4002;
