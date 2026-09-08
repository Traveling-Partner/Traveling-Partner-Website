// app/blog/BlogListingClient.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { formatBlogType } from "@/lib/blogFormat";
import { extractBlogList } from "@/lib/blogApi";
import {
  fetchBlogListClient,
  fetchFeaturedBlogListClient,
} from "@/lib/blogClientFetch";
import { mapBlogCard, type MappedBlogCard } from "@/lib/blogMap";
import BlogHero from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";
import LatestStoriesSection from "@/components/Blog-sections/LatestStoriesSection";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import SearchEmptyState from "@/components/SearchEmptyState";
import BlogLoadError from "@/components/BlogLoadError";
import TPLoader from "@/components/TPLoader";

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
    <TPLoader variant="inline" size={120} label="Loading blogs…" />
  </div>
);

function matchesListingFilters(
  blog: MappedBlogCard,
  selectedCategory: string,
  searchQuery: string
): boolean {
  const blogCategories = blog.categories?.length
    ? blog.categories
    : blog.category
      ? [blog.category]
      : [];
  const matchesCategory =
    selectedCategory === "All" || blogCategories.includes(selectedCategory);
  if (!matchesCategory) return false;

  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const title = blog.main_title?.toLowerCase() ?? "";
  const description = blog.description1?.toLowerCase() ?? "";
  const categoryText = blogCategories.join(" ").toLowerCase();
  const tags = (blog.tags ?? []).join(" ").toLowerCase();

  return (
    title.includes(query) ||
    description.includes(query) ||
    categoryText.includes(query) ||
    tags.includes(query)
  );
}

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<MappedBlogCard[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<MappedBlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [listData, featuredData] = await Promise.all([
        fetchBlogListClient(),
        fetchFeaturedBlogListClient(),
      ]);
      setBlogs(
        extractBlogList(listData)
          .map(mapBlogCard)
          .filter((blog) => blog.id)
      );
      setFeaturedBlogs(
        extractBlogList(featuredData)
          .map(mapBlogCard)
          .filter((blog) => blog.id && blog.isFeatured)
      );
    } catch (err) {
      console.error("Error while fetching blog list:", err);
      setFeaturedBlogs([]);
      setError("Unable to load blogs right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        blogs.flatMap((blog) =>
          (blog.categories?.length ? blog.categories : blog.category ? [blog.category] : [])
            .map((cat) => cat.trim())
            .filter(Boolean)
        )
      )
    );

    return [
      { key: "All", label: "All Posts", count: blogs.length },
      ...unique.map((cat) => ({
        key: cat,
        label: formatBlogType(cat) || cat,
        count: blogs.filter((blog) =>
          (blog.categories?.length ? blog.categories : [blog.category]).includes(cat)
        ).length,
      })),
    ];
  }, [blogs]);

  const carouselBlogs = useMemo(
    () =>
      blogs.filter((blog) =>
        matchesListingFilters(blog, selectedCategory, searchQuery)
      ),
    [blogs, selectedCategory, searchQuery]
  );

  const visibleFeaturedBlogs = useMemo(
    () =>
      featuredBlogs.filter((blog) =>
        matchesListingFilters(blog, selectedCategory, searchQuery)
      ),
    [featuredBlogs, selectedCategory, searchQuery]
  );

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
        hideCategories={
          !loading && !error && searchQuery.trim() !== "" && carouselBlogs.length === 0
        }
      />

      {loading ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Loader />
        </div>
      ) : error ? (
        <section
          id="blog-stories"
          className="relative w-full bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogLoadError variant="light" onRetry={loadBlogs} />
          </div>
        </section>
      ) : carouselBlogs.length === 0 ? (
        <section
          id="blog-stories"
          className="relative w-full bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SearchEmptyState
              query={searchQuery}
              description="We couldn't find any blogs matching that keyword. Try another search, or reach our team and we'll point you in the right direction."
            />
          </div>
        </section>
      ) : (
        <div id="blog-stories">
          <FeaturedBlogSection
            blogs={visibleFeaturedBlogs}
            getImageSrc={getImageSrc}
          />
          <LatestStoriesSection blogs={carouselBlogs} getImageSrc={getImageSrc} />
        </div>
      )}

      <TPJournalSection />
    </div>
  );
}
