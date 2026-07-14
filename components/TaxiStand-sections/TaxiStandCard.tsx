"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const FEATURES = [
  "Verified drivers",
  "Fixed fares",
  "0% commission",
] as const;

function SparkleIcon() {
  return (
    <svg
      className="h-2.5 w-2.5 shrink-0 text-[#FFD400]"
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
      className="h-2.5 w-2.5 text-white"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

type TaxiStandCardProps = {
  className?: string;
  /** Desktop: right-pointing shape asset. Mobile: downward V via SVG. */
  variant?: "desktop" | "mobile";
};

function CardContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className={`flex items-center gap-2.5 ${compact ? "mb-3" : "mb-[5%] gap-3"}`}>
        <Image
          src="/images/taxi-stand/services/icon-taxi.png"
          alt=""
          width={72}
          height={72}
          className={
            compact
              ? "h-12 w-12 shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
              : "h-[60px] w-[60px] shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.2)] sm:h-[64px] sm:w-[64px]"
          }
          priority
        />

        <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black px-2.5 shadow-[0_3px_10px_rgba(0,0,0,0.16)] sm:h-8 sm:px-3">
          <SparkleIcon />
          <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[10px]">
            You Are Here
          </span>
        </div>
      </div>

      <h3
        className={`font-extrabold leading-[1.02] tracking-[-0.03em] text-black ${
          compact
            ? "mb-1.5 text-[28px]"
            : "mb-[2%] text-[clamp(28px,3.8vw,40px)]"
        }`}
      >
        Taxi Stand.
      </h3>

      <p
        className={`font-medium leading-[1.45] text-[#3d3d3d] ${
          compact
            ? "mb-4 max-w-[240px] text-[13px]"
            : "mb-[7%] max-w-[210px] text-[clamp(13px,1.4vw,15px)]"
        }`}
      >
        Commission-free city rides across Pakistan.
      </p>

      <ul
        className={`mt-auto flex w-full flex-col ${
          compact ? "max-w-[230px] gap-2 pb-1" : "max-w-[220px] gap-2.5 pb-[2%]"
        }`}
      >
        {FEATURES.map((feature) => (
          <li
            key={feature}
            className={`flex w-full items-center gap-2.5 rounded-full bg-black shadow-[0_4px_14px_rgba(0,0,0,0.18)] ${
              compact ? "h-9 pl-1.5 pr-3" : "h-[40px] pl-2 pr-4"
            }`}
          >
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#FFD400]">
              <CheckIcon />
            </span>
            <span className="text-[12px] font-semibold leading-none text-white sm:text-[13px]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * Taxi Stand featured card.
 * - desktop: Figma right-pointing yellow shape PNG
 * - mobile: downward-V shape matching mobile Figma
 */
export default function TaxiStandCard({
  className = "",
  variant = "desktop",
}: TaxiStandCardProps) {
  if (variant === "mobile") {
    return (
      <motion.article
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`relative isolate w-full font-poppins ${className}`}
      >
        <div className="relative w-full" style={{ aspectRatio: "390 / 430" }}>
          <svg
            className="absolute inset-0 h-full w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            viewBox="0 0 390 430"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="taxiMobileGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFEE5C" />
                <stop offset="45%" stopColor="#FCE001" />
                <stop offset="100%" stopColor="#F7C600" />
              </linearGradient>
            </defs>
            {/* Rounded top + downward chevron bottom */}
            <path
              fill="url(#taxiMobileGrad)"
              d="M36 0H354C373.9 0 390 16.1 390 36V292C390 300 386 307.5 379.5 312.5L214 418C203.5 425 186.5 425 176 418L10.5 312.5C4 307.5 0 300 0 292V36C0 16.1 16.1 0 36 0Z"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col px-[7%] pb-[22%] pt-[7%]">
            <CardContent compact />
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
          <CardContent />
        </div>
      </div>
    </motion.article>
  );
}
