"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";
import { hasLivePosition, isFiniteCoord } from "@/lib/rideLocation/parse";
import type { RideLocationViewData } from "@/lib/rideLocation/types";
import TripSpinner from "@/components/live-trip/TripSpinner";

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const LOAD_TIMEOUT_MS = 12_000;
/** Steady city pace so corners stay visible, like a car on Google Maps. */
const DEMO_KMH = 36;
const LIVE_MIN_KMH = 18;
const LIVE_MAX_KMH = 52;
const TURN_DEG_PER_SEC = 260;
const CAR_W = 28;
const CAR_H = 62;
const CAR_ICON_W = CAR_W + 4;
const CAR_ICON_H = CAR_H + 6;
/** Nose starts turning this far before a corner. The body stays on the line. */
const HEADING_LOOKAHEAD_KM = 0.02;
const ROUTE_BLUE = "#1a73e8";
const LOOK_BACK_KM = 0.4;
const LOOK_AHEAD_KM = 20;

type GeoPoint = { lat: number; lng: number };

type RouteSnap = { point: GeoPoint; bearing: number; along: number };

function pinIconHtml(color: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">` +
    `<line x1="11" y1="16" x2="11" y2="28" stroke="${color}" stroke-width="2" stroke-opacity="0.5"/>` +
    `<circle cx="11" cy="10" r="8" fill="${color}" stroke="white" stroke-width="3"/>` +
    `</svg>`
  );
}

/** Photoreal top-down sedan, nose up. Rotates with the road bearing. */
function carIconHtml(bearingDeg: number): string {
  return (
    `<div style="width:${CAR_ICON_W}px;height:${CAR_ICON_H}px;display:flex;align-items:center;justify-content:center;">` +
    `<div data-car-rotator="1" style="transform:rotate(${bearingDeg}deg);width:${CAR_W}px;height:${CAR_H}px;line-height:0;will-change:transform;filter:drop-shadow(0 1px 2px rgba(32,33,36,0.5));">` +
    `<img src="/images/map-car.png" alt="" width="${CAR_W}" height="${CAR_H}" draggable="false" style="display:block;width:${CAR_W}px;height:${CAR_H}px;pointer-events:none;" />` +
    `</div></div>`
  );
}

function carDivIcon(bearingDeg: number): L.DivIcon {
  return L.divIcon({
    html: carIconHtml(bearingDeg),
    className: "ride-car-marker",
    iconSize: [CAR_ICON_W, CAR_ICON_H],
    iconAnchor: [CAR_ICON_W / 2, CAR_ICON_H / 2],
  });
}

