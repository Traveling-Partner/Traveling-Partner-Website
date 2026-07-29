"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

/** Figma Register section — 124:3589 (1920 × 1200) */
const SECTION_W = 1920;
const SECTION_H = 1200;

const pct = (px: number, base: number) => `${(px / base) * 100}%`;
/** Scale Figma px to canvas — same proportions on every screen width */
const cqw = (px: number) => `${(px / SECTION_W) * 100}cqw`;
const cqh = (px: number) => `${(px / SECTION_H) * 100}cqh`;

const DRIVER_HREF = "https://play.google.com/store/apps?hl=en&gl=US";
const PARTNER_HREF = "https://play.google.com/store/apps?hl=en&gl=US";

const HEAD_W = 820;
const SUBTEXT_W = 720;
const TEXT_TOP_SECTION = 60.345;
const HEADLINE_SUBTEXT_GAP = 17.3;

const CTA_SCALE = 1.12;
const CTA_W = 492.93 * CTA_SCALE;
const CTA_H = 125.65 * CTA_SCALE;

const DRIVER_CTA = {
  left: 271,
  top: 726,
  width: CTA_W,
  height: CTA_H,
  rotate: -3,
};

const PARTNER_CTA = {
  left: 981,
  top: 630,
  width: CTA_W,
  height: CTA_H,
  rotate: 6,
};

type CtaBox = typeof DRIVER_CTA | typeof PARTNER_CTA;

const BTN_H = CTA_H;
const btnCqh = (px: number) => `${(px / BTN_H) * 100}cqh`;

const GLASS_BASE =
  "relative isolate box-border flex items-center overflow-visible " +
  "rounded-[32.431cqh] bg-white/[0.78] backdrop-blur-[24px] backdrop-saturate-[1.8] " +
  "shadow-[0_24px_48px_rgba(11,11,11,0.14),0_8px_20px_rgba(11,11,11,0.08),inset_0_0_0_1.7px_rgba(255,255,255,0.95)] " +
  "transition-colors duration-300 hover:bg-white";

const BTN_PAD_TOP = btnCqh(37.35);
const BTN_PAD_X = btnCqh(23.77);
const BTN_PAD_BOTTOM = btnCqh(23.77);
const BTN_GAP = btnCqh(23.77);
const BTN_TILE = btnCqh(64.53);
const BTN_ICON = btnCqh(32);
const BTN_DOT = btnCqh(24);
const BTN_EYEBROW = btnCqh(17);
const BTN_TITLE = btnCqh(20);
const BTN_TITLE_GAP = btnCqh(6);
const BTN_TILE_RADIUS = btnCqh(14.45);

function RegisterHeadline(): React.ReactElement {
  const headlineBase =
    "font-poppins text-center [font-size:var(--register-headline-size)] [line-height:var(--register-headline-lh)]";
  const accentClass =
    `${headlineBase} font-normal italic text-transparent bg-clip-text bg-gradient-to-b from-[#fce001] to-[#fdb813] ` +
    `[box-decoration-break:clone] [-webkit-box-decoration-break:clone]`;

  return (
    <div
      className="mx-auto w-full overflow-visible"
      style={
        {
          maxWidth: cqw(HEAD_W),
          "--register-headline-size": cqw(80),
          "--register-headline-lh": cqw(80),
          letterSpacing: cqw(-2.8),
        } as React.CSSProperties
      }
    >
      <h2 id="register-section-heading" className="overflow-visible">
        <span className={`block overflow-visible ${headlineBase} font-bold not-italic text-white`}>
          Drive with us.
          <span className={`${accentClass} inline-block pl-[0.05em] pr-[0.18em]`}> Partner</span>
        </span>
        <span className={`block overflow-visible ${accentClass}`}>with us.</span>
      </h2>
    </div>
  );
}

function RegisterSubheadline(): React.ReactElement {
  return (
    <p
      className="mx-auto text-center font-poppins font-semibold text-white"
      style={{
        maxWidth: cqw(SUBTEXT_W),
        marginTop: cqh(HEADLINE_SUBTEXT_GAP),
        fontSize: cqw(28),
        lineHeight: 1.25,
      }}
    >
      More than a ride. More than an app.
    </p>
  );
}

