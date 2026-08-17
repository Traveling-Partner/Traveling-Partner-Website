"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type FeaturedServiceCardProps = {
  title: string;
  description: string;
  features: readonly string[];
  iconSrc: string;
  /** Unique SVG gradient id (required when multiple mobile cards could mount). */
  gradientId: string;
  className?: string;
  variant?: "desktop" | "mobile";
};

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

function DesktopContent({
  title,
  description,
  features,
  iconSrc,
}: Pick<
  FeaturedServiceCardProps,
  "title" | "description" | "features" | "iconSrc"
>) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-[4%] flex shrink-0 items-center gap-2.5">
        <span className="-ml-1 inline-block h-[72px] w-[72px] shrink-0 overflow-hidden sm:h-[80px] sm:w-[80px]">
          <Image
            src={iconSrc}
            alt=""
            width={96}
            height={96}
            className="h-full w-full scale-[1.2] object-cover object-center"
            priority
          />
        </span>
        <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black px-2.5 sm:h-8 sm:px-3">
          <SparkleIcon />
          <span className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[10px]">
            You Are Here
          </span>
        </div>
      </div>

      <h3 className="mb-[2%] shrink-0 text-[clamp(24px,3.2vw,36px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-black">
        {title}
      </h3>

      <p className="mb-[4%] max-w-[220px] shrink-0 text-[clamp(11px,1.1vw,13px)] font-medium leading-[1.35] text-[#3d3d3d]">
        {description}
      </p>

      <ul className="mt-auto flex w-full max-w-[220px] shrink-0 flex-col gap-2 pb-[1%]">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex h-[36px] w-full items-center gap-2 rounded-full bg-black pl-1.5 pr-3 sm:h-[38px] sm:gap-2.5 sm:pl-2 sm:pr-4"
          >
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] sm:h-[26px] sm:w-[26px]">
              <CheckIcon />
            </span>
            <span className="text-[12px] font-semibold leading-none text-white sm:text-[13px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileContent({
  title,
  description,
  features,
  iconSrc,
}: Pick<
  FeaturedServiceCardProps,
  "title" | "description" | "features" | "iconSrc"
>) {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <div className="mb-3 flex items-center justify-center gap-2.5">
        <span className="inline-block h-16 w-16 shrink-0 overflow-hidden">
          <Image
            src={iconSrc}
            alt=""
            width={72}
            height={72}
            className="h-full w-full scale-[1.2] object-cover object-center"
            priority
          />
        </span>
        <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black px-2.5">
          <SparkleIcon />
          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#FCE001]">
            You Are Here
          </span>
        </div>
      </div>

      <h3 className="mb-1.5 text-[30px] font-extrabold leading-none tracking-[-0.03em] text-black">
        {title}
      </h3>

      <p className="mb-3 max-w-[280px] text-[11px] font-medium leading-[1.35] text-[#2f2f2f]">
        {description}
      </p>

      <ul className="mt-auto flex max-w-[300px] flex-wrap justify-center gap-2 pb-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-black pl-1.5 pr-3"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]">
              <CheckIcon />
            </span>
            <span className="text-[12px] font-semibold leading-none text-white">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Yellow featured “You Are Here” card used by Our Services on every service page.
 * Layout / spacing / typography are locked here so pages only swap content.
 */
export default function FeaturedServiceCard({
  title,
  description,
  features,
  iconSrc,
  gradientId,
  className = "",
  variant = "desktop",
}: FeaturedServiceCardProps) {
  if (variant === "mobile") {
    return (
      <motion.article
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`relative isolate w-full font-poppins ${className}`}
      >
        <div className="relative w-full" style={{ aspectRatio: "390 / 400" }}>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 390 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCE001" />
                <stop offset="100%" stopColor="#FDB813" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradientId})`}
              d="M28 0H362C377.5 0 390 12.5 390 28V250C390 262 384 273 374 280L214 382C204 389 186 389 176 382L16 280C6 273 0 262 0 250V28C0 12.5 12.5 0 28 0Z"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col px-[6%] pb-[20%] pt-[8%]">
            <MobileContent
              title={title}
              description={description}
              features={features}
              iconSrc={iconSrc}
            />
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative isolate w-full font-poppins ${className}`}
    >
      <div className="relative w-full">
        <Image
          src="/images/taxi-stand/services/taxi-card-shape.png"
          alt=""
          width={589}
          height={609}
          className="h-auto w-full"
          priority
          sizes="(max-width: 1024px) 400px, 520px"
        />
        <div className="absolute inset-0 flex flex-col pl-[11%] pr-[22%] pt-[8%] pb-[8%]">
          <DesktopContent
            title={title}
            description={description}
            features={features}
            iconSrc={iconSrc}
          />
        </div>
      </div>
    </motion.article>
  );
}