function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function bearingBetween(a: GeoPoint, b: GeoPoint): number {
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(la2);
  const x = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function segmentBearing(line: GeoPoint[], index: number): number {
  for (let j = Math.max(1, index); j < line.length; j += 1) {
    if (haversineKm(line[j - 1], line[j]) >= 0.002) return bearingBetween(line[j - 1], line[j]);
  }
  for (let j = Math.min(index, line.length - 1); j >= 1; j -= 1) {
    if (haversineKm(line[j - 1], line[j]) >= 0.002) return bearingBetween(line[j - 1], line[j]);
  }
  return 0;
}

function projectOntoSegment(a: GeoPoint, b: GeoPoint, p: GeoPoint): { point: GeoPoint; t: number } {
  const latScale = 111_320;
  const lngScale = 111_320 * Math.cos((((a.lat + b.lat) / 2) * Math.PI) / 180);
  const abx = (b.lng - a.lng) * lngScale;
  const aby = (b.lat - a.lat) * latScale;
  const apx = (p.lng - a.lng) * lngScale;
  const apy = (p.lat - a.lat) * latScale;
  const ab2 = abx * abx + aby * aby || 1e-9;
  const t = Math.min(1, Math.max(0, (apx * abx + apy * aby) / ab2));
  return {
    t,
    point: { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t },
  };
}

function cumulativeDistances(line: GeoPoint[]): number[] {
  const out = [0];
  for (let i = 1; i < line.length; i += 1) {
    out.push(out[i - 1] + haversineKm(line[i - 1], line[i]));
  }
  return out;
}

function pointAtAlong(line: GeoPoint[], cumulative: number[], along: number): { point: GeoPoint; bearing: number } {
  const total = cumulative[cumulative.length - 1] || 0;
  const target = Math.min(Math.max(along, 0), total);
  let i = 1;
  while (i < cumulative.length - 1 && cumulative[i] < target) i += 1;
  const a = line[i - 1];
  const b = line[i];
  const segLen = cumulative[i] - cumulative[i - 1] || 1e-9;
  const t = (target - cumulative[i - 1]) / segLen;
  return {
    point: { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t },
    bearing: segmentBearing(line, i),
  };
}

/** Closest point on the drawn route. Stays on the polyline, preferring forward progress. */
function nearestOnRoute(
  line: GeoPoint[],
  cumulative: number[],
  gps: GeoPoint,
  hintAlong: number | null
): RouteSnap {
  const total = cumulative[cumulative.length - 1] || 0;
  const search = (from: number, to: number): RouteSnap | null => {
    let best: RouteSnap | null = null;
    let bestDist = Infinity;
    for (let i = 1; i < line.length; i += 1) {
      const segStart = cumulative[i - 1];
      const segEnd = cumulative[i];
      if (segEnd < from || segStart > to) continue;
      const proj = projectOntoSegment(line[i - 1], line[i], gps);
      const dist = haversineKm(gps, proj.point);
      if (dist < bestDist) {
        bestDist = dist;
        best = {
          point: proj.point,
          bearing: segmentBearing(line, i),
          along: segStart + (segEnd - segStart) * proj.t,
        };
      }
    }
    return best;
  };

  const fallback = (): RouteSnap => ({
    point: line[0],
    bearing: segmentBearing(line, 1),
    along: 0,
  });

  if (hintAlong == null) return search(0, total) ?? fallback();

  const windowed = search(
    Math.max(0, hintAlong - LOOK_BACK_KM),
    Math.min(total, hintAlong + LOOK_AHEAD_KM)
  );
  return windowed ?? search(0, total) ?? fallback();
}

function stepHeading(current: number, target: number, maxDeg: number): number {
  const delta = ((target - current + 540) % 360) - 180;
  if (Math.abs(delta) <= maxDeg) return (target + 360) % 360;
  return (current + Math.sign(delta) * maxDeg + 360) % 360;
}

function setCarBearing(marker: L.Marker | null, bearing: number) {
  const el = marker?.getElement();
  const rotator = el?.querySelector("[data-car-rotator]") as HTMLElement | null;
  if (rotator) rotator.style.transform = `rotate(${bearing}deg)`;
}

async function fetchRoadRoute(from: GeoPoint, to: GeoPoint): Promise<GeoPoint[] | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const url =
      `${OSRM_URL}/${from.lng},${from.lat};${to.lng},${to.lat}` +
      `?overview=full&geometries=geojson`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    const coords: [number, number][] | undefined = json?.routes?.[0]?.geometry?.coordinates;
    if (!coords || coords.length < 2) return null;
    return coords.map(([lng, lat]) => ({ lat, lng }));
  } catch {
    return null;
  }
}

function fitPadding(map: L.Map): [number, number] {
  const size = map.getSize();
  const pad = Math.max(16, Math.min(48, Math.floor(Math.min(size.x, size.y) / 5)));
  return [pad, pad];
}

function pickupPoint(data: RideLocationViewData): GeoPoint | null {
  if (isFiniteCoord(data.pickupLatitude) && isFiniteCoord(data.pickupLongitude)) {
    return { lat: data.pickupLatitude, lng: data.pickupLongitude };
  }
  return null;
}

function dropoffPoint(data: RideLocationViewData): GeoPoint | null {
  if (isFiniteCoord(data.dropoffLatitude) && isFiniteCoord(data.dropoffLongitude)) {
    return { lat: data.dropoffLatitude, lng: data.dropoffLongitude };
  }
  return null;
}

