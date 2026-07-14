"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import PoolRideCard from "./PoolRideCard";
import MobileCardVideo from "@/components/services/MobileCardVideo";

/** Local files — remote Pixabay download URLs are Cloudflare-blocked (403) in the browser */
const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";
const LOGISTICS_VIDEO = "/videos/logistics-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";
const TAXI_VIDEO = "/videos/taxi-stand-bg.mp4";
const TAXI_MASK = "/images/taxi-stand/services/card-taxi-mask.png";

const MOBILE_TRIP_MASK =
  "/images/taxi-stand/services/mobile/mask-trip-crop.png";
const MOBILE_DELIVERY_MASK =
  "/images/taxi-stand/services/mobile/mask-delivery-crop.png";
const MOBILE_LOGISTICS_MASK =
  "/images/taxi-stand/services/mobile/mask-logistics-crop.png";

const FEATURES = [
  "Verified drivers",
  "Fixed fares",
  "0% commission",
] as const;

function SparkleIcon() {
  return (
    <svg
      className="h-2.5 w-2.5 shrink-0 text-[#FCE001]"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0.5 9.2 5.6 14.5 6.8 9.2 8 8 13.5 6.8 8 1.5 6.8 6.8 5.6Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-2.5 w-2.5 text-black"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

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
 * Mobile matches Taxi Stand exactly:
 * same full interlocking screenshot, yellow area wiped solid,
 * Pool Ride text overlaid on top (no second shape cutting the cards).
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

        {/* Mobile — same full composition as Taxi Stand */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative -mx-1 w-[calc(100%+0.5rem)] max-w-none sm:mx-auto sm:w-full sm:max-w-[420px] lg:hidden"
        >
          <Image
            src="/images/taxi-stand/services/mobile/services-mobile-pool.png?v=7"
            alt="Our services — Pool Ride, Logistics, Pool, Trip, Delivery"
            width={1242}
            height={3168}
            className="h-auto w-full select-none"
            sizes="(max-width: 1024px) 100vw, 0px"
            priority
            unoptimized
          />

          {/* Videos clipped to screenshot card shapes — layout unchanged */}
          <MobileCardVideo
            src={LOGISTICS_VIDEO}
            mask={MOBILE_LOGISTICS_MASK}
            left="3.543%"
            top="29.987%"
            width="44.525%"
            height="36.269%"
            icon="/images/taxi-stand/services/icon-logistics.png"
            title="Logistics"
            subtitle="Enterprise"
          />
          <MobileCardVideo
            src={TRIP_VIDEO}
            mask={MOBILE_TRIP_MASK}
            left="3.14%"
            top="64.552%"
            width="48.953%"
            height="33.681%"
            icon="/images/taxi-stand/services/icon-trip.png"
            title="Trip"
            subtitle="Plan journey"
          />
          <MobileCardVideo
            src={DELIVERY_VIDEO}
            mask={MOBILE_DELIVERY_MASK}
            left="54.75%"
            top="64.646%"
            width="44.122%"
            height="33.239%"
            icon="/images/taxi-stand/services/icon-delivery.png"
            title="Delivery"
            subtitle="Fast delivery"
          />

          {/* Pool Ride content only — sits on solid yellow, does not cut cards */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-20 flex w-full flex-col items-center px-[9%] pt-[7%] text-center font-poppins"
            style={{ height: "38%" }}
          >
            <div className="mb-2.5 flex items-center justify-center gap-2">
              <Image
                src="/images/taxi-stand/services/icon-pool.png"
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                priority
              />
              <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black px-2.5">
                <SparkleIcon />
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#FCE001]">
                  You Are Here
                </span>
              </div>
            </div>

            <h3 className="mb-1 text-[28px] font-extrabold leading-none tracking-[-0.03em] text-black sm:text-[30px]">
              Pool Ride.
            </h3>

            <p className="mb-3 max-w-[280px] text-[11px] font-medium leading-snug text-[#2f2f2f] sm:text-[12px]">
              Share your ride with others going the same way.
              <br />
              Split costs and travel greener.
            </p>

            <ul className="mt-auto flex max-w-[300px] flex-wrap justify-center gap-1.5 pb-[18%]">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-black pl-1.5 pr-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.16)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFD400]">
                    <CheckIcon />
                  </span>
                  <span className="text-[11px] font-semibold leading-none text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/pool-ride"
            aria-label="Pool Ride"
            className="absolute left-[3%] top-[2%] z-30 h-[36%] w-[94%]"
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

        {/* Desktop */}
        <div className="mx-auto hidden w-full max-w-[1220px] items-stretch lg:flex">
          <div className="relative z-10 w-[38%] max-w-[480px] shrink-0 -mr-20 xl:max-w-[520px] xl:-mr-24">
            <PoolRideCard variant="desktop" />
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-0.5 gap-y-0.5">
            <DesktopPhotoCard
              href="/taxi-stand"
              image="/images/taxi-stand/services/card-taxi.png"
              icon="/images/taxi-stand/services/icon-taxi.png"
              title="Taxi Stand"
              subtitle="City rides"
              delay={0.1}
              contentClassName="left-[14%] top-[12%]"
              video={TAXI_VIDEO}
              mask={TAXI_MASK}
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
