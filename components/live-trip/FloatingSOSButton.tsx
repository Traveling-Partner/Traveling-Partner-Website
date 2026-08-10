"use client";

import { ShieldAlert } from "lucide-react";

const SUPPORT_TEL = "tel:+923252801261";

/**
 * Always-visible safety affordance, independent of the info sheet's
 * peek/expanded drag state — an emergency action must never require a
 * gesture to discover.
 */
export default function FloatingSOSButton() {
  return (
    <a
      href={SUPPORT_TEL}
      aria-label="Emergency support call"
      className="absolute left-4 top-4 z-10 flex h-11 items-center gap-1.5 rounded-full bg-gradient-to-br from-[#fce001] to-[#fdb813] px-3.5 text-[#0b0b0b] shadow-[0_8px_20px_rgba(253,184,19,0.4)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b0b0b]"
    >
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#dc2626]/25" />
        <ShieldAlert className="relative h-[18px] w-[18px] text-[#dc2626]" />
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.04em]">SOS</span>
    </a>
  );
}
