"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  "No additional fees to join or start earning.",
  "Work when it suits you best.",
  "Complete autonomy to decide on fares.",
  "Effortlessly manage your rides through the app.",
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
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-6 xl:gap-8">
            {/* Left: badge + media */}
            <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex w-fit items-center rounded-full bg-[#FCE001] px-4 py-2"
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
                className="relative aspect-[16/11] w-full overflow-hidden rounded-[20px] sm:rounded-[24px]"
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
            <div className="order-1 flex flex-col lg:order-2">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mb-3 text-[32px] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px]"
              >
                Drive with
                <br />
                <em className="font-medium italic text-[#FCE001]">
                  Travelpartner
                </em>{" "}
                &
                <br />
                Earn Money
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="mb-7 text-[16px] font-light italic text-white/90 sm:text-lg"
              >
                Drive and earn on your terms.
              </motion.p>

              <ul className="mb-8 space-y-3.5 sm:mb-10 sm:space-y-4">
                {features.map((text, index) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FCE001]">
                      <CheckIcon />
                    </span>
                    <span className="text-[14px] leading-relaxed text-white sm:text-[15px]">
                      {text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <Link
                  href="https://play.google.com/store/apps?hl=en&gl=US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#FCE001] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fdb813] hover:shadow-[0_12px_30px_rgba(252,224,1,0.35)] sm:px-7 sm:py-4"
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
