/**
 * Public ride live-location share — socket + REST contract.
 * Token in the URL is the only credential. Do not log it.
 */

export type RideShareStatus = "live" | "ended" | "cancelled";

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
  | "cancelled"
  | "invalid"
  | "expired";

export type RideLocationConnection = "connecting" | "live" | "reconnecting" | "polling";

/** Envelope on every WebSocket frame. */
export interface RideLocationSocketMessage {
  type: "RIDE_LOCATION_UPDATE";
  data: RideLocationSocketData;
}

export interface RideLocationSocketData {
  rideId?: number | null;
  partnerId?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  timestamp?: number[] | null;
  sharingActive?: boolean | null;
  rideStatus?: string | null;
  status?: string | null;
  partnerName?: string | null;
  partnerPhoto?: string | null;
  driverId?: number | null;
  driverName?: string | null;
  vehicleMake?: string | null;
  vehicleModel?: string | null;
  vehiclePlate?: string | null;
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

export interface RideLocationCurrentData {
  rideId?: number | null;
  partnerId?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  timestamp?: string | null;
  sharingActive?: boolean | null;
  rideStatus?: string | null;
}

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

export const CLOSE_MISSING_TOKEN = 4000;
export const CLOSE_INVALID_LINK = 4001;
export const CLOSE_EXPIRED_OR_ENDED = 4002;
