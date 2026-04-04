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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://45.55.78.67:8080";

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

// Custom Arrow Components
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="!absolute !left-0 sm:!left-1 xl:!left-[-60px] !top-1/2 !-translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#fce001] transition-colors duration-300 group"
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
    className="!absolute !right-0 sm:!right-1 xl:!right-[-60px] !top-1/2 !-translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gradient-to-r from-[#fce001] to-[#fdb813] transition-colors duration-300 group"
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

        const response = await fetch(`${API_BASE_URL}/api/website/blog/list`, {
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
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors mt-4"></div>
    ),
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
    <div className="w-full max-w-full min-w-0 py-5 relative px-3 sm:px-6 md:px-10 lg:px-12 xl:px-16 blog-slider">
      <style jsx global>{`
        .blog-slider .slick-track {
          display: flex !important;
          align-items: stretch !important;
        }
        .blog-slider .slick-slide {
          height: auto !important;
          display: flex !important;
        }
        .blog-slider .slick-slide > div {
          height: 100%;
          width: 100%;
        }
      `}</style>
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div className="px-3 h-full" key={blog.id}>
            <Link href={`/blog/${blog.id}`} className="block h-full">
              <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col">
                <div className="w-full h-[220px] relative overflow-hidden flex-shrink-0">
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
