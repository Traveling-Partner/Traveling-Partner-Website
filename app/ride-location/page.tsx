import { Suspense } from "react";
import type { Metadata } from "next";
import LiveTripHeader from "@/components/live-trip/LiveTripHeader";
import RideLocationView from "@/components/ride-location/RideLocationView";
import TripLoadingState from "@/components/live-trip/TripLoadingState";

export const metadata: Metadata = {
  title: "Live ride location — Traveling Partner",
  description: "Follow a live Traveling Partner ride in real time. No login required.",
  robots: { index: false, follow: false },
};

function RideLocationFallback() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LiveTripHeader showLiveBadge={false} />
      <TripLoadingState />
    </div>
  );
}

/**
 * Public family share page. Backend links are /ride-location/{token}.
 * Static export cannot emit a file per token, so unknown paths hit 404.html
 * which immediately replaces to /ride-location?shareToken=… (see app/not-found.tsx).
 * The view also reads the token from the path, so a hosting rewrite to this
 * page keeps the pretty URL.
 */
export default function RideLocationPage() {
  return (
    <Suspense fallback={<RideLocationFallback />}>
      <RideLocationView />
    </Suspense>
  );
}
