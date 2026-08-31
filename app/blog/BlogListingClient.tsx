// app/blog/BlogListingClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { formatBlogType } from "@/lib/blogFormat";
import { extractBlogList } from "@/lib/blogApi";
import { fetchBlogListClient } from "@/lib/blogClientFetch";
import { mapBlogCard, type MappedBlogCard } from "@/lib/blogMap";
import BlogHero from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";
import LatestStoriesSection from "@/components/Blog-sections/LatestStoriesSection";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import SearchEmptyState from "@/components/SearchEmptyState";
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

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<MappedBlogCard[]>([]);
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
        const mappedBlogs = extractBlogList(data)
          .map(mapBlogCard)
          .filter((blog) => blog.id);
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

  const carouselBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return blogs.filter((blog) => {
      const blogCategories = blog.categories?.length
        ? blog.categories
        : blog.category
          ? [blog.category]
          : [];
      const matchesCategory =
        selectedCategory === "All" || blogCategories.includes(selectedCategory);

      if (!matchesCategory) return false;
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
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredBlogs = useMemo(() => {
    const featured = carouselBlogs.filter((blog) => blog.isFeatured);
    return featured.length ? featured : carouselBlogs;
  }, [carouselBlogs]);

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
        <div className="flex items-center justify-center px-4 py-20">
          <p className="text-center text-red-600">{error}</p>
        </div>
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
        <>
          <FeaturedBlogSection blogs={featuredBlogs} getImageSrc={getImageSrc} />
          <LatestStoriesSection blogs={carouselBlogs} getImageSrc={getImageSrc} />
        </>
      )}

      <TPJournalSection />
    </div>
  );
}
