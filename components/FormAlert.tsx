"use client";

import React, { useEffect, useState } from "react";

interface FormAlertProps {
  status: "success" | "error" | null;
  message?: string;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5 9.5 17 19 7.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 7.5v5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function friendlyMessage(
  status: "success" | "error",
  message?: string,
): string {
  if (status === "success") {
    return message || "Your message has been sent successfully.";
  }

  const raw = (message || "").trim();
  if (!raw || /failed to fetch/i.test(raw) || /networkerror/i.test(raw)) {
    return "Couldn’t send. Check your connection and try again.";
  }
  return raw;
}

/**
 * Compact toast — cream card + dark text for clear readability.
 */
const FormAlert: React.FC<FormAlertProps> = ({ status, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!status) {
      setVisible(false);
      return;
    }
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, [status, message]);

  if (!status) return null;

  const isSuccess = status === "success";
  const title = isSuccess ? "Message sent" : "Something went wrong";
  const body = friendlyMessage(status, message);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-center px-3 pt-4 sm:inset-x-auto sm:right-5 sm:justify-end sm:px-0 sm:pt-5"
      role="status"
      aria-live="polite"
    >
      <div
        className={`pointer-events-auto w-full max-w-[300px] origin-top transition-all duration-300 ease-out sm:origin-top-right ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "-translate-y-2 scale-[0.98] opacity-0"
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-[14px] border px-3 py-2.5 shadow-[0_10px_28px_rgba(11,11,11,0.14)] ${
            isSuccess
              ? "border-[#FCE001]/70 bg-[#FFFEF6]"
              : "border-[#e8e0d0] bg-[#FFFEF6]"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[3px]"
            style={{
              background: isSuccess
                ? "linear-gradient(180deg, #FCE001 0%, #FDB813 100%)"
                : "linear-gradient(180deg, #FCE001 0%, #FDB813 100%)",
            }}
            aria-hidden
          />

          <div className="relative flex items-center gap-2.5 pl-1">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isSuccess
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b]"
                  : "bg-[#0b0b0b] text-[#FCE001]"
              }`}
            >
              {isSuccess ? <CheckIcon /> : <ErrorIcon />}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-poppins text-[13px] font-bold leading-tight text-[#0b0b0b]">
                {title}
              </p>
              <p className="mt-0.5 font-poppins text-[12px] leading-snug text-[#4a4a45]">
                {body}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#8a877c] transition-colors hover:bg-black/[0.06] hover:text-[#0b0b0b]"
              aria-label="Dismiss notification"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 3l8 8M11 3 3 11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="mt-2 h-[2px] overflow-hidden rounded-full bg-[#ebe6da]">
            <div
              className={`tp-alert-progress h-full rounded-full ${
                isSuccess
                  ? "bg-gradient-to-r from-[#FCE001] to-[#FDB813]"
                  : "bg-[#FDB813]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAlert;
