"use client";

import type { ReactNode } from "react";
import { Phone, Share2, ShieldAlert } from "lucide-react";

/**
 * Contact and SOS both call the real, existing Traveling Partner support
 * line (+92 325 2801261 — already used in ContactFormSection.tsx). There is
 * no dedicated emergency-dispatch API in this project, so SOS intentionally
 * routes to the same real support number rather than faking an emergency
 * pipeline.
 *
 * Symmetric three-button row, center action raised and in the brand
 * gradient — reads as "one of these is different" through color and scale
 * alone, the same way a camera shutter button stands out from the controls
 * beside it.
 */
const SUPPORT_TEL = "tel:+923252801261";

function ActionButton({
  href,
  onClick,
  label,
  danger,
  children,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  danger?: boolean;
  children: ReactNode;
}) {
  const sizeClass = danger ? "h-[68px] w-[68px]" : "h-14 w-14";
  const styleClass = danger
    ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] text-[#dc2626] shadow-[0_14px_30px_rgba(253,184,19,0.45)]"
    : "border border-[#eceae4] bg-white text-[#0b0b0b] shadow-[0_6px_16px_rgba(11,11,11,0.08)]";

  const content = (
    <>
      {danger && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fdb813]/50" />
      )}
      <span className="relative">{children}</span>
    </>
  );

  const buttonClass = `relative flex ${sizeClass} items-center justify-center rounded-full ${styleClass} transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb813] focus-visible:ring-offset-2`;

  return (
    <div className="flex flex-col items-center gap-1.5">
      {href ? (
        <a href={href} aria-label={label} className={buttonClass}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={onClick} aria-label={label} className={buttonClass}>
          {content}
        </button>
      )}
      <span className={`text-[11px] font-semibold ${danger ? "text-[#b3820e]" : "text-[#6f6e68]"}`}>
        {label}
      </span>
    </div>
  );
}

export default function TripActionButtons({ onShare }: { onShare: () => void }) {
  return (
    <div className="flex items-start justify-center gap-6 py-1">
      <ActionButton href={SUPPORT_TEL} label="Call">
        <Phone className="h-5 w-5" />
      </ActionButton>

      <ActionButton href={SUPPORT_TEL} label="Emergency SOS" danger>
        <ShieldAlert className="h-6 w-6" />
      </ActionButton>

      <ActionButton onClick={onShare} label="Share">
        <Share2 className="h-5 w-5" />
      </ActionButton>
    </div>
  );
}
