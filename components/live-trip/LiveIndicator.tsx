"use client";

import { useEffect, useState } from "react";
import type { ConnectionState } from "@/lib/liveTrip/types";

interface LiveIndicatorProps {
  connection?: ConnectionState;
  lastUpdatedAt?: number;
  className?: string;
}

function useTicker(intervalMs: number) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
}

function formatAgo(lastUpdatedAt: number): string {
  const seconds = Math.max(0, Math.round((Date.now() - lastUpdatedAt) / 1000));
  if (seconds < 3) return "Updated just now";
  if (seconds < 60) return `Updated ${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  return `Updated ${minutes}m ago`;
}

/**
 * Never claims "LIVE" while the connection is degraded — per spec, a
 * reconnecting/offline state must say so explicitly instead of lying about
 * freshness.
 */
export default function LiveIndicator({
  connection,
  lastUpdatedAt,
  className = "",
}: LiveIndicatorProps) {
  useTicker(1000);

  if (!connection) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-[#6f6e68] ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#a5a39a]" />
        Waiting
      </span>
    );
  }

  if (connection === "reconnecting") {
    return (
      <span
        role="status"
        aria-live="polite"
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#fdb813]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-[#8a5a00] ${className}`}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fdb813]" />
        Reconnecting…
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fce001] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#fce001]" />
        </span>
        Live
      </span>
      {typeof lastUpdatedAt === "number" && (
        <span className="hidden text-[11px] font-medium text-[#6f6e68] sm:inline">
          {formatAgo(lastUpdatedAt)}
        </span>
      )}
    </span>
  );
}
