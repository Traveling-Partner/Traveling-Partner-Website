"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchBlogDetailClient, fetchBlogListClient } from "@/lib/blogClientFetch";
import {
  buildShareLinks,
  getBlogCanonicalUrl,
  toAbsoluteImageUrl,
} from "@/lib/blogShare";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { extractBlogList } from "@/lib/blogApi";
import { mapBlogCard, mapBlogDetail, type MappedBlogDetail } from "@/lib/blogMap";
import BlogDetailHero from "@/components/Blog-sections/BlogDetailHero";
import BlogDetailBody from "@/components/Blog-sections/BlogDetailBody";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import TPLoader from "@/components/TPLoader";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";

const getImageSrc = (value: string): string => {
  const src = String(value || "").trim();
  if (!src) return "/mock-images/blog-cover.svg";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return optimizeCloudinaryImage(src, 1800, 75);
  }
  return "/mock-images/blog-cover.svg";
};

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <TPLoader variant="inline" size={120} label="Loading article…" />
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
    <div className="w-full max-w-md rounded-[24px] border border-[#eceae4] bg-white p-8 text-center shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
      <h1 className="mb-2 text-xl font-bold text-[#0b0b0b]">{title}</h1>
      <p className="mb-6 text-sm text-[#5c5b55]">{message}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-6 py-2.5 text-sm font-bold text-[#FCE001] transition-opacity hover:opacity-90"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

function categoriesOverlap(a: string[], b: string[]): boolean {
  if (!a.length || !b.length) return false;
  const set = new Set(a.map((cat) => cat.trim().toLowerCase()).filter(Boolean));
  return b.some((cat) => set.has(cat.trim().toLowerCase()));
}

export default function BlogDetailClient({
  blogId,
}: {
  blogId?: string;
} = {}): React.ReactElement {
  const searchParams = useSearchParams();
  const routeId = (blogId?.trim() || searchParams?.get("id") || "").trim();
  const [blog, setBlog] = useState<MappedBlogDetail | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

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

        const detailData = await fetchBlogDetailClient(routeId, idCandidates);

        if (!detailData) {
          setBlog(null);
          setRelatedBlogs([]);
          return;
        }

        const mappedBlog = mapBlogDetail(detailData);
        const resolvedId =
          mappedBlog.id !== "" && mappedBlog.id != null ? mappedBlog.id : routeId;
        const resolvedBlog = resolvedId
          ? { ...mappedBlog, id: resolvedId }
          : null;
        setBlog(resolvedBlog);

        if (resolvedBlog) {
          try {
            const listData = await fetchBlogListClient();
            const rawList = extractBlogList(listData).map(mapBlogCard);
            const others = rawList.filter(
              (item) => item.id && String(item.id) !== String(resolvedBlog.id)
            );
            const overlapping = others.filter((item) =>
              categoriesOverlap(resolvedBlog.categories, item.categories)
            );
            setRelatedBlogs((overlapping.length ? overlapping : others).slice(0, 3));
          } catch {
            setRelatedBlogs([]);
          }
        }

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
      setRelatedBlogs([]);
      return;
    }

    fetchBlogDetail();
  }, [routeId]);

  const displayTags = useMemo(
    () => (blog?.tags ?? []).filter((tag) => String(tag).trim()),
    [blog?.tags]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FEFBF6]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FEFBF6] px-4">
        <StatusCard title="Something went wrong" message={error} href="/blog" linkLabel="Back to Blog" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FEFBF6] px-4">
        <StatusCard
          title="Article not found"
          message="This post may have been removed or the link is incorrect."
          href="/blog"
          linkLabel="Browse all articles"
        />
      </div>
    );
  }

  const shareUrl = getBlogCanonicalUrl(blog.id);
  const shareImage = toAbsoluteImageUrl(blog.cover_image);
  const shareLinks = buildShareLinks(shareUrl, blog.main_title, shareImage);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogDetailHero blog={blog} />
      <BlogDetailBody
        blog={blog}
        coverImage={blog.cover_image}
        title={blog.main_title}
        description2={blog.description2}
        tags={displayTags}
        shareLinks={shareLinks}
        shareUrl={shareUrl}
        linkCopied={linkCopied}
        onCopyLink={handleCopyLink}
        relatedBlogs={relatedBlogs}
        getImageSrc={getImageSrc}
      />
      <TPJournalSection />
    </div>
  );
}
