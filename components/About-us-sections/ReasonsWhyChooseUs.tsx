"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Reason = {
  image: string;
  imageAlt: string;
  title: ReactNode;
  description: string;
  featured?: boolean;
};

const reasons: Reason[] = [
  {
    image: "/images/about/choose/card-community.png",
    imageAlt: "One app for every journey",
    title: (
      <>
        One{" "}
        <span className="font-medium italic text-[#FCE001]">App.</span>
      </>
    ),
    description:
      "Ride booking, parcel delivery, business logistics, and intercity travel—all in one place.",
  },
  {
    image: "/images/about/choose/card-commission.png",
    imageAlt: "Fair pricing with upfront fares",
    title: (
      <>
        Fair{" "}
        <span className="font-medium italic">Pricing.</span>
      </>
    ),
    description:
      "Know your fare before you book. No hidden fees. No unexpected costs.",
    featured: true,
  },
  {
    image: "/images/about/choose/card-empowerment.png",
    imageAlt: "Verified drivers and couriers",
    title: (
      <>
        Verified{" "}
        <span className="font-medium italic text-[#FCE001]">Network.</span>
      </>
    ),
    description:
      "Every driver and courier completes our verification process before accepting bookings.",
  },
];

function ReasonCard({ reason, delay }: { reason: Reason; delay: number }) {
  const featured = Boolean(reason.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_14px_36px_rgba(11,11,11,0.07)] sm:rounded-[32px]"
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
        <Image
          src={reason.image}
          alt={reason.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className={`flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-5 sm:pt-4 lg:px-6 lg:pb-6 ${
          featured
            ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
            : "bg-white"
        }`}
      >
        <h3 className="mb-2 font-poppins text-[17px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] sm:mb-2.5 sm:text-[19px] lg:text-[20px]">
          {reason.title}
        </h3>
        <p
          className={`text-[12.5px] leading-[1.5] sm:text-[13.5px] sm:leading-[1.55] ${
            featured ? "text-[#0b0b0b]/80" : "text-[#5c5b55]"
          }`}
        >
          {reason.description}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Reasons Why Choose Us — 1:1 Figma 3-card section for About page.
 */
export default function ReasonsWhyChooseUs() {
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#F3EBD2] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
              Why Choose Us
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.2vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Reasons Why{" "}
            <span className="font-medium italic text-[#FCE001]">Choose Us.</span>
          </h2>

          <p className="mx-auto max-w-xl text-[14px] leading-relaxed text-[#5c5b55] sm:text-[15px] sm:leading-[1.65] md:text-[16px]">
            Travel, send, or deliver whenever you need to, using one simple
            platform.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              reason={reason}
              delay={0.08 + index * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
