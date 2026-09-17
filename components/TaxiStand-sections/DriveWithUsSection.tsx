"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const features = [
  { text: "Keep more with 0% commission", bold: ["0% commission"] as const },
  { text: "Drive whenever it suits your schedule", bold: [] as const },
  { text: "Accept nearby ride requests", bold: [] as const },
  { text: "Payments and trip details in one app", bold: [] as const },
];

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3 text-black"
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

function ArrowIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function DriveWithUsSection() {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Night road background */}
      <div className="absolute inset-0">
        <Image
          src="/images/taxi-stand/drive-earn-bg.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="overflow-hidden rounded-[28px] bg-[#111111] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-[36px] sm:p-7 lg:rounded-[48px] lg:p-10 xl:p-12"
        >
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-12">
            {/* Left: badge + media */}
            <div className="order-2 flex flex-col gap-5 lg:order-1 lg:h-full lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-black sm:text-[11px]">
                  100% Commission Free · For Drivers
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.015 }}
                className="relative aspect-[16/11] w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:aspect-auto lg:min-h-[280px]"
              >
                <Image
                  src="/images/taxi-stand/drive-earn-interior.png"
                  alt="Drive with Traveling Partner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-500"
                  priority
                />
              </motion.div>
            </div>

            {/* Right: content */}
            <div className="order-1 flex w-full flex-col items-stretch text-left lg:order-2">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="m-0 text-[32px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px]"
              >
                Drive with
                <br />
                <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
                  Traveling Partner
                </em>{" "}
                &
                <br />
                Earn Money
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="mt-4 mb-0 w-full text-[14px] leading-relaxed text-white/90 sm:mt-5 sm:text-[15px]"
              >
                {emphasizePhrases(
                  "Looking for a flexible way to earn? Traveling Partner is a zero-commission ride app, so you keep more of what you earn. Drive full-time, part-time, or only when you're free—it's up to you.",
                  ["zero-commission ride app"],
                  "onDark",
                )}
              </motion.p>

              <ul className="mt-5 mb-0 w-full space-y-3.5 sm:mt-6 sm:space-y-4">
                {features.map((item, index) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]">
                      <CheckIcon />
                    </span>
                    <span className="text-[14px] leading-relaxed text-white sm:text-[15px]">
                      {emphasizePhrases(item.text, item.bold, "onDark")}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="mt-8 sm:mt-10"
              >
                <Link
                  href="https://play.google.com/store/apps?hl=en&gl=US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fdb813] hover:shadow-[0_12px_30px_rgba(252,224,1,0.35)] sm:px-7 sm:py-4"
                >
                  <span className="text-[15px] font-bold text-black sm:text-base">
                    Register Now
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
