"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, formatBlogType } from "@/lib/blogFormat";

export type FeaturedBlog = {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
  author?: string;
  readTime?: string;
};

type FeaturedBlogSectionProps = {
  blog: FeaturedBlog;
  getImageSrc: (value: string) => string;
};

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.2 9.8 5.8l4.9.4-3.7 3.2 1.1 4.8L8 11.8 4 14.2l1.1-4.8L1.4 6.2l4.9-.4L8 1.2Z" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function getAuthorInitials(author: string): string {
  const words = author.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function formatFeaturedDate(value: unknown): string {
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

function formatAuthorRole(category?: string): string {
  const label = formatBlogType(category ?? "");
  if (!label) return "Editor";
  return `Editor · ${label}`;
}

/** Highlight "Traveling Partner" / "Travelling Partner" in featured title only */
function renderFeaturedTitle(title: string): ReactNode {
  const pattern = /(travell?ing partner)/gi;
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
        key={`brand-${match.index}`}
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

/**
 * Featured Story — 1:1 Figma match. Presentational only; receives live blog data via props.
 */
export default function FeaturedBlogSection({
  blog,
  getImageSrc,
}: FeaturedBlogSectionProps) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";
  const dateLabel = formatFeaturedDate(blog.date);
  const readTimeLabel = formatReadTime(blog.readTime);
  const authorLabel = blog.author?.trim() ?? "";
  const authorInitials = getAuthorInitials(authorLabel);
  const authorRole = formatAuthorRole(blog.category);
  const detailHref = `/blog/detail?id=${blog.id}`;

  const metaParts = [
    categoryLabel,
    dateLabel,
    readTimeLabel,
  ].filter(Boolean);

  return (
    <section className="relative w-full bg-[#FEFBF6] pb-10 pt-2 sm:pb-12 sm:pt-4 lg:pb-14">
      <div className="relative mx-auto w-[85%] max-w-7xl px-0 max-md:w-full max-md:px-4">
        {/* Section badge — above card, Figma */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#eceae4] bg-white px-3.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:mb-5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
            Featured Story
          </span>
        </div>

        {/* Main card */}
        <article className="overflow-hidden rounded-[28px] border border-[#eceae4] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-[32px]">
          <div className="grid lg:grid-cols-2">
            {/* Image column */}
            <div className="relative p-4 sm:p-5 lg:p-6 lg:pr-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:rounded-[24px]">
                <Image
                  src={getImageSrc(blog.cover_image)}
                  alt={blog.main_title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Editor's pick badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:left-5 sm:top-5 sm:px-3.5 sm:py-2">
                  <StarIcon className="h-3 w-3 text-[#FCE001] sm:h-3.5 sm:w-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#FCE001] sm:text-[11px]">
                    Editor&apos;s Pick
                  </span>
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="flex flex-col justify-center px-4 pb-5 pt-0 sm:px-5 sm:pb-6 lg:px-6 lg:py-8 lg:pl-3 xl:px-8 xl:py-10">
              {/* Meta row */}
              {metaParts.length > 0 ? (
                <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold sm:mb-5 sm:text-[13px]">
                  {categoryLabel ? (
                    <span className="font-bold uppercase tracking-[0.08em] text-[#FCE001]">
                      {categoryLabel}
                    </span>
                  ) : null}
                  {categoryLabel && (dateLabel || readTimeLabel) ? (
                    <span className="text-[#c4c0b6]" aria-hidden="true">
                      •
                    </span>
                  ) : null}
                  {dateLabel ? (
                    <span className="font-medium text-[#6b6960]">{dateLabel}</span>
                  ) : null}
                  {dateLabel && readTimeLabel ? (
                    <span className="text-[#c4c0b6]" aria-hidden="true">
                      •
                    </span>
                  ) : null}
                  {readTimeLabel ? (
                    <span className="font-medium text-[#6b6960]">{readTimeLabel}</span>
                  ) : null}
                </div>
              ) : null}

              {/* Title */}
              <h2 className="mb-4 font-poppins text-[clamp(24px,3.2vw,36px)] font-extrabold leading-[1.15] tracking-tight text-[#0b0b0b] sm:mb-5">
                {renderFeaturedTitle(blog.main_title)}
              </h2>

              {/* Excerpt */}
              {blog.description1 ? (
                <p className="mb-6 line-clamp-4 text-[14px] leading-[1.7] text-[#5c5b55] sm:mb-7 sm:text-[15px]">
                  {blog.description1}
                </p>
              ) : null}

              {/* Footer */}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#eceae4] pt-5 sm:pt-6">
                <div className="flex min-w-0 items-center gap-3">
                  {authorInitials ? (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[13px] font-bold text-[#0b0b0b] sm:h-11 sm:w-11 sm:text-[14px]">
                      {authorInitials}
                    </span>
                  ) : null}
                  <div className="min-w-0 text-left">
                    {authorLabel ? (
                      <p className="truncate text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                        {authorLabel}
                      </p>
                    ) : null}
                    <p className="truncate text-[12px] font-medium text-[#9a968c] sm:text-[13px]">
                      {authorRole}
                    </p>
                  </div>
                </div>

                <Link
                  href={detailHref}
                  className="group inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
                >
                  <span className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                    Read story
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b] shadow-[0_4px_12px_rgba(252,224,1,0.35)] transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
