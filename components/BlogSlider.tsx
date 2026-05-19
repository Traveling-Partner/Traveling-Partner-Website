// components/BlogSlider.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CircularIndeterminate from "./loader";
import { websiteApiUrl } from "@/lib/websiteApiUrl";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import {
  formatBlogType,
  getBlogTimeAgo,
  pickBlogCategoryField,
  pickBlogDateField,
} from "@/lib/blogFormat";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
}

const mapBlog = (item: any): Blog => ({
  id: item?.id ?? item?.blog_id ?? "",
  cover_image: item?.cover_image ?? item?.coverImage ?? item?.image ?? "",
  main_title: item?.main_title ?? item?.mainTitle ?? item?.title ?? "Untitled",
  description1: item?.description1 ?? item?.description ?? item?.short_description ?? "",
  date: pickBlogDateField(item),
  category: pickBlogCategoryField(item),
});

const extractBlogList = (payload: any): any[] => {
  if (Array.isArray(payload?.data?.content)) return payload.data.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.blogs)) return payload.data.blogs;
  return [];
};

const getImageSrc = (value: string): string => {
  const src = String(value || "").trim();
  if (!src) return "/mock-images/blog-cover.svg";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return optimizeCloudinaryImage(src, 900, 72);
  }
  return "/mock-images/blog-cover.svg";
};

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="!absolute !top-1/2 !-translate-y-1/2 !left-[-44px] xl:!left-[-56px] z-20 w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-black/[0.04] flex items-center justify-center hover:shadow-[0_8px_32px_rgba(0,0,0,0.16)] hover:scale-105 active:scale-95 transition-all duration-300 group"
    aria-label="Previous slide"
    style={{ position: "absolute" }}
  >
    <svg
      className="w-[18px] h-[18px] text-gray-600 group-hover:text-black transition-colors duration-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="!absolute !top-1/2 !-translate-y-1/2 !right-[-44px] xl:!right-[-56px] z-20 w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-black/[0.04] flex items-center justify-center hover:shadow-[0_8px_32px_rgba(0,0,0,0.16)] hover:scale-105 active:scale-95 transition-all duration-300 group"
    aria-label="Next slide"
    style={{ position: "absolute" }}
  >
    <svg
      className="w-[18px] h-[18px] text-gray-600 group-hover:text-black transition-colors duration-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const BlogCard = ({ blog }: { blog: Blog }) => {
  const timeAgo = getBlogTimeAgo(blog.date);

  return (
  <Link href={`/blog/${blog.id}`} className="block h-full">
    <motion.article
      className="group relative bg-white rounded-[22px] overflow-hidden h-full flex flex-col will-change-transform"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={getImageSrc(blog.cover_image)}
          alt={blog.main_title}
          fill
          className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 85vw, 380px"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {blog.category && formatBlogType(blog.category) ? (
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4">
            <span className="inline-flex bg-[#fce001] text-black text-[10.5px] sm:text-[11px] font-semibold px-2.5 py-[5px] rounded-full shadow-sm">
              {formatBlogType(blog.category)}
            </span>
          </div>
        ) : null}

        {timeAgo ? (
          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4">
            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-[10.5px] sm:text-[11px] font-semibold text-gray-800 pl-2 pr-2.5 py-[5px] rounded-full shadow-sm border border-white/60">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {timeAgo}
            </span>
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <h3 className="text-[15px] sm:text-base font-bold text-gray-900 leading-[1.4] line-clamp-2 mb-2 sm:mb-2.5 group-hover:text-[#fdb813] transition-colors duration-300">
          {blog.main_title}
        </h3>

        <p className="text-[12.5px] sm:text-[13px] text-gray-500 leading-[1.65] line-clamp-2 mb-auto">
          {blog.description1}
        </p>

        {/* Read More Button */}
        <div className="pt-5 mt-5 border-t border-gray-100">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fce001] to-[#fdb813] px-5 py-2.5 rounded-full text-[13px] sm:text-sm font-semibold text-black shadow-[0_2px_8px_rgba(253,184,19,0.3)] group-hover:shadow-[0_6px_20px_rgba(253,184,19,0.45)] group-hover:scale-[1.03] transition-all duration-300">
            Read More
            <svg
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Border ring */}
      <div className="absolute inset-0 rounded-[22px] ring-1 ring-inset ring-black/[0.03] group-hover:ring-black/[0.06] transition-all duration-500 pointer-events-none" />
    </motion.article>
  </Link>
  );
};

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://api.traveling-partner.com/api/website/blog/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blogs. Status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Blog slider API response:", json);

        const rawList = extractBlogList(json);
        const mappedBlogs = rawList.map(mapBlog).filter((blog: Blog) => blog.id);
        setBlogs(mappedBlogs);
      } catch (err) {
        console.error("Error while fetching slider blogs:", err);
        setError("Unable to load blogs right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    cssEase: "cubic-bezier(0.45, 0, 0.15, 1)",
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    arrows: !isMobile,
    swipeToSlide: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
    <div className="w-full max-w-full min-w-0 relative blog-slider">
      <style jsx global>{`
        .blog-slider .slick-slider {
          overflow: visible;
        }
        .blog-slider .slick-list {
          overflow: hidden !important;
          margin: 0 -12px;
          padding: 12px 0 24px;
        }
        .blog-slider .slick-track {
          display: flex !important;
          align-items: stretch !important;
        }
        .blog-slider .slick-slide {
          height: auto !important;
          display: flex !important;
          padding: 0 12px;
        }
        .blog-slider .slick-slide > div {
          height: 100%;
          width: 100%;
          display: flex;
        }
        .blog-slider .slick-dots {
          position: relative;
          bottom: 0;
          margin-top: 2rem;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 0;
          list-style: none;
        }
        .blog-slider .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
          display: flex;
          align-items: center;
        }
        .blog-slider .slick-dots li button {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.12);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .blog-slider .slick-dots li button::before {
          display: none !important;
        }
        .blog-slider .slick-dots li.slick-active button {
          width: 36px;
          height: 8px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 100px;
        }
        @media (max-width: 1024px) {
          .blog-slider .slick-list {
            margin: 0 -6px;
            padding: 8px 0 18px;
          }
          .blog-slider .slick-slide {
            padding: 0 6px;
          }
          .blog-slider .slick-dots {
            margin-top: 1.5rem;
            gap: 5px;
          }
          .blog-slider .slick-dots li button {
            width: 7px;
            height: 7px;
          }
          .blog-slider .slick-dots li.slick-active button {
            width: 28px;
            height: 7px;
          }
        }
      `}</style>

      <Slider ref={sliderRef} {...settings}>
        {blogs.map((blog) => (
          <div className="h-full" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;
