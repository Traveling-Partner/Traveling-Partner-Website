"use client";

import { motion } from "framer-motion";

const features = [
  "Eagle Plaza, Blue Area, Islamabad",
  "Available nationwide via app",
  "Monday – Sunday · 24/7 support",
] as const;

/** Same physical place (Eagle Plaza / Roarworks building) — labeled as Traveling Partner */
const LOCATION_QUERY =
  "Eagle Plaza, G 7/3 Blue Area, Islamabad, 46000, Pakistan";

const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  LOCATION_QUERY
)}&z=17&hl=en&output=embed`;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  LOCATION_QUERY
)}`;

function CheckIcon() {
  return (
    <svg
      className="h-3 w-3 text-[#0b0b0b]"
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

function StatusCheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-white"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 10.5 8 14l7.5-8" />
    </svg>
  );
}

/** Figma map pin — black teardrop + red center + yellow accent */
function LocationPin() {
  return (
    <div className="relative h-[56px] w-[48px] sm:h-[64px] sm:w-[54px]" aria-hidden="true">
      <svg
        viewBox="0 0 54 64"
        className="h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.28)]"
        fill="none"
      >
        <path
          d="M27 2C15.4 2 6 11.4 6 23c0 14.2 16.4 33.2 19.6 36.8a2.2 2.2 0 0 0 2.8 0C31.6 56.2 48 37.2 48 23 48 11.4 38.6 2 27 2Z"
          fill="#0b0b0b"
        />
        <circle cx="27" cy="22" r="8.5" fill="#E53935" />
        <circle cx="27" cy="22" r="4" fill="#FF6B63" />
      </svg>
      {/* Yellow accent dot — Figma */}
      <span className="absolute right-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#FCE001] shadow-sm sm:h-4 sm:w-4" />
    </div>
  );
}

/**
 * Our Location — Figma split + Traveling Partner map pin.
 */
export default function OurLocationSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-14 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center rounded-full bg-[#FCE001] px-3.5 py-1.5 sm:mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
                Our Location
              </span>
            </div>

            <h2 className="mb-4 max-w-md font-poppins text-[clamp(30px,4.2vw,48px)] font-extrabold leading-[1.12] tracking-tight text-[#0b0b0b] sm:mb-5">
              Based in the{" "}
              <span className="font-medium italic text-[#FCE001]">heart</span> of
              Pakistan.
            </h2>

            <p className="mb-7 max-w-md text-[14px] leading-relaxed text-[#5c5b55] sm:mb-8 sm:text-[15px] sm:leading-[1.7]">
              Our headquarters sit in Islamabad — but our platform reaches every
              city in Pakistan where the internet does. Come say hello, or reach
              us from anywhere.
            </p>

            <ul className="flex flex-col gap-3.5 sm:gap-4">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCE001] sm:h-7 sm:w-7">
                    <CheckIcon />
                  </span>
                  <span className="text-[14px] font-semibold text-[#0b0b0b] sm:text-[15px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — real map + Figma pin */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="relative w-full"
          >
            <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] overflow-hidden rounded-[28px] bg-[#e8e4da] shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:rounded-[32px] lg:ml-auto lg:mr-0 lg:max-w-none lg:rounded-[36px]">
              <iframe
                title="Traveling Partner Pvt. Ltd — Eagle Plaza, Blue Area, Islamabad"
                src={MAP_EMBED_SRC}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.15] contrast-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Custom Figma pin — labeled Traveling Partner */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-1/2 top-[46%] z-10 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5 transition-transform duration-300 hover:scale-105"
                aria-label="Open Traveling Partner Pvt. Ltd location in Google Maps"
              >
                <span className="whitespace-nowrap rounded-full bg-[#0b0b0b] px-3 py-1 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.25)] sm:text-[12px]">
                  Traveling Partner Pvt. Ltd
                </span>
                <LocationPin />
              </a>

              {/* Open Now — Figma floating card */}
              <div className="pointer-events-none absolute right-3 top-3 z-10 flex items-center gap-2.5 rounded-[12px] bg-white px-2.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:right-4 sm:top-4 sm:gap-3 sm:rounded-[14px] sm:px-3 sm:py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-[#22c55e] sm:h-8 sm:w-8 sm:rounded-[9px]">
                  <StatusCheckIcon />
                </span>
                <span className="pr-0.5 text-left leading-tight">
                  <span className="block text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
                    Open Now
                  </span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9a968c] sm:text-[10px]">
                    24/7 Support
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
