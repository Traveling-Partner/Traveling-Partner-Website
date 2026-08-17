"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const benefits = [
  "Connect with passengers without paying commission.",
  "Choose when you want to drive.",
  "Keep more of every fare you earn.",
  "Build your ratings with every completed trip.",
  "An app that's easy to use, whether you're driving or booking.",
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

export default function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Blurred city night background — full bleed, no dark card */}
      <div className="absolute inset-0">
        <Image
          src="/images/taxi-stand/benefits-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6 xl:gap-8">
          {/* Left: content */}
          <div className="order-1 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-flex w-fit items-center rounded-full bg-white px-4 py-2"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-black sm:text-[11px]">
                Why Choose Us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mb-3 text-[32px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px]"
            >
              Benefits of{" "}
              <em className="font-medium italic text-[#FCE001]">
                Traveling Partner
              </em>{" "}
              App
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="mb-6 max-w-md text-[14px] leading-snug text-white/85 sm:mb-6 sm:text-[15px]"
            >
              Getting from one place to another shouldn&apos;t be difficult.
              Whether you&apos;re booking a ride or driving one, Traveling
              Partner keeps things simple. Book a ride online, travel with
              verified drivers, or earn more with our zero commission ride app.
            </motion.p>

            <ul className="mb-8 flex w-full max-w-lg flex-col gap-2.5 sm:mb-9 sm:gap-3">
              {benefits.map((text, index) => (
                <motion.li
                  key={text}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.16 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="flex w-full items-center gap-2.5 rounded-full bg-white px-3.5 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:px-4 sm:py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]">
                    <CheckIcon />
                  </span>
                  <span className="text-[13px] leading-snug text-[#0b0b0b] sm:text-[14px]">
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
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fdb813] hover:shadow-[0_12px_30px_rgba(252,224,1,0.35)] sm:px-7 sm:py-4"
              >
                <span className="text-[15px] font-bold text-black sm:text-base">
                  Download the App
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right: car interior image + 0% tag */}
          <div className="order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative w-full max-w-[560px] lg:max-w-none lg:w-full"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] lg:aspect-[5/4] lg:rounded-[32px]"
              >
                <Image
                  src="/images/taxi-stand/drive-earn-interior.png"
                  alt="Driving with Traveling Partner navigation"
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>

              {/* 0% Commission — bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="absolute -bottom-3 right-4 z-20 rounded-2xl bg-white px-5 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:-bottom-4 sm:right-6 sm:px-6 sm:py-3.5"
              >
                <p className="text-[28px] font-black leading-none text-[#FCE001] sm:text-[32px]">
                  0%
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black sm:text-[11px]">
                  Commission
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
