"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import DeliveryCard from "./DeliveryCard";
import MobileServicesLayout, {
  CLEAN_MOBILE_CARDS,
} from "@/components/services/MobileServicesLayout";
import { useInViewVideo } from "@/hooks/useInViewVideo";

/** Same service videos / masks as Taxi Stand & Pool Ride — shapes unchanged */
const POOL_VIDEO = "/videos/pool-bg.mp4";
const POOL_MASK = "/images/taxi-stand/services/card-pool-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";
const LOGISTICS_VIDEO = "/videos/logistics-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";
const TAXI_VIDEO = "/videos/taxi-stand-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";

type DesktopPhotoCardProps = {
  href: string;
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
  className?: string;
  contentClassName?: string;
  video?: string;
  mask?: string;
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
  video,
  mask,
}: DesktopPhotoCardProps) {
  const videoRef = useInViewVideo(video);
  const maskUrl = mask ?? image;

  const maskStyle: CSSProperties | undefined = video
    ? {
        WebkitMaskImage: `url(${maskUrl})`,
        maskImage: `url(${maskUrl})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
        maskMode: "alpha",
      }
    : undefined;

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
        {video ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              width={640}
              height={340}
              className="h-full w-full object-fill object-left"
              sizes="30vw"
              priority
            />
            <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
              <video
                ref={videoRef}
                src={video}
                className="h-full w-full object-cover object-center [transform:translateZ(0)]"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
            </div>
          </div>
        ) : (
          <Image
            src={image}
            alt={title}
            width={640}
            height={340}
            className="h-full w-full object-fill object-left"
            sizes="30vw"
            priority
          />
        )}
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

/** Same Our Services naming as Taxi Stand / Pool Ride */
const MOBILE_CARDS = [
  {
    href: "/logistic",
    icon: "/images/taxi-stand/services/icon-logistics.png",
    title: "Logistics",
    subtitle: "Enterprise",
    video: LOGISTICS_VIDEO,
    ...CLEAN_MOBILE_CARDS.logistics,
  },
  {
    href: "/pool-ride",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool",
    subtitle: "Shared trips",
    video: POOL_VIDEO,
    ...CLEAN_MOBILE_CARDS.pool,
  },
  {
    href: "/trip",
    icon: "/images/taxi-stand/services/icon-trip.png",
    title: "Trip",
    subtitle: "Plan journey",
    video: TRIP_VIDEO,
    ...CLEAN_MOBILE_CARDS.trip,
  },
  {
    href: "/taxi-stand",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Stand",
    subtitle: "City rides",
    video: TAXI_VIDEO,
    ...CLEAN_MOBILE_CARDS.delivery,
  },
];

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
            Our <em className="font-medium italic text-[#FDB813]">Services</em>
          </h2>
          <p className="mx-auto max-w-lg text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px]">
            Five services. One app. Built for every kind of journey across
            Pakistan.
          </p>
        </motion.div>

        <MobileServicesLayout
          featured={<DeliveryCard variant="mobile" />}
          cards={MOBILE_CARDS}
        />

        {/* Desktop — same service names as Taxi Stand / Pool Ride */}
        <div className="mx-auto hidden w-full max-w-[1040px] items-stretch lg:flex xl:max-w-[1100px]">
          <div className="relative z-10 w-[38%] max-w-[420px] shrink-0 -mr-16 xl:max-w-[460px] xl:-mr-20">
            <DeliveryCard variant="desktop" />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-0.5 gap-y-0.5">
            <DesktopPhotoCard
              href="/pool-ride"
              image="/images/taxi-stand/services/card-pool.png"
              icon="/images/taxi-stand/services/icon-pool.png"
              title="Pool"
              subtitle="Shared trips"
              delay={0.1}
              contentClassName="left-[14%] top-[12%]"
              video={POOL_VIDEO}
              mask={POOL_MASK}
            />
            <DesktopPhotoCard
              href="/taxi-stand"
              image="/images/taxi-stand/services/card-delivery.png"
              icon="/images/taxi-stand/services/icon-taxi.png"
              title="Taxi Stand"
              subtitle="City rides"
              delay={0.14}
              className="!h-[88%] self-start"
              contentClassName="left-6 top-[12%]"
              video={TAXI_VIDEO}
              mask={DELIVERY_MASK}
            />
            <DesktopPhotoCard
              href="/logistic"
              image="/images/taxi-stand/services/card-logistics.png"
              icon="/images/taxi-stand/services/icon-logistics.png"
              title="Logistics"
              subtitle="Enterprise"
              delay={0.18}
              contentClassName="left-[20%] top-[14%]"
              video={LOGISTICS_VIDEO}
              mask={LOGISTICS_MASK}
            />
            <DesktopPhotoCard
              href="/trip"
              image="/images/taxi-stand/services/card-trip.png"
              icon="/images/taxi-stand/services/icon-trip.png"
              title="Trip"
              subtitle="Plan journey"
              delay={0.22}
              contentClassName="left-6 top-[14%]"
              video={TRIP_VIDEO}
              mask={TRIP_MASK}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
