"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Purpose of Traveling Partner — 1:1 Figma dark mission split.
 */
export default function PurposeOfTravelingPartner() {
  return (
    <section className="relative w-full overflow-x-hidden bg-[#0a0a0a] py-16 sm:py-20 lg:py-24">
      {/* Figma glow / grain background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/about/purpose-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 xl:gap-12">
        {/* Left: photo + badge */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[360px] shrink-0 overflow-visible sm:max-w-[400px] lg:max-w-[420px] xl:max-w-[440px]"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]">
            <Image
              src="/images/about/purpose-photo.png"
              alt="Traveling Partner community — rides, delivery, and shared journeys"
              fill
              sizes="(max-width: 1024px) 400px, 440px"
              className="object-cover object-[center_20%]"
              priority
            />
          </div>

          <div className="absolute -bottom-3 -right-3 z-10 rounded-2xl bg-[#0b0b0b] px-4 py-3 shadow-[0_14px_36px_rgba(0,0,0,0.45)] sm:-bottom-4 sm:-right-4 sm:px-5 sm:py-3.5">
            <p className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text text-[10px] font-bold uppercase tracking-[0.14em] text-transparent sm:text-[11px]">
              Trusted Across
            </p>
            <p className="text-[16px] font-extrabold leading-tight text-white sm:text-[18px]">
              Pakistan
            </p>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex w-full max-w-xl flex-col lg:min-w-0 lg:flex-1 lg:max-w-none"
        >
          <div className="mb-5 inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
              Our Purpose
            </span>
          </div>

          <h2 className="mb-3 font-poppins text-[clamp(32px,4.8vw,52px)] font-extrabold leading-[1.12] tracking-tight text-white sm:mb-4">
            Purpose of Traveling{" "}
            <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
              Partner.
            </span>
          </h2>

          <p className="mb-5 bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-poppins text-[15px] font-medium italic text-transparent sm:mb-6 sm:text-[16px] md:text-[17px]">
            Built around everyday movement.
          </p>

          <div
            className="mb-6 border-t border-dashed border-white/20 sm:mb-7"
            aria-hidden="true"
          />

          <div className="max-w-xl space-y-4 text-[14px] leading-[1.7] text-white/75 sm:text-[15px] sm:leading-[1.75] md:text-[16px]">
            <p>
              Getting from one place to another shouldn&apos;t feel complicated.
              The same goes for sending a parcel or managing deliveries for your
              business.
            </p>
            <p>
              Traveling Partner brings rides, deliveries, and logistics together
              in one app, helping you spend less time switching between services
              and more time getting things done.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
