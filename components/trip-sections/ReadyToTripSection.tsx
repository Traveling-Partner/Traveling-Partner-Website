"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/trip/ready-to-trip";

function PlayStoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.6 2.2c-.3.2-.5.5-.5.9v17.8c0 .4.2.7.5.9l9.3-9.8L3.6 2.2z"
        fill="#00D7FF"
      />
      <path
        d="M13.2 12.2l2.4 2.5 3.8-2.2c.7-.4.7-1.1 0-1.5l-3.8-2.2-2.4 2.5.1.9-.1.5z"
        fill="#FFD400"
      />
      <path
        d="M13.2 11.8L3.6 2.2c.2-.1.4-.2.7-.1l11.3 6.5-2.4 2.2z"
        fill="#FF3A44"
      />
      <path
        d="M13.2 12.2l2.4 2.5L4.3 21.9c-.3.1-.5 0-.7-.1l9.6-9.6z"
        fill="#00F076"
      />
    </svg>
  );
}

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.24.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function StoreButton({
  href,
  label,
  title,
  icon,
}: {
  href: string;
  label: string;
  title: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-[46px] w-full min-w-0 items-center gap-2 rounded-full pl-1.5 pr-3 shadow-[0_10px_28px_rgba(252,224,1,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(252,224,1,0.4)] sm:gap-2.5 sm:pl-1.5 sm:pr-4 lg:h-[48px] lg:w-auto lg:pr-5"
      style={{
        background: "linear-gradient(90deg, #FCE001 0%, #FDB813 100%)",
      }}
    >
      <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 lg:h-[34px] lg:w-[34px]">
        {icon}
      </span>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[7px] font-bold uppercase tracking-[0.14em] text-black/70 lg:text-[8px] lg:tracking-[0.16em]">
          {label}
        </span>
        <span className="block truncate text-[12px] font-bold text-black lg:text-[13px]">
          {title}
        </span>
      </span>
    </Link>
  );
}

function StatItem({
  icon,
  value,
  label,
  boxed = false,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  boxed?: boolean;
}) {
  return (
    <div
      className={
        boxed
          ? "flex w-full items-center gap-3 rounded-[16px] border border-white/15 bg-[#161310]/92 px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
          : "flex items-center gap-3.5 px-1 py-3.5 lg:gap-2.5 lg:px-0 lg:py-0"
      }
    >
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] border border-white/10 bg-[#0c0b09] lg:h-[36px] lg:w-[36px] lg:rounded-[10px] lg:border-[#fce001]/25 lg:bg-[#fce001]/12">
        {icon}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[17px] font-bold tracking-tight text-white lg:text-[15px]">
          {value}
        </span>
        <span className="mt-0.5 block text-[12px] text-white/50 lg:mt-0">
          {label}
        </span>
      </span>
    </div>
  );
}

function FloatChip({
  icon,
  title,
  subtitle,
  className = "",
  delay = "0s",
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`rtt-float flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-6 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] lg:h-[40px] lg:w-[40px]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-bold text-[#0b0b0b] lg:text-[14px]">
          {title}
        </span>
        <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-[#f5a81c] lg:text-[9px] lg:tracking-[0.16em]">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function ReadyToTripSection() {
  return (
    <section className="bg-[#FEFBF6] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/*
        Mobile: card height = full cover so image never crops.
        Content overlays the black top; phone/car stay below the stats.
      */}
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[24px] bg-[#070604] max-lg:max-w-[400px] sm:rounded-[28px]">
        {/* Mobile cover IN FLOW — defines card height */}
        <Image
          src={`${ASSETS}/bg-trip-mobile.png`}
          alt=""
          width={299}
          height={1024}
          sizes="400px"
          className="pointer-events-none relative z-0 block h-auto w-full select-none lg:hidden"
          style={{ width: "100%", height: "auto" }}
          priority
        />

        {/* Desktop background — unchanged */}
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 right-0 aspect-[1024/579]">
            <Image
              src={`${ASSETS}/bg-phone-car.png`}
              alt=""
              fill
              sizes="(max-width: 1280px) 60vw, 700px"
              className="object-contain object-right"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #070604 0%, rgba(7,6,4,0.85) 12%, rgba(7,6,4,0) 34%)",
              }}
            />
          </div>
        </div>

        {/* Content: overlays cover on mobile; normal flow on desktop */}
        <div className="absolute inset-0 z-10 flex flex-col lg:relative lg:inset-auto lg:flex-row lg:items-center lg:gap-5 lg:px-10 lg:py-7 xl:px-12">
          <div className="relative z-20 w-full shrink-0 px-6 pt-8 sm:px-8 lg:w-[44%] lg:px-0 lg:pb-0 lg:pt-0">
            <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#fce001]/80 px-3.5 py-1.5 lg:mb-4">
              <span className="relative flex h-[6px] w-[6px] items-center justify-center">
                <span className="absolute h-[12px] w-[12px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]/35 blur-[3px]" />
                <span className="relative h-[6px] w-[6px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#fce001] lg:text-[10px]">
                Ready to Explore?
              </span>
            </div>

            <h2 className="mb-3 font-extrabold leading-[1.08] tracking-tight text-white lg:mb-3.5">
              <span className="block text-[clamp(28px,7vw,34px)] lg:text-[40px]">
                Plan it.
              </span>
              <em
                className="my-[2px] inline-block rounded-[7px] border border-[#fce001]/50 px-2 pb-0.5 text-[clamp(28px,7vw,34px)] bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent lg:my-[3px] lg:px-2.5 lg:text-[40px]"
                style={{ fontStyle: "italic" }}
              >
                Travel it.
              </em>
              <span className="block text-[clamp(28px,7vw,34px)] lg:text-[40px]">
                Enjoy it.
              </span>
            </h2>

            <p className="mb-4 max-w-[400px] space-y-2 text-[13px] leading-[1.55] text-white/85 lg:mb-4 lg:text-[14px] lg:leading-[1.6] lg:text-[#b7b1a4]">
              <span className="block">
                Whether you&apos;re travelling with family, planning a group
                tour, visiting the northern areas, or taking a short break from
                the city, Traveling Partner helps you arrange tourism travel in
                Pakistan without the usual transport hassle.
              </span>
              <span className="block">
                Choose your destination, book a verified travel driver, and plan
                your journey around your own schedule.
              </span>
              <span className="block">
                Travel Pakistan your way with Traveling Partner.
              </span>
            </p>

            <div className="mb-4 grid grid-cols-2 gap-2 lg:mb-4 lg:flex lg:gap-3">
              <StoreButton
                href={PLAY_STORE_URL}
                label="Get it on"
                title="Google Play"
                icon={
                  <PlayStoreIcon className="h-[16px] w-[16px] lg:h-[18px] lg:w-[18px]" />
                }
              />
              <StoreButton
                href={APP_STORE_URL}
                label="Download on"
                title="App Store"
                icon={
                  <AppleIcon className="h-[18px] w-[18px] text-black lg:h-[20px] lg:w-[20px]" />
                }
              />
            </div>

            {/* Stats — mobile: 3 boxes in black top only; desktop: single card */}
            <div className="relative z-20 flex w-full shrink-0 flex-col gap-2 lg:hidden">
              <StatItem
                boxed
                icon={
                  <Image
                    src={`${ASSETS}/icon-star.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                }
                value="4.8+"
                label="Rating"
              />
              <StatItem
                boxed
                icon={
                  <Image
                    src={`${ASSETS}/icon-map.png`}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                }
                value="50K+"
                label="Trips Completed"
              />
              <StatItem
                boxed
                icon={
                  <Image
                    src={`${ASSETS}/icon-clock.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                }
                value="24/7"
                label="Support"
              />
            </div>
            <div className="relative z-20 hidden h-auto w-full shrink-0 rounded-[14px] border border-white/10 bg-[#171410]/85 px-4 py-2.5 backdrop-blur-sm lg:inline-flex lg:w-auto lg:max-w-[500px] lg:flex-row lg:items-center">
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-star.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                }
                value="4.8+"
                label="Rating"
              />
              <span
                className="mx-5 block h-8 w-px bg-white/12"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-map.png`}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                }
                value="50K+"
                label="Trips Completed"
              />
              <span
                className="mx-5 block h-8 w-px bg-white/12"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-clock.png`}
                    alt=""
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain"
                  />
                }
                value="24/7"
                label="Support"
              />
            </div>
          </div>

          {/* Chips over lower cover (phone / car zone) */}
          <div className="relative z-10 mt-auto min-h-0 w-full flex-1 px-2 pb-7 lg:mt-0 lg:min-h-[300px] lg:flex-1 lg:px-0 lg:pb-0">
            <svg
              className="pointer-events-none absolute right-[calc(12%-4px)] top-[2%] hidden h-[70%] w-[52%] lg:block"
              viewBox="0 0 340 420"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 62 26 C 120 -2, 175 25, 188 75 C 205 140, 200 185, 185 225 C 168 270, 145 310, 120 360 C 105 385, 90 400, 78 412"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
              />
            </svg>

            {/* Mobile: equal-gap stack; desktop: absolute positions */}
            <div className="absolute right-1 top-[22%] flex flex-col gap-3 sm:right-[2%] lg:contents">
              <FloatChip
                className="relative lg:absolute lg:right-[1%] lg:top-[6%]"
                title="Live Tracking"
                subtitle="Track now"
                icon={
                  <Image
                    src={`${ASSETS}/icon-live-gps.png`}
                    alt=""
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] object-contain lg:h-[30px] lg:w-[30px]"
                  />
                }
              />
              <FloatChip
                className="relative lg:absolute lg:right-[1%] lg:top-[28%]"
                title="Safe & Secure"
                subtitle="Your safety"
                delay="0.8s"
                icon={
                  <Image
                    src={`${ASSETS}/icon-safe-shield.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain lg:h-[28px] lg:w-[28px]"
                  />
                }
              />
              <FloatChip
                className="relative lg:absolute lg:right-[1%] lg:top-[50%]"
                title="On-Time Trips"
                subtitle="Always"
                delay="1.6s"
                icon={
                  <Image
                    src={`${ASSETS}/icon-on-time.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain lg:h-[28px] lg:w-[28px]"
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes rtt-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .rtt-float {
          animation: rtt-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rtt-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
