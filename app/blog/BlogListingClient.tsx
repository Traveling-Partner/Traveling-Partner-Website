// app/blog/BlogListingClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: string;
  author?: string;
  readTime?: string;
  category?: string;
}

const allBlogs: Blog[] = [
  {
    id: 1,
    cover_image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    main_title: "Top 10 Hidden Gems to Explore in Europe This Summer",
    description1: "Discover the most breathtaking off-the-beaten-path destinations in Europe that will make your summer vacation unforgettable.",
    date: "Jan 15, 2024",
    author: "Sarah Mitchell",
    readTime: "5 min read",
    category: "Travel Guide"
  },
  {
    id: 2,
    cover_image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    main_title: "How to Travel Sustainably: A Complete Guide for Eco-Conscious Travelers",
    description1: "Learn practical tips and tricks to reduce your carbon footprint while exploring the world.",
    date: "Jan 12, 2024",
    author: "James Chen",
    readTime: "8 min read",
    category: "Sustainable Travel"
  },
  {
    id: 3,
    cover_image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
    main_title: "Solo Travel: Embracing the Journey of Self-Discovery",
    description1: "Why traveling alone might be the best decision you ever make. Tips for staying safe and creating memories.",
    date: "Jan 10, 2024",
    author: "Emma Rodriguez",
    readTime: "6 min read",
    category: "Solo Travel"
  },
  {
    id: 4,
    cover_image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    main_title: "Budget Travel Hacks: See the World Without Breaking the Bank",
    description1: "Expert strategies for affordable accommodation, cheap flights, and local experiences.",
    date: "Jan 8, 2024",
    author: "Michael Park",
    readTime: "7 min read",
    category: "Budget Travel"
  },
  {
    id: 5,
    cover_image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    main_title: "The Ultimate Road Trip Guide: Routes You Can't Miss",
    description1: "From coastal highways to mountain passes, discover the most scenic driving routes around the world.",
    date: "Jan 5, 2024",
    author: "Lisa Thompson",
    readTime: "10 min read",
    category: "Road Trip"
  },
  {
    id: 6,
    cover_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    main_title: "Beach Paradise: World's Most Beautiful Coastal Destinations",
    description1: "Explore pristine beaches and crystal-clear waters at these breathtaking coastal getaways.",
    date: "Jan 3, 2024",
    author: "Anna Wilson",
    readTime: "6 min read",
    category: "Beach"
  }
];

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdb813]"></div>
  </div>
);

export default function BlogListingClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlogs(allBlogs);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", ...Array.from(new Set(allBlogs.map(blog => blog.category).filter((cat): cat is string => cat !== undefined)))];
  
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="w-[85%] mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            <span className="text-black text-sm font-semibold uppercase tracking-wider">Travel Stories</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
            Our <span className="text-white drop-shadow-md">Blog</span>
          </h1>
          <div className="w-32 h-1.5 bg-white rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-black/80 max-w-2xl mx-auto">
            Discover travel tips, destination guides, and inspiring stories from our community of explorers.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="w-[85%] mx-auto max-w-7xl py-8">
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
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <div className="w-[85%] mx-auto max-w-7xl pb-20">
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
                    src={blog.cover_image}
                    alt={blog.main_title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#fce001] text-black px-3 py-1 rounded-full text-xs font-semibold">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#fdb813] transition-colors duration-300">
                    {blog.main_title}
                  </h2>
                  
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                    {blog.description1}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#fce001] to-[#fdb813] flex items-center justify-center text-black font-bold text-sm">
                        {blog.author?.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                    </div>
                    
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

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
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