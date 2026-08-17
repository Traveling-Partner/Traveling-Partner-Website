"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/delivery/ready-to-send";
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
          ? "flex w-full items-center gap-3 rounded-[14px] border border-black/10 bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          : "flex items-center gap-3 px-1 py-2.5 lg:gap-2.5 lg:px-0 lg:py-0"
      }
    >
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] border border-[#fce001]/50 bg-[#fce001]/30 lg:h-[34px] lg:w-[34px] lg:rounded-[10px] lg:border-[#fce001]/40 lg:bg-[#fce001]/25">
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
      className={`rts-float flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] lg:gap-2.5 lg:py-1.5 lg:pl-1.5 lg:pr-4 ${className}`}
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

export default function ReadyToSendSection() {
  return (
    <section className="bg-[#FEFBF6] py-4 sm:py-6">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[24px] bg-[#FEF3E1] sm:rounded-[28px]">
        {/* Background — same shell as Going same way / Need a ride */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Mobile cover: absolute (does not inflate card height) */}
          <Image
            src={`${ASSETS}/bg-delivery-mobile.png`}
            alt=""
            width={278}
            height={1024}
            sizes="100vw"
            className="absolute bottom-0 left-0 h-auto w-full max-w-none lg:hidden"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          {/* Desktop background */}
          <div className="absolute inset-y-0 right-0 hidden aspect-[1024/662] lg:block">
            <Image
              src={`${ASSETS}/bg-phone-van-rounded.png`}
              alt=""
              fill
              sizes="(max-width: 1280px) 60vw, 700px"
              className="object-contain object-right"
              priority
            />
          </div>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-5 lg:px-8 lg:py-4 xl:px-9">
          {/* ── Content ── */}
          <div className="relative z-10 w-full px-5 pb-0 pt-5 sm:px-6 lg:w-[46%] lg:shrink-0 lg:px-0 lg:pb-0 lg:pt-0">
            {/* Badge */}
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 lg:mb-3">
              <span className="relative flex h-[6px] w-[6px] items-center justify-center">
                <span className="absolute h-[12px] w-[12px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]/35 blur-[3px]" />
                <span className="relative h-[6px] w-[6px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#fce001] lg:text-[10px]">
                Ready to send?
              </span>
            </div>

            {/* Heading */}
            <h2 className="mb-2.5 font-extrabold leading-[1.06] tracking-tight text-[#0b0b0b] lg:mb-3">
              <span className="block text-[clamp(28px,7vw,34px)] lg:text-[40px]">
                Ship it,
              </span>
              <em
                className="my-[2px] inline-block rounded-[7px] border-b-[3px] border-r-[3px] border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-2 pb-0.5 text-[clamp(28px,7vw,34px)] font-medium italic text-[#0b0b0b] lg:my-[3px] lg:px-2.5 lg:text-[40px]"
                style={{ fontStyle: "italic" }}
              >
                track it,
              </em>
              <span className="block text-[clamp(28px,7vw,34px)] lg:text-[40px]">
                done.
              </span>
            </h2>

            <div className="mb-3 max-w-[400px] space-y-1 text-[12px] leading-[1.45] text-[#4a4a45] lg:mb-3 lg:text-[13px] lg:leading-[1.5]">
              <p>
                Sending a parcel really doesn&apos;t need to be complicated.
              </p>
              <p>
                Book a rider, set your pickup time, and follow your parcel the
                whole way, from your doorstep to theirs, all in the same app.
              </p>
              <p>
                Whether it&apos;s an important document, an order for a
                customer, or a gift for someone, Traveling Partner gets it there
                safely and on time.
              </p>
              <p>Download the app and give it a try.</p>
            </div>

            {/* Store buttons */}
            <div className="mb-3 grid grid-cols-2 gap-2 lg:mb-3.5 lg:flex lg:gap-3">
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

            {/* Stats — mobile: 3 full-width boxes; desktop: single card */}
            <div className="relative z-20 flex w-full shrink-0 flex-col gap-2 lg:hidden">
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
                icon={
                  <Image
                    src={`${ASSETS}/icon-box.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="50K+"
                label="Parcels Delivered"
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
            <div className="relative z-20 hidden h-auto w-full shrink-0 rounded-[14px] border border-black/8 bg-white px-4 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.10)] lg:inline-flex lg:w-auto lg:max-w-[500px] lg:flex-row lg:items-center">
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
                className="mx-4 block h-7 w-px bg-black/10"
                aria-hidden="true"
              />
              <StatItem
                icon={
                  <Image
                    src={`${ASSETS}/icon-box.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                }
                value="50K+"
                label="Parcels Delivered"
              />
              <span
                className="mx-4 block h-7 w-px bg-black/10"
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

          {/* Visual + chips — same height shell as Going same way */}
          <div className="relative z-10 mt-2 flex w-full items-center justify-center px-2 pb-4 lg:mt-0 lg:min-h-[260px] lg:flex-1 lg:px-0 lg:pb-0">
            <div
              className="relative min-h-[240px] w-full sm:min-h-[280px] lg:hidden"
              aria-hidden="true"
            />

            <FloatChip
              className="absolute right-1 top-[22%] sm:right-[4%] lg:right-[1%] lg:top-[10%]"
              title="Live GPS"
              subtitle="Track now"
              icon={
                <Image
                  src={`${ASSETS}/icon-live-gps.png`}
                  alt=""
                  width={30}
                  height={30}
                  className="h-[26px] w-[26px] object-contain lg:h-[30px] lg:w-[30px]"
                />
              }
            />
            <FloatChip
              className="absolute bottom-[40%] right-1 sm:right-[4%] lg:bottom-auto lg:right-[1%] lg:top-[36%]"
              title="No Fees"
              subtitle="Direct deal"
              delay="1.4s"
              icon={
                <Image
                  src={`${ASSETS}/icon-no-fee.png`}
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
        @keyframes rts-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .rts-float {
          animation: rts-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rts-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

