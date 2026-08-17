"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const highlights = [
  { text: "Need daily deliveries?", bold: [] as const },
  { text: "Extra vehicles during busy periods?", bold: [] as const },
  {
    text: "Support the fleet regularly? We can do that.",
    bold: ["We can do that."] as const,
  },
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

export default function LogisticsFasterSaferSection() {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Night highway background */}
      <div className="absolute inset-0">
        <Image
          src="/images/logistic/faster-safer/bg-road.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
          priority
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[28px] bg-[#1a1a1a] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:rounded-[36px] sm:p-7 lg:rounded-[44px] lg:p-9 xl:p-11"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-8">
            {/* Left: badge + truck */}
            <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 }}
                className="inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black sm:text-[11px]">
                  Benefits 02
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="relative w-full"
              >
                <Image
                  src="/images/logistic/faster-safer/truck.png"
                  alt="Traveling Partner logistics truck — 24/7 service"
                  width={792}
                  height={592}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                  priority
                />
              </motion.div>
            </div>

            {/* Right: content */}
            <div className="order-1 flex flex-col lg:order-2">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="mb-4 font-poppins text-[30px] font-extrabold leading-[1.12] tracking-tight text-white sm:mb-5 sm:text-4xl md:text-[42px] lg:text-[44px] xl:text-[48px]"
              >
                Faster Than You
                <br />
                Think{" "}
                <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
                  Safer
                </em>{" "}
                Than
                <br />
                You Expect.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="mb-6 max-w-lg space-y-2.5 text-[14px] leading-[1.65] text-white/80 sm:mb-7 sm:text-[15px] lg:text-[16px]"
              >
                <p>
                  Logistics that work around your business.
                </p>
                <p>
                  From retail stores and restaurants to wholesalers and growing
                  businesses, Traveling Partner helps you move products quickly
                  and efficiently.
                </p>
                <p>
                  Our aim is simple: help your business do more, while spending
                  less time worrying about logistics.
                </p>
              </motion.div>

              <div
                className="mb-5 border-t border-dashed border-white/20 sm:mb-6"
                aria-hidden="true"
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:mb-4 sm:text-[12px]"
              >
                Service Highlights
              </motion.p>

              <ul className="mb-7 flex flex-col gap-3 sm:mb-8 sm:gap-3.5">
                {highlights.map((item, index) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.22 + index * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]">
                      <CheckIcon />
                    </span>
                    <span className="text-[14px] leading-snug text-white sm:text-[15px]">
                      {emphasizePhrases(item.text, item.bold, "onDark")}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link
                  href="https://play.google.com/store/apps?hl=en&gl=US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-6 py-3.5 shadow-[0_10px_28px_rgba(252,224,1,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fdb813] hover:shadow-[0_14px_34px_rgba(252,224,1,0.38)] sm:px-7 sm:py-4"
                >
                  <span className="text-[15px] font-bold text-black sm:text-base">
                    Transport Cargo
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
