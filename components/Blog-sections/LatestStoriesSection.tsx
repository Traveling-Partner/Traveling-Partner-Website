"use client";

import { useMemo, useState } from "react";
import { parseBlogDate } from "@/lib/blogFormat";
import BlogCard, { type BlogCardData } from "@/components/Blog-sections/BlogCard";

type SortOrder = "newest" | "oldest";

type LatestStoriesSectionProps = {
  blogs: BlogCardData[];
  getImageSrc: (value: string) => string;
  sortOrder?: SortOrder;
  page?: number;
  totalPages?: number;
  onSortChange?: (sort: SortOrder) => void;
  onPageChange?: (page: number) => void;
};

function SortIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4v12M6 4 4 6M6 4l2 2M14 16V4M14 16l-2-2M14 16l2-2" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function pageItems(current: number, total: number): Array<number | "gap"> {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  const items: Array<number | "gap"> = [1];
  if (start > 2) items.push("gap");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("gap");
  items.push(total);
  return items;
}

function StoryPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  const items = pageItems(page, totalPages);

  return (
    <nav
      className="mt-10 flex justify-center sm:mt-12"
      aria-label="Blog pages"
    >
      <div className="rounded-full bg-gradient-to-r from-[#FCE001] to-[#FDB813] p-[1.5px] shadow-[0_14px_36px_rgba(253,184,19,0.28)]">
        <div className="flex items-center gap-1 rounded-full bg-white px-1.5 py-1.5 sm:gap-1.5 sm:px-2">
          <button
            type="button"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            className="inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-[13px] font-bold text-[#0b0b0b] transition hover:bg-[#FFF6CC] disabled:pointer-events-none disabled:opacity-30 sm:px-3.5"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {items.map((item, index) =>
            item === "gap" ? (
              <span
                key={`gap-${index}`}
                className="px-1 text-[14px] font-bold text-[#9a968c]"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange?.(item)}
                disabled={item === page}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold transition ${
                  item === page
                    ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_6px_16px_rgba(253,184,19,0.5)]"
                    : "text-[#0b0b0b] hover:bg-[#FFF6CC]"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            className="inline-flex h-10 items-center gap-1 rounded-full px-2.5 text-[13px] font-bold text-[#0b0b0b] transition hover:bg-[#FFF6CC] disabled:pointer-events-none disabled:opacity-30 sm:px-3.5"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}

/** Latest stories grid — current API page plus page controls. */
export default function LatestStoriesSection({
  blogs,
  getImageSrc,
  sortOrder: sortOrderProp,
  page = 1,
  totalPages = 1,
  onSortChange,
  onPageChange,
}: LatestStoriesSectionProps) {
  const [sortOrderLocal, setSortOrderLocal] = useState<SortOrder>("newest");
  const sortOrder = sortOrderProp ?? sortOrderLocal;

  const sortedBlogs = useMemo(() => {
    const list = [...blogs];
    list.sort((a, b) => {
      const timeA = parseBlogDate(a.date)?.getTime() ?? 0;
      const timeB = parseBlogDate(b.date)?.getTime() ?? 0;
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return list;
  }, [blogs, sortOrder]);

  const sortLabel = sortOrder === "newest" ? "Newest first" : "Oldest first";

  const handleSort = () => {
    const next = sortOrder === "newest" ? "oldest" : "newest";
    if (onSortChange) onSortChange(next);
    else setSortOrderLocal(next);
  };

  if (!blogs.length) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden pb-12 pt-6 sm:pb-14 sm:pt-8">
      {/* Section background — cream base + soft glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#FFF9E6]"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 18% 28%, rgba(252,224,1,0.16), transparent 65%), radial-gradient(ellipse 55% 45% at 88% 72%, rgba(253,184,19,0.1), transparent 68%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div className="max-w-[560px]">
            <h2 className="font-poppins text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b]">
              Latest{" "}
              <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Stories.</span>
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6b6960] sm:text-[15px]">
              Guides, comparisons, travel advice, and updates from Traveling
              Partner.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSort}
            className="inline-flex items-center gap-2 rounded-full border border-[#e8e4da] bg-white px-4 py-2 text-[13px] font-medium text-[#0b0b0b] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-opacity hover:opacity-85 sm:px-5 sm:py-2.5 sm:text-[14px]"
            aria-label={`Sort blogs: ${sortLabel}`}
          >
            <SortIcon className="h-4 w-4 text-[#FDB813]" />
            <span>
              Sort:{" "}
              <span className="font-bold">{sortLabel}</span>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {sortedBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              getImageSrc={getImageSrc}
              priority={index < 3}
            />
          ))}
        </div>

        <StoryPagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
