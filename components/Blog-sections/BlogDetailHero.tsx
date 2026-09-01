"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

function GoldRule() {
  return (
    <div className="mx-auto flex w-full max-w-[280px] items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FDB813]/70 to-[#FCE001]" />
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FCE001] opacity-50" />
        <span className="relative h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-[0_0_12px_rgba(253,184,19,0.55)]" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#FDB813]/70 to-[#FCE001]" />
    </div>
  );
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
  const categoryLabel = categoryLabels[0]?.toUpperCase() ?? "";
  const extraCategories = categoryLabels.slice(1).map((cat) => cat.toUpperCase());
  const dateLabel = formatHeroDate(blog.date);
  const readTimeLabel = formatReadTimeLabel(blog.readTime);
  const authorLabel = blog.author?.trim() ?? "";
  const isAdminAuthor = /admin/i.test(authorLabel);
  const showAuthor = Boolean(authorLabel) && !isAdminAuthor;
  const authorInitials = showAuthor ? getAuthorInitials(authorLabel) : "";
  const hasMeta = Boolean(categoryLabels.length || dateLabel || readTimeLabel);

  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] pb-6 pt-[110px] sm:pb-8 sm:pt-[128px] md:pt-[140px] lg:pb-10 lg:pt-[150px]">
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
      <motion.div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#FCE001]/25 blur-3xl"
        animate={{ x: [0, 18, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#FDB813]/20 blur-3xl"
        animate={{ x: [0, -14, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#0b0b0b] transition-opacity hover:opacity-70 sm:mb-6 sm:text-[14px]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_6px_16px_rgba(253,184,19,0.35)]">
            <BackArrowIcon className="h-3.5 w-3.5" />
          </span>
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/75 px-5 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:rounded-[36px] sm:px-10 sm:py-11 lg:px-14 lg:py-12"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#FCE001] via-[#FDB813] to-[#FCE001]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FCE001]/25 blur-3xl"
            aria-hidden="true"
          />

          {hasMeta ? (
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mb-7">
              {categoryLabel ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3 py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.18)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[11px]">
                    {categoryLabel}
                  </span>
                </span>
              ) : null}
              {extraCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full border border-[#0b0b0b]/10 bg-[#fff8e1] px-3 py-1.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b0b0b] sm:text-[11px]">
                    {cat}
                  </span>
                </span>
              ))}
              {(categoryLabels.length && (dateLabel || readTimeLabel)) ? (
                <span className="hidden h-4 w-px bg-[#e6e2d8] sm:block" aria-hidden="true" />
              ) : null}
              {dateLabel ? (
                <span className="text-[12px] font-semibold text-[#6b6960] sm:text-[13px]">
                  {dateLabel}
                </span>
              ) : null}
              {dateLabel && readTimeLabel ? (
                <span className="text-[#FDB813]" aria-hidden="true">
                  ·
                </span>
              ) : null}
              {readTimeLabel ? (
                <span className="text-[12px] font-bold text-[#c9a40a] sm:text-[13px]">
                  {readTimeLabel}
                </span>
              ) : null}
            </div>
          ) : null}

          <h1 className="text-center font-poppins text-[clamp(28px,5vw,52px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b]">
            {renderHeroTitle(blog.main_title)}
          </h1>

          <div className="mt-6 sm:mt-7">
            <GoldRule />
          </div>

          {blog.description1 ? (
            <p className="mx-auto mt-6 max-w-[620px] text-center text-[15px] leading-[1.8] text-[#5c5b55] sm:mt-7 sm:text-base">
              {blog.description1}
            </p>
          ) : null}

          {showAuthor ? (
            <div className="mt-8 flex items-center justify-center sm:mt-9">
              <div className="inline-flex items-center gap-3.5">
                {authorInitials ? (
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[14px] font-bold text-[#0b0b0b] shadow-[0_8px_20px_rgba(253,184,19,0.4)] ring-[3px] ring-white">
                    {authorInitials}
                  </span>
                ) : null}
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#b5b0a4]">
                    Written by
                  </p>
                  <p className="text-[15px] font-bold leading-tight text-[#0b0b0b] sm:text-[16px]">
                    {authorLabel}
                  </p>
                  <p className="text-[12px] font-medium text-[#9a968c] sm:text-[13px]">
                    Editor
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </motion.article>
      </div>
    </section>
  );
}
