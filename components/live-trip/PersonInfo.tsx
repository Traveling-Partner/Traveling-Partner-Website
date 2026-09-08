import Image from "next/image";
import { BadgeCheck, Star } from "lucide-react";

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
  avatarUrl?: string;
  /** Shown as a star rating when present (drivers); omit for passengers. */
  rating?: number;
  /** Extra label shown in the meta line, e.g. "Passenger". */
  subtitle?: string;
  verified?: boolean;
  totalTrips?: number;
  memberSince?: string;
}

/**
 * Shared profile row for driver and passenger. The photo is the anchor —
 * a worried contact verifies a face faster than a name — with rating,
 * trip count and membership giving the trust signals below it.
 */
export default function PersonInfo({
  name,
  avatarUrl,
  rating,
  subtitle,
  verified,
  totalTrips,
  memberSince,
}: PersonInfoProps) {
  const meta: string[] = [];
  if (subtitle) meta.push(subtitle);
  if (totalTrips !== undefined) meta.push(`${totalTrips.toLocaleString()} trips`);
  if (memberSince) meta.push(`Member since ${memberSince}`);

  return (
    <div className="flex items-center gap-3">
      {avatarUrl ? (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#fdb813]/60 ring-offset-2 ring-offset-white">
          <Image
            src={avatarUrl}
            alt={`Photo of ${name}`}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-sm font-bold text-[#fce001]">
          {initials(name)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[15px] font-semibold text-[#0b0b0b]">{name}</p>
          {verified && (
            <span
              className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[#e8f6ee] px-1.5 py-0.5 text-[10px] font-bold text-[#1a7f4b]"
              title="Identity verified"
            >
              <BadgeCheck className="h-3 w-3" />
              Verified
            </span>
          )}
        </div>

        <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs font-medium text-[#6f6e68]">
          {rating !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-[#fdb813] text-[#fdb813]" />
              {rating.toFixed(1)}
            </span>
          )}
          {meta.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              {(rating !== undefined || i > 0) && (
                <span className="text-[#d4d0c6]">·</span>
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
