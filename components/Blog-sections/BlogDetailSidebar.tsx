"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { formatBlogType } from "@/lib/blogFormat";

export type TocItem = {
  id: string;
  text: string;
};

type BlogDetailSidebarProps = {
  author?: string;
  category?: string;
  description1?: string;
  storiesCount?: number;
  readersCount?: number;
  tocItems: TocItem[];
};

function getAuthorInitials(author: string): string {
  const words = author.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function getFirstName(author: string): string {
  return author.trim().split(/\s+/)[0] ?? author;
}

function formatReaders(count?: number): string {
  if (count == null || Number.isNaN(count)) return "";
  if (count >= 1000) return `${Math.round(count / 100) / 10}K`.replace(".0K", "K");
  return String(count);
}

const BlogDetailSidebar = forwardRef<HTMLElement, BlogDetailSidebarProps>(
  function BlogDetailSidebar(
    {
      author,
      category,
      description1,
      storiesCount,
      readersCount,
      tocItems,
    },
    ref
  ) {
    const authorLabel = author?.trim() || "Traveling Partner";
    const authorInitials = getAuthorInitials(authorLabel);
    const firstName = getFirstName(authorLabel);
    const categoryLabel = category
      ? formatBlogType(category).toLowerCase()
      : "community";
    const readersLabel = formatReaders(readersCount);

    const bio =
      description1?.trim() ||
      `Editor at TP Journal. Covers ${categoryLabel} stories, driver profiles, and the human side of mobility across Pakistan.`;

    return (
      <aside ref={ref} className="space-y-5">
        <div className="rounded-[28px] border border-[#eceae4] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:p-6">
          <div className="mb-4 flex items-center gap-3.5">
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#fce001] to-[#fdb813] text-[15px] font-bold text-[#0b0b0b] shadow-[0_0_0_6px_rgba(252,224,1,0.25)]">
              {authorInitials || "TP"}
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[11px]">
                Written by
              </p>
              <p className="text-[16px] font-bold uppercase leading-tight text-[#0b0b0b] sm:text-[17px]">
                {authorLabel}
              </p>
            </div>
          </div>

          <p className="mb-5 text-[13px] leading-[1.65] text-[#4a4a45] sm:text-[14px]">
            {bio.length > 160 ? `${bio.slice(0, 157)}…` : bio}
          </p>

          {(storiesCount != null || readersLabel) && (
            <div className="mb-5 border-t border-dashed border-[#e8e4da] pt-5">
              <div className="grid grid-cols-2 gap-3">
                {storiesCount != null ? (
                  <div className="rounded-[14px] bg-[#fff8e1] px-3 py-3 text-center">
                    <p className="text-[18px] font-extrabold leading-none text-[#0b0b0b]">
                      {storiesCount}
                    </p>
                    <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#FCE001]">
                      Stories
                    </p>
                  </div>
                ) : null}
                {readersLabel ? (
                  <div className="rounded-[14px] bg-[#fff8e1] px-3 py-3 text-center">
                    <p className="text-[18px] font-extrabold leading-none text-[#0b0b0b]">
                      {readersLabel}
                    </p>
                    <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#FCE001]">
                      Readers
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <Link
            href="/blog"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b0b0b] px-4 py-3.5 text-[14px] font-bold text-[#FCE001] transition-opacity hover:opacity-90"
          >
            Follow {firstName}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {tocItems.length > 0 ? (
          <div className="rounded-[28px] border border-[#eceae4] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:p-6">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[11px]">
              In This Story
            </p>
            <ul className="space-y-3.5">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group flex items-start gap-2.5 text-[13px] font-medium leading-snug text-[#0b0b0b] transition-colors hover:text-[#c99200] sm:text-[14px]"
                  >
                    <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#fce001] to-[#fdb813]" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </aside>
    );
  }
);

export default BlogDetailSidebar;
