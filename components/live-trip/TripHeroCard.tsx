import Image from "next/image";
import { Star } from "lucide-react";
import type {
  DriverInfo as DriverInfoType,
  PassengerInfo as PassengerInfoType,
  ShareRole,
  TripStatus,
} from "@/lib/liveTrip/types";

const STATUS_META: Record<TripStatus, { label: string; headline: string }> = {
  scheduled: { label: "Scheduled", headline: "Trip starts soon" },
  driver_assigned: { label: "Driver assigned", headline: "On the way to pickup" },
  driver_arriving: { label: "Arriving", headline: "Arriving at pickup now" },
  in_progress: { label: "In progress", headline: "Trip in progress" },
  paused: { label: "Paused", headline: "Trip temporarily paused" },
  completed: { label: "Completed", headline: "Trip completed" },
  cancelled: { label: "Cancelled", headline: "Trip cancelled" },
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

interface TripHeroCardProps {
  status: TripStatus;
  etaMinutes: number;
  arrivalTimeLabel: string;
  distanceKm: number;
  viewAs: ShareRole;
  passenger: PassengerInfoType;
  driver: DriverInfoType;
}

/**
 * The single "at a glance" surface — a dark hero card so the most urgent
 * facts (is this live, what's happening, who am I tracking) read instantly
 * against everything else on the page, instead of competing with it.
 */
export default function TripHeroCard({
  status,
  etaMinutes,
  arrivalTimeLabel,
  distanceKm,
  viewAs,
  passenger,
  driver,
}: TripHeroCardProps) {
  const meta = STATUS_META[status];
  const headline = status === "in_progress" ? `Arriving in ${etaMinutes} min` : meta.headline;
  const isPassengerView = viewAs === "passenger";
  const person = isPassengerView ? passenger : driver;
  const personName = person.name;

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#111110] via-[#0b0b0b] to-[#0b0b0b] px-5 py-5 shadow-[0_20px_45px_rgba(11,11,11,0.3)] sm:px-6 sm:py-6">
      <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#fdb813]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#fce001]/10 blur-3xl" />

      <div className="relative flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fce001] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fce001]" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#fce001]">
          {meta.label}
        </span>
      </div>

      <p className="relative mt-2.5 font-poppins text-2xl font-extrabold leading-tight text-white sm:text-[28px]">
        {headline}
      </p>
      <p className="relative mt-1.5 text-[13px] font-medium text-white/50">
        {arrivalTimeLabel} arrival · {distanceKm} km remaining
      </p>

      <div className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {person.avatarUrl ? (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#fdb813] ring-offset-2 ring-offset-[#0b0b0b]">
            <Image
              src={person.avatarUrl}
              alt={`Photo of ${personName}`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-2 ring-[#fdb813] ring-offset-2 ring-offset-[#0b0b0b]">
            {initials(personName)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
            Tracking
          </p>
          <p className="truncate text-[15px] font-bold text-white">{personName}</p>
        </div>
        {isPassengerView ? (
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
            Passenger
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70">
            <Star className="h-3 w-3 fill-[#fdb813] text-[#fdb813]" />
            {driver.rating.toFixed(1)}
          </span>
        )}
      </div>
    </div>
  );
}
