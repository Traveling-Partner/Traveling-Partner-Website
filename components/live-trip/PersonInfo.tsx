import { Star } from "lucide-react";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

interface PersonInfoProps {
  name: string;
  /** Shown as a star rating when present (drivers); omit for passengers. */
  rating?: number;
  /** Shown instead of a rating when there is no rating to display. */
  subtitle?: string;
}

/** Shared avatar + name row used for both driver and passenger display. */
export default function PersonInfo({ name, rating, subtitle }: PersonInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-sm font-bold text-[#fce001]">
        {initials(name)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-[#0b0b0b]">{name}</p>
        {rating !== undefined ? (
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#fdb813] text-[#fdb813]" />
            <span className="text-xs font-medium text-[#6f6e68]">{rating.toFixed(1)}</span>
          </div>
        ) : subtitle ? (
          <span className="text-xs font-medium text-[#6f6e68]">{subtitle}</span>
        ) : null}
      </div>
    </div>
  );
}
