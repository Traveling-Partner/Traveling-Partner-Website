"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TaxiStandCard from "./TaxiStandCard";

type DesktopPhotoCardProps = {
  href: string;
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
  className?: string;
  contentClassName?: string;
};

function DesktopPhotoCard({
  href,
  image,
  icon,
  title,
  subtitle,
  delay = 0,
  className = "",
  contentClassName = "left-5 top-5",
}: DesktopPhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
      className={`relative h-full min-h-0 w-full ${className}`}
    >
      <Link href={href} className="group relative block h-full w-full">
        <Image
          src={image}
          alt={title}
          width={640}
          height={340}
          className="h-full w-full object-fill object-left"
          sizes="30vw"
          priority
        />

        <div
          className={`absolute z-10 flex max-w-[70%] items-center gap-2.5 sm:gap-3 ${contentClassName}`}
        >
          <Image
            src={icon}
            alt=""
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[15px] font-bold text-white drop-shadow lg:text-[17px]">
              {title}
            </p>
            <p className="truncate text-[12px] font-medium italic text-white/90 drop-shadow sm:text-[13px]">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Exact Figma mobile composition (pixel-perfect) with link hotspots */
const MOBILE_HOTSPOTS = [
  {
    href: "/logistic",
    label: "Logistics",
    style: { left: "1%", top: "40%", width: "48%", height: "24%" },
  },
  {
    href: "/pool-ride",
    label: "Pool",
    style: { left: "51%", top: "40%", width: "48%", height: "24%" },
  },
  {
    href: "/trip",
    label: "Trip",
    style: { left: "1%", top: "65.5%", width: "48%", height: "31%" },
  },
  {
    href: "/delivery",
    label: "Delivery",
    style: { left: "51%", top: "65.5%", width: "48%", height: "31%" },
  },
] as const;

export default function OurServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] py-14 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <h2 className="mb-3 text-[32px] font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[52px]">
            Our <span className="italic text-[#FDB813]">Services</span>
          </h2>
          <p className="mx-auto max-w-lg text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px]">
            Five services. One app. Built for every kind of journey across
            Pakistan.
          </p>
        </motion.div>

        {/* Mobile + small tablet — 100% Figma screenshot replica (full-bleed, no side borders) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative -mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-6 sm:w-[calc(100%+3rem)] md:mx-auto md:w-full md:max-w-[480px] lg:hidden"
        >
          <Image
            src="/images/taxi-stand/services/mobile/services-mobile-full.png"
            alt="Our services — Taxi Stand, Logistics, Pool, Trip, Delivery"
            width={715}
            height={1828}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 0px"
            priority
          />

          {MOBILE_HOTSPOTS.map((spot) => (
            <Link
              key={spot.href + spot.label}
              href={spot.href}
              aria-label={spot.label}
              className="absolute z-10 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDB813]"
              style={spot.style}
            />
          ))}
        </motion.div>

        {/* Desktop — horizontal interlocking */}
        <div className="mx-auto hidden w-full max-w-[1220px] items-stretch lg:flex">
          <div className="relative z-10 w-[38%] max-w-[480px] shrink-0 -mr-20 xl:max-w-[520px] xl:-mr-24">
            <TaxiStandCard variant="desktop" />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-0.5 gap-y-2">
            <DesktopPhotoCard
              href="/pool-ride"
              image="/images/taxi-stand/services/card-pool.png"
              icon="/images/taxi-stand/services/icon-pool.png"
              title="Pool"
              subtitle="Shared trips"
              delay={0.1}
              contentClassName="left-[14%] top-[12%]"
            />
            <DesktopPhotoCard
              href="/delivery"
              image="/images/taxi-stand/services/card-delivery.png"
              icon="/images/taxi-stand/services/icon-delivery.png"
              title="Delivery"
              subtitle="Fast delivery"
              delay={0.14}
              className="!h-[88%] self-start"
              contentClassName="left-6 top-[12%]"
            />
            <DesktopPhotoCard
              href="/logistic"
              image="/images/taxi-stand/services/card-logistics.png"
              icon="/images/taxi-stand/services/icon-logistics.png"
              title="Logistics"
              subtitle="Enterprise"
              delay={0.18}
              className="mt-1 ml-2"
              contentClassName="left-[20%] top-[14%]"
            />
            <DesktopPhotoCard
              href="/trip"
              image="/images/taxi-stand/services/card-trip.png"
              icon="/images/taxi-stand/services/icon-trip.png"
              title="Trip"
              subtitle="Plan journey"
              delay={0.22}
              contentClassName="left-6 top-[14%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
