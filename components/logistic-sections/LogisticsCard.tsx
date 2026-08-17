"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const FEATURES = [
  "Fleet support",
  "Live tracking",
  "Regular deliveries",
] as const;

const CARD_COPY =
  "Built for businesses that need regular deliveries, fleet support, and transport they can rely on.";
const CARD_BOLD = ["transport they can rely on"] as const;

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

type LogisticsCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

function DesktopContent() {
  return (
    <>
      <div className="mb-[5%] flex items-center gap-3">
        <Image
          src="/images/taxi-stand/services/icon-logistics.png"
          alt=""
          width={72}
          height={72}
          className="h-[60px] w-[60px] shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.2)] sm:h-[64px] sm:w-[64px]"
          priority
        />
        <div className="inline-flex h-8 items-center gap-1.5 rounded-full bg-black px-3 shadow-[0_3px_10px_rgba(0,0,0,0.16)]">
          <SparkleIcon />
          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[10px]">
            You Are Here
          </span>
        </div>
      </div>

      <h3 className="mb-[2%] text-[clamp(28px,3.8vw,40px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-black">
        Logistics.
      </h3>

      <p className="mb-[7%] max-w-[210px] text-[clamp(13px,1.4vw,15px)] font-medium leading-[1.45] text-[#3d3d3d]">
        {emphasizePhrases(CARD_COPY, CARD_BOLD)}
      </p>

      <ul className="mt-auto flex w-full max-w-[220px] flex-col gap-2.5 pb-[2%]">
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className="flex h-[40px] w-full items-center gap-2.5 rounded-full bg-black pl-2 pr-4 shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#FFD400]">
              <CheckIcon />
            </span>
            <span className="text-[13px] font-semibold leading-none text-white sm:text-[14px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function MobileContent() {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <div className="mb-3 flex items-center justify-center gap-2.5">
        <Image
          src="/images/taxi-stand/services/icon-logistics.png"
          alt=""
          width={56}
          height={56}
          className="h-12 w-12 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
          priority
        />
        <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black px-2.5 shadow-[0_3px_10px_rgba(0,0,0,0.16)]">
          <SparkleIcon />
          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#FCE001]">
            You Are Here
          </span>
        </div>
      </div>

      <h3 className="mb-1.5 text-[30px] font-extrabold leading-none tracking-[-0.03em] text-black">
        Logistics.
      </h3>

      <p className="mb-4 max-w-[260px] text-[13px] font-medium leading-snug text-[#2f2f2f]">
        {emphasizePhrases(CARD_COPY, CARD_BOLD)}
      </p>

      <ul className="mt-auto flex max-w-[300px] flex-wrap justify-center gap-2 pb-1">
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-black pl-1.5 pr-3 shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FFD400]">
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

export default function LogisticsCard({
  className = "",
  variant = "desktop",
}: LogisticsCardProps) {
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
            className="absolute inset-0 h-full w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            viewBox="0 0 390 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="logisticsMobileGrad"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#FCE001" />
                <stop offset="100%" stopColor="#FDB813" />
              </linearGradient>
            </defs>
            <path
              fill="url(#logisticsMobileGrad)"
              d="M28 0H362C377.5 0 390 12.5 390 28V250C390 262 384 273 374 280L214 382C204 389 186 389 176 382L16 280C6 273 0 262 0 250V28C0 12.5 12.5 0 28 0Z"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col px-[6%] pb-[20%] pt-[8%]">
            <MobileContent />
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
          className="h-auto w-full drop-shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
          priority
          sizes="(max-width: 1024px) 400px, 520px"
        />
        <div className="absolute inset-0 flex flex-col pl-[11%] pr-[22%] pt-[9%] pb-[10%]">
          <DesktopContent />
        </div>
      </div>
    </motion.article>
  );
}
