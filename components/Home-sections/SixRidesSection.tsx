"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

/**
 * Figma Smart Animate–style curves for Five Rides prototype.
 * Durations ≈ 300–360ms (prototype feel); ease-in-out cubic-bezier.
 */
const EASE_IO: [number, number, number, number] = [0.42, 0, 0.58, 1];
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.32;
const DURATION_FAST = 0.24;
const DURATION_SLOW = 0.4;

const accentYellowClass =
  "bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent";

type RideItem = {
  id: string;
  title: string;
  titleWithPeriod: string;
  subtitle: string;
  listDescription: string;
  panelDescription: string;
  boldPhrases?: readonly string[];
  features: string[];
  icon: string;
  panelIcon: string;
  href: string;
};

const RIDES: RideItem[] = [
  {
    id: "taxi",
    title: "Taxi Stand",
    titleWithPeriod: "Taxi Stand.",
    subtitle: "Wherever you're going, let's get you there.",
    listDescription:
      "Work, university, the airport, back home — book a taxi in seconds with verified drivers. Fares are set upfront, pickups are quick, and there's no surge pricing sneaking up on you at the worst time. Built for the daily commute.",
    panelDescription:
      "Work, university, the airport, back home — book a taxi in seconds with verified drivers. Fares are set upfront, pickups are quick, and there's no surge pricing sneaking up on you at the worst time. Built for the daily commute.",
    boldPhrases: ["verified drivers", "no surge pricing"],
    features: ["Verified drivers", "Fixed fares", "0% commission"],
    icon: "/images/five-rides/icon-taxi.png",
    panelIcon: "/images/five-rides/panel-taxi.png",
    href: "/taxi-stand",
  },
  {
    id: "pool",
    title: "Pool Ride",
    titleWithPeriod: "Pool Ride.",
    subtitle: "Same route. Lower fare.",
    listDescription:
      "Traveling the same direction as someone else? Split the cost. Pool Ride cuts down your travel expenses and keeps more cars off the road, a solid option for students, professionals, and anyone doing the same commute day after day.",
    panelDescription:
      "Traveling the same direction as someone else? Split the cost. Pool Ride cuts down your travel expenses and keeps more cars off the road, a solid option for students, professionals, and anyone doing the same commute day after day.",
    features: ["Split fares", "Verified riders", "Eco-friendly"],
    icon: "/images/five-rides/icon-pool.png",
    panelIcon: "/images/five-rides/panel-pool.png",
    href: "/pool-ride",
  },
  {
    id: "delivery",
    title: "Delivery",
    titleWithPeriod: "Delivery.",
    subtitle: "Send it across town, without the wait.",
    listDescription:
      "Documents, gifts, business orders, everyday errands, our delivery service handles it. Every parcel is tracked in real time from pickup to doorstep, with couriers you can actually trust.",
    panelDescription:
      "Documents, gifts, business orders, everyday errands, our delivery service handles it. Every parcel is tracked in real time from pickup to doorstep, with couriers you can actually trust.",
    boldPhrases: ["real time"],
    features: ["Same-day", "Live GPS", "Verified couriers"],
    icon: "/images/five-rides/icon-delivery.png",
    panelIcon: "/images/five-rides/panel-delivery.png",
    href: "/delivery",
  },
  {
    id: "logistics",
    title: "Logistics",
    titleWithPeriod: "Logistics.",
    subtitle: "Reliable transport for growing businesses.",
    listDescription:
      "Running a retail store or managing enterprise operations, deliveries pile up fast and someone still has to sort them out. Our logistics solutions give you dedicated fleet support and delivery options built to keep pace as your business grows.",
    panelDescription:
      "Running a retail store or managing enterprise operations, deliveries pile up fast and someone still has to sort them out. Our logistics solutions give you dedicated fleet support and delivery options built to keep pace as your business grows.",
    features: ["Volume pricing", "Account manager", "Live dashboard"],
    icon: "/images/five-rides/icon-logistics.png",
    panelIcon: "/images/five-rides/panel-logistics.png",
    href: "/logistic",
  },
  {
    id: "trip",
    title: "Trip",
    titleWithPeriod: "Trip.",
    subtitle: "Every journey deserves a comfortable ride.",
    listDescription:
      "Visiting family out of town, driving in for a business meeting, or heading off for a weekend getaway. Book a verified driver and travel on your own schedule, with flexible intercity ride options across Pakistan.",
    panelDescription:
      "Visiting family out of town, driving in for a business meeting, or heading off for a weekend getaway. Book a verified driver and travel on your own schedule, with flexible intercity ride options across Pakistan.",
    boldPhrases: ["verified driver", "intercity ride"],
    features: ["Pre-planned routes", "Group bookings", "Verified drivers"],
    icon: "/images/five-rides/icon-trip.png",
    panelIcon: "/images/five-rides/panel-trip.png",
    href: "/trip",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5 6.5 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PanelBackground() {
  // Desktop-only B-scallop on the right edge of the yellow panel.
  const desktopPath =
    "M0 0 H920 C950 0 975 40 980 110 C985 175 978 235 965 285 C948 308 920 314 900 320 C920 326 948 332 965 355 C978 405 985 465 980 530 C975 600 950 640 920 640 H0 Z";

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      viewBox="0 0 1000 640"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={desktopPath} fill="#FCE001" />
      <path d={desktopPath} fill="url(#five-rides-yellow-glow)" />
      <defs>
        <radialGradient
          id="five-rides-yellow-glow"
          cx="18%"
          cy="22%"
          r="70%"
          fx="12%"
          fy="12%"
        >
          <stop offset="0%" stopColor="#fff6a8" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#FCE001" stopOpacity="0" />
          <stop offset="100%" stopColor="#FDB813" stopOpacity="0.18" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-2.5 text-[12px] font-semibold leading-none whitespace-nowrap text-white sm:px-4 sm:py-3 sm:text-[13px]">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b]">
        <CheckIcon className="h-2.5 w-2.5" />
      </span>
      {label}
    </span>
  );
}

function DetailPanel({
  ride,
  activeIndex,
  onSelect,
}: {
  ride: RideItem;
  activeIndex: number;
  onSelect?: (index: number) => void;
}) {
  const step = String(activeIndex + 1).padStart(2, "0");
  const total = String(RIDES.length).padStart(2, "0");
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < RIDES.length - 1;

  return (
    <div className="relative flex h-full flex-col lg:min-h-[420px] lg:rounded-l-[40px]">
      {/* ——— Mobile spotlight panel ——— */}
      <div className="relative overflow-hidden lg:hidden">
        <div className="relative overflow-hidden bg-[#FCE001] px-5 pb-8 pt-5 sm:px-6 sm:pb-9 sm:pt-6">
          {/* Soft bottom wave into black — light, not the desktop B-curve */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full text-[#0b0b0b]"
            viewBox="0 0 400 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 18 C70 34 130 40 200 40 C270 40 330 34 400 18 V40 H0 Z"
              fill="currentColor"
            />
          </svg>

          {/* Atmosphere */}
          <div
            className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full border border-[#0b0b0b]/[0.08]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-2 -top-4 h-32 w-32 rounded-full border border-[#0b0b0b]/[0.1]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-16 h-40 w-40 rounded-full bg-white/35 blur-3xl"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-3 top-2 select-none font-poppins text-[88px] font-black leading-none text-[#0b0b0b]/[0.06]"
            aria-hidden
          >
            {step}
          </span>

          <div className="relative z-[1] mb-5 flex items-center justify-between gap-3">
            <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b0b0b]/55">
              {step} / {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous ride"
                disabled={!canPrev || !onSelect}
                onClick={() => onSelect?.(activeIndex - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0b0b0b]/20 bg-[#0b0b0b]/[0.06] text-[#0b0b0b] disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next ride"
                disabled={!canNext || !onSelect}
                onClick={() => onSelect?.(activeIndex + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b0b0b] text-[#FCE001] disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={ride.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE_IO }}
              className="relative z-[1]"
            >
              <div className="flex items-start gap-4">
                <Link
                  href={ride.href}
                  className="inline-flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#0b0b0b] shadow-[0_14px_32px_rgba(11,11,11,0.32)]"
                  aria-label={`Go to ${ride.title}`}
                >
                  <Image
                    src={ride.panelIcon}
                    alt=""
                    width={56}
                    height={56}
                    className="h-[72%] w-[72%] object-contain"
                    unoptimized
                  />
                </Link>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-poppins text-[clamp(26px,7.2vw,34px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0b0b0b]">
                    {ride.titleWithPeriod}
                  </h3>
                  <p className="mt-1.5 font-poppins text-[12px] font-semibold italic text-[#0b0b0b]/65">
                    {ride.subtitle}
                  </p>
                </div>
              </div>

              <p
                className="mt-4 font-poppins text-[13.5px] font-normal leading-[1.45] text-[#0b0b0b]/78"
                title={ride.panelDescription}
              >
                {emphasizePhrases(ride.panelDescription, ride.boldPhrases ?? [])}
              </p>

              <div className="mt-4 flex flex-col items-start gap-2.5">
                {ride.features.map((feature) => (
                  <FeaturePill key={feature} label={feature} />
                ))}
              </div>

              <Link
                href={ride.href}
                className="mt-5 flex w-full items-center justify-between rounded-[16px] bg-[#0b0b0b] px-4 py-3.5 font-poppins text-[14px] font-semibold text-[#FCE001]"
              >
                <span>Explore {ride.title}</span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE001] text-[14px] font-bold text-[#0b0b0b]"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ——— Desktop curved panel ——— */}
      <div className="relative hidden h-full min-h-[420px] flex-col overflow-hidden bg-transparent p-7 lg:flex xl:p-8">
        <PanelBackground />
        <div className="relative z-[1] grid flex-1">
          <AnimatePresence initial={false}>
            <motion.div
              key={ride.id}
              className="col-start-1 row-start-1 flex h-full flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_IO }}
            >
              <Link
                href={ride.href}
                className="mb-4 inline-flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-[26px] bg-[#0b0b0b] shadow-[0_10px_28px_rgba(11,11,11,0.22)] xl:mb-5 xl:h-28 xl:w-28 xl:rounded-[28px]"
                aria-label={`Go to ${ride.title}`}
              >
                <Image
                  src={ride.panelIcon}
                  alt=""
                  width={112}
                  height={112}
                  className="h-[70%] w-[70%] object-contain"
                  unoptimized
                />
              </Link>

              <h3 className="max-w-[92%] font-poppins text-[42px] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#0b0b0b] xl:text-[48px]">
                {ride.titleWithPeriod}
              </h3>
              <p className="mt-2 max-w-[92%] font-poppins text-[17px] font-semibold italic leading-snug text-[#0b0b0b] xl:text-[18px]">
                {ride.subtitle}
              </p>
              <p
                className="mt-3 max-w-[92%] font-poppins text-[15px] font-normal leading-[1.55] text-[#0b0b0b]/85 xl:text-[16px]"
                title={ride.panelDescription}
              >
                {emphasizePhrases(ride.panelDescription, ride.boldPhrases ?? [])}
              </p>

              <div className="mt-5 flex flex-1 flex-col justify-end gap-4 pb-1">
                <div className="flex flex-col items-start gap-3">
                  {ride.features.map((feature) => (
                    <FeaturePill key={feature} label={feature} />
                  ))}
                </div>

                <Link
                  href={ride.href}
                  className="group inline-flex w-fit max-w-full items-center gap-3 rounded-full bg-[#0b0b0b] py-2.5 pl-5 pr-2.5 font-poppins text-[14px] font-semibold text-[#FCE001] transition-transform hover:-translate-y-0.5"
                >
                  <span>Explore {ride.title}</span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FCE001] text-[14px] font-bold text-[#0b0b0b] transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileRideChips({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(
      `[data-ride-index="${activeIndex}"]`,
    );
    if (!card) return;

    // Scroll only inside the chip strip — scrollIntoView({ inline:"center" })
    // also shifts the page horizontally on the last slide and leaves empty space.
    const rootRect = root.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target =
      root.scrollLeft +
      (cardRect.left - rootRect.left) -
      (root.clientWidth - card.offsetWidth) / 2;
    const max = Math.max(0, root.scrollWidth - root.clientWidth);

    root.scrollTo({
      left: Math.min(Math.max(0, target), max),
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div className="relative bg-[#0b0b0b] px-4 pb-6 pt-4 lg:hidden">
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute bottom-6 left-0 top-14 z-[2] w-8 bg-gradient-to-r from-[#0b0b0b] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 right-0 top-14 z-[2] w-8 bg-gradient-to-l from-[#0b0b0b] to-transparent"
        aria-hidden
      />

      <div className="mb-3.5 flex items-center justify-between gap-3">
        <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a968c]">
          Browse services
        </p>
        <div className="flex items-center gap-1.5" aria-hidden>
          {RIDES.map((ride, index) => (
            <button
              key={ride.id}
              type="button"
              aria-label={`Go to ${ride.title}`}
              onClick={() => onSelect(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-5 bg-[#FCE001]"
                  : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Ride categories"
      >
        {RIDES.map((ride, index) => {
          const active = index === activeIndex;
          return (
            <motion.button
              key={ride.id}
              type="button"
              role="tab"
              data-ride-index={index}
              aria-selected={active}
              onClick={() => onSelect(index)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex w-[156px] shrink-0 snap-center flex-col overflow-hidden rounded-[20px] border p-3.5 text-left transition-colors ${
                active
                  ? "border-[#FCE001]/55 bg-gradient-to-b from-[#222] to-[#141414] shadow-[0_0_32px_rgba(252,224,1,0.2)]"
                  : "border-white/10 bg-[#141414]"
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="mobile-ride-glow"
                  className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-[#FCE001]/40"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}

              <div className="relative mb-3 flex items-center justify-between">
                <span
                  className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-[13px] ${
                    active ? "bg-[#FCE001]" : "bg-[#f4f1ea]"
                  }`}
                >
                  <Image
                    src={ride.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-[88%] w-[88%] object-contain"
                    unoptimized
                  />
                </span>
                <span
                  className={`font-poppins text-[10px] font-bold tracking-wide ${
                    active ? "text-[#FCE001]" : "text-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <span
                className={`relative font-poppins text-[14px] font-bold leading-tight ${
                  active ? "text-[#FCE001]" : "text-white"
                }`}
              >
                {ride.title}
              </span>
              <span
                className={`relative mt-1 font-poppins text-[11px] font-medium italic ${
                  active ? "text-[#FCE001]/75" : "text-[#9a968c]"
                }`}
              >
                {ride.subtitle}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function RideListItem({
  ride,
  active,
  onSelect,
}: {
  ride: RideItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      layout
      className="group relative z-[1] flex w-full items-center gap-3 rounded-[18px] px-3 py-2.5 text-left sm:gap-3.5 sm:rounded-[20px] sm:px-3.5 sm:py-3"
      aria-pressed={active}
      whileHover={!active ? { backgroundColor: "rgba(255,255,255,0.03)" } : undefined}
      transition={{ duration: DURATION_FAST, ease: EASE_IO }}
    >
      {/* Sliding active highlight */}
      {active ? (
        <motion.span
          layoutId="five-rides-active-row"
          className="pointer-events-none absolute inset-0 rounded-[20px] bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(252,224,1,0.12),0_12px_32px_rgba(0,0,0,0.35)] sm:rounded-[24px]"
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.8 }}
          aria-hidden
        />
      ) : null}

      {/* Rail glow dot */}
      <motion.span
        className="absolute -left-[5px] top-1/2 z-[2] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#FCE001] sm:-left-[6px]"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.5,
          boxShadow: active
            ? "0 0 10px 3px rgba(252,224,1,0.55)"
            : "0 0 0px 0px rgba(252,224,1,0)",
        }}
        transition={{ duration: DURATION, ease: EASE_OUT }}
        aria-hidden
      />

      <motion.span
        className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] sm:h-12 sm:w-12 sm:rounded-[16px]"
        initial={false}
        animate={{
          backgroundColor: active ? "#FCE001" : "#f4f1ea",
          boxShadow: active
            ? "0 0 22px rgba(252,224,1,0.45)"
            : "0 0 0px rgba(252,224,1,0)",
          scale: active ? 1.04 : 1,
        }}
        transition={{ duration: DURATION, ease: EASE_IO }}
      >
        <motion.span
          className="flex h-full w-full items-center justify-center"
          initial={false}
          animate={{ scale: active ? 1 : 0.96 }}
          transition={{ duration: DURATION, ease: EASE_OUT }}
        >
          <Image
            src={ride.icon}
            alt=""
            width={48}
            height={48}
            className="h-[88%] w-[88%] object-contain"
            unoptimized
          />
        </motion.span>
      </motion.span>

      <span className="relative z-[1] min-w-0 flex-1">
        <motion.span
          className="block font-poppins text-[15px] font-bold leading-tight sm:text-[16px]"
          initial={false}
          animate={{ color: active ? "#FCE001" : "#ffffff" }}
          transition={{ duration: DURATION_FAST, ease: EASE_IO }}
        >
          {ride.title}
        </motion.span>
        <motion.span
          className="mt-0.5 block font-poppins text-[12px] font-medium italic leading-snug sm:text-[13px]"
          initial={false}
          animate={{ color: active ? "rgba(252,224,1,0.8)" : "#FCE001" }}
          transition={{ duration: DURATION_FAST, ease: EASE_IO }}
        >
          {ride.subtitle}
        </motion.span>
        <span
          className="mt-1 block line-clamp-2 min-h-[2.5em] font-poppins text-[11px] font-normal leading-snug text-[#9a968c] sm:text-[12px]"
          title={ride.listDescription}
        >
          {emphasizePhrases(ride.listDescription, ride.boldPhrases ?? [], "onDark")}
        </span>
      </span>

      <motion.span
        className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
        initial={false}
        animate={{
          backgroundColor: active ? "#FCE001" : "rgba(0,0,0,0)",
          borderColor: active ? "rgba(252,224,1,0)" : "rgba(252,224,1,0.55)",
          color: active ? "#0b0b0b" : "#FCE001",
          scale: active ? 1.06 : 1,
        }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
        transition={{ duration: DURATION, ease: EASE_IO }}
        aria-hidden
      >
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.span
              key="check"
              className="flex"
              initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 40 }}
              transition={{ duration: DURATION_FAST, ease: EASE_OUT }}
            >
              <CheckIcon className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              className="flex"
              initial={{ opacity: 0, scale: 0.6, rotate: 40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -40 }}
              transition={{ duration: DURATION_FAST, ease: EASE_OUT }}
            >
              <PlusIcon className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}

function RideList({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav
      className="relative z-[1] hidden h-full flex-col justify-center gap-1 bg-[#111111] px-3.5 py-4 sm:gap-1.5 sm:px-4 sm:py-5 lg:flex lg:rounded-r-[40px] lg:bg-[#0b0b0b] lg:px-5 lg:py-6"
      aria-label="Ride categories"
    >
      <div
        className="pointer-events-none absolute bottom-10 left-[34px] top-10 w-px border-l border-dashed border-white/20 sm:left-[38px] lg:left-[42px]"
        aria-hidden
      />

      <LayoutGroup id="five-rides-list">
        {RIDES.map((ride, index) => (
          <RideListItem
            key={ride.id}
            ride={ride}
            active={index === activeIndex}
            onSelect={() => onSelect(index)}
          />
        ))}
      </LayoutGroup>
    </nav>
  );
}

export default function SixRidesSection(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRide = RIDES[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#FEFBF6] py-10 sm:py-12 lg:py-14"
      aria-labelledby="six-rides-heading"
    >
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-6 max-w-[720px] text-center sm:mb-8 lg:mb-9"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: DURATION_SLOW, ease: EASE_OUT }}
        >
          <h2
            id="six-rides-heading"
            className="font-poppins tracking-[-2.8px]"
          >
            <span className="block font-bold text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] text-[#0b0b0b]">
              Five rides.
            </span>
            <span
              className={`block text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] ${accentYellowClass}`}
            >
              One promise.
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] font-poppins text-[13px] font-normal leading-[1.6] text-[#6f6e68] sm:text-[14px]">
            However you move, we&apos;ve got a way. Everyday rides, shared trips,
            deliveries, business logistics, or a trip out of town — each service is
            built to make getting around Pakistan simpler and less of a headache.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-[#eceae4] bg-[#0b0b0b] shadow-[0_16px_48px_rgba(11,11,11,0.08)] sm:rounded-[32px] lg:rounded-[40px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
        >
          <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <DetailPanel
              ride={activeRide}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
            <MobileRideChips
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
            <RideList activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
