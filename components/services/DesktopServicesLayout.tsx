"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useInViewVideo } from "@/hooks/useInViewVideo";

/**
 * Exact Figma Frame 11 (519:12370) — 1688 × 609.117
 * Absolute slots from Figma metadata. Bounding boxes intentionally overlap;
 * cream gutters come from card-shape transparency. Do not add CSS gap.
 *
 * @see https://www.figma.com/proto/oQoLIxQQyaqSYthikw4qX4/…?node-id=519-12370
 */
export const FIGMA_FRAME = { w: 1688, h: 609.1173706054688 } as const;

export const DESKTOP_MOSAIC_SLOTS = {
  /** Frame 12 — featured yellow card */
  featured: {
    left: "-15px",
    top: "0%",
    width: "34.839%",
    height: "100%",
  },
  /** Frame 13 — Pool */
  topLeft: {
    left: "25.338%",
    top: "0%",
    width: "36.345%",
    height: "calc(56.691% - 8px)",
  },
  /** Frame 14 — Delivery */
  topRight: {
    left: "calc(61.474% + 3px)",
    top: "0%",
    width: "calc(38.525% - 8px)",
    height: "45.612%",
  },
  /** Frame 16 — Logistics */
  bottomLeft: {
    left: "26.116%",
    top: "53.237%",
    width: "37.070%",
    height: "46.331%",
  },
  /** Frame 15 — Trip */
  bottomRight: {
    left: "calc(62.6% - 4px)",
    top: "49.497%",
    width: "37.191%",
    height: "50.503%",
  },
} as const;

export type DesktopPhotoSlot = Exclude<
  keyof typeof DESKTOP_MOSAIC_SLOTS,
  "featured"
>;

export type DesktopPhotoCardData = {
  href: string;
  image: string;
  icon: string;
  title: string;
  subtitle: string;
  video: string;
  mask: string;
  slot: DesktopPhotoSlot;
  contentClassName?: string;
};

type DesktopServicesLayoutProps = {
  featured: ReactNode;
  cards: DesktopPhotoCardData[];
};

function DesktopPhotoCard({
  href,
  image,
  icon,
  title,
  subtitle,
  video,
  mask,
  slot,
  contentClassName = "left-[10%] top-[11%]",
  delay = 0,
}: DesktopPhotoCardData & { delay?: number }) {
  const videoRef = useInViewVideo(video);
  const pos = DESKTOP_MOSAIC_SLOTS[slot];

  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${mask})`,
    maskImage: `url(${mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "left center",
    maskPosition: "left center",
    maskMode: "alpha",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
      className="absolute z-[2]"
      style={pos}
    >
      <Link href={href} className="group relative block h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            width={640}
            height={340}
            className="h-full w-full object-fill object-left"
            sizes="(min-width: 1024px) 35vw, 100vw"
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

        <div
          className={`absolute z-10 flex max-w-[78%] items-center gap-3 sm:gap-3.5 ${contentClassName}`}
        >
          <Image
            src={icon}
            alt=""
            width={64}
            height={64}
            className="h-12 w-12 shrink-0 object-contain sm:h-[54px] sm:w-[54px] lg:h-[60px] lg:w-[60px]"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[17px] font-bold text-white lg:text-[19px]">
              {title}
            </p>
            <p className="truncate text-[13px] font-medium italic text-white/90 sm:text-[14px]">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Desktop Our Services mosaic — pixel-locked to Figma Frame 11.
 * Keeps existing card text, icons, colors, and videos; only layout geometry changes.
 */
export default function DesktopServicesLayout({
  featured,
  cards,
}: DesktopServicesLayoutProps) {
  return (
    <div className="mx-auto hidden w-full max-w-[1200px] lg:block">
      <div
        className="relative w-full overflow-visible"
        style={{ aspectRatio: `${FIGMA_FRAME.w} / ${FIGMA_FRAME.h}` }}
      >
        <div
          className="absolute z-[1] overflow-visible [&_article]:!block [&_article]:!h-full [&_article]:!w-full [&_article>div]:!relative [&_article>div]:!h-full [&_article>div]:!w-full [&_article>div>:first-child]:!absolute [&_article>div>:first-child]:!inset-0 [&_article>div>:first-child]:!h-full [&_article>div>:first-child]:!w-full [&_article>div>:first-child_img]:!h-full [&_article>div>:first-child_img]:!w-full [&_article>div>:first-child_img]:!max-h-none [&_article>div>:first-child_img]:!object-fill"
          style={DESKTOP_MOSAIC_SLOTS.featured}
        >
          {featured}
        </div>

        {cards.map((card, i) => (
          <DesktopPhotoCard
            key={`${card.slot}-${card.title}`}
            {...card}
            delay={0.06 + i * 0.04}
          />
        ))}
      </div>
    </div>
  );
}
