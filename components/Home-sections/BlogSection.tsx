// components/Home-sections/BlogSection.tsx
"use client";
import React, { Suspense } from "react";
import BlogSlider from "../BlogSlider";

export default function BlogSection(): React.ReactElement {
  return (
    <div className="w-full bg-gradient-to-b from-[#fce001] to-[#fdb813] py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[85%] mx-auto max-w-7xl relative z-10 max-md:w-full max-md:px-4">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-6">
            <svg
              className="w-4 h-4 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-black text-sm font-semibold uppercase tracking-wider">
              Latest Updates
            </span>
          </div>

          <h1 className="uppercase text-[50px] font-bold text-black max-md:text-[30px]">
            Our <span className="text-white drop-shadow-md">Blog</span> And News
          </h1>
          <div className="w-32 h-1.5 bg-white rounded-full mx-auto mt-4"></div>

          <p className="text-base text-black/80 mt-6 max-w-2xl mx-auto max-md:px-4 leading-relaxed">
            Explore travel tales, tips, and updates from our community. Get
            inspired and join the journey today! From breathtaking landscapes to
            hidden gems, let's make memories together.
          </p>
        </div>

        <div className="flex justify-center">
          <Suspense
            fallback={<div className="text-center p-4">Loading...</div>}
          >
            <BlogSlider />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
