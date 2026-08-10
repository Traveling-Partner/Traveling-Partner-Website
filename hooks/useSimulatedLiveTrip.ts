"use client";

import { useEffect, useRef, useState } from "react";
import type {
  ConnectionState,
  GeoPoint,
  LiveVehicleState,
  TripShareData,
} from "@/lib/liveTrip/types";

/**
 * Client-only simulation of a moving vehicle, used only because no real
 * trip/GPS backend exists in this repository. It never calls the network —
 * it interpolates a position along the trip's demo route on a timer, at a
 * cadence similar to a real location feed (a few seconds between updates),
 * and exposes the same LiveVehicleState shape a real data source should.
 * Swapping in a real implementation later means replacing this hook's
 * internals only; consumers (map, ETA, status pill) don't need to change.
 */

const TICK_MS = 3000;
const FULL_ROUTE_DURATION_MS = 150_000;
const RECONNECT_EVERY_MS = 45_000;
const RECONNECT_DURATION_MS = TICK_MS * 3;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

function bearingBetween(a: GeoPoint, b: GeoPoint): number {
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function pointAtProgress(route: GeoPoint[], progress: number) {
  const segments = route.length - 1;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const scaled = clamped * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;
  const a = route[index];
  const b = route[Math.min(index + 1, segments)];
  return {
    point: {
      lat: a.lat + (b.lat - a.lat) * localT,
      lng: a.lng + (b.lng - a.lng) * localT,
    },
    bearing: bearingBetween(a, b),
  };
}

const TRACKABLE_STATUSES = new Set(["in_progress", "driver_arriving"]);

export function useSimulatedLiveTrip(
  trip: TripShareData | null
): LiveVehicleState | null {
  const [state, setState] = useState<LiveVehicleState | null>(null);
  const lastUpdatedRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!trip || !TRACKABLE_STATUSES.has(trip.status)) {
      setState(null);
      return;
    }

    const startedAt = Date.now();
    const initialProgress = trip.status === "driver_arriving" ? 0.9 : 0.15;

    const tick = () => {
      const elapsed = Date.now() - startedAt;
      const cycleT =
        (elapsed % FULL_ROUTE_DURATION_MS) / FULL_ROUTE_DURATION_MS;
      const progress = Math.min(
        initialProgress + cycleT * (1 - initialProgress),
        0.99
      );
      const { point, bearing } = pointAtProgress(trip.route, progress);

      const withinReconnectWindow =
        elapsed > 10_000 &&
        elapsed % RECONNECT_EVERY_MS < RECONNECT_DURATION_MS;
      const connection: ConnectionState = withinReconnectWindow
        ? "reconnecting"
        : "live";

      if (!withinReconnectWindow) lastUpdatedRef.current = Date.now();

      const remaining = 1 - progress;
      setState({
        position: point,
        bearingDeg: bearing,
        progress,
        connection,
        lastUpdatedAt: lastUpdatedRef.current,
        etaMinutes: Math.max(1, Math.round(trip.etaMinutes * remaining)),
        distanceRemainingKm:
          Math.round(trip.distanceKm * remaining * 10) / 10,
      });
    };

    tick();
    const interval = setInterval(tick, TICK_MS);
    return () => clearInterval(interval);
  }, [trip]);

  return state;
}
