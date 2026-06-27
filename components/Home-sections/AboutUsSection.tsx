"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroBackgroundStyle } from "@/lib/heroBackground";

/** Figma About Us — section 124:3686 (1920 × 1198) */
const CONTAINER_MAX = 1707.6363525390625;
const LEFT_COL_W = 787.5831909179688;
const RIGHT_COL_W = 966.6965942382812;
const HEAD_W = 752.674072265625;
const BODY_MAX = 692;

/** Figma RIGHT composed visual — 124:3696 */
const CANVAS_W = 966.6965942382812;
const CANVAS_H = 952.181640625;

/** Figma Read our story CTA — Component 1 / 124:3695 */
const STORY_CTA_FIGMA = {
  padLeft: 22,
  padRight: 12,
  padY: 10,
  gap: 8,
  labelSize: 16,
  arrowSize: 36,
  arrowFont: 15,
};

const STORY_CTA_SCALE = 0.85;

function scaleStoryCta(value: number, extraScale = 1): number {
  return value * STORY_CTA_SCALE * extraScale;
}

const pct = (px: number, base: number) => `${(px / base) * 100}%`;

/** Figma Community pill — 124:3759 (inner layout) */
const COMMUNITY_PILL_FIGMA = {
  w: 414.823974609375,
  h: 87.1106948852539,
  padLeft: 30.61,
  padRight: 13.6,
  padY: 13.6,
  seeW: 124.211669921875,
  seeH: 59.90550994873047,
  labelSize: 17,
  seeSize: 16,
};

const COMMUNITY_PILL_POSITION = {
  left: "-10.89461%",
  top: "20.1821%",
  width: "48.0609%",
  height: "10.2464%",
};

const TOTAL_RIDES_POSITION = {
  left: "1.000004%",
  top: "72.469817%",
  width: "73.328967%",
  height: "29.976406%",
};

const REPORT_BADGE_POSITION = {
  left: "65.034%",
  top: "61.2972%",
  width: "28.3532%",
  height: "20.91694%",
};

const CHAT_BUBBLE_POSITION = {
  left: "86.3808%",
  top: "-6.57533%",
  width: "19.79451%",
  height: "20.92857%",
};

