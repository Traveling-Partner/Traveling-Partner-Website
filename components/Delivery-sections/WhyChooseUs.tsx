"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const FEATURES = [
  {
    step: "01",
    titleBold: "Trained &",
    titleItalic: "Verified Couriers.",
    description:
      "Every parcel goes through a trained, verified courier who actually knows how to handle a delivery properly. Important documents, customer orders, whatever it is, it's treated with care.",
    bold: ["trained, verified courier", "treated with care"] as const,
    icon: "/images/delivery/how-works/icon-04-shield.png",
  },
  {
    step: "02",
    titleBold: "Affordable",
    titleItalic: "Pricing.",
    description:
      "You'll know exactly what a delivery costs before you even book it. No surprise charges tacked on later, just a fair price for what you're actually getting.",
    bold: [
      "exactly what a delivery costs",
      "No surprise charges",
      "fair price",
    ] as const,
    icon: "/images/help-center/icon-payment.png",
  },
  {
    step: "03",
    titleBold: "Expert",
    titleItalic: "Support.",
    description:
      "Got a question or something went sideways with a delivery? Our support team's there to sort it out, fast.",
    bold: ["sort it out, fast"] as const,
    icon: "/images/help-center/icon-chat.png",
  },
  {
    step: "04",
    titleBold: "Save",
    titleItalic: "Time.",
    description:
      "Book a rider in a couple of minutes and let us take it from there. No extra trips across town, no standing around waiting.",
    bold: ["couple of minutes", "No extra trips across town"] as const,
    icon: "/images/logistic/services/icon-fast.png",
  },
] as const;

const accentItalicClass =
  "font-medium italic bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent";

export default function WhyChooseUs() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#FDFBF0] py-10 sm:py-12 lg:py-[52px]"
      aria-labelledby="why-choose-delivery-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(253,184,19,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — same language as Safety */}
        <motion.header
          className="mx-auto mb-7 max-w-[720px] text-center sm:mb-8 lg:mb-9"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            id="why-choose-delivery-heading"
            className="font-poppins text-[clamp(1.75rem,3.8vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b0b0b]"
          >
            Why Choose <span className={accentItalicClass}>Us?</span>
          </h2>

          <p className="mt-2.5 font-poppins text-[15px] font-semibold text-[#0b0b0b] sm:text-base">
            Delivery you can count on.
          </p>

          <p className="mx-auto mt-2.5 max-w-[640px] font-poppins text-[13px] font-normal leading-[1.55] text-[#5c5c5c] sm:text-[14px]">
            {emphasizePhrases(
              "Every delivery matters to us, whether it's a personal parcel or a business order. We built this service around one idea: get it there fast, keep you in the loop, and don't drop the ball between pickup and doorstep.",
              ["get it there fast", "keep you in the loop"],
            )}
          </p>
        </motion.header>

        {/* Desktop — one row of 4 (laptop-friendly height) */}
        <motion.div
          className="hidden gap-4 lg:grid lg:grid-cols-4 lg:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {FEATURES.map((feature) => (
            <article
              key={feature.step}
              className="group flex h-full flex-col rounded-[24px] border border-[#0b0b0b]/[0.05] bg-white p-5 shadow-[0_12px_36px_rgba(11,11,11,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#fce001] to-[#fdb813] p-[3px] shadow-[0_4px_14px_rgba(252,224,1,0.28)] ring-2 ring-white">
                  <span className="h-full w-full overflow-hidden rounded-[13px]">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </span>
                <span className="font-poppins text-[11px] font-bold tracking-[0.14em] text-[#0b0b0b]/35">
                  {feature.step}
                </span>
              </div>

              <h3 className="mb-2 font-poppins text-[clamp(1.05rem,1.4vw,1.25rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0b0b0b]">
                {feature.titleBold}{" "}
                <span className={accentItalicClass}>{feature.titleItalic}</span>
              </h3>

              <p className="font-poppins text-[12px] font-normal leading-[1.55] text-[#5c5c5c] xl:text-[13px]">
                {emphasizePhrases(feature.description, feature.bold)}
              </p>
            </article>
          ))}
        </motion.div>

        {/* Mobile / tablet — 2×2 */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:hidden">
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col rounded-[22px] border border-[#0b0b0b]/[0.05] bg-white p-4 shadow-[0_12px_32px_rgba(11,11,11,0.06)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#fce001] to-[#fdb813] p-[2.5px] shadow-[0_4px_12px_rgba(252,224,1,0.25)] ring-2 ring-white">
                  <span className="h-full w-full overflow-hidden rounded-[10px]">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </span>
                <span className="font-poppins text-[10px] font-bold tracking-[0.14em] text-[#0b0b0b]/35">
                  {feature.step}
                </span>
              </div>

              <h3 className="mb-1.5 font-poppins text-[1.05rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0b0b0b]">
                {feature.titleBold}{" "}
                <span className={accentItalicClass}>{feature.titleItalic}</span>
              </h3>

              <p className="font-poppins text-[12px] font-normal leading-[1.5] text-[#5c5c5c] sm:text-[13px]">
                {emphasizePhrases(feature.description, feature.bold)}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
