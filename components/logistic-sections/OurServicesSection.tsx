"use client";

import { motion } from "framer-motion";
import LogisticsCard from "./LogisticsCard";
import MobileServicesLayout, {
  CLEAN_MOBILE_CARDS,
} from "@/components/services/MobileServicesLayout";
import DesktopServicesLayout, {
  type DesktopPhotoCardData,
} from "@/components/services/DesktopServicesLayout";

const POOL_VIDEO = "/videos/pool-bg.mp4";
const POOL_MASK = "/images/taxi-stand/services/card-pool-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";
const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const TAXI_VIDEO = "/videos/taxi-stand-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";

const DESKTOP_CARDS: DesktopPhotoCardData[] = [
  {
    href: "/pool-ride",
    image: "/images/taxi-stand/services/card-pool.png",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Split the cost",
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
    subtitle: "Live tracking",
    video: DELIVERY_VIDEO,
    mask: DELIVERY_MASK,
    slot: "topRight",
    contentClassName: "left-[9.4%] top-[13.7%]",
  },
  {
    href: "/taxi-stand",
    image: "/images/taxi-stand/services/card-logistics.png",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Ride",
    subtitle: "Upfront fares",
    video: TAXI_VIDEO,
    mask: LOGISTICS_MASK,
    slot: "bottomLeft",
    contentClassName: "left-[25.3%] top-[13.7%]",
  },
  {
    href: "/tourism",
    image: "/images/taxi-stand/services/card-trip.png",
    icon: "/images/taxi-stand/services/icon-trip.png",
    title: "Tourism",
    subtitle: "Your schedule",
    video: TRIP_VIDEO,
    mask: TRIP_MASK,
    slot: "bottomRight",
    contentClassName: "left-[9.7%] top-[12.5%]",
  },
];

/** Same interlocking shapes as Taxi / Pool / Delivery — Logistics is featured */
const MOBILE_CARDS = [
  {
    href: "/taxi-stand",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Ride",
    subtitle: "Upfront fares",
    video: TAXI_VIDEO,
    ...CLEAN_MOBILE_CARDS.logistics,
  },
  {
    href: "/pool-ride",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Split the cost",
    video: POOL_VIDEO,
    ...CLEAN_MOBILE_CARDS.pool,
  },
  {
    href: "/tourism",
    icon: "/images/taxi-stand/services/icon-trip.png",
    title: "Tourism",
    subtitle: "Your schedule",
    video: TRIP_VIDEO,
    ...CLEAN_MOBILE_CARDS.trip,
  },
  {
    href: "/delivery",
    icon: "/images/taxi-stand/services/icon-delivery.png",
    title: "Delivery",
    subtitle: "Live tracking",
    video: DELIVERY_VIDEO,
    ...CLEAN_MOBILE_CARDS.delivery,
  },
];

export default function OurServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEFBF6] pt-8 pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center sm:mb-10 lg:mb-12"
        >
          <h2 className="mb-3 text-[32px] font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[52px]">
            Explore More <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Services</em>
          </h2>
          <div className="mx-auto max-w-lg space-y-1.5 text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px]">
            <p className="font-semibold text-[#0b0b0b]">More than logistics.</p>
            <p>
              One app can do a lot more than move freight. Need a ride across
              town? Sending a parcel? Sharing a trip? Planning an intercity
              journey? It&apos;s all there when you need it.
            </p>
          </div>
        </motion.div>

        <MobileServicesLayout
          featured={<LogisticsCard variant="mobile" />}
          cards={MOBILE_CARDS}
        />

        <DesktopServicesLayout
          featured={<LogisticsCard variant="desktop" />}
          cards={DESKTOP_CARDS}
        />
      </div>
    </section>
  );
}
