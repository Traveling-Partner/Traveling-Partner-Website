"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/** Figma Safety & Security — node 124:3876 */
const CONTAINER_MAX = 1708;
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
      "Real-time GPS tracking on every ride, family-shared location, and CNIC-verified drivers — built into every trip, no toggle required.",
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
      "A reassuring option for female riders — paired with verified female drivers, dedicated support, and priority emergency response.",
    href: "/help",
  },
  {
    kind: "text",
    icon: <SafetyFeatureIcon src="/images/safety/icon-verified.png" />,
    titleBold: "Verified",
    titleItalic: "drivers only.",
    description:
      "Every driver goes through CNIC verification, license checks, and a safety training module — no exceptions, no shortcuts.",
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
    titleItalic: "24/7 support.",
    description:
      "One-tap emergency button connected to our live response team, plus 24/7 in-app support that's actually staffed by humans.",
    href: "/help",
  },
  {
    kind: "image",
    src: "/images/safety/support-24-7.png",
    alt: "24/7 in-app support always on",
  },
];

function SafetyImageCard({ item }: { item: ImageCardData }): React.ReactElement {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
    </article>
  );
}

function SafetyTextCard({ item }: { item: TextCardData }): React.ReactElement {
  return (
    <article className="flex h-full w-full flex-col justify-center overflow-hidden py-1">
      <div className="mb-3 flex shrink-0 items-center" aria-hidden>
        {item.icon}
      </div>

      <h3 className="shrink-0 font-poppins text-[clamp(1.15rem,1.9vw,1.65rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0b0b0b]">
        {item.titleBold}{" "}
        <span className="font-normal italic">{item.titleItalic}</span>
      </h3>

      <p className="mt-2 min-h-0 flex-1 font-poppins text-[clamp(11px,1.05vw,13px)] font-normal leading-[1.5] text-[#5c5c5c] sm:text-[13px] lg:text-[14px]">
        {item.description}
      </p>

      <Link
        href={item.href}
        className="group mt-3 inline-flex w-fit shrink-0 items-center gap-1.5 font-poppins text-[clamp(11px,1.05vw,13px)] font-semibold text-[#0b0b0b] underline decoration-[#0b0b0b]/25 underline-offset-[5px] transition-colors hover:decoration-[#0b0b0b] sm:text-[13px]"
      >
        More information
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </Link>
    </article>
  );
}

export default function SafetySecuritySection(): React.ReactElement {
  return (
    <section
      className="relative w-full bg-[#FDFBF0] py-[72px] sm:py-[88px] lg:py-[104px]"
      aria-labelledby="safety-section-heading"
    >
      <div
        className="mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-[106px]"
        style={{ maxWidth: CONTAINER_MAX }}
      >
        <motion.header
          className="mx-auto mb-12 max-w-[820px] text-center sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="safety-section-heading"
            className="font-poppins text-[clamp(2rem,4.2vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b0b0b]"
          >
            Your safety is{" "}
            <span className={accentItalicClass}>non-negotiable.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[692px] font-poppins text-[13px] font-normal leading-[1.65] text-[#5c5c5c] sm:text-[14px] lg:mt-6 lg:text-[15px]">
            Four safety features engineered into every ride, delivery, and trip — designed around
            how Pakistani riders actually travel.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 items-stretch gap-x-4 gap-y-[5px] sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-5 xl:gap-x-6"
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
