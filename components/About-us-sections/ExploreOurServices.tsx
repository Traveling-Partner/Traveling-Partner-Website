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
  /** Exact Figma fan tilt */
  rotate: number;
  /** Drop from peak (center = 0) — outer cards sit lower */
  drop: number;
  z: number;
  /** Negative = tight overlap like Figma */
  pull: number;
};

/**
 * Positions measured from original Figma screenshot:
 * - Arc: center highest, outer lowest
 * - Angles: ~±10° outer, ~±5° inner, 0° center
 * - Tight overlap between cards
 */
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
    rotate: -10,
    drop: 44,
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
    rotate: -5,
    drop: 18,
    z: 3,
    pull: -2,
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
    drop: 8,
    z: 5,
    pull: -4,
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
    rotate: 5,
    drop: 18,
    z: 4,
    pull: -4,
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
    rotate: 10,
    drop: 44,
    z: 2,
    pull: -2,
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
  index,
  compact,
}: {
  service: Service;
  index: number;
  compact?: boolean;
}) {
  const rotate = compact ? service.rotate * 0.55 : service.rotate;
  const drop = compact ? 0 : service.drop;

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: 0.08 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative shrink-0 ${
        compact ? "w-[210px]" : "w-[176px] lg:w-[192px] xl:w-[208px]"
      }`}
      style={{
        zIndex: service.z,
        marginLeft: compact ? undefined : service.pull,
        marginTop: drop,
      }}
    >
      {/* Settle animation is relative — ends at 0 so final tilt = Figma angle on Link */}
      <motion.div
        initial={{ rotate: -10 }}
        whileInView={{ rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.75,
          delay: 0.08 + index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <Link
          href={service.href}
          className="group relative block h-[292px] overflow-hidden rounded-[26px] shadow-[0_18px_42px_rgba(0,0,0,0.24)] lg:h-[312px] lg:rounded-[28px] xl:h-[330px]"
          style={{
            transform: `rotate(${rotate}deg)`,
            transformOrigin: "50% 100%",
          }}
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="208px"
            className="object-cover object-center scale-[1.35]"
            priority
          />

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.22)_38%,rgba(0,0,0,0.78)_64%,#000_100%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-5 sm:px-[17px] sm:pb-[18px] sm:pt-5">
            <span
              className="text-[32px] italic leading-none text-white lg:text-[36px]"
              style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            >
              {service.number}
            </span>

            <div className="mt-2.5 flex h-[42px] w-[42px] items-center justify-center overflow-hidden rounded-[11px] bg-[#FEFBF6] lg:mt-3 lg:h-[46px] lg:w-[46px] lg:rounded-[12px]">
              <Image
                src={service.icon}
                alt=""
                width={46}
                height={46}
                className="h-[130%] w-[130%] max-w-none object-cover"
              />
            </div>

            <div className="mt-auto">
              <h3 className="font-poppins text-[16px] font-bold leading-none text-white lg:text-[17px]">
                {service.title}
              </h3>

              <p className="mt-1.5 font-poppins text-[12px] font-medium italic leading-none text-[#FCE001]">
                {service.label}
              </p>

              <p className="mt-2.5 max-w-[158px] font-poppins text-[11px] leading-[1.45] text-white/85 lg:text-[11.5px]">
                {service.description}
              </p>

              <span className="mt-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] text-white ring-1 ring-white/20 transition-colors group-hover:bg-[#FCE001] group-hover:text-black">
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ExploreOurServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-[100px]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#ECE7DB] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[11px]">
              Our Services
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b]">
            Explore Our{" "}
            <span className="font-medium italic text-[#FCE001]">Services.</span>
          </h2>

          <p className="mx-auto max-w-[540px] text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px] sm:leading-[1.65] md:text-[16px]">
            One app. Every journey. From city taxis to shared pools, trusted
            delivery, enterprise logistics, and full-trip planning.
          </p>
        </motion.div>

        {/* Desktop fan — Figma arc (center peak, outer lower) */}
        <div className="relative mx-auto hidden justify-center overflow-visible pt-2 md:flex lg:pt-4">
          <div className="flex items-start justify-center pb-6 pl-10 pr-6 lg:pb-8 lg:pl-12">
            {services.map((service, i) => (
              <ServiceCard key={service.number} service={service} index={i} />
            ))}
          </div>
        </div>

        <div className="-mx-4 flex items-end gap-3 overflow-x-auto px-4 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}
