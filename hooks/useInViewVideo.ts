"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplay muted looping video only while visible — pauses off-screen
 * to cut decode/GPU load when many card videos share a page.
 */
export function useInViewVideo(src?: string) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    const tryPlay = () => {
      void el.play().catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          if (el.preload !== "auto") el.preload = "auto";
          tryPlay();
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.15, 0.4], rootMargin: "80px 0px" },
    );

    io.observe(el);
    el.addEventListener("loadeddata", tryPlay);

    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", tryPlay);
      el.pause();
    };
  }, [src]);

  return videoRef;
}
