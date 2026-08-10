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
 * a live car marker that glides along the blue line — the moving-vehicle
 * experience the Google embed can't provide (its iframe is sealed).
 *
 * Failure ladder: OSRM down → fall back to the trip's demo route geometry;
 * tiles unreachable → onFail → parent falls back to the Google embed.
 */

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const LOAD_TIMEOUT_MS = 12_000;
/** Matches the simulation tick so the car glides between updates. */
const GLIDE_MS = 2800;

/** Google-directions blue, so the route reads instantly as "the route". */
const ROUTE_BLUE = "#1a73e8";

function pinIconHtml(color: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">` +
    `<line x1="11" y1="16" x2="11" y2="28" stroke="${color}" stroke-width="2" stroke-opacity="0.5"/>` +
    `<circle cx="11" cy="10" r="8" fill="${color}" stroke="white" stroke-width="3"/>` +
    `</svg>`
  );
}

/** Top-view car in brand colors, rotated toward the bearing. */
function carIconHtml(bearingDeg: number): string {
  return (
    `<div style="transform: rotate(${bearingDeg}deg); transition: transform ${GLIDE_MS}ms linear; width:38px; height:38px; display:flex; align-items:center; justify-content:center;">` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="34" viewBox="0 0 20 34" style="filter: drop-shadow(0 2px 4px rgba(11,11,11,0.4));">` +
    `<rect x="1.5" y="2" width="17" height="30" rx="6.5" fill="#0b0b0b" stroke="#fce001" stroke-width="2"/>` +
    `<rect x="4.5" y="7" width="11" height="6" rx="2" fill="#fce001"/>` +
    `<rect x="4.5" y="21" width="11" height="5" rx="2" fill="#fdb813" opacity="0.85"/>` +
    `</svg>` +
    `</div>`
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

/**
 * Interpolates a position + heading at `progress` (0..1) along a polyline,
 * measured by real distance — this keeps the car ON the drawn road line
 * even though the simulation's own demo route is a different curve.
 */
function pointAlong(line: GeoPoint[], cumulative: number[], progress: number) {
  const total = cumulative[cumulative.length - 1];
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
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setMapReady(false);

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
    });
    mapRef.current = map;

    const tiles = L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    // If no tiles arrive in time, the host is unreachable → embed fallback.
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

    // Temporary view while the road route resolves.
    const roughBounds = L.latLngBounds([
      [trip.pickup.lat, trip.pickup.lng],
      [trip.destination.lat, trip.destination.lng],
    ]);
    map.fitBounds(roughBounds, { padding: [48, 48] });

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
      // Casing under the blue line so it reads over any tile background.
      L.polyline(latLngs, { color: "#ffffff", weight: 9, opacity: 0.9 }).addTo(map);
      L.polyline(latLngs, { color: ROUTE_BLUE, weight: 5, opacity: 0.95 }).addTo(map);

      const bounds = L.latLngBounds(latLngs);
      boundsRef.current = bounds;
      map.fitBounds(bounds, { padding: [48, 48] });

      const start = pointAlong(road, cumulativeRef.current, liveState?.progress ?? 0);

      glowMarkerRef.current = L.marker([start.point.lat, start.point.lng], {
        icon: L.divIcon({
          html:
            `<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fdb813]/60"></span>` +
            `<span class="absolute inline-flex h-full w-full rounded-full bg-[#fdb813]/25"></span>`,
          className: "relative",
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

      // Let the car glide between simulation ticks instead of jumping.
      [carMarkerRef.current, glowMarkerRef.current].forEach((m) => {
        const el = m.getElement();
        if (el) el.style.transition = `transform ${GLIDE_MS}ms linear`;
      });
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      map.remove();
      mapRef.current = null;
      carMarkerRef.current = null;
      glowMarkerRef.current = null;
      boundsRef.current = null;
      lineGeomRef.current = null;
      cumulativeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip.token]);

  // Live updates: move the car along the DISPLAYED road line by progress,
  // so it never drifts off the blue route.
  useEffect(() => {
    const road = lineGeomRef.current;
    const cumulative = cumulativeRef.current;
    const car = carMarkerRef.current;
    if (!liveState || !road || !cumulative || !car) return;

    const { point, bearing } = pointAlong(road, cumulative, liveState.progress);
    car.setLatLng([point.lat, point.lng]);
    glowMarkerRef.current?.setLatLng([point.lat, point.lng]);

    const inner = car.getElement()?.firstElementChild as HTMLElement | null;
    if (inner) inner.style.transform = `rotate(${bearing}deg)`;
  }, [liveState]);

  const handleRecenter = () => {
    if (mapRef.current && boundsRef.current) {
      mapRef.current.fitBounds(boundsRef.current, { padding: [48, 48] });
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
