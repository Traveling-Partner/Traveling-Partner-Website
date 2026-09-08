"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { LocateFixed } from "lucide-react";
import type { LiveVehicleState, TripShareData } from "@/lib/liveTrip/types";
import TripSpinner from "./TripSpinner";

/**
 * Full interactive Google Map (Maps JavaScript API) — only mounted when
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is configured. Tiles are restyled to the
 * site's cream/amber palette and a live vehicle marker moves along the
 * route. Any load/auth failure calls onFail so the parent can fall back to
 * the keyless Google Maps embed instead of showing a broken map.
 */

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const LOAD_TIMEOUT_MS = 12_000;

/** Brand-matched tile styling: cream land, white roads, amber highways. */
const MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f7f6f1" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6f6e68" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#dcd9cf" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#f0eee6" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e8e6de" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#fde9a8" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#fdb813" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#d9e3e6" }] },
];

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

function pinIconUrl(color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30">` +
    `<line x1="11" y1="16" x2="11" y2="28" stroke="${color}" stroke-width="2" stroke-opacity="0.5"/>` +
    `<circle cx="11" cy="10" r="8" fill="${color}" stroke="white" stroke-width="3"/>` +
    `</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function vehicleSymbol(bearingDeg: number): google.maps.Symbol {
  return {
    path: "M 0,-9 L 7,7 L 0,3.5 L -7,7 Z",
    fillColor: "#0b0b0b",
    fillOpacity: 1,
    strokeColor: "#fce001",
    strokeWeight: 3,
    scale: 1.6,
    rotation: bearingDeg,
  };
}

interface LiveTripMapGoogleProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
  className?: string;
  onFail: () => void;
}

export default function LiveTripMapGoogle({
  trip,
  liveState,
  className = "",
  onFail,
}: LiveTripMapGoogleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const boundsRef = useRef<google.maps.LatLngBounds | null>(null);
  const vehicleMarkerRef = useRef<google.maps.Marker | null>(null);
  const glowCircleRef = useRef<google.maps.Circle | null>(null);
  const glowRafRef = useRef<number | null>(null);
  const hasLoadedRef = useRef(false);
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    hasLoadedRef.current = false;
    setMapReady(false);

    let cancelled = false;
    const fail = (why: string) => {
      if (cancelled) return;
      console.error(`[LiveTripMapGoogle] ${why} — falling back to Google Maps embed.`);
      onFailRef.current();
    };

    const timeoutId = window.setTimeout(() => {
      if (!hasLoadedRef.current) {
        fail(`map did not load within ${LOAD_TIMEOUT_MS}ms (network/firewall/ad-blocker?)`);
      }
    }, LOAD_TIMEOUT_MS);

    window.gm_authFailure = () => {
      window.clearTimeout(timeoutId);
      fail("authentication failed (check the API key, billing, and referrer restrictions)");
    };

    setOptions({ key: API_KEY, v: "weekly" });

    (async () => {
      try {
        const [mapsLib, coreLib, markerLib] = await Promise.all([
          importLibrary("maps"),
          importLibrary("core"),
          importLibrary("marker"),
        ]);
        if (cancelled || !containerRef.current) return;

        const { Map, Polyline, Circle } = mapsLib;
        const { LatLngBounds, event } = coreLib;
        const { Marker } = markerLib;

        const map = new Map(containerRef.current, {
          center: { lat: trip.pickup.lat, lng: trip.pickup.lng },
          zoom: 10,
          styles: MAP_STYLE,
          disableDefaultUI: true,
          clickableIcons: false,
          gestureHandling: "greedy",
        });
        mapRef.current = map;

        const path = trip.route.map((p) => ({ lat: p.lat, lng: p.lng }));
        new Polyline({
          map,
          path,
          strokeColor: "#0b0b0b",
          strokeOpacity: 0.12,
          strokeWeight: 7,
        });
        new Polyline({ map, path, strokeColor: "#fdb813", strokeOpacity: 1, strokeWeight: 4 });

        new Marker({
          map,
          position: { lat: trip.pickup.lat, lng: trip.pickup.lng },
          icon: { url: pinIconUrl("#16a34a") },
          title: trip.pickup.label,
        });
        new Marker({
          map,
          position: { lat: trip.destination.lat, lng: trip.destination.lng },
          icon: { url: pinIconUrl("#0b0b0b") },
          title: trip.destination.label,
        });

        const vehicleStart = liveState
          ? { lat: liveState.position.lat, lng: liveState.position.lng }
          : { lat: trip.pickup.lat, lng: trip.pickup.lng };

        // Radii are in meters; the demo route spans ~250 km, so the pulse
        // needs km scale to stay visible at the fitted zoom level.
        const glowCircle = new Circle({
          map,
          center: vehicleStart,
          radius: 1500,
          fillColor: "#fdb813",
          fillOpacity: 0.25,
          strokeOpacity: 0,
        });
        glowCircleRef.current = glowCircle;

        vehicleMarkerRef.current = new Marker({
          map,
          position: vehicleStart,
          icon: vehicleSymbol(liveState?.bearingDeg ?? 0),
          zIndex: 10,
        });

        const animateGlow = (now: number) => {
          const t = (now % 2000) / 2000;
          glowCircle.setRadius(1200 + t * 2600);
          glowCircle.setOptions({ fillOpacity: 0.28 * (1 - t) });
          glowRafRef.current = window.requestAnimationFrame(animateGlow);
        };
        glowRafRef.current = window.requestAnimationFrame(animateGlow);

        const bounds = trip.route.reduce(
          (acc, p) => acc.extend({ lat: p.lat, lng: p.lng }),
          new LatLngBounds({ lat: trip.pickup.lat, lng: trip.pickup.lng })
        );
        boundsRef.current = bounds;
        map.fitBounds(bounds, 64);

        event.addListenerOnce(map, "idle", () => {
          if (cancelled) return;
          hasLoadedRef.current = true;
          window.clearTimeout(timeoutId);
          setMapReady(true);
        });
      } catch (err) {
        window.clearTimeout(timeoutId);
        fail(`failed to load the Maps JavaScript API: ${String(err)}`);
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      delete window.gm_authFailure;
      if (glowRafRef.current !== null) window.cancelAnimationFrame(glowRafRef.current);
      glowCircleRef.current?.setMap(null);
      vehicleMarkerRef.current?.setMap(null);
      mapRef.current = null;
      vehicleMarkerRef.current = null;
      glowCircleRef.current = null;
      boundsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip.token]);

  // Follow live position updates without re-initializing the map.
  useEffect(() => {
    if (!liveState || !vehicleMarkerRef.current) return;
    const pos = { lat: liveState.position.lat, lng: liveState.position.lng };
    vehicleMarkerRef.current.setPosition(pos);
    vehicleMarkerRef.current.setIcon(vehicleSymbol(liveState.bearingDeg));
    glowCircleRef.current?.setCenter(pos);
  }, [liveState]);

  const handleRecenter = () => {
    if (mapRef.current && boundsRef.current) {
      mapRef.current.fitBounds(boundsRef.current, 64);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-[#f3f2ee] ${className}`}>
      <div ref={containerRef} className="absolute inset-0" />

      {mapReady && (
        <button
          type="button"
          onClick={handleRecenter}
          aria-label="Recenter map on route"
          className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0b0b0b] shadow-[0_8px_20px_rgba(11,11,11,0.18)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb813]"
        >
          <LocateFixed className="h-5 w-5" />
        </button>
      )}

      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f3f2ee]">
          <TripSpinner label="Loading map…" />
        </div>
      )}
    </div>
  );
}
