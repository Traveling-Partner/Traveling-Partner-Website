"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HERO_FRAME_HEIGHT,
  HERO_FRAME_WIDTH,
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

function ViewServicesButtonCompact(): React.ReactElement {
  return (
    <Link
      href="#services"
      className="group inline-flex h-[52px] items-center gap-2.5 rounded-[100px] border border-[#0b0b0b] bg-[#0b0b0b] py-2 pl-6 pr-2 transition-all duration-300 hover:border-[#fce001] hover:bg-gradient-to-b hover:from-[#fce001] hover:to-[#fdb813] sm:h-[56px] sm:gap-3 sm:pl-[27px] sm:pr-[9px]"
    >
      <span className="whitespace-nowrap font-poppins text-[13px] font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#0b0b0b] sm:text-sm">
        View Services
      </span>
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[19px] bg-gradient-to-b from-[#fce001] to-[#fdb813] text-sm font-bold leading-none text-[#0b0b0b] transition-all duration-300 group-hover:from-[#0b0b0b] group-hover:to-[#0b0b0b] group-hover:text-[#fce001] sm:h-[38px] sm:w-[38px] sm:text-[15px]">
        →
      </span>
    </Link>
  );
}

function HeroHeadline({
  className = "",
  size = "mobile",
}: {
  className?: string;
  size?: "mobile" | "tablet";
}): React.ReactElement {
  const mobileSize = "clamp(1.65rem, 7.5vw, 2.35rem)";
  const tabletSize = "clamp(1.85rem, 4.2vw, 2.75rem)";

  return (
    <h1
      className={`font-poppins font-semibold leading-[0.98] tracking-[-0.03em] ${className}`}
      style={{ fontSize: size === "tablet" ? tabletSize : mobileSize }}
    >
      <span className="block text-[#fdb813]">Get to your</span>
      <span className="block text-[#0b0b0b]">destination,</span>
      <span className="block text-[#0b0b0b]">safe &amp;</span>
      <span className="block text-[#0b0b0b]">secure.</span>
    </h1>
  );
}

function HeroSubtext({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`font-poppins text-[14px] leading-[22px] text-[#6f6e68] sm:text-[15px] sm:leading-[23px] ${className}`}
    >
      <p className="mb-0">Pakistan&apos;s smarter ride partner. Zero commission,</p>
      <p className="mb-0">verified drivers, real-time tracking — built for the</p>
      <p>daily commuter.</p>
    </div>
  );
}

function HeroManWithCard({
  className = "",
  maxWidth = "360px",
}: {
  className?: string;
  maxWidth?: string;
}): React.ReactElement {
  return (
    <div
      className={`relative mx-auto aspect-[585/812] w-full ${className}`}
      style={{ maxWidth }}
    >
      <Image
        src="/images/hero-man-figma-new.png"
        alt="Traveling Partner app user"
        fill
        priority
        className="object-cover object-[42%_18%]"
        sizes="(max-width: 1024px) 45vw, 400px"
      />
      <div className="absolute bottom-[6%] left-0 w-[58%] max-w-[220px]">
        <Image
          src="/images/hero-active-drivers-card.png"
          alt="2,847 active drivers, up 12.4 percent"
          width={378}
          height={253}
          className="h-auto w-full drop-shadow-[0_12px_40px_rgba(11,11,11,0.1)]"
          priority
        />
      </div>
    </div>
  );
}

function HeroBottomFade({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 backdrop-blur-[11.95px]"
        style={{
          ...heroBottomFadeStyle,
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 70%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 70%)",
        }}
      />
    </div>
  );
}

export default function HeroSection(): React.ReactElement {
  return (
    <HeroBackgroundRoot className="w-full">
      <div className="relative mx-auto w-full max-w-[1920px] overflow-hidden">
        {/* Desktop — Figma canvas (1024px+) */}
        <div
          className="relative mx-auto hidden w-full overflow-hidden lg:block"
          style={{ height: 0, paddingBottom: pct(FH, FW) }}
        >
          <div className="absolute inset-0 overflow-hidden">
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

            <div
              className="pointer-events-none absolute inset-x-0 z-[1]"
              style={{ top: pct(980, FH), height: pct(155, FH) }}
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

            <div
              className="absolute z-[2] [container-type:size]"
              style={{
                right: pct(93.73, FW),
                bottom: pct(100, FH),
                width: pct(267.09, FW),
                height: pct(81.45, FH),
              }}
            >
              <ViewServicesButton />
            </div>
          </div>
        </div>

        {/* Tablet — 768px to 1023px (Galaxy Tab, iPad portrait) */}
        <div className="relative hidden min-h-0 overflow-hidden px-5 pb-8 pt-[92px] md:block lg:hidden sm:px-8 sm:pt-[100px]">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
              <HeroHeadline size="tablet" />
              <HeroSubtext />
              <ViewServicesButtonCompact />
            </div>
            <HeroManWithCard maxWidth="min(100%,320px)" className="max-h-[min(48vh,380px)]" />
          </div>
          <HeroBottomFade />
        </div>

        {/* Phone — below 768px */}
        <div className="relative flex flex-col gap-4 overflow-x-hidden px-4 pb-8 pt-[84px] sm:gap-5 sm:px-6 sm:pb-10 sm:pt-[92px] md:hidden">
          <div className="mx-auto w-full max-w-md text-center sm:text-left">
            <HeroHeadline size="mobile" />
            <HeroSubtext className="mt-3 sm:mt-4" />
          </div>

          <HeroManWithCard maxWidth="280px" className="sm:max-w-[320px]" />

          <div className="flex justify-center sm:justify-start">
            <ViewServicesButtonCompact />
          </div>

          <HeroBottomFade />
        </div>
      </div>
    </HeroBackgroundRoot>
  );
}
