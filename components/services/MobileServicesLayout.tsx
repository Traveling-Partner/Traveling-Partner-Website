"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useInViewVideo } from "@/hooks/useInViewVideo";

export type MobileCleanCard = {
  href: string;
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  video: string;
  /** Slot in the interlocking Figma composition */
  slot: keyof typeof CARD_SLOTS;
};

type MobileServicesLayoutProps = {
  featured: ReactNode;
  cards: MobileCleanCard[];
};

/**
 * Exact Figma mobile card slots (relative to the 4-card grid only).
 * Bounding boxes intentionally overlap — cream gutters come from
 * transparent shape edges, matching the desktop interlocking layout.
 */
export const CARD_SLOTS = {
  topLeft: {
    left: "3.54%",
    top: "1.1%",
    width: "44.53%",
    height: "52.9%",
  },
  topRight: {
    left: "44.77%",
    top: "0%",
    width: "54.11%",
    height: "52.0%",
  },
  bottomLeft: {
    left: "3.14%",
    top: "51.4%",
    width: "48.95%",
    height: "49.1%",
  },
  bottomRight: {
    left: "54.75%",
    top: "51.6%",
    width: "44.12%",
    height: "48.4%",
  },
} as const;

function MobileVideoCard({
  href,
  image,
  icon,
  title,
  subtitle,
  video,
  slot,
  delay = 0,
}: MobileCleanCard & { delay?: number }) {
  const videoRef = useInViewVideo(video);
  const pos = CARD_SLOTS[slot];

  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${image})`,
    maskImage: `url(${image})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.35, delay }}
      className="absolute"
      style={pos}
    >
      <Link
        href={href}
        aria-label={`${title} — ${subtitle}`}
        className="relative block h-full w-full"
      >
        <div
          className="absolute inset-0"
          style={maskStyle}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#121212]" />
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
            unoptimized
          />
          <video
            ref={videoRef}
            src={video}
            className="absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-x-[11%] bottom-[10%] z-10 flex items-center gap-2.5">
          <Image
            src={icon}
            alt=""
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[15px] font-bold text-white sm:text-[16px]">
              {title}
            </p>
            <p className="truncate text-[12px] font-medium italic text-white/90 sm:text-[13px]">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Shared mobile Our Services for Taxi / Pool / Delivery.
 * Interlocking Figma composition — equal cream gutters, no CSS-grid distortion.
 */
export default function MobileServicesLayout({
  featured,
  cards,
}: MobileServicesLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[440px] px-1 lg:hidden">
      {/* Small cream gutter under yellow V — not tight, not large */}
      <div className="relative z-10 -mb-16 sm:-mb-[4.5rem]">{featured}</div>

      {/* Aspect matches Figma 4-card grid (1242×1948) */}
      <div
        className="relative z-0 w-full"
        style={{ aspectRatio: "1242 / 1948" }}
      >
        {cards.map((card, i) => (
          <MobileVideoCard
            key={`${card.slot}-${card.title}`}
            {...card}
            delay={0.05 * i}
          />
        ))}
      </div>
    </div>
  );
}

/** Clean Figma card shapes (no baked text) */
export const CLEAN_MOBILE_CARDS = {
  logistics: {
    image: "/images/taxi-stand/services/mobile/cards/card-logistics-clean.png",
    slot: "topLeft" as const,
  },
  pool: {
    image: "/images/taxi-stand/services/mobile/cards/card-pool-clean.png",
    slot: "topRight" as const,
  },
  trip: {
    image: "/images/taxi-stand/services/mobile/cards/card-trip-clean.png",
    slot: "bottomLeft" as const,
  },
  delivery: {
    image: "/images/taxi-stand/services/mobile/cards/card-delivery-clean.png",
    slot: "bottomRight" as const,
  },
};
