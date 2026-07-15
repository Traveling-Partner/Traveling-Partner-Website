"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const goals = [
  "Commission-Free Environment",
  "Transform the Transportation Landscape",
  "Facilitate Collaboration and Connectivity",
  "User-Driven Flexibility",
] as const;

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-black"
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

/**
 * Aim of Traveling Partner — 1:1 Figma dark goals split on night road bg.
 */
export default function AimOfTravelingPartner() {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Night city background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/about/aim-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[28px] bg-[#121212] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:rounded-[36px] sm:p-7 lg:rounded-[40px] lg:p-8 xl:p-10"
        >
          <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-9 xl:gap-10">
            {/* Left: content */}
            <div className="order-2 flex flex-col lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="mb-5 inline-flex w-fit items-center rounded-full bg-[#FCE001] px-4 py-1.5 sm:mb-6"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
                  Our Goals
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-4 font-poppins text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.12] tracking-tight text-white"
              >
                Aim of Traveling{" "}
                <span className="font-medium italic text-[#FCE001]">
                  Partner.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.14 }}
                className="mb-5 max-w-lg text-[14px] leading-relaxed text-white/70 sm:mb-6 sm:text-[16px] sm:leading-[1.65]"
              >
                At Traveling Partner, we aim to redefine how people connect,
                collaborate, and move within Pakistan by providing:
              </motion.p>

              <div
                className="mb-5 border-t border-dashed border-white/15 sm:mb-6"
                aria-hidden="true"
              />

              <ul className="flex flex-col gap-3.5 sm:gap-4">
                {goals.map((goal, index) => (
                  <motion.li
                    key={goal}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: 0.16 + index * 0.05,
                    }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FCE001]">
                      <CheckIcon />
                    </span>
                    <span className="text-[14px] font-semibold text-white sm:text-[15px] md:text-[16px]">
                      {goal}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="order-1 w-full lg:order-2"
            >
              <div className="relative mx-auto aspect-[5/4] w-full max-w-[460px] overflow-hidden rounded-[22px] sm:rounded-[28px] lg:ml-auto lg:mr-0 lg:max-w-[520px] lg:rounded-[32px]">
                <Image
                  src="/images/about/aim-photo.png"
                  alt="Traveling Partner team connecting with customers at sunset"
                  fill
                  sizes="(max-width: 1024px) 460px, 520px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
