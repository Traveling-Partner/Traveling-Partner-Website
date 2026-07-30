"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const cards = [
  {
    icon: "/images/trip/reliable/icon-quality.png",
    iconAlt: "Verified drivers",
    title: "Verified Drivers",
    description:
      "Enjoy greater peace of mind from pickup to destination with drivers who have successfully passed our verification process.",
    bold: ["verification process"] as const,
    featured: false,
  },
  {
    icon: "/images/trip/reliable/icon-time.png",
    iconAlt: "Flexible scheduling",
    title: "Flexible Scheduling",
    description:
      "Choose your date and time. Reserve early or schedule your trip when you are ready.",
    bold: ["Reserve early"] as const,
    featured: true,
  },
  {
    icon: "/images/trip/reliable/icon-cash.png",
    iconAlt: "Transparent pricing",
    title: "Transparent Pricing",
    description:
      "We show your fare BEFORE you confirm your booking, so you always know what you'll pay before the trip starts.",
    bold: ["BEFORE you confirm your booking"] as const,
    featured: false,
  },
] as const;

function PlayStoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5M16.81 15.12 6.05 21.34 14.54 12.85 16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12S20.5 12.92 20.16 13.19L17.89 14.5 15.39 12 17.89 9.5 20.16 10.81M6.05 2.66 16.81 8.88 14.54 11.15 6.05 2.66Z" />
    </svg>
  );
}

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.24.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function StorePill({
  href,
  label,
  title,
  icon,
}: {
  href: string;
  label: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[56px] items-center gap-3 rounded-full bg-[#FCE001] px-5 shadow-[0_10px_28px_rgba(252,224,1,0.22)] transition-transform duration-300 hover:-translate-y-0.5 sm:h-[60px] sm:min-w-[190px] sm:px-6"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-black sm:h-9 sm:w-9">
        {icon}
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/80 sm:text-[10px]">
          {label}
        </span>
        <span className="mt-0.5 text-[15px] font-bold text-black sm:text-[16px]">
          {title}
        </span>
      </span>
    </Link>
  );
}

function DottedRings() {
  return (
    <div
      className="pointer-events-none absolute -right-10 -top-10 h-[220px] w-[220px] sm:-right-12 sm:-top-12 sm:h-[260px] sm:w-[260px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 260 260" className="h-full w-full" fill="none">
        <circle
          cx="130"
          cy="130"
          r="78"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="1.25"
          strokeDasharray="2 5"
        />
        <circle
          cx="130"
          cy="130"
          r="102"
          stroke="rgba(0,0,0,0.10)"
          strokeWidth="1.25"
          strokeDasharray="2 6"
        />
        <circle
          cx="130"
          cy="130"
          r="124"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1.25"
          strokeDasharray="2 7"
        />
      </svg>
    </div>
  );
}

export default function TripReliable() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
      {/* Figma glow background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/trip/reliable/bg-reliable.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 42% 38% at 50% 42%, rgba(252,224,1,0.14), transparent 70%),
              radial-gradient(ellipse 28% 30% at 50% 72%, rgba(253,184,19,0.18), transparent 65%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#454117] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[11px]">
              Trusted Service
            </span>
          </div>

          <h2 className="mb-3 font-poppins text-[clamp(32px,5.2vw,52px)] font-extrabold leading-[1.12] tracking-tight text-white sm:mb-4">
            Reliable, Safe,{" "}
            <span className="font-medium italic text-[#FCE001]">
              Transparent.
            </span>
          </h2>

          <p className="font-poppins text-[15px] italic leading-relaxed text-white/75 sm:text-[17px] sm:leading-[1.55] md:text-[18px]">
            {emphasizePhrases(
              "Drivers are dedicated to offering a safe, comfortable and professional service from start to finish, so relax and enjoy the ride.",
              ["safe, comfortable and professional"],
              "onDark",
            )}
          </p>
        </motion.div>

        {/* Store buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mb-12 flex flex-col items-center justify-center gap-3 sm:mb-14 sm:flex-row sm:gap-4 lg:mb-16"
        >
          <StorePill
            href={PLAY_STORE_URL}
            label="Get it on"
            title="Google Play"
            icon={<PlayStoreIcon className="h-8 w-8" />}
          />
          <StorePill
            href={APP_STORE_URL}
            label="Download on"
            title="App Store"
            icon={<AppleIcon className="h-8 w-8" />}
          />
        </motion.div>

        {/* Feature cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {cards.map((card, index) => {
            const isFeatured = card.featured;
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.07 }}
                className={`relative flex flex-col items-center overflow-hidden rounded-[28px] px-6 py-8 text-center sm:rounded-[32px] sm:px-7 sm:py-9 lg:px-8 lg:py-10 ${
                  isFeatured
                    ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-[0_20px_60px_rgba(252,224,1,0.28)]"
                    : "border border-white/[0.06] bg-[#141414] shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                }`}
              >
                {isFeatured ? <DottedRings /> : null}

                <div className="relative z-[1] mb-5 h-[72px] w-[72px] sm:mb-6 sm:h-[80px] sm:w-[80px]">
                  <Image
                    src={card.icon}
                    alt={card.iconAlt}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>

                <h3
                  className={`relative z-[1] mb-2.5 font-poppins text-[18px] font-bold leading-tight tracking-tight sm:mb-3 sm:text-[19px] lg:text-[20px] ${
                    isFeatured ? "text-[#0b0b0b]" : "text-white"
                  }`}
                >
                  {card.title}
                </h3>

                <p
                  className={`relative z-[1] max-w-[280px] text-[13px] leading-[1.55] sm:text-[14px] sm:leading-[1.6] ${
                    isFeatured ? "text-[#0b0b0b]/75" : "text-white/60"
                  }`}
                >
                  {emphasizePhrases(
                    card.description,
                    card.bold,
                    isFeatured ? "onLight" : "onDark",
                  )}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
