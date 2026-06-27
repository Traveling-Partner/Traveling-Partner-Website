// components/BlogSlider.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CircularIndeterminate from "./loader";
import { extractBlogList, getBlogIdFromItem } from "@/lib/blogApi";
import { fetchBlogListClient } from "@/lib/blogClientFetch";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { formatBlogDate, pickBlogCategoryField } from "@/lib/blogFormat";

/** Figma 124:3829 — scaled to fit typical section width */
const DESIGN_SCALE = 0.76;
/** Allow cards to grow slightly past design size so they fill the section width */
const MAX_FRAME_SCALE = 1.1;
const ACTIVE_W = Math.round(600*DESIGN_SCALE);
const ACTIVE_H = Math.round(558 * DESIGN_SCALE);
const SIDE_W = Math.round(440 * DESIGN_SCALE);
const CARD_GAP = Math.round(25* DESIGN_SCALE);
const IMAGE_H = Math.round(306 * DESIGN_SCALE);
const CARD_RADIUS = Math.round(25.43 * DESIGN_SCALE);
/** Exactly 3 cards: 1 active + gap + 2 side */
const VIEWPORT_W = ACTIVE_W + CARD_GAP + SIDE_W + CARD_GAP + SIDE_W;
const AUTOPLAY_MS = 4500;
const SLIDE_SPRING = { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.85 };
const SLIDE_EXIT_MS = 0.38;

/** Matches About Us "Read our story" CTA — Figma Component 1 / 124:3695 */
const STORY_CTA_FIGMA = {
  padLeft: 22,
  padRight: 12,
  padY: 10,
  gap: 8,
  labelSize: 16,
  arrowSize: 36,
  arrowFont: 15,
};
const STORY_CTA_SCALE = 0.85;

function scaleStoryCta(value: number, extraScale = 1): number {
  return value * STORY_CTA_SCALE * extraScale;
}

function ViewMoreButton(): React.ReactElement {
  const s = STORY_CTA_FIGMA;
  const mobileScale = 0.72;

  return (
    <>
      <Link
        href="/blog"
        className="group relative hidden w-fit shrink-0 items-center justify-start overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(252,224,1,0.28)] lg:inline-flex"
        style={{
          paddingLeft: scaleStoryCta(s.padLeft),
          paddingRight: scaleStoryCta(s.padRight),
          paddingTop: scaleStoryCta(s.padY),
          paddingBottom: scaleStoryCta(s.padY),
          gap: scaleStoryCta(s.gap),
        }}
      >
        <span
          className="flex items-center whitespace-nowrap font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize) }}
        >
          View More
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] font-bold leading-none text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]"
          style={{
            width: scaleStoryCta(s.arrowSize),
            height: scaleStoryCta(s.arrowSize),
            fontSize: scaleStoryCta(s.arrowFont),
          }}
        >
          <span className="block translate-x-px leading-none">→</span>
        </span>
      </Link>

      <Link
        href="/blog"
        className="group inline-flex w-fit shrink-0 items-center justify-start overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 lg:hidden"
        style={{
          paddingLeft: scaleStoryCta(s.padLeft, mobileScale),
          paddingRight: scaleStoryCta(s.padRight, mobileScale),
          paddingTop: scaleStoryCta(s.padY, mobileScale),
          paddingBottom: scaleStoryCta(s.padY, mobileScale),
          gap: scaleStoryCta(s.gap, mobileScale),
        }}
      >
        <span
          className="flex items-center whitespace-nowrap font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize, mobileScale) }}
        >
          View More
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] font-bold leading-none text-white"
          style={{
            width: scaleStoryCta(s.arrowSize, mobileScale),
            height: scaleStoryCta(s.arrowSize, mobileScale),
            fontSize: scaleStoryCta(s.arrowFont, mobileScale),
          }}
        >
          <span className="block translate-x-px leading-none">→</span>
        </span>
      </Link>
    </>
  );
}

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
  author?: string;
  readTime?: string;
}

const mapBlog = (item: Record<string, unknown>): Blog => ({
  id: getBlogIdFromItem(item),
  cover_image: String(item?.coverImage ?? item?.cover_image ?? item?.image ?? "").trim(),
  main_title: String(item?.mainTitle ?? item?.main_title ?? item?.title ?? "").trim(),
  description1: String(item?.description1 ?? item?.description ?? item?.short_description ?? "").trim(),
  date: item?.date ?? item?.publishedAt ?? item?.published_at ?? "",
  category: pickBlogCategoryField(item),
  author: String(item?.author ?? "").trim(),
  readTime: String(item?.readTime ?? item?.read_time ?? "").trim(),
});

const getImageSrc = (v: string): string | null => {
  const src = String(v || "").trim();
  if (!src) return null;
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return optimizeCloudinaryImage(src, 900, 72);
  }
  return null;
};

