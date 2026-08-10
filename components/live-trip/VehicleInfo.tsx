import { Car } from "lucide-react";
import type { VehicleInfo as VehicleInfoType } from "@/lib/liveTrip/types";

/**
 * The plate is rendered like a real number plate (bordered, monospace,
 * high-contrast) so it reads instantly at a glance — this is the one
 * detail a worried contact actually needs to physically verify the right
 * car has arrived.
 */
export default function VehicleInfo({ vehicle }: { vehicle: VehicleInfoType }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#f7f6f1] px-3.5 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Car className="h-[18px] w-[18px] text-[#0b0b0b]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#0b0b0b]">
          {vehicle.color ? `${vehicle.color} ` : ""}
          {vehicle.make} {vehicle.model}
        </p>
        <p className="text-[11px] font-medium text-[#6f6e68]">Confirm this plate matches</p>
      </div>
      <span
        className="shrink-0 rounded-[4px] border-2 border-[#0b0b0b] bg-white px-2.5 py-1 text-center font-mono text-sm font-extrabold tracking-[0.06em] text-[#0b0b0b] shadow-[0_1px_0_rgba(11,11,11,0.12)]"
        aria-label={`License plate ${vehicle.plateNumber}`}
      >
        {vehicle.plateNumber}
      </span>
    </div>
  );
}
