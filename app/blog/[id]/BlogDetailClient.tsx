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

const fakeBlogsDetail: Record<string | number, Blog> = {
  1: {
    id: 1,
    cover_image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    main_title: "Top 10 Hidden Gems to Explore in Europe This Summer",
    description1: "Europe is a continent that never fails to enchant travelers with its rich history, diverse cultures, and stunning landscapes.",
    description2: "From the fairy-tale villages of the Czech Republic to the pristine beaches of Albania, this comprehensive guide will take you through ten extraordinary destinations that promise authentic experiences away from the tourist crowds.",
    date: "Jan 15, 2024",
    author: "Sarah Mitchell",
    readTime: "5 min read",
    tags: ["Europe", "Summer Travel", "Hidden Gems"]
  },
  2: {
    id: 2,
    cover_image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    main_title: "How to Travel Sustainably: A Complete Guide for Eco-Conscious Travelers",
    description1: "Sustainable travel is no longer just a trend—it's a necessity.",
    description2: "In this guide, we'll explore practical ways to reduce your carbon footprint while exploring the world.",
    date: "Jan 12, 2024",
    author: "James Chen",
    readTime: "8 min read",
    tags: ["Sustainable Travel", "Eco-Friendly"]
  },
  3: {
    id: 3,
    cover_image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&q=80",
    main_title: "Solo Travel: Embracing the Journey of Self-Discovery",
    description1: "There's a unique kind of magic that happens when you travel alone.",
    description2: "Solo travel isn't just about seeing new places—it's about discovering yourself.",
    date: "Jan 10, 2024",
    author: "Emma Rodriguez",
    readTime: "6 min read",
    tags: ["Solo Travel", "Adventure"]
  },
  4: {
    id: 4,
    cover_image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
    main_title: "Budget Travel Hacks: See the World Without Breaking the Bank",
    description1: "Dreaming of far-off destinations but worried about the cost?",
    description2: "This guide reveals the secrets of budget travel that experienced backpackers have been using for years.",
    date: "Jan 8, 2024",
    author: "Michael Park",
    readTime: "7 min read",
    tags: ["Budget Travel", "Money Saving"]
  },
  5: {
    id: 5,
    cover_image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80",
    main_title: "The Ultimate Road Trip Guide: Routes You Can't Miss",
    description1: "There's something inherently liberating about hitting the open road.",
    description2: "From the dramatic coastal cliffs of Big Sur to the winding mountain passes of the Swiss Alps.",
    date: "Jan 5, 2024",
    author: "Lisa Thompson",
    readTime: "10 min read",
    tags: ["Road Trip", "Adventure"]
  }
};

const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdb813]"></div>
  </div>
);

export default function BlogDetailClient({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundBlog = fakeBlogsDetail[id] || fakeBlogsDetail[1];
      setBlog(foundBlog);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fce001]/10 to-white">
        <Loader />
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