// app/components/BlogSlider.tsx
"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
// import axios from "axios";
import CircularIndeterminate from "./loader";

interface Blog {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
}

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     axios
//       .get("https://api.traveling-partner.com/api/blogs")
//       .then((response) => {
//         setBlogs(response.data.Blogs);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
      <div className="flex justify-center items-center py-10">
        <CircularIndeterminate />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="w-[90%] mx-auto py-5 max-md:w-[95%]">
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div className="px-2.5" key={blog.id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="w-full h-[200px] relative">
                <Image
                  src={blog.cover_image}
                  alt={blog.main_title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center bg-white rounded-b-xl -mt-3 relative">
                <h1 className="text-xl font-semibold px-2.5 pt-5 pb-2.5 line-clamp-2">
                  {blog.main_title}
                </h1>
                <p className="text-base px-2.5 line-clamp-3 text-gray-600">
                  {blog.description1}
                </p>
                <div className="py-5 px-5 flex justify-center">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-2.5 text-black no-underline text-base font-medium hover:shadow-md transition-shadow"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;