"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

/** Figma Register section — 124:3589 (1920 × 1200) */
const SECTION_W = 1920;
const SECTION_H = 1200;

const pct = (px: number, base: number) => `${(px / base) * 100}%`;

const DRIVER_HREF = "https://play.google.com/store/apps?hl=en&gl=US";
const PARTNER_HREF = "https://play.google.com/store/apps?hl=en&gl=US";

/** Figma 43:1123 HEAD — 820px centered text block */
const HEAD_W = 820;
/** Figma 43:1131 — subtext container width */
const SUBTEXT_W = 540;

/**
 * Figma text block top within 1920×1200 section:
 * Section y 105.345 + Heading y 48.3 + line-1 y 7.7 = 161.345
 */
const TEXT_TOP_SECTION = 60.345;

/** Figma 43:1127 → 43:1131 gap: 233.3 − (48.3 + 167.7) = 17.3px */
const HEADLINE_SUBTEXT_GAP = 17.3;

/** Shared Figma CTA size — both buttons 492.93 × 125.65 */
const CTA_W = 492.93;
const CTA_H = 125.65;

/** Figma driver button — section frame (1920 × 1200) */
const DRIVER_CTA = {
  left: 271,
  top: 726,
  width: CTA_W,
  height: CTA_H,
  rotate: -3,
};

/** Figma partner button — section frame (1920 × 1200) */
const PARTNER_CTA = {
  left: 981,
  top: 630,
  width: CTA_W,
  height: CTA_H,
  rotate: 6,
};

type CtaBox = typeof DRIVER_CTA | typeof PARTNER_CTA;

/** Figma button reference height — all inner sizes derive from 125.65px frame */
const BTN_H = CTA_H;

/** Scale Figma px values to container-query height units */
const btnCqh = (px: number) => `${(px / BTN_H) * 100}cqh`;

/** Glass pill — Figma appearance panel (desktop, scales via cqh) */
const GLASS_BASE =
  "relative isolate box-border flex items-center overflow-visible " +
  "rounded-[32.431cqh] bg-white/[0.78] backdrop-blur-[24px] backdrop-saturate-[1.8] " +
  "shadow-[0_24px_48px_rgba(11,11,11,0.14),0_8px_20px_rgba(11,11,11,0.08),inset_0_0_0_1.7px_rgba(255,255,255,0.95)] " +
  "transition-colors duration-300 hover:bg-white";

/** Glass pill — mobile compact */
const GLASS_COMPACT_CLASS =
  "relative isolate box-border flex h-full w-full items-center overflow-visible rounded-[32px] " +
  "bg-white/[0.78] backdrop-blur-[24px] backdrop-saturate-[1.8] " +
  "shadow-[0_24px_48px_rgba(11,11,11,0.14),0_8px_20px_rgba(11,11,11,0.08),inset_0_0_0_1.7px_rgba(255,255,255,0.95)] " +
  "transition-colors duration-300 hover:bg-white";

/** Shared Figma padding — top 37.35, sides/bottom 23.77 */
const BTN_PAD_TOP = btnCqh(37.35);
const BTN_PAD_X = btnCqh(23.77);
const BTN_PAD_BOTTOM = btnCqh(23.77);
const BTN_GAP = btnCqh(23.77);

/** Inner content height ≈ 64.53px at 125.65 frame */
const BTN_TILE = btnCqh(64.53);
const BTN_ICON = btnCqh(32);
const BTN_DOT = btnCqh(24);
const BTN_EYEBROW = btnCqh(17);
const BTN_TITLE = btnCqh(20);
const BTN_TITLE_GAP = btnCqh(6);
const BTN_TILE_RADIUS = btnCqh(14.45);

/** Figma typography — 80px / 80px LH / −2.8px at 1920 desktop */
const HEADLINE_FONT = "clamp(36px, 4.167vw, 80px)";
const HEADLINE_LH = "clamp(36px, 4.167vw, 80px)";


function RegisterHeadline(): React.ReactElement {
  const headlineBase =
    "font-poppins text-center tracking-[-2.8px] [font-size:var(--register-headline-size)] [line-height:var(--register-headline-lh)]";
  const accentClass =
    `${headlineBase} font-normal italic text-transparent bg-clip-text bg-gradient-to-b from-[#fce001] to-[#fdb813] ` +
    `[box-decoration-break:clone] [-webkit-box-decoration-break:clone]`;

  return (
    <div
      className="mx-auto w-full overflow-visible px-2 sm:px-3"
      style={
        {
          maxWidth: HEAD_W,
          "--register-headline-size": HEADLINE_FONT,
          "--register-headline-lh": HEADLINE_LH,
        } as React.CSSProperties
      }
    >
      <h2 id="register-section-heading" className="overflow-visible">
        {/* Figma 43:1128 + 43:1129 — line 1, 80px / 80px */}
        <span className={`block overflow-visible ${headlineBase} font-bold not-italic text-white`}>
          Drive with us.
          <span className={`${accentClass} inline-block pl-[0.05em] pr-[0.18em]`}> Partner</span>
        </span>
        {/* Figma 43:1130 — line 2, starts at y+80 within heading frame */}
        <span className={`block overflow-visible ${accentClass}`}>with us.</span>
      </h2>
    </div>
  );
}

