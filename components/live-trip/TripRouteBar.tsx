import { ArrowRight } from "lucide-react";
import type { NamedPoint } from "@/lib/liveTrip/types";

/**
 * Horizontal route summary that sits ABOVE the map (not overlaid on it):
 * pickup → destination at a glance before the map is even read.
 */
export default function TripRouteBar({
  pickup,
  destination,
}: {
  pickup: NamedPoint;
  destination: NamedPoint;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#eceae4] bg-white px-4 py-3 sm:px-5 lg:px-6">
      <span className="hidden shrink-0 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68] sm:inline">
        Route
      </span>
      <span className="hidden h-4 w-px shrink-0 bg-[#eceae4] sm:inline-block" />

      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[#16a34a] bg-white" />
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#9b9a93]">
              From
            </p>
            <p className="truncate text-[13px] font-semibold leading-tight text-[#0b0b0b]">
              {pickup.label}
            </p>
          </div>
        </div>

        <div className="flex min-w-[24px] flex-1 items-center gap-1 px-1">
          <span className="h-px min-w-0 flex-1 border-t-2 border-dotted border-[#d8d5c9]" />
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#9b9a93]" />
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-full border-[3px] border-[#0b0b0b] bg-white" />
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#9b9a93]">
              To
            </p>
            <p className="truncate text-[13px] font-semibold leading-tight text-[#0b0b0b]">
              {destination.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
