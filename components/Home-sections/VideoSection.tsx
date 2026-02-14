"use client";
import React, { Suspense } from "react";
import VideoPlayer from "../VideoPlayer";

interface VideoSectionProps {
  title: string;
  videoSrc: string;
  posterSrc: string;
}

export default function VideoSection({ title, videoSrc, posterSrc }: VideoSectionProps): React.ReactElement {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#fce001]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#fdb813]/5 rounded-full blur-3xl translate-x-1/2"></div>

      {/* Section Header - Redesigned */}
      <div className="text-center py-10 lg:py-14 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-4">
          <svg 
            className="w-4 h-4 text-[#fdb813]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
            Tutorial
          </span>
        </div>

        <h2 className="uppercase text-[36px] lg:text-[44px] font-bold text-[#1a1a1a] leading-tight max-md:text-[26px]">
          {title}
        </h2>
        
        <div className="w-24 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4"></div>
        
        <p className="text-gray-600 text-base mt-4 max-w-xl mx-auto max-md:text-sm">
          Watch our step-by-step guide to get started quickly and easily
        </p>
      </div>

      {/* Video - Original full width, no changes */}
      <Suspense fallback={<div className="text-center p-4 bg-gray-100">Loading...</div>}>
        <VideoPlayer videoSrc={videoSrc} posterSrc={posterSrc} />
      </Suspense>
    </div>
  );
}