function RegisterSubtext(): React.ReactElement {
  return (
    <p
      className="mx-auto text-center font-poppins font-normal leading-[1.55] text-white"
      style={{
        maxWidth: SUBTEXT_W,
        marginTop: HEADLINE_SUBTEXT_GAP,
        fontSize: 17,
        fontFamily: "var(--font-poppins), Poppins, sans-serif",
      }}
    >
      Two networks, one mission — keep more of what you earn.
      <br />
      Whether you&apos;re behind the wheel or running the business,
      <br />
      Traveling Partner is built around you.
    </p>
  );
}

function TextOverlay(): React.ReactElement {
  return (
    <div
      className="absolute inset-x-0 z-[2] flex justify-center overflow-visible px-4 sm:px-6"
      style={{ top: pct(TEXT_TOP_SECTION, SECTION_H) }}
    >
      <div className="w-full" style={{ maxWidth: HEAD_W }}>
        <RegisterHeadline />
        <RegisterSubtext />
      </div>
    </div>
  );
}

function RegisterCardIcon({
  variant,
  compact = false,
}: {
  variant: "driver" | "partner";
  compact?: boolean;
}): React.ReactElement {
  const isDriver = variant === "driver";

  return (
    <Image
      src={isDriver ? "/images/register-icon-car.png" : "/images/register-icon-building.png"}
      alt=""
      width={40}
      height={40}
      className={compact ? "h-8 w-8 object-contain" : "object-contain"}
      style={compact ? undefined : { width: BTN_ICON, height: BTN_ICON }}
      aria-hidden
    />
  );
}

function StatusDot({
  compact = false,
  variant = "partner",
}: {
  compact?: boolean;
  variant?: "driver" | "partner";
}): React.ReactElement {
  const dotOffsetClass = "translate-x-[30%] -translate-y-[35%]";

  return (
    <Image
      src="/images/register-status-dot.png"
      alt=""
      width={24}
      height={24}
      className={
        compact
          ? `pointer-events-none absolute right-0 top-0 z-10 h-5 w-5 object-contain ${dotOffsetClass}`
          : `pointer-events-none absolute right-0 top-0 z-10 object-contain ${dotOffsetClass}`
      }
      style={compact ? undefined : { width: BTN_DOT, height: BTN_DOT }}
      aria-hidden
    />
  );
}

function RegisterArrowCircle({ compact = false }: { compact?: boolean }): React.ReactElement {
  const circleClass =
    "relative z-[1] flex shrink-0 items-center justify-center rounded-full " +
    "bg-[#0b0b0b] font-bold leading-none text-[#fdb813] " +
    "shadow-[0_4px_12px_rgba(11,11,11,0.22)]";

  const arrowClass =
    "inline-block leading-none transition-transform duration-300 group-hover:-rotate-45";

  if (compact) {
    return (
      <span className={`${circleClass} h-9 w-9 text-sm`}>
        <span className={arrowClass}>→</span>
      </span>
    );
  }

  return (
    <span
      className={circleClass}
      style={{ width: BTN_TILE, height: BTN_TILE, fontSize: BTN_TITLE }}
    >
      <span className={arrowClass}>→</span>
    </span>
  );
}

