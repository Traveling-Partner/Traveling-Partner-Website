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
  "group relative flex flex-col rounded-[18px] border border-white/[0.06] bg-[#141414] transition-all duration-300 " +
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
          ? "min-h-[320px] border-[#FCE001] shadow-[0_0_0_1px_rgba(252,224,1,0.35),0_0_22px_rgba(252,224,1,0.32)]"
          : "min-h-[230px]",
        className,
      ].join(" ")}
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

      <p className="text-[12px] leading-[1.5] text-[#9A9A9A] transition-colors duration-300 group-hover:text-[#2A2A2A]">
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

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-9 lg:mb-10">
          <div className="mb-4 inline-flex items-center rounded-full bg-[#FCE001] px-3.5 py-1">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[10px]">
              Simple Process
            </span>
          </div>

          <h2 className="mb-2.5 text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[42px]">
            How Delivery <span className="text-[#FCE001]">Works.</span>
          </h2>

          <p className="mx-auto max-w-[480px] text-[13px] leading-[1.6] text-[#A8A8A8] sm:text-[14px]">
            Five simple steps between you and a delivered parcel — from booking
            to doorstep.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:items-end lg:gap-2.5 xl:gap-3">
          <div className="relative col-span-5 mb-0 h-9">
            <div
              className="absolute top-[9px] h-[2px] bg-[#FCE001]"
              style={{ left: "calc(10% + 0px)", right: "calc(10% - 5px)" }}
            />
            <div
              className="absolute top-[5px] h-[10px] w-[10px] rounded-full bg-[#FCE001]"
              style={{ right: "calc(10% - 10px)" }}
            />
            <div className="grid h-full grid-cols-5 gap-2.5 xl:gap-3">
              {STEPS.map((s) => (
                <div
                  key={`t-${s.step}`}
                  className="relative flex justify-center"
                >
                  <span className="absolute top-[5px] z-[1] h-[10px] w-[10px] rounded-full border-[2px] border-[#FCE001] bg-[#0A0A0A]" />
                  <span className="absolute top-[15px] h-[21px] w-[2px] bg-[#FCE001]" />
                </div>
              ))}
            </div>
          </div>

          {STEPS.map((item) => (
            <StepCard key={item.step} item={item} className="p-4" />
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
                item.featured ? "!min-h-[300px]" : "!min-h-[210px]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
