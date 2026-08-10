import Image from "next/image";
import { Car } from "lucide-react";
import type { VehicleInfo as VehicleInfoType } from "@/lib/liveTrip/types";

/** Named colors → swatch fills, so "White" also reads visually at a glance. */
const COLOR_SWATCHES: Record<string, string> = {
  white: "#ffffff",
  black: "#0b0b0b",
  silver: "#c9c9c9",
  grey: "#8e8e8e",
  gray: "#8e8e8e",
  red: "#d63b2f",
  blue: "#2b5fd9",
  green: "#2f9e5f",
  yellow: "#fce001",
  gold: "#fdb813",
  brown: "#8a5a34",
  beige: "#e2d6bd",
};

/**
 * The physical-verification card: car photo, color, model, year and a
 * plate rendered like a real number plate — everything a contact needs to
 * confirm the right car at the curb.
 */
export default function VehicleInfo({ vehicle }: { vehicle: VehicleInfoType }) {
  const swatch = vehicle.color
    ? COLOR_SWATCHES[vehicle.color.toLowerCase()] ?? "#d9d5ca"
    : null;

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-[#f7f6f1] p-3.5">
      <div className="flex items-center gap-3.5">
        <div className="relative h-[60px] w-[92px] shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
          {vehicle.imageUrl ? (
            <Image
              src={vehicle.imageUrl}
              alt={`${vehicle.color ?? ""} ${vehicle.make} ${vehicle.model}`.trim()}
              fill
              sizes="92px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <Car className="h-6 w-6 text-[#0b0b0b]" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#0b0b0b]">
            {vehicle.make} {vehicle.model}
            {vehicle.year ? (
              <span className="font-semibold text-[#6f6e68]"> · {vehicle.year}</span>
            ) : null}
          </p>
          {vehicle.color && (
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#6f6e68]">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full border border-[#d4d0c6]"
                style={swatch ? { backgroundColor: swatch } : undefined}
                aria-hidden="true"
              />
              {vehicle.color}
            </p>
          )}
        </div>

        <span
          className="shrink-0 rounded-[4px] border-2 border-[#0b0b0b] bg-white px-2.5 py-1 text-center font-mono text-sm font-extrabold tracking-[0.06em] text-[#0b0b0b] shadow-[0_1px_0_rgba(11,11,11,0.12)]"
          aria-label={`License plate ${vehicle.plateNumber}`}
        >
          {vehicle.plateNumber}
        </span>
      </div>

      <p className="text-[11px] font-medium text-[#6f6e68]">
        Confirm the plate and color match before boarding.
      </p>
    </div>
  );
}
