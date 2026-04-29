// components/BlogSlider.tsx
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import CircularIndeterminate from "./loader";
import { websiteApiUrl } from "@/lib/websiteApiUrl";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: string;
  author?: string;
  readTime?: string;
}

const mapBlog = (item: any): Blog => ({
  id: item?.id ?? item?.blog_id ?? "",
  cover_image: item?.cover_image ?? item?.coverImage ?? item?.image ?? "",
  main_title: item?.main_title ?? item?.mainTitle ?? item?.title ?? "Untitled",
  description1: item?.description1 ?? item?.description ?? item?.short_description ?? "",
  date: item?.date ?? item?.created_at ?? item?.createdAt ?? "",
  author: item?.author ?? item?.author_name ?? item?.authorName ?? "Admin",
  readTime: item?.readTime ?? item?.read_time ?? "5 min read",
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

// Custom Arrow Components
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="!absolute !left-1 sm:!left-2 xl:!left-[-20px] !top-1/2 !-translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 border border-black/5 shadow-lg flex items-center justify-center hover:bg-[#fce001] transition-colors duration-300 group"
    aria-label="Previous slide"
    style={{ position: "absolute" }}
  >
    <svg
      className="w-6 h-6 text-gray-800 group-hover:text-black"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="!absolute !right-1 sm:!right-2 xl:!right-[-20px] !top-1/2 !-translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 border border-black/5 shadow-lg flex items-center justify-center hover:bg-gradient-to-r from-[#fce001] to-[#fdb813] transition-colors duration-300 group"
    aria-label="Next slide"
    style={{ position: "absolute" }}
  >
    <svg
      className="w-6 h-6 text-gray-800 group-hover:text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(websiteApiUrl("/blog/list"), {
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
    speed: 2000,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
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
    <div className="w-full max-w-full min-w-0 py-5 relative px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 blog-slider overflow-hidden">
      <style jsx global>{`
        .blog-slider {
          scrollbar-width: none;
        }
        .blog-slider::-webkit-scrollbar {
          display: none;
        }
        .blog-slider .slick-slider,
        .blog-slider .slick-list,
        .blog-slider .slick-track,
        .blog-slider .slick-slide,
        .blog-slider .slick-slide > div {
          scrollbar-width: none;
        }
        .blog-slider .slick-slider::-webkit-scrollbar,
        .blog-slider .slick-list::-webkit-scrollbar,
        .blog-slider .slick-track::-webkit-scrollbar,
        .blog-slider .slick-slide::-webkit-scrollbar,
        .blog-slider .slick-slide > div::-webkit-scrollbar {
          display: none;
        }
        .blog-slider .slick-list {
          overflow: hidden !important;
          padding: 0.25rem 0 0.5rem;
          margin: 0 -0.15rem;
        }
        .blog-slider .slick-track {
          display: flex !important;
          align-items: stretch !important;
        }
        .blog-slider .slick-slide {
          height: auto !important;
          display: flex !important;
          padding-bottom: 0.35rem;
        }
        .blog-slider .slick-slide > div {
          height: 100%;
          width: 100%;
        }
        .blog-slider .slick-dots {
          position: relative;
          bottom: 0;
          margin-top: 0.75rem;
        }
        .blog-slider .slick-dots li {
          margin: 0 2px;
          width: 14px;
          height: 14px;
        }
        .blog-slider .slick-dots li button {
          width: 14px;
          height: 14px;
          padding: 0;
        }
        .blog-slider .slick-dots li button::before {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .blog-slider .slick-dots li.slick-active button::before {
          color: #ffffff;
          opacity: 1;
        }
      `}</style>
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div className="px-3 h-full" key={blog.id}>
            <Link href={`/blog/${blog.id}`} className="block h-full">
              <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col">
                <div className="w-full h-[220px] relative overflow-hidden flex-shrink-0">
                  <Image
                    src={getImageSrc(blog.cover_image)}
                    alt={blog.main_title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6 relative flex flex-col flex-grow">
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

                  <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#fdb813] transition-colors duration-300 min-h-[56px]">
                    {blog.main_title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-grow">
                    {blog.description1}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
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
