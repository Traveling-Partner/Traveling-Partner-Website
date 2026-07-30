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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.24.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
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
      className="group inline-flex h-[56px] w-full items-center gap-3 rounded-full bg-[#fce001] px-5 shadow-[0_10px_28px_rgba(253,184,19,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(253,184,19,0.45)] sm:h-[60px] sm:w-auto sm:min-w-[190px]"
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

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      {/* Soft brand glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 45% at 8% 92%, rgba(253,184,19,0.22), transparent 70%),
            radial-gradient(ellipse 45% 40% at 92% 12%, rgba(252,224,1,0.18), transparent 65%),
            radial-gradient(ellipse 40% 35% at 88% 88%, rgba(253,184,19,0.12), transparent 70%)
          `,
        }}
      />

      {/* Subtle editorial grid lines */}
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

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-14 pt-[100px] sm:px-6 md:pb-16 md:pt-[120px] lg:flex-row lg:items-start lg:gap-6 lg:px-8 lg:pb-20 lg:pt-[130px] xl:gap-8 xl:pb-24 xl:pt-[140px]">
        {/* Left content */}
        <div className="w-full max-w-xl lg:max-w-[420px] lg:shrink-0">
          <div
            className="taxi-hero-fade mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#fce001]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#fce001] sm:text-[11px]">
              Available in all cities
            </span>
          </div>

          <h1
            className="taxi-hero-fade mb-4 text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]"
            style={{ animationDelay: "80ms" }}
          >
            Taxi{" "}
            <span
              className="relative inline-block origin-center rounded-[10.8px] border-b-[5px] border-r-[5px] border-black bg-[#fce001] px-3 py-1 font-medium text-black shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:px-4 sm:py-1.5"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              Stand.
            </span>
          </h1>

          <p
            className="taxi-hero-fade mb-5 text-[13px] font-bold uppercase tracking-[0.18em] text-[#fdb813] sm:text-sm sm:tracking-[0.22em]"
            style={{ animationDelay: "140ms" }}
          >
            Connect and commute—your way.
          </p>

          <p
            className="taxi-hero-fade mb-8 max-w-md text-[14px] leading-[1.5] text-[#4a4a45] sm:text-[15px] sm:leading-[1.55]"
            style={{ animationDelay: "200ms" }}
          >
            {emphasizePhrases(
              "Need to get somewhere? Open the app, enter your destination, and we'll connect you with a verified driver nearby. You'll know the fare before your trip begins, and booking only takes a few taps. With our zero commission model for drivers, everyone gets a better experience when they ride with a Traveling Partner.",
              ["Need to get somewhere?", "verified driver", "zero commission"],
              "onLight",
            )}
          </p>

          <div
            className="taxi-hero-fade mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
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
            className="taxi-hero-fade inline-flex items-center gap-2 rounded-full border border-dashed border-[#d4d0c6] bg-white px-3.5 py-2 shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
            style={{ animationDelay: "360ms" }}
          >
            <MapPinIcon className="h-4 w-4 text-[#e53935]" />
            <span className="text-[13px] text-[#4a4a45]">
              <span className="font-normal text-[#6f6e68]">Available in</span>{" "}
              <strong className="font-bold text-[#0b0b0b]">All Cities</strong>
            </span>
          </div>
        </div>

        {/* Right visual */}
        <div
          className="taxi-hero-image relative flex w-full justify-center lg:min-w-0 lg:flex-1 lg:justify-start"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative w-full max-w-[560px] lg:max-w-none">
            {/* Contact shadow */}
            <div
              className="pointer-events-none absolute bottom-[6%] left-[12%] right-[8%] h-[18%] rounded-[100%] bg-black/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative aspect-[602/415] w-full">
              <Image
                src="/images/taxi-stand/taxi-hero-car-v3.png"
                alt="Traveling Partner taxi"
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 620px"
                className="object-contain object-center drop-shadow-[0_28px_40px_rgba(0,0,0,0.18)]"
              />

              {/* Glow dot below front bumper */}
              <div className="pointer-events-none absolute left-[40%] top-[70%] z-[5] h-14 w-12 -translate-x-1/2 sm:left-[42%] sm:top-[69%] sm:h-16 sm:w-12 md:h-20 md:w-12 lg:left-[43%] lg:top-[69%]">
                <Image
                  src="/images/taxi-stand/glow-dot.png"
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Floating: Available in All Cities */}
            <div className="taxi-float absolute left-0 top-[8%] z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.10)] sm:left-[2%] sm:top-[10%] sm:px-5 sm:py-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#fdb813] sm:text-[11px]">
                Available in
              </p>
              <p className="text-lg font-extrabold leading-tight text-[#0b0b0b] sm:text-xl">
                <em className="font-medium italic text-[#FDB813]">All</em> Cities
              </p>
            </div>

            {/* Floating: Commission 0% */}
            <div
              className="taxi-float absolute bottom-[14%] right-0 z-10 rounded-2xl bg-[#fce001] px-4 py-3 shadow-[0_12px_32px_rgba(253,184,19,0.45)] sm:bottom-[16%] sm:right-[4%] sm:px-5 sm:py-3.5"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 sm:text-[11px]">
                Commission
              </p>
              <p className="text-2xl font-extrabold leading-none text-white sm:text-3xl">
                0%
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes taxi-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes taxi-fade-in {
          from {
            opacity: 0;
            transform: translateX(28px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes taxi-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .taxi-hero-fade {
          opacity: 0;
          animation: taxi-fade-up 0.55s ease-out forwards;
        }

        .taxi-hero-image {
          opacity: 0;
          animation: taxi-fade-in 0.7s ease-out forwards;
        }

        .taxi-float {
          animation: taxi-float 4.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .taxi-hero-fade,
          .taxi-hero-image,
          .taxi-float {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
