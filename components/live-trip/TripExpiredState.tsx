import { TimerOff } from "lucide-react";
import TripStateShell from "./TripStateShell";

export default function TripExpiredState() {
  return (
    <TripStateShell
      icon={<TimerOff className="h-7 w-7" />}
      iconTone="brand"
      title="This link has expired"
      description="For your safety and privacy, live trip links stop working a while after the trip ends. Ask your driver or the rider to share a fresh link if the trip is still active."
      ctaLabel="Go to Traveling Partner"
    />
  );
}
