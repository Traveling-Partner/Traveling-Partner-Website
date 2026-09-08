"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

type PartnerStep = {
  step: string;
  stepLabel: string;
  watermark: string;
  title: ReactNode;
  description: ReactNode;
  footer: string;
  imageSrc: string;
  featured?: boolean;
};

const partnerSteps: PartnerStep[] = [
  {
    step: "1",
    stepLabel: "STEP - ONE",
    watermark: "01",
    title: (
      <>
        Download <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">the app</em>
      </>
    ),
    description:
      "Download the Traveling Partner app and create your account.",
    footer: "ONE TAP · ZERO WAIT",
    imageSrc: "/images/taxi-stand/driver-icon-1.png",
  },
  {
    step: "2",
    stepLabel: "STEP - TWO",
    watermark: "02",
    title: <>Register & Verify</>,
    description:
      "Add your details and verify your account to get started.",
    footer: "COMMUNITY · TRUST · ACCESS",
    imageSrc: "/images/taxi-stand/driver-icon-2.png",
    featured: true,
  },
  {
    step: "3",
    stepLabel: "STEP - THREE",
    watermark: "03",
    title: (
      <>
        Become a <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Partner</em>
      </>
    ),
    description: emphasizePhrases(
      "Complete your setup, start using the app, and book a ride online whenever you need one.",
      ["book a ride online"],
      "onLight",
    ),
    footer: "YOU'RE ALL SET · RIDE NOW",
    imageSrc: "/images/taxi-stand/driver-icon-3.png",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PartnerCard({ step, index }: { step: PartnerStep; index: number }) {
  const featured = Boolean(step.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[28px] p-5 sm:p-6 ${
        featured
          ? "border border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-[0_18px_50px_rgba(253,184,19,0.35)]"
          : "border border-transparent bg-white shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
      }`}
    >
      <span
        className={`pointer-events-none absolute right-4 top-2 select-none text-[48px] font-black leading-none sm:right-5 sm:text-[56px] ${
          featured ? "text-black/10" : "text-[#FCE001]"
        }`}
        aria-hidden="true"
      >
        {step.watermark}
      </span>

      <div
        className={`pointer-events-none absolute rounded-full border border-dashed ${
          featured
            ? "-right-5 -top-3 h-28 w-28 border-black/35"
            : "-right-10 top-6 h-32 w-32 border-[#FDB813]/20"
        }`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute rounded-full border border-dashed ${
          featured
            ? "-left-9 top-14 h-24 w-24 border-black/25"
            : "-left-12 bottom-10 h-24 w-24 border-[#FDB813]/12"
        }`}
        aria-hidden="true"
      />

      <div className="relative z-10 mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#0b0b0b] py-1.5 pl-1.5 pr-3.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FDB813] text-[12px] font-bold text-black">
          {step.step}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[11px]">
          {step.stepLabel}
        </span>
      </div>

      <div className="relative z-10 mb-3 flex justify-start">
        <div
          className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[18px] sm:h-[80px] sm:w-[80px] ${
            featured ? "bg-[#0b0b0b]" : "bg-transparent"
          }`}
        >
          <Image
            src={step.imageSrc}
            alt=""
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        </div>
      </div>

      <h3 className="relative z-10 mb-2 text-[18px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] sm:text-[20px]">
        {step.title}
      </h3>
      <p
        className={`relative z-10 mb-3 flex-1 text-[13px] leading-relaxed ${
          featured ? "text-black/80" : "text-[#6f6e68]"
        }`}
      >
        {step.description}
      </p>

      <div
        className={`relative z-10 mb-3 border-t border-dashed ${
          featured ? "border-black/25" : "border-black/10"
        }`}
      />

      <div className="relative z-10 mt-auto flex items-center gap-2.5">
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            featured ? "bg-black text-white" : "bg-[#FDB813] text-black"
          }`}
        >
          <CheckIcon className="h-3 w-3" />
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px] ${
            featured ? "text-black" : "text-[#8a897f]"
          }`}
        >
          {step.footer}
        </span>
      </div>
    </motion.article>
  );
}

export default function ForPartnersSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 45% at 92% 6%, rgba(253,184,19,0.28), transparent 70%),
            radial-gradient(ellipse 40% 35% at 8% 94%, rgba(252,224,1,0.18), transparent 70%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-14"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black sm:text-[11px]">
              For Partners
            </span>
          </div>

          <h2 className="mb-4 text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#0b0b0b] sm:text-4xl md:text-5xl lg:whitespace-nowrap lg:text-[52px]">
            Let&apos;s Get You{" "}
            <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium text-transparent">Moving.</span>
          </h2>

          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-[#5c5b55] sm:text-base">
            Create your account today and become a part of Traveling Partner in
            just a few minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {partnerSteps.map((step, index) => (
            <div key={step.step} className="h-full w-full min-w-0">
              <PartnerCard step={step} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
