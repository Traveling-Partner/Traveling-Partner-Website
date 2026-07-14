"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import TaxiStandCard from "./TaxiStandCard";

/** Local files — remote Pixabay download URLs are Cloudflare-blocked (403) in the browser */
const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";

type DesktopPhotoCardProps = {
  href: string;
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  delay?: number;
  className?: string;
  contentClassName?: string;
  /** Optional looping background video (masked to same card shape as `image`) */
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
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;
    el.muted = true;
    const play = () => {
      void el.play().catch(() => {});
    };
    play();
    el.addEventListener("loadeddata", play);
    return () => el.removeEventListener("loadeddata", play);
  }, [video]);

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
            {/* Shaped PNG stays as fallback if video fails to load */}
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
                className="h-full w-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
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

/**
 * Mobile = exact Figma screenshot (pixel-perfect).
 * Links sit as invisible hotspots over each card.
 */
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

        {/* Mobile — 100% screenshot replica */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative -mx-1 w-[calc(100%+0.5rem)] max-w-none sm:mx-auto sm:w-full sm:max-w-[420px] lg:hidden"
        >
          <Image
            src="/images/taxi-stand/services/mobile/services-mobile-full.png"
            alt="Our services — Taxi Stand, Logistics, Pool, Trip, Delivery"
            width={1242}
            height={3168}
            className="h-auto w-full select-none"
            sizes="(max-width: 1024px) 100vw, 0px"
            priority
            unoptimized
          />

          {/* Hotspots — percentages mapped to screenshot regions */}
          <Link
            href="/taxi-stand"
            aria-label="Taxi Stand"
            className="absolute left-[3%] top-[2%] z-10 h-[36%] w-[94%]"
          />
          <Link
            href="/logistic"
            aria-label="Logistics"
            className="absolute left-[2%] top-[39%] z-10 h-[25%] w-[47%]"
          />
          <Link
            href="/pool-ride"
            aria-label="Pool"
            className="absolute left-[51%] top-[39%] z-10 h-[25%] w-[47%]"
          />
          <Link
            href="/trip"
            aria-label="Trip"
            className="absolute left-[2%] top-[65%] z-10 h-[32%] w-[47%]"
          />
          <Link
            href="/delivery"
            aria-label="Delivery"
            className="absolute left-[51%] top-[65%] z-10 h-[32%] w-[47%]"
          />
        </motion.div>

        {/* Desktop unchanged */}
        <div className="mx-auto hidden w-full max-w-[1220px] items-stretch lg:flex">
          <div className="relative z-10 w-[38%] max-w-[480px] shrink-0 -mr-20 xl:max-w-[520px] xl:-mr-24">
            <TaxiStandCard variant="desktop" />
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
              video={DELIVERY_VIDEO}
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
