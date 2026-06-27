// components/BlogSlider.tsx
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
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

/** Figma 124:3829 */
const ACTIVE_W = 642;
const ACTIVE_H = 558;
const SIDE_W = 440;
const CARD_GAP = 20;
const IMAGE_H = 306;
const CARD_RADIUS = 25.43;
const SIDE_STRIDE = SIDE_W + CARD_GAP;
const ACTIVE_STRIDE = ACTIVE_W + CARD_GAP;
const FOCUS_RANGE = ACTIVE_STRIDE * 0.82;
const STRIDE_MS = 280;
const AUTOPLAY_MS = 4500;

const cardWidthExpr = `calc(${SIDE_W}px + (${ACTIVE_W} - ${SIDE_W}) * var(--focus, 0))`;

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

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

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

function BlogCard({ blog }: { blog: Blog }) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";

  return (
    <Link href={`/blog/detail?id=${blog.id}`} className="block" style={{ width: cardWidthExpr }}>
      <article
        className="blog-card-article flex flex-col overflow-hidden"
        style={{
          width: cardWidthExpr,
          height: ACTIVE_H,
          borderRadius: CARD_RADIUS,
          background: "linear-gradient(rgba(255,255,255,0.03), rgba(255,255,255,0.03)), #161616",
          boxShadow: "inset 0 0 0 1.27px rgba(255,255,255,0.06)",
          opacity: "calc(0.88 + 0.12 * var(--focus, 0))",
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

export default function BlogSlider({ sectionCopy }: BlogSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const focusRafRef = useRef<number | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [frameScale, setFrameScale] = useState(1);

  const rowWidth = ACTIVE_STRIDE + SIDE_STRIDE * 2;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 28,
  });

  const updateFrameScale = useCallback(() => {
    if (!rootRef.current) return;
    setFrameScale(Math.min(1, rootRef.current.clientWidth / rowWidth));
  }, [rowWidth]);

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

  const applyFocus = useCallback(() => {
    if (!emblaApi) return;

    const rootLeft = emblaApi.rootNode().getBoundingClientRect().left;

    emblaApi.slideNodes().forEach((slide) => {
      const slideLeft = slide.getBoundingClientRect().left - rootLeft;
      const t = smooth(clamp01(1 - Math.abs(slideLeft) / FOCUS_RANGE));

      slide.style.setProperty("--focus", t.toFixed(4));

      const article = slide.querySelector<HTMLElement>(".blog-card-article");
      if (article) {
        article.style.boxShadow =
          t > 0.55
            ? "inset 0 0 0 1.27px rgba(255,255,255,0.06), 0 28px 56px rgba(0,0,0,0.48), 0 12px 28px rgba(0,0,0,0.24)"
            : "inset 0 0 0 1.27px rgba(255,255,255,0.06), 0 12px 28px rgba(0,0,0,0.32)";
      }
    });
  }, [emblaApi]);

  const scheduleFocus = useCallback(() => {
    if (focusRafRef.current !== null) return;
    focusRafRef.current = requestAnimationFrame(() => {
      focusRafRef.current = null;
      applyFocus();
    });
  }, [applyFocus]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    scheduleFocus();
  }, [emblaApi, scheduleFocus]);

  const onSettle = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setActiveIndex(idx);
    setSelectedIndex(idx);
    applyFocus();
  }, [emblaApi, applyFocus]);

  const onReInit = useCallback(() => {
    if (!emblaApi) return;
    onSettle();
    updateFrameScale();
  }, [emblaApi, onSettle, updateFrameScale]);

  useEffect(() => {
    if (!emblaApi) return;
    onReInit();
    emblaApi.on("reInit", onReInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", scheduleFocus);
    emblaApi.on("settle", onSettle);
    emblaApi.on("resize", onReInit);
    return () => {
      emblaApi.off("reInit", onReInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", scheduleFocus);
      emblaApi.off("settle", onSettle);
      emblaApi.off("resize", onReInit);
      if (focusRafRef.current !== null) {
        cancelAnimationFrame(focusRafRef.current);
        focusRafRef.current = null;
      }
    };
  }, [emblaApi, onReInit, onSelect, onSettle, scheduleFocus]);

  useEffect(() => {
    if (!emblaApi || !blogs.length) return;
    emblaApi.reInit({ loop: blogs.length > 1 });
    onSettle();
  }, [emblaApi, blogs, onSettle]);

  useEffect(() => {
    if (!emblaApi || isHovered || blogs.length <= 1) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isHovered, blogs.length]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularIndeterminate />
      </div>
    );
  }
  if (error) return <p className="py-4 text-center text-red-400">{error}</p>;
  if (!blogs.length) return null;

  const scaledW = rowWidth * frameScale;
  const scaledH = (ACTIVE_H + 200) * frameScale;

  return (
    <div ref={rootRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="-mx-5 overflow-visible sm:-mx-8 lg:-mx-12 xl:-mx-[106px]">
        <div className="flex w-full justify-center overflow-visible">
          <div style={{ width: scaledW, minHeight: scaledH }}>
            <div
              style={{
                width: rowWidth,
                transform: `scale(${frameScale})`,
                transformOrigin: "top left",
              }}
            >
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex items-stretch">
                  {blogs.map((blog, index) => {
                    const isActive = index === activeIndex;
                    const stride = isActive ? ACTIVE_STRIDE : SIDE_STRIDE;

                    return (
                      <div
                        key={blog.id}
                        className="blog-embla-slide flex shrink-0 grow-0 items-stretch justify-start overflow-hidden"
                        style={{
                          flex: `0 0 ${stride}px`,
                          width: stride,
                          height: ACTIVE_H,
                          transition: `flex-basis ${STRIDE_MS}ms ease-out, width ${STRIDE_MS}ms ease-out`,
                        }}
                      >
                        <BlogCard blog={blog} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-12 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-[692px]">
                  {blogs.length > 1 && (
                    <div className="mb-6 flex items-center gap-2">
                      {blogs.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to slide ${i + 1}`}
                          onClick={() => emblaApi?.scrollTo(i)}
                          className={`rounded-full transition-all duration-300 ${
                            i === selectedIndex ? "h-2 w-9 bg-[#fce001]" : "h-2 w-2 bg-white/25"
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
          </div>
        </div>
      </div>
    </div>
  );
}
