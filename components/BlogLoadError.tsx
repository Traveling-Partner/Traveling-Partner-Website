"use client";

import { motion } from "framer-motion";

type BlogLoadErrorProps = {
  variant?: "light" | "dark";
  onRetry?: () => void;
};

function RefreshIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-2.4-6" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

function StoryStack() {
  return (
    <div className="relative h-[108px] w-[108px] sm:h-[124px] sm:w-[124px]">
      <motion.span
        className="absolute inset-[-10%] rounded-full bg-gradient-to-b from-[#FCE001]/50 to-[#FDB813]/10 blur-xl"
        animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[18px] top-[22px] h-[68px] w-[72px] rounded-[16px] border border-black/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] sm:h-[78px] sm:w-[82px]"
        animate={{ y: [4, 0, 4], rotate: [-8, -6, -8] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[10px] top-[14px] h-[68px] w-[72px] rounded-[16px] border border-black/10 bg-[#FFF8DC] shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:h-[78px] sm:w-[82px]"
        animate={{ y: [2, -4, 2], rotate: [4, 7, 4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute left-[4px] top-[6px] flex h-[68px] w-[72px] flex-col justify-end overflow-hidden rounded-[16px] border-[1.5px] border-black/15 bg-[#0b0b0b] shadow-[0_16px_32px_rgba(0,0,0,0.22)] sm:h-[78px] sm:w-[82px] sm:rounded-[18px]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-3 top-3 h-1.5 rounded-full bg-white/15" />
        <div className="absolute inset-x-3 top-6 h-1 rounded-full bg-white/10" />
        <div className="h-8 bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
      </motion.div>
      <motion.span
        className="absolute -right-0.5 top-1 h-3 w-3 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-[0_0_16px_rgba(253,184,19,0.8)]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </div>
  );
}

export default function BlogLoadError({
  variant = "light",
  onRetry,
}: BlogLoadErrorProps) {
  const isDark = variant === "dark";

  return (
    <div
      role="alert"
      className={
        isDark
          ? "relative overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.06] shadow-[0_20px_56px_rgba(0,0,0,0.35)] backdrop-blur-md sm:rounded-[36px]"
          : "relative overflow-hidden rounded-[28px] border border-[#0b0b0b]/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.07)] sm:rounded-[36px]"
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: isDark
            ? `
              radial-gradient(ellipse 70% 55% at 50% -10%, rgba(252,224,1,0.22), transparent 62%),
              radial-gradient(ellipse 45% 40% at 0% 100%, rgba(253,184,19,0.12), transparent 70%),
              radial-gradient(ellipse 40% 38% at 100% 85%, rgba(252,224,1,0.1), transparent 68%)
            `
            : `
              radial-gradient(ellipse 70% 55% at 50% -10%, rgba(252,224,1,0.42), transparent 62%),
              radial-gradient(ellipse 45% 40% at 0% 100%, rgba(253,184,19,0.18), transparent 70%),
              radial-gradient(ellipse 40% 38% at 100% 85%, rgba(252,224,1,0.16), transparent 68%)
            `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-gradient-to-b from-[#FCE001]/50 to-[#FDB813]/10 blur-3xl"
        animate={{ x: [0, 12, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-[#FDB813]/25 blur-3xl"
        animate={{ x: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-[64px]">
        <div
          className={
            isDark
              ? "mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5"
              : "mb-6 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5"
          }
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FCE001] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            Temporarily paused
          </span>
        </div>

        <StoryStack />

        <h2
          className={
            isDark
              ? "mt-7 font-poppins text-[28px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-[36px] lg:text-[40px]"
              : "mt-7 font-poppins text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:text-[36px] lg:text-[40px]"
          }
        >
          Couldn&apos;t load{" "}
          <span className="relative inline-block origin-center -rotate-[3deg] rounded-[10px] border-b-[4px] border-r-[4px] border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-3.5 sm:py-1">
            <em className="font-medium italic text-black">stories.</em>
          </span>
        </h2>

        <p
          className={
            isDark
              ? "mt-5 max-w-[440px] text-[14px] leading-relaxed text-white/65 sm:text-[15px]"
              : "mt-5 max-w-[440px] text-[14px] leading-relaxed text-[#6b6960] sm:text-[15px]"
          }
        >
          The journal took a short pause. Try again in a moment — rides, tips,
          and city stories will be right here.
        </p>

        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-6 py-3 text-[14px] font-bold text-[#0b0b0b] shadow-[0_10px_24px_rgba(253,184,19,0.35)] transition-transform duration-300 hover:scale-[1.03] sm:px-7 sm:py-3.5 sm:text-[15px]"
          >
            Try again
            <RefreshIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
