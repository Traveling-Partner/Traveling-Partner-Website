"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

type BenefitItem = {
  text: string;
  bold?: readonly string[];
};

const benefitOne: BenefitItem[] = [
  { text: "Split your fare and lower your travel expenses." },
  { text: "Meet people travelling in the same direction." },
  { text: "Make your daily commute more affordable." },
  { text: "Help reduce traffic congestion across the city." },
  { text: "Support a greener, more sustainable way to travel." },
];

const benefitTwo: BenefitItem[] = [
  {
    text: "Female-only ride options available where offered.",
    bold: ["Female-only ride"],
  },
  { text: "Save on everyday travel without giving up comfort." },
  { text: "Get matched with partners heading your way." },
  {
    text: "Track your journey in real time with verified drivers.",
    bold: ["verified drivers"],
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type BenefitCardProps = {
  image: string;
  imageAlt: string;
  step: string;
  stepLabel: string;
  title: ReactNode;
  intro?: string;
  introBold?: readonly string[];
  items: BenefitItem[];
  featured?: boolean;
  delay?: number;
};

function BenefitCard({
  image,
  imageAlt,
  step,
  stepLabel,
  title,
  intro,
  introBold = [],
  items,
  featured = false,
  delay = 0,
}: BenefitCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`flex h-full w-full flex-col overflow-hidden rounded-[24px] ${
        featured
          ? "border border-black bg-white shadow-[0_14px_40px_rgba(253,184,19,0.25)]"
          : "border border-transparent bg-white shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
      }`}
    >
      {/* Image — flush, no gap under photo */}
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden sm:aspect-[2.15/1]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="scale-[1.02] object-cover object-center"
          priority
        />

        {/* Step badge overlay */}
        <div
          className={`absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 shadow-[0_6px_18px_rgba(0,0,0,0.12)] ${
            featured ? "bg-[#0b0b0b]" : "bg-white"
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[11px] font-bold text-black">
            {step}
          </span>
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px] ${
              featured ? "text-[#FCE001]" : "text-[#0b0b0b]"
            }`}
          >
            {stepLabel}
          </span>
        </div>
      </div>

      {/* Content — yellow only here on featured card */}
      <div
        className="relative z-[1] -mt-px flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6"
        style={
          featured
            ? {
                backgroundImage:
                  "linear-gradient(180deg, #FCE001 0%, #FDB813 100%)",
              }
            : undefined
        }
      >
        <h3 className="mb-3 text-[24px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] sm:text-[26px] lg:text-[28px]">
          {title}
        </h3>

        {intro ? (
          <p className="mb-2 text-[12px] leading-snug text-[#0b0b0b]/80 sm:text-[13px]">
            {emphasizePhrases(intro, introBold, "onLight")}
          </p>
        ) : null}

        <div
          className={`mb-4 border-t border-dashed ${
            featured ? "border-black/30" : "border-black/12"
          }`}
        />

        <ul className="flex flex-col gap-2 sm:gap-2.5">
          {items.map((item) => (
            <li key={item.text} className="flex items-start gap-2.5 sm:gap-3">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  featured
                    ? "bg-black text-[#FCE001]"
                    : "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-black"
                }`}
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-[13px] leading-snug text-[#0b0b0b] sm:text-[14px]">
                {emphasizePhrases(item.text, item.bold ?? [], "onLight")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] py-14 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black sm:text-[11px]">
              For Users
            </span>
          </div>

          <h2 className="mb-3 text-[clamp(28px,6vw,48px)] font-extrabold leading-[1.15] tracking-tight text-[#0b0b0b] sm:text-4xl md:text-5xl">
            Benefits Of{" "}
            <em className="font-medium italic text-[#FDB813]">Pool Ride</em>
          </h2>

          <div className="mx-auto max-w-lg space-y-1 text-[14px] leading-snug text-[#5c5b55] sm:text-[15px]">
            <p className="font-semibold text-[#0b0b0b]">One ride. More value.</p>
            <p>
              Sharing a ride isn&apos;t just about paying less. It&apos;s all
              about making everyday travel easier for everyone.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          <BenefitCard
            image="/Assist/Taxi-stand-img/man-getting-car-medium-shot 1.png"
            imageAlt="Passengers sharing a pool ride"
            step="1"
            stepLabel="Benefit One"
            title={
              <>
                Save{" "}
                <em className="font-medium italic text-[#FDB813]">
                  & Connect
                </em>
              </>
            }
            intro="On a common route, choose Pool Ride and enjoy the benefits of cost-sharing."
            introBold={["Pool Ride"]}
            items={benefitOne}
            delay={0.08}
          />

          <BenefitCard
            image="/Assist/Taxi-stand-img/travel-city 1.png"
            imageAlt="Comfortable pool ride journey"
            step="2"
            stepLabel="Benefit Two"
            title={
              <>
                Comfort &{" "}
                <em className="font-medium italic text-[#0b0b0b]">
                  Flexibility
                </em>
              </>
            }
            items={benefitTwo}
            featured
            delay={0.14}
          />
        </div>
      </div>
    </section>
  );
}