function CommunityInsightsButton(): React.ReactElement {
  return (
    <div
      className="absolute z-[25] [container-type:size]"
      style={COMMUNITY_PILL_POSITION}
    >
      <button
        type="button"
        className="flex h-full w-full items-center justify-between overflow-hidden rounded-[100px] bg-[#0b0b0b] font-poppins"
        style={{
          paddingLeft: `${(COMMUNITY_PILL_FIGMA.padLeft / COMMUNITY_PILL_FIGMA.w) * 100}cqw`,
          paddingRight: `${(COMMUNITY_PILL_FIGMA.padRight / COMMUNITY_PILL_FIGMA.w) * 100}cqw`,
          paddingTop: `${(COMMUNITY_PILL_FIGMA.padY / COMMUNITY_PILL_FIGMA.h) * 100}cqh`,
          paddingBottom: `${(COMMUNITY_PILL_FIGMA.padY / COMMUNITY_PILL_FIGMA.h) * 100}cqh`,
        }}
      >
        <span
          className="shrink-0 whitespace-nowrap font-semibold leading-none text-white"
          style={{
            fontSize: `${(COMMUNITY_PILL_FIGMA.labelSize / COMMUNITY_PILL_FIGMA.h) * 100}cqh`,
          }}
        >
          Community insights
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-[100px] bg-white font-semibold leading-none text-[#0b0b0b]"
          style={{
            width: `${(COMMUNITY_PILL_FIGMA.seeW / COMMUNITY_PILL_FIGMA.w) * 100}cqw`,
            height: `${(COMMUNITY_PILL_FIGMA.seeH / COMMUNITY_PILL_FIGMA.h) * 100}cqh`,
            fontSize: `${(COMMUNITY_PILL_FIGMA.seeSize / COMMUNITY_PILL_FIGMA.h) * 100}cqh`,
          }}
        >
          See →
        </span>
      </button>
    </div>
  );
}

const accentYellowClass =
  "bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent";

const ABOUT_BODY_P1 =
  "At Traveling Partner, our purpose is to revolutionize the landscape of mobility, creating a space where users can effortlessly connect and collaborate. By fostering a community-centric environment, our platform eliminates the financial burdens of additional fees, providing a dynamic hub for individuals to share rides, make deliveries, and plan trips collaboratively.";

const ABOUT_BODY_P2 =
  "Through transparency, user empowerment, and a commitment to a commission-free approach, we aim to redefine the very essence of travel and connectivity in Pakistan. Traveling Partner is not just an app; it's a movement towards a more connected, collaborative, and commission-free future for everyone.";

type FigmaRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

function canvasStyle({ x, y, w, h }: FigmaRect, zIndex: number): React.CSSProperties {
  return {
    left: pct(x, CANVAS_W),
    top: pct(y, CANVAS_H),
    width: pct(w, CANVAS_W),
    height: pct(h, CANVAS_H),
    zIndex,
  };
}

function LearnMoreButton(): React.ReactElement {
  const s = STORY_CTA_FIGMA;
  const mobileScale = 0.72;

  return (
    <>
      <Link
        href="/about"
        className="group relative hidden w-fit items-center justify-start overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(252,224,1,0.28)] lg:inline-flex"
        style={{
          paddingLeft: scaleStoryCta(s.padLeft),
          paddingRight: scaleStoryCta(s.padRight),
          paddingTop: scaleStoryCta(s.padY),
          paddingBottom: scaleStoryCta(s.padY),
          gap: scaleStoryCta(s.gap),
        }}
      >
        <span
          className="flex items-center whitespace-nowrap font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize) }}
        >
          Read our story
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] font-bold leading-none text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]"
          style={{
            width: scaleStoryCta(s.arrowSize),
            height: scaleStoryCta(s.arrowSize),
            fontSize: scaleStoryCta(s.arrowFont),
          }}
        >
          <span className="block translate-x-px leading-none">→</span>
        </span>
      </Link>

      <Link
        href="/about"
        className="group inline-flex w-fit items-center justify-start overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 lg:hidden"
        style={{
          paddingLeft: scaleStoryCta(s.padLeft, mobileScale),
          paddingRight: scaleStoryCta(s.padRight, mobileScale),
          paddingTop: scaleStoryCta(s.padY, mobileScale),
          paddingBottom: scaleStoryCta(s.padY, mobileScale),
          gap: scaleStoryCta(s.gap, mobileScale),
        }}
      >
        <span
          className="flex items-center whitespace-nowrap font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: scaleStoryCta(s.labelSize, mobileScale) }}
        >
          Read our story
        </span>
        <span
          className="flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] font-bold leading-none text-white"
          style={{
            width: scaleStoryCta(s.arrowSize, mobileScale),
            height: scaleStoryCta(s.arrowSize, mobileScale),
            fontSize: scaleStoryCta(s.arrowFont, mobileScale),
          }}
        >
          <span className="block translate-x-px leading-none">→</span>
        </span>
      </Link>
    </>
  );
}

function FigmaLayer({
  src,
  alt,
  box,
  zIndex,
  className = "object-contain object-left-top",
  priority = false,
}: {
  src: string;
  alt: string;
  box: FigmaRect;
  zIndex: number;
  className?: string;
  priority?: boolean;
}): React.ReactElement {
  return (
    <div className="pointer-events-none absolute" style={canvasStyle(box, zIndex)}>
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          sizes="(max-width: 1024px) 50vw, 500px"
          priority={priority}
        />
      </div>
    </div>
  );
}

