"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { formatBlogDate, formatBlogType } from "@/lib/blogFormat";

export type BlogDetailHeroData = {
  main_title: string;
  description1: string;
  date?: unknown;
  readTime?: string;
  category?: string;
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

function getAuthorInitials(author: string): string {
  const words = author.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function formatHeroDate(value: unknown): string {
  const formatted = formatBlogDate(value);
  if (!formatted) return "";
  return formatted.replace(",", "");
}

function formatReadTime(value?: string): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (/read/i.test(raw)) return raw;
  return `${raw} read`;
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
        className="font-medium italic text-[#FCE001]"
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
  const categoryLabel = blog.category
    ? formatBlogType(blog.category).toUpperCase()
    : "";
  const dateLabel = formatHeroDate(blog.date);
  const readTimeLabel = formatReadTime(blog.readTime);
  const authorLabel = blog.author?.trim() ?? "";
  const authorInitials = getAuthorInitials(authorLabel);
  const authorRole = blog.category
    ? `Editor · ${formatBlogType(blog.category)}`
    : "Editor";

  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] pb-8 pt-[110px] sm:pb-10 sm:pt-[128px] md:pt-[140px] lg:pt-[150px]">
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
        <div className="mb-8 flex w-full flex-col items-stretch justify-between gap-3 sm:mb-10 sm:flex-row sm:items-center">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#eceae4] bg-white px-4 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-85"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b]">
              <BackArrowIcon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
              Back to Blog
            </span>
          </Link>

          {(categoryLabel || dateLabel || readTimeLabel) && (
            <div className="inline-flex w-fit flex-wrap items-center gap-2 self-end rounded-full border border-[#eceae4] bg-white px-3 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)] sm:gap-2.5 sm:px-4 sm:py-2.5 sm:self-auto">
              {categoryLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FCE001]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#FCE001] sm:text-[11px]">
                    {categoryLabel}
                  </span>
                </span>
              ) : null}
              {dateLabel ? (
                <span className="text-[12px] font-medium text-[#6b6960] sm:text-[13px]">
                  {dateLabel}
                </span>
              ) : null}
              {dateLabel && readTimeLabel ? (
                <span className="text-[#c4c0b6]" aria-hidden="true">
                  •
                </span>
              ) : null}
              {readTimeLabel ? (
                <span className="text-[12px] font-semibold text-[#FCE001] sm:text-[13px]">
                  {readTimeLabel}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="text-center">
          <h1 className="mb-5 font-poppins text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:mb-6">
            {renderHeroTitle(blog.main_title)}
          </h1>

          {blog.description1 ? (
            <p className="mx-auto mb-8 max-w-[640px] text-[15px] leading-[1.75] text-[#5c5b55] sm:mb-10 sm:text-base sm:leading-[1.8]">
              {blog.description1}
            </p>
          ) : null}

          {(authorLabel || authorInitials) && (
            <div className="inline-flex items-center gap-3 rounded-full border border-[#eceae4] bg-white px-4 py-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.06)] sm:gap-3.5 sm:px-5 sm:py-3">
              {authorInitials ? (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[13px] font-bold text-[#0b0b0b]">
                  {authorInitials}
                </span>
              ) : null}
              <div className="text-left">
                {authorLabel ? (
                  <p className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                    {authorLabel}
                  </p>
                ) : null}
                <p className="text-[12px] font-medium text-[#9a968c] sm:text-[13px]">
                  {authorRole}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
