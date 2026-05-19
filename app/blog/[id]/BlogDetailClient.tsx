// app/blog/[id]/BlogDetailClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { websiteApiUrl } from "@/lib/websiteApiUrl";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import {
  formatBlogDate,
  formatBlogType,
  getBlogTimeAgo,
  pickBlogCategoryField,
  pickBlogDateField,
} from "@/lib/blogFormat";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaPinterest,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  description2?: string;
  date?: unknown;
  readTime?: string;
  category?: string;
  tags?: string[];
}

const mapBlogDetail = (item: any): Blog => ({
  id:
    item?.id ??
    item?.blog_id ??
    item?.blogId ??
    item?.website_blog_id ??
    item?.websiteBlogId ??
    item?.slug ??
    "",
  cover_image: item?.coverImage ?? item?.cover_image ?? item?.image ?? "",
  main_title: item?.mainTitle ?? item?.main_title ?? item?.title ?? "Untitled",
  description1: item?.description1 ?? item?.description ?? item?.short_description ?? "",
  description2: item?.description2 ?? item?.content ?? item?.long_description ?? "",
  date: pickBlogDateField(item),
  readTime: item?.readTime ?? item?.read_time ?? "5 min read",
  category: pickBlogCategoryField(item),
  tags: Array.isArray(item?.tags) ? item.tags : [],
});

const SHARE_OPTIONS = [
  {
    id: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    className: "bg-[#1877F2] hover:bg-[#166fe0]",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "twitter",
    label: "X",
    icon: FaXTwitter,
    className: "bg-black hover:bg-gray-800",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    className: "bg-[#0A66C2] hover:bg-[#0958a8]",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    className: "bg-[#25D366] hover:bg-[#20bd5a]",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: FaTelegram,
    className: "bg-[#0088cc] hover:bg-[#0077b3]",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icon: FaPinterest,
    className: "bg-[#E60023] hover:bg-[#cc001f]",
    getUrl: (url: string, title: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  {
    id: "email",
    label: "Email",
    icon: FaEnvelope,
    className: "bg-gray-600 hover:bg-gray-700",
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
] as const;

const extractBlogDetail = (payload: any): any | null => {
  if (!payload) return null;
  if (payload?.success === false) return null;
  if (payload?.data?.data && typeof payload.data.data === "object" && !Array.isArray(payload.data.data)) {
    return payload.data.data;
  }
  if (payload?.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload?.blog && typeof payload.blog === "object") return payload.blog;
  if (payload?.data?.blog && typeof payload.data.blog === "object") return payload.data.blog;
  if (typeof payload === "object" && !Array.isArray(payload)) return payload;
  return null;
};

/** Same shapes as blog list (e.g. Spring Page → data.content). */
const extractBlogListFromListResponse = (payload: any): any[] => {
  if (Array.isArray(payload?.data?.content)) return payload.data.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.blogs)) return payload.data.blogs;
  return [];
};

const normalize = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

const getImageSrc = (value: string): string => {
  const src = String(value || "").trim();
  if (!src) return "/mock-images/blog-cover.svg";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return optimizeCloudinaryImage(src, 1800, 75);
  }
  return "/mock-images/blog-cover.svg";
};

const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fce001]/30 border-t-[#fdb813]" />
    <p className="text-sm font-medium text-gray-500">Loading article…</p>
  </div>
);

