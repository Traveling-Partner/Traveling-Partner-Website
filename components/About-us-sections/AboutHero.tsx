"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const PLAY_STORE_URL = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_URL = "https://www.apple.com/app-store/";

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

function PakistanFlag({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 24" aria-hidden="true">
      <rect width="36" height="24" rx="2" fill="#01411C" />
      <rect width="9" height="24" fill="#fff" />
      <circle cx="21.5" cy="12" r="5.2" fill="#fff" />
      <circle cx="23.2" cy="11.2" r="4.2" fill="#01411C" />
      <path
        fill="#fff"
        d="M26.8 7.2l.55 1.55 1.65.05-1.3 1 .45 1.6-1.35-.9-1.35.9.45-1.6-1.3-1 1.65-.05z"
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
      className="group inline-flex h-[56px] w-full items-center gap-3 rounded-full bg-gradient-to-r from-[#fce001] to-[#fdb813] px-5 shadow-[0_10px_28px_rgba(253,184,19,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(253,184,19,0.45)] sm:h-[60px] sm:w-auto sm:min-w-[190px]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {icon}
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-black/80">
          {label}
        </span>
        <span className="block text-[17px] font-bold text-black sm:text-[18px]">
          {title}
        </span>
      </span>
    </Link>
  );
}

/**
 * About Us hero — 1:1 Figma match, same system as
 * Taxi / Pool / Delivery / Logistics / Trip heroes.
 */
export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 45% at 8% 92%, rgba(253,184,19,0.22), transparent 70%),
            radial-gradient(ellipse 45% 40% at 92% 12%, rgba(252,224,1,0.2), transparent 65%),
            radial-gradient(ellipse 40% 35% at 88% 88%, rgba(253,184,19,0.12), transparent 70%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 hidden opacity-40 lg:block"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent calc(50% - 0.5px), rgba(0,0,0,0.06) calc(50% - 0.5px), rgba(0,0,0,0.06) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
            linear-gradient(to bottom, transparent calc(58% - 0.5px), rgba(0,0,0,0.05) calc(58% - 0.5px), rgba(0,0,0,0.05) calc(58% + 0.5px), transparent calc(58% + 0.5px))
          `,
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-14 pt-[100px] sm:px-6 md:pb-16 md:pt-[120px] lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:pb-20 lg:pt-[130px] xl:gap-8 xl:pb-24 xl:pt-[140px]">
        {/* Left content */}
        <div className="w-full max-w-xl lg:max-w-[440px] lg:shrink-0">
          <div
            className="about-hero-fade mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#fce001]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#fce001] sm:text-[11px]">
              Trusted Across Pakistan
            </span>
          </div>

          <h1
            className="about-hero-fade mb-4 text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]"
            style={{ animationDelay: "80ms" }}
          >
            About{" "}
            <span
              className="relative inline-block origin-center rounded-[10.8px] border-b-[5px] border-r-[5px] border-black bg-[#fce001] px-3 py-1 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:px-4 sm:py-1.5"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <em className="font-medium italic text-black">Us.</em>
            </span>
          </h1>

          <p
            className="about-hero-fade mb-5 text-[13px] font-bold uppercase tracking-[0.14em] text-[#fdb813] sm:text-sm sm:tracking-[0.18em]"
            style={{ animationDelay: "140ms" }}
          >
            More than a ride. A better way to move.
          </p>

          <p
            className="about-hero-fade mb-8 max-w-md text-[15px] leading-relaxed text-[#4a4a45] sm:text-base sm:leading-[1.7]"
            style={{ animationDelay: "200ms" }}
          >
            {emphasizePhrases(
              "Every day, people need to get somewhere. Some are heading to work. Others are visiting family, sending an important parcel, or keeping their business running. Traveling Partner started with a simple idea to make everyday transportation easier. By bringing rides, deliveries, and logistics into one platform, we help people travel with confidence, drivers earn with flexibility, and businesses keep moving. Everything we build is focused on making every journey and delivery simpler, safer, and more reliable.",
              ["one platform", "everyday transportation"],
            )}
          </p>

          <div
            className="about-hero-fade mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "280ms" }}
          >
            <StoreButton
              href={PLAY_STORE_URL}
              label="Get it on"
              title="Google Play"
              icon={<PlayStoreIcon className="h-8 w-8" />}
            />
            <StoreButton
              href={APP_STORE_URL}
              label="Download on"
              title="App Store"
              icon={<AppleIcon className="h-8 w-8 text-black" />}
            />
          </div>

          <div
            className="about-hero-fade inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-dashed border-[#d4d0c6] bg-white px-3.5 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
            style={{ animationDelay: "360ms" }}
          >
            <PakistanFlag className="h-4 w-6 shrink-0 rounded-[2px] shadow-sm" />
            <span className="text-[12px] text-[#4a4a45] sm:text-[13px]">
              <span className="font-normal text-[#6f6e68]">
                Community · Commission-Free ·
              </span>{" "}
              <strong className="font-bold text-[#0b0b0b]">
                Made For Pakistan
              </strong>
            </span>
          </div>
        </div>

        {/* Right visual */}
        <div
          className="about-hero-image relative flex w-full justify-center lg:min-w-0 lg:flex-1 lg:justify-end lg:pr-6 xl:pr-10"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px]">
            <div className="relative aspect-square w-full overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[36px]">
              <Image
                src="/images/about/hero-team.png"
                alt="Traveling Partner team across Pakistan"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover object-center"
              />
              {/* Soft bottom fade into cream — matches Figma vignette */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#FEFBF6] via-[#FEFBF6]/55 to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating: Services */}
            <div className="about-float absolute -left-3 -top-2 z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.10)] sm:-left-4 sm:-top-3 sm:px-5 sm:py-3.5 lg:-left-5 lg:-top-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fdb813] sm:text-[11px]">
                Services
              </p>
              <p className="text-2xl font-extrabold leading-none text-[#0b0b0b] sm:text-3xl">
                5<span className="text-[#fce001]">+</span>
              </p>
            </div>

            {/* Floating: Zero Commission */}
            <div
              className="about-float absolute -right-1 bottom-[6%] z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.10)] sm:bottom-[8%] sm:right-0 sm:px-5 sm:py-3.5"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fdb813] sm:text-[11px]">
                Zero Commission
              </p>
              <p className="text-2xl font-extrabold leading-none text-[#0b0b0b] sm:text-3xl">
                0<span className="text-[#fce001]">%</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes about-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes about-fade-in {
          from {
            opacity: 0;
            transform: translateX(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes about-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .about-hero-fade {
          opacity: 0;
          animation: about-fade-up 0.55s ease-out forwards;
        }

        .about-hero-image {
          opacity: 0;
          animation: about-fade-in 0.7s ease-out forwards;
        }

        .about-float {
          animation: about-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-hero-fade,
          .about-hero-image,
          .about-float {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
