"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPinOff, TimerOff } from "lucide-react";
import LiveTripHeader from "@/components/live-trip/LiveTripHeader";
import TripLoadingState from "@/components/live-trip/TripLoadingState";
import TripRouteBar from "@/components/live-trip/TripRouteBar";
import TripSpinner from "@/components/live-trip/TripSpinner";
import TripStateShell from "@/components/live-trip/TripStateShell";
import { useRideLocation } from "@/hooks/useRideLocation";
import { firstName, hasLivePosition } from "@/lib/rideLocation/parse";
import {
  getRideShareTokenFromLocation,
  tokenFromSearch,
} from "@/lib/rideLocation/token";
import type { ConnectionState } from "@/lib/liveTrip/types";
import type { RideLocationConnection } from "@/lib/rideLocation/types";
import RideLocationPanel from "./RideLocationPanel";

const RideLocationMap = dynamic(() => import("./RideLocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#f3f2ee]">
      <TripSpinner label="Loading map…" />
    </div>
  ),
});

function toHeaderConnection(connection: RideLocationConnection): ConnectionState | undefined {
  if (connection === "reconnecting") return "reconnecting";
  if (connection === "live" || connection === "polling") return "live";
  return undefined;
}

function waitingLabel(partnerName: string | null): string {
  const name = firstName(partnerName);
  return name ? `Waiting for ${name}'s location` : "Waiting for live location";
}

export default function RideLocationView() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromQuery = tokenFromSearch(searchParams?.toString() ?? "");
    setToken(fromQuery || getRideShareTokenFromLocation());
    setReady(true);
  }, [searchParams]);

  const { pageState, data, connection, closeReason } = useRideLocation(token, ready);

  if (!ready || pageState === "connecting") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripLoadingState label="Connecting…" />
      </div>
    );
  }

  if (pageState === "invalid") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripStateShell
          icon={<MapPinOff className="h-7 w-7" />}
          iconTone="danger"
          title="This link is no longer active"
          description={
            closeReason ||
            "This tracking link is invalid, expired, or sharing was stopped."
          }
          ctaLabel="Go to Traveling Partner"
        />
      </div>
    );
  }

  if (pageState === "expired") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripStateShell
          icon={<TimerOff className="h-7 w-7" />}
          iconTone="brand"
          title="This link is no longer active"
          description={
            closeReason ||
            "This tracking link has expired or sharing was stopped."
          }
          ctaLabel="Go to Traveling Partner"
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripLoadingState label="Connecting…" />
      </div>
    );
  }

  const pickupLabel = data.pickupAddress || "Pickup";
  const dropoffLabel = data.dropoffAddress || "Drop-off";
  const frozen =
    pageState === "ended" || pageState === "completed" || pageState === "cancelled";

  return (
    <div className="flex min-h-dvh w-full flex-col lg:h-dvh lg:overflow-hidden">
      <LiveTripHeader
        connection={toHeaderConnection(connection)}
        lastUpdatedAt={data.lastUpdatedAt ?? undefined}
        showLiveBadge={pageState === "live"}
      />

      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <div className="flex flex-col lg:min-w-0 lg:flex-1">
          {(data.pickupAddress || data.dropoffAddress) && (
            <TripRouteBar
              pickup={{
                lat: data.pickupLatitude ?? 0,
                lng: data.pickupLongitude ?? 0,
                label: pickupLabel,
                address: data.pickupAddress || pickupLabel,
              }}
              destination={{
                lat: data.dropoffLatitude ?? 0,
                lng: data.dropoffLongitude ?? 0,
                label: dropoffLabel,
                address: data.dropoffAddress || dropoffLabel,
              }}
            />
          )}

          <div className="sticky top-14 z-10 h-[30vh] w-full shrink-0 bg-[#f7f6f1] p-2.5 sm:top-16 sm:h-[34vh] sm:p-3 lg:relative lg:top-0 lg:h-auto lg:min-h-0 lg:flex-1 lg:p-5">
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-[#eceae4] shadow-[0_6px_20px_rgba(11,11,11,0.08)]">
              <RideLocationMap
                data={data}
                frozen={frozen}
                waitingLabel={waitingLabel(data.partnerName)}
                className="h-full w-full"
              />
              {frozen && (
                <div className="pointer-events-none absolute inset-x-3 top-3 z-[600] rounded-2xl bg-[#0b0b0b]/90 px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_20px_rgba(11,11,11,0.2)]">
                  {pageState === "cancelled"
                    ? "This ride was cancelled."
                    : pageState === "completed"
                      ? "This ride is complete — live tracking stopped."
                      : "Sharing has ended — live tracking stopped."}
                </div>
              )}
            </div>
          </div>
        </div>

        <RideLocationPanel data={data} pageState={pageState} />
      </div>

      {pageState === "live" && !hasLivePosition(data) ? (
        <span className="sr-only">Waiting for a live location update.</span>
      ) : null}
    </div>
  );
}
