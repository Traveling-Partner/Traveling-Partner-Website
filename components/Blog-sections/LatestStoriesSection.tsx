"use client";

import { useEffect, useMemo, useState } from "react";
import { parseBlogDate } from "@/lib/blogFormat";
import BlogCard, { type BlogCardData } from "@/components/Blog-sections/BlogCard";

type SortOrder = "newest" | "oldest";

type LatestStoriesSectionProps = {
  blogs: BlogCardData[];
  getImageSrc: (value: string) => string;
};

const PAGE_SIZE = 3;

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

function ChevronDownIcon({ className = "" }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon({ className = "" }: { className?: string }) {
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
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function StoriesToggleButton({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-10 flex justify-center sm:mt-12">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-3 rounded-full bg-[#0b0b0b] px-6 py-3 font-poppins shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-opacity hover:opacity-90 sm:px-8 sm:py-3.5"
        aria-label={expanded ? "Show less stories" : "Load more stories"}
      >
        <span className="text-[14px] font-bold text-[#FCE001] sm:text-[15px]">
          {expanded ? "Show less stories" : "Load more stories"}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b] sm:h-9 sm:w-9">
          {expanded ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </span>
      </button>
    </div>
  );
}

/** Latest stories grid — Figma header + cards + load more */
export default function LatestStoriesSection({
  blogs,
  getImageSrc,
}: LatestStoriesSectionProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedBlogs = useMemo(() => {
    const list = [...blogs];
    list.sort((a, b) => {
      const timeA = parseBlogDate(a.date)?.getTime() ?? 0;
      const timeB = parseBlogDate(b.date)?.getTime() ?? 0;
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });
    return list;
  }, [blogs, sortOrder]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [blogs, sortOrder]);

  const visibleBlogs = sortedBlogs.slice(0, visibleCount);
  const allVisible = visibleCount >= sortedBlogs.length;
  const showToggle = sortedBlogs.length > PAGE_SIZE;
  const sortLabel = sortOrder === "newest" ? "Newest first" : "Oldest first";

  const handleToggleStories = () => {
    if (allVisible) {
      setVisibleCount(PAGE_SIZE);
      return;
    }
    setVisibleCount((count) => Math.min(count + PAGE_SIZE, sortedBlogs.length));
  };

  if (!blogs.length) {
    return (
      <section className="relative w-full overflow-hidden pb-12 pt-6 sm:pb-14 sm:pt-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[#FFF9E6] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/blog/posts-grid-bg.png'), radial-gradient(ellipse 70% 50% at 18% 28%, rgba(252,224,1,0.16), transparent 65%), radial-gradient(ellipse 55% 45% at 88% 72%, rgba(253,184,19,0.1), transparent 68%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-[85%] max-w-7xl px-0 max-md:w-full max-md:px-4">
          <div className="py-12 text-center text-[#6b6960]">No blogs found.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden pb-12 pt-6 sm:pb-14 sm:pt-8">
      {/* Section background — uploaded cream texture + soft glow fallback */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#FFF9E6] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/blog/posts-grid-bg.png'), radial-gradient(ellipse 70% 50% at 18% 28%, rgba(252,224,1,0.16), transparent 65%), radial-gradient(ellipse 55% 45% at 88% 72%, rgba(253,184,19,0.1), transparent 68%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-[85%] max-w-7xl px-0 max-md:w-full max-md:px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <h2 className="font-poppins text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b]">
            Latest{" "}
            <span className="font-medium italic text-[#FCE001]">stories.</span>
          </h2>

          <button
            type="button"
            onClick={() =>
              setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
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
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} getImageSrc={getImageSrc} />
          ))}
        </div>

        {showToggle ? (
          <StoriesToggleButton
            expanded={allVisible}
            onClick={handleToggleStories}
          />
        ) : null}
      </div>
    </section>
  );
}
