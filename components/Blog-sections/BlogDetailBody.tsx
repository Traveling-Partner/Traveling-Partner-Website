"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";
import RelatedStoriesSection from "@/components/Blog-sections/RelatedStoriesSection";
import BlogDetailSidebar from "@/components/Blog-sections/BlogDetailSidebar";
import {
  extractHeadingsFromHtml,
  normalizeBlogContentHtml,
} from "@/lib/blogDetailContent";

type BlogDetailBodyProps = {
  coverImage: string;
  title: string;
  description2?: string;
  tags: string[];
  relatedBlogs: BlogCardData[];
  getImageSrc: (value: string) => string;
};

const NAV_OFFSET = 72;

type PinMode = "static" | "fixed" | "bottom";

const SHARE_BOTTOM_PAD = 24;

function getPinStyle(
  pin: PinMode,
  coords: { left: number; width: number }
): CSSProperties | undefined {
  if (pin === "fixed") {
    return {
      position: "fixed",
      top: NAV_OFFSET,
      left: coords.left,
      width: coords.width,
      zIndex: 30,
      // Keep full icon stack visible — scroll inside rail if needed
      maxHeight: `calc(100vh - ${NAV_OFFSET + SHARE_BOTTOM_PAD}px)`,
      overflowY: "auto",
      paddingBottom: 8,
      scrollbarWidth: "none",
    };
  }
  if (pin === "bottom") {
    return {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
    };
  }
  return undefined;
}

export default function BlogDetailBody({
  coverImage,
  title,
  description2,
  tags,
  relatedBlogs,
  getImageSrc,
}: BlogDetailBodyProps) {
  const normalizedHtml = normalizeBlogContentHtml(description2 ?? "");
  const tocItems = extractHeadingsFromHtml(normalizedHtml);
  const contentHtml = normalizedHtml;

  const layoutRef = useRef<HTMLDivElement>(null);
  const sidebarColRef = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLElement>(null);

  const [sidebarPin, setSidebarPin] = useState<PinMode>("static");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 300 });

  const updatePins = useCallback(() => {
    const layout = layoutRef.current;
    if (!layout) return;

    // Fixed rails are desktop-only — on mobile keep normal document flow
    // so Written by / In This Story never overlay article content.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setSidebarPin("static");
      return;
    }

    const layoutRect = layout.getBoundingClientRect();

    const updateColumn = (
      column: HTMLDivElement | null,
      inner: HTMLElement | null,
      setPin: (mode: PinMode) => void,
      setCoords: (coords: { left: number; width: number }) => void
    ) => {
      if (!column) return;
      const columnRect = column.getBoundingClientRect();
      const innerHeight = inner?.offsetHeight ?? 0;
      setCoords({ left: columnRect.left, width: columnRect.width });

      if (layoutRect.top > NAV_OFFSET) {
        setPin("static");
        return;
      }

      const availableH = window.innerHeight - NAV_OFFSET - SHARE_BOTTOM_PAD;
      const effectiveH = Math.min(innerHeight, availableH);

      if (layoutRect.bottom <= NAV_OFFSET + effectiveH + 16) {
        setPin("bottom");
        return;
      }

      setPin("fixed");
    };

    updateColumn(
      sidebarColRef.current,
      sidebarInnerRef.current,
      setSidebarPin,
      setSidebarCoords
    );
  }, []);

  useEffect(() => {
    updatePins();
    const layout = layoutRef.current;
    if (!layout) return;

    const ro = new ResizeObserver(updatePins);
    ro.observe(layout);
    window.addEventListener("scroll", updatePins, { passive: true });
    window.addEventListener("resize", updatePins);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", updatePins);
      window.removeEventListener("resize", updatePins);
    };
  }, [updatePins]);

  useEffect(() => {
    updatePins();
  }, [updatePins, contentHtml, tocItems.length]);

  return (
    <section className="relative w-full bg-[#FEFBF6] pb-14 pt-4 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Featured image — larger width + taller aspect */}
        <div className="mx-auto mb-8 max-w-[900px] sm:mb-10 lg:mb-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[22px] sm:rounded-[28px]">
            <Image
              src={getImageSrc(coverImage)}
              alt={title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 900px) 92vw, 900px"
            />
          </div>
        </div>

        <div
          ref={layoutRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10"
        >
          {/* Main content */}
          <article className="min-w-0 order-1 lg:order-none">
            {contentHtml ? (
              <div
                className="blog-detail-content blog-detail-figma"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : null}

            {tags.length > 0 ? (
              <div className="mt-10 border-t border-dashed border-[#e8e4da] pt-8">
                <div className="flex flex-wrap gap-2.5">
                  {tags.map((tag) => (
                    <span
                      key={String(tag)}
                      className="rounded-full border border-[#0b0b0b] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#0b0b0b] sm:text-[13px]"
                    >
                      #{String(tag).trim().toLowerCase().replace(/\s+/g, "-")}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </article>

          {/* Right sidebar — fixed on desktop only; normal flow on mobile */}
          <div ref={sidebarColRef} className="relative min-h-[1px] order-last lg:order-none">
            <div
              style={
                sidebarPin === "static"
                  ? undefined
                  : getPinStyle(sidebarPin, sidebarCoords)
              }
            >
              <BlogDetailSidebar ref={sidebarInnerRef} tocItems={tocItems} />
            </div>
          </div>
        </div>

        <RelatedStoriesSection blogs={relatedBlogs} getImageSrc={getImageSrc} />
      </div>
    </section>
  );
}
