"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

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
    subtitle: "City rides",
    listDescription:
      "Book verified city rides in seconds. Fair pricing, no surge, no hidden charges.",
    panelDescription:
      "Commission-free city rides across Pakistan. Connect directly with verified drivers — no middlemen, no surprises.",
    features: ["Verified drivers", "Fixed fares", "0% commission"],
    icon: "/images/five-rides/icon-taxi.png",
    panelIcon: "/images/five-rides/panel-taxi.png",
    href: "/taxi-stand",
  },
  {
    id: "pool",
    title: "Pool Ride",
    titleWithPeriod: "Pool Ride.",
    subtitle: "Shared trips",
    listDescription:
      "Share your ride with others going the same way. Split costs and travel greener.",
    panelDescription:
      "Affordable shared rides with verified co-passengers. Split the fare, not the experience — greener travel for everyone.",
    features: ["Split fares", "Verified riders", "Eco-friendly"],
    icon: "/images/five-rides/icon-pool.png",
    panelIcon: "/images/five-rides/panel-pool.png",
    href: "/pool-ride",
  },
  {
    id: "delivery",
    title: "Delivery",
    titleWithPeriod: "Delivery.",
    subtitle: "Fast delivery",
    listDescription:
      "Send packages across the city in minutes with real-time tracking and verified couriers.",
    panelDescription:
      "Connect with vetted delivery partners across the city. Documents, food, parcels — same-day, transparent, commission-free.",
    features: ["Same-day", "Live GPS", "Verified couriers"],
    icon: "/images/five-rides/icon-delivery.png",
    panelIcon: "/images/five-rides/panel-delivery.png",
    href: "/delivery",
  },
  {
    id: "logistics",
    title: "Logistics",
    titleWithPeriod: "Logistics.",
    subtitle: "Enterprise",
    listDescription:
      "Custom logistics solutions for businesses. Scale operations with reliable enterprise support.",
    panelDescription:
      "Enterprise loads with zero commission. Bulk logistics for warehousing, distribution, and B2B fulfilment at scale.",
    features: ["Volume pricing", "Account manager", "Live dashboard"],
    icon: "/images/five-rides/icon-logistics.png",
    panelIcon: "/images/five-rides/panel-logistics.png",
    href: "/logistic",
  },
  {
    id: "trip",
    title: "Trip",
    titleWithPeriod: "Trip.",
    subtitle: "Plan journey",
    listDescription:
      "Plan and book intercity journeys with ease. Explore Pakistan your way, on your schedule.",
    panelDescription:
      "Long-distance bookings with pre-planned routes and trusted drivers — from Hunza to Karachi, no fees attached.",
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

function WaveDivider() {
  return (
    <svg
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[18%] lg:block"
      viewBox="0 0 120 560"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M48 0C72 70 18 140 48 210C78 280 18 350 48 420C78 490 40 530 48 560L120 560L120 0Z"
        fill="#111111"
      />
      <path
        d="M48 0C72 70 18 140 48 210C78 280 18 350 48 420C78 490 40 530 48 560"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FeaturePill({ label }: { label: string }) {
  return (
    <span className="inline-flex w-fit max-w-full items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-2.5 text-[12px] font-semibold text-white sm:px-4 sm:py-3 sm:text-[13px]">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b]">
        <CheckIcon className="h-2.5 w-2.5" />
      </span>
      {label}
    </span>
  );
}

function DetailPanel({ ride }: { ride: RideItem }) {
  return (
    <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] bg-[#FCE001] p-5 sm:min-h-[340px] sm:rounded-[32px] sm:p-6 lg:min-h-[420px] lg:rounded-[40px] lg:rounded-r-none lg:p-8">
      <WaveDivider />

      {/* Stacked crossfade — Figma Smart Animate style (opacity only, in place) */}
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
              className="mb-5 inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-[20px] bg-[#0b0b0b] shadow-[0_10px_28px_rgba(11,11,11,0.22)] sm:mb-6 sm:h-24 sm:w-24 sm:rounded-[24px] lg:h-28 lg:w-28 lg:rounded-[28px]"
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

            <h3 className="font-poppins text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0b0b0b] sm:text-[40px] lg:text-[48px]">
              {ride.titleWithPeriod}
            </h3>

            <p className="mt-3 max-w-[380px] font-poppins text-[14px] font-normal leading-[1.55] text-[#0b0b0b]/80 sm:mt-3.5 sm:text-[15px] lg:text-[16px]">
              {ride.panelDescription}
            </p>

            <div className="mt-5 flex flex-col items-start gap-2.5 sm:mt-6 sm:gap-3 lg:mt-auto lg:justify-end lg:gap-3.5 lg:pt-6">
              {ride.features.map((feature) => (
                <FeaturePill key={feature} label={feature} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
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
            className="h-[72%] w-[72%] object-contain"
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
        <span className="mt-1 block font-poppins text-[11px] font-normal leading-snug text-[#9a968c] sm:text-[12px]">
          {ride.listDescription}
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
      className="relative flex h-full flex-col justify-center gap-1 bg-[#111111] px-3.5 py-4 sm:gap-1.5 sm:px-4 sm:py-5 lg:rounded-r-[40px] lg:px-5 lg:py-6"
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
      <div className="relative z-[1] mx-auto w-[92%] max-w-[1200px]">
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
            From daily commutes to enterprise logistics — every category, zero
            commission, real-time tracking, every time.
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-[28px] border border-[#eceae4] shadow-[0_16px_48px_rgba(11,11,11,0.08)] sm:rounded-[32px] lg:rounded-[40px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <DetailPanel ride={activeRide} />
            <RideList activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
