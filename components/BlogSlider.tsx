// components/BlogSlider.tsx
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import CircularIndeterminate from "./loader";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: string;
  author?: string;
  readTime?: string;
}

// Fake blog data for demonstration
const fakeBlogs: Blog[] = [
  {
    id: 1,
    cover_image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    main_title: "Top 10 Hidden Gems to Explore in Europe This Summer",
    description1:
      "Discover the most breathtaking off-the-beaten-path destinations in Europe that will make your summer vacation unforgettable.",
    date: "Jan 15, 2024",
    author: "Sarah Mitchell",
    readTime: "5 min read",
  },
  {
    id: 2,
    cover_image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    main_title:
      "How to Travel Sustainably: A Complete Guide for Eco-Conscious Travelers",
    description1:
      "Learn practical tips and tricks to reduce your carbon footprint while exploring the world.",
    date: "Jan 12, 2024",
    author: "James Chen",
    readTime: "8 min read",
  },
  {
    id: 3,
    cover_image:
      "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
    main_title: "Solo Travel: Embracing the Journey of Self-Discovery",
    description1:
      "Why traveling alone might be the best decision you ever make. Tips for staying safe and creating memories.",
    date: "Jan 10, 2024",
    author: "Emma Rodriguez",
    readTime: "6 min read",
  },
  {
    id: 4,
    cover_image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    main_title: "Budget Travel Hacks: See the World Without Breaking the Bank",
    description1:
      "Expert strategies for affordable accommodation, cheap flights, and local experiences.",
    date: "Jan 8, 2024",
    author: "Michael Park",
    readTime: "7 min read",
  },
  {
    id: 5,
    cover_image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80",
    main_title: "The Ultimate Road Trip Guide: Routes You Can't Miss",
    description1:
      "From coastal highways to mountain passes, discover the most scenic driving routes around the world.",
    date: "Jan 5, 2024",
    author: "Lisa Thompson",
    readTime: "10 min read",
  },
];

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call with fake data
    const timer = setTimeout(() => {
      setBlogs(fakeBlogs);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors mt-4"></div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularIndeterminate />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="w-full py-5">
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div className="px-3" key={blog.id}>
            {/* Link wraps the entire card - points to /blog/[id] */}
            <Link href={`/blog/${blog.id}`}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full">
                <div className="w-full h-[220px] relative overflow-hidden">
                  <Image
                    src={blog.cover_image}
                    alt={blog.main_title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6 relative">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#fdb813] transition-colors duration-300">
                    {blog.main_title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {blog.description1}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900">
                      {blog.author}
                    </span>
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fce001] to-[#fdb813] px-5 py-2 rounded-full text-sm font-semibold text-black hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      Read More
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;
