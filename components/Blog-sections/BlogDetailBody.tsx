"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";
import RelatedStoriesSection from "@/components/Blog-sections/RelatedStoriesSection";
import BlogDetailSidebar from "@/components/Blog-sections/BlogDetailSidebar";
import {
  extractHeadingsFromHtml,
  normalizeBlogContentHtml,
} from "@/lib/blogDetailContent";

type ShareLinks = Record<string, string>;

type BlogDetailBodyProps = {
  coverImage: string;
  title: string;
  description1?: string;
  description2?: string;
  author?: string;
  category?: string;
  tags: string[];
  shareLinks: ShareLinks;
  shareUrl: string;
  linkCopied: boolean;
  onCopyLink: () => void;
  relatedBlogs: BlogCardData[];
  storiesCount?: number;
  readersCount?: number;
  getImageSrc: (value: string) => string;
};

const NAV_OFFSET = 108;

type PinMode = "static" | "fixed" | "bottom";

function VerticalShareButton({
  href,
  label,
  children,
  onClick,
}: {
  href?: string;
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const className =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#eceae4] bg-white text-[#0b0b0b] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all hover:border-[#FCE001] hover:shadow-[0_4px_12px_rgba(252,224,1,0.2)]";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}

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
  description1,
  description2,
  author,
  category,
  tags,
  shareLinks,
  shareUrl,
  linkCopied,
  onCopyLink,
  relatedBlogs,
  storiesCount,
  readersCount,
  getImageSrc,
}: BlogDetailBodyProps) {
  const normalizedHtml = normalizeBlogContentHtml(description2 ?? "");
  const tocItems = extractHeadingsFromHtml(normalizedHtml);
  const contentHtml = normalizedHtml;

  const layoutRef = useRef<HTMLDivElement>(null);
  const shareColRef = useRef<HTMLDivElement>(null);
  const shareInnerRef = useRef<HTMLElement>(null);
  const sidebarColRef = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLElement>(null);

  const [sharePin, setSharePin] = useState<PinMode>("static");
  const [sidebarPin, setSidebarPin] = useState<PinMode>("static");
  const [shareCoords, setShareCoords] = useState({ left: 0, width: 64 });
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 300 });

  const updatePins = useCallback(() => {
    const layout = layoutRef.current;
    if (!layout) return;

    // Fixed rails are desktop-only — on mobile keep normal document flow
    // so Written by / In This Story never overlay article content.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setSharePin("static");
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

      if (layoutRect.bottom <= NAV_OFFSET + innerHeight + 16) {
        setPin("bottom");
        return;
      }

      setPin("fixed");
    };

    updateColumn(shareColRef.current, shareInnerRef.current, setSharePin, setShareCoords);
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
      <div className="mx-auto w-[92%] max-w-[1200px] px-0 sm:px-2">
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
          className="grid grid-cols-1 gap-8 lg:grid-cols-[64px_minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[72px_minmax(0,1fr)_320px] xl:gap-10"
        >
          {/* Left share rail — fixed while scrolling */}
          <div ref={shareColRef} className="relative hidden min-h-[1px] lg:block">
            <aside
              ref={shareInnerRef}
              className="flex flex-col items-center gap-3 pt-2"
              style={getPinStyle(sharePin, shareCoords)}
              aria-label="Share this story"
            >
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a968c] [writing-mode:vertical-rl] rotate-180">
                Share
              </span>
              <VerticalShareButton
                href={shareLinks.twitter ?? shareUrl}
                label="Share on X"
              >
                <FaXTwitter className="h-4 w-4" />
              </VerticalShareButton>
              <VerticalShareButton
                href={shareLinks.facebook ?? shareUrl}
                label="Share on Facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </VerticalShareButton>
              <VerticalShareButton
                href={shareLinks.linkedin ?? shareUrl}
                label="Share on LinkedIn"
              >
                <FaLinkedin className="h-4 w-4" />
              </VerticalShareButton>
              <VerticalShareButton label="Copy link" onClick={onCopyLink}>
                <FaLink className="h-4 w-4" />
              </VerticalShareButton>
            </aside>
          </div>

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

            <div className="mt-8 flex flex-col gap-4 rounded-[20px] border border-[#eceae4] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
              <p className="text-[15px] font-bold text-[#0b0b0b] sm:text-[16px]">
                Share this story:
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={shareLinks.twitter ?? shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f2ee] text-[#0b0b0b] transition-colors hover:bg-[#eceae4]"
                >
                  <FaXTwitter className="h-4 w-4" />
                </a>
                <a
                  href={shareLinks.facebook ?? shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f2ee] text-[#0b0b0b] transition-colors hover:bg-[#eceae4]"
                >
                  <FaFacebook className="h-4 w-4" />
                </a>
                <a
                  href={shareLinks.linkedin ?? shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f2ee] text-[#0b0b0b] transition-colors hover:bg-[#eceae4]"
                >
                  <FaLinkedin className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={onCopyLink}
                  aria-label="Copy link"
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    linkCopied
                      ? "bg-[#22c55e] text-white"
                      : "bg-[#f3f2ee] text-[#0b0b0b] hover:bg-[#eceae4]"
                  }`}
                >
                  <FaLink className="h-4 w-4" />
                </button>
              </div>
            </div>
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
              <BlogDetailSidebar
                ref={sidebarInnerRef}
                author={author}
                category={category}
                description1={description1}
                storiesCount={storiesCount}
                readersCount={readersCount}
                tocItems={tocItems}
              />
            </div>
          </div>
        </div>

        <RelatedStoriesSection blogs={relatedBlogs} getImageSrc={getImageSrc} />
      </div>
    </section>
  );
}
