import { Suspense } from "react";
import type { Metadata } from "next";
import LiveTripHeader from "@/components/live-trip/LiveTripHeader";
import LiveTripTrackView from "@/components/live-trip/LiveTripTrackView";
import TripLoadingState from "@/components/live-trip/TripLoadingState";

export const metadata: Metadata = {
  title: "Live Trip Tracking — Traveling Partner",
  description: "Follow a live Traveling Partner trip in real time, safely and privately.",
  robots: { index: false, follow: false },
};

function TrackPageFallback() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LiveTripHeader showLiveBadge={false} />
      <TripLoadingState />
    </div>
  );
}

/**
 * Static page (output: export) — the token is read client-side via
 * useSearchParams() inside LiveTripTrackView, following the same
 * query-param pattern already used by /blog/detail?id=.
 */
export default function TripTrackPage() {
  return (
    <Suspense fallback={<TrackPageFallback />}>
      <LiveTripTrackView />
    </Suspense>
  );
}
