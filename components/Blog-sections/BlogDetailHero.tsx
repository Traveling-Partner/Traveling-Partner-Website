"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { formatBlogDate, formatBlogType, formatReadTimeLabel } from "@/lib/blogFormat";

export type BlogDetailHeroData = {
  main_title: string;
  description1: string;
  date?: unknown;
  readTime?: string;
  category?: string;
  categories?: string[];
  author?: string;
};

function BackArrowIcon({ className = "" }: { className?: string }) {
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
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function formatHeroDate(value: unknown): string {
  const formatted = formatBlogDate(value);
  if (!formatted) return "";
  return formatted.replace(",", "");
}

function renderHeroTitle(title: string): ReactNode {
  const pattern = /(travell?ing partner|TP driver|TP)/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(pattern.source, pattern.flags);

  while ((match = re.exec(title)) !== null) {
    if (match.index > lastIndex) {
      parts.push(title.slice(lastIndex, match.index));
    }
    parts.push(
      <em
        key={`accent-${match.index}`}
        className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent"
      >
        {match[0]}
      </em>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < title.length) {
    parts.push(title.slice(lastIndex));
  }

  return parts.length ? parts : title;
}

export default function BlogDetailHero({ blog }: { blog: BlogDetailHeroData }) {
  const categoryLabels = (blog.categories?.length
    ? blog.categories
    : blog.category
      ? [blog.category]
      : []
  )
    .map((cat) => formatBlogType(cat))
    .filter(Boolean);
  const primaryCategory = categoryLabels[0]?.toUpperCase() ?? "";
  const dateLabel = formatHeroDate(blog.date);
  const readTimeLabel = formatReadTimeLabel(blog.readTime);

  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] pb-3 pt-[96px] sm:pb-4 sm:pt-[108px] md:pt-[116px] lg:pt-[120px]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 48% at 50% 8%, rgba(252,224,1,0.28), transparent 68%),
            radial-gradient(ellipse 42% 38% at 8% 55%, rgba(253,184,19,0.14), transparent 70%),
            radial-gradient(ellipse 40% 36% at 94% 48%, rgba(252,224,1,0.12), transparent 68%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex w-full flex-col items-start justify-between gap-3 sm:mb-5 sm:flex-row sm:items-center">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#eceae4] bg-white px-4 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-85"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b]">
              <BackArrowIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
              Back to Blog
            </span>
          </Link>

          {(primaryCategory || dateLabel || readTimeLabel) && (
            <div className="flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] sm:text-[13px]">
              {primaryCategory ? (
                <span className="font-bold uppercase tracking-[0.12em] text-[#c9a40a]">
                  {primaryCategory}
                </span>
              ) : null}
              {primaryCategory && (dateLabel || readTimeLabel) ? (
                <span className="text-[#d2cec4]" aria-hidden="true">
                  •
                </span>
              ) : null}
              {dateLabel ? (
                <span className="font-medium text-[#6b6960]">{dateLabel}</span>
              ) : null}
              {dateLabel && readTimeLabel ? (
                <span className="text-[#d2cec4]" aria-hidden="true">
                  •
                </span>
              ) : null}
              {readTimeLabel ? (
                <span className="font-semibold text-[#6b6960]">{readTimeLabel}</span>
              ) : null}
            </div>
          )}
        </div>

        <div className="text-center">
          <h1 className="font-poppins text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b]">
            {renderHeroTitle(blog.main_title)}
          </h1>
        </div>
      </div>
    </section>
  );
}