function RegisterCard({
  href,
  eyebrow,
  title,
  variant,
  compact = false,
}: {
  href: string;
  eyebrow: string;
  title: string;
  variant: "driver" | "partner";
  compact?: boolean;
}): React.ReactElement {
  const isDriver = variant === "driver";

  if (compact) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${GLASS_COMPACT_CLASS} group gap-2 py-2 pl-3 pr-2`}
      >
        <StatusDot compact variant={variant} />
        <span
          className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
          style={{
            background: isDriver
              ? "linear-gradient(180deg, #fce001 0%, #fdb813 100%)"
              : "#0b0b0b",
          }}
        >
          <RegisterCardIcon variant={variant} compact />
        </span>
        <span className="relative z-[1] min-w-0 flex-1">
          <span className="block font-poppins text-[17px] font-bold uppercase leading-none tracking-[0.14em] text-[#6F6E68]">
            {eyebrow}
          </span>
          <span className="mt-1 block truncate font-poppins text-sm font-semibold leading-none text-[#0b0b0b]">
            {title}
          </span>
        </span>
        <RegisterArrowCircle compact />
      </Link>
    );
  }

  const paddingStyle = {
    paddingTop: BTN_PAD_TOP,
    paddingBottom: BTN_PAD_BOTTOM,
    paddingLeft: BTN_PAD_X,
    paddingRight: BTN_PAD_X,
    gap: BTN_GAP,
  };
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${GLASS_BASE} group h-full w-full justify-between`}
      style={paddingStyle}
    >
      <StatusDot variant={variant} />

      {/* Figma icon tile — ~64.53px square inside 125.65 pill */}
      <span
        className="relative z-[1] flex shrink-0 items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
        style={{
          width: BTN_TILE,
          height: BTN_TILE,
          borderRadius: BTN_TILE_RADIUS,
          background: isDriver
            ? "linear-gradient(180deg, #fce001 0%, #fdb813 100%)"
            : "#0b0b0b",
        }}
      >
        <RegisterCardIcon variant={variant} />
      </span>

      <span className="relative z-[1] min-w-0 flex-1">
        <span
          className="block whitespace-nowrap font-poppins font-bold uppercase leading-none text-[#6F6E68]"
          style={{
            fontSize: BTN_EYEBROW,
            letterSpacing: "0.14em",
            fontFamily: "var(--font-poppins), Poppins, sans-serif",
          }}
        >
          {eyebrow}
        </span>
        <span
          className="block whitespace-nowrap font-poppins font-semibold leading-none text-[#0b0b0b]"
          style={{ fontSize: BTN_TITLE, marginTop: BTN_TITLE_GAP }}
        >
          {title}
        </span>
      </span>

      <RegisterArrowCircle />
    </Link>
  );
}

function CtaSlot({
  box,
  children,
}: {
  box: CtaBox;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      className="absolute z-10 overflow-visible"
      style={{
        left: pct(box.left, SECTION_W),
        top: pct(box.top, SECTION_H),
        width: pct(box.width, SECTION_W),
        height: pct(box.height, SECTION_H),
      }}
    >
      <div
        className="h-full w-full [container-type:size]"
        style={{
          transform: `rotate(${box.rotate}deg)`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function RegisterDriverSection(): React.ReactElement {
  return (
    <section
      id="drivers"
      className="relative w-full overflow-x-hidden scroll-mt-28 bg-[#fffcf2]"
      aria-labelledby="register-section-heading"
    >
      {/* Desktop + tablet — Figma 124:3589 (1920 × 1200) */}
      <div
        className="relative mx-auto hidden w-full max-w-[1920px] lg:block"
        style={{ aspectRatio: `${SECTION_W} / ${SECTION_H}` }}
      >
        <Image
          src="/images/register-section-car.png"
          alt="Driver and passenger smiling inside a car"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
          style={{ height: pct(624, SECTION_H) }}
          aria-hidden
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/22 to-transparent" />
        </div>

        <TextOverlay />

        {/* Figma photo frame — CTAs sized/positioned on 1320×620 image */}
        <div className="absolute inset-0 z-[2]">
          <CtaSlot box={DRIVER_CTA}>
            <RegisterCard
              href={DRIVER_HREF}
              eyebrow="FOR DRIVERS"
              title="Register as a Driver"
              variant="driver"
            />
          </CtaSlot>

          <CtaSlot box={PARTNER_CTA}>
            <RegisterCard
              href={PARTNER_HREF}
              eyebrow="FOR PARTNER"
              title="Register as a Partner"
              variant="partner"
            />
          </CtaSlot>
        </div>
      </div>

      {/* Mobile — photo + stacked cards */}
      <div className="lg:hidden">
        <div
          className="relative mx-auto w-full max-w-[1920px]"
          style={{ aspectRatio: `${SECTION_W} / ${SECTION_H}` }}
        >
          <Image
            src="/images/register-section-car.png"
            alt="Driver and passenger smiling inside a car"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1]"
            style={{ height: pct(624, SECTION_H) }}
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
          </div>

          <TextOverlay />
        </div>

        <div className="mx-auto flex w-full max-w-[360px] flex-col gap-3 px-4 py-6">
          <div className="[container-type:size] h-[74px] w-full">
            <RegisterCard
              href={DRIVER_HREF}
              eyebrow="FOR DRIVERS"
              title="Register as a Driver"
              variant="driver"
              compact
            />
          </div>
          <div className="[container-type:size] h-[74px] w-full">
            <RegisterCard
              href={PARTNER_HREF}
              eyebrow="FOR PARTNER"
              title="Register as a Partner"
              variant="partner"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  );
}
