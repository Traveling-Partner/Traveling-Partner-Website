"use client";

import type { FormEvent } from "react";
import { helpCategories } from "@/app/help/helpContent";

type HelpHeroProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
};

const TOTAL_ARTICLES = helpCategories.reduce(
  (count, category) => count + category.items.length,
  0
);
const TOTAL_CATEGORIES = helpCategories.length;

function YellowDot() {
  return (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]"
      aria-hidden="true"
    />
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function HelpHero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HelpHeroProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 48% at 50% 8%, rgba(252,224,1,0.32), transparent 68%),
            radial-gradient(ellipse 42% 38% at 8% 55%, rgba(253,184,19,0.16), transparent 70%),
            radial-gradient(ellipse 40% 36% at 94% 48%, rgba(252,224,1,0.14), transparent 68%)
          `,
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-10 pt-[110px] text-center sm:px-6 sm:pb-12 sm:pt-[128px] md:pt-[140px] lg:px-8 lg:pt-[150px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            Support · We Are Here!!!
          </span>
        </div>

        <h1 className="mb-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-poppins text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:mb-6 sm:gap-x-3 sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
          <span>Help</span>
          <span className="relative inline-block origin-center -rotate-[3deg] rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-[#FCE001] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1">
            <em className="font-medium italic text-black">Center.</em>
          </span>
        </h1>

        <p className="mb-8 max-w-[720px] text-[15px] leading-relaxed text-[#4a4a45] sm:mb-10 sm:text-base sm:leading-[1.7] md:mb-12">
          <span className="block">
            Find answers to common questions about Traveling Partner services.
          </span>
          <span className="block">
            Search our help center or browse by topic below.
          </span>
          <span className="block">
            Everything you need to travel smarter, safer, and together.
          </span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-6 w-full max-w-[640px] sm:mb-8"
        >
          <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] sm:gap-3 sm:p-2 sm:pl-5">
            <SearchIcon className="h-5 w-5 shrink-0 text-[#9a968c]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search help articles..."
              className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-[#0b0b0b] outline-none placeholder:text-[#9a968c] sm:text-[15px]"
              aria-label="Search help articles"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#0b0b0b] px-5 py-2.5 text-[13px] font-bold text-[#FCE001] transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              Search
            </button>
          </div>
        </form>

        <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-dashed border-[#d4d0c6] bg-white px-5 py-2.5 text-[13px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] sm:gap-x-3 sm:px-6 sm:py-3 sm:text-[14px]">
          <span className="text-[#6b6960]">
            <span className="font-bold text-[#0b0b0b]">{TOTAL_ARTICLES}</span>{" "}
            Articles
          </span>
          <YellowDot />
          <span className="text-[#6b6960]">
            <span className="font-bold text-[#0b0b0b]">{TOTAL_CATEGORIES}</span>{" "}
            Categories
          </span>
          <YellowDot />
          <span className="text-[#6b6960]">
            Updated <span className="font-bold text-[#0b0b0b]">weekly</span>
          </span>
        </div>
      </div>
    </section>
  );
}
