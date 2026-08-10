import type { NamedPoint } from "@/lib/liveTrip/types";

const EYEBROW_CLASS = "text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]";

export default function TripRoute({
  pickup,
  destination,
}: {
  pickup: NamedPoint;
  destination: NamedPoint;
}) {
  return (
    <div className="rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
      <span className={EYEBROW_CLASS}>Route</span>

      <div className="relative mt-3 flex flex-col gap-5 pl-1">
        <div className="absolute left-[7px] top-[10px] h-[calc(100%-20px)] w-px border-l-2 border-dotted border-[#d8d5c9]" />

        <div className="flex items-start gap-3">
          <span className="relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-[#16a34a] bg-white" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6f6e68]">From</p>
            <p className="truncate text-sm font-semibold text-[#0b0b0b]">{pickup.label}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-[#0b0b0b] bg-white" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6f6e68]">To</p>
            <p className="truncate text-sm font-semibold text-[#0b0b0b]">{destination.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
