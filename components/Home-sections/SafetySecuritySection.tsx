"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/** Figma Safety & Security — node 124:3876 */
const ICON_SIZE = 40;
const ICON_CLASS = "h-10 w-10 object-contain sm:h-11 sm:w-11";

const accentItalicClass =
  "font-poppins font-normal italic bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent";

function SafetyFeatureIcon({ src }: { src: string }): React.ReactElement {
  return (
    <Image
      src={src}
      alt=""
      width={ICON_SIZE}
      height={ICON_SIZE}
      className={ICON_CLASS}
      aria-hidden
    />
  );
}

type ImageCardData = {
  kind: "image";
  src: string;
  alt: string;
};

type TextCardData = {
  kind: "text";
  icon: React.ReactNode;
  titleBold: string;
  titleItalic: string;
  description: string;
  href: string;
};

type SafetyItem = ImageCardData | TextCardData;

const SAFETY_ITEMS: SafetyItem[] = [
  {
    kind: "image",
    src: "/images/safety/live-tracking.png",
    alt: "Live GPS tracking with 100% secure rides",
  },
  {
    kind: "text",
    icon: <SafetyFeatureIcon src="/images/safety/icon-secure.png" />,
    titleBold: "Safe &",
    titleItalic: "Secure.",
    description:
      "Every ride is monitored from pickup to drop-off with real-time tracking. Share your trip, stay updated, and travel knowing someone always knows where you are.",
    href: "/help",
  },
  {
    kind: "image",
    src: "/images/safety/female-mode.png",
    alt: "Female driver mode for female riders",
  },
  {
    kind: "text",
    icon: <SafetyFeatureIcon src="/images/safety/icon-female.png" />,
    titleBold: "Female Driver",
    titleItalic: "Mode.",
    description:
      "Need a female driver? Choose Female Driver Mode while booking and enjoy a more comfortable ride whenever available.",
    href: "/help",
  },
  {
    kind: "text",
    icon: <SafetyFeatureIcon src="/images/safety/icon-verified.png" />,
    titleBold: "Verified",
    titleItalic: "Drivers Only.",
    description:
      "Not everyone can drive with a Traveling Partner. Every driver goes through a verification process before accepting rides, so you know who's picking you up.",
    href: "/help",
  },
  {
    kind: "image",
    src: "/images/safety/cnic-verified.png",
    alt: "CNIC verified drivers",
  },
  {
    kind: "text",
    icon: <SafetyFeatureIcon src="/images/safety/icon-sos.png" />,
    titleBold: "SOS &",
    titleItalic: "24/7 Support.",
    description:
      "Plans don't always go as expected. If something comes up during your trip, use the SOS button or reach out to our support team. We'll help you as quickly as we can.",
    href: "/help",
  },
  {
    kind: "image",
    src: "/images/safety/support-24-7.png",
    alt: "24/7 in-app support always on",
  },
];

const MOBILE_FEATURES: Array<{
  image: ImageCardData;
  text: TextCardData;
  imageFirst: boolean;
}> = [
  {
    image: SAFETY_ITEMS[0] as ImageCardData,
    text: SAFETY_ITEMS[1] as TextCardData,
    imageFirst: true,
  },
  {
    image: SAFETY_ITEMS[2] as ImageCardData,
    text: SAFETY_ITEMS[3] as TextCardData,
    imageFirst: true,
  },
  {
    image: SAFETY_ITEMS[5] as ImageCardData,
    text: SAFETY_ITEMS[4] as TextCardData,
    imageFirst: false,
  },
  {
    image: SAFETY_ITEMS[7] as ImageCardData,
    text: SAFETY_ITEMS[6] as TextCardData,
    imageFirst: false,
  },
];

function SafetyImageCard({
  item,
  className = "relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]",
  fit = "cover",
  imageClassName = "",
}: {
  item: ImageCardData;
  className?: string;
  fit?: "cover" | "contain";
  imageClassName?: string;
}): React.ReactElement {
  return (
    <article className={className}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className={`${fit === "contain" ? "object-contain" : "object-cover"} ${imageClassName}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </article>
  );
}

function SafetyTextCard({
  item,
  variant = "desktop",
}: {
  item: TextCardData;
  variant?: "desktop" | "mobile";
}): React.ReactElement {
  const isMobile = variant === "mobile";

  return (
    <article className={`flex w-full min-w-0 flex-col ${isMobile ? "" : "h-full justify-center overflow-hidden py-1"}`}>
      <div
        className={`flex shrink-0 items-center ${isMobile ? "mb-4" : "mb-3"}`}
        aria-hidden
      >
        {isMobile ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#fce001] to-[#fdb813] shadow-[0_4px_14px_rgba(252,224,1,0.28)] ring-2 ring-white">
            {item.icon}
          </span>
        ) : (
          item.icon
        )}
      </div>

      <h3
        className={`shrink-0 font-poppins font-bold tracking-[-0.02em] text-[#0b0b0b] ${
          isMobile
            ? "text-[1.375rem] leading-[1.15] sm:text-[1.5rem]"
            : "text-[clamp(1.15rem,1.9vw,1.65rem)] leading-[1.12]"
        }`}
      >
        {item.titleBold}{" "}
        <span className={isMobile ? accentItalicClass : "font-normal italic"}>
          {item.titleItalic}
        </span>
      </h3>

      <p
        className={`min-h-0 font-poppins font-normal leading-[1.6] text-[#5c5c5c] ${
          isMobile
            ? "mt-3 flex-1 text-[14px]"
            : "mt-2 flex-1 text-[clamp(11px,1.05vw,13px)] sm:text-[13px] lg:text-[14px] leading-[1.5]"
        }`}
      >
        {item.description}
      </p>

      <Link
        href={item.href}
        className={
          isMobile
            ? "group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] px-5 py-3.5 font-poppins text-[14px] font-semibold text-[#0b0b0b] shadow-[0_6px_20px_rgba(252,224,1,0.28)] transition-all hover:shadow-[0_8px_26px_rgba(252,224,1,0.38)]"
            : "group mt-3 inline-flex w-fit shrink-0 items-center gap-1.5 font-poppins text-[clamp(11px,1.05vw,13px)] font-semibold text-[#0b0b0b] underline decoration-[#0b0b0b]/25 underline-offset-[5px] transition-colors hover:decoration-[#0b0b0b] sm:text-[13px]"
        }
      >
        Learn More
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-[#0b0b0b] text-[12px] font-bold leading-none text-white transition-transform ${
            isMobile ? "group-hover:-rotate-45" : "group-hover:translate-x-0.5"
          }`}
          aria-hidden
        >
          →
        </span>
      </Link>
    </article>
  );
}

