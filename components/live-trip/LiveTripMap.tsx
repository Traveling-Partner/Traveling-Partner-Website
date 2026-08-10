"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { LiveVehicleState, TripShareData } from "@/lib/liveTrip/types";
import TripSpinner from "./TripSpinner";

/**
 * Map dispatcher for the live tracking page:
 *
 * - With NEXT_PUBLIC_GOOGLE_MAPS_API_KEY set → full Maps JavaScript API
 *   experience (brand-styled tiles + live moving vehicle marker), see
 *   LiveTripMapGoogle.tsx.
 * - Without a key (or if the interactive map fails to load/authenticate)
 *   → real Google Maps via the keyless embed endpoint, tinted toward the
 *   site's yellow/amber gradient with a blend overlay. The page always
 *   shows a real map either way.
 */

const HAS_MAPS_KEY = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

const LiveTripMapGoogle = dynamic(() => import("./LiveTripMapGoogle"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f3f2ee]">
      <TripSpinner label="Loading map…" />
    </div>
  ),
});

interface LiveTripMapProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
  className?: string;
}

export default function LiveTripMap({ trip, liveState, className = "" }: LiveTripMapProps) {
  const [interactiveFailed, setInteractiveFailed] = useState(false);

  if (HAS_MAPS_KEY && !interactiveFailed) {
    return (
      <LiveTripMapGoogle
        trip={trip}
        liveState={liveState}
        className={className}
        onFail={() => setInteractiveFailed(true)}
      />
    );
  }

  return <LiveTripMapEmbed trip={trip} className={className} />;
}

function LiveTripMapEmbed({ trip, className = "" }: { trip: TripShareData; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  const src =
    `https://www.google.com/maps` +
    `?saddr=${trip.pickup.lat},${trip.pickup.lng}` +
    `&daddr=${trip.destination.lat},${trip.destination.lng}` +
    `&hl=en&output=embed`;

  return (
    <div className={`relative overflow-hidden bg-[#f3f2ee] ${className}`}>
      <iframe
        title={`Route map: ${trip.pickup.label} to ${trip.destination.label}`}
        src={src}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />

      {/* Subtle inner edge so the map sits into the layout instead of ending abruptly */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(11,11,11,0.06),inset_0_-24px_32px_-28px_rgba(11,11,11,0.25)]" />

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f3f2ee]">
          <TripSpinner label="Loading map…" />
        </div>
      )}
    </div>
  );
}
