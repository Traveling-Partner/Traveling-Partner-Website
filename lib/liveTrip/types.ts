/**
 * Live Trip Sharing — data contract.
 *
 * This describes exactly what a real backend/API would need to supply for
 * the public tracking page to work. Nothing in this file talks to a
 * network — see mockTripData.ts for the isolated demo data source that
 * currently satisfies this contract on the frontend.
 */

export type TripStatus =
  | "scheduled"
  | "driver_assigned"
  | "driver_arriving"
  | "in_progress"
  | "paused"
  | "completed"
  | "cancelled";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface NamedPoint extends GeoPoint {
  label: string;
  address: string;
}

export interface DriverInfo {
  name: string;
  rating: number;
  avatarUrl?: string;
  /** Lifetime completed trips on the platform. */
  totalTrips?: number;
  /** Year the driver joined, e.g. "2021". */
  memberSince?: string;
  /** Identity/document verification passed. */
  verified?: boolean;
}

export interface PassengerInfo {
  name: string;
  avatarUrl?: string;
  totalTrips?: number;
  /** Year the passenger joined, e.g. "2023". */
  memberSince?: string;
  verified?: boolean;
}

/**
 * Who tapped "Share Live Trip" — determines who the recipient ends up
 * tracking. A passenger sharing their own ride surfaces the passenger as
 * the tracked subject (with driver/vehicle shown for safety verification).
 * A driver/delivery partner sharing their trip surfaces themselves as the
 * tracked subject, with the passenger's name shown as well — a driver
 * protection measure, so the driver's family/dispatcher knows who is
 * riding in the car.
 */
export type ShareRole = "passenger" | "driver";

export interface VehicleInfo {
  make: string;
  model: string;
  plateNumber: string;
  color?: string;
  /** Model year, e.g. 2022. */
  year?: number;
  /** Photo of the vehicle (side profile preferred). */
  imageUrl?: string;
}

export interface TripShareData {
  token: string;
  status: TripStatus;
  passenger: PassengerInfo;
  driver: DriverInfo;
  vehicle: VehicleInfo;
  pickup: NamedPoint;
  destination: NamedPoint;
  /** Ordered points describing the road path from pickup to destination. */
  route: GeoPoint[];
  distanceKm: number;
  etaMinutes: number;
  /** Human-readable arrival time, e.g. "12:55 PM". */
  arrivalTimeLabel: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  /** Public link expiry — checked independently of trip status. */
  expiresAt: string;
}

export type ConnectionState = "live" | "reconnecting";

export interface LiveVehicleState {
  position: GeoPoint;
  bearingDeg: number;
  /** 0..1 progress along the route. */
  progress: number;
  connection: ConnectionState;
  lastUpdatedAt: number;
  etaMinutes: number;
  distanceRemainingKm: number;
}

/** Resolved view-state the public page renders — one level above raw trip status. */
export type TrackingViewState =
  | "loading"
  | "invalid"
  | "expired"
  | "cancelled"
  | "completed"
  | "active";
