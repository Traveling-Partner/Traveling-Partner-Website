"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroBackgroundStyle } from "@/lib/heroBackground";
import {
  HOME_ACCENT_TEXT,
  HOME_SECTION_BODY,
  HOME_SECTION_HEADING,
} from "@/lib/homeSectionStyles";
import { HomePrimaryButton } from "./HomeCtaButtons";

/** Figma About Us — section 124:3686 (1920 × 1198) */
const CONTAINER_MAX = 1707.6363525390625;
const LEFT_COL_W = 787.5831909179688;
const RIGHT_COL_W = 966.6965942382812;
const HEAD_W = 752.674072265625;
const BODY_MAX = 692;

/** Figma RIGHT composed visual — 124:3696 */
const CANVAS_W = 966.6965942382812;
const CANVAS_H = 952.181640625;

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

/** Keep pill fully inside canvas on narrow screens */
const COMMUNITY_PILL_POSITION_MOBILE = {
  left: "0.5%",
  top: "20.1821%",
  width: "46.5%",
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

/** Pull chat bubble inside canvas on mobile */
const CHAT_BUBBLE_POSITION_MOBILE = {
  left: "79.5%",
  top: "0.75%",
  width: "17.5%",
  height: "18.5%",
};

const BG_LINE_POSITION = {
  left: "-5.198368%",
  top: "10.702998562101424%",
  width: "44.9839115256715%",
  height: "63.59375032050164%",
};

const BG_LINE_POSITION_MOBILE = {
  left: "0%",
  top: "10.702998562101424%",
  width: "42%",
  height: "63.59375032050164%",
};

function CommunityInsightsButton({
  position,
  className = "",
}: {
  position: typeof COMMUNITY_PILL_POSITION;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={`absolute z-[25] [container-type:size] ${className}`}
      style={position}
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

const accentYellowClass = HOME_ACCENT_TEXT;

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
  return (
    <>
      <HomePrimaryButton href="/about" className="hidden lg:inline-flex">
        Read our story
      </HomePrimaryButton>
      <HomePrimaryButton href="/about" fullWidth className="lg:hidden">
        Read our story
      </HomePrimaryButton>
    </>
  );
}

function PositionedImage({
  src,
  alt,
  position,
  zIndex,
  className = "object-contain object-left-top",
  sizes,
  classNameWrapper = "",
}: {
  src: string;
  alt: string;
  position: React.CSSProperties;
  zIndex: number;
  className?: string;
  sizes: string;
  classNameWrapper?: string;
}): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute ${classNameWrapper}`}
      style={{ ...position, zIndex }}
      aria-hidden={alt === ""}
    >
      <div className="relative h-full w-full">
        <Image src={src} alt={alt} fill className={className} sizes={sizes} />
      </div>
    </div>
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
      className="relative mx-auto w-full max-w-full overflow-visible max-lg:max-w-[min(100%,400px)] max-lg:pb-6"
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, maxWidth: CANVAS_W }}
    >
      <div className="absolute inset-0 origin-[48%_12%] overflow-visible max-lg:scale-[0.94] lg:origin-top-left lg:scale-[1.08]">
      <PositionedImage
        src="/images/about-us/bg-line.png"
        alt=""
        position={BG_LINE_POSITION_MOBILE}
        zIndex={1}
        className="object-contain object-left-top brightness-0 lg:hidden"
        sizes="(max-width: 1024px) 45vw, 435px"
      />
      <PositionedImage
        src="/images/about-us/bg-line.png"
        alt=""
        position={BG_LINE_POSITION}
        zIndex={1}
        className="hidden object-contain object-left-top brightness-0 lg:block"
        sizes="(max-width: 1024px) 45vw, 435px"
      />
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

      <CommunityInsightsButton position={COMMUNITY_PILL_POSITION_MOBILE} className="lg:hidden" />
      <CommunityInsightsButton position={COMMUNITY_PILL_POSITION} className="hidden lg:block" />

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

      <PositionedImage
        src="/images/about-us/chat-bubble.png"
        alt=""
        position={CHAT_BUBBLE_POSITION_MOBILE}
        zIndex={25}
        className="object-contain object-left-top lg:hidden"
        sizes="(max-width: 1024px) 20vw, 85px"
      />
      <PositionedImage
        src="/images/about-us/chat-bubble.png"
        alt=""
        position={CHAT_BUBBLE_POSITION}
        zIndex={25}
        className="hidden object-contain object-left-top lg:block"
        sizes="(max-width: 1024px) 20vw, 85px"
      />
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
              className={`${HOME_SECTION_HEADING} tracking-[-0.03em]`}
            >
              <span className="block font-bold text-[#0b0b0b]">About</span>
              <span className={`block ${accentYellowClass}`}>Us.</span>
            </h2>

            <div
              className={`mt-8 space-y-5 ${HOME_SECTION_BODY} sm:mt-9 lg:mt-[35px] lg:max-w-[672px]`}
              style={{ maxWidth: BODY_MAX }}
            >
              <p>{ABOUT_BODY_P1}</p>
              <p>{ABOUT_BODY_P2}</p>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-[52px]">
              <LearnMoreButton />
            </div>
          </div>

          <div className="relative z-[1] min-w-0 overflow-visible max-lg:flex max-lg:justify-center max-lg:px-1 max-lg:pt-2 lg:mt-[5.18px]" style={{ maxWidth: RIGHT_COL_W }}>
            <AboutVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
