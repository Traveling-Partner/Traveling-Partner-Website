"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { heroBottomFadeStyle } from "@/lib/heroBackground";
import { HeroBodyCopy } from "@/lib/homeContentEmphasis";

/** Figma mobile hero reference frame — 390px wide */
const FW = 390;
/** Shorter frame crops legs — waist-up only */
const HERO_IMAGE_H = 435;
/** DevTools — mobile hero man image */
const HERO_MAN_IMAGE_STYLE: React.CSSProperties = {
  objectPosition: "66% 0%",
  transform: "scale(1.34) translateX(23%)",
  transformOrigin: "68% 9%",
};

/** Convert Figma px to container query width (scales on every mobile width) */
const cqw = (px: number) => `${(px / FW) * 100}cqw`;

/** DevTools — active drivers card (258px @ 390 = 66.154cqw) */
const ACTIVE_DRIVERS_CARD_STYLE: React.CSSProperties = {
  bottom: "5%",
  left: "1.5%",
  width: "65%",
  maxWidth: cqw(258),
};

function ExploreServicesButtonMobile(): React.ReactElement {
  return (
    <Link
      href="#services"
      className="group inline-flex items-center justify-between overflow-hidden rounded-[100px] border border-[#0b0b0b] bg-[#0b0b0b] shadow-[0_12px_35px_rgba(11,11,11,0.18),0_4px_12px_rgba(11,11,11,0.12)] transition-all duration-300 hover:border-[#fce001] hover:bg-gradient-to-b hover:from-[#fce001] hover:to-[#fdb813]"
      style={{
        height: cqw(52),
        width: cqw(272),
        gap: cqw(8),
        paddingLeft: cqw(24),
        paddingRight: cqw(12),
        paddingTop: cqw(10),
        paddingBottom: cqw(10),
      }}
    >
      <span
        className="min-w-0 whitespace-nowrap font-poppins font-semibold leading-none text-white transition-colors duration-300 group-hover:text-[#0b0b0b]"
        style={{ fontSize: cqw(13) }}
      >
        Explore Services
      </span>
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] font-bold leading-none text-[#0b0b0b] transition-all duration-300 group-hover:from-[#0b0b0b] group-hover:to-[#0b0b0b] group-hover:text-[#fce001]"
        style={{
          height: cqw(36),
          width: cqw(36),
          fontSize: cqw(15),
        }}
      >
        →
      </span>
    </Link>
  );
}

function HeroManMobile(): React.ReactElement {
  return (
    <div
      className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
      style={{
        marginTop: cqw(4),
        aspectRatio: `${FW} / ${HERO_IMAGE_H}`,
      }}
    >
      {/* Horizontal guide — behind shoulders */}
      <div
        className="pointer-events-none absolute inset-x-0 z-[2] h-px"
        style={{
          top: "31.5%",
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(11,11,11,0.05) 18%, rgba(11,11,11,0.08) 50%, rgba(11,11,11,0.05) 82%, transparent 100%)",
        }}
        aria-hidden
      />
      {/* Yellow guide dot — left of head */}
      <div
        className="pointer-events-none absolute z-[2] -translate-y-1/2 rounded-full bg-[#fce001] shadow-[0_0_0_4px_rgba(252,224,1,0.2),0_0_18px_rgba(252,224,1,0.42)]"
        style={{
          left: "21.5%",
          top: "31.5%",
          height: cqw(10),
          width: cqw(10),
        }}
        aria-hidden
      />

      <Image
        src="/images/hero-man-figma-new.png"
        alt="Traveling Partner app user"
        fill
        priority
        className="object-cover"
        style={HERO_MAN_IMAGE_STYLE}
        sizes="100vw"
      />

      {/* Active drivers glass card */}
      <div className="absolute z-[3]" style={ACTIVE_DRIVERS_CARD_STYLE}>
        <Image
          src="/images/hero-active-drivers-card.png"
          alt="2,847 active drivers, up 12.4 percent"
          width={378}
          height={253}
          className="h-auto w-full drop-shadow-[0_14px_42px_rgba(11,11,11,0.12)]"
          priority
        />
      </div>

      {/* Bottom cream glass fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4]"
        style={{ height: cqw(112) }}
        aria-hidden
      >
        <div
          className="absolute inset-0 backdrop-blur-[11.95px]"
          style={{
            ...heroBottomFadeStyle,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 20%, black 65%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.25) 20%, black 65%)",
          }}
        />
      </div>
    </div>
  );
}

export default function HeroMobileSection(): React.ReactElement {
  return (
    <div className="relative w-full md:hidden">
      {/* Mobile-only background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-x-0 top-0 h-[55%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(252,224,1,0.12) 0%, rgba(252,224,1,0) 72%)",
          }}
        />
        <div
          className="absolute -right-[8%] top-[6%] h-[78%] w-[88%]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 68% 42%, rgba(253,184,19,0.16) 0%, rgba(253,184,19,0) 68%)",
          }}
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[430px] [container-type:inline-size]"
        style={{
          paddingTop: cqw(92),
          paddingBottom: cqw(8),
          paddingLeft: cqw(20),
          paddingRight: cqw(20),
        }}
      >
        <div
          className="mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: cqw(350) }}
        >
          <h1
            className="w-full font-poppins font-semibold text-[#0b0b0b]"
            style={{
              fontSize: cqw(34),
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="block text-[#fdb813]">One App,</span>
            <span className="block">Every way</span>
            <span className="block">to move.</span>
          </h1>

          <div
            className="w-full text-center font-poppins text-[#6f6e68]"
            style={{
              marginTop: cqw(16),
              fontSize: cqw(11.5),
              lineHeight: 1.55,
            }}
          >
            <p>
              <HeroBodyCopy />
            </p>
          </div>

          <div style={{ marginTop: cqw(20) }}>
            <ExploreServicesButtonMobile />
          </div>
        </div>

        <HeroManMobile />
      </div>
    </div>
  );
}
