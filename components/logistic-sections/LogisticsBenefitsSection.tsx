"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

type CardVariant = "white" | "yellow" | "dark";

type Benefit = {
  number: string;
  icon: string;
  iconAlt: string;
  title: ReactNode;
  description: string;
  bold: readonly string[];
  variant: CardVariant;
  rings?: boolean;
};

const benefits: Benefit[] = [
  {
    number: "01",
    icon: "/images/logistic/benefits/icon-money-bag.png",
    iconAlt: "Commission-free money bag",
    title: (
      <>
        Commission-Free{" "}
        <span className="font-medium italic text-[#FDB813]">Logistics.</span>
      </>
    ),
    description:
      "Grow your business without paying unnecessary commission on every delivery. Spend more on your business, not extra platform costs.",
    bold: ["unnecessary commission"],
    variant: "white",
  },
  {
    number: "02",
    icon: "/images/logistic/benefits/icon-chain.png",
    iconAlt: "Direct connections chain links",
    title: <>Direct Connections.</>,
    description:
      "Stay connected with one platform to keep your drivers, deliveries and business operations all organized.",
    bold: ["one platform"],
    variant: "yellow",
    rings: true,
  },
  {
    number: "03",
    icon: "/images/logistic/benefits/icon-truck.png",
    iconAlt: "Shared vehicle truck",
    title: (
      <>
        Shared Vehicle{" "}
        <span className="font-medium italic text-[#FDB813]">Options.</span>
      </>
    ),
    description:
      "Want to avoid the hassle of managing your own fleet? Choose vehicles that fit your delivery needs and help you cut your operating costs.",
    bold: ["cut your operating costs"],
    variant: "white",
  },
  {
    number: "04",
    icon: "/images/logistic/benefits/icon-handshake.png",
    iconAlt: "Flexible logistics handshake",
    title: (
      <>
        <span className="font-medium italic text-[#FDB813]">Flexibility.</span>
      </>
    ),
    description:
      "Business needs to change daily. No two businesses move the same way. That's why our logistics service is flexible enough to support your day-to-day deliveries and changing business needs.",
    bold: ["day-to-day deliveries"],
    variant: "white",
  },
  {
    number: "05",
    icon: "/images/logistic/benefits/icon-tracking.png",
    iconAlt: "Live shipment tracking pin",
    title: (
      <>
        Live Shipment{" "}
        <span className="font-medium italic text-[#FCE001]">Tracking.</span>
      </>
    ),
    description:
      "Track each shipment from pickup to delivery. Live tracking helps you stay informed and keeps your customers updated too.",
    bold: ["from pickup to delivery"],
    variant: "dark",
    rings: true,
  },
  {
    number: "06",
    icon: "/images/logistic/benefits/icon-globe.png",
    iconAlt: "Business partnership globe",
    title: (
      <>
        Business{" "}
        <span className="font-medium italic text-[#FDB813]">Partnership.</span>
      </>
    ),
    description:
      "We're more than a delivery platform. We work with businesses to build long-term logistics support that grows with them.",
    bold: ["long-term logistics support"],
    variant: "white",
  },
];

function ConcentricRings({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  return (
    <div
      className="pointer-events-none absolute -bottom-16 -right-16 h-[240px] w-[240px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 240" className="h-full w-full" fill="none">
        <circle
          cx="120"
          cy="120"
          r="95"
          stroke={stroke}
          strokeWidth="1.5"
          strokeDasharray="2.5 6"
        />
      </svg>
    </div>
  );
}

function BenefitCard({
  benefit,
  delay,
}: {
  benefit: Benefit;
  delay: number;
}) {
  const isYellow = benefit.variant === "yellow";
  const isDark = benefit.variant === "dark";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] p-5 sm:rounded-[28px] sm:p-6 ${
        isYellow
          ? "bg-gradient-to-br from-[#FCE001] to-[#FDB813] shadow-[0_14px_32px_rgba(253,184,19,0.25)]"
          : isDark
            ? "bg-[#0b0b0b] shadow-[0_14px_32px_rgba(0,0,0,0.25)]"
            : "bg-white shadow-[0_10px_28px_rgba(11,11,11,0.06)]"
      }`}
    >
      {benefit.rings ? <ConcentricRings dark={isDark} /> : null}

      <div className="relative z-[1] mb-4 flex items-start justify-between gap-3 sm:mb-5">
        <div className="relative h-[48px] w-[48px] shrink-0 sm:h-[52px] sm:w-[52px]">
          <Image
            src={benefit.icon}
            alt={benefit.iconAlt}
            fill
            sizes="52px"
            className="object-contain"
          />
        </div>
        <span
          className={`select-none font-poppins text-[36px] font-bold italic leading-none tracking-tight sm:text-[40px] ${
            isYellow
              ? "text-black/10"
              : isDark
                ? "text-[#4A4614]"
                : "text-black/[0.07]"
          }`}
        >
          {benefit.number}
        </span>
      </div>

      <h3
        className={`relative z-[1] mb-2 text-[17px] font-bold leading-[1.25] tracking-tight sm:mb-2.5 sm:text-[18px] lg:text-[19px] ${
          isDark ? "text-white" : "text-[#0b0b0b]"
        }`}
      >
        {benefit.title}
      </h3>

      <p
        className={`relative z-[1] text-[13px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] ${
          isDark ? "text-white/75" : "text-[#4a4a45]"
        }`}
      >
        {emphasizePhrases(
          benefit.description,
          benefit.bold,
          isDark ? "onDark" : "onLight",
        )}
      </p>
    </motion.article>
  );
}

export default function LogisticsBenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
      {/* Soft yellow glows — match Figma atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 40% at 50% 8%, rgba(252,224,1,0.28), transparent 70%),
            radial-gradient(ellipse 40% 35% at 92% 12%, rgba(253,184,19,0.18), transparent 65%),
            radial-gradient(ellipse 45% 40% at 8% 88%, rgba(252,224,1,0.14), transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#FCE001] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
              Key Advantages
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Logistics{" "}
            <span className="font-medium italic text-[#FDB813]">Benefits.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-[14px] leading-relaxed text-[#5c5b55] sm:text-[16px] sm:leading-[1.65]">
            Every business works differently. That&apos;s why our logistics
            services are customized to your operation, not the other way around.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.number}
              benefit={benefit}
              delay={0.06 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
