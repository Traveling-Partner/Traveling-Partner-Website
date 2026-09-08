"use client";

import { useState, type ReactNode } from "react";
import { Check, MessageSquareText, MoreHorizontal } from "lucide-react";
import { FaLink, FaWhatsapp } from "react-icons/fa6";
import {
  buildTripShareLinks,
  canUseNativeShare,
  copyTripLink,
  shareTripNatively,
} from "@/lib/liveTrip/shareTripLink";
import type { ShareRole } from "@/lib/liveTrip/types";

interface ShareOptionsProps {
  url: string;
  sharedBy?: ShareRole;
}

function ShareIconButton({
  label,
  color,
  onClick,
  href,
  success,
  children,
}: {
  label: string;
  color: string;
  onClick?: () => void;
  href?: string;
  success?: boolean;
  children: ReactNode;
}) {
  const baseClass =
    "group relative flex flex-col items-center gap-2 rounded-2xl px-2 py-1 transition-transform active:scale-95";

  const circleClass = success
    ? "flex h-12 w-12 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_6px_16px_rgba(22,163,74,0.35)]"
    : "flex h-12 w-12 items-center justify-center rounded-full border border-[#eceae4] bg-white shadow-[0_2px_8px_rgba(11,11,11,0.06)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:shadow-[0_8px_20px_rgba(253,184,19,0.4)]";

  const iconWrapStyle = success ? undefined : ({ color } as React.CSSProperties);

  const content = (
    <>
      {!success && (
        <span
          className="absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      )}
      <span className={`relative z-[1] ${circleClass}`}>
        <span
          className={success ? "" : "transition-colors duration-300 group-hover:text-[#0b0b0b]"}
          style={iconWrapStyle}
        >
          {success ? <Check className="h-5 w-5" /> : children}
        </span>
      </span>
      <span className="text-[11px] font-semibold text-[#3d3d38]">{label}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={baseClass}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={baseClass}>
      {content}
    </button>
  );
}

export default function ShareOptions({ url, sharedBy = "passenger" }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false);
  const links = buildTripShareLinks(url, sharedBy);
  const showNativeShare = canUseNativeShare();

  const handleCopy = async () => {
    const ok = await copyTripLink(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    await shareTripNatively(url, sharedBy);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-2 sm:flex sm:justify-between sm:gap-3">
        <ShareIconButton label="WhatsApp" color="#25D366" href={links.whatsapp}>
          <FaWhatsapp className="h-5 w-5" />
        </ShareIconButton>
        <ShareIconButton label="SMS" color="#0b0b0b" href={links.sms}>
          <MessageSquareText className="h-5 w-5" />
        </ShareIconButton>
        <ShareIconButton label="Copy Link" color="#0b0b0b" onClick={handleCopy} success={copied}>
          <FaLink className="h-[18px] w-[18px]" />
        </ShareIconButton>
        {showNativeShare && (
          <ShareIconButton label="More" color="#fdb813" onClick={handleNativeShare}>
            <MoreHorizontal className="h-5 w-5" />
          </ShareIconButton>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-[#eceae4] bg-[#f7f6f1] px-3.5 py-2.5">
        <span className="min-w-0 flex-1 truncate text-xs font-medium text-[#6f6e68]">{url}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg bg-[#0b0b0b] px-3 py-1.5 text-xs font-bold text-white transition-transform active:scale-95"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
