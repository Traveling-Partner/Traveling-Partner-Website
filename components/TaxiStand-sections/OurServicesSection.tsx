"use client";

import { motion } from "framer-motion";
import TaxiStandCard from "./TaxiStandCard";
import MobileServicesLayout, {
  CLEAN_MOBILE_CARDS,
} from "@/components/services/MobileServicesLayout";
import DesktopServicesLayout, {
  type DesktopPhotoCardData,
} from "@/components/services/DesktopServicesLayout";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";
const POOL_VIDEO = "/videos/pool-bg.mp4";
const POOL_MASK = "/images/taxi-stand/services/card-pool-mask.png";
const LOGISTICS_VIDEO = "/videos/logistics-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";

/** Exact Figma Frame 11 content offsets (icon+label groups). */
const DESKTOP_CARDS: DesktopPhotoCardData[] = [
  {
    href: "/pool-ride",
    image: "/images/taxi-stand/services/card-pool.png",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Share & save",
    video: POOL_VIDEO,
    mask: POOL_MASK,
    slot: "topLeft",
    contentClassName: "left-[17.7%] top-[11.1%]",
  },
  {
    href: "/delivery",
    image: "/images/taxi-stand/services/card-delivery.png",
    icon: "/images/taxi-stand/services/icon-delivery.png",
    title: "Delivery",
    subtitle: "Across the city",
    video: DELIVERY_VIDEO,
    mask: DELIVERY_MASK,
    slot: "topRight",
    contentClassName: "left-[9.4%] top-[13.7%]",
  },
  {
    href: "/logistic",
    image: "/images/taxi-stand/services/card-logistics.png",
    icon: "/images/taxi-stand/services/icon-logistics.png",
    title: "Logistics",
    subtitle: "Reliable fleet support",
    video: LOGISTICS_VIDEO,
    mask: LOGISTICS_MASK,
    slot: "bottomLeft",
    contentClassName: "left-[25.3%] top-[13.7%]",
  },
  {
    href: "/tourism",
    image: "/images/taxi-stand/services/card-trip.png",
    icon: "/images/taxi-stand/services/icon-trip.png",
    title: "Tourism",
    subtitle: "City to city",
    video: TRIP_VIDEO,
    mask: TRIP_MASK,
    slot: "bottomRight",
    contentClassName: "left-[9.7%] top-[12.5%]",
  },
];

const MOBILE_CARDS = [
  {
    href: "/logistic",
    icon: "/images/taxi-stand/services/icon-logistics.png",
    title: "Logistics",
    subtitle: "Reliable fleet support",
    video: LOGISTICS_VIDEO,
    ...CLEAN_MOBILE_CARDS.logistics,
  },
  {
    href: "/pool-ride",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Share & save",
    video: POOL_VIDEO,
    ...CLEAN_MOBILE_CARDS.pool,
  },
  {
    href: "/tourism",
    icon: "/images/taxi-stand/services/icon-trip.png",
    title: "Tourism",
    subtitle: "City to city",
    video: TRIP_VIDEO,
    ...CLEAN_MOBILE_CARDS.trip,
  },
  {
    href: "/delivery",
    icon: "/images/taxi-stand/services/icon-delivery.png",
    title: "Delivery",
    subtitle: "Across the city",
    video: DELIVERY_VIDEO,
    ...CLEAN_MOBILE_CARDS.delivery,
  },
];

export default function OurServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] py-14 sm:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <h2 className="mb-3 text-[32px] font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[52px]">
            Our <em className="font-medium italic text-[#FDB813]">Services</em>
          </h2>
          <p className="mx-auto mb-1.5 max-w-lg text-[15px] font-semibold leading-snug text-[#0b0b0b] sm:text-base">
            One app. Different ways to get around.
          </p>
          <p className="mx-auto max-w-lg text-[14px] leading-snug text-[#6b6a64] sm:text-[15px]">
            {emphasizePhrases(
              "Whether you need a taxi service, want to share a ride, send a parcel, move business deliveries, or plan an out-of-town trip, Traveling Partner brings everything together in one place.",
              ["taxi service"],
              "onLight",
            )}
          </p>
        </motion.div>

        <MobileServicesLayout
          featured={<TaxiStandCard variant="mobile" />}
          cards={MOBILE_CARDS}
        />

        <DesktopServicesLayout
          featured={<TaxiStandCard variant="desktop" />}
          cards={DESKTOP_CARDS}
        />
      </div>
    </section>
  );
}
