import { XCircle } from "lucide-react";
import type { TripShareData } from "@/lib/liveTrip/types";
import TripStateShell from "./TripStateShell";

export default function TripCancelledState({ trip }: { trip: TripShareData }) {
  return (
    <TripStateShell
      icon={<XCircle className="h-7 w-7" />}
      iconTone="danger"
      title="Trip was cancelled"
      description={`The trip to ${trip.destination.label} was cancelled. Live tracking is no longer available for this link.`}
      ctaLabel="Go to Traveling Partner"
    />
  );
}
