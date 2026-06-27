"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif } from "next/font/google";

const accentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

/** Single dissolve curve — backgrounds blend; content swaps at mid-blend */
const EASE = "cubic-bezier(0.33, 0, 0.2, 1)";
const BLEND_MS = 1650;

/** Body copy — small type, ~3 lines across all detail cards */
const DESCRIPTION_CLASS =
  "mt-4 max-w-[360px] font-poppins text-[14px] font-normal leading-[1.5]";

const blendStyle = (visible: boolean): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transition: `opacity ${BLEND_MS}ms ${EASE}`,
  willChange: "opacity",
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
});

type SlideTheme = {
  panelClass: string;
  textPrimary: string;
  textMuted: string;
  indexClass: string;
  badgeClass: string;
  tagClass: string;
  bottomGlow?: string;
  topGlow?: string;
};

type RideSlide = {
  num: string;
  title: string;
  tagline: string;
  label: string;
  image: string;
  headlineLead: string;
  headlineAccent: string;
  /** Figma: accent on its own line below lead (Delivery card) */
  headlineStacked?: boolean;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  badge: string;
  theme: SlideTheme;
  /** Compensates for extra padding in source PNG (e.g. daily-rides is 110px vs 77px) */
  imageScale?: number;
};

const SLIDES: RideSlide[] = [
  {
    num: "01",
    title: "Daily Rides",
    tagline: "City taxis · verified drivers",
    label: "DAILY RIDES",
    image: "/images/six-rides/daily-rides.png",
    imageScale: 1.55,
    headlineLead: "Book your",
    headlineAccent: "city ride.",
    description:
      "A taxi-stand platform connecting you with verified drivers and transparent fares. No surge pricing. No hidden commission. No surprises.",
    tags: ["Zero commission", "Verified drivers", "Live tracking", "Cash or card"],
    cta: "Explore Taxi Stand",
    href: "/taxi-stand",
    badge: "AVAILABLE NOW · 12 CITIES",
    theme: {
      panelClass: "bg-gradient-to-br from-[#fce001] via-[#ffd81d] to-[#fdb813]",
      textPrimary: "text-[#0b0b0b]",
      textMuted: "text-[#0b0b0b]/75",
      indexClass: "text-[#0b0b0b]/45",
      badgeClass: "bg-[#0b0b0b]/88 text-white",
      tagClass: "border border-[#0b0b0b]/12 bg-white/35 text-[#0b0b0b]/80",
    },
  },
  {
    num: "02",
    title: "Pool Ride",
    tagline: "Shared rides · split fares",
    label: "POOL RIDE",
    image: "/images/six-rides/pool-ride.png",
    headlineLead: "Share &",
    headlineAccent: "save.",
    description:
      "Affordable shared rides with verified co-passengers. Your wallet wins, the city wins. Split the fare, not the experience.",
    tags: ["40% cheaper", "Female-only pool", "Verified co-riders"],
    cta: "Explore Pool Ride",
    href: "/pool-ride",
    badge: "SAVE UP TO 40%",
    theme: {
      panelClass: "bg-gradient-to-br from-[#ff9a3c] via-[#ffb84d] to-[#ffd81d]",
      textPrimary: "text-white",
      textMuted: "text-white/80",
      indexClass: "text-white/50",
      badgeClass: "bg-white/20 text-white backdrop-blur-sm",
      tagClass: "border border-white/35 bg-white/15 text-white",
    },
  },
  {
    num: "03",
    title: "Delivery",
    tagline: "Parcels · live-tracked",
    label: "DELIVERY",
    image: "/images/six-rides/delivery.png",
    headlineLead: "Send anywhere,",
    headlineAccent: "tracked live.",
    headlineStacked: true,
    description:
      "Connect with vetted delivery partners across the city. Documents, food, parcels — same-day, transparent, commission-free.",
    tags: ["Same-day", "Live GPS", "Proof of delivery"],
    cta: "Explore Delivery",
    href: "/delivery",
    badge: "FAST · CITY-WIDE",
    theme: {
      panelClass: "bg-gradient-to-br from-[#0a0a0a] via-[#1a1810] to-[#2f2c1a]",
      textPrimary: "text-white",
      textMuted: "text-white/90",
      indexClass: "text-white/40",
      badgeClass: "bg-black/35 text-white border border-white/20 backdrop-blur-sm",
      tagClass: "border border-white/25 bg-white/8 text-white/90",
      topGlow:
        "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[radial-gradient(ellipse_70%_55%_at_18%_22%,rgba(252,224,1,0.14),transparent_58%)]",
    },
  },
  {
    num: "04",
    title: "Logistics",
    tagline: "Bulk freight · for business",
    label: "LOGISTICS",
    image: "/images/six-rides/logistics.png",
    headlineLead: "Move",
    headlineAccent: "bigger.",
    description:
      "Enterprise loads with zero commission. Bulk logistics solutions for warehousing, distribution, and B2B fulfilment at scale.",
    tags: ["Account manager", "Volume pricing", "Live dashboard"],
    cta: "Explore Logistics",
    href: "/logistic",
    badge: "FOR BUSINESS",
    theme: {
      panelClass: "bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#6366f1]",
      textPrimary: "text-white",
      textMuted: "text-white",
      indexClass: "text-white/50",
      badgeClass: "bg-white/15 text-white border border-white/20",
      tagClass: "border border-white/30 bg-white/10 text-white",
    },
  },
  {
    num: "05",
    title: "Trip",
    tagline: "Long-distance · pre-planned",
    label: "TRIP",
    image: "/images/six-rides/trip.png",
    headlineLead: "Plan your",
    headlineAccent: "escape.",
    description:
      "Long-distance bookings with pre-planned routes, trusted drivers, and collaborative trip planning — from Hunza to Karachi, no fees attached.",
    tags: ["Pre-planned routes", "Group bookings", "Verified drivers"],
    cta: "Explore Trip",
    href: "/trip",
    badge: "LONG-DISTANCE READY",
    theme: {
      panelClass: "bg-gradient-to-br from-[#1b3d2f] via-[#234a38] to-[#2e5a42]",
      textPrimary: "text-white",
      textMuted: "text-white",
      indexClass: "text-white/45",
      badgeClass: "bg-[#4ade80]/20 text-white border border-[#4ade80]/30",
      tagClass: "border border-white/28 bg-white/10 text-white",
    },
  },
  {
    num: "06",
    title: "Tracking",
    tagline: "Real-time · family-shared",
    label: "TRACKING",
    image: "/images/six-rides/tracking.png",
    headlineLead: "Always",
    headlineAccent: "in view.",
    description:
      "Real-time location sharing on every ride, delivery, and trip. Private by default, family-shared when you want it — privacy and safety, balanced.",
    tags: ["Live GPS", "Family-share", "Auto-stop on arrival"],
    cta: "Explore Tracking",
    href: "/taxi-stand",
    badge: "ALWAYS ON",
    theme: {
      panelClass: "bg-gradient-to-br from-[#0f1412] via-[#152420] to-[#1a3028]",
      textPrimary: "text-white",
      textMuted: "text-white/75",
      indexClass: "text-white/40",
      badgeClass: "bg-white/10 text-white border border-white/15",
      tagClass: "border border-white/25 bg-white/8 text-white/90",
      bottomGlow:
        "after:absolute after:inset-x-8 after:bottom-0 after:h-[3px] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#fdb813] after:to-transparent",
    },
  },
];

