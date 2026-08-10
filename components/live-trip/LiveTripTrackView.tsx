"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getMockTrip, isTripLinkExpired } from "@/lib/liveTrip/mockTripData";
import { useSimulatedLiveTrip } from "@/hooks/useSimulatedLiveTrip";
import type { ShareRole, TrackingViewState, TripShareData } from "@/lib/liveTrip/types";
import LiveTripHeader from "./LiveTripHeader";
import LiveTripMap from "./LiveTripMap";
import TripInfoPanel from "./TripInfoPanel";
import TripJourneyBar from "./TripJourneyBar";
import FloatingSOSButton from "./FloatingSOSButton";
import TripLoadingState from "./TripLoadingState";
import TrackingErrorState from "./TrackingErrorState";
import TripExpiredState from "./TripExpiredState";
import TripCancelledState from "./TripCancelledState";
import TripCompletedState from "./TripCompletedState";
import ShareTripModal from "./ShareTripModal";

/** Small, deliberate delay so the loading state is genuine, not a flash. */
const RESOLVE_DELAY_MS = 500;

export default function LiveTripTrackView() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") ?? null;
  const requestedRole = searchParams?.get("as") ?? null;
  const viewAs: ShareRole = requestedRole === "driver" ? "driver" : "passenger";

  const [resolved, setResolved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setResolved(false);
    const timer = setTimeout(() => setResolved(true), RESOLVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [token]);

  const trip = useMemo<TripShareData | null>(() => getMockTrip(token), [token]);
  const liveState = useSimulatedLiveTrip(trip);

  const viewState: TrackingViewState = useMemo(() => {
    if (!resolved) return "loading";
    if (!trip) return "invalid";
    if (isTripLinkExpired(trip)) return "expired";
    if (trip.status === "cancelled") return "cancelled";
    if (trip.status === "completed") return "completed";
    return "active";
  }, [resolved, trip]);

  if (viewState === "loading") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripLoadingState />
      </div>
    );
  }

  if (viewState === "invalid" || !trip) {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TrackingErrorState />
      </div>
    );
  }

  if (viewState === "expired") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripExpiredState />
      </div>
    );
  }

  if (viewState === "cancelled") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripCancelledState trip={trip} />
      </div>
    );
  }

  if (viewState === "completed") {
    return (
      <div className="flex min-h-dvh flex-col">
        <LiveTripHeader showLiveBadge={false} />
        <TripCompletedState trip={trip} viewAs={viewAs} />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh w-full flex-col lg:h-dvh lg:overflow-hidden">
      <LiveTripHeader connection={liveState?.connection} lastUpdatedAt={liveState?.lastUpdatedAt} />

      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        {/* Map column: a more restrained map with the journey strip below it
            (CTO feedback: the map alone dominating the screen was too much). */}
        <div className="flex flex-col lg:min-w-0 lg:flex-1">
          <div className="sticky top-14 z-10 h-[34vh] w-full shrink-0 sm:top-16 sm:h-[38vh] lg:relative lg:top-0 lg:h-auto lg:min-h-0 lg:flex-1">
            <LiveTripMap trip={trip} liveState={liveState} className="h-full w-full" />
            <FloatingSOSButton />
          </div>
          <TripJourneyBar trip={trip} liveState={liveState} />
        </div>

        <TripInfoPanel
          trip={trip}
          liveState={liveState}
          viewAs={viewAs}
          onShare={() => setShareOpen(true)}
        />
      </div>

      <ShareTripModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        trip={trip}
        sharedBy={viewAs}
      />
    </div>
  );
}
