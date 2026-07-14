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
};

/**
 * Taxi Stand featured card — Figma yellow shape asset as exact silhouette.
 */
export default function TaxiStandCard({ className = "" }: TaxiStandCardProps) {
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
          <div className="mb-[5%] flex items-center gap-3">
            <Image
              src="/images/taxi-stand/services/icon-taxi.png"
              alt=""
              width={72}
              height={72}
              className="h-[60px] w-[60px] shrink-0 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.2)] sm:h-[64px] sm:w-[64px]"
              priority
            />

            <div className="inline-flex h-8 items-center gap-1.5 rounded-full bg-black px-3 shadow-[0_3px_10px_rgba(0,0,0,0.16)]">
              <SparkleIcon />
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white sm:text-[10px]">
                You Are Here
              </span>
            </div>
          </div>

          <h3 className="mb-[2%] text-[clamp(28px,3.8vw,40px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-black">
            Taxi Stand.
          </h3>

          <p className="mb-[7%] max-w-[210px] text-[clamp(13px,1.4vw,15px)] font-medium leading-[1.45] text-[#3d3d3d]">
            Commission-free city rides across Pakistan.
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
        </div>
      </div>
    </motion.article>
  );
}
