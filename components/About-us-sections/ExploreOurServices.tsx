"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Service = {
  number: string;
  title: string;
  label: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  /** Card tilt matching Figma fan */
  rotate: number;
  /** Drop amount — center sits highest (arc) */
  drop: number;
  z: number;
  /** Horizontal pull for overlap (px) */
  pull: number;
};

const services: Service[] = [
  {
    number: "01",
    title: "Taxi Stand",
    label: "City rides",
    description:
      "Verified city rides in seconds. Fair pricing, no surge, no hidden fees.",
    image: "/images/about/explore/card-taxi.png",
    icon: "/images/about/explore/icon-taxi.png",
    href: "/taxi-stand",
    rotate: -8,
    drop: 36,
    z: 1,
    pull: 0,
  },
  {
    number: "02",
    title: "Pool Ride",
    label: "Shared trips",
    description:
      "Share rides, split fares. Eco-friendly travel with fellow commuters.",
    image: "/images/about/explore/card-pool.png",
    icon: "/images/about/explore/icon-pool.png",
    href: "/pool-ride",
    rotate: -4,
    drop: 16,
    z: 3,
    pull: 12,
  },
  {
    number: "03",
    title: "Delivery",
    label: "Fast delivery",
    description:
      "Send parcels city-wide with verified couriers. Live tracking, no fees.",
    image: "/images/about/explore/card-delivery.png",
    icon: "/images/about/explore/icon-delivery.png",
    href: "/delivery",
    rotate: 0,
    drop: 0,
    z: 5,
    pull: 12,
  },
  {
    number: "04",
    title: "Logistic",
    label: "Enterprise",
    description:
      "Business-grade freight & bulk transport. Reliable fleet, pro handling.",
    image: "/images/about/explore/card-logistic.png",
    icon: "/images/about/explore/icon-logistic.png",
    href: "/logistic",
    rotate: 4,
    drop: 16,
    z: 4,
    pull: 12,
  },
  {
    number: "05",
    title: "Trip",
    label: "Plan journey",
    description:
      "Plan multi-city journeys with vetted drivers. Perfect for family vacations.",
    image: "/images/about/explore/card-trip.png",
    icon: "/images/about/explore/icon-trip.png",
    href: "/trip",
    rotate: 8,
    drop: 36,
    z: 2,
    pull: 12,
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <path
        d="M3.2 8h9.6M9.2 4.4 12.8 8 9.2 11.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({
  service,
  delay,
  compact,
}: {
  service: Service;
  delay: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={`relative shrink-0 ${compact ? "w-[200px]" : "w-[168px] lg:w-[184px] xl:w-[200px]"}`}
      style={{
        zIndex: service.z,
        marginLeft: compact ? undefined : service.pull,
        marginTop: compact ? undefined : service.drop,
      }}
    >
      <Link
        href={service.href}
        className="group relative block h-[300px] overflow-hidden rounded-[28px] shadow-[0_20px_48px_rgba(0,0,0,0.25)] lg:h-[320px] xl:h-[340px]"
        style={{ transform: `rotate(${service.rotate}deg)` }}
      >
        {/* Background image */}
        <Image
          src={service.image}
          alt=""
          fill
          sizes="200px"
          className="object-cover object-center scale-[1.35]"
          priority
        />

        {/* Figma overlays: keep photo visible on top, solid dark bottom */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.2)_35%,rgba(0,0,0,0.75)_62%,#000_100%)]"
          aria-hidden="true"
        />

        {/* Content stack — matches Figma order & spacing */}
        <div className="relative z-10 flex h-full flex-col px-[18px] pb-5 pt-6">
          <span
            className="text-[34px] italic leading-none text-white lg:text-[38px]"
            style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
          >
            {service.number}
          </span>

          <div className="mt-3 flex h-[44px] w-[44px] items-center justify-center overflow-hidden rounded-[12px] bg-[#FEFBF6] lg:mt-3.5 lg:h-[48px] lg:w-[48px] lg:rounded-[14px]">
            <Image
              src={service.icon}
              alt=""
              width={48}
              height={48}
              className="h-[130%] w-[130%] max-w-none object-cover"
            />
          </div>

          <div className="mt-auto">
            <h3 className="font-poppins text-[17px] font-bold leading-none text-white lg:text-[18px]">
              {service.title}
            </h3>

            <p className="mt-1.5 font-poppins text-[12px] font-medium italic leading-none text-[#FCE001] lg:text-[13px]">
              {service.label}
            </p>

            <p className="mt-2.5 max-w-[160px] font-poppins text-[11px] leading-[1.45] text-white/85 lg:text-[12px] lg:leading-[1.5]">
              {service.description}
            </p>

            <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] text-white ring-1 ring-white/20 transition-colors group-hover:bg-[#FCE001] group-hover:text-black lg:h-9 lg:w-9">
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Explore Our Services — pixel rebuild from Figma frame.
 */
export default function ExploreOurServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-[100px]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + decorative circle */}
        <div className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14">
          <div
            className="pointer-events-none absolute left-1/2 top-[8%] h-[min(100vw,520px)] w-[min(100vw,520px)] -translate-x-1/2 rounded-full border border-[#FDB813]/45 lg:h-[560px] lg:w-[560px]"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative z-10"
          >
            <div className="mb-5 inline-flex items-center rounded-full bg-[#ECE7DB] px-4 py-1.5 sm:mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[11px]">
                Our Services
              </span>
            </div>

            <h2 className="mb-4 font-poppins text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b]">
              Explore Our{" "}
              <span className="text-[#FCE001]">Services.</span>
            </h2>

            <p className="mx-auto max-w-[540px] text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px] sm:leading-[1.65] md:text-[16px]">
              One app. Every journey. From city taxis to shared pools, trusted
              delivery, enterprise logistics, and full-trip planning.
            </p>
          </motion.div>
        </div>

        {/* Desktop: fanned arc matching Figma */}
        <div className="relative mx-auto hidden justify-center pt-4 md:flex lg:pt-6">
          <div className="flex items-start justify-center pl-8 pr-4 lg:pl-10">
            {services.map((service, i) => (
              <ServiceCard
                key={service.number}
                service={service}
                delay={0.05 + i * 0.05}
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={{ ...service, rotate: service.rotate * 0.6 }}
              delay={0.04 + i * 0.04}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}
