import { Car } from "lucide-react";
import type { LiveVehicleState, TripShareData } from "@/lib/liveTrip/types";

interface TripJourneyBarProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9b9a93]">
        {label}
      </p>
      <p className="mt-0.5 truncate font-poppins text-[15px] font-bold text-[#0b0b0b]">
        {value}
      </p>
    </div>
  );
}

/**
 * Desktop-only strip under the map: live route progress (pickup → car →
 * destination) with the headline numbers beside it. On mobile this would
 * duplicate the hero card that already sits right below the map, so it is
 * hidden there.
 */
export default function TripJourneyBar({ trip, liveState }: TripJourneyBarProps) {
  const progress = Math.min(1, Math.max(0, liveState?.progress ?? 0));
  const progressPct = Math.round(progress * 100);
  const etaMinutes = liveState?.etaMinutes ?? trip.etaMinutes;
  const distanceKm = liveState?.distanceRemainingKm ?? trip.distanceKm;

  return (
    <div className="hidden shrink-0 border-t border-[#eceae4] bg-white px-6 py-4 lg:block">
      <div className="flex items-center gap-8">
        {/* Route progress */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="min-w-0 max-w-[180px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9b9a93]">
              From
            </p>
            <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0b0b0b]">
              {trip.pickup.label}
            </p>
          </div>

          <div className="relative h-1.5 min-w-[120px] flex-1 rounded-full bg-[#f0efe9]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#fce001] to-[#fdb813] transition-[width] duration-700 ease-linear"
              style={{ width: `${progressPct}%` }}
            />
            <div
              className="absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b0b0b] shadow-[0_4px_12px_rgba(11,11,11,0.35)] ring-2 ring-white transition-[left] duration-700 ease-linear"
              style={{ left: `calc(${progressPct}% - 16px)` }}
              aria-hidden="true"
            >
              <Car className="h-4 w-4 text-[#fce001]" />
            </div>
          </div>

          <div className="min-w-0 max-w-[180px] text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9b9a93]">
              To
            </p>
            <p className="mt-0.5 truncate text-[13px] font-semibold text-[#0b0b0b]">
              {trip.destination.label}
            </p>
          </div>
        </div>

        <div className="h-10 w-px shrink-0 bg-[#eceae4]" />

        {/* Headline numbers */}
        <div className="flex shrink-0 items-center gap-7">
          <Stat label="ETA" value={`${etaMinutes} min`} />
          <Stat label="Arrival" value={trip.arrivalTimeLabel} />
          <Stat label="Remaining" value={`${distanceKm} km`} />
          <Stat label="Progress" value={`${progressPct}%`} />
        </div>
      </div>
    </div>
  );
}
