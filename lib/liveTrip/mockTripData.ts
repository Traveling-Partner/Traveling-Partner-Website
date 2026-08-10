/**
 * Isolated demo data for the Live Trip Sharing preview.
 *
 * IMPORTANT: this is not connected to any backend, database, or API. No
 * real trip/driver/GPS backend exists in this repository (it is a static
 * marketing site — see docs discussed with the team). Every value below is
 * sample data used only to make the frontend fully demoable end-to-end.
 * A real integration would replace `getMockTrip` with a real fetch/socket
 * call that resolves the same `TripShareData` shape from lib/liveTrip/types.ts.
 */

import type { GeoPoint, NamedPoint, TripShareData, TripStatus } from "./types";

const LAHORE: NamedPoint = {
  lat: 31.5204,
  lng: 74.3587,
  label: "Lahore, DHA Phase 5",
  address: "DHA Phase 5, Lahore, Punjab",
};

const ISLAMABAD: NamedPoint = {
  lat: 33.6844,
  lng: 73.0479,
  label: "Islamabad, F-10",
  address: "F-10 Markaz, Islamabad Capital Territory",
};

/**
 * Generates a gentle, road-like curve between two points (no routing API
 * involved — this is purely a visual approximation for the demo map).
 */
function buildDemoRoute(start: GeoPoint, end: GeoPoint, steps = 48): GeoPoint[] {
  const dLat = end.lat - start.lat;
  const dLng = end.lng - start.lng;
  const perpLat = -dLng;
  const perpLng = dLat;

  const route: GeoPoint[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const bow = Math.sin(t * Math.PI) * 0.05;
    const wobble = Math.sin(t * 24) * 0.0035 * Math.sin(t * Math.PI);
    const offset = bow + wobble;
    route.push({
      lat: start.lat + dLat * t + perpLat * offset,
      lng: start.lng + dLng * t + perpLng * offset,
    });
  }
  return route;
}

const DEMO_ROUTE = buildDemoRoute(LAHORE, ISLAMABAD);

const now = () => Date.now();
const hoursFromNow = (h: number) => new Date(now() + h * 60 * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(now() - h * 60 * 60 * 1000).toISOString();

interface DemoTripSeed {
  status: TripStatus;
  etaMinutes: number;
  arrivalTimeLabel: string;
  expiresAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

const SEEDS: Record<string, DemoTripSeed> = {
  "demo-scheduled": {
    status: "scheduled",
    etaMinutes: 40,
    arrivalTimeLabel: "1:20 PM",
    expiresAt: hoursFromNow(6),
  },
  "demo-assigned": {
    status: "driver_assigned",
    etaMinutes: 12,
    arrivalTimeLabel: "12:15 PM",
    expiresAt: hoursFromNow(6),
  },
  "demo-arriving": {
    status: "driver_arriving",
    etaMinutes: 3,
    arrivalTimeLabel: "12:35 PM",
    expiresAt: hoursFromNow(6),
  },
  "demo-active": {
    status: "in_progress",
    etaMinutes: 24,
    arrivalTimeLabel: "12:55 PM",
    expiresAt: hoursFromNow(6),
    startedAt: hoursAgo(1),
  },
  "demo-paused": {
    status: "paused",
    etaMinutes: 18,
    arrivalTimeLabel: "1:05 PM",
    expiresAt: hoursFromNow(6),
    startedAt: hoursAgo(1),
  },
  "demo-completed": {
    status: "completed",
    etaMinutes: 0,
    arrivalTimeLabel: "12:58 PM",
    expiresAt: hoursFromNow(6),
    startedAt: hoursAgo(2),
    completedAt: hoursAgo(1),
  },
  "demo-cancelled": {
    status: "cancelled",
    etaMinutes: 0,
    arrivalTimeLabel: "—",
    expiresAt: hoursFromNow(6),
    cancelledAt: hoursAgo(1),
  },
  "demo-expired": {
    status: "in_progress",
    etaMinutes: 24,
    arrivalTimeLabel: "12:55 PM",
    expiresAt: hoursAgo(2),
    startedAt: hoursAgo(4),
  },
};

function buildTrip(token: string, seed: DemoTripSeed): TripShareData {
  return {
    token,
    status: seed.status,
    passenger: {
      name: "Ayesha Khan",
      avatarUrl: "/images/live-trip/passenger-avatar.webp",
      totalTrips: 86,
      memberSince: "2023",
      verified: true,
    },
    driver: {
      name: "Muhammad Umair",
      rating: 4.9,
      avatarUrl: "/images/live-trip/driver-avatar.webp",
      totalTrips: 2140,
      memberSince: "2021",
      verified: true,
    },
    vehicle: {
      make: "Toyota",
      model: "Corolla",
      plateNumber: "LEB-8214",
      color: "White",
      year: 2022,
      imageUrl: "/images/live-trip/vehicle-corolla.webp",
    },
    pickup: LAHORE,
    destination: ISLAMABAD,
    route: DEMO_ROUTE,
    distanceKm: 128,
    etaMinutes: seed.etaMinutes,
    arrivalTimeLabel: seed.arrivalTimeLabel,
    expiresAt: seed.expiresAt,
    startedAt: seed.startedAt,
    completedAt: seed.completedAt,
    cancelledAt: seed.cancelledAt,
  };
}

export const MOCK_TRIPS: Record<string, TripShareData> = Object.fromEntries(
  Object.entries(SEEDS).map(([token, seed]) => [token, buildTrip(token, seed)])
);

/** Default token used by the demo "Share Live Trip" harness. */
export const DEFAULT_DEMO_TOKEN = "demo-active";

export function getMockTrip(token: string | null | undefined): TripShareData | null {
  if (!token) return null;
  return MOCK_TRIPS[token] ?? null;
}

export function isTripLinkExpired(trip: TripShareData): boolean {
  return new Date(trip.expiresAt).getTime() < Date.now();
}
