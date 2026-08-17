"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
function AccentTitle({
  lead,
  accent,
  leadClassName = "text-[#0b0b0b]",
  accentClassName = "font-medium italic text-[#FDB813]",
}: {
  lead: string;
  accent: string;
  leadClassName?: string;
  accentClassName?: string;
}) {
  return (
    <>
      <span className={`font-extrabold ${leadClassName}`}>{lead}</span>{" "}
      <em className={accentClassName}>{accent}</em>
    </>
  );
}

/** Single dashed orbit ring — light gold, still readable on cream */
function DashedOrbit({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full border border-dashed border-[#E0CF88]/50 ${className}`}
      aria-hidden="true"
    />
  );
}

function FeatureCardShell({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function DeliveryTreasureSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFAF2] py-16 sm:py-20 lg:py-24">
      {/* Soft yellow glows */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 48% 42% at 12% 18%, rgba(252,224,1,0.22), transparent 68%),
            radial-gradient(ellipse 42% 38% at 88% 12%, rgba(253,184,19,0.18), transparent 65%),
            radial-gradient(ellipse 50% 40% at 70% 78%, rgba(252,224,1,0.1), transparent 70%)
          `,
        }}
      />

      {/* Dashed orbit behind hero — smaller, right of image, raised so it isn’t hidden under the photo */}
      <div
        className="pointer-events-none absolute left-[28%] top-[24%] z-[1] hidden h-[240px] w-[240px] rounded-full border border-dashed border-[#E0CF88]/55 lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — matches reference */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[11px]">
              Delivery Service
            </span>
          </div>

          <h2 className="mb-3 text-[34px] font-extrabold leading-[1.08] tracking-tight text-[#0b0b0b] sm:text-5xl lg:text-[52px]">
            Deliver Your{" "}
            <em className="font-semibold italic text-[#FDB813]">Treasure.</em>
          </h2>

          <p className="mx-auto max-w-[560px] text-[13px] leading-[1.45] text-[#6F6E68] sm:text-[14px] sm:leading-[1.5]">
            Every delivery matters. We handle every delivery from pickup to your
            doorstep. Some deliveries are personal. Others keep your business
            moving. Whatever you&apos;re sending, Traveling Partner makes the
            process simple from pickup to delivery.
          </p>
        </motion.div>

        {/*
          3-column desktop grid:
          [ Image ] [ Hassle ] [ Couriers ]
          [ Image ] [     Cost-Effective   ]
          [ Track ] [   Community-Centric  ]
          Image + Track share column 1 → identical left/right edges
        */}
        <div
          className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_auto] lg:gap-5"
        >
          {/* Hero image — photo fills card; no white/colored box behind */}
          <FeatureCardShell
            delay={0.04}
            className="relative h-full min-h-[360px] w-full overflow-visible rounded-[28px] bg-transparent sm:min-h-[420px] lg:col-start-1 lg:row-start-1 lg:row-end-3 lg:min-h-0 lg:self-stretch"
          >
            <div className="absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/delivery/treasure/hero-delivery.png"
                alt="Courier delivering a package to a customer"
                className="absolute inset-0 h-full w-full max-w-none scale-[1.42] object-cover object-center"
              />

              {/* TP · DELIVERY badge */}
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-[#FCE001]/70 bg-[#0b0b0b] px-3 py-1.5 sm:left-5 sm:top-5">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[10px]">
                  TP · Delivery
                </span>
              </div>
            </div>

            {/* Safe Delivery — bottom-right, slightly outside the image */}
            <div className="absolute -bottom-3 -right-3 z-20 flex items-center gap-2.5 rounded-[18px] bg-white px-3 py-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.14)] sm:-bottom-4 sm:-right-4 sm:px-3.5 sm:py-3">
              <Image
                src="/images/delivery/treasure/icon-box.png"
                alt=""
                width={42}
                height={42}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div className="leading-none">
                <p className="text-[15px] font-extrabold text-[#0b0b0b]">Safe</p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8A8983]">
                  Delivery
                </p>
              </div>
            </div>
          </FeatureCardShell>

          {/* Hassle-Free */}
          <FeatureCardShell
            delay={0.08}
            className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-6 lg:col-start-2 lg:row-start-1"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <Image
                src="/images/delivery/treasure/icon-envelope.png"
                alt=""
                width={52}
                height={52}
                className="h-[48px] w-[48px] object-contain sm:h-[52px] sm:w-[52px]"
              />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1EFE8] text-[12px] font-bold text-[#7A796F]">
                01
              </span>
            </div>
            <h3 className="mb-2 text-[20px] leading-[1.15] tracking-tight sm:text-[22px]">
              <AccentTitle lead="Hassle-Free" accent="Sending." />
            </h3>
            <p className="text-[12px] leading-[1.45] text-[#6F6E68] sm:text-[13px] sm:leading-[1.5]">
              Sending a parcel should be easy. Book a pickup in minutes, add the
              delivery details, and we&apos;ll take care of the rest. You are
              going to be updated at every step.
            </p>
          </FeatureCardShell>

          {/* Reliable Couriers */}
          <FeatureCardShell
            delay={0.12}
            className="relative overflow-hidden rounded-[28px] p-5 shadow-[0_10px_30px_rgba(253,184,19,0.28)] sm:p-6 lg:col-start-3 lg:row-start-1"
            style={{
              backgroundImage:
                "linear-gradient(145deg, #FCE001 0%, #FDB813 100%)",
            }}
          >
            <DashedOrbit className="-bottom-14 -right-14 h-48 w-48" />
            <div className="relative z-[1] mb-5 flex items-start justify-between gap-3">
              <Image
                src="/images/delivery/treasure/icon-medal.png"
                alt=""
                width={52}
                height={52}
                className="h-[48px] w-[48px] object-contain sm:h-[52px] sm:w-[52px]"
              />
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-[12px] font-bold text-white">
                02
              </span>
            </div>
            <h3 className="relative z-[1] mb-2 text-[20px] leading-[1.15] tracking-tight sm:text-[22px]">
              <AccentTitle
                lead="Reliable"
                accent="Couriers."
                leadClassName="text-[#0b0b0b]"
                accentClassName="font-medium italic text-[#0b0b0b]"
              />
            </h3>
            <p className="relative z-[1] text-[12px] leading-[1.45] text-[#2A2A2A] sm:text-[13px] sm:leading-[1.5]">
              You can trust our dedicated couriers to deliver your goods
              professionally, safely and on time. Every delivery is treated with
              the care it deserves.
            </p>
          </FeatureCardShell>

          {/* Cost-Effective */}
          <FeatureCardShell
            delay={0.16}
            className="relative overflow-hidden rounded-[28px] p-5 shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:p-6 lg:col-start-2 lg:col-end-4 lg:row-start-2"
            style={{
              backgroundImage:
                "linear-gradient(160deg, #2A2A2A 0%, #141414 55%, #0B0B0B 100%)",
            }}
          >
            <div className="relative z-[1] flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Image
                src="/images/delivery/treasure/icon-moneybag.png"
                alt=""
                width={84}
                height={84}
                className="h-[76px] w-[76px] shrink-0 object-contain drop-shadow-[0_0_26px_rgba(252,224,1,0.5)] sm:h-[84px] sm:w-[84px]"
              />
              <div className="min-w-0">
                <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0b0b0b]" />
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[10px]">
                    Clear Pricing
                  </span>
                </div>
                <h3 className="mb-2 text-[20px] leading-[1.15] tracking-tight sm:text-[22px]">
                  <span className="font-extrabold text-white">Affordable.</span>
                </h3>
                <p className="text-[12px] leading-[1.45] text-[#C8C7C1] sm:text-[13px] sm:leading-[1.5]">
                  Pay only for what you need. No hidden fees, clear pricing.
                  You&apos;ll always know the cost of delivery before confirming
                  your booking.
                </p>
              </div>
            </div>
          </FeatureCardShell>

          {/* Track — same column as image */}
          <FeatureCardShell
            delay={0.2}
            className="relative overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-6 lg:col-start-1 lg:row-start-3"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <Image
                src="/images/delivery/treasure/icon-pin.png"
                alt=""
                width={52}
                height={52}
                className="h-[48px] w-[48px] object-contain sm:h-[52px] sm:w-[52px]"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF7EE] px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0b0b0b]">
                  Live
                </span>
              </span>
            </div>
            <h3 className="mb-2 text-[20px] leading-[1.15] tracking-tight sm:text-[22px]">
              <AccentTitle lead="Track Your" accent="Package." />
            </h3>
            <p className="text-[12px] leading-[1.45] text-[#6F6E68] sm:text-[13px] sm:leading-[1.5]">
              See real time delivery tracking from pickup to delivery. Follow
              your parcel every step of the way and know exactly when it reaches
              its destination.
            </p>
          </FeatureCardShell>

          {/* Community */}
          <FeatureCardShell
            delay={0.24}
            className="relative flex h-full min-h-[140px] items-center overflow-hidden rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-6 lg:col-start-2 lg:col-end-4 lg:row-start-3"
          >
            <div className="relative z-[1] flex w-full items-center gap-3 sm:gap-4">
              <div className="flex shrink-0 items-center">
                {[
                  "/images/delivery/treasure/avatar-1.png",
                  "/images/delivery/treasure/avatar-2.png",
                  "/images/delivery/treasure/avatar-3.png",
                  "/images/delivery/treasure/avatar-plus.png",
                ].map((src, i) => (
                  <div
                    key={src}
                    className="relative h-16 w-16 shrink-0 sm:h-[68px] sm:w-[68px]"
                    style={{
                      marginLeft: i === 0 ? 0 : -28,
                      zIndex: i + 1,
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="68px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="min-w-0">
                <h3 className="mb-1.5 text-[20px] leading-[1.15] tracking-tight sm:text-[22px]">
                  <span className="font-extrabold text-[#0b0b0b]">
                    Community-
                  </span>
                  <em className="font-medium italic text-[#FDB813]">
                    Centric.
                  </em>
                </h3>
                <p className="text-[12px] leading-[1.45] text-[#6F6E68] sm:text-[13px] sm:leading-[1.5]">
                  Behind every successful delivery is a growing network of
                  dedicated riders helping people and businesses stay connected
                  across Pakistan.
                </p>
              </div>
            </div>
          </FeatureCardShell>
        </div>
      </div>
    </section>
  );
}
