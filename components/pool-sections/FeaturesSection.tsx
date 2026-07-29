"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

type Feature = {
  tag: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  description: string;
  descriptionBold?: readonly string[];
  featured?: boolean;
  /** Light tag = white pill + black text (side cards); dark = black pill + white */
  tagLight?: boolean;
};

const features: Feature[] = [
  {
    tag: "In-City · Inter-City",
    image: "/images/pool-ride/features/card-city.png",
    imageAlt: "Pool ride in and out of the city",
    title: (
      <>
        In & out of{" "}
        <em className="font-medium italic text-[#FDB813]">city</em>
      </>
    ),
    description:
      "Going to work, university, the airport, or meeting friends? Pool Ride works for both short city trips and longer routes, giving you a simple way to travel while sharing the cost with others heading the same way.",
    tagLight: true,
  },
  {
    tag: "Safe · Comfort",
    image: "/images/pool-ride/features/card-female.png",
    imageAlt: "Female-only pool ride",
    title: (
      <>
        Female -<em className="font-medium italic">Only</em>
      </>
    ),
    description:
      "Travel with added confidence using female-only rides where available. It's a comfortable option for women who prefer to share their journey with female riders and verified female drivers.",
    descriptionBold: ["female-only rides"],
    featured: true,
  },
  {
    tag: "Real-Time",
    image: "/images/pool-ride/features/card-tracking.png",
    imageAlt: "Live tracking on your phone",
    title: (
      <>
        Live{" "}
        <em className="font-medium italic text-[#FDB813]">tracking</em>
      </>
    ),
    description:
      "Know exactly where your ride is from the moment it's booked until you arrive. Real-Time GPS Tracking lets you track your journey, share your live location, and travel with more confidence.",
    descriptionBold: ["Real-Time GPS Tracking"],
    tagLight: true,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const featured = Boolean(feature.featured);
  const tagLight = Boolean(feature.tagLight);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_16px_44px_rgba(0,0,0,0.22)]"
    >
      {/* Image — flush against content, no color strip under photo */}
      <div className="relative aspect-[2/1.08] w-full shrink-0 overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="scale-[1.02] object-cover object-center"
          priority
        />

        <div
          className={`absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-[2px] ${
            tagLight ? "bg-white/95" : "bg-black/75"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#FCE001]" />
          <span
            className={`text-[9px] font-bold uppercase tracking-[0.14em] sm:text-[10px] ${
              tagLight ? "text-black" : "text-white"
            }`}
          >
            {feature.tag}
          </span>
        </div>
      </div>

      {/* Text — yellow only on featured card body (not behind image) */}
      <div
        className="relative z-[1] -mt-px flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5"
        style={
          featured
            ? {
                backgroundImage:
                  "linear-gradient(180deg, #FFEE5C 0%, #FCE001 55%, #FDB813 100%)",
              }
            : { backgroundColor: "#ffffff" }
        }
      >
        <h3 className="mb-2.5 text-[20px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] sm:text-[22px]">
          {feature.title}
        </h3>
        <p className="text-[12px] leading-relaxed text-[#2a2a2a] sm:text-[13px]">
          {emphasizePhrases(
            feature.description,
            feature.descriptionBold ?? [],
            "onLight",
          )}
        </p>
      </div>
    </motion.article>
  );
}

export default function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-16 lg:py-20">
      {/* Night road background */}
      <div className="absolute inset-0">
        <Image
          src="/images/pool-ride/features/features-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
          aria-hidden="true"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FCE001] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black sm:text-[11px]">
              Features
            </span>
          </div>

          <h2 className="mb-3 text-[clamp(28px,5.5vw,48px)] font-extrabold leading-[1.15] tracking-tight text-white">
            Best Things About{" "}
            <em className="font-medium italic text-[#FCE001]">Pool Ride</em>
          </h2>

          <div className="mx-auto max-w-xl space-y-2 text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            <p className="font-semibold text-white">
              Everything you need for a better shared ride.
            </p>
            <p>
              Each Pool Ride is designed to be a more affordable, comfortable,
              and reliable way to get around every day. Whether you&apos;re
              commuting to work or heading across the city, these features help
              make every trip a little easier.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3 md:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.tag} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
