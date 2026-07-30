"use client";

import { emphasizePhrases } from "@/lib/emphasizePhrases";

export default function TermsHero() {
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

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-10 pt-[110px] text-center sm:px-6 sm:pb-12 sm:pt-[128px] md:pt-[140px] lg:px-8 lg:pb-14 lg:pt-[150px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            Effective as of October 23, 2023
          </span>
        </div>

        <h1 className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-poppins text-[36px] font-extrabold leading-[1.08] tracking-tight text-[#0b0b0b] sm:mb-6 sm:gap-x-2.5 sm:text-5xl md:text-6xl lg:text-[64px]">
          <span>Terms &amp;</span>
          <span className="relative inline-block origin-center -rotate-[2deg] rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-[#FCE001] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1">
            <em className="font-medium italic text-black">Conditions.</em>
          </span>
        </h1>

        <p className="max-w-[640px] text-[14px] leading-relaxed text-[#4a4a45] sm:text-[15px] sm:leading-[1.7] md:text-base">
          {emphasizePhrases(
            "These Terms & Conditions describe how Traveling Partner operates and the rules for use of our website, mobile application and services. By creating an account, booking a ride, sending a parcel or using any service on the platform, you agree to these Terms.",
            [
              "website, mobile application and services",
              "you agree to these Terms",
            ],
          )}
        </p>
      </div>
    </section>
  );
}
