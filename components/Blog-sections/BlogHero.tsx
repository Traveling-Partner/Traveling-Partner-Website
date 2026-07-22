"use client";

import type { FormEvent } from "react";

export type BlogHeroCategory = {
  key: string;
  label: string;
  count: number;
};

type BlogHeroProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  categories: BlogHeroCategory[];
  selectedCategory: string;
  onCategoryChange: (key: string) => void;
};

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

/**
 * Blog page hero — 1:1 Figma match.
 * Presentational only: no API / fetch logic.
 */
export default function BlogHero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogHeroProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      {/* Soft brand glows — Figma atmosphere */}
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

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.03] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-0 pt-[110px] text-center sm:px-6 sm:pt-[128px] md:pt-[140px] lg:px-8 lg:pt-[150px]">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            TP Journal · Stories From The Road
          </span>
        </div>

        {/* Heading — "The" + tilted yellow "Blog." */}
        <h1 className="mb-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-poppins text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:mb-6 sm:gap-x-3 sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
          <span>The</span>
          <span className="relative inline-block origin-center -rotate-[3deg] rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-[#FCE001] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1">
            <em className="font-medium italic text-black">Blog.</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-8 max-w-[720px] text-[15px] leading-relaxed text-[#4a4a45] sm:mb-10 sm:text-base sm:leading-[1.7] md:mb-12">
          <span className="block">
            Stories, guides, and updates from Pakistan&apos;s commission-free{" "}
            <span className="whitespace-nowrap">mobility movement.</span>
          </span>
          <span className="block">
            Everything you need to travel smarter, safer, and together.
          </span>
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 w-full max-w-[640px] sm:mb-12 md:mb-14"
        >
          <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] sm:gap-3 sm:p-2 sm:pl-5">
            <SearchIcon className="h-5 w-5 shrink-0 text-[#9a968c]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stories, guides, tips..."
              className="min-w-0 flex-1 bg-transparent py-2 text-[14px] text-[#0b0b0b] outline-none placeholder:text-[#9a968c] sm:text-[15px]"
              aria-label="Search blog posts"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#0b0b0b] px-5 py-2.5 text-[13px] font-bold text-[#FCE001] transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-[14px]"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Category filters between dashed rules */}
      <div className="relative border-y border-dashed border-[#9ec5ff]/70 py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:gap-2.5 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onCategoryChange(cat.key)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-[14px] ${
                    active
                      ? "bg-[#0b0b0b] text-[#FCE001] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
                      : "border border-[#e8e4da] bg-white text-[#0b0b0b] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#d4d0c6]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      active ? "bg-[#FCE001]" : "bg-[#FCE001]"
                    }`}
                  />
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none sm:min-w-[24px] sm:text-[12px] ${
                      active
                        ? "bg-[#FCE001] text-[#0b0b0b]"
                        : "bg-[#eceae4] text-[#6b6960]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
