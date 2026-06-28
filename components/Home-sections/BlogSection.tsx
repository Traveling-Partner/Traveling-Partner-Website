// components/Home-sections/BlogSection.tsx
"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HOME_ACCENT_TEXT,
  HOME_SECTION_HEADING,
  HOME_SECTION_HEADER_WRAP,
  HOME_SECTION_SUBTEXT,
  HOME_SECTION_SUBTEXT_WRAP,
} from "@/lib/homeSectionStyles";

/** Figma blog section — node 124:3829 */
const SECTION_COPY =
  "Discover a journal of success stories and insightful case studies that illuminate the journey of Pakistan's mobility revolution.";

const accentClass = HOME_ACCENT_TEXT;

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
          className={HOME_SECTION_HEADER_WRAP.replace("mb-10", "mb-[48px]").replace("sm:mb-12", "sm:mb-[56px]").replace("lg:mb-14", "lg:mb-[64px]")}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="blog-section-heading"
            className={`${HOME_SECTION_HEADING} text-white`}
          >
            Our blogs and <span className={HOME_ACCENT_TEXT}>news.</span>
          </h2>

          <p className={`${HOME_SECTION_SUBTEXT_WRAP} ${HOME_SECTION_SUBTEXT} text-white/80`}>
            {SECTION_COPY}
          </p>
        </motion.div>

        <motion.div
          className="w-full min-w-0 overflow-visible sm:w-[calc(100%+2.5rem)] sm:-mx-5 lg:w-[calc(100%+4rem)] lg:-mx-8 xl:w-[calc(100%+5rem)] xl:-mx-10"
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
