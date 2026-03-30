// app/blog/[id]/BlogDetailClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  description2?: string;
  date?: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://45.55.78.67:8080";

const mapBlogDetail = (item: any): Blog => ({
  id: item?.id ?? item?.blog_id ?? "",
  cover_image: item?.cover_image ?? item?.coverImage ?? item?.image ?? "",
  main_title: item?.main_title ?? item?.mainTitle ?? item?.title ?? "Untitled",
  description1: item?.description1 ?? item?.description ?? item?.short_description ?? "",
  description2: item?.description2 ?? item?.content ?? item?.long_description ?? "",
  date: item?.date ?? item?.created_at ?? item?.createdAt ?? "",
  author: item?.author ?? item?.author_name ?? item?.authorName ?? "Admin",
  readTime: item?.readTime ?? item?.read_time ?? "5 min read",
  tags: Array.isArray(item?.tags) ? item.tags : [],
});

const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdb813]"></div>
  </div>
);

export default function BlogDetailClient({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/website/blog/view/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog detail. Status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Blog detail API response:", json);

        const rawBlog = json?.data ?? json;
        if (!rawBlog) {
          setBlog(null);
          return;
        }

        const mappedBlog = mapBlogDetail(rawBlog);
        setBlog(mappedBlog.id ? mappedBlog : null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Error while fetching blog detail:", err);
        setError("Unable to load this blog right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fce001]/10 to-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/blog" className="text-[#fdb813] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link href="/" className="text-[#fdb813] hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <Image src={blog.cover_image} alt={blog.main_title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <Link href="/" className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white hover:bg-white/30 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="w-[85%] mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag) => (
                <span key={tag} className="bg-[#fce001] text-black px-3 py-1 rounded-full text-sm font-semibold">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{blog.main_title}</h1>
            <div className="flex items-center gap-4 text-white/90 text-sm sm:text-base">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.author}
              </span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <article className="w-[85%] mx-auto max-w-4xl py-12 sm:py-16">
        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">{blog.description1}</p>
        {blog.description2 && <div className="text-gray-600 leading-relaxed whitespace-pre-line">{blog.description2}</div>}
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Share this article</h3>
          <div className="flex gap-3">
            {["Twitter", "Facebook", "LinkedIn"].map((social) => (
              <button key={social} className="px-4 py-2 bg-gray-100 hover:bg-[#fce001] rounded-full text-sm font-medium transition-colors">{social}</button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}