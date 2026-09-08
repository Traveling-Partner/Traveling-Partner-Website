"use client";

import Image from "next/image";
import Link from "next/link";
import { HELP_ICONS } from "@/lib/helpAssets";

type SearchEmptyStateProps = {
  query?: string;
  description: string;
};

export default function SearchEmptyState({
  query = "",
  description,
}: SearchEmptyStateProps) {
  const searched = query.trim();

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-[28px] border border-[#0b0b0b]/10 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.07)] sm:rounded-[36px]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 55% at 50% -10%, rgba(252,224,1,0.42), transparent 62%),
            radial-gradient(ellipse 45% 40% at 0% 100%, rgba(253,184,19,0.18), transparent 70%),
            radial-gradient(ellipse 40% 38% at 100% 85%, rgba(252,224,1,0.16), transparent 68%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-gradient-to-b from-[#FCE001]/50 to-[#FDB813]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-[#FDB813]/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center px-6 py-14 text-center sm:px-12 sm:py-16 lg:py-[72px]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            No matches
          </span>
        </div>

        <div className="relative mb-7 flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-[22px] sm:mb-8 sm:h-[104px] sm:w-[104px] sm:rounded-[26px]">
          <Image
            src={HELP_ICONS.noResults}
            alt=""
            width={104}
            height={104}
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="font-poppins text-[28px] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:text-[36px] lg:text-[40px]">
          No results{" "}
          <span className="relative inline-block origin-center -rotate-[3deg] rounded-[10px] border-b-[4px] border-r-[4px] border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-3.5 sm:py-1">
            <em className="font-medium italic text-black">found.</em>
          </span>
        </h2>

        {searched ? (
          <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#0b0b0b]/10 bg-[#0b0b0b] px-4 py-2 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#FCE001]">
              Searched
            </span>
            <span className="h-3 w-px shrink-0 bg-white/20" aria-hidden="true" />
            <span className="truncate text-[13px] font-semibold text-white sm:text-[14px]">
              &ldquo;{searched}&rdquo;
            </span>
          </div>
        ) : null}

        <p className="mt-5 max-w-[440px] text-[14px] leading-relaxed text-[#6b6960] sm:text-[15px]">
          {description}
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-6 py-3 text-[14px] font-bold text-[#0b0b0b] shadow-[0_10px_24px_rgba(253,184,19,0.35)] transition-transform duration-300 hover:scale-[1.03] sm:px-7 sm:py-3.5 sm:text-[15px]"
        >
          Contact now
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
