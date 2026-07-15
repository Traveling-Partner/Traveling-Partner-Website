"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type CardVariant = "white" | "yellow" | "dark";

type Feature = {
  number: string;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  variant: CardVariant;
  rings?: boolean;
};

const features: Feature[] = [
  {
    number: "01",
    icon: "/images/about/features/icon-handshake.png",
    iconAlt: "Handshake — empowering connections",
    title: "Empowering Connections",
    description:
      "Join a community where passengers, drivers, couriers, and travelers collaborate without extra fees.",
    variant: "white",
  },
  {
    number: "02",
    icon: "/images/about/features/icon-rocket.png",
    iconAlt: "Rocket — revolutionizing mobility",
    title: "Revolutionizing Mobility",
    description:
      "Experience a commission-free environment for taxis, shared rides, deliveries, logistics, and trip planning.",
    variant: "yellow",
    rings: true,
  },
  {
    number: "03",
    icon: "/images/about/features/icon-globe.png",
    iconAlt: "Globe network — community collaboration",
    title: "Community-Driven Collaboration",
    description:
      "Be part of a platform connecting users with taxi stands, ride pools, couriers, logistics, and trip planners.",
    variant: "white",
  },
  {
    number: "04",
    icon: "/images/about/features/icon-search.png",
    iconAlt: "Magnifying glass — transparent and empowering",
    title: "Transparent & Empowering",
    description:
      "Benefit from transparent transactions, allowing users to negotiate and manage dealings independently.",
    variant: "white",
  },
  {
    number: "05",
    icon: "/images/about/features/icon-stars.png",
    iconAlt: "Stars — revamp your mobility",
    title: "Revamp Your Mobility",
    description:
      "Explore a fresh, commission-free approach to mobility prioritizing convenience, collaboration, and empowerment.",
    variant: "dark",
  },
  {
    number: "06",
    icon: "/images/about/features/icon-map.png",
    iconAlt: "Map pin — accessible nationwide",
    title: "Accessible Nationwide",
    description:
      "This app is accessible anywhere in Pakistan where internet services are available.",
    variant: "white",
  },
];

function ConcentricRings() {
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

function FeatureCard({
  feature,
  delay,
}: {
  feature: Feature;
  delay: number;
}) {
  const isYellow = feature.variant === "yellow";
  const isDark = feature.variant === "dark";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[28px] p-5 sm:rounded-[32px] sm:p-6 ${
        isYellow
          ? "bg-gradient-to-br from-[#FCE001] via-[#FCE001] to-[#FDB813] shadow-[0_14px_32px_rgba(253,184,19,0.25)]"
          : isDark
            ? "bg-[#0b0b0b] shadow-[0_14px_32px_rgba(0,0,0,0.25)]"
            : "bg-white shadow-[0_10px_28px_rgba(11,11,11,0.06)]"
      }`}
    >
      {feature.rings ? <ConcentricRings /> : null}

      <div className="relative z-[1] mb-4 flex items-start justify-between gap-3 sm:mb-5">
        <div className="relative h-[52px] w-[52px] shrink-0 sm:h-[56px] sm:w-[56px]">
          <Image
            src={feature.icon}
            alt={feature.iconAlt}
            fill
            sizes="56px"
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
          {feature.number}
        </span>
      </div>

      <h3
        className={`relative z-[1] mb-2 text-[17px] font-bold leading-[1.25] tracking-tight sm:mb-2.5 sm:text-[18px] lg:text-[19px] ${
          isDark ? "text-white" : "text-[#0b0b0b]"
        }`}
      >
        {feature.title}
      </h3>

      <p
        className={`relative z-[1] text-[13px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] ${
          isDark ? "text-white/75" : "text-[#4a4a45]"
        }`}
      >
        {feature.description}
      </p>
    </motion.article>
  );
}

/**
 * Features of the App — 1:1 Figma 6-card grid for About page.
 */
export default function AppFeatures() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
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
              Key Features
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Features of the{" "}
            <span className="font-medium italic text-[#FCE001]">App.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-[14px] leading-relaxed text-[#5c5b55] sm:text-[16px] sm:leading-[1.65]">
            Six pillars that define how Traveling Partner is reshaping mobility
            and connections across Pakistan.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              delay={0.06 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
