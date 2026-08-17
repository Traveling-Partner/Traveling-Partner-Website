"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/pool-ride/going-same-way";
const SHARED_ICONS = "/images/taxi-stand/need-a-ride";

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

function PeopleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.5" cy="8" r="3.2" fill="#fce001" />
      <path
        d="M2.8 18.2c0-3.1 2.6-5.2 5.7-5.2s5.7 2.1 5.7 5.2v.8H2.8v-.8z"
        fill="#fce001"
      />
      <circle cx="16.2" cy="8" r="2.8" fill="#fdb813" />
      <path
        d="M14.6 12.9c2.9.2 5.2 2.2 5.2 5.3v.8h-4.4v-.8c0-2-.7-3.8-1.9-5.1.4-.1.7-.2 1.1-.2z"
        fill="#fdb813"
      />
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
          ? "flex w-full items-center gap-3.5 rounded-[16px] border border-white/15 bg-[#161310]/92 px-3.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md"
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
        <span className="mt-0.5 block text-[12px] text-white/50 lg:mt-0 lg:text-[12px]">
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
      className={`gsw-float flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-6 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] lg:h-[48px] lg:w-[48px]">
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

export default function GoingSameWaySection() {
  return (
    <section className="bg-[#FEFBF6] py-2 sm:py-4">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[#070604] sm:rounded-[32px]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Mobile/tablet: Figma cover 417×1024 — full width, natural height, no crop */}
          <Image
            src={`${ASSETS}/bg-pool-mobile.png`}
            alt=""
            width={417}
            height={1024}
            sizes="100vw"
            className="absolute bottom-0 left-0 h-auto w-full max-w-none lg:hidden"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          {/* Desktop: phone + van + city — anchored right at natural aspect */}
          <div className="absolute inset-y-0 right-0 hidden aspect-[1024/578] lg:block">
            <Image
              src={`${ASSETS}/bg-van-phone.png`}
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

        <div className="relative flex flex-col lg:min-h-[500px] lg:flex-row lg:items-center lg:gap-5 lg:px-9 lg:py-2 xl:px-10">
          {/* ── Content ── */}
          <div className="relative z-10 w-full px-5 pb-0 pt-3 sm:px-7 lg:w-[44%] lg:shrink-0 lg:px-0 lg:pb-0 lg:pt-0">
            {/* Badge */}
            <div className="mb-1 inline-flex items-center gap-2.5 rounded-full border border-[#fce001]/80 px-4 py-2 lg:mb-2">
              <span className="relative flex h-[7px] w-[7px] items-center justify-center">
                <span className="absolute h-[14px] w-[14px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]/35 blur-[3px]" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#fce001] lg:text-[11px]">
                Going same way?
              </span>
            </div>

            {/* Heading — Figma mobile ~40px */}
            <h2 className="mb-1 font-extrabold leading-[1.08] tracking-tight text-white lg:mb-1">
              <span className="block text-[clamp(36px,9.5vw,42px)] lg:text-[52px]">
                Share it,
              </span>
              <em
                className="my-[3px] inline-block rounded-[8px] border border-[#fce001]/50 px-2.5 pb-0.5 text-[clamp(36px,9.5vw,42px)] bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent lg:my-[4px] lg:px-3 lg:text-[52px]"
                style={{ fontStyle: "italic" }}
              >
                save it,
              </em>
              <span className="block text-[clamp(36px,9.5vw,42px)] lg:text-[52px]">
                smile.
              </span>
            </h2>

            {/* Description — Figma mobile is near-white */}
            <div className="mb-2 max-w-[420px] space-y-0.5 text-[15px] leading-[1.35] text-white/85 lg:mb-2 lg:text-base lg:leading-[1.4] lg:text-[#b7b1a4]">
              <p>A smarter way to travel starts here.</p>
              <p>
                Traveling Partner is your partner in booking a ride, sharing
                your commute, sending a parcel, or planning your next trip. Get
                there with less fuss and more value.
              </p>
              <p>
                Built into every journey, it&apos;s fair pricing, verified
                drivers, and real-time tracking from start to finish.
              </p>
              <p>Download the app today and travel the way you want.</p>
            </div>

            {/* Store buttons — side-by-side (Figma) */}
            <div className="mb-2 grid grid-cols-2 gap-2.5 lg:mb-2 lg:flex lg:gap-4">
              <StoreButton
                href={PLAY_STORE_URL}
                label="Get it on"
                title="Google Play"
                icon={<PlayStoreIcon className="h-[20px] w-[20px] lg:h-[22px] lg:w-[22px]" />}
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

            {/* Stats — mobile: 3 full-width boxes; desktop: single card */}
            <div className="flex w-full flex-col gap-2.5 lg:hidden">
              <StatItem
                boxed
                icon={
                  <Image
                    src={`${SHARED_ICONS}/icon-star.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="4.8★"
                label="Rating"
              />
              <StatItem
                boxed
                icon={<PeopleIcon className="h-[22px] w-[22px]" />}
                value="30K+"
                label="Shared Trips"
              />
              <StatItem
                boxed
                icon={
                  <span className="text-[13px] font-extrabold text-[#fce001]">
                    Rs
                  </span>
                }
                value="Up to 60%"
                label="Fare Savings"
              />
            </div>
            <div className="hidden w-full rounded-[16px] border border-white/10 bg-[#171410]/85 px-5 py-3 backdrop-blur-sm lg:inline-flex lg:w-auto lg:max-w-[540px] lg:flex-row lg:items-center">
              <StatItem
                icon={
                  <Image
                    src={`${SHARED_ICONS}/icon-star.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="4.8★"
                label="Rating"
              />
              <span
                className="mx-5 block h-8 w-px bg-white/12"
                aria-hidden="true"
              />
              <StatItem
                icon={<PeopleIcon className="h-[22px] w-[22px]" />}
                value="30K+"
                label="Shared Trips"
              />
              <span
                className="mx-5 block h-8 w-px bg-white/12"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <span className="text-[13px] font-extrabold text-[#fce001]">
                    Rs
                  </span>
                }
                value="Up to 60%"
                label="Fare Savings"
              />
            </div>
          </div>

          {/* ── Visual: cover bg on mobile (phone+van baked in) + chips ── */}
          <div className="relative z-10 mt-1 flex w-full items-center justify-center px-2 pb-3 lg:mt-0 lg:min-h-[240px] lg:flex-1 lg:px-0 lg:pb-0">
            {/* Dashed connector arc (desktop) */}
            <svg
              className="pointer-events-none absolute right-[calc(12%-4px)] top-[2%] hidden h-[64%] w-[52%] lg:block"
              viewBox="0 0 340 400"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 62 26 C 120 -2, 175 25, 188 75 C 205 140, 200 185, 185 225 C 168 270, 130 320, 78 372"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
              />
            </svg>

            {/* Mobile spacer — cover already includes phone + van; keep room for chips */}
            <div
              className="relative min-h-[220px] w-full sm:min-h-[280px] lg:hidden"
              aria-hidden="true"
            />

            {/* Floating chips */}
            <FloatChip
              className="absolute right-1 top-[18%] sm:right-[4%] lg:right-[1%] lg:top-[8%]"
              title="Split Fare"
              subtitle="Save up to 60%"
              icon={
                <Image
                  src={`${ASSETS}/icon-split-fare.png`}
                  alt=""
                  width={30}
                  height={30}
                  className="h-[26px] w-[26px] object-contain lg:h-[30px] lg:w-[30px]"
                />
              }
            />
            <FloatChip
              className="absolute bottom-[28%] right-1 sm:right-[4%] lg:bottom-auto lg:right-[1%] lg:top-[48%]"
              title="Same Route"
              subtitle="Instant Match"
              delay="1.4s"
              icon={
                <Image
                  src={`${ASSETS}/icon-same-route.png`}
                  alt=""
                  width={30}
                  height={30}
                  className="h-[26px] w-[26px] object-contain lg:h-[30px] lg:w-[30px]"
                />
              }
            />
          </div>
        </div>
      </div>
      </div>

      <style jsx global>{`
        @keyframes gsw-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .gsw-float {
          animation: gsw-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gsw-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
