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
import HeroMobileSection from "@/components/Home-sections/HeroMobileSection";

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

function ViewServicesButtonCompact({
  className = "",
}: {
  className?: string;
}): React.ReactElement {
  return (
    <Link
      href="#services"
      className={`group inline-flex h-[54px] items-center gap-3 rounded-[100px] border border-[#0b0b0b] bg-[#0b0b0b] py-2 pl-7 pr-2.5 shadow-[0_8px_24px_rgba(11,11,11,0.18)] transition-all duration-300 hover:border-[#fce001] hover:bg-gradient-to-b hover:from-[#fce001] hover:to-[#fdb813] sm:h-[56px] sm:gap-3 sm:pl-[27px] sm:pr-[9px] ${className}`}
    >
      <span className="whitespace-nowrap font-poppins text-[15px] font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#0b0b0b] sm:text-sm">
        View Services
      </span>
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[15px] font-bold leading-none text-[#0b0b0b] transition-all duration-300 group-hover:from-[#0b0b0b] group-hover:to-[#0b0b0b] group-hover:text-[#fce001] sm:h-[38px] sm:w-[38px] sm:text-[15px]">
        →
      </span>
    </Link>
  );
}

function HeroHeadline({
  className = "",
  size = "mobile",
  align = "left",
}: {
  className?: string;
  size?: "mobile" | "tablet";
  align?: "left" | "center";
}): React.ReactElement {
  const mobileSize = "clamp(1.75rem, 8.2vw, 2.125rem)";
  const tabletSize = "clamp(1.85rem, 4.2vw, 2.75rem)";
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <h1
      className={`font-poppins font-semibold leading-[0.98] tracking-[-0.03em] ${alignClass} ${className}`}
      style={{ fontSize: size === "tablet" ? tabletSize : mobileSize }}
    >
      <span className="block text-[#fdb813]">One app,</span>
      <span className="block text-[#0b0b0b]">Every way</span>
      <span className="block text-[#0b0b0b]">to move.</span>
    </h1>
  );
}

function HeroSubtext({
  className = "",
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}): React.ReactElement {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div
      className={`font-poppins text-[13px] leading-[1.55] text-[#6f6e68] sm:text-[14px] sm:leading-[1.57] ${alignClass} ${className}`}
    >
      <p>
        Work in the morning. A pickup from the airport. A parcel that needs to get
        across town. Or maybe you&apos;re just heading out of the city for the
        weekend. Traveling Partner is a ride hailing app in Pakistan that puts you
        in touch with verified drivers, at fair prices you can actually see
        upfront, with real-time tracking the whole way.
      </p>
    </div>
  );
}

function HeroManWithCard({
  className = "",
  maxWidth = "360px",
  variant = "default",
}: {
  className?: string;
  maxWidth?: string;
  variant?: "default" | "mobile";
}): React.ReactElement {
  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative mx-auto w-full overflow-hidden ${
        isMobile ? "aspect-[585/652]" : "aspect-[585/812]"
      } ${className}`}
      style={{ maxWidth }}
    >
      <Image
        src="/images/hero-man-figma-new.png"
        alt="Traveling Partner app user"
        fill
        priority
        className={
          isMobile
            ? "object-cover"
            : "object-cover object-[42%_18%]"
        }
        style={
          isMobile
            ? {
                objectPosition: "66% 0%",
                transform: "scale(1.34) translateX(23%)",
                transformOrigin: "68% 9%",
              }
            : undefined
        }
        sizes={
          isMobile
            ? "(max-width: 768px) 92vw, 400px"
            : "(max-width: 1024px) 45vw, 400px"
        }
      />
      <div
        className={
          isMobile
            ? "absolute bottom-[5%] left-[1.5%] z-[3] w-[65%] max-w-[258px]"
            : "absolute bottom-[6%] left-0 w-[58%] max-w-[220px]"
        }
      >
        <Image
          src="/images/hero-active-drivers-card.png"
          alt="2,847 active drivers, up 12.4 percent"
          width={378}
          height={253}
          className="h-auto w-full drop-shadow-[0_12px_40px_rgba(11,11,11,0.1)]"
          priority
        />
      </div>
      {isMobile ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[118px]" aria-hidden>
          <div
            className="absolute inset-0 backdrop-blur-[11.95px]"
            style={{
              ...heroBottomFadeStyle,
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.28) 22%, black 68%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.28) 22%, black 68%)",
            }}
          />
        </div>
      ) : null}
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
              <span className="block whitespace-nowrap">One app,</span>
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
              <span className="block whitespace-nowrap">Every way</span>
              <span className="block whitespace-nowrap">to move.</span>
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
              <p>
                Work in the morning. A pickup from the airport. A parcel that needs
                to get across town. Or maybe you&apos;re just heading out of the city
                for the weekend. Traveling Partner is a ride hailing app in Pakistan
                that puts you in touch with verified drivers, at fair prices you can
                actually see upfront, with real-time tracking the whole way.
              </p>
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

        {/* Tablet — 768px to 1023px */}
        <div className="relative hidden min-h-0 overflow-hidden px-6 pb-8 pt-[100px] md:block lg:hidden">
          <div className="mx-auto flex max-w-[430px] flex-col items-center">
            <div className="flex w-full max-w-[350px] flex-col items-center text-center">
              <HeroHeadline size="tablet" align="center" />
              <HeroSubtext className="mt-4 max-w-[318px]" align="center" />
              <div className="mt-5">
                <ViewServicesButtonCompact />
              </div>
            </div>
            <div className="-mx-6 mt-7 w-[calc(100%+48px)]">
              <HeroManWithCard maxWidth="100%" variant="mobile" />
            </div>
          </div>
        </div>

        {/* Phone — Figma mobile 390px frame */}
        <HeroMobileSection />
      </div>
    </HeroBackgroundRoot>
  );
}
