import { CheckCircle2 } from "lucide-react";
import type { ShareRole, TripShareData } from "@/lib/liveTrip/types";
import TripStateShell from "./TripStateShell";

export default function TripCompletedState({
  trip,
  viewAs = "passenger",
}: {
  trip: TripShareData;
  viewAs?: ShareRole;
}) {
  const trackedName = viewAs === "driver" ? trip.driver.name : trip.passenger.name;
  return (
    <TripStateShell
      icon={<CheckCircle2 className="h-7 w-7" />}
      iconTone="success"
      title="Trip completed"
      description={`${trackedName} safely arrived at ${trip.destination.label}. This live tracking link is no longer active.`}
      ctaLabel="Go to Traveling Partner"
    >
      <div className="flex items-center justify-center gap-2 rounded-xl bg-[#f7f6f1] px-4 py-3 text-xs font-medium text-[#6f6e68]">
        <span className="truncate">{trip.pickup.label}</span>
        <span className="text-[#0b0b0b]">→</span>
        <span className="truncate">{trip.destination.label}</span>
      </div>
    </TripStateShell>
  );
}