function SafetyMobileFeature({
  image,
  text,
  imageFirst,
  index,
}: {
  image: ImageCardData;
  text: TextCardData;
  imageFirst: boolean;
  index: number;
}): React.ReactElement {
  const featureNum = String(index + 1).padStart(2, "0");

  const imageBlock = (
    <div className={`relative px-4 ${imageFirst ? "pt-4 pb-0" : "pb-4 pt-0"}`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#fff9e8] via-[#fdf9ef] to-[#f3ede0] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_24px_rgba(11,11,11,0.06)] ring-1 ring-[#0b0b0b]/[0.06]">
        <SafetyImageCard
          item={image}
          fit="contain"
          className="relative h-full w-full"
          imageClassName="p-1.5 sm:p-2"
        />
        <span className="pointer-events-none absolute left-3 top-3 z-10 flex h-8 min-w-8 items-center justify-center rounded-full bg-white/95 px-2 font-poppins text-[11px] font-bold tracking-wide text-[#0b0b0b] shadow-[0_4px_12px_rgba(11,11,11,0.12)] ring-1 ring-[#0b0b0b]/5">
          {featureNum}
        </span>
      </div>
    </div>
  );

  const textBlock = (
    <div className="relative bg-gradient-to-b from-white to-[#fffcf6] px-5 py-5 sm:px-6 sm:py-6">
      {imageFirst ? (
        <div
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#fdb813]/45 to-transparent"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#fdb813]/45 to-transparent"
          aria-hidden
        />
      )}
      <SafetyTextCard item={text} variant="mobile" />
    </div>
  );

  return (
    <motion.article
      className="overflow-hidden rounded-[28px] border border-[#0b0b0b]/[0.05] bg-white shadow-[0_20px_56px_rgba(11,11,11,0.08),0_4px_16px_rgba(11,11,11,0.04)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {imageFirst ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </motion.article>
  );
}

export default function SafetySecuritySection(): React.ReactElement {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#FDFBF0] py-14 sm:py-[88px] lg:py-[104px]"
      aria-labelledby="safety-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(253,184,19,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          className="mx-auto mb-10 max-w-[820px] text-center sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="safety-section-heading"
            className="font-poppins text-[clamp(1.875rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b0b0b]"
          >
            <span className="block sm:inline">Your safety is</span>{" "}
            <span className={`block sm:inline ${accentItalicClass}`}>non-negotiable.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[692px] font-poppins text-[14px] font-normal leading-[1.65] text-[#5c5c5c] sm:mt-5 sm:text-[14px] lg:mt-6 lg:text-[15px]">
            When you book a ride, you shouldn&apos;t have to wonder who&apos;s actually
            driving. That&apos;s why we verify every driver on Traveling Partner before
            they&apos;re allowed to accept a single ride. Add real-time GPS tracking and
            support that&apos;s there when you need it, and you&apos;ve got a journey that
            feels straightforward from pickup to drop-off.
          </p>
        </motion.header>

        {/* Mobile — stacked feature cards */}
        <div className="flex flex-col gap-6 sm:gap-7 lg:hidden">
          {MOBILE_FEATURES.map((feature, index) => (
            <SafetyMobileFeature
              key={feature.text.titleBold}
              image={feature.image}
              text={feature.text}
              imageFirst={feature.imageFirst}
              index={index}
            />
          ))}
        </div>

        {/* Desktop — Figma mosaic grid */}
        <motion.div
          className="hidden items-stretch gap-x-5 xl:gap-x-6 lg:grid lg:grid-cols-4"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {SAFETY_ITEMS.map((item, index) => (
            <div key={index} className="aspect-square w-full min-w-0">
              {item.kind === "image" ? (
                <SafetyImageCard item={item} />
              ) : (
                <SafetyTextCard item={item} />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
