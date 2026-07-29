"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/taxi-stand/need-a-ride";

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
      className={`nar-float flex w-[152px] items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:w-[168px] lg:w-[196px] lg:gap-3 lg:py-2 lg:pl-2 lg:pr-4 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#fce001] lg:h-[48px] lg:w-[48px]">
        {icon}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[14px] font-bold text-[#0b0b0b] lg:text-[16px]">
          {title}
        </span>
        <span className="block truncate text-[9px] font-bold uppercase tracking-[0.16em] text-[#f5a81c] lg:text-[11px] lg:tracking-[0.18em]">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function NeedARideSection() {
  return (
    <section className="bg-[#FEFBF6] py-8 sm:py-12">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[#070604] sm:rounded-[32px]">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Mobile/tablet: Figma cover 442×1024 — full width, natural height, no crop */}
          <Image
            src={`${ASSETS}/bg-taxi-city-mobile.png`}
            alt=""
            width={442}
            height={1024}
            sizes="100vw"
            className="absolute bottom-0 left-0 h-auto w-full max-w-none lg:hidden"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          {/* Desktop: landscape city/taxi */}
          <Image
            src={`${ASSETS}/bg-taxi-city.png`}
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover object-[center_38%] opacity-90 lg:block"
            priority
          />
          {/* Desktop fades only — mobile art already includes black top */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, #070604 0%, rgba(7,6,4,0.96) 26%, rgba(7,6,4,0.55) 44%, rgba(7,6,4,0) 62%)",
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,6,4,0.55) 0%, rgba(7,6,4,0) 22%, rgba(7,6,4,0) 82%, rgba(7,6,4,0.45) 100%)",
            }}
          />
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-6 lg:px-9 lg:py-7 xl:px-10">
          {/* ── Content ── */}
          <div className="relative z-10 w-full px-5 pb-2 pt-8 sm:px-7 lg:w-[44%] lg:shrink-0 lg:px-0 lg:pb-0 lg:pt-0">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#fce001]/80 px-4 py-2 lg:mb-8">
              <span className="relative flex h-[7px] w-[7px] items-center justify-center">
                <span className="absolute h-[14px] w-[14px] rounded-full bg-[#fce001]/35 blur-[3px]" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-[#fce001]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#fce001] lg:text-[11px]">
                Need a ride?
              </span>
            </div>

            {/* Heading — Figma mobile ~40px */}
            <h2 className="mb-5 font-extrabold leading-[1.08] tracking-tight text-white lg:mb-6">
              <span className="block text-[clamp(36px,9.5vw,42px)] lg:text-[52px]">
                Tap it,
              </span>
              <em
                className="my-[3px] inline-block rounded-[8px] border border-[#fce001]/50 px-2.5 pb-0.5 text-[clamp(36px,9.5vw,42px)] font-medium italic text-[#fce001] lg:my-[4px] lg:px-3 lg:text-[52px]"
                style={{ fontStyle: "italic" }}
              >
                ride it,
              </em>
              <span className="block text-[clamp(36px,9.5vw,42px)] lg:text-[52px]">
                arrive.
              </span>
            </h2>

            {/* Description — Figma mobile is near-white */}
            <div className="mb-7 max-w-[420px] space-y-3 text-[15px] leading-[1.65] text-white/85 lg:mb-6 lg:text-base lg:text-[#b7b1a4]">
              <p>
                {emphasizePhrases(
                  "Going somewhere? Open the app, choose your destination, and you're ready to go. You'll see the fare before the ride starts, know who's picking you up, and follow your trip with real-time GPS tracking.",
                  ["real-time GPS tracking"],
                  "onDark",
                )}
              </p>
              <p>
                {emphasizePhrases(
                  "Whether it's your daily commute or an airport transfer service, getting there shouldn't take more effort than opening an app.",
                  ["airport transfer service"],
                  "onDark",
                )}
              </p>
            </div>

            {/* Store buttons — side-by-side (Figma) */}
            <div className="mb-7 grid grid-cols-2 gap-2.5 lg:mb-7 lg:flex lg:gap-4">
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
                    src={`${ASSETS}/icon-star.png`}
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
                icon={
                  <Image
                    src={`${ASSETS}/icon-car.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                }
                value="100K+"
                label="City Rides"
              />
              <StatItem
                boxed
                icon={
                  <Image
                    src={`${ASSETS}/icon-bolt.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="< 5 min"
                label="Pickup Time"
              />
            </div>
            <div className="hidden w-full rounded-[16px] border border-white/10 bg-[#171410]/85 px-5 py-3 backdrop-blur-sm lg:inline-flex lg:w-auto lg:max-w-[540px] lg:flex-row lg:items-center">
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-star.png`}
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
                icon={
                  <Image
                    src={`${ASSETS}/icon-car.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                }
                value="100K+"
                label="City Rides"
              />
              <span
                className="mx-5 block h-8 w-px bg-white/12"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-bolt.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="< 5 min"
                label="Pickup Time"
              />
            </div>
          </div>

          {/* ── Visual: phone + chips ── */}
          <div className="relative z-10 mt-10 flex w-full items-center justify-center px-2 pb-8 lg:mt-0 lg:min-h-[370px] lg:flex-1 lg:px-0 lg:pb-0">
            <svg
              className="pointer-events-none absolute right-[2%] top-[2%] hidden h-[64%] w-[52%] lg:block"
              viewBox="0 0 340 400"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M60 8 C 190 -14, 300 60, 296 132 C 292 210, 180 250, 148 372"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="2 14"
              />
            </svg>

            <div className="nar-phone relative aspect-[375/739] w-[230px] sm:w-[240px] lg:w-[230px] xl:w-[245px]">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 50% at 50% 55%, rgba(253,184,19,0.22), transparent 70%)",
                }}
              />
              <Image
                src={`${ASSETS}/phone-cutout.png`}
                alt="Traveling Partner app showing available rides"
                fill
                sizes="(max-width: 640px) 260px, 340px"
                className="object-contain drop-shadow-[0_40px_70px_rgba(0,0,0,0.6)]"
              />
            </div>

            <FloatChip
              className="absolute right-0 top-[8%] sm:right-1 sm:top-[8%] lg:right-[1%] lg:top-[10%]"
              title="Nearest Driver"
              subtitle="Under 5 min"
              icon={
                <Image
                  src={`${ASSETS}/icon-driver.png`}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain lg:h-[26px] lg:w-[26px]"
                />
              }
            />
            <FloatChip
              className="absolute right-0 top-[26%] sm:right-1 sm:top-[28%] lg:bottom-auto lg:right-[1%] lg:top-[36%]"
              title="No Surge"
              subtitle="Fair Pricing"
              delay="1.4s"
              icon={
                <Image
                  src={`${ASSETS}/icon-no-surge.png`}
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain lg:h-[26px] lg:w-[26px]"
                />
              }
            />
          </div>
        </div>
      </div>
      </div>

      <style jsx global>{`
        @keyframes nar-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .nar-float {
          animation: nar-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .nar-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
