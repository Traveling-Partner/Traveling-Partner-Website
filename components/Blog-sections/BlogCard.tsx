"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, formatBlogType } from "@/lib/blogFormat";

export type BlogCardData = {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
  author?: string;
  readTime?: string;
};

type BlogCardProps = {
  blog: BlogCardData;
  getImageSrc: (value: string) => string;
};

function getAuthorInitials(author: string): string {
  const words = author.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function formatCardDate(value: unknown): string {
  const formatted = formatBlogDate(value);
  if (!formatted) return "";
  return formatted.replace(",", "");
}

function formatReadTimeBadge(value?: string): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return raw.replace(/\s*read\s*/i, "").trim();
}

function ExternalLinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function renderCardTitle(title: string): ReactNode {
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

/** Latest stories card — 1:1 Figma match, live API data only */
export default function BlogCard({ blog, getImageSrc }: BlogCardProps) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";
  const dateLabel = formatCardDate(blog.date);
  const readTimeLabel = formatReadTimeBadge(blog.readTime);
  const authorLabel = blog.author?.trim() ?? "";
  const authorInitials = getAuthorInitials(authorLabel);
  const detailHref = `/blog/detail?id=${blog.id}`;

  return (
    <Link href={detailHref} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#eceae4] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.1)] sm:rounded-[28px]">
        {/* Image */}
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={getImageSrc(blog.cover_image)}
            alt={blog.main_title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {categoryLabel ? (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0b0b0b] sm:text-[11px]">
                {categoryLabel}
              </span>
            </div>
          ) : null}

          {readTimeLabel ? (
            <div className="absolute bottom-3 right-3 rounded-full bg-[#0b0b0b]/75 px-2.5 py-1 backdrop-blur-sm">
              <span className="text-[11px] font-semibold text-white sm:text-[12px]">
                {readTimeLabel}
              </span>
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className="flex flex-grow flex-col px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
          {(dateLabel || authorLabel) && (
            <p className="mb-2 text-[11px] font-medium text-[#9a968c] sm:mb-2.5 sm:text-[12px]">
              {dateLabel}
              {dateLabel && authorLabel ? (
                <span className="mx-1.5 text-[#c4c0b6]">•</span>
              ) : null}
              {authorLabel ? `By ${authorLabel}` : null}
            </p>
          )}

          <h2 className="mb-2 line-clamp-2 font-poppins text-[15px] font-extrabold leading-[1.25] tracking-tight text-[#0b0b0b] sm:text-[16px]">
            {renderCardTitle(blog.main_title)}
          </h2>

          {blog.description1 ? (
            <p className="mb-3 line-clamp-2 flex-grow text-[12px] leading-[1.6] text-[#5c5b55] sm:mb-4 sm:text-[13px]">
              {blog.description1}
            </p>
          ) : null}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-[#e8e4da] pt-3 sm:pt-3.5">
            <div className="flex min-w-0 items-center gap-2">
              {authorInitials ? (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[11px] font-bold text-[#0b0b0b] sm:h-9 sm:w-9 sm:text-[12px]">
                  {authorInitials}
                </span>
              ) : null}
              {authorLabel ? (
                <span className="truncate text-[12px] font-bold text-[#0b0b0b] sm:text-[13px]">
                  {authorLabel}
                </span>
              ) : null}
            </div>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#dbeafe] text-[#1e40af] transition-colors duration-300 group-hover:bg-[#bfdbfe] sm:h-9 sm:w-9">
              <ExternalLinkIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
