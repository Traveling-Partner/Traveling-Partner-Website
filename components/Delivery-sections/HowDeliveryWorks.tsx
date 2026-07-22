"use client";

import Image from "next/image";

const STEPS = [
  {
    step: "01",
    title: "Download the App",
    description:
      "Get started with our easy-to-use mobile application in under 60 seconds.",
    icon: "/images/delivery/how-works/icon-01-phone.png",
    featured: true,
  },
  {
    step: "02",
    title: "Add Details",
    description:
      "Date, time, items, pickup & drop-off addresses, contact number.",
    icon: "/images/delivery/how-works/icon-02-clipboard.png",
    featured: false,
  },
  {
    step: "03",
    title: "Choose Rider",
    description:
      "Select preferred gender (Male or Female) and courier of your choice.",
    icon: "/images/delivery/how-works/icon-03-people.png",
    featured: false,
  },
  {
    step: "04",
    title: "Confirm Rider",
    description:
      "Review and confirm your selected delivery partner and negotiated fare.",
    icon: "/images/delivery/how-works/icon-04-shield.png",
    featured: false,
  },
  {
    step: "05",
    title: "Track Delivery",
    description:
      "Driver reaches pickup location on time. Watch every step, live.",
    icon: "/images/delivery/how-works/icon-05-pin.png",
    featured: false,
  },
];

const cardBase =
  "group relative flex flex-col rounded-[18px] bg-[#141414] transition-all duration-300 " +
  "hover:border-[#FCE001] hover:bg-[#FCE001] hover:shadow-[0_0_22px_rgba(252,224,1,0.35)]";

function StepCard({
  item,
  className = "",
}: {
  item: (typeof STEPS)[number];
  className?: string;
}) {
  return (
    <article
      className={[
        cardBase,
        item.featured
          ? "flex min-h-[295px] flex-col border-2 border-solid !border-[#FCE001] shadow-[0_0_22px_rgba(252,224,1,0.32)]"
          : "min-h-[230px] border border-white/[0.06]",
        className,
      ].join(" ")}
      style={
        item.featured
          ? { borderColor: "#FCE001", borderStyle: "solid", borderWidth: 2 }
          : undefined
      }
    >
      <div className="mb-3 inline-flex w-fit items-center rounded-full bg-[#FCE001] px-2 py-0.5 transition-colors duration-300 group-hover:bg-[#0b0b0b]">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0b0b0b] transition-colors duration-300 group-hover:text-[#FCE001]">
          {item.step} Step
        </span>
      </div>

      <div className="mb-3.5 h-[64px] w-[64px] overflow-hidden rounded-[14px]">
        <Image
          src={item.icon}
          alt=""
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mb-1.5 text-[16px] font-extrabold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#0b0b0b]">
        {item.title}
      </h3>

      <p
        className={[
          "text-[12px] leading-[1.5] text-[#9A9A9A] transition-colors duration-300 group-hover:text-[#2A2A2A]",
          item.featured ? "mt-5" : "",
        ].join(" ")}
      >
        {item.description}
      </p>
    </article>
  );
}

export default function HowDeliveryWorks() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-12 sm:py-14 lg:py-16">
      <Image
        src="/images/delivery/how-works/bg-section.png"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-9 lg:mb-10">
          <div className="mb-4 inline-flex items-center rounded-full bg-[#FCE001] px-3.5 py-1">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[10px]">
              Simple Process
            </span>
          </div>

          <h2 className="mb-2.5 text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[42px]">
            How Delivery{" "}
            <em className="font-medium italic text-[#FDB813]">Works.</em>
          </h2>

          <p className="mx-auto max-w-[480px] text-[13px] leading-[1.6] text-[#A8A8A8] sm:text-[14px]">
            Five simple steps between you and a delivered parcel — from booking
            to doorstep.
          </p>
        </div>

        {/* Desktop — small fixed connectors; line flush with big card (no gap) */}
        <div className="relative hidden lg:grid lg:grid-cols-5 lg:items-end lg:gap-x-2.5 xl:gap-x-3">
          {/*
            Track starts at the right edge of card 1 so it looks like it
            comes out of the Download card — no visible gap.
            gap-x-2.5 → 4 gaps = 2.5rem; xl:gap-x-3 → 3rem (handled approx by %).
          */}
          <div
            className="pointer-events-none absolute z-[5] h-[2px] bg-[#FCE001] max-xl:left-[calc((100%-2.5rem)/5-1px)] xl:left-[calc((100%-3rem)/5-1px)]"
            style={{
              right: "calc(10% - 6px)",
              bottom: "calc(230px + 17px)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute z-[5] h-[10px] w-[10px] rounded-full bg-[#FCE001]"
            style={{
              right: "calc(10% - 11px)",
              bottom: "calc(230px + 13px)",
            }}
            aria-hidden="true"
          />

          {STEPS.map((item, i) => (
            <div key={item.step} className="relative">
              {i > 0 && (
                <div
                  className="pointer-events-none absolute left-1/2 top-0 z-[6] flex -translate-x-1/2 -translate-y-full flex-col items-center"
                  aria-hidden="true"
                >
                  <span className="h-[10px] w-[10px] shrink-0 rounded-full border-[2px] border-[#FCE001] bg-[#0A0A0A]" />
                  <span className="h-3 w-[2px] shrink-0 bg-[#FCE001]" />
                </div>
              )}
              <StepCard
                item={item}
                className={[
                  "relative z-[1] p-4",
                  // Pull first card above the track so the line meets its side flush
                  i === 0 ? "z-[2]" : "",
                ].join(" ")}
              />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STEPS.map((item) => (
            <StepCard
              key={`m-${item.step}`}
              item={item}
              className={[
                "w-[min(78vw,230px)] shrink-0 snap-center p-3.5 sm:w-[210px] sm:p-4",
                item.featured ? "!min-h-[275px]" : "!min-h-[210px]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
