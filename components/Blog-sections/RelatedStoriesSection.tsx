"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, formatBlogType, formatReadTimeLabel } from "@/lib/blogFormat";
import { getBlogDetailHref } from "@/lib/blogShare";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";

type RelatedStoriesSectionProps = {
  blogs: BlogCardData[];
  getImageSrc: (value: string) => string;
};

function ArrowRightIcon({ className = "" }: { className?: string }) {
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

function formatCardDate(value: unknown): string {
  const formatted = formatBlogDate(value);
  if (!formatted) return "";
  return formatted.replace(",", "");
}

function formatReadTime(value?: string): string {
  return formatReadTimeLabel(value);
}

function ensurePeriod(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) return trimmed;
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function renderCardTitle(title: string): ReactNode {
  const pattern = /(travell?ing partner)/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(pattern.source, pattern.flags);
  const displayTitle = ensurePeriod(title);

  while ((match = re.exec(displayTitle)) !== null) {
    if (match.index > lastIndex) {
      parts.push(displayTitle.slice(lastIndex, match.index));
    }
    parts.push(
      <em
        key={`brand-${match.index}`}
        className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent"
      >
        {match[0]}
      </em>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < displayTitle.length) {
    parts.push(displayTitle.slice(lastIndex));
  }

  return parts.length ? parts : displayTitle;
}

function RelatedStoryCard({
  blog,
  getImageSrc,
}: {
  blog: BlogCardData;
  getImageSrc: (value: string) => string;
}) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";
  const dateLabel = formatCardDate(blog.date);
  const readTimeLabel = formatReadTime(blog.readTime);
  const authorLabel = blog.author?.trim() ?? "";
  const detailHref = getBlogDetailHref(blog.id);

  return (
    <Link href={detailHref} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_6px_22px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] sm:rounded-[24px]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f7f4ec]">
          <Image
            src={getImageSrc(blog.cover_image)}
            alt={blog.main_title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {categoryLabel ? (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0b0b0b] sm:text-[11px]">
                {categoryLabel}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-grow flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          {(dateLabel || readTimeLabel) && (
            <p className="mb-3 text-[12px] font-medium text-[#9a968c] sm:mb-3.5 sm:text-[13px]">
              {dateLabel}
              {dateLabel && readTimeLabel ? (
                <span className="mx-1.5 text-[#c4c0b6]">•</span>
              ) : null}
              {readTimeLabel}
            </p>
          )}

          <h3 className="mb-4 line-clamp-2 font-poppins text-[17px] font-extrabold leading-[1.28] tracking-tight text-[#0b0b0b] sm:mb-5 sm:text-[18px]">
            {renderCardTitle(blog.main_title)}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-[#e8e4da] pt-4">
            {authorLabel ? (
              <span className="truncate text-[13px] font-medium text-[#0b0b0b] sm:text-[14px]">
                By {authorLabel}
              </span>
            ) : (
              <span />
            )}

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#dbeafe] text-[#1e40af] transition-colors duration-300 group-hover:bg-[#bfdbfe]">
              <ExternalLinkIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function RelatedStoriesSection({
  blogs,
  getImageSrc,
}: RelatedStoriesSectionProps) {
  if (!blogs.length) return null;

  return (
    <section className="mt-16 sm:mt-20">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-poppins text-[clamp(26px,3.2vw,36px)] font-extrabold leading-[1.15] tracking-tight text-[#0b0b0b]">
          You might also{" "}
          <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">like.</span>
        </h2>

        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-3 rounded-full border border-[#eceae4] bg-white py-2 pl-5 pr-2 shadow-[0_4px_14px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-85 sm:py-2.5 sm:pl-6"
        >
          <span className="text-[13px] font-semibold text-[#0b0b0b] sm:text-[14px]">
            View all stories
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] sm:h-9 sm:w-9">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {blogs.map((blog) => (
          <RelatedStoryCard key={blog.id} blog={blog} getImageSrc={getImageSrc} />
        ))}
      </div>
    </section>
  );
}
