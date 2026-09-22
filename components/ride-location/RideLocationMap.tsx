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
const GLIDE_MS = 1200;
const ROUTE_BLUE = "#1a73e8";

type GeoPoint = { lat: number; lng: number };

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
  return `<div style="width:44px;height:44px;border-radius:9999px;background:rgba(253,184,19,0.28);box-shadow:0 0 0 8px rgba(253,184,19,0.12);"></div>`;
}

function bearingBetween(a: GeoPoint, b: GeoPoint): number {
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(la2);
  const x = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
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
  waitingLabel: string;
  className?: string;
}

export default function RideLocationMap({
  data,
  frozen = false,
  waitingLabel,
  className = "",
}: RideLocationMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const boundsRef = useRef<L.LatLngBounds | null>(null);
  const carMarkerRef = useRef<L.Marker | null>(null);
  const glowMarkerRef = useRef<L.Marker | null>(null);
  const interactingRef = useRef(false);
  const currentPosRef = useRef<GeoPoint | null>(null);
  const lastPosRef = useRef<GeoPoint | null>(null);
  const animRafRef = useRef<number | null>(null);
  const frozenRef = useRef(frozen);
  frozenRef.current = frozen;

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

    const map = L.map(container, {
      zoomControl: false,
      attributionControl: true,
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
      if (!sawTile && !cancelled) setMapReady(true);
    }, LOAD_TIMEOUT_MS);

    const seed = pickup ?? dropoff ?? live ?? { lat: 31.52, lng: 74.35 };
    map.setView([seed.lat, seed.lng], pickup && dropoff ? 13 : 15);

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
      map.fitBounds(rough, { padding: [48, 48], animate: false });
      boundsRef.current = rough;

      void (async () => {
        const road = await fetchRoadRoute(pickup, dropoff);
        if (cancelled || !road) return;
        const latLngs = road.map((p) => [p.lat, p.lng] as [number, number]);
        L.polyline(latLngs, { color: "#ffffff", weight: 9, opacity: 0.9 }).addTo(map);
        L.polyline(latLngs, { color: ROUTE_BLUE, weight: 5, opacity: 0.95 }).addTo(map);
        const bounds = L.latLngBounds(latLngs);
        boundsRef.current = bounds;
        if (!interactingRef.current) {
          map.fitBounds(bounds, { padding: [48, 48], animate: false });
        }
      })();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      cancelGlide();
      map.off("zoomstart", onInteractStart);
      map.off("movestart", onInteractStart);
      map.off("zoomend", onInteractEnd);
      map.off("moveend", onInteractEnd);
      map.remove();
      mapRef.current = null;
      carMarkerRef.current = null;
      glowMarkerRef.current = null;
      boundsRef.current = null;
      currentPosRef.current = null;
    };
    // Re-init only when the trip endpoints change, not on every GPS ping.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutKey]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !live) return;

    const heading =
      isFiniteCoord(data.heading)
        ? data.heading
        : lastPosRef.current
          ? bearingBetween(lastPosRef.current, live)
          : 0;

    const place = (point: GeoPoint, bearing: number) => {
      carMarkerRef.current?.setLatLng([point.lat, point.lng]);
      glowMarkerRef.current?.setLatLng([point.lat, point.lng]);
      setCarBearing(carMarkerRef.current, bearing);
      currentPosRef.current = point;
    };

    if (!carMarkerRef.current) {
      glowMarkerRef.current = L.marker([live.lat, live.lng], {
        icon: L.divIcon({
          html: glowIconHtml(),
          className: "",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        }),
        interactive: false,
        zIndexOffset: 500,
      }).addTo(map);

      carMarkerRef.current = L.marker([live.lat, live.lng], {
        icon: L.divIcon({
          html: carIconHtml(heading),
          className: "",
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        }),
        interactive: false,
        zIndexOffset: 1000,
      }).addTo(map);

      currentPosRef.current = live;
      lastPosRef.current = live;
      if (!pickup && !dropoff) {
        map.setView([live.lat, live.lng], 15, { animate: false });
      }
      return;
    }

    if (frozenRef.current || interactingRef.current) {
      lastPosRef.current = live;
      return;
    }

    const from = currentPosRef.current ?? live;
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
      const t = Math.min(1, (now - startedAt) / GLIDE_MS);
      const mid = {
        lat: from.lat + (live.lat - from.lat) * t,
        lng: from.lng + (live.lng - from.lng) * t,
      };
      place(mid, heading);
      if (t < 1) {
        animRafRef.current = window.requestAnimationFrame(tick);
      } else {
        animRafRef.current = null;
        lastPosRef.current = live;
      }
    };
    animRafRef.current = window.requestAnimationFrame(tick);
  }, [live?.lat, live?.lng, data.heading, pickup, dropoff]);

  const handleRecenter = () => {
    const map = mapRef.current;
    if (!map) return;
    if (boundsRef.current) {
      map.fitBounds(boundsRef.current, { padding: [48, 48], animate: false });
      return;
    }
    const point = live ?? pickup ?? dropoff;
    if (point) map.setView([point.lat, point.lng], 15, { animate: false });
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
