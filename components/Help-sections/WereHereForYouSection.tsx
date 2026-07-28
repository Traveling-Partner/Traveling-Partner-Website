"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HELP_ICONS } from "@/lib/helpAssets";

const ASSETS = "/images/help/were-here-for-you";
const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

const CONTACT_CARDS = [
  {
    icon: HELP_ICONS.email,
    label: "EMAIL SUPPORT",
    value: "hello@traveling-partner.com",
    href: "mailto:hello@traveling-partner.com",
  },
  {
    icon: HELP_ICONS.phone,
    label: "PHONE SUPPORT",
    value: "+92 325 2801261",
    href: "tel:+923252801261",
  },
  {
    icon: HELP_ICONS.chat,
    label: "CONTACT FORM",
    value: "Send us a message",
    href: "/contact",
  },
] as const;

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

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
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
      className="group inline-flex h-[48px] min-w-0 flex-1 items-center gap-2.5 rounded-[12px] bg-[#0b0b0b] pl-1.5 pr-3.5 shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1a1a1a] sm:h-[50px] sm:flex-none sm:pr-4 lg:h-[52px] lg:gap-2.5 lg:rounded-[14px] lg:pl-1.5 lg:pr-4"
    >
      <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105 lg:h-[36px] lg:w-[36px]">
        {icon}
      </span>
      <span className="min-w-0 text-left leading-none">
        <span className="block text-[8px] font-semibold uppercase tracking-[0.12em] text-white/70 lg:text-[9px]">
          {label}
        </span>
        <span className="mt-1 block truncate text-[13px] font-bold text-white lg:text-[14px]">
          {title}
        </span>
      </span>
    </Link>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-[16px] bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-0.5 sm:gap-3.5 sm:rounded-[18px] sm:px-4 sm:py-3.5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[12px] sm:h-11 sm:w-11">
        <Image
          src={icon}
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#FDB813] sm:text-[10px]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
          {value}
        </span>
      </span>
      <ChevronRightIcon className="h-4 w-4 shrink-0 text-[#d0ccc2] transition-colors group-hover:text-[#0b0b0b]" />
    </Link>
  );
}

function ContactCards({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {CONTACT_CARDS.map((card) => (
        <ContactCard
          key={card.label}
          icon={card.icon}
          label={card.label}
          value={card.value}
          href={card.href}
        />
      ))}
    </div>
  );
}

function SectionCopy({
  badgeClassName = "",
  headingClassName = "",
  bodyClassName = "",
}: {
  badgeClassName?: string;
  headingClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <>
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3 py-1.5 sm:gap-2.5 sm:px-3.5 sm:py-1.5 ${badgeClassName}`}
      >
        <span className="relative flex h-[6px] w-[6px] items-center justify-center">
          <span className="absolute h-[11px] w-[11px] rounded-full bg-[#FCE001]/35 blur-[2px]" />
          <span className="relative h-[6px] w-[6px] rounded-full bg-[#FCE001]" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white sm:text-[10px]">
          WE&apos;RE HERE FOR YOU
        </span>
      </div>

      <h2
        className={`font-extrabold tracking-tight text-[#0b0b0b] ${headingClassName}`}
      >
        <span className="block">How can we</span>
        <em
          className="mt-0.5 block font-medium italic text-[#FDB813]"
          style={{ fontStyle: "italic" }}
        >
          help you today?
        </em>
      </h2>

      <p className={`text-[#6B6960] ${bodyClassName}`}>
        Our support team is available 24/7. Reach us through any channel
        that&apos;s most convenient for you.
      </p>
    </>
  );
}

function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <StoreButton
        href={PLAY_STORE_URL}
        label="GET IT ON"
        title="Google Play"
        icon={<PlayStoreIcon className="h-[18px] w-[18px]" />}
      />
      <StoreButton
        href={APP_STORE_URL}
        label="DOWNLOAD ON"
        title="App Store"
        icon={<AppleIcon className="h-[18px] w-[18px] text-black" />}
      />
    </div>
  );
}

/**
 * Help Center bottom CTA — 1:1 Figma “We're Here For You” match.
 * Visual only: does not touch FAQ / search / accordion logic.
 */
export default function WereHereForYouSection() {
  return (
    <section className="bg-[#FEFBF6] px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6 lg:px-8 lg:pb-24 lg:pt-8">
      {/* ——— Mobile ——— */}
      <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[28px] bg-[#FFFBF2] sm:rounded-[32px] lg:hidden">
        <div className="relative z-10 px-5 pb-2 pt-9 sm:px-6 sm:pt-10">
          <SectionCopy
            badgeClassName="mb-5"
            headingClassName="mb-3.5 text-[30px] leading-[1.12] sm:text-[32px]"
            bodyClassName="mb-6 max-w-[320px] text-[13px] leading-[1.65]"
          />
          <StoreButtons className="mb-2 flex gap-2.5" />
        </div>

        <div className="relative mx-auto w-[88%] max-w-[340px]">
          <Image
            src={`${ASSETS}/bg-mobile.png`}
            alt=""
            width={720}
            height={320}
            sizes="340px"
            className="pointer-events-none block h-auto w-full select-none"
            priority
          />
        </div>

        <div className="relative z-10 px-5 pb-8 pt-2 sm:px-6">
          <ContactCards className="flex flex-col gap-3" />
        </div>
      </div>

      {/* ——— Desktop ——— native cover aspect 1024×232 — no zoom ——— */}
      <div className="relative mx-auto hidden w-full max-w-7xl overflow-hidden rounded-[28px] bg-[#FFFBF2] lg:block lg:aspect-[1024/232] xl:rounded-[32px]">
        <Image
          src={`${ASSETS}/bg-desktop.png`}
          alt=""
          fill
          sizes="1280px"
          className="object-contain object-center"
          priority
        />

        <div className="relative z-10 flex h-full items-center justify-between px-8 py-6 xl:px-12 xl:py-7">
          {/* Left copy */}
          <div className="w-[28%] max-w-[300px] shrink-0">
            <SectionCopy
              badgeClassName="mb-3.5"
              headingClassName="mb-2.5 text-[28px] leading-[1.08] xl:text-[32px]"
              bodyClassName="mb-4 max-w-[280px] text-[12px] leading-[1.55] xl:mb-5 xl:text-[13px]"
            />
            <StoreButtons className="flex max-w-[300px] gap-2.5" />
          </div>

          {/* Center spacer keeps art visible at natural scale */}
          <div className="w-[36%] shrink-0" aria-hidden="true" />

          {/* Right contact cards */}
          <div className="w-[28%] max-w-[300px] shrink-0">
            <ContactCards className="flex flex-col gap-2.5 xl:gap-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