function RegisterSubtext(): React.ReactElement {
  return (
    <div
      className="mx-auto text-center font-poppins text-white"
      style={{
        maxWidth: cqw(SUBTEXT_W),
        marginTop: cqh(12),
        fontSize: cqw(18),
        lineHeight: 1.5,
      }}
    >
      {emphasizePhrases(
        "Traveling Partner runs on three kinds of people: drivers who want to actually keep what they earn, businesses that need their deliveries handled without the runaround, and riders who just want to get somewhere without overpaying for it. Drivers keep more of every fare with our zero commission ride app. Businesses get flexible transport and delivery support that scales as they grow.",
        ["zero commission ride app"],
        "onDark",
      )}
    </div>
  );
}

function TextOverlay(): React.ReactElement {
  return (
    <div
      className="absolute inset-x-0 z-[2] flex justify-center overflow-visible"
      style={{
        top: cqh(TEXT_TOP_SECTION),
        paddingLeft: cqw(24),
        paddingRight: cqw(24),
      }}
    >
      <div className="w-full" style={{ maxWidth: cqw(HEAD_W) }}>
        <RegisterHeadline />
        <RegisterSubheadline />
        <RegisterSubtext />
      </div>
    </div>
  );
}

function RegisterCardIcon({ variant }: { variant: "driver" | "partner" }): React.ReactElement {
  const isDriver = variant === "driver";
  return (
    <Image
      src={isDriver ? "/images/register-icon-car.png" : "/images/register-icon-building.png"}
      alt=""
      width={40}
      height={40}
      className="object-contain"
      style={{ width: BTN_ICON, height: BTN_ICON }}
      aria-hidden
    />
  );
}

function StatusDot(): React.ReactElement {
  return (
    <Image
      src="/images/register-status-dot.png"
      alt=""
      width={24}
      height={24}
      className="pointer-events-none absolute right-0 top-0 z-10 translate-x-[30%] -translate-y-[35%] object-contain"
      style={{ width: BTN_DOT, height: BTN_DOT }}
      aria-hidden
    />
  );
}

function RegisterArrowCircle(): React.ReactElement {
  return (
    <span
      className="relative z-[1] flex shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] font-bold leading-none text-[#fdb813] shadow-[0_4px_12px_rgba(11,11,11,0.22)]"
      style={{ width: BTN_TILE, height: BTN_TILE, fontSize: BTN_TITLE }}
    >
      <span className="inline-block leading-none transition-transform duration-300 group-hover:-rotate-45">
        →
      </span>
    </span>
  );
}

function RegisterCard({
  href,
  eyebrow,
  title,
  variant,
}: {
  href: string;
  eyebrow: string;
  title: string;
  variant: "driver" | "partner";
}): React.ReactElement {
  const isDriver = variant === "driver";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${GLASS_BASE} group h-full w-full justify-between`}
      style={{
        paddingTop: BTN_PAD_TOP,
        paddingBottom: BTN_PAD_BOTTOM,
        paddingLeft: BTN_PAD_X,
        paddingRight: BTN_PAD_X,
        gap: BTN_GAP,
      }}
    >
      <StatusDot />
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
        className="h-full w-full"
        style={{
          transform: `rotate(${box.rotate}deg)`,
          transformOrigin: "center center",
        }}
      >
        <div className="h-full w-full origin-center [container-type:size] max-md:scale-[1.25]">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Single Figma canvas — scales proportionally on mobile & desktop */
function RegisterSectionCanvas(): React.ReactElement {
  return (
    <div
      className="relative mx-auto w-full max-w-[1920px] [container-type:size] overflow-visible"
      style={{ aspectRatio: `${SECTION_W} / ${SECTION_H}` }}
    >
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <TextOverlay />

      <div className="absolute inset-0 z-[2] overflow-visible">
        <CtaSlot box={DRIVER_CTA}>
          <RegisterCard
            href={DRIVER_HREF}
            eyebrow="FOR DRIVERS"
            title="Become a Driver"
            variant="driver"
          />
        </CtaSlot>
        <CtaSlot box={PARTNER_CTA}>
          <RegisterCard
            href={PARTNER_HREF}
            eyebrow="FOR PARTNER"
            title="Partner With Us"
            variant="partner"
          />
        </CtaSlot>
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
      <RegisterSectionCanvas />
    </section>
  );
}
