"use client";

import Image from "next/image";
import Link from "next/link";
import { HELP_ICONS } from "@/lib/helpAssets";

const SUPPORT_CARDS = [
  {
    icon: HELP_ICONS.phone,
    title: "Talk to support",
    subtitle: "Speak with our team directly",
    href: "tel:+923252801261",
  },
  {
    icon: HELP_ICONS.chat,
    title: "Chat with us",
    subtitle: "Get quick answers in real time",
    href: "/contact",
  },
  {
    icon: HELP_ICONS.email,
    title: "Email support",
    subtitle: "Send us a message anytime",
    href: "mailto:hello@traveling-partner.com",
  },
] as const;

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export default function TalkToHumanSection() {
  return (
    <section className="bg-[#FEFBF6] pb-20 pt-2 sm:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-[28px] border border-[#0b0b0b]/10 px-5 py-8 sm:rounded-[32px] sm:px-8 sm:py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-10 lg:px-10 lg:py-12 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-12"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #FCE001 0%, #FDB813 100%)",
          }}
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FCE001]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
                Customer Support
              </span>
            </div>

            <h2 className="mb-4 font-poppins text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.12] text-[#0b0b0b]">
              Talk to a{" "}
              <span className="relative inline-block rounded-[10px] border-b-[4px] border-r-[4px] border-black bg-white px-3 py-0.5 sm:rounded-[12px] sm:px-3.5 sm:py-1">
                <em className="font-medium italic">human.</em>
              </span>
            </h2>

            <p className="mb-6 max-w-[520px] text-[14px] leading-[1.7] text-[#0b0b0b]/85 sm:mb-8 sm:text-[15px]">
              Still need help? Our support team is here for you. Reach out by email,
              chat, or phone and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:hello@traveling-partner.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-[#0b0b0b] shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Email support
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-[#0b0b0b] shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Chat with us
              </Link>
            </div>
          </div>

          <div className="mt-8 space-y-3 lg:mt-0">
            {SUPPORT_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex items-center gap-3 rounded-[18px] bg-white px-4 py-3.5 shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-0.5 sm:gap-4 sm:px-5 sm:py-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] sm:h-12 sm:w-12">
                  <Image
                    src={card.icon}
                    alt=""
                    width={48}
                    height={48}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                    {card.title}
                  </p>
                  <p className="text-[12px] text-[#6b6960] sm:text-[13px]">
                    {card.subtitle}
                  </p>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-[#c4c0b6] transition-colors group-hover:text-[#0b0b0b]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
