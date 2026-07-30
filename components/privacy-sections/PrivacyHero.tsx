"use client";

import Image from "next/image";
import { emphasizePhrases } from "@/lib/emphasizePhrases";
import { privacyOverviewCards } from "@/app/privacy-policy/privacySections";

export default function PrivacyHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 48% at 50% 8%, rgba(252,224,1,0.32), transparent 68%),
            radial-gradient(ellipse 42% 38% at 8% 55%, rgba(253,184,19,0.16), transparent 70%),
            radial-gradient(ellipse 40% 36% at 94% 48%, rgba(252,224,1,0.14), transparent 68%)
          `,
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-8 pt-[110px] text-center sm:px-6 sm:pb-10 sm:pt-[128px] md:pt-[140px] lg:px-8 lg:pb-12 lg:pt-[150px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6 sm:px-4">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001] shadow-[0_0_8px_2px_rgba(252,224,1,0.75)]"
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[11px]">
            Last updated: October 18, 2024
          </span>
        </div>

        <h1 className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-poppins text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#0b0b0b] sm:mb-6 sm:gap-x-2.5 sm:text-5xl md:text-6xl lg:text-[64px]">
          <span>Privacy</span>
          <span className="relative inline-block origin-center -rotate-[2deg] rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-[#FCE001] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1">
            <em className="font-medium italic text-black">Policy.</em>
          </span>
        </h1>

        <p className="mb-8 max-w-[640px] text-[14px] leading-relaxed text-[#4a4a45] sm:mb-10 sm:text-[15px] sm:leading-[1.7] md:text-base">
          {emphasizePhrases(
            "Your privacy matters to us. This Privacy Policy explains what information Traveling Partner collects, how it is used, and the choices you have while using our ride booking app in Pakistan, parcel delivery service, logistics platform, and intercity travel services.",
            [
              "Your privacy matters to us",
              "ride booking app in Pakistan",
            ],
          )}
        </p>

        <div className="grid w-full max-w-[900px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {privacyOverviewCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[18px] border border-[#eceae4] bg-white p-4 text-left shadow-[0_4px_14px_rgba(0,0,0,0.04)] sm:p-4"
            >
              <Image
                src={card.icon}
                alt=""
                width={48}
                height={48}
                unoptimized
                className="mb-3 h-12 w-12 object-contain"
              />
              <p className="mb-1 text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
                {card.title}
              </p>
              <p className="text-[12px] leading-snug text-[#6b6960] sm:text-[13px]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
