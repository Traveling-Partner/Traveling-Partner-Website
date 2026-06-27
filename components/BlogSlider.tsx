// components/BlogSlider.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import CircularIndeterminate from "./loader";
import { extractBlogList } from "@/lib/blogApi";
import { fetchBlogListClient } from "@/lib/blogClientFetch";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import {
  formatBlogDate,
  formatBlogType,
  pickBlogCategoryField,
  pickBlogDateField,
} from "@/lib/blogFormat";

/** Figma 124:3829 — scaled to fit typical section width */
const DESIGN_SCALE = 0.72;
const ACTIVE_W = Math.round(600*DESIGN_SCALE);
const ACTIVE_H = Math.round(558 * DESIGN_SCALE);
const SIDE_W = Math.round(440 * DESIGN_SCALE);
const CARD_GAP = Math.round(20* DESIGN_SCALE);
const IMAGE_H = Math.round(306 * DESIGN_SCALE);
const CARD_RADIUS = Math.round(25.43 * DESIGN_SCALE);
/** Exactly 3 cards: 1 active + gap + 2 side */
const VIEWPORT_W = ACTIVE_W + CARD_GAP + SIDE_W + CARD_GAP + SIDE_W;
const AUTOPLAY_MS = 4500;
const FADE_MS = 0.35;

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

interface BlogSliderProps {
  sectionCopy?: string;
}

const mapBlog = (item: any): Blog => ({
  id: item?.id ?? item?.blog_id ?? item?.blogId ?? item?.website_blog_id ?? item?.websiteBlogId ?? "",
  cover_image: item?.cover_image ?? item?.coverImage ?? item?.image ?? "",
  main_title: item?.main_title ?? item?.mainTitle ?? item?.title ?? "Untitled",
  description1: item?.description1 ?? item?.description ?? item?.short_description ?? "",
  date: pickBlogDateField(item),
  category: pickBlogCategoryField(item),
  author: String(item?.author ?? "").trim(),
  readTime: String(item?.readTime ?? item?.read_time ?? "").trim(),
});

const getImageSrc = (v: string) => {
  const src = String(v || "").trim();
  if (!src) return "/mock-images/blog-cover.svg";
  if (src.startsWith("/") || src.startsWith("http")) return optimizeCloudinaryImage(src, 900, 72);
  return "/mock-images/blog-cover.svg";
};

const formatAuthor = (a: string) => {
  const raw = a.trim();
  if (!raw) return "Admin";
  return raw.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
};

const formatReadTime = (rt: string) => {
  const raw = rt.trim();
  if (!raw) return "5 min read";
  return /read/i.test(raw) ? raw : `${raw} read`;
};

