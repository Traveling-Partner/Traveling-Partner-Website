"use client";

import TPLoader from "@/components/TPLoader";

type FormStatusOverlayProps = {
  phase: "loading" | "success" | "error" | null;
  message?: string;
  className?: string;
};

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.5 17 19 7.5"
        stroke="#0b0b0b"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Form card overlay: circular logo loader → success / error message.
 */
export default function FormStatusOverlay({
  phase,
  message,
  className = "",
}: FormStatusOverlayProps) {
  if (!phase) return null;

  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-white/92 backdrop-blur-sm ${className}`}
      role="status"
      aria-live="polite"
    >
      {phase === "loading" ? (
        <TPLoader variant="inline" size={108} label="Sending message…" />
      ) : null}

      {phase === "success" ? (
        <div className="flex max-w-[240px] flex-col items-center px-4 text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FCE001] shadow-[0_8px_20px_rgba(253,184,19,0.35)]">
            <CheckIcon />
          </span>
          <p className="font-poppins text-[16px] font-extrabold text-[#0b0b0b]">
            Message sent!
          </p>
          <p className="mt-1 text-[13px] leading-snug text-[#6b6960]">
            {message || "Thanks — we’ll get back to you soon."}
          </p>
        </div>
      ) : null}

      {phase === "error" ? (
        <div className="flex max-w-[240px] flex-col items-center px-4 text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#fee2e2] text-[#b91c1c]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M7 7l10 10M17 7 7 17"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="font-poppins text-[16px] font-extrabold text-[#0b0b0b]">
            Something went wrong
          </p>
          <p className="mt-1 text-[13px] leading-snug text-[#6b6960]">
            {message || "Please try again."}
          </p>
        </div>
      ) : null}
    </div>
  );
}