function AboutVisual(): React.ReactElement {
  const cellW = 329.1014709472656;
  const cellH = 329.1014709472656;
  const gridX = 249.080078125;
  const gridY = 27;
  const step = 358.0333251953125;

  const profileCell = (col: number, row: number): FigmaRect => ({
    x: gridX + col * step,
    y: gridY + row * step,
    w: cellW,
    h: cellH,
  });

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, maxWidth: CANVAS_W }}
    >
      <div className="absolute inset-0 origin-top-left overflow-visible max-lg:scale-100 lg:scale-[1.08]">
      {/* Decorative curve — bg-line.png */}
      <div
        className="pointer-events-none absolute z-[1]"
        style={{
          left: "-5.198368%",
          top: "10.702998562101424%",
          width: "44.9839115256715%",
          height: "63.59375032050164%",
        }}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/about-us/bg-line.png"
            alt=""
            fill
            className="object-contain object-left-top brightness-0"
            sizes="(max-width: 1024px) 45vw, 435px"
          />
        </div>
      </div>

      {/* Profile grid — exports mapped to visual positions (Amna TL, Usman TR, Faisal BL, Sara BR) */}
      <FigmaLayer
        src="/images/about-us/profile-top-right.png"
        alt="Amna, rider"
        box={profileCell(0, 0)}
        zIndex={10}
        className="object-contain"
        priority
      />
      <FigmaLayer
        src="/images/about-us/profile-top-left.png"
        alt="Usman, driver"
        box={profileCell(1, 0)}
        zIndex={10}
        className="object-contain"
        priority
      />
      <FigmaLayer
        src="/images/about-us/profile-bottom-left.png"
        alt="Faisal, partner"
        box={profileCell(0, 1)}
        zIndex={10}
        className="object-contain"
      />
      <FigmaLayer
        src="/images/about-us/profile-bottom-right.png"
        alt="Sara, rider"
        box={profileCell(1, 1)}
        zIndex={10}
        className="object-contain"
      />

      <CommunityInsightsButton />

      {/* Active drivers card — Figma 124:3727 */}
      <FigmaLayer
        src="/images/about-us/stat-card.png"
        alt="Active drivers Q4 — 12k plus, up 12.4 percent this month"
        box={{
          x: 371.6057434082031,
          y: 614.5478515625,
          w: 544.1038208007812,
          h: 336.78485107421875,
        }}
        zIndex={20}
        priority
      />

      {/* Total Rides — total-rides-tag.png */}
      <div
        className="pointer-events-none absolute z-[25]"
        style={TOTAL_RIDES_POSITION}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/about-us/total-rides-tag.png"
            alt="Total Rides — 2.8M"
            fill
            className="object-contain object-left-top"
            sizes="(max-width: 1024px) 30vw, 419px"
          />
        </div>
      </div>

      {/* Report badge — report-badge.png */}
      <div
        className="pointer-events-none absolute z-[30]"
        style={REPORT_BADGE_POSITION}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/about-us/report-badge.png"
            alt="Strong Report — 2 Feb"
            fill
            className="object-contain object-left-top"
            sizes="(max-width: 1024px) 30vw, 180px"
          />
        </div>
      </div>

      {/* Chat bubble — chat-bubble.png */}
      <div
        className="pointer-events-none absolute z-[25]"
        style={CHAT_BUBBLE_POSITION}
        aria-hidden
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/about-us/chat-bubble.png"
            alt=""
            fill
            className="object-contain object-left-top"
            sizes="(max-width: 1024px) 20vw, 85px"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default function AboutUsSection(): React.ReactElement {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-28 overflow-visible py-16 sm:py-20 lg:py-[118px]"
      style={heroBackgroundStyle}
      aria-labelledby="about-us-heading"
    >
      <div
        className="relative z-[1] mx-auto w-full overflow-visible px-4 sm:px-8 lg:px-[106px]"
        style={{ maxWidth: CONTAINER_MAX }}
      >
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,787.58px)_minmax(0,966.7px)] lg:gap-4">
          <div
            className="relative z-[2] w-full lg:-mt-[10.66px] lg:pr-4"
            style={{ maxWidth: LEFT_COL_W }}
          >
            <h2
              id="about-us-heading"
              className="font-poppins tracking-[-2.8px]"
              style={{ maxWidth: HEAD_W }}
            >
              <span className="block font-bold text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] text-[#0b0b0b]">
                About
              </span>
              <span
                className={`block text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] ${accentYellowClass}`}
              >
                Us.
              </span>
            </h2>

            <div
              className="mt-8 space-y-5 font-poppins text-[15px] font-normal leading-[1.55] text-[#6f6e68] sm:mt-9 sm:text-[16px] lg:mt-[35px] lg:max-w-[672px] lg:text-[17px]"
              style={{ maxWidth: BODY_MAX }}
            >
              <p>{ABOUT_BODY_P1}</p>
              <p>{ABOUT_BODY_P2}</p>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-[52px]">
              <LearnMoreButton />
            </div>
          </div>

          <div className="relative z-[1] min-w-0 overflow-visible lg:mt-[5.18px]" style={{ maxWidth: RIGHT_COL_W }}>
            <AboutVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
