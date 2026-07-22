"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/logistic/move-bulk-cargo";

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
      className="group inline-flex h-[54px] w-full min-w-0 items-center gap-2 rounded-full pl-1.5 pr-3 shadow-[0_10px_28px_rgba(252,224,1,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(252,224,1,0.4)] sm:gap-3 sm:pl-2 sm:pr-5 lg:h-[58px] lg:w-auto lg:pr-6"
      style={{
        background: "linear-gradient(90deg, #FCE001 0%, #FDB813 100%)",
      }}
    >
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 lg:h-[42px] lg:w-[42px]">
        {icon}
      </span>
      <span className="min-w-0 text-left leading-tight">
        <span className="block text-[8px] font-bold uppercase tracking-[0.16em] text-black/70 lg:text-[10px] lg:tracking-[0.18em]">
          {label}
        </span>
        <span className="block truncate text-[14px] font-bold text-black lg:text-[16px]">
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
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3.5 px-1 py-3.5 lg:gap-2.5 lg:px-0 lg:py-0">
      {/* Same as Ready to Send — soft yellow tiles with border */}
      <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] border border-[#fce001]/50 bg-[#fce001]/30 lg:h-[36px] lg:w-[36px] lg:rounded-[10px] lg:border-[#fce001]/40 lg:bg-[#fce001]/25">
        {icon}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[17px] font-bold tracking-tight text-[#0b0b0b] lg:text-[15px]">
          {value}
        </span>
        <span className="mt-0.5 block text-[12px] text-[#6f6e68] lg:mt-0">
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
      className={`mbc-float flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_16px_40px_rgba(0,0,0,0.18)] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-6 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#fce001] lg:h-[48px] lg:w-[48px]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-bold text-[#0b0b0b] lg:text-[16px]">
          {title}
        </span>
        <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#f5a81c] lg:text-[11px] lg:tracking-[0.18em]">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function MoveBulkCargoSection() {
  return (
    <section className="bg-[#FEFBF6] px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/*
        Mobile: same pattern as Ready to Send / Need a Ride / Going Same Way.
        Cover in flow = full natural height (no crop). Content overlays cream top.
      */}
      <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] bg-[#FFF8E6] max-lg:max-w-[420px] sm:rounded-[32px]">
        {/* Mobile cover IN FLOW — 360×1024, full width, no crop */}
        <Image
          src={`${ASSETS}/bg-logistic-mobile.png`}
          alt=""
          width={360}
          height={1024}
          sizes="420px"
          className="pointer-events-none relative z-0 block h-auto w-full scale-[1.03] select-none lg:hidden"
          style={{ width: "100%", height: "auto" }}
          priority
        />

        {/* Desktop background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 right-0 aspect-[1024/662]">
            <Image
              src={`${ASSETS}/bg-phone-map-rounded.png`}
              alt=""
              fill
              sizes="(max-width: 1280px) 60vw, 700px"
              className="object-contain object-right"
              priority
            />
          </div>
        </div>

        {/* Content overlays cover on mobile; side-by-side on desktop */}
        <div className="absolute inset-0 z-10 flex flex-col lg:relative lg:inset-auto lg:flex-row lg:items-center lg:gap-6 lg:px-9 lg:py-7 xl:px-10">
          <div className="relative z-20 w-full shrink-0 px-5 pt-16 sm:px-6 lg:w-[44%] lg:px-0 lg:pb-0 lg:pt-0">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-[#0b0b0b] px-4 py-2 lg:mb-8">
              <span className="relative flex h-[7px] w-[7px] items-center justify-center">
                <span className="absolute h-[14px] w-[14px] rounded-full bg-[#fce001]/35 blur-[3px]" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-[#fce001]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#fce001] lg:text-[11px]">
                Move bulk cargo?
              </span>
            </div>

            <h2 className="mb-4 font-extrabold leading-[1.08] tracking-tight text-[#0b0b0b] lg:mb-6">
              <span className="block text-[clamp(34px,8.5vw,42px)] lg:text-[52px]">
                Load it,
              </span>
              <em
                className="my-[3px] inline-block rounded-[8px] border-b-[4px] border-r-[4px] border-black bg-[#fce001] px-2.5 pb-0.5 text-[clamp(34px,8.5vw,42px)] font-medium italic text-[#0b0b0b] lg:my-[4px] lg:px-3 lg:text-[52px]"
                style={{ fontStyle: "italic" }}
              >
                move it,
              </em>
              <span className="block text-[clamp(34px,8.5vw,42px)] lg:text-[52px]">
                delivered.
              </span>
            </h2>

            <p className="mb-5 max-w-[440px] text-[14px] leading-[1.6] text-[#4a4a45] lg:mb-6 lg:text-base lg:leading-[1.65]">
              From single pallets to full container loads — Traveling Partner
              handles enterprise logistics across Pakistan with fleet-scale
              capacity and bulk-rate pricing built for business.
            </p>

            <div className="mb-5 grid grid-cols-2 gap-2.5 lg:mb-7 lg:flex lg:gap-4">
              <StoreButton
                href={PLAY_STORE_URL}
                label="Get it on"
                title="Google Play"
                icon={
                  <PlayStoreIcon className="h-[20px] w-[20px] lg:h-[22px] lg:w-[22px]" />
                }
              />
              <StoreButton
                href={APP_STORE_URL}
                label="Download on"
                title="App Store"
                icon={
                  <AppleIcon className="h-[22px] w-[22px] text-black lg:h-[24px] lg:w-[24px]" />
                }
              />
            </div>

            {/* Stats — same white card + border as Ready to Send */}
            <div className="relative z-20 h-auto w-full shrink-0 rounded-[20px] border border-black/10 bg-white px-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.10)] lg:inline-flex lg:w-auto lg:max-w-[540px] lg:flex-row lg:items-center lg:rounded-[16px] lg:border-black/8 lg:px-5 lg:py-3">
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-truck.png`}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                }
                value="200+"
                label="Business Clients"
              />
              <span
                className="mx-1 block h-px bg-black/8 lg:mx-5 lg:h-8 lg:w-px lg:bg-black/10"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-box.png`}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                }
                value="10K+"
                label="Tons Delivered"
              />
              <span
                className="mx-1 block h-px bg-black/8 lg:mx-5 lg:h-8 lg:w-px lg:bg-black/10"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-globe.png`}
                    alt=""
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />
                }
                value="Nationwide"
                label="Coverage"
              />
            </div>
          </div>

          {/* Chips over lower cover (map / phone zone) */}
          <div className="relative z-10 mt-auto min-h-0 w-full flex-1 px-2 pb-6 lg:mt-0 lg:min-h-[370px] lg:flex-1 lg:px-0 lg:pb-0">
            <FloatChip
              className="absolute right-1 top-[24%] sm:right-[2%] lg:-right-1 lg:top-[22%]"
              title="Live GPS"
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
              className="absolute bottom-[42%] right-1 sm:right-[2%] lg:bottom-auto lg:-right-1 lg:top-[48%]"
              title="No Fees"
              subtitle="Direct deal"
              delay="1.4s"
              icon={
                <Image
                  src={`${ASSETS}/icon-no-fee.png`}
                  alt=""
                  width={26}
                  height={26}
                  className="h-[26px] w-[26px] object-contain lg:h-[30px] lg:w-[30px]"
                />
              }
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes mbc-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .mbc-float {
          animation: mbc-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .mbc-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
