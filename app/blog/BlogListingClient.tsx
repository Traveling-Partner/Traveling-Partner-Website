// app/blog/BlogListingClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import {
  formatBlogType,
  getBlogTimeAgo,
  pickBlogCategoryField,
  pickBlogDateField,
} from "@/lib/blogFormat";
import { extractBlogList } from "@/lib/blogApi";
import { fetchBlogListClient } from "@/lib/blogClientFetch";
import BlogHero from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";

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

      {/* Blog Grid */}
      <div className="mx-auto w-[85%] max-w-7xl px-0 pb-10 pt-8 max-md:w-full max-md:px-4">
        {!loading && !error && carouselBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {carouselBlogs.map((blog, index) => (
              <Link key={blog.id} href={`/blog/detail?id=${blog.id}`}>
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={getImageSrc(blog.cover_image)}
                      alt={blog.main_title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {blog.category && formatBlogType(blog.category) ? (
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#fce001] px-3 py-1 text-xs font-semibold text-black">
                          {formatBlogType(blog.category)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    {getBlogTimeAgo(blog.date) ? (
                      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {getBlogTimeAgo(blog.date)}
                        </span>
                      </div>
                    ) : null}

                    <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#fdb813]">
                      {blog.main_title}
                    </h2>

                    <p className="mb-4 flex-grow line-clamp-3 text-gray-600">
                      {blog.description1}
                    </p>

                    <div className="flex flex-wrap items-center justify-end gap-y-3 border-t border-gray-100 pt-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#fdb813] transition-all group-hover:gap-2">
                        Read More
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : !loading && !error ? (
          <div className="py-12 text-center text-gray-600">No blogs found.</div>
        ) : null}

        {/* Newsletter */}
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