function slideImageStyle(scale = 1): React.CSSProperties | undefined {
  if (scale === 1) return undefined;
  return { transform: `scale(${scale})`, transformOrigin: "center center" };
}

function SidebarArrowIcon({ active }: { active: boolean }): React.ReactElement {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
      style={{
        backgroundColor: active ? "#fdb813" : "#ffffff",
        color: active ? "#0b0b0b" : "#9a9890",
        borderColor: active ? "transparent" : "#e8e6df",
        transition: `background-color ${BLEND_MS}ms ${EASE}, border-color ${BLEND_MS}ms ${EASE}, color ${BLEND_MS}ms ${EASE}`,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="block shrink-0"
        aria-hidden
      >
        <path
          d="M2.5 11.5L11.5 2.5M11.5 2.5H4.75M11.5 2.5V9.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
function SidebarItem({
  slide,
  active,
  onSelect,
}: {
  slide: RideSlide;
  active: boolean;
  onSelect: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative z-[1] flex h-full min-h-[52px] w-full items-center gap-3 rounded-[20px] px-4 py-3 text-left"
    >
      <span
        className="w-8 shrink-0 font-poppins text-[14px] font-semibold leading-none"
        style={{
          color: active ? "#fdb813" : "#c8c6be",
          transition: `color ${BLEND_MS}ms ${EASE}`,
        }}
      >
        {slide.num}
      </span>

      <span className="relative size-12 shrink-0 overflow-hidden rounded-[14px]">
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-contain"
          style={slideImageStyle(slide.imageScale)}
          sizes="48px"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block font-poppins text-[15px] font-semibold leading-tight"
          style={{
            color: active ? "#ffffff" : "#0b0b0b",
            transition: `color ${BLEND_MS}ms ${EASE}`,
          }}
        >
          {slide.title}
        </span>
        <span
          className="mt-0.5 block truncate font-poppins text-[12px] font-normal leading-snug"
          style={{
            color: active ? "rgba(255,255,255,0.5)" : "#6f6e68",
            transition: `color ${BLEND_MS}ms ${EASE}`,
          }}
        >
          {slide.tagline}
        </span>
      </span>

      <SidebarArrowIcon active={active} />
    </button>
  );
}

function Sidebar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}): React.ReactElement {
  return (
    <nav
      className="flex h-full min-h-0 flex-col gap-1.5 max-lg:max-h-none max-lg:flex-row max-lg:gap-2 max-lg:overflow-x-auto max-lg:pb-1 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden"
      aria-label="Ride categories"
    >
      {SLIDES.map((slide, index) => {
        const active = index === activeIndex;

        return (
          <div key={slide.num} className="relative min-h-0 flex-1 max-lg:h-auto max-lg:min-w-[148px] max-lg:flex-none">
            <div
              className="pointer-events-none absolute inset-0 rounded-[20px]"
              style={{
                backgroundColor: active ? "#0b0b0b" : "#ffffff",
                boxShadow: active
                  ? "0 12px 32px rgba(11,11,11,0.16)"
                  : "0 2px 12px rgba(11,11,11,0.04)",
                transition: `background-color ${BLEND_MS}ms ${EASE}, box-shadow ${BLEND_MS}ms ${EASE}`,
              }}
              aria-hidden
            />

            <span
              className="pointer-events-none absolute inset-y-3 left-0 z-[2] w-[3px] rounded-full bg-[#fdb813]"
              style={blendStyle(active)}
              aria-hidden
            />

            <SidebarItem slide={slide} active={active} onSelect={() => onSelect(index)} />
          </div>
        );
      })}
    </nav>
  );
}

function SlidePanelContent({ slide }: { slide: RideSlide }): React.ReactElement {
  const { theme: t } = slide;

  return (
    <div className="flex h-full flex-col p-5 sm:p-7 lg:p-9">
      <div className="flex shrink-0 flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <span
          className={`inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 font-poppins text-[11px] font-semibold uppercase tracking-[0.1em] sm:text-[12px] ${t.badgeClass}`}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" aria-hidden />
          {slide.badge}
        </span>
        <span
          className={`min-w-0 shrink font-poppins text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[12px] ${t.indexClass}`}
        >
          / {slide.num} — {slide.label}
        </span>
      </div>

      <div className="mt-7 flex min-h-0 flex-1 flex-col">
        <div className="relative size-[156px] shrink-0 overflow-hidden rounded-[22px]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-contain"
            style={slideImageStyle(slide.imageScale)}
            sizes="156px"
            priority={slide.num === "01"}
          />
        </div>

        <div className="mt-7 max-w-[540px]">
          <h3 className={`leading-[1.06] tracking-[-0.025em] ${t.textPrimary}`}>
            {slide.headlineStacked ? (
              <>
                <span className="block font-poppins text-[clamp(2rem,9vw,3.75rem)] font-bold leading-[1.02]">
                  {slide.headlineLead}
                </span>
                <span
                  className={`${accentSerif.className} mt-0.5 block text-[clamp(2rem,9vw,3.75rem)] font-normal leading-[1.02]`}
                >
                  {slide.headlineAccent}
                </span>
              </>
            ) : (
              <>
                <span className="font-poppins text-[clamp(2rem,9vw,3.75rem)] font-bold leading-[1.02]">
                  {slide.headlineLead}
                </span>{" "}
                <span
                  className={`${accentSerif.className} text-[clamp(2rem,9vw,3.75rem)] font-normal leading-[1.02]`}
                >
                  {slide.headlineAccent}
                </span>
              </>
            )}
          </h3>
          <p className={`${DESCRIPTION_CLASS} ${t.textMuted}`}>
            {slide.description}
          </p>
        </div>
      </div>

      <div className="mt-auto grid w-full grid-cols-1 items-stretch gap-3 pt-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-4">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {slide.tags.map((tag) => (
            <span
              key={tag}
              className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 font-poppins text-[10px] font-medium leading-none sm:px-3 sm:text-[11px] ${t.tagClass}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={slide.href}
          className="group relative z-10 inline-flex h-9 shrink-0 items-center gap-1 rounded-full bg-[#0b0b0b] py-0 pl-3 pr-1 font-poppins text-[12px] font-semibold leading-none text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition-colors duration-500 hover:bg-[#1a1a1a] sm:pl-3.5 sm:text-[13px]"
        >
          {slide.cta}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fdb813] text-[10px] font-bold leading-none text-[#0b0b0b] transition-transform duration-500 group-hover:-rotate-45 sm:h-7 sm:w-7 sm:text-[11px]">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function DetailPanel({ activeIndex }: { activeIndex: number }): React.ReactElement {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(11,11,11,0.12)] sm:min-h-[420px] sm:rounded-[32px] lg:min-h-0 lg:rounded-[40px]">
      {SLIDES.map((s, i) => (
        <div
          key={`bg-${s.num}`}
          className={`absolute inset-0 ${s.theme.panelClass} ${s.theme.topGlow ?? ""} ${s.theme.bottomGlow ?? ""}`}
          style={{
            ...blendStyle(i === activeIndex),
            zIndex: i === activeIndex ? 2 : 1,
            pointerEvents: "none",
          }}
          aria-hidden={i !== activeIndex}
        />
      ))}

      <div className="relative z-[3] h-full">
        {SLIDES.map((slide, i) => {
          const active = i === activeIndex;

          return (
            <div
              key={`content-${slide.num}`}
              className="absolute inset-0"
              style={{
                ...blendStyle(active),
                zIndex: active ? 2 : 1,
                pointerEvents: active ? "auto" : "none",
              }}
              aria-hidden={!active}
            >
              <SlidePanelContent slide={slide} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SixRidesSection(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#fffcf2] py-12 sm:py-16 lg:py-20"
      aria-labelledby="six-rides-heading"
    >
      <div className="relative z-[1] mx-auto w-full max-w-[1690px] px-4 sm:px-8 lg:px-[114px]">
        <div className="mx-auto mb-10 max-w-[760px] text-center sm:mb-12 lg:mb-14">
          <h2
            id="six-rides-heading"
            className="font-poppins text-[clamp(2rem,4.17vw,5rem)] font-bold leading-[1.02] tracking-[-0.03em]"
          >
            <span className="text-[#0b0b0b]">Six rides.</span>{" "}
            <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent">
              One promise.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] font-poppins text-[17px] font-normal leading-[1.55] text-[#6f6e68]">
            From daily commutes to enterprise logistics — every category, zero commission,
            real-time tracking, every time.
          </p>
        </div>

        <div className="grid gap-5 lg:h-[560px] lg:grid-cols-[380px_1fr] lg:items-stretch lg:gap-5">
          <div className="min-w-0 max-lg:-mx-1 max-lg:overflow-hidden">
            <Sidebar activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>

          <div className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-0 lg:h-full">
            <DetailPanel activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
