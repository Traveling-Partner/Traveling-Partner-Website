"use client";

import Image from "next/image";

const STEPS = [
  {
    step: "01",
    title: "Download the App",
    description:
      "Download Traveling Partner and create your account in just a few minutes.",
    icon: "/images/delivery/how-works/icon-01-phone.png",
    featured: true,
  },
  {
    step: "02",
    title: "Add Your Delivery Details",
    description:
      "Pop in the pickup spot, where it's headed, who's receiving it, and a few details about the parcel itself.",
    icon: "/images/delivery/how-works/icon-02-clipboard.png",
    featured: false,
  },
  {
    step: "03",
    title: "Get Matched with a Rider",
    description:
      "We'll find you the closest available rider so pickup happens fast.",
    icon: "/images/delivery/how-works/icon-03-people.png",
    featured: false,
  },
  {
    step: "04",
    title: "Confirm and You're Set",
    description:
      "Give the details and the fare a quick look, then hit confirm.",
    icon: "/images/delivery/how-works/icon-04-shield.png",
    featured: false,
  },
  {
    step: "05",
    title: "Track it",
    description:
      "Follow your parcel in real time until it lands safely at its destination.",
    icon: "/images/delivery/how-works/icon-05-pin.png",
    featured: false,
  },
];

const cardBase =
  "group relative flex flex-col rounded-[18px] bg-[#141414] transition-all duration-300 " +
  "hover:border-[#FDB813] hover:bg-gradient-to-b hover:from-[#FCE001] hover:to-[#FDB813] hover:shadow-[0_0_22px_rgba(253,184,19,0.35)]";

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
        item.featured ? "flex min-h-[295px] flex-col" : "min-h-[230px]",
        "border border-white/[0.06]",
        className,
      ].join(" ")}
    >
      <div className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-2 py-0.5 transition-colors duration-300 group-hover:bg-[#0b0b0b]">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#0b0b0b] transition-colors duration-300 group-hover:text-[#FCE001]">
          {item.step} Step
        </span>
      </div>

      <div className="mb-2.5 h-[56px] w-[56px] shrink-0 overflow-hidden rounded-[14px]">
        <Image
          src={item.icon}
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
        />
      </div>

      <h3 className="mb-1 text-[14px] font-extrabold leading-[1.2] tracking-tight text-white transition-colors duration-300 group-hover:text-[#0b0b0b] xl:text-[15px]">
        {item.title}
      </h3>

      <p
        className={[
          "text-[11px] leading-[1.4] text-[#9A9A9A] transition-colors duration-300 group-hover:text-[#2A2A2A]",
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
          <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3.5 py-1">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[10px]">
              Simple Process
            </span>
          </div>

          <h2 className="mb-2.5 text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[42px]">
            How Delivery{" "}
            <em className="font-medium italic text-[#FDB813]">Works.</em>
          </h2>

          <p className="mx-auto max-w-[480px] text-[13px] leading-[1.6] text-[#A8A8A8] sm:text-[14px]">
            Sending a parcel is simple.
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
            className="pointer-events-none absolute z-[5] h-[10px] w-[10px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
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
