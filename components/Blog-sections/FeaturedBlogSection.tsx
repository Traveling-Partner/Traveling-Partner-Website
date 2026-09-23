"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, formatBlogType, formatReadTimeLabel } from "@/lib/blogFormat";
import { getBlogDetailHref } from "@/lib/blogShare";

export type FeaturedBlog = {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
  categories?: string[];
  author?: string;
  readTime?: string;
  tags?: string[];
  isFeatured?: boolean;
};

type FeaturedBlogSectionProps = {
  blogs: FeaturedBlog[];
  getImageSrc: (value: string) => string;
};

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

function formatFeaturedDate(value: unknown): string {
  const formatted = formatBlogDate(value);
  if (!formatted) return "";
  return formatted.replace(",", "");
}

function formatReadTime(value?: string): string {
  return formatReadTimeLabel(value);
}

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

function FeaturedStoryCard({
  blog,
  getImageSrc,
  priority = false,
}: {
  blog: FeaturedBlog;
  getImageSrc: (value: string) => string;
  priority?: boolean;
}) {
  const categoryLabel = blog.category ? formatBlogType(blog.category).toUpperCase() : "";
  const extraCategories = (blog.categories ?? [])
    .slice(1)
    .map((cat) => formatBlogType(cat).toUpperCase())
    .filter(Boolean);
  const dateLabel = formatFeaturedDate(blog.date);
  const readTimeLabel = formatReadTime(blog.readTime);
  const detailHref = getBlogDetailHref(blog.id);

  const metaParts = [categoryLabel, ...extraCategories, dateLabel, readTimeLabel].filter(Boolean);

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#eceae4] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:rounded-[32px]">
      <div className="relative aspect-[8/3] w-full overflow-hidden bg-[#f7f4ec]">
        <Image
          src={getImageSrc(blog.cover_image)}
          alt={blog.main_title}
          fill
          className="object-contain object-center"
          style={{ objectFit: "contain", objectPosition: "center" }}
          sizes="(max-width: 1280px) 94vw, 1216px"
          priority={priority}
        />
      </div>

      <div className="flex flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          {metaParts.length > 0 ? (
            <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-semibold sm:text-[13px]">
              {categoryLabel ? (
                <span className="font-bold uppercase tracking-[0.08em] text-[#FCE001]">
                  {categoryLabel}
                </span>
              ) : null}
              {extraCategories.map((cat) => (
                <span
                  key={cat}
                  className="font-bold uppercase tracking-[0.08em] text-[#6b6960]"
                >
                  {cat}
                </span>
              ))}
              {(categoryLabel || extraCategories.length > 0) && (dateLabel || readTimeLabel) ? (
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

          <h2 className="mb-2 font-poppins text-[clamp(22px,2.4vw,32px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:mb-3">
            {renderFeaturedTitle(blog.main_title)}
          </h2>

          {blog.description1 ? (
            <p className="mb-4 line-clamp-3 text-[14px] leading-[1.55] text-[#5c5b55] sm:text-[15px]">
              {blog.description1}
            </p>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center justify-end gap-4 border-t border-[#eceae4] pt-3 sm:pt-4">
            <Link
              href={detailHref}
              className="group inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
            >
              <span className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                Read Article
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_4px_12px_rgba(252,224,1,0.35)] transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
      </div>
    </article>
  );
}

function CarouselNavButton({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_4px_12px_rgba(252,224,1,0.35)] transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:h-11 sm:w-11"
    >
      <ArrowIcon
        className={`h-4 w-4 ${direction === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}

/**
 * Featured Story carousel — same Figma card; filtered via hero category tabs.
 */
export default function FeaturedBlogSection({
  blogs,
  getImageSrc,
}: FeaturedBlogSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    updateScrollButtons();
  }, [blogs, emblaApi, updateScrollButtons]);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollButtons();
    emblaApi.on("select", updateScrollButtons);
    emblaApi.on("reInit", updateScrollButtons);

    return () => {
      emblaApi.off("select", updateScrollButtons);
      emblaApi.off("reInit", updateScrollButtons);
    };
  }, [emblaApi, updateScrollButtons]);

  useEffect(() => {
    if (!emblaApi) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    };

    const root = emblaApi.rootNode();
    root.addEventListener("keydown", onKeyDown);
    return () => root.removeEventListener("keydown", onKeyDown);
  }, [emblaApi]);

  if (!blogs.length) {
    return null;
  }

  return (
    <section
      className="relative w-full bg-[#FEFBF6] pb-10 pt-2 sm:pb-12 sm:pt-4 lg:pb-14"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eceae4] bg-white px-3.5 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
              Featured Story
            </span>
          </div>

          {blogs.length > 1 ? (
            <div className="flex items-center gap-2">
              <CarouselNavButton
                direction="prev"
                label="Previous featured story"
                disabled={!canScrollPrev}
                onClick={() => emblaApi?.scrollPrev()}
              />
              <CarouselNavButton
                direction="next"
                label="Next featured story"
                disabled={!canScrollNext}
                onClick={() => emblaApi?.scrollNext()}
              />
            </div>
          ) : null}
        </div>

        <div
          ref={emblaRef}
          className="overflow-hidden outline-none"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured blog stories"
          tabIndex={0}
        >
          <div className="flex touch-pan-y">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="min-w-0 shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${blogs.length}`}
              >
                <FeaturedStoryCard
                  blog={blog}
                  getImageSrc={getImageSrc}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
