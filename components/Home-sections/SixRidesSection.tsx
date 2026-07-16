"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type RideItem = {
  id: string;
  title: string;
  titleWithPeriod: string;
  subtitle: string;
  listDescription: string;
  panelDescription: string;
  features: string[];
  icon: string;
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
    <span className="inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-2 text-[12px] font-semibold text-white sm:px-4 sm:text-[13px]">
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FCE001] text-[#0b0b0b]">
        <CheckIcon className="h-2.5 w-2.5" />
      </span>
      {label}
    </span>
  );
}

function DetailPanel({ ride }: { ride: RideItem }) {
  return (
    <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[28px] bg-[#FCE001] p-6 sm:min-h-[400px] sm:rounded-[32px] sm:p-8 lg:min-h-[520px] lg:rounded-[40px] lg:rounded-r-none lg:p-10">
      {/* Concentric circle pattern */}
      <div
        className="pointer-events-none absolute -left-16 -top-20 h-[420px] w-[420px] rounded-full border border-[#0b0b0b]/[0.06] sm:h-[520px] sm:w-[520px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-4 -top-8 h-[280px] w-[280px] rounded-full border border-[#0b0b0b]/[0.07] sm:h-[360px] sm:w-[360px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-8 top-12 h-[160px] w-[160px] rounded-full border border-[#0b0b0b]/[0.08] sm:h-[200px] sm:w-[200px]"
        aria-hidden
      />

      <WaveDivider />

      <div
        key={ride.id}
        className="relative z-[1] flex flex-1 flex-col animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <Link
          href={ride.href}
          className="mb-5 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px] bg-[#0b0b0b] shadow-[0_10px_28px_rgba(11,11,11,0.22)] transition-transform duration-300 hover:scale-[1.03] sm:mb-6 sm:h-16 sm:w-16 sm:rounded-[18px]"
          aria-label={`Go to ${ride.title}`}
        >
          <Image
            src={ride.icon}
            alt=""
            width={56}
            height={56}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            unoptimized
          />
        </Link>

        <h3 className="font-poppins text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#0b0b0b] sm:text-[34px] lg:text-[40px]">
          {ride.titleWithPeriod}
        </h3>

        <p className="mt-3 max-w-[340px] font-poppins text-[14px] font-normal leading-[1.55] text-[#0b0b0b]/80 sm:mt-4 sm:text-[15px]">
          {ride.panelDescription}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5 lg:mt-auto lg:pt-8">
          {ride.features.map((feature) => (
            <FeaturePill key={feature} label={feature} />
          ))}
        </div>
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
    <button
      type="button"
      onClick={onSelect}
      className={`group relative z-[1] flex w-full items-center gap-3 rounded-[20px] px-3 py-3 text-left transition-colors duration-300 sm:gap-4 sm:rounded-[24px] sm:px-4 sm:py-3.5 ${
        active
          ? "bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(252,224,1,0.12),0_12px_32px_rgba(0,0,0,0.35)]"
          : "bg-transparent hover:bg-white/[0.03]"
      }`}
      aria-pressed={active}
    >
      {/* Active glow dot on dashed rail */}
      <span
        className={`absolute -left-[5px] top-1/2 z-[2] h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-all duration-300 sm:-left-[6px] ${
          active
            ? "bg-[#FCE001] shadow-[0_0_10px_3px_rgba(252,224,1,0.55)] opacity-100 scale-100"
            : "bg-transparent opacity-0 scale-75"
        }`}
        aria-hidden
      />

      <span
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] sm:h-12 sm:w-12 sm:rounded-[16px] ${
          active
            ? "bg-[#FCE001] shadow-[0_0_22px_rgba(252,224,1,0.45)]"
            : "bg-[#f4f1ea]"
        }`}
      >
        <Image
          src={ride.icon}
          alt=""
          width={48}
          height={48}
          className="h-full w-full object-contain"
          unoptimized
        />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block font-poppins text-[15px] font-bold leading-tight sm:text-[16px] ${
            active ? "text-[#FCE001]" : "text-white"
          }`}
        >
          {ride.title}
        </span>
        <span
          className={`mt-0.5 block font-poppins text-[12px] font-medium italic leading-snug sm:text-[13px] ${
            active ? "text-[#FCE001]/80" : "text-[#FCE001]"
          }`}
        >
          {ride.subtitle}
        </span>
        <span className="mt-1 block font-poppins text-[11px] font-normal leading-snug text-[#9a968c] sm:text-[12px]">
          {ride.listDescription}
        </span>
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-10 sm:w-10 ${
          active
            ? "bg-[#FCE001] text-[#0b0b0b]"
            : "border border-[#FCE001]/55 bg-transparent text-[#FCE001] group-hover:border-[#FCE001] group-hover:bg-[#FCE001]/10"
        }`}
        aria-hidden
      >
        {active ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
      </span>
    </button>
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
      className="relative flex h-full flex-col justify-center gap-1.5 bg-[#111111] px-4 py-5 sm:gap-2 sm:px-5 sm:py-6 lg:rounded-r-[40px] lg:px-6 lg:py-8"
      aria-label="Ride categories"
    >
      {/* Dashed vertical connector */}
      <div
        className="pointer-events-none absolute bottom-10 left-[34px] top-10 w-px border-l border-dashed border-white/20 sm:left-[38px] lg:left-[42px]"
        aria-hidden
      />

      {RIDES.map((ride, index) => (
        <RideListItem
          key={ride.id}
          ride={ride}
          active={index === activeIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </nav>
  );
}

export default function SixRidesSection(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRide = RIDES[activeIndex];

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#0b0b0b] py-14 sm:py-16 lg:py-20"
      aria-labelledby="six-rides-heading"
    >
      <div className="relative z-[1] mx-auto w-[92%] max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10 lg:mb-12">
          <h2
            id="six-rides-heading"
            className="font-poppins text-[clamp(28px,4.2vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]"
          >
<<<<<<< Updated upstream
            <span className="text-[#0b0b0b]">five rides.</span>{" "}
            <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent">
              One promise.
            </span>
=======
            <span className="text-[#6f6e68]">Five rides.</span>{" "}
            <span className="text-[#FCE001]">One promise.</span>
>>>>>>> Stashed changes
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-poppins text-[14px] font-normal leading-[1.6] text-[#9a968c] sm:text-[15px]">
            From daily commutes to enterprise logistics — every category, zero
            commission, real-time tracking, every time.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-[32px] lg:rounded-[40px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <DetailPanel ride={activeRide} />
            <RideList activeIndex={activeIndex} onSelect={setActiveIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
