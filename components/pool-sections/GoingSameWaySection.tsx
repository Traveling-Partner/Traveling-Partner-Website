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
      <circle cx="8.5" cy="8" r="3.2" fill="#8fa3bf" />
      <path
        d="M2.8 18.2c0-3.1 2.6-5.2 5.7-5.2s5.7 2.1 5.7 5.2v.8H2.8v-.8z"
        fill="#8fa3bf"
      />
      <circle cx="16.2" cy="8" r="2.8" fill="#6f83a0" />
      <path
        d="M14.6 12.9c2.9.2 5.2 2.2 5.2 5.3v.8h-4.4v-.8c0-2-.7-3.8-1.9-5.1.4-.1.7-.2 1.1-.2z"
        fill="#6f83a0"
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
      className="group inline-flex h-[54px] items-center gap-3 rounded-full pl-2 pr-6 shadow-[0_10px_28px_rgba(252,224,1,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(252,224,1,0.4)] sm:h-[58px]"
      style={{
        background: "linear-gradient(90deg, #FCE001 0%, #FDB813 100%)",
      }}
    >
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 sm:h-[42px] sm:w-[42px]">
        {icon}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[9px] font-bold uppercase tracking-[0.18em] text-black/70 sm:text-[10px]">
          {label}
        </span>
        <span className="block text-[15px] font-bold text-black sm:text-[16px]">
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
    <div className="flex items-center gap-2.5">
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] border border-[#fce001]/40 bg-[#fce001]/12 sm:h-[36px] sm:w-[36px]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[14px] font-bold text-white sm:text-[15px]">
          {value}
        </span>
        <span className="block text-[11px] text-white/55 sm:text-[12px]">
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
      className={`gsw-float flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#fce001] sm:h-[48px] sm:w-[48px]">
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold text-[#0b0b0b] sm:text-[16px]">
          {title}
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5a81c] sm:text-[11px]">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function GoingSameWaySection() {
  return (
    <section className="bg-[#FEFBF6] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] bg-[#070604] sm:rounded-[32px]">
        {/* Background: phone + van + city skyline (desktop) */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden="true"
        >
          <Image
            src={`${ASSETS}/bg-van-phone.png`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[68%_30%]"
            priority
          />
          {/* Left fade so text sits on near-black */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #070604 0%, rgba(7,6,4,0.96) 26%, rgba(7,6,4,0.55) 44%, rgba(7,6,4,0) 62%)",
            }}
          />
          {/* Top + bottom subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,6,4,0.55) 0%, rgba(7,6,4,0) 22%, rgba(7,6,4,0) 82%, rgba(7,6,4,0.45) 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-col px-5 pb-6 pt-6 sm:px-7 lg:flex-row lg:items-center lg:gap-6 lg:px-9 lg:py-7 xl:px-10">
          {/* ── Left content ── */}
          <div className="relative z-10 w-full max-w-[560px] lg:w-[44%] lg:shrink-0">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#fce001]/80 px-4 py-2 sm:mb-8">
              <span className="relative flex h-[7px] w-[7px] items-center justify-center">
                <span className="absolute h-[14px] w-[14px] rounded-full bg-[#fce001]/35 blur-[3px]" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-[#fce001]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#fce001] sm:text-[11px]">
                Going same way?
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-5 font-extrabold leading-[1.1] tracking-tight text-white sm:mb-6">
              <span className="block text-[32px] sm:text-4xl md:text-5xl lg:text-[52px]">
                Share it,
              </span>
              <em
                className="my-[4px] inline-block rounded-[8px] border border-[#fce001]/45 px-2.5 pb-0.5 text-[32px] font-medium italic text-[#fce001] sm:px-3 sm:text-4xl md:text-5xl lg:text-[52px]"
                style={{ fontStyle: "italic" }}
              >
                save it,
              </em>
              <span className="block text-[32px] sm:text-4xl md:text-5xl lg:text-[52px]">
                smile.
              </span>
            </h2>

            {/* Description */}
            <p className="mb-6 max-w-[420px] text-[14px] leading-[1.7] text-[#b7b1a4] sm:text-[15px] lg:text-base">
              Find riders headed your direction, split the fare, and turn your
              daily commute into a chance to save money and make new friends.
              Zero commission, verified partners.
            </p>

            {/* Store buttons */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <StoreButton
                href={PLAY_STORE_URL}
                label="Get it on"
                title="Google Play"
                icon={<PlayStoreIcon className="h-[22px] w-[22px]" />}
              />
              <StoreButton
                href={APP_STORE_URL}
                label="Download on"
                title="App Store"
                icon={<AppleIcon className="h-[24px] w-[24px] text-black" />}
              />
            </div>

            {/* Stats bar */}
            <div className="inline-flex w-full max-w-[540px] flex-col gap-3 rounded-[16px] border border-white/10 bg-[#171410]/80 px-4 py-2.5 backdrop-blur-sm sm:w-auto sm:flex-row sm:items-center sm:gap-0 sm:px-5 sm:py-3">
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
                className="mx-5 hidden h-8 w-px bg-white/12 sm:block"
                aria-hidden="true"
              />
              <StatItem
                icon={<PeopleIcon className="h-[22px] w-[22px]" />}
                value="30K+"
                label="Shared Trips"
              />
              <span
                className="mx-5 hidden h-8 w-px bg-white/12 sm:block"
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

          {/* ── Right visual: composite on mobile, chips over background on desktop ── */}
          <div className="relative z-10 mt-8 flex w-full items-center justify-center lg:mt-0 lg:min-h-[370px] lg:flex-1">
            {/* Dashed connector arc (desktop) — single C-arc hugging the chips' left side, as in Figma */}
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

            {/* Composite image inline (mobile / tablet only — on desktop it is the card background) */}
            <div className="relative aspect-[1024/578] w-full max-w-[560px] overflow-hidden rounded-[16px] lg:hidden">
              <Image
                src={`${ASSETS}/bg-van-phone.png`}
                alt="Traveling Partner pool ride app with location screen and van"
                fill
                sizes="(max-width: 640px) 92vw, 560px"
                className="object-cover"
              />
            </div>

            {/* Floating chips */}
            <FloatChip
              className="absolute right-0 top-[4%] sm:right-[2%] sm:top-[6%] lg:right-[1%] lg:top-[10%]"
              title="Split Fare"
              subtitle="Save up to 60%"
              icon={
                <span className="text-[17px] font-extrabold text-black">Rs</span>
              }
            />
            <FloatChip
              className="absolute bottom-[8%] right-0 sm:right-[2%] lg:bottom-auto lg:right-[1%] lg:top-[36%]"
              title="Same Route"
              subtitle="Instant Match"
              delay="1.4s"
              icon={
                <Image
                  src={`${ASSETS}/icon-route.png`}
                  alt=""
                  width={24}
                  height={24}
                  className="h-[24px] w-[24px] object-contain"
                />
              }
            />
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
