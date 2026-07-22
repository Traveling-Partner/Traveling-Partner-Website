"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const ASSETS = "/images/blog/tp-journal";

const FEATURES = [
  {
    title: "Timely Updates",
    subtitle: "Stay in the Loop",
    icon: "clock",
  },
  {
    title: "Helpful Guides",
    subtitle: "Learn & Grow",
    icon: "book",
  },
  {
    title: "Community Voices",
    subtitle: "Stories that Inspire",
    icon: "users",
  },
] as const;

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.25" stroke="#FCE001" strokeWidth="1.8" />
      <path
        d="M12 8v4.2l2.6 1.6"
        stroke="#FCE001"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 6.2c0-.7.5-1.2 1.2-1.2H11v13H6.2c-.7 0-1.2-.5-1.2-1.2V6.2z"
        stroke="#FCE001"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M19 6.2c0-.7-.5-1.2-1.2-1.2H13v13h4.8c.7 0 1.2-.5 1.2-1.2V6.2z"
        stroke="#FCE001"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 5v12.8"
        stroke="#FCE001"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="8.6" r="2.35" fill="#7DD3FC" />
      <circle cx="15.3" cy="9.2" r="1.95" fill="#38BDF8" />
      <path
        d="M4.7 16.9c0-2.05 1.9-3.45 4.3-3.45s4.3 1.4 4.3 3.45"
        fill="#7DD3FC"
      />
      <path
        d="M12.2 16.9c.25-1.45 1.55-2.55 3.35-2.55 1.75 0 3.1 1 3.3 2.55"
        fill="#38BDF8"
      />
    </svg>
  );
}

function FeatureIcon({ type }: { type: (typeof FEATURES)[number]["icon"] }) {
  const iconClass = "h-[17px] w-[17px] lg:h-[18px] lg:w-[18px]";
  if (type === "clock") return <ClockIcon className={iconClass} />;
  if (type === "book") return <BookIcon className={iconClass} />;
  return <UsersIcon className={iconClass} />;
}

function FeatureItem({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 lg:gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#FCE001]/30 bg-[#1a1810] shadow-[0_0_12px_rgba(252,224,1,0.12)] lg:h-10 lg:w-10 lg:rounded-[12px]">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-bold leading-tight text-white sm:text-[13px] lg:text-[14px]">
          {title}
        </span>
        <span className="mt-0.5 block text-[10px] font-medium leading-tight text-[#9A968C] sm:text-[11px] lg:text-[12px]">
          {subtitle}
        </span>
      </span>
    </div>
  );
}

function FeatureRow({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {FEATURES.map((feature) => (
        <FeatureItem
          key={feature.title}
          title={feature.title}
          subtitle={feature.subtitle}
          icon={<FeatureIcon type={feature.icon} />}
        />
      ))}
    </div>
  );
}

function SectionCopy({
  className = "",
  headingClassName = "",
  bodyClassName = "",
  badgeClassName = "",
  badgeTextClassName = "text-white",
}: {
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
  badgeClassName?: string;
  badgeTextClassName?: string;
}) {
  return (
    <div className={className}>
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-[#FCE001]/85 bg-transparent px-3 py-1.5 sm:gap-2.5 sm:px-3.5 sm:py-1.5 lg:px-4 lg:py-2 ${badgeClassName}`}
      >
        <span className="relative flex h-[6px] w-[6px] items-center justify-center lg:h-[7px] lg:w-[7px]">
          <span className="absolute h-[11px] w-[11px] rounded-full bg-[#FCE001]/35 blur-[2px] lg:h-[13px] lg:w-[13px]" />
          <span className="relative h-[6px] w-[6px] rounded-full bg-[#FCE001] lg:h-[7px] lg:w-[7px]" />
        </span>
        <span
          className={`text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px] lg:tracking-[0.22em] ${badgeTextClassName}`}
        >
          TP JOURNAL
        </span>
      </div>

      <h2
        className={`font-extrabold tracking-tight text-white ${headingClassName}`}
      >
        <span className="block">Real stories.</span>
        <em
          className="mt-1 block font-medium italic text-[#FCE001]"
          style={{ fontStyle: "italic" }}
        >
          Real impact.
        </em>
      </h2>

      <p className={`text-[#9CA3AF] ${bodyClassName}`}>
        Discover helpful tips, company updates, and stories that keep Pakistan
        moving.
      </p>
    </div>
  );
}

/**
 * Blog page bottom CTA — 1:1 Figma “TP Journal” match.
 * Visual only: no blog API / filter / routing changes.
 */
export default function TPJournalSection() {
  return (
    <section className="bg-[#FEFBF6] px-3 pb-12 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:px-6 lg:pb-16 lg:pt-8 xl:px-8">
      {/* ——— Mobile — Figma stacked layout ——— */}
      <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[28px] bg-black sm:rounded-[32px] lg:hidden">
        <div className="relative z-10 px-6 pb-2 pt-10 sm:px-7 sm:pt-11">
          <SectionCopy
            badgeClassName="mb-6"
            badgeTextClassName="text-[#FCE001]"
            headingClassName="mb-4 text-[32px] leading-[1.12] sm:text-[34px]"
            bodyClassName="mb-8 max-w-[300px] text-[13px] leading-[1.7]"
          />

          {/* 2-up grid, third item alone on next row — matches Figma mobile */}
          <FeatureRow className="grid grid-cols-2 gap-x-3 gap-y-5" />
        </div>

        <div className="relative mt-6 w-full overflow-hidden pb-1">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-black to-transparent"
            aria-hidden="true"
          />
          <div className="relative flex w-full justify-center">
            <Image
              src={`${ASSETS}/bg-mobile.png`}
              alt=""
              width={900}
              height={320}
              sizes="520px"
              className="pointer-events-none relative z-0 block h-auto w-[150%] max-w-none shrink-0 -translate-x-[16%] select-none sm:w-[145%] sm:-translate-x-[14%]"
              priority
            />
          </div>
        </div>
      </div>

      {/* ——— Desktop ——— */}
      <div className="relative mx-auto hidden w-full max-w-[1280px] overflow-hidden rounded-[28px] bg-black lg:block lg:min-h-[340px] lg:aspect-[1024/280] xl:min-h-[360px] xl:rounded-[32px]">
        <Image
          src={`${ASSETS}/bg-desktop.png`}
          alt=""
          fill
          sizes="1280px"
          className="object-contain object-right"
          priority
        />

        <div className="relative z-10 flex h-full items-center px-12 py-10 xl:px-16 xl:py-12">
          <div className="w-[52%] max-w-[560px] shrink-0 pr-6">
            <SectionCopy
              badgeClassName="mb-5 xl:mb-6"
              badgeTextClassName="text-white"
              headingClassName="mb-4 text-[36px] leading-[1.1] xl:mb-5 xl:text-[42px]"
              bodyClassName="mb-8 max-w-[420px] text-[14px] leading-[1.7] xl:mb-9 xl:text-[15px]"
            />
            <FeatureRow className="flex max-w-[520px] items-start gap-5 xl:gap-7" />
          </div>
        </div>
      </div>
    </section>
  );
}
