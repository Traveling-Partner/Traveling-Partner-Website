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

/** Figma 124:3829 — scaled to fit typical section width */
const DESIGN_SCALE = 0.72;
const ACTIVE_W = Math.round(642 * DESIGN_SCALE);
const ACTIVE_H = Math.round(558 * DESIGN_SCALE);
const SIDE_W = Math.round(440 * DESIGN_SCALE);
const CARD_GAP = Math.round(74 * DESIGN_SCALE);
const IMAGE_H = Math.round(306 * DESIGN_SCALE);
const CARD_RADIUS = Math.round(25.43 * DESIGN_SCALE);
/** Embla stride — fixed per slide so loop math stays stable */
const SLIDE_STRIDE = SIDE_W + CARD_GAP;
/** Visible row: 1 active + gap + 2 side cards */
const VIEWPORT_W = ACTIVE_W + CARD_GAP + SIDE_W + CARD_GAP + SIDE_W;
const ACTIVE_OVERFLOW = ACTIVE_W - SIDE_W;
const FOCUS_RANGE = SLIDE_STRIDE * 0.82;
const WIDTH_MS = 280;
const AUTOPLAY_MS = 4500;

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
    <Link href={`/blog/detail?id=${blog.id}`} className="block h-full w-full">
      <article
        className="blog-card-article flex h-full w-full flex-col overflow-hidden"
        style={{
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

function BlogCarouselTrack({
  blogs,
  sectionCopy,
  viewportW,
  frameScale,
}: {
  blogs: Blog[];
  sectionCopy?: string;
  viewportW: number;
  frameScale: number;
}) {
  const focusRafRef = useRef<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: blogs.length > 1,
    align: "start",
    duration: 28,
    containScroll: false,
    skipSnaps: false,
  });

  /** Position-based layout — works with loop clones (index-based logic breaks). */
  const applySlideLayout = useCallback(
    (animate = false) => {
      if (!emblaApi) return;

      const rootLeft = emblaApi.rootNode().getBoundingClientRect().left;

      const entries = emblaApi
        .slideNodes()
        .map((slide) => {
          const shell = slide.querySelector<HTMLElement>(".blog-card-shell");
          if (!shell) return null;
          return {
            slide,
            shell,
            left: slide.getBoundingClientRect().left - rootLeft,
          };
        })
        .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

      const inViewport = entries.filter(
        (entry) => entry.left > -ACTIVE_W && entry.left < VIEWPORT_W + SIDE_W
      );

      const lead =
        inViewport
          .filter((entry) => entry.left > -SIDE_W * 0.65)
          .sort((a, b) => a.left - b.left)[0] ?? null;

      const leadLeft = lead?.left ?? 0;

      const rightSlides = inViewport
        .filter((entry) => entry.left > leadLeft + SIDE_W * 0.35)
        .sort((a, b) => a.left - b.left)
        .slice(0, 2);

      const rightSet = new Set(rightSlides.map((entry) => entry.slide));

      entries.forEach(({ slide, shell, left }) => {
        const isLead = lead?.slide === slide;
        const isRightInRow = rightSet.has(slide);

        shell.style.transition = animate
          ? `width ${WIDTH_MS}ms ease-out, margin ${WIDTH_MS}ms ease-out`
          : "none";
        shell.style.position = "relative";

        if (isLead) {
          shell.style.width = `${ACTIVE_W}px`;
          shell.style.marginLeft = "0px";
          shell.style.marginRight = `${-ACTIVE_OVERFLOW}px`;
          shell.style.zIndex = "3";
        } else if (isRightInRow) {
          shell.style.width = `${SIDE_W}px`;
          shell.style.marginLeft = `${ACTIVE_OVERFLOW}px`;
          shell.style.marginRight = "0px";
          shell.style.zIndex = "2";
        } else {
          shell.style.width = `${SIDE_W}px`;
          shell.style.marginLeft = "0px";
          shell.style.marginRight = "0px";
          shell.style.zIndex = "1";
        }
      });
    },
    [emblaApi]
  );

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

  const scheduleFrame = useCallback(() => {
    if (focusRafRef.current !== null) return;
    focusRafRef.current = requestAnimationFrame(() => {
      focusRafRef.current = null;
      applySlideLayout(false);
      applyFocus();
    });
  }, [applySlideLayout, applyFocus]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    scheduleFrame();
  }, [emblaApi, scheduleFrame]);

  const onSettle = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    applySlideLayout(true);
    applyFocus();
  }, [emblaApi, applySlideLayout, applyFocus]);

  const onReInit = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    applySlideLayout(false);
    applyFocus();
  }, [emblaApi, applySlideLayout, applyFocus]);

  useEffect(() => {
    if (!emblaApi) return;
    onReInit();
    emblaApi.on("reInit", onReInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", scheduleFrame);
    emblaApi.on("settle", onSettle);
    emblaApi.on("resize", onReInit);
    return () => {
      emblaApi.off("reInit", onReInit);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", scheduleFrame);
      emblaApi.off("settle", onSettle);
      emblaApi.off("resize", onReInit);
      if (focusRafRef.current !== null) {
        cancelAnimationFrame(focusRafRef.current);
        focusRafRef.current = null;
      }
    };
  }, [emblaApi, onReInit, onSelect, onSettle, scheduleFrame]);

  useEffect(() => {
    if (!emblaApi || isHovered || blogs.length <= 1) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isHovered, blogs.length]);

  const scaledW = viewportW * frameScale;

  return (
    <div className="w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex w-full justify-center">
        <div
          className="overflow-hidden"
          style={{ width: scaledW, maxWidth: "100%", height: ACTIVE_H * frameScale }}
        >
          <div
            style={{
              width: viewportW,
              transform: `scale(${frameScale})`,
              transformOrigin: "top left",
            }}
          >
            <div className="overflow-hidden" ref={emblaRef} style={{ width: viewportW }}>
              <div className="flex items-stretch">
                {blogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    data-slide-index={index}
                    className="blog-embla-slide shrink-0 grow-0 overflow-visible"
                    style={{
                      flex: `0 0 ${SIDE_W}px`,
                      width: SIDE_W,
                      minWidth: SIDE_W,
                      marginRight: CARD_GAP,
                      height: ACTIVE_H,
                    }}
                  >
                    <div className="blog-card-shell overflow-hidden" style={{ width: SIDE_W, height: ACTIVE_H }}>
                      <BlogCard blog={blog} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  );
}

export default function BlogSlider({ sectionCopy }: BlogSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [frameScale, setFrameScale] = useState(1);

  const viewportW = VIEWPORT_W;

  const updateFrameScale = useCallback(() => {
    if (!rootRef.current) return;
    const available = rootRef.current.clientWidth;
    setFrameScale(Math.min(1, available / viewportW));
  }, [viewportW]);

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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularIndeterminate />
      </div>
    );
  }
  if (error) return <p className="py-4 text-center text-red-400">{error}</p>;
  if (!blogs.length) return null;

  const carouselKey = blogs.map((b) => b.id).join("-");

  return (
    <div ref={rootRef} className="w-full">
      <BlogCarouselTrack
        key={carouselKey}
        blogs={blogs}
        sectionCopy={sectionCopy}
        viewportW={viewportW}
        frameScale={frameScale}
      />
    </div>
  );
}

