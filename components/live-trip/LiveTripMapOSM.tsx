"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed } from "lucide-react";
import type { GeoPoint, LiveVehicleState, TripShareData } from "@/lib/liveTrip/types";
import TripSpinner from "./TripSpinner";

/**
 * Keyless interactive map: Leaflet + OpenStreetMap tiles (no API key, no
 * billing) with a real road route fetched from the public OSRM router and
 * a live car marker that glides along the blue line.
 *
 * Zoom note: never call marker.setLatLng() while Leaflet is mid-zoom.
 * That fights the zoom CSS transform and flings the car off the route
 * (sometimes hundreds of km). We freeze updates during zoom/pan and
 * resync once the view is settled. Zoom animation is also disabled so
 * marker pixels stay locked to lat/lng.
 */

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const LOAD_TIMEOUT_MS = 12_000;
const GLIDE_MS = 2800;
const ROUTE_BLUE = "#1a73e8";

function pinIconHtml(color: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">` +
    `<line x1="11" y1="16" x2="11" y2="28" stroke="${color}" stroke-width="2" stroke-opacity="0.5"/>` +
    `<circle cx="11" cy="10" r="8" fill="${color}" stroke="white" stroke-width="3"/>` +
    `</svg>`
  );
}

function carIconHtml(bearingDeg: number): string {
  return (
    `<div style="width:38px;height:38px;display:flex;align-items:center;justify-content:center;">` +
    `<div data-car-rotator="1" style="transform:rotate(${bearingDeg}deg);width:20px;height:34px;line-height:0;">` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="34" viewBox="0 0 20 34" style="display:block;filter:drop-shadow(0 2px 4px rgba(11,11,11,0.4));">` +
    `<rect x="1.5" y="2" width="17" height="30" rx="6.5" fill="#0b0b0b" stroke="#fce001" stroke-width="2"/>` +
    `<rect x="4.5" y="7" width="11" height="6" rx="2" fill="#fce001"/>` +
    `<rect x="4.5" y="21" width="11" height="5" rx="2" fill="#fdb813" opacity="0.85"/>` +
    `</svg>` +
    `</div></div>`
  );
}

function glowIconHtml(): string {
  return (
    `<div style="width:44px;height:44px;border-radius:9999px;background:rgba(253,184,19,0.28);box-shadow:0 0 0 8px rgba(253,184,19,0.12);"></div>`
  );
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

function pointAlong(line: GeoPoint[], cumulative: number[], progress: number) {
  const total = cumulative[cumulative.length - 1] || 1;
  const target = Math.min(Math.max(progress, 0), 1) * total;

  let i = 1;
  while (i < cumulative.length - 1 && cumulative[i] < target) i += 1;

  const segStart = cumulative[i - 1];
  const segLen = cumulative[i] - segStart || 1e-9;
  const t = (target - segStart) / segLen;
  const a = line[i - 1];
  const b = line[i];

  return {
    point: { lat: a.lat + (b.lat - a.lat) * t, lng: a.lng + (b.lng - a.lng) * t },
    bearing: bearingBetween(a, b),
  };
}

function cumulativeDistances(line: GeoPoint[]): number[] {
  const out = [0];
  for (let i = 1; i < line.length; i += 1) {
    out.push(out[i - 1] + haversineKm(line[i - 1], line[i]));
  }
  return out;
}

async function fetchRoadRoute(trip: TripShareData): Promise<GeoPoint[] | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const url =
      `${OSRM_URL}/${trip.pickup.lng},${trip.pickup.lat};` +
      `${trip.destination.lng},${trip.destination.lat}` +
      `?overview=full&geometries=geojson`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const coords: [number, number][] | undefined = data?.routes?.[0]?.geometry?.coordinates;
    if (!coords || coords.length < 2) return null;
    return coords.map(([lng, lat]) => ({ lat, lng }));
  } catch {
    return null;
  }
}

function setCarBearing(marker: L.Marker | null, bearing: number) {
  const el = marker?.getElement();
  const rotator = el?.querySelector("[data-car-rotator]") as HTMLElement | null;
  if (rotator) rotator.style.transform = `rotate(${bearing}deg)`;
}

interface LiveTripMapOSMProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
  className?: string;
  onFail: () => void;
}

export default function LiveTripMapOSM({
  trip,
  liveState,
  className = "",
  onFail,
}: LiveTripMapOSMProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const boundsRef = useRef<L.LatLngBounds | null>(null);
  const carMarkerRef = useRef<L.Marker | null>(null);
  const glowMarkerRef = useRef<L.Marker | null>(null);
  const lineGeomRef = useRef<GeoPoint[] | null>(null);
  const cumulativeRef = useRef<number[] | null>(null);
  const animRafRef = useRef<number | null>(null);
  const interactingRef = useRef(false);
  const currentPosRef = useRef<GeoPoint | null>(null);
  const targetPosRef = useRef<GeoPoint | null>(null);
  const targetBearingRef = useRef(0);
  const glideToRef = useRef<((point: GeoPoint, bearing: number) => void) | null>(null);
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

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

    /** Place markers at lat/lng. Safe ONLY when the map is not mid-zoom. */
    const placeAt = (point: GeoPoint, bearing?: number) => {
      currentPosRef.current = point;
      targetPosRef.current = point;
      if (bearing !== undefined) targetBearingRef.current = bearing;
      carMarkerRef.current?.setLatLng([point.lat, point.lng]);
      glowMarkerRef.current?.setLatLng([point.lat, point.lng]);
      if (bearing !== undefined) setCarBearing(carMarkerRef.current, bearing);
    };

    const glideTo = (point: GeoPoint, bearing: number) => {
      targetPosRef.current = point;
      targetBearingRef.current = bearing;

      const car = carMarkerRef.current;
      // Mid zoom/pan OR car not ready yet: remember target, don't touch DOM.
      // setLatLng during Leaflet's zoom transform is what flings the car
      // off-route (sometimes into another country on the map).
      if (!car || interactingRef.current) {
        cancelGlide();
        return;
      }

      const from = currentPosRef.current ?? point;
      cancelGlide();
      setCarBearing(car, bearing);

      const startedAt = performance.now();
      const tick = (now: number) => {
        if (interactingRef.current) {
          cancelGlide();
          return;
        }

        const t = Math.min(1, (now - startedAt) / GLIDE_MS);
        const mid = {
          lat: from.lat + (point.lat - from.lat) * t,
          lng: from.lng + (point.lng - from.lng) * t,
        };
        currentPosRef.current = mid;
        car.setLatLng([mid.lat, mid.lng]);
        glowMarkerRef.current?.setLatLng([mid.lat, mid.lng]);

        if (t < 1) {
          animRafRef.current = window.requestAnimationFrame(tick);
        } else {
          animRafRef.current = null;
          currentPosRef.current = point;
        }
      };

      animRafRef.current = window.requestAnimationFrame(tick);
    };

    glideToRef.current = glideTo;

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
      // Critical: animated zoom applies a CSS transform that desyncs HTML
      // markers from their lat/lng while setLatLng/RAF also run.
      zoomAnimation: false,
      markerZoomAnimation: false,
      fadeAnimation: false,
    });
    mapRef.current = map;

    const onInteractStart = () => {
      interactingRef.current = true;
      cancelGlide();
    };

    const onInteractEnd = () => {
      interactingRef.current = false;
      // Resync AFTER the view has settled — this is the safe moment.
      const target = targetPosRef.current;
      if (target) placeAt(target, targetBearingRef.current);
    };

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
      if (!sawTile && !cancelled) {
        console.error(
          "[LiveTripMapOSM] no map tiles loaded within 12s — falling back to the Google Maps embed."
        );
        onFailRef.current();
      }
    }, LOAD_TIMEOUT_MS);

    const roughBounds = L.latLngBounds([
      [trip.pickup.lat, trip.pickup.lng],
      [trip.destination.lat, trip.destination.lng],
    ]);
    map.fitBounds(roughBounds, { padding: [48, 48], animate: false });

    L.marker([trip.pickup.lat, trip.pickup.lng], {
      icon: L.divIcon({
        html: pinIconHtml("#16a34a"),
        className: "",
        iconSize: [22, 30],
        iconAnchor: [11, 28],
      }),
      title: trip.pickup.label,
      interactive: false,
    }).addTo(map);

    L.marker([trip.destination.lat, trip.destination.lng], {
      icon: L.divIcon({
        html: pinIconHtml("#0b0b0b"),
        className: "",
        iconSize: [22, 30],
        iconAnchor: [11, 28],
      }),
      title: trip.destination.label,
      interactive: false,
    }).addTo(map);

    (async () => {
      const road = (await fetchRoadRoute(trip)) ?? trip.route;
      if (cancelled) return;

      lineGeomRef.current = road;
      cumulativeRef.current = cumulativeDistances(road);

      const latLngs = road.map((p) => [p.lat, p.lng] as [number, number]);
      L.polyline(latLngs, { color: "#ffffff", weight: 9, opacity: 0.9 }).addTo(map);
      L.polyline(latLngs, { color: ROUTE_BLUE, weight: 5, opacity: 0.95 }).addTo(map);

      const bounds = L.latLngBounds(latLngs);
      boundsRef.current = bounds;
      map.fitBounds(bounds, { padding: [48, 48], animate: false });

      const start = pointAlong(road, cumulativeRef.current, liveState?.progress ?? 0);

      glowMarkerRef.current = L.marker([start.point.lat, start.point.lng], {
        icon: L.divIcon({
          html: glowIconHtml(),
          className: "",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        }),
        interactive: false,
        zIndexOffset: 500,
      }).addTo(map);

      carMarkerRef.current = L.marker([start.point.lat, start.point.lng], {
        icon: L.divIcon({
          html: carIconHtml(start.bearing),
          className: "",
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        }),
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      currentPosRef.current = start.point;
      targetPosRef.current = start.point;
      targetBearingRef.current = start.bearing;
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      cancelGlide();
      glideToRef.current = null;
      map.off("zoomstart", onInteractStart);
      map.off("movestart", onInteractStart);
      map.off("zoomend", onInteractEnd);
      map.off("moveend", onInteractEnd);
      map.remove();
      mapRef.current = null;
      carMarkerRef.current = null;
      glowMarkerRef.current = null;
      boundsRef.current = null;
      lineGeomRef.current = null;
      cumulativeRef.current = null;
      currentPosRef.current = null;
      targetPosRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip.token]);

  useEffect(() => {
    const road = lineGeomRef.current;
    const cumulative = cumulativeRef.current;
    if (!liveState || !road || !cumulative || !glideToRef.current) return;

    const { point, bearing } = pointAlong(road, cumulative, liveState.progress);
    glideToRef.current(point, bearing);
  }, [liveState]);

  const handleRecenter = () => {
    if (mapRef.current && boundsRef.current) {
      mapRef.current.fitBounds(boundsRef.current, { padding: [48, 48], animate: false });
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#f3f2ee] ${className}`}>
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {mapReady && (
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map on route"
          className="absolute bottom-4 right-4 z-[500] flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0b0b0b] shadow-[0_8px_20px_rgba(11,11,11,0.18)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb813]"
        >
          <LocateFixed className="h-5 w-5" />
        </button>
      )}

      {!mapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f3f2ee]">
          <TripSpinner label="Loading map…" />
        </div>
      )}
    </div>
  );
}