const displayApiDate = (value: unknown): string => {
  if (value == null || value === "") return "";
  return formatBlogDate(value);
};

const getAuthorInitials = (author: string): string => {
  const words = author.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
};

function BlogCard({ blog, isActive }: { blog: Blog; isActive: boolean }) {
  const categoryLabel = blog.category ? String(blog.category).trim() : "";
  const imageSrc = getImageSrc(blog.cover_image);
  const dateLabel = displayApiDate(blog.date);
  const authorLabel = blog.author?.trim() ?? "";
  const authorInitials = getAuthorInitials(authorLabel);
  const readTimeLabel = blog.readTime?.trim() ?? "";
  const imageH = isActive ? Math.round(IMAGE_H * 0.86) : Math.round(IMAGE_H * 0.8);
  const textPad = isActive ? "16px 20px 18px" : "14px 16px 16px";
  const titleSize = isActive ? 20 : 15;
  const bodySize = isActive ? 14 : 13;
  const metaSize = isActive ? 12 : 11;
  const contentGap = isActive ? 6 : 6;
  const titleLineHeight = 1.35;

  return (
    <Link href={`/blog/detail?id=${blog.id}`} className="block h-full w-full">
      <article
        className="blog-card-article flex h-full w-full flex-col overflow-hidden"
        style={{
          height: ACTIVE_H,
          borderRadius: CARD_RADIUS,
          background: "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03)), #161616",
          boxShadow: isActive
            ? "inset 0 0 0 1.27px rgba(255,255,255,0.06), 0 28px 56px rgba(0,0,0,0.48), 0 12px 28px rgba(0,0,0,0.24)"
            : "inset 0 0 0 1.27px rgba(255,255,255,0.06), 0 12px 28px rgba(0,0,0,0.32)",
          opacity: isActive ? 1 : 0.9,
        }}
      >
        <div className="relative shrink-0 overflow-hidden bg-[#1a1a1a]" style={{ height: imageH }}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={blog.main_title}
              fill
              className="object-cover"
              sizes="(max-width:768px) 90vw, 642px"
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, #161616 0%, transparent 45%)" }}
          />
          {categoryLabel ? (
            <span
              className="absolute left-[18px] top-[18px] rounded-[6px] bg-[#fce001] font-bold uppercase tracking-[0.06em] text-black"
              style={{
                fontSize: isActive ? 11 : 9,
                padding: isActive ? "6px 11px" : "4px 8px",
              }}
            >
              {categoryLabel.toUpperCase()}
            </span>
          ) : null}
        </div>

        <div
          className="relative z-10 flex min-h-0 flex-1 flex-col bg-[#161616]"
          style={{ padding: textPad }}
        >
          <div className="min-h-0 flex-1 overflow-hidden" style={{ display: "flex", flexDirection: "column", gap: contentGap }}>
            <h3
              className="line-clamp-2 font-bold text-white"
              style={{
                fontSize: titleSize,
                lineHeight: titleLineHeight,
              }}
            >
              {blog.main_title}
            </h3>
            {blog.description1 ? (
              <p
                className="line-clamp-2 leading-[1.5] text-white/60"
                style={{ fontSize: bodySize, margin: 0 }}
              >
                {blog.description1}
              </p>
            ) : null}
          </div>

          <div
            className={`flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1 text-white/50 ${isActive ? "pt-3" : "mt-auto pt-2"}`}
            style={{ fontSize: metaSize }}
          >
            {authorLabel ? (
              <span className="inline-flex min-w-0 items-center gap-1.5">
                {authorInitials ? (
                  <span
                    className="flex shrink-0 items-center justify-center rounded-full bg-[#fce001] font-bold text-black"
                    style={{
                      width: isActive ? 24 : 20,
                      height: isActive ? 24 : 20,
                      fontSize: isActive ? 9 : 8,
                    }}
                  >
                    {authorInitials}
                  </span>
                ) : null}
                <span className="truncate text-white/70">{authorLabel}</span>
              </span>
            ) : null}
            {authorLabel && dateLabel ? (
              <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/30" />
            ) : null}
            {dateLabel ? (
              <span className="inline-flex shrink-0 items-center gap-1">
                <svg
                  style={{ width: isActive ? 14 : 11, height: isActive ? 14 : 11 }}
                  className="opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {dateLabel}
              </span>
            ) : null}
            {dateLabel && readTimeLabel ? (
              <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/30" />
            ) : null}
            {readTimeLabel ? (
              <span className="inline-flex shrink-0 items-center gap-1">
                <svg
                  style={{ width: isActive ? 14 : 11, height: isActive ? 14 : 11 }}
                  className="opacity-50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTimeLabel}
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}

function getVisibleBlogs(blogs: Blog[], activeIndex: number): Blog[] {
  const n = blogs.length;
  if (n === 0) return [];
  if (n === 1) return [blogs[0]];
  if (n === 2) return [blogs[activeIndex % 2], blogs[(activeIndex + 1) % 2]];
  return [0, 1, 2].map((offset) => blogs[(activeIndex + offset) % n]);
}

function getSlideDirection(current: number, next: number, total: number): number {
  if (total <= 1) return 1;
  const forward = (next - current + total) % total;
  const backward = (current - next + total) % total;
  return forward <= backward ? 1 : -1;
}

export default function BlogSlider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<Blog[]>([]);
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [frameScale, setFrameScale] = useState(1);

  blogsRef.current = blogs;

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const count = blogsRef.current.length;
      if (count <= 1 || nextIndex === activeIndex || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setSlideDirection(getSlideDirection(activeIndex, nextIndex, count));
      setActiveIndex(nextIndex);
    },
    [activeIndex]
  );

  const goToNext = useCallback(() => {
    const count = blogsRef.current.length;
    if (count <= 1 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setSlideDirection(1);
    setActiveIndex((i) => (i + 1) % count);
  }, []);

  const updateFrameScale = useCallback(() => {
    if (!rootRef.current) return;
    const available = rootRef.current.clientWidth;
    setFrameScale(Math.min(MAX_FRAME_SCALE, available / VIEWPORT_W));
  }, []);

  useEffect(() => {
    updateFrameScale();
    window.addEventListener("resize", updateFrameScale);
    return () => window.removeEventListener("resize", updateFrameScale);
  }, [updateFrameScale]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const json = await fetchBlogListClient();
        setBlogs(extractBlogList(json).map(mapBlog).filter((b: Blog) => b.id && b.main_title));
      } catch {
        setError("Unable to load blogs right now.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (blogs.length <= 1) return;

    const tick = () => {
      if (isHoveredRef.current || isAnimatingRef.current) return;
      goToNext();
    };

    const id = window.setInterval(tick, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [blogs.length, goToNext]);

  useEffect(() => {
    const unlock = window.setTimeout(() => {
      isAnimatingRef.current = false;
    }, 650);
    return () => window.clearTimeout(unlock);
  }, [activeIndex]);

  const visibleBlogs = useMemo(() => getVisibleBlogs(blogs, activeIndex), [blogs, activeIndex]);
  const activeBlog = blogs[activeIndex];
  const scaledW = VIEWPORT_W * frameScale;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularIndeterminate />
      </div>
    );
  }
  if (error) return <p className="py-4 text-center text-red-400">{error}</p>;
  if (!blogs.length) return null;

  return (
    <div ref={rootRef} className="w-full">
      <div className="mx-auto" style={{ width: scaledW, maxWidth: "100%" }}>
        <div
          className="overflow-hidden"
          style={{ height: ACTIVE_H * frameScale }}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          <motion.div
            className="flex shrink-0 items-stretch"
            style={{
              width: VIEWPORT_W,
              gap: CARD_GAP,
              transform: `scale(${frameScale})`,
              transformOrigin: "top left",
            }}
            layout
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              onExitComplete={() => {
                isAnimatingRef.current = false;
              }}
            >
              {visibleBlogs.map((blog, position) => {
                const isActive = position === 0;
                const cardW = isActive ? ACTIVE_W : SIDE_W;
                const enterX = slideDirection * 110;
                const exitX = slideDirection * -130;

                return (
                  <motion.div
                    key={blog.id}
                    layout
                    className="shrink-0 overflow-hidden"
                    style={{ height: ACTIVE_H, width: cardW }}
                    initial={{ opacity: 0, x: enterX, scale: 0.94, width: SIDE_W }}
                    animate={{
                      opacity: isActive ? 1 : 0.78,
                      x: 0,
                      scale: isActive ? 1 : 0.97,
                      width: cardW,
                      filter: isActive ? "blur(0px)" : "blur(0.4px)",
                    }}
                    exit={{
                      opacity: 0,
                      x: exitX,
                      scale: 0.9,
                      filter: "blur(4px)",
                      transition: { duration: SLIDE_EXIT_MS, ease: [0.4, 0, 0.2, 1] },
                    }}
                    transition={SLIDE_SPRING}
                  >
                    <BlogCard blog={blog} isActive={isActive} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-12 flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[692px]">
            {blogs.length > 1 && (
              <div className="mb-6 flex items-center gap-2">
                {blogs.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goToIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex ? "h-2 w-9 bg-[#fce001]" : "h-2 w-2 bg-white/25"
                    }`}
                  />
                ))}
              </div>
            )}
            {activeBlog?.description1 ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={activeIndex}
                  className="font-poppins text-[14px] leading-[1.65] text-white/65 lg:text-[15px]"
                  initial={{ opacity: 0, x: slideDirection * 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: slideDirection * -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeBlog.description1}
                </motion.p>
              </AnimatePresence>
            ) : null}
          </div>

          <ViewMoreButton />
        </div>
      </div>
    </div>
  );
}