function StatusCard({
  title,
  message,
  href,
  linkLabel,
}: {
  title: string;
  message: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="max-w-md w-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200/80">
      <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6 text-sm">{message}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-tp-gradient px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:opacity-90 transition-opacity"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

export default function BlogDetailClient({ id: idProp }: { id: string }) {
  const params = useParams();
  const routeId = (params?.id as string) || idProp || "";
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sharePageUrl, setSharePageUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSharePageUrl(window.location.href);
    }
  }, [routeId]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const idCandidates = Array.from(
          new Set(
            [
              routeId,
              decodeURIComponent(routeId),
              String(Number(routeId)),
              String(routeId).replace(/-/g, " "),
            ].filter((value) => value && value !== "NaN")
          )
        );
        const normalizedCandidates = idCandidates.map(normalize);

        let detailData: any = null;
        let detailResponseError = "";

        for (const candidateId of idCandidates) {
          const response = await fetch(
            websiteApiUrl(`/blog/view/${encodeURIComponent(candidateId)}`),
            { method: "GET" }
          );

          if (!response.ok) {
            detailResponseError = `Failed to fetch blog detail. Status: ${response.status}`;
            continue;
          }

          const json = await response.json();
          console.log("Blog detail API response:", json);
          detailData = extractBlogDetail(json);
          if (detailData) break;
        }

        if (!detailData) {
          const listResponse = await fetch(websiteApiUrl("/blog/list"), {
            method: "GET",
          });
          if (!listResponse.ok) {
            throw new Error(detailResponseError || `Failed to fetch blog detail. Status: ${listResponse.status}`);
          }

          const listJson = await listResponse.json();
          console.log("Blog list fallback response:", listJson);

          const listData = extractBlogListFromListResponse(listJson);

          const foundFromList = listData.find((item: any) => {
            const possibleValues = [
              item?.id,
              item?.blog_id,
              item?.blogId,
              item?.website_blog_id,
              item?.websiteBlogId,
              item?.slug,
              item?.title,
              item?.main_title,
              item?.mainTitle,
            ].map(normalize);

            return possibleValues.some((value) => normalizedCandidates.includes(value));
          });

          if (foundFromList) {
            detailData = foundFromList;
          }
        }

        if (!detailData) {
          setBlog(null);
          return;
        }

        const mappedBlog = mapBlogDetail(detailData);
        const resolvedId =
          mappedBlog.id !== "" && mappedBlog.id != null ? mappedBlog.id : routeId;
        setBlog(
          resolvedId
            ? { ...mappedBlog, id: resolvedId }
            : null
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error while fetching blog detail:", err);
        setError("Unable to load this blog right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!routeId) {
      setLoading(false);
      setBlog(null);
      return;
    }

    fetchBlogDetail();
  }, [routeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] px-4">
        <StatusCard title="Something went wrong" message={error} href="/blog" linkLabel="Back to Blog" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb] px-4">
        <StatusCard
          title="Article not found"
          message="This post may have been removed or the link is incorrect."
          href="/blog"
          linkLabel="Browse all articles"
        />
      </div>
    );
  }

  const blogTypeLabel = formatBlogType(blog.category || "");
  const publishedDate = blog.date ? formatBlogDate(blog.date) : "";
  const timeAgo = getBlogTimeAgo(blog.date);
  const displayTags = (blog.tags ?? []).filter((tag) => String(tag).trim());

  const handleCopyLink = async () => {
    const url = sharePageUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const getShareHref = (option: (typeof SHARE_OPTIONS)[number]) => {
    const needsTitle =
      option.id === "twitter" ||
      option.id === "whatsapp" ||
      option.id === "telegram" ||
      option.id === "pinterest" ||
      option.id === "email";
    if (!sharePageUrl) return "#";
    return needsTitle
      ? option.getUrl(sharePageUrl, blog.main_title)
      : option.getUrl(sharePageUrl);
  };

  const shareSidebarCard = (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-gray-200/70">
      <div className="bg-tp-gradient px-5 py-5 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-md" aria-hidden />
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/60 mb-1 relative">Spread the word</p>
        <h3 className="text-lg font-bold text-black leading-snug relative">Share this article</h3>
        <p className="text-sm text-black/70 mt-1 relative">Loved it? Send it to a friend.</p>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2">
        {SHARE_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <a
              key={option.id}
              href={getShareHref(option)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${option.label}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-2 py-3.5 transition-all hover:border-[#fce001]/60 hover:bg-[#fce001]/10 hover:shadow-sm"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition-transform group-hover:scale-110 ${option.className}`}>
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[11px] font-semibold text-gray-700">{option.label}</span>
            </a>
          );
        })}
      </div>
      <div className="px-4 pb-5">
        <button
          type="button"
          onClick={handleCopyLink}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
            linkCopied
              ? "bg-emerald-500 text-white shadow-md"
              : "border-2 border-dashed border-[#fdb813] bg-[#fce001]/15 text-gray-900 hover:bg-[#fce001]/30"
          }`}
        >
          <FaLink className="h-4 w-4 shrink-0" />
          {linkCopied ? "Link copied!" : "Copy article link"}
        </button>
      </div>
    </div>
  );

  const exploreMoreCard = (
    <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-6 text-white shadow-lg">
      <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#fce001]/25 blur-2xl" aria-hidden />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-tp-gradient text-lg mb-4">✈️</div>
      <p className="relative text-[11px] font-bold uppercase tracking-[0.18em] text-[#fce001] mb-2">Travel blog</p>
      <h4 className="relative text-lg font-bold leading-snug mb-2">More stories to explore</h4>
      <p className="relative text-sm text-white/70 leading-relaxed mb-5">
        Destination guides, travel tips, and inspiration from the Traveling Partner community.
      </p>
      <Link
        href="/blog"
        className="relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-tp-gradient py-3 text-sm font-bold text-black shadow-md hover:opacity-95 transition-opacity"
      >
        Browse all articles
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="w-[96%] max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-8 py-5 sm:py-7 pb-12 sm:pb-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#c99200] transition-colors mb-6 sm:mb-8"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to articles
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8 items-start">
          <article className="min-w-0 bg-white rounded-2xl shadow-[0_2px_24px_rgba(0,0,0,0.06)] ring-1 ring-gray-200/60">
            <div className="p-5 sm:p-8 lg:p-10">
              {blogTypeLabel ? (
                <span className="mb-4 block w-fit rounded-md bg-[#fce001] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">
                  {blogTypeLabel}
                </span>
              ) : null}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {blog.main_title}
              </h1>

              <div className="mt-5 mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-100 pb-6 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2 font-semibold text-gray-900">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tp-gradient text-[10px] font-bold text-black">
                    TP
                  </span>
                  Traveling Partner
                </span>
                {publishedDate ? <span>{publishedDate}</span> : null}
                {publishedDate && timeAgo ? <span className="text-gray-300" aria-hidden>·</span> : null}
                {timeAgo ? <span>{timeAgo}</span> : null}
              </div>

              <div className="relative mb-8 w-full overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] max-h-[400px] bg-gray-200">
                <Image
                  src={getImageSrc(blog.cover_image)}
                  alt={blog.main_title}
                  fill
                  className="object-cover object-[center_35%]"
                  priority
                  sizes="(max-width: 1280px) 92vw, 900px"
                />
              </div>

              {blog.description1 ? (
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-7 font-medium">
                  {blog.description1}
                </p>
              ) : null}
              {blog.description2 ? (
                <div
                  className="blog-detail-content blog-detail-content-wide"
                  dangerouslySetInnerHTML={{ __html: blog.description2 }}
                />
              ) : null}
              {displayTags.length > 0 ? (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {displayTags.map((tag) => (
                      <span
                        key={String(tag)}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                      >
                        {formatBlogType(String(tag))}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="xl:hidden mt-8">{shareSidebarCard}</div>
            </div>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-6">
              {shareSidebarCard}
              {exploreMoreCard}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
