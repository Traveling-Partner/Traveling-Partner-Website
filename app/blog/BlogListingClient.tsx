// app/blog/BlogListingClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import {
  formatBlogType,
  pickBlogCategoryField,
  pickBlogDateField,
} from "@/lib/blogFormat";
import { extractBlogList } from "@/lib/blogApi";
import { fetchBlogListClient } from "@/lib/blogClientFetch";
import BlogHero from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";
import LatestStoriesSection from "@/components/Blog-sections/LatestStoriesSection";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import TPLoader from "@/components/TPLoader";

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

const mapBlog = (item: any): Blog => ({
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
    return optimizeCloudinaryImage(src, 1000, 72);
  }
  return "/mock-images/blog-cover.svg";
};

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <TPLoader variant="inline" size={96} label="Loading blogs…" />
  </div>
);

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBlogListClient();
        const rawList = extractBlogList(data);
        const mappedBlogs = rawList.map(mapBlog).filter((blog: Blog) => blog.id);
        setBlogs(mappedBlogs);
      } catch (err) {
        console.error("Error while fetching blog list:", err);
        setError("Unable to load blogs right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        blogs
          .map((blog) => blog.category?.trim())
          .filter((cat): cat is string => Boolean(cat))
      )
    );

    return [
      { key: "All", label: "All Posts", count: blogs.length },
      ...unique.map((cat) => ({
        key: cat,
        label: formatBlogType(cat) || cat,
        count: blogs.filter((blog) => blog.category === cat).length,
      })),
    ];
  }, [blogs]);

  const carouselBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!query) return true;

      const title = blog.main_title?.toLowerCase() ?? "";
      const description = blog.description1?.toLowerCase() ?? "";
      const category = blog.category?.toLowerCase() ?? "";

      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => {
          document
            .getElementById("blog-stories")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center px-4 py-20">
          <p className="text-center text-red-600">{error}</p>
        </div>
      ) : (
        <FeaturedBlogSection blogs={carouselBlogs} getImageSrc={getImageSrc} />
      )}

      {!loading && !error ? (
        <LatestStoriesSection blogs={carouselBlogs} getImageSrc={getImageSrc} />
      ) : null}

      <TPJournalSection />
    </div>
  );
}
