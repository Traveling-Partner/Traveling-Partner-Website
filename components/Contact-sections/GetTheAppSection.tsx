"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const ASSETS = "/images/contact/get-the-app";

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
      className="group inline-flex h-[54px] w-full shrink-0 items-center gap-2.5 rounded-full pl-1.5 pr-4 shadow-[0_10px_28px_rgba(252,224,1,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(252,224,1,0.4)] lg:h-[56px] lg:w-[178px] lg:gap-2.5 lg:pl-1.5 lg:pr-5"
      style={{
        background: "linear-gradient(90deg, #FCE001 0%, #FDB813 100%)",
      }}
    >
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 lg:h-[40px] lg:w-[40px]">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col justify-center text-left leading-none">
        <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-black/65 lg:text-[9px]">
          {label}
        </span>
        <span className="mt-1 truncate text-[14px] font-bold text-black lg:text-[15px]">
          {title}
        </span>
      </span>
    </Link>
  );
}

function FeaturePill({
  icon,
  title,
  className = "",
  delay = "0s",
}: {
  icon: ReactNode;
  title: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`gta-float flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3.5 shadow-[0_12px_28px_rgba(0,0,0,0.22)] lg:gap-2.5 lg:py-1.5 lg:pl-1.5 lg:pr-4 ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#fce001] lg:h-[36px] lg:w-[36px]">
        {icon}
      </span>
      <span className="whitespace-nowrap pr-0.5 text-[12px] font-bold text-[#0b0b0b] lg:text-[13px]">
        {title}
      </span>
    </div>
  );
}

function FeaturePills({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <FeaturePill
        title="Safe & Secure"
        icon={
          <Image
            src={`${ASSETS}/icon-safe.png`}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        }
      />
      <FeaturePill
        title="On-Time Rides"
        delay="0.8s"
        icon={
          <Image
            src={`${ASSETS}/icon-ontime.png`}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        }
      />
      <FeaturePill
        title="Live Tracking"
        delay="1.6s"
        icon={
          <Image
            src={`${ASSETS}/icon-live.png`}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />
        }
      />
    </div>
  );
}

export default function GetTheAppSection() {
  return (
    <section className="bg-[#FEFBF6] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* ——— Mobile — Figma bg (black top + phone bottom), same CTA pattern ——— */}
      <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[28px] bg-[#070604] max-lg:max-w-[400px] sm:rounded-[32px] lg:hidden">
        {/* Cover IN FLOW — natural height, no crop */}
        <Image
          src={`${ASSETS}/bg-mobile.png`}
          alt=""
          width={715}
          height={1024}
          sizes="400px"
          className="pointer-events-none relative z-0 block h-auto w-full select-none"
          style={{ width: "100%", height: "auto" }}
          priority
        />

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col">
          <div className="relative z-20 w-full shrink-0 px-5 pt-9 sm:px-6 sm:pt-10">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#fce001]/80 px-3.5 py-1.5">
              <span className="relative flex h-[6px] w-[6px] items-center justify-center">
                <span className="absolute h-[12px] w-[12px] rounded-full bg-[#fce001]/35 blur-[2px]" />
                <span className="relative h-[6px] w-[6px] rounded-full bg-[#fce001]" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#fce001]">
                Need Help?
              </span>
            </div>

            <h2 className="mb-4 font-extrabold leading-[1.06] tracking-tight">
              <span className="block text-[34px] text-white sm:text-[36px]">
                Need Help?
              </span>
              <em
                className="mt-0.5 block text-[34px] font-medium italic text-[#FCE001] sm:text-[36px]"
                style={{ fontStyle: "italic" }}
              >
                We&apos;re here.
              </em>
            </h2>

            <p className="mb-6 max-w-[320px] text-[13px] leading-[1.65] text-[#c8c2b6]">
              Questions about your account, a booking, a delivery, or our
              business services? Our support team is here to help. Get in touch
              whenever you need assistance.
            </p>

            <div className="grid grid-cols-2 items-center gap-2.5">
              <StoreButton
                href={PLAY_STORE_URL}
                label="Get it on"
                title="Google Play"
                icon={<PlayStoreIcon className="h-[18px] w-[18px]" />}
              />
              <StoreButton
                href={APP_STORE_URL}
                label="Download on"
                title="App Store"
                icon={<AppleIcon className="h-[18px] w-[18px] text-black" />}
              />
            </div>
          </div>

          {/* Chips left over phone/glow zone — matches Figma mobile */}
          <div className="relative z-10 mt-auto min-h-0 w-full flex-1 px-4 pb-8">
            <FeaturePills className="absolute left-4 top-[28%] flex flex-col gap-2.5 sm:left-5" />
          </div>
        </div>
      </div>

      {/* ——— Desktop ——— original layout; content not flush to edges */}
      <div className="relative mx-auto hidden w-full max-w-7xl overflow-hidden rounded-[36px] bg-[#070604] lg:block lg:aspect-[1688/409] xl:rounded-[40px]">
        <Image
          src={`${ASSETS}/bg-desktop.png`}
          alt=""
          fill
          sizes="1400px"
          className="object-contain object-right"
          priority
        />

        <div className="relative z-10 flex h-full items-center px-12 xl:px-16">
          {/* Left copy — slightly tighter type so it sits clear of top/bottom */}
          <div className="w-[36%] max-w-[460px] shrink-0">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#fce001]/80 bg-[#0b0b0b]/40 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-[7px] w-[7px] items-center justify-center">
                <span className="absolute h-[14px] w-[14px] rounded-full bg-[#fce001]/35 blur-[3px]" />
                <span className="relative h-[7px] w-[7px] rounded-full bg-[#fce001]" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#fce001]">
                Need Help?
              </span>
            </div>

            <h2 className="mb-4 font-extrabold leading-[1.08] tracking-tight">
              <span className="block text-[40px] text-white xl:text-[46px]">
                Need Help?
              </span>
              <em
                className="mt-0.5 block text-[40px] font-medium italic text-[#FCE001] xl:text-[46px]"
                style={{ fontStyle: "italic" }}
              >
                We&apos;re here.
              </em>
            </h2>

            <p className="max-w-[400px] text-[15px] leading-[1.65] text-[#c8c2b6]">
              Questions about your account, a booking, a delivery, or our
              business services? Our support team is here to help. Get in touch
              whenever you need assistance.
            </p>
          </div>

          {/* Store buttons — Figma mid zone */}
          <div className="absolute left-[36%] top-1/2 z-20 flex -translate-y-1/2 items-center gap-4 xl:left-[38%]">
            <StoreButton
              href={PLAY_STORE_URL}
              label="Get it on"
              title="Google Play"
              icon={<PlayStoreIcon className="h-[20px] w-[20px]" />}
            />
            <StoreButton
              href={APP_STORE_URL}
              label="Download on"
              title="App Store"
              icon={<AppleIcon className="h-[20px] w-[20px] text-black" />}
            />
          </div>

          <FeaturePills className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col gap-3.5 xl:right-10" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes gta-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .gta-float {
          animation: gta-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .gta-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
