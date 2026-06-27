// components/Home-sections/BlogSection.tsx
"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";

/** Figma blog section — node 124:3829 */
const SECTION_COPY =
  "Discover a journal of success stories and insightful case studies that illuminate the journey of Pakistan's mobility revolution.";

const accentClass =
  "font-normal italic bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent";

const BlogSlider = dynamic(() => import("../BlogSlider"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fce001]" />
    </div>
  ),
});

export default function BlogSection(): React.ReactElement {
  return (
    <section
      className="relative w-full py-[72px] sm:py-[88px] lg:py-[104px]"
      aria-labelledby="blog-section-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/images/blog-section-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#0b0b0b]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(253,184,19,0.08),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1708px] px-5 sm:px-8 lg:px-12 xl:px-[106px]">
        <motion.div
          className="mb-[48px] text-center sm:mb-[56px] lg:mb-[64px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="blog-section-heading"
            className="font-poppins text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white"
          >
            Our blogs and <span className={accentClass}>news.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[692px] font-poppins text-[13px] font-normal leading-[1.65] text-white/80 sm:text-[14px] lg:mt-6 lg:text-[15px]">
            {SECTION_COPY}
          </p>
        </motion.div>

        <motion.div
          className="w-full min-w-0 overflow-visible"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="text-center p-4 text-white/70">Loading...</div>}>
            <BlogSlider />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
