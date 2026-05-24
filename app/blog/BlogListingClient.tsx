// app/blog/BlogListingClient.tsx
"use client";

import React, { useEffect, useState } from "react";
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

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
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

  const categories = [
    "All",
    ...Array.from(
      new Set(
        blogs
          .map((blog) => blog.category?.trim())
          .filter((cat): cat is string => Boolean(cat))
      )
    ),
  ];
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fce001]/10 to-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="w-[85%] max-md:w-full max-md:px-4 mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">Travel Stories</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 break-words px-1">
            Our <span className="text-white drop-shadow-md">Blog</span>
          </h1>
          <div className="w-32 h-1.5 bg-white rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-black/80 max-w-2xl mx-auto">
            Discover travel tips, destination guides, and inspiring stories from our community of explorers.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-[85%] max-md:w-full max-md:px-4 mx-auto max-w-7xl py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#fce001] to-[#fdb813] text-black shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category === "All" ? "All" : formatBlogType(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-[85%] max-md:w-full max-md:px-4 mx-auto max-w-7xl pb-10">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No blogs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <article 
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative h-[240px] overflow-hidden">
                    <Image
                      src={getImageSrc(blog.cover_image)}
                      alt={blog.main_title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {blog.category && formatBlogType(blog.category) ? (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#fce001] text-black px-3 py-1 rounded-full text-xs font-semibold">
                          {formatBlogType(blog.category)}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {getBlogTimeAgo(blog.date) ? (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {getBlogTimeAgo(blog.date)}
                        </span>
                      </div>
                    ) : null}

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#fdb813] transition-colors duration-300">
                      {blog.main_title}
                    </h2>
                    
                    <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {blog.description1}
                    </p>

                    <div className="flex flex-wrap items-center justify-end gap-y-3 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 text-[#fdb813] font-semibold text-sm group-hover:gap-2 transition-all">
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-10 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-black/80 mb-6">
              Get the latest travel tips and destination guides delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border-0 focus:ring-2 focus:ring-black/20 outline-none"
              />
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-black/80 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}