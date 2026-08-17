"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { useInViewVideo } from "@/hooks/useInViewVideo";

type MobileCardVideoProps = {
  src: string;
  mask: string;
  left: string;
  top: string;
  width: string;
  height: string;
  icon: string;
  title: string;
  subtitle: string;
};

/**
 * Looping muted video clipped to a card silhouette.
 * Labels sit OUTSIDE the mask (same pattern as desktop) so they
 * never duplicate with baked screenshot art.
 */
export default function MobileCardVideo({
  src,
  mask,
  left,
  top,
  width,
  height,
  icon,
  title,
  subtitle,
}: MobileCardVideoProps) {
  const videoRef = useInViewVideo(src);

  const frameStyle: CSSProperties = {
    left,
    top,
    width,
    height,
  };

  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${mask})`,
    maskImage: `url(${mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <>
      {/* Video only — no text inside the mask */}
      <div
        className="pointer-events-none absolute z-[5] overflow-hidden"
        style={{ ...frameStyle, ...maskStyle }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#121212]" />
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
      </div>

      {/* Single label layer — sibling of mask, never baked twice */}
      <div
        className="pointer-events-none absolute z-[6]"
        style={frameStyle}
        aria-hidden="true"
      >
        <div className="flex max-w-[92%] items-center gap-2 pl-[8%] pt-[8%]">
          <Image
            src={icon}
            alt=""
            width={48}
            height={48}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[14px] font-bold text-white sm:text-[15px]">
              {title}
            </p>
            <p className="truncate text-[11px] font-medium italic text-white/90 sm:text-[12px]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
