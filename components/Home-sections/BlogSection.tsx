// components/Home-sections/BlogSection.tsx
"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const BlogSlider = dynamic(() => import("../BlogSlider"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fdb813]"></div>
    </div>
  ),
});

export default function BlogSection(): React.ReactElement {
  return (
    <section className="w-full bg-gradient-to-b from-[#fce001] via-[#ffd81d] to-[#fdb813] py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-5 sm:mb-6 backdrop-blur-[2px]">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Latest Updates
            </span>
          </div>

          <h1 className="uppercase text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-bold text-black tracking-tight leading-[1.1]">
            Our <span className="text-white drop-shadow-md">Blog</span> And News
          </h1>
          <div className="w-16 sm:w-24 md:w-32 h-1.5 bg-white rounded-full mx-auto mt-3 sm:mt-4"></div>

          <p className="text-sm sm:text-base text-black/70 mt-4 sm:mt-6 max-w-xl mx-auto leading-relaxed">
            Explore travel tales, tips,  and updates from our community. Get
            inspired and join the journey today! From breathtaking landscapes to
            hidden gems, let&apos;s make memories together.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="w-full min-w-0"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense
            fallback={<div className="text-center p-4">Loading...</div>}
          >
            <BlogSlider />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
