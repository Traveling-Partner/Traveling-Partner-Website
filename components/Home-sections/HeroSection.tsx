"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HERO_FRAME_HEIGHT,
  HERO_FRAME_WIDTH,
  HERO_HEADER_OFFSET_PX,
  heroBottomFadeStyle,
} from "@/lib/heroBackground";
import { HeroBackgroundRoot } from "@/components/Home-sections/HeroBackground";

const FW = HERO_FRAME_WIDTH;
const FH = HERO_FRAME_HEIGHT;

const pct = (px: number, base: number) => `${(px / base) * 100}%`;

/** Figma Component 2 — 124:3588 (267.09 × 81.45) */
function ViewServicesButton({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  return (
    <Link
      href="#services"
      className={`group relative box-border flex h-full w-full items-center gap-[21.5cqh] rounded-[100px] border-[1.78cqh] border-[#0b0b0b] bg-[#0b0b0b] pl-[14.7cqw] pr-[4.9cqw] transition-all duration-300 hover:border-[#fce001] hover:bg-gradient-to-b hover:from-[#fce001] hover:to-[#fdb813] ${className}`}
    >
      <span className="whitespace-nowrap font-poppins text-[25cqh] font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#0b0b0b]">
        View Services
      </span>
      <span className="flex h-[67.9cqh] w-[67.9cqh] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[26.8cqh] font-bold leading-none text-[#0b0b0b] transition-all duration-300 group-hover:from-[#0b0b0b] group-hover:to-[#0b0b0b] group-hover:text-[#fce001]">
        →
      </span>
    </Link>
  );
}

/** Mobile — Figma 43:779 (184 × 56) */
function ViewServicesButtonMobile(): React.ReactElement {
  return (
    <Link
      href="#services"
      className="group relative inline-flex h-[56px] items-center gap-3 rounded-[100px] border border-[#0b0b0b] bg-[#0b0b0b] py-[9px] pl-[27px] pr-[9px] transition-all duration-300 hover:border-[#fce001] hover:bg-gradient-to-b hover:from-[#fce001] hover:to-[#fdb813]"
    >
      <span className="whitespace-nowrap font-poppins text-sm font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#0b0b0b]">
        View Services
      </span>
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[15px] font-bold leading-none text-[#0b0b0b] transition-all duration-400 group-hover:from-[#0b0b0b] group-hover:to-[#0b0b0b] group-hover:text-[#fce001]">
        →
      </span>
    </Link>
  );
}

export default function HeroSection(): React.ReactElement {
  return (
    <HeroBackgroundRoot className="w-full">
      <div className="relative mx-auto w-full max-w-[1920px] overflow-hidden">
        {/* Figma canvas 1920 × 1136 */}
        <div
          className="relative mx-auto hidden w-full overflow-hidden md:block"
          style={{ height: 0, paddingBottom: pct(FH, FW) }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {/* Man — Figma mask group 124:3566 */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: pct(346.18, FW),
                top: pct(323.09, FH),
                width: pct(584.73, FW),
                height: pct(811.64, FH),
              }}
            >
              <Image
                src="/images/hero-man-figma-new.png"
                alt="Traveling Partner app user"
                width={967}
                height={1209}
                priority
                className="pointer-events-none absolute max-w-none object-cover"
                style={{
                  left: pct(-152.73, 584.73),
                  top: pct(-84.36, 811.64),
                  width: pct(966.98, 584.73),
                  height: pct(1208.73, 811.64),
                }}
                sizes="(max-width: 1920px) 35vw, 585px"
              />
            </div>

            {/* Get to your — Figma 124:3586 */}
            <h1
              className="absolute -translate-y-1/2 font-poppins font-semibold text-[#fdb813]"
              style={{
                left: pct(558.55, FW),
                top: pct(256.73, FH),
                width: pct(865.45, FW),
                fontSize: "clamp(52px, 6.97vw, 133.82px)",
                lineHeight: "0.98",
                letterSpacing: "-4.68px",
              }}
            >
              <span className="block whitespace-nowrap">Get to your</span>
            </h1>

            {/* destination, safe & secure. — Figma 124:3587 */}
            <h1
              className="absolute -translate-y-1/2 font-poppins font-semibold text-[#0b0b0b]"
              style={{
                left: pct(919, FW),
                top: pct(551, FH),
                width: pct(865.45, FW),
                fontSize: "clamp(52px, 6.97vw, 133.82px)",
                lineHeight: "0.98",
                letterSpacing: "-4.68px",
              }}
            >
              <span className="block whitespace-nowrap">destination,</span>
              <span className="block whitespace-nowrap">safe &amp;</span>
              <span className="block whitespace-nowrap">secure.</span>
            </h1>

            {/* Subtext — Figma 124:3570 */}
            <div
              className="absolute -translate-y-1/2 font-poppins text-[#6f6e68]"
              style={{
                left: pct(930.91, FW),
                top: pct(826, FH),
                width: pct(560, FW),
                fontSize: "clamp(14px, 1.14vw, 21.82px)",
                lineHeight: "1.55",
              }}
            >
              <p className="mb-0">Pakistan&apos;s smarter ride partner. Zero commission,</p>
              <p className="mb-0">verified drivers, real-time tracking — built for the</p>
              <p>daily commuter.</p>
            </div>

            {/* Active drivers card — Figma 124:3571 */}
            <div
              className="absolute z-[2]"
              style={{
                left: pct(193.45, FW),
                bottom: pct(65.27, FH),
                width: pct(378.18, FW),
              }}
            >
              <Image
                src="/images/hero-active-drivers-card.png"
                alt="2,847 active drivers, up 12.4 percent"
                width={378}
                height={253}
                className="h-auto w-full drop-shadow-[0_23px_70px_rgba(11,11,11,0.1),0_6px_17px_rgba(11,11,11,0.06)]"
                priority
              />
            </div>

            {/* Bottom fade — Figma 124:3569 (cream only, no gray filter bleed) */}
            <div
              className="pointer-events-none absolute inset-x-0 z-[1]"
              style={{
                top: pct(980, FH),
                height: pct(155, FH),
              }}
              aria-hidden
            >
              <div
                className="absolute inset-0 backdrop-blur-[11.95px]"
                style={{
                  ...heroBottomFadeStyle,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, black 40%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 18%, black 40%)",
                }}
              />
            </div>

            {/* View Services — Figma 124:3588 */}
            <div
              className="absolute z-[2] [container-type:size]"
              style={{
                right: pct(93.73, FW),
                bottom: pct(100.0, FH),
                width: pct(267.09, FW),
                height: pct(81.45, FH),
              }}
            >
              <ViewServicesButton />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div
          className="flex flex-col gap-5 overflow-x-hidden px-4 pb-10 sm:px-6 md:hidden"
          style={{ paddingTop: `${HERO_HEADER_OFFSET_PX}px` }}
        >
          <h1
            className="font-poppins font-semibold leading-[0.98] tracking-[-0.035em]"
            style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
          >
            <span className="block whitespace-nowrap text-[#fdb813]">Get to your</span>
            <span className="block text-[#0b0b0b]">destination,</span>
            <span className="block text-[#0b0b0b]">safe &amp;</span>
            <span className="block text-[#0b0b0b]">secure.</span>
          </h1>

          <div className="font-poppins text-[15px] leading-[23px] text-[#6f6e68]">
            <p className="mb-0">Pakistan&apos;s smarter ride partner. Zero commission,</p>
            <p className="mb-0">verified drivers, real-time tracking — built for the</p>
            <p>daily commuter.</p>
          </div>

          <div className="relative mx-auto aspect-[585/812] w-full max-w-[360px]">
            <Image
              src="/images/hero-man-figma-new.png"
              alt="Traveling Partner app user"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "42% 18%" }}
              sizes="90vw"
            />
            <div className="absolute bottom-2 left-0 w-[62%] max-w-[220px]">
              <Image
                src="/images/hero-active-drivers-card.png"
                alt="2,847 active drivers, up 12.4 percent"
                width={378}
                height={253}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>

          <ViewServicesButtonMobile />
        </div>
      </div>
    </HeroBackgroundRoot>
  );
}
