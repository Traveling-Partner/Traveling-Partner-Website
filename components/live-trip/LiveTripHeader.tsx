"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { ConnectionState } from "@/lib/liveTrip/types";
import LiveIndicator from "./LiveIndicator";

interface LiveTripHeaderProps {
  connection?: ConnectionState;
  lastUpdatedAt?: number;
  showLiveBadge?: boolean;
}

/**
 * Intentionally minimal — this is a distraction-free header for the public
 * tracking page, not the full marketing navigation. The recipient came to
 * follow a trip, not browse the site.
 */
export default function LiveTripHeader({
  connection,
  lastUpdatedAt,
  showLiveBadge = true,
}: LiveTripHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-black/[0.06] bg-white/95 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
      <Link href="/" className="block h-8 w-[56px] shrink-0 sm:h-9 sm:w-[64px]">
        <Image
          src="/images/traveling-partner-logo.png"
          alt="Traveling Partner"
          width={110}
          height={65}
          className="h-full w-full object-contain object-left"
          priority
        />
      </Link>

      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 text-xs font-semibold text-[#6f6e68] sm:inline-flex">
          <ShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
          Verified live trip
        </span>
        {showLiveBadge && (
          <LiveIndicator connection={connection} lastUpdatedAt={lastUpdatedAt} />
        )}
      </div>
    </header>
  );
}
