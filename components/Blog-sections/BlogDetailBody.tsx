"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import BlogCard, { type BlogCardData } from "@/components/Blog-sections/BlogCard";
import BlogDetailSidebar, {
  extractHeadingsFromHtml,
  type TocItem,
} from "@/components/Blog-sections/BlogDetailSidebar";

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

function injectHeadingIds(html: string, tocItems: TocItem[]): string {
  if (!html || !tocItems.length) return html;
  let index = 0;
  return html.replace(/<h2([^>]*)>/gi, (match, attrs) => {
    const item = tocItems[index];
    index += 1;
    if (!item) return match;
    if (/id\s*=/.test(attrs)) return match;
    return `<h2${attrs} id="${item.id}">`;
  });
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
  const tocItems = extractHeadingsFromHtml(description2 ?? "");
  const contentHtml = injectHeadingIds(description2 ?? "", tocItems);

  return (
    <section className="relative w-full bg-[#FEFBF6] pb-14 pt-4 sm:pb-16">
      <div className="mx-auto w-[92%] max-w-[1100px] px-0 sm:px-2">
        {/* Featured image — smaller */}
        <div className="mx-auto mb-8 max-w-[820px] rounded-[24px] border border-dashed border-[#c4c0b6]/60 p-2.5 sm:mb-10 sm:rounded-[28px] sm:p-3">
          <div className="relative aspect-[16/9] max-h-[340px] overflow-hidden rounded-[18px] sm:max-h-[380px] sm:rounded-[22px]">
            <Image
              src={getImageSrc(coverImage)}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 820px) 92vw, 820px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[56px_minmax(0,1fr)_292px] lg:gap-8 xl:grid-cols-[64px_minmax(0,1fr)_300px] xl:gap-10">
          {/* Left share rail */}
          <aside className="hidden lg:flex lg:flex-col lg:items-center lg:gap-3 lg:pt-2">
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

          {/* Main content */}
          <article className="min-w-0">
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

            {/* Share bar */}
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

          <BlogDetailSidebar
            author={author}
            category={category}
            description1={description1}
            storiesCount={storiesCount}
            readersCount={readersCount}
            tocItems={tocItems}
          />
        </div>

        {relatedBlogs.length > 0 ? (
          <div className="mt-16 sm:mt-20">
            <h2 className="mb-8 font-poppins text-[clamp(24px,3vw,32px)] font-extrabold text-[#0b0b0b] sm:mb-10">
              Related{" "}
              <span className="font-medium italic text-[#FCE001]">stories.</span>
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {relatedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} getImageSrc={getImageSrc} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
