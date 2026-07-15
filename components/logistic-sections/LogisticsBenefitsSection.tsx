"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardVariant = "white" | "yellow" | "dark";

type Benefit = {
  number: string;
  icon: string;
  iconAlt: string;
  title: ReactNode;
  description: string;
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
      "Enjoy a commission-free model that empowers users with cost-effective and transparent logistics solutions.",
    variant: "white",
  },
  {
    number: "02",
    icon: "/images/logistic/benefits/icon-chain.png",
    iconAlt: "Direct connections chain links",
    title: <>Direct Connections.</>,
    description:
      "Facilitate seamless collaborations for transporting goods, ensuring a direct and reliable logistics experience.",
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
        <span className="font-medium italic text-[#FDB813]">Option.</span>
      </>
    ),
    description:
      "Opt for shared vehicle logistics, allowing users to share transportation space for more sustainable and economical shipping.",
    variant: "white",
  },
  {
    number: "04",
    icon: "/images/logistic/benefits/icon-handshake.png",
    iconAlt: "Flexible negotiations handshake",
    title: (
      <>
        Flexible{" "}
        <span className="font-medium italic text-[#FDB813]">Negotiations.</span>
      </>
    ),
    description:
      "Benefit from a user-centric approach that allows for personalized negotiations, ensuring a fair and tailored logistics experience.",
    variant: "white",
  },
  {
    number: "05",
    icon: "/images/logistic/benefits/icon-tracking.png",
    iconAlt: "Real-time shipment tracking pin",
    title: (
      <>
        Real-Time Shipment{" "}
        <span className="font-medium italic text-[#FCE001]">Tracking.</span>
      </>
    ),
    description:
      "Experience the convenience of real-time tracking for your shipments, providing visibility and control throughout the transportation process.",
    variant: "dark",
    rings: true,
  },
  {
    number: "06",
    icon: "/images/logistic/benefits/icon-globe.png",
    iconAlt: "Community collaboration globe",
    title: (
      <>
        Community{" "}
        <span className="font-medium italic text-[#FDB813]">Collaboration.</span>
      </>
    ),
    description:
      "Join a community-centric platform that fosters collaboration between users and logistics service providers.",
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
          ? "bg-gradient-to-br from-[#FCE001] via-[#FCE001] to-[#FDB813] shadow-[0_14px_32px_rgba(253,184,19,0.25)]"
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
        {benefit.description}
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
            Experience the future of logistics with our commission-free platform
            designed for modern transportation needs — six ways we move you
            forward.
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
