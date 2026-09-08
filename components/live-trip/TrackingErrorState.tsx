import { MapPinOff } from "lucide-react";
import TripStateShell from "./TripStateShell";

/**
 * Shown when the token in the URL doesn't match any known trip — either a
 * mistyped/incomplete link or one that was never valid.
 */
export default function TrackingErrorState() {
  return (
    <TripStateShell
      icon={<MapPinOff className="h-7 w-7" />}
      iconTone="danger"
      title="We couldn't find this trip"
      description="This tracking link looks invalid or incomplete. Double-check the link you were sent, or ask for a new one."
      ctaLabel="Go to Traveling Partner"
    />
  );
}
