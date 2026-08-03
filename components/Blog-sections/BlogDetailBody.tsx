"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";
import RelatedStoriesSection from "@/components/Blog-sections/RelatedStoriesSection";
import BlogDetailSidebar from "@/components/Blog-sections/BlogDetailSidebar";
import {
  extractHeadingsFromHtml,
  normalizeBlogContentHtml,
} from "@/lib/blogDetailContent";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

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

function SocialIconButton({
  href,
  label,
  color = "#0b0b0b",
  children,
  onClick,
  copied,
  size = "md",
}: {
  href?: string;
  label: string;
  color?: string;
  children: ReactNode;
  onClick?: () => void;
  copied?: boolean;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const className = copied
    ? `group relative flex ${dim} items-center justify-center overflow-hidden rounded-full bg-[#22c55e] text-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]`
    : `group relative flex ${dim} items-center justify-center overflow-hidden rounded-full border border-[#eceae4] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-transparent hover:shadow-[0_6px_16px_rgba(253,184,19,0.45)]`;

  const content = (
    <>
      {!copied && (
        <span
          className="absolute inset-0 bg-gradient-to-b from-[#FCE001] to-[#FDB813] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
      )}
      <span
        className={`relative z-[1] flex items-center justify-center transition-colors duration-300 ${
          copied
            ? "text-white"
            : "text-[var(--social-color)] group-hover:text-[#0b0b0b]"
        }`}
      >
        {children}
      </span>
    </>
  );

  const style = copied
    ? undefined
    : ({ ["--social-color" as string]: color } as CSSProperties);

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={className}
        style={style}
      >
        {content}
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
      style={style}
    >
      {content}
    </a>
  );
}

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

      const availableH = window.innerHeight - NAV_OFFSET - SHARE_BOTTOM_PAD;
      const effectiveH = Math.min(innerHeight, availableH);

      if (layoutRect.bottom <= NAV_OFFSET + effectiveH + 16) {
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
          className="grid grid-cols-1 gap-8 lg:grid-cols-[64px_minmax(0,1fr)_300px] lg:gap-8 xl:grid-cols-[72px_minmax(0,1fr)_320px] xl:gap-10"
        >
          {/* Left share rail — fixed while scrolling */}
          <div ref={shareColRef} className="relative hidden min-h-[1px] lg:block">
            <aside
              ref={shareInnerRef}
              className="flex flex-col items-center gap-1.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={getPinStyle(sharePin, shareCoords)}
              aria-label="Share this story"
            >
              <span className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9a968c] [writing-mode:vertical-rl] rotate-180">
                Share
              </span>
              {SOCIAL_LINKS.map((social) => (
                <SocialIconButton
                  key={social.label}
                  href={social.href}
                  label={`Follow us on ${social.label}`}
                  color={social.color}
                  size="sm"
                >
                  <social.icon className="h-3.5 w-3.5" aria-hidden />
                </SocialIconButton>
              ))}
              <SocialIconButton
                label="Copy link"
                onClick={onCopyLink}
                copied={linkCopied}
                color="#0b0b0b"
                size="sm"
              >
                <FaLink className="h-3.5 w-3.5" aria-hidden />
              </SocialIconButton>
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
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <SocialIconButton
                    key={social.label}
                    href={social.href}
                    label={`Follow us on ${social.label}`}
                    color={social.color}
                  >
                    <social.icon className="h-4 w-4" aria-hidden />
                  </SocialIconButton>
                ))}
                <SocialIconButton
                  label="Copy link"
                  onClick={onCopyLink}
                  copied={linkCopied}
                  color="#0b0b0b"
                >
                  <FaLink className="h-4 w-4" aria-hidden />
                </SocialIconButton>
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
