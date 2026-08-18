"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Verified Travel Drivers",
    description:
      "Travel with drivers who complete the Traveling Partner’s verification process before joining the platform. From pickup to your destination, your journey stays connected through one booking.",
  },
  {
    title: "Flexible Travel Plans",
    description:
      "Planning a family trip, group tour or weekend getaway? Select the date, time and route that fits your travel plans.",
  },
  {
    title: "Fare Visibility",
    description:
      "Review the applicable fare before confirming your booking, so you know the expected cost of your journey.",
  },
  {
    title: "Comfortable Travel",
    description:
      "Sit back and enjoy the journey. Your driver handles the road while you focus on the places, people, and experiences ahead.",
  },
] as const;

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3 text-black"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

export default function TripWeekend() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 45% 40% at 92% 8%, rgba(252,224,1,0.22), transparent 65%),
            radial-gradient(ellipse 40% 35% at 8% 90%, rgba(253,184,19,0.12), transparent 70%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8 xl:gap-8">
          {/* Left: photo + trusted badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-[480px] lg:max-w-[460px] lg:shrink-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:rounded-[32px] lg:min-h-[560px] lg:rounded-[36px]">
              <Image
                src="/images/trip/weekend/weekend-photo.png"
                alt="Friends enjoying a weekend road trip with Traveling Partner"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>

            <div
              className="absolute -left-3 -top-2 z-10 rounded-2xl bg-[#0b0b0b] px-4 py-3 shadow-[0_14px_36px_rgba(0,0,0,0.28)] sm:-left-4 sm:-top-3 sm:px-5 sm:py-3.5 lg:-left-5 lg:-top-4"
              style={{ transform: "rotate(-3deg)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[11px]">
                Trusted By
              </p>
              <p className="text-[16px] font-extrabold leading-tight text-white sm:text-[18px]">
                10K + Travelers
              </p>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex w-full max-w-xl flex-col lg:min-w-0 lg:flex-1 lg:max-w-none"
          >
            <div className="mb-5 inline-flex w-fit items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-1.5 sm:mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
                Why Choose a Traveling Partner for Tourism?
              </span>
            </div>

            <h2 className="mb-4 max-w-lg font-poppins text-[clamp(28px,4.5vw,46px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:mb-5">
              Why Choose a Traveling Partner for{" "}
              <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
                Tourism?
              </span>
            </h2>

            <p className="mb-6 max-w-lg space-y-3 text-[14px] leading-relaxed text-[#5c5b55] sm:mb-7 sm:text-[15px]">
              <span className="block">
                Every journey is different. Some people plan a family vacation
                weeks ahead, while others decide on a weekend trip at the last
                minute.
              </span>
              <span className="block">
                Traveling Partner gives you a simpler way to arrange tourism
                transport in Pakistan. Choose your destination, plan your travel
                around your schedule, and book a verified travel driver without
                managing transport through multiple contacts.
              </span>
            </p>

            <div
              className="mb-6 border-t border-dashed border-black/15 sm:mb-7"
              aria-hidden="true"
            />

            <ul className="mb-6 flex flex-col gap-3.5 sm:mb-7 sm:gap-4">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]">
                    <CheckIcon />
                  </span>
                  <span className="text-[14px] leading-snug text-[#0b0b0b] sm:text-[15px]">
                    <strong className="font-bold">{feature.title}</strong>
                    {" — "}
                    {feature.description}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div
              className="mb-6 border-t border-dashed border-black/15 sm:mb-7"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3.5 py-3.5 shadow-[0_10px_28px_rgba(253,184,19,0.25)] sm:px-4 sm:py-4">
                <div className="relative h-11 w-11 shrink-0 sm:h-12 sm:w-12">
                  <Image
                    src="/images/trip/weekend/icon-group.png"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                    Family & Groups
                  </p>
                  <p className="text-[12px] text-[#0b0b0b]/75 sm:text-[13px]">
                    Trips & getaways
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3.5 shadow-[0_10px_28px_rgba(11,11,11,0.06)] sm:px-4 sm:py-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl sm:h-12 sm:w-12">
                  <Image
                    src="/images/trip/weekend/icon-clock.png"
                    alt=""
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
                    Flexible Plans
                  </p>
                  <p className="text-[12px] text-[#5c5b55] sm:text-[13px]">
                    Your schedule
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