function BlogCard({ blog, isActive }: { blog: Blog; isActive: boolean }) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";
  const focus = isActive ? 1 : 0;

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
          ["--focus" as string]: focus,
        }}
      >
        <div className="relative shrink-0 overflow-hidden" style={{ height: IMAGE_H }}>
          <Image
            src={getImageSrc(blog.cover_image)}
            alt={blog.main_title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 90vw, 642px"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, #161616 0%, transparent 52%)" }}
          />
          {categoryLabel ? (
            <span
              className="absolute left-[18px] top-[18px] rounded-[6px] bg-[#fce001] font-bold uppercase tracking-[0.06em] text-black"
              style={{
                fontSize: "calc(10px + 1px * var(--focus, 0))",
                padding: "calc(5px + 1px * var(--focus, 0)) calc(9px + 2px * var(--focus, 0))",
              }}
            >
              {categoryLabel}
            </span>
          ) : null}
        </div>

        <div
          className="flex flex-1 flex-col justify-between"
          style={{
            padding:
              "calc(16px + 6px * var(--focus, 0)) calc(18px + 8px * var(--focus, 0)) calc(18px + 8px * var(--focus, 0))",
          }}
        >
          <div>
            <h3
              className="line-clamp-2 font-bold leading-[1.35] text-white"
              style={{
                fontSize: "calc(16px + 5px * var(--focus, 0))",
                marginBottom: "calc(10px + 4px * var(--focus, 0))",
              }}
            >
              {blog.main_title}
            </h3>
            <p
              className="line-clamp-2 leading-[1.6] text-white/60"
              style={{ fontSize: "calc(13px + 3px * var(--focus, 0))" }}
            >
              {blog.description1}
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-x-2 text-white/50"
            style={{ fontSize: "calc(11px + 2px * var(--focus, 0))" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className="flex items-center justify-center rounded-full bg-[#fce001] font-bold text-black"
                style={{
                  width: "calc(22px + 4px * var(--focus, 0))",
                  height: "calc(22px + 4px * var(--focus, 0))",
                  fontSize: "calc(8px + 2px * var(--focus, 0))",
                }}
              >
                TP
              </span>
              <span className="text-white/70">{formatAuthor(blog.author ?? "")}</span>
            </span>
            <span className="h-[3px] w-[3px] rounded-full bg-white/30" />
            <span className="inline-flex items-center gap-1">
              <svg
                style={{ width: "calc(12px + 2px * var(--focus, 0))", height: "calc(12px + 2px * var(--focus, 0))" }}
                className="opacity-50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatBlogDate(blog.date)}
            </span>
            <span className="h-[3px] w-[3px] rounded-full bg-white/30" />
            <span className="inline-flex items-center gap-1">
              <svg
                style={{ width: "calc(12px + 2px * var(--focus, 0))", height: "calc(12px + 2px * var(--focus, 0))" }}
                className="opacity-50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatReadTime(blog.readTime ?? "")}
            </span>
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

export default function BlogSlider({ sectionCopy }: BlogSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [frameScale, setFrameScale] = useState(1);

  const updateFrameScale = useCallback(() => {
    if (!rootRef.current) return;
    const available = rootRef.current.clientWidth;
    setFrameScale(Math.min(1, available / VIEWPORT_W));
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
        setBlogs(extractBlogList(json).map(mapBlog).filter((b: Blog) => b.id));
      } catch {
        setError("Unable to load blogs right now.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (blogs.length <= 1 || isHovered) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % blogs.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [blogs.length, isHovered]);

  const visibleBlogs = useMemo(() => getVisibleBlogs(blogs, activeIndex), [blogs, activeIndex]);
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
    <div
      ref={rootRef}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full justify-center">
        <div
          className="overflow-hidden"
          style={{ width: scaledW, maxWidth: "100%", height: ACTIVE_H * frameScale }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="flex shrink-0 items-stretch"
              style={{
                width: VIEWPORT_W,
                gap: CARD_GAP,
                transform: `scale(${frameScale})`,
                transformOrigin: "top left",
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: FADE_MS, ease: [0.22, 1, 0.36, 1] }}
            >
              {visibleBlogs.map((blog, position) => {
                const isActive = position === 0;
                const cardW = isActive ? ACTIVE_W : SIDE_W;

                return (
                  <div
                    key={blog.id}
                    className="shrink-0 overflow-hidden"
                    style={{ width: cardW, height: ACTIVE_H }}
                  >
                    <BlogCard blog={blog} isActive={isActive} />
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
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
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex ? "h-2 w-9 bg-[#fce001]" : "h-2 w-2 bg-white/25"
                  }`}
                />
              ))}
            </div>
          )}
          {sectionCopy && (
            <p className="font-poppins text-[14px] leading-[1.65] text-white/65 lg:text-[15px]">{sectionCopy}</p>
          )}
        </div>

        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-4 rounded-full bg-[#fce001] py-3.5 pl-7 pr-3 text-[15px] font-semibold text-black shadow-[0_0_40px_rgba(252,224,1,0.22)] hover:bg-[#ffd81d]"
        >
          View More
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
