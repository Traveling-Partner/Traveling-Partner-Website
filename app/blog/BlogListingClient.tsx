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
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdb813]"></div>
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
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {loading ? (
        <div className="mx-auto w-[85%] max-w-7xl px-0 max-md:w-full max-md:px-4">
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

      {/* Newsletter */}
      <div className="mx-auto w-[85%] max-w-7xl px-0 pb-10 pt-8 max-md:w-full max-md:px-4">
        <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-[#fce001] to-[#fdb813] p-8 text-center lg:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/20 blur-3xl"></div>

          <div className="relative z-10 mx-auto max-w-2xl">
            <h3 className="mb-4 text-2xl font-bold text-black lg:text-3xl">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-6 text-black/80">
              Get the latest travel tips and destination guides delivered
              straight to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-0 px-5 py-3 outline-none focus:ring-2 focus:ring-black/20"
              />
              <button className="rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-black/80">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
