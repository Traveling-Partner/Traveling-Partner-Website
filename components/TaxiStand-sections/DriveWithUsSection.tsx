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

function FeatureList({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? "mb-7 w-full space-y-3"
          : "mb-8 w-full space-y-3.5 sm:mb-10 sm:space-y-4"
      }
    >
      {features.map((text, index) => (
        <motion.li
          key={text}
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 + index * 0.06 }}
          className="flex items-start gap-2.5 sm:gap-3"
        >
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FCE001]">
            <CheckIcon />
          </span>
          <span
            className={`leading-relaxed text-white ${
              compact
                ? "text-[13px] max-[360px]:text-[12px]"
                : "text-[14px] sm:text-[15px]"
            }`}
          >
            {text}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function RegisterCta({
  className = "",
  fullWidth = false,
}: {
  className?: string;
  /** Full-width only when explicitly requested (phone mobile layout) */
  fullWidth?: boolean;
}) {
  return (
    <Link
      href="https://play.google.com/store/apps?hl=en&gl=US"
      target="_blank"
      rel="noopener noreferrer"
      className={`group items-center gap-3 rounded-full bg-gradient-to-r from-[#FCE001] to-[#FDB813] px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(252,224,1,0.35)] sm:px-7 sm:py-4 ${
        fullWidth
          ? "flex w-full justify-center"
          : "inline-flex w-fit max-w-fit shrink-0 self-start"
      } ${className}`}
    >
      <span className="text-[14px] font-bold text-black sm:text-base">
        Register Now
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowIcon />
      </span>
    </Link>
  );
}

export default function DriveWithUsSection() {
  return (
    <section className="relative w-full overflow-hidden py-10 sm:py-14 lg:py-20">
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

      <div className="relative z-10 mx-auto max-w-7xl lg:px-8">
        {/* ── Mobile / tablet portrait — 100% Figma replica ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-3 overflow-hidden rounded-[28px] bg-[#121212] px-4 pb-7 pt-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] max-[360px]:mx-2.5 max-[360px]:rounded-[24px] max-[360px]:px-3.5 max-[360px]:pb-6 max-[360px]:pt-4 sm:mx-6 sm:rounded-[32px] sm:px-6 sm:pb-9 sm:pt-6 md:mx-8 lg:hidden"
        >
          {/* Soft yellow glow behind content */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 45% at 20% 62%, rgba(252,224,1,0.14), transparent 70%)",
            }}
          />

          <div className="relative z-10 flex w-full flex-col">
            {/* Badge — centered */}
            <div className="mb-4 flex justify-center sm:mb-5">
              <div className="inline-flex max-w-full items-center rounded-full bg-[#FCE001] px-3.5 py-2 max-[360px]:px-3 max-[360px]:py-1.5">
                <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em] text-black max-[360px]:text-[8px] sm:text-[11px] sm:tracking-[0.12em]">
                  100% Commission Free · For Drivers
                </span>
              </div>
            </div>

            {/* Interior image */}
            <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-[18px] max-[360px]:mb-4 max-[360px]:rounded-[16px] sm:mb-6 sm:rounded-[22px]">
              <Image
                src="/images/taxi-stand/drive-earn-interior.png"
                alt="Drive with Traveling Partner"
                fill
                sizes="(max-width: 1024px) 100vw, 0px"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Heading */}
            <h2 className="mb-2 text-left text-[clamp(28px,8.2vw,40px)] font-extrabold leading-[1.1] tracking-tight text-white">
              Drive with
              <br />
              <em className="font-medium italic text-[#FCE001]">Travelpartner</em>{" "}
              <span className="text-white">&</span>
              <br />
              Earn Money
            </h2>

            <p className="mb-5 text-left text-[clamp(14px,3.8vw,17px)] font-light italic text-white/90 sm:mb-6">
              Drive and earn on your terms.
            </p>

            <FeatureList compact />

            {/* Full-width CTA — phones only (<640px) */}
            <div className="w-full max-sm:block sm:hidden">
              <RegisterCta fullWidth />
            </div>
            {/* Compact CTA — larger phones / tablets in this layout */}
            <div className="hidden sm:block lg:hidden">
              <RegisterCta />
            </div>
          </div>
        </motion.div>

        {/* ── Desktop — two-column layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hidden overflow-hidden rounded-[48px] bg-[#111111] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:block xl:p-12"
        >
          <div className="grid grid-cols-2 items-center gap-12 xl:gap-16">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center rounded-full bg-[#FCE001] px-4 py-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-black">
                  100% Commission Free · For Drivers
                </span>
              </div>

              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[24px]">
                <Image
                  src="/images/taxi-stand/drive-earn-interior.png"
                  alt="Drive with Traveling Partner"
                  fill
                  sizes="50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <h2 className="mb-3 w-full text-[48px] font-extrabold leading-[1.12] tracking-tight text-white xl:text-[52px]">
                Drive with
                <br />
                <em className="font-medium italic text-[#FCE001]">
                  Travelpartner
                </em>{" "}
                &
                <br />
                Earn Money
              </h2>

              <p className="mb-7 text-lg font-light italic text-white/90">
                Drive and earn on your terms.
              </p>

              <FeatureList />

              <RegisterCta />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
