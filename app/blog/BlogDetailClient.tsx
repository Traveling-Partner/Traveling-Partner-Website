"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchBlogDetailClient, fetchBlogListClient } from "@/lib/blogClientFetch";
import { pickBlogCategoryField, pickBlogDateField } from "@/lib/blogFormat";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { extractBlogList } from "@/lib/blogApi";
import BlogDetailHero from "@/components/Blog-sections/BlogDetailHero";
import BlogDetailBody from "@/components/Blog-sections/BlogDetailBody";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import TPLoader from "@/components/TPLoader";
import type { BlogCardData } from "@/components/Blog-sections/BlogCard";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  description2?: string;
  date?: unknown;
  readTime?: string;
  category?: string;
  author?: string;
  tags?: string[];
  views?: number;
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
  author: String(item?.author ?? "").trim(),
  tags: Array.isArray(item?.tags) ? item.tags : [],
  views: Number(item?.views ?? item?.viewCount ?? 0) || undefined,
});

const mapRelatedBlog = (item: any): BlogCardData => ({
  id:
    item?.id ??
    item?.blog_id ??
    item?.blogId ??
    item?.website_blog_id ??
    item?.websiteBlogId ??
    "",
  cover_image: item?.image ?? item?.cover_image ?? item?.coverImage ?? "",
  main_title: item?.title ?? item?.main_title ?? item?.mainTitle ?? "Untitled",
  description1: item?.description ?? item?.description1 ?? item?.short_description ?? "",
  date: pickBlogDateField(item),
  category: pickBlogCategoryField(item),
  author: String(item?.author ?? "").trim(),
  readTime: String(item?.readTime ?? item?.read_time ?? "").trim(),
});

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

export default function BlogDetailClient({
  blogId,
}: {
  blogId?: string;
} = {}): React.ReactElement {
  const searchParams = useSearchParams();
  const routeId = (blogId?.trim() || searchParams?.get("id") || "").trim();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            const rawList = extractBlogList(listData);
            const related = rawList
              .map(mapRelatedBlog)
              .filter((item) => item.id && String(item.id) !== String(resolvedBlog.id))
              .filter((item) =>
                resolvedBlog.category
                  ? item.category === resolvedBlog.category
                  : true
              )
              .slice(0, 3);
            setRelatedBlogs(related);
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogDetailHero blog={blog} />
      <BlogDetailBody
        coverImage={blog.cover_image}
        title={blog.main_title}
        description2={blog.description2}
        tags={displayTags}
        relatedBlogs={relatedBlogs}
        getImageSrc={getImageSrc}
      />
      <TPJournalSection />
    </div>
  );
}