interface RideLocationMapProps {
  data: RideLocationViewData;
  frozen?: boolean;
  /** Drives the whole road from pickup so corners, U-turns, and speed can be watched. */
  demoDrive?: boolean;
  waitingLabel: string;
  className?: string;
}

export default function RideLocationMap({
  data,
  frozen = false,
  demoDrive = false,
  waitingLabel,
  className = "",
}: RideLocationMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const boundsRef = useRef<L.LatLngBounds | null>(null);
  const carMarkerRef = useRef<L.Marker | null>(null);
  const routeRef = useRef<GeoPoint[] | null>(null);
  const cumulativeRef = useRef<number[] | null>(null);
  const alongRef = useRef<number | null>(null);
  const targetAlongRef = useRef<number | null>(null);
  const bearingRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);
  const glideAlongRef = useRef<((along: number) => void) | null>(null);
  const demoDriveRef = useRef(demoDrive);
  demoDriveRef.current = demoDrive;
  const interactingRef = useRef(false);
  const currentPosRef = useRef<GeoPoint | null>(null);
  const lastPosRef = useRef<GeoPoint | null>(null);
  const animRafRef = useRef<number | null>(null);
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;
  const [routeTick, setRouteTick] = useState(0);

  const pickup = pickupPoint(data);
  const dropoff = dropoffPoint(data);
  const live = hasLivePosition(data) ? { lat: data.latitude as number, lng: data.longitude as number } : null;
  const layoutKey = `${pickup?.lat ?? ""}:${pickup?.lng ?? ""}:${dropoff?.lat ?? ""}:${dropoff?.lng ?? ""}`;

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setMapReady(false);

    const cancelGlide = () => {
      if (animRafRef.current !== null) {
        window.cancelAnimationFrame(animRafRef.current);
        animRafRef.current = null;
      }
    };

    let holdUntil = 0;
    let demoFramed = false;
    let lastFollow = 0;
    let segmentFrom = 0;
    let segmentStart = 0;
    let programmatic = false;
    let userAdjusted = false;
    let cameraFollow = false;

    const placeOnRoute = (along: number, heading?: number) => {
      const line = routeRef.current;
      const cumulative = cumulativeRef.current;
      if (!line || !cumulative) return;
      const pose = pointAtAlong(line, cumulative, along);
      alongRef.current = along;
      currentPosRef.current = pose.point;
      if (heading !== undefined) bearingRef.current = heading;
      if (!carMarkerRef.current || interactingRef.current) return;
      carMarkerRef.current.setLatLng([pose.point.lat, pose.point.lng]);
      setCarBearing(carMarkerRef.current, bearingRef.current);
    };

    const driveTick = (now: number) => {
      const line = routeRef.current;
      const cumulative = cumulativeRef.current;
      const car = carMarkerRef.current;
      const target = targetAlongRef.current;
      if (!line || !cumulative || target == null || !car) {
        animRafRef.current = null;
        return;
      }

      const prev = lastFrameRef.current ?? now;
      lastFrameRef.current = now;
      const frameDt = Math.min(0.25, Math.max(0.016, (now - prev) / 1000));
      const total = cumulative[cumulative.length - 1] || 0;
      const origin = segmentFrom;
      const elapsedSec = segmentStart ? Math.max(0, (now - segmentStart) / 1000) : 0;
      const gapKm = Math.abs(target - origin);
      const speedKmh = demoDriveRef.current
        ? DEMO_KMH
        : Math.min(LIVE_MAX_KMH, Math.max(LIVE_MIN_KMH, (gapKm / 2) * 3600));
      const traveled = (speedKmh / 3600) * elapsedSec;
      const dir = Math.sign(target - origin) || 1;
      let along = origin + dir * Math.min(gapKm, traveled);
      const remaining = target - along;

      if (Math.abs(remaining) < 0.0004) {
        placeOnRoute(target);
        if (demoDriveRef.current && total > 0.05) {
          if (!holdUntil) holdUntil = now + 1600;
          if (now >= holdUntil) {
            holdUntil = 0;
            segmentFrom = 0;
            segmentStart = now;
            alongRef.current = 0;
            bearingRef.current = pointAtAlong(line, cumulative, HEADING_LOOKAHEAD_KM).bearing;
            placeOnRoute(0, bearingRef.current);
          }
          animRafRef.current = window.requestAnimationFrame(driveTick);
          return;
        }
        animRafRef.current = null;
        return;
      }

      const pose = pointAtAlong(line, cumulative, along);
      const look = pointAtAlong(line, cumulative, along + Math.sign(remaining) * HEADING_LOOKAHEAD_KM);
      bearingRef.current = stepHeading(bearingRef.current, look.bearing, TURN_DEG_PER_SEC * frameDt);
      alongRef.current = along;
      currentPosRef.current = pose.point;
      car.setLatLng([pose.point.lat, pose.point.lng]);
      setCarBearing(car, bearingRef.current);

      const mapNow = mapRef.current;
      if (demoDriveRef.current && mapNow && !userAdjusted && !interactingRef.current && !cameraFollow) {
        if (!demoFramed) {
          cameraFollow = true;
          mapNow.setView([pose.point.lat, pose.point.lng], 16.5, { animate: false });
          demoFramed = true;
          cameraFollow = false;
        } else if (now - lastFollow > 1400) {
          const pt = mapNow.latLngToContainerPoint([pose.point.lat, pose.point.lng]);
          const size = mapNow.getSize();
          const margin = 120;
          const nearEdge =
            pt.x < margin || pt.y < margin || pt.x > size.x - margin || pt.y > size.y - margin;
          if (nearEdge) {
            lastFollow = now;
            cameraFollow = true;
            mapNow.panTo([pose.point.lat, pose.point.lng], { animate: false });
            cameraFollow = false;
          }
        }
      }

      animRafRef.current = window.requestAnimationFrame(driveTick);
    };

    const glideAlong = (targetAlong: number) => {
      const cumulative = cumulativeRef.current;
      const line = routeRef.current;
      if (!cumulative || !line) return;
      const total = cumulative[cumulative.length - 1] || 0;
      const clamped = Math.min(Math.max(targetAlong, 0), total);
      const previousTarget = targetAlongRef.current;
      targetAlongRef.current = clamped;
      if (!carMarkerRef.current) return;

      if (alongRef.current == null) {
        const startAlong = demoDriveRef.current ? 0 : clamped;
        const pose = pointAtAlong(line, cumulative, startAlong);
        bearingRef.current = pose.bearing;
        placeOnRoute(startAlong, pose.bearing);
        if (!demoDriveRef.current) return;
      }

      const alreadyDriving =
        animRafRef.current != null &&
        previousTarget != null &&
        Math.abs(previousTarget - clamped) < 0.001;
      if (!alreadyDriving) {
        segmentFrom = alongRef.current ?? (demoDriveRef.current ? 0 : clamped);
        segmentStart = performance.now();
      }
      if (animRafRef.current == null) {
        lastFrameRef.current = null;
        animRafRef.current = window.requestAnimationFrame(driveTick);
      }
    };
    glideAlongRef.current = glideAlong;

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 140,
      wheelDebounceTime: 40,
      zoomAnimation: true,
      markerZoomAnimation: true,
    });
    mapRef.current = map;

    const fitRoute = () => {
      programmatic = true;
      map.invalidateSize({ animate: false, pan: false });
      programmatic = false;
      if (demoDriveRef.current) return;
      const bounds = boundsRef.current;
      if (!bounds || userAdjusted) return;
      const size = map.getSize();
      if (size.x < 40 || size.y < 40) return;
      programmatic = true;
      map.fitBounds(bounds, { padding: fitPadding(map), animate: false, maxZoom: 16 });
      programmatic = false;
    };

    const onInteractStart = () => {
      if (programmatic || cameraFollow) return;
      userAdjusted = true;
      interactingRef.current = true;
    };
    const onInteractEnd = () => {
      if (cameraFollow) {
        cameraFollow = false;
        return;
      }
      if (programmatic) return;
      interactingRef.current = false;
      const along = alongRef.current;
      if (along != null) placeOnRoute(along);
      const target = targetAlongRef.current;
      if (target != null && along != null && Math.abs(target - along) > 0.001) {
        glideAlong(target);
      }
    };
    const resizeObserver = new ResizeObserver(() => {
      fitRoute();
    });
    resizeObserver.observe(container);

    map.on("zoomstart", onInteractStart);
    map.on("movestart", onInteractStart);
    map.on("zoomend", onInteractEnd);
    map.on("moveend", onInteractEnd);

    const tiles = L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    let sawTile = false;
    tiles.on("tileload", () => {
      sawTile = true;
      if (!cancelled) setMapReady(true);
    });
    const timeoutId = window.setTimeout(() => {
      if (!sawTile && !cancelled) setMapReady(true);
    }, LOAD_TIMEOUT_MS);

    const seed = pickup ?? dropoff ?? live ?? { lat: 31.52, lng: 74.35 };
    programmatic = true;
    map.setView([seed.lat, seed.lng], demoDriveRef.current ? 16.5 : pickup && dropoff ? 13 : 15);
    programmatic = false;

    if (pickup) {
      L.marker([pickup.lat, pickup.lng], {
        icon: L.divIcon({
          html: pinIconHtml("#16a34a"),
          className: "",
          iconSize: [22, 30],
          iconAnchor: [11, 28],
        }),
        title: data.pickupAddress || "Pickup",
        interactive: false,
      }).addTo(map);
    }

    if (dropoff) {
      L.marker([dropoff.lat, dropoff.lng], {
        icon: L.divIcon({
          html: pinIconHtml("#0b0b0b"),
          className: "",
          iconSize: [22, 30],
          iconAnchor: [11, 28],
        }),
        title: data.dropoffAddress || "Drop-off",
        interactive: false,
      }).addTo(map);
    }

    if (pickup && dropoff) {
      const rough = L.latLngBounds(
        [pickup.lat, pickup.lng],
        [dropoff.lat, dropoff.lng]
      );
      boundsRef.current = rough;
      fitRoute();

      void (async () => {
        const road = await fetchRoadRoute(pickup, dropoff);
        if (cancelled || !road) return;
        routeRef.current = road;
        cumulativeRef.current = cumulativeDistances(road);
        const latLngs = road.map((p) => [p.lat, p.lng] as [number, number]);
        L.polyline(latLngs, { color: "#ffffff", weight: 9, opacity: 0.9 }).addTo(map);
        L.polyline(latLngs, { color: ROUTE_BLUE, weight: 5, opacity: 0.95 }).addTo(map);
        const bounds = L.latLngBounds(latLngs);
        boundsRef.current = bounds;
        fitRoute();
        setRouteTick((n) => n + 1);
      })();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      cancelGlide();
      resizeObserver.disconnect();
      map.off("zoomstart", onInteractStart);
      map.off("movestart", onInteractStart);
      map.off("zoomend", onInteractEnd);
      map.off("moveend", onInteractEnd);
      map.remove();
      mapRef.current = null;
      carMarkerRef.current = null;
      boundsRef.current = null;
      routeRef.current = null;
      cumulativeRef.current = null;
      alongRef.current = null;
      targetAlongRef.current = null;
      bearingRef.current = 0;
      lastFrameRef.current = null;
      glideAlongRef.current = null;
      currentPosRef.current = null;
    };
    // Re-init only when the trip endpoints change, not on every GPS ping.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !live) return;

    const line = routeRef.current;
    const cumulative = cumulativeRef.current;

    if (demoDriveRef.current && line && cumulative && line.length >= 2) {
      const total = cumulative[cumulative.length - 1] || 0;
      const start = pointAtAlong(line, cumulative, 0);
      if (!carMarkerRef.current) {
        carMarkerRef.current = L.marker([start.point.lat, start.point.lng], {
          icon: carDivIcon(start.bearing),
          interactive: false,
          zIndexOffset: 1000,
        }).addTo(map);
        alongRef.current = 0;
        bearingRef.current = start.bearing;
        currentPosRef.current = start.point;
      }
      if (animRafRef.current != null) {
        window.cancelAnimationFrame(animRafRef.current);
        animRafRef.current = null;
      }
      glideAlongRef.current?.(total);
      return;
    }

    if (demoDriveRef.current) return;

    const snap =
      line && cumulative && line.length >= 2
        ? nearestOnRoute(line, cumulative, live, alongRef.current)
        : null;

    const heading =
      snap?.bearing ??
      (isFiniteCoord(data.heading)
        ? data.heading
        : lastPosRef.current
          ? bearingBetween(lastPosRef.current, live)
          : 0);
    const point = snap?.point ?? live;

    if (snap) targetAlongRef.current = snap.along;

    if (!carMarkerRef.current) {
      carMarkerRef.current = L.marker([point.lat, point.lng], {
        icon: carDivIcon(heading),
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      currentPosRef.current = point;
      lastPosRef.current = live;
      if (snap) alongRef.current = snap.along;
      if (!pickup && !dropoff) {
        map.setView([point.lat, point.lng], 15, { animate: false });
      }
      return;
    }

    if (frozenRef.current || interactingRef.current) {
      lastPosRef.current = live;
      return;
    }

    if (snap && glideAlongRef.current) {
      lastPosRef.current = live;
      glideAlongRef.current(snap.along);
      return;
    }

    const place = (next: GeoPoint, bearing: number) => {
      carMarkerRef.current?.setLatLng([next.lat, next.lng]);
      setCarBearing(carMarkerRef.current, bearing);
      currentPosRef.current = next;
    };

    const from = currentPosRef.current ?? point;
    if (animRafRef.current !== null) {
      window.cancelAnimationFrame(animRafRef.current);
      animRafRef.current = null;
    }
    setCarBearing(carMarkerRef.current, heading);
    const startedAt = performance.now();
    const tick = (now: number) => {
      if (interactingRef.current) {
        animRafRef.current = null;
        return;
      }
      const t = Math.min(1, (now - startedAt) / 1200);
      place(
        {
          lat: from.lat + (point.lat - from.lat) * t,
          lng: from.lng + (point.lng - from.lng) * t,
        },
        heading
      );
      if (t < 1) {
        animRafRef.current = window.requestAnimationFrame(tick);
      } else {
        animRafRef.current = null;
        lastPosRef.current = live;
      }
    };
    animRafRef.current = window.requestAnimationFrame(tick);
  }, [live?.lat, live?.lng, data.heading, pickup, dropoff, routeTick, frozen]);

  const handleRecenter = () => {
    const map = mapRef.current;
    if (!map) return;
    if (boundsRef.current) {
      map.flyToBounds(boundsRef.current, { padding: fitPadding(map), duration: 0.85, maxZoom: 16 });
      return;
    }
    const point = live ?? pickup ?? dropoff;
    if (point) map.flyTo([point.lat, point.lng], 15, { duration: 0.85 });
  };

  return (
    <div className={`relative overflow-hidden bg-[#f3f2ee] ${className}`}>
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {mapReady && (
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map"
          className="absolute bottom-4 right-4 z-[500] flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0b0b0b] shadow-[0_8px_20px_rgba(11,11,11,0.18)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb813]"
        >
          <LocateFixed className="h-5 w-5" />
        </button>
      )}

      {!live && (
        <div className="absolute inset-x-3 top-3 z-[500] rounded-2xl bg-white/95 px-4 py-3 text-center shadow-[0_8px_20px_rgba(11,11,11,0.12)] backdrop-blur-sm sm:inset-x-auto sm:left-1/2 sm:w-[min(360px,calc(100%-24px))] sm:-translate-x-1/2">
          <p className="text-sm font-semibold text-[#0b0b0b]">{waitingLabel}</p>
          <p className="mt-0.5 text-xs font-medium text-[#6f6e68]">
            The pin will appear as soon as a location is shared.
          </p>
        </div>
      )}

      {!mapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f3f2ee]">
          <TripSpinner label="Loading map…" />
        </div>
      )}
    </div>
  );
}
