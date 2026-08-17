"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Step = {
  number: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  description: string;
  featured?: boolean;
};

const steps: Step[] = [
  {
    number: "01",
    image: "/images/trip/how-it-works/step-book.png",
    imageAlt: "Woman choosing pickup and travel destination",
    title: (
      <>
        Choose Your{" "}
        <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Route.</span>
      </>
    ),
    description:
      "Choose your pickup location and travel destination to start planning your tourism journey.",
  },
  {
    number: "02",
    image: "/images/trip/how-it-works/step-track.png",
    imageAlt: "Traveler adding travel date and journey details",
    title: (
      <>
        Set Travel{" "}
        <span className="font-medium italic">Details.</span>
      </>
    ),
    description:
      "Add your preferred travel date, time, and journey details that fit your schedule.",
    featured: true,
  },
  {
    number: "03",
    image: "/images/trip/how-it-works/step-arrive.png",
    imageAlt: "Friends beginning a verified driver tourism journey",
    title: (
      <>
        Confirm &{" "}
        <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Explore.</span>
      </>
    ),
    description:
      "Review the fare, confirm your tourism booking, then meet your verified driver and begin your journey.",
  },
];

function StepBadge({ number, dark }: { number: string; dark?: boolean }) {
  return (
    <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white py-0.5 pl-0.5 pr-2 shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:left-3.5 sm:top-3.5 sm:gap-1.5 sm:pr-2.5">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold sm:h-[22px] sm:w-[22px] sm:text-[11px] ${
          dark ? "bg-[#0b0b0b] text-[#FCE001]" : "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b]"
        }`}
      >
        {number}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#0b0b0b] sm:text-[10px]">
        Step
      </span>
    </div>
  );
}

function StepCard({ step, delay }: { step: Step; delay: number }) {
  const featured = Boolean(step.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={`flex h-full flex-col overflow-hidden rounded-[28px] sm:rounded-[32px] ${
        featured
          ? "border border-black/10 bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-[0_18px_40px_rgba(253,184,19,0.28)]"
          : "bg-white shadow-[0_14px_36px_rgba(11,11,11,0.07)]"
      }`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[5/3]">
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />
        <StepBadge number={step.number} dark={featured} />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-5 lg:px-7 lg:pb-8">
        <h3
          className={`mb-2.5 font-poppins text-[20px] font-extrabold leading-tight tracking-tight sm:mb-3 sm:text-[22px] lg:text-[24px] ${
            featured ? "text-[#0b0b0b]" : "text-[#0b0b0b]"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-[13px] leading-[1.55] sm:text-[14px] sm:leading-[1.6] ${
            featured ? "text-[#0b0b0b]/75" : "text-[#5c5b55]"
          }`}
        >
          {step.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function TripHowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 45% 40% at 50% 0%, rgba(252,224,1,0.18), transparent 65%),
            radial-gradient(ellipse 35% 30% at 92% 80%, rgba(253,184,19,0.10), transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#F3EBD2] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
              Easy Process
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.2vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Plan. Book.{" "}
            <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Explore.</span>
          </h2>

          <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-[#5c5b55] sm:text-[15px] sm:leading-[1.65] md:text-[16px]">
            Book tourism travel in a few simple steps — choose your route, set
            your plans, confirm the fare, and start exploring.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              delay={0.08 + index * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
