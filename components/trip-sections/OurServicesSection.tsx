"use client";

import { motion } from "framer-motion";
import TripCard from "./TripCard";
import MobileServicesLayout, {
  CLEAN_MOBILE_CARDS,
} from "@/components/services/MobileServicesLayout";
import DesktopServicesLayout, {
  type DesktopPhotoCardData,
} from "@/components/services/DesktopServicesLayout";

const POOL_VIDEO = "/videos/pool-bg.mp4";
const POOL_MASK = "/images/taxi-stand/services/card-pool-mask.png";
const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const LOGISTICS_VIDEO = "/videos/logistics-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";
const TAXI_VIDEO = "/videos/taxi-stand-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";

const DESKTOP_CARDS: DesktopPhotoCardData[] = [
  {
    href: "/pool-ride",
    image: "/images/taxi-stand/services/card-pool.png",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Share the cost of the journey",
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
    subtitle: "Follow from pickup to destination",
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
    subtitle: "Fleet support for business deliveries",
    video: LOGISTICS_VIDEO,
    mask: LOGISTICS_MASK,
    slot: "bottomLeft",
    contentClassName: "left-[25.3%] top-[13.7%]",
  },
  {
    href: "/taxi-stand",
    image: "/images/taxi-stand/services/card-trip.png",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Ride",
    subtitle: "City rides with clear fares",
    video: TAXI_VIDEO,
    mask: TRIP_MASK,
    slot: "bottomRight",
    contentClassName: "left-[9.7%] top-[12.5%]",
  },
];

/** Trip is featured — other four services in the interlocking grid */
const MOBILE_CARDS = [
  {
    href: "/logistic",
    icon: "/images/taxi-stand/services/icon-logistics.png",
    title: "Logistics",
    subtitle: "Fleet support for business deliveries",
    video: LOGISTICS_VIDEO,
    ...CLEAN_MOBILE_CARDS.logistics,
  },
  {
    href: "/pool-ride",
    icon: "/images/taxi-stand/services/icon-pool.png",
    title: "Pool Ride",
    subtitle: "Share the cost of the journey",
    video: POOL_VIDEO,
    ...CLEAN_MOBILE_CARDS.pool,
  },
  {
    href: "/taxi-stand",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Ride",
    subtitle: "City rides with clear fares",
    video: TAXI_VIDEO,
    ...CLEAN_MOBILE_CARDS.trip,
  },
  {
    href: "/delivery",
    icon: "/images/taxi-stand/services/icon-delivery.png",
    title: "Delivery",
    subtitle: "Follow from pickup to destination",
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
          <div className="mb-5 inline-flex items-center rounded-full bg-[#F3EBD2] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0b0b0b] sm:text-[11px]">
              Learn More About Our Services
            </span>
          </div>

          <h2 className="mb-3 text-[32px] font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[52px]">
            More Than{" "}
            <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Tourism.</em>
          </h2>
          <p className="mx-auto max-w-lg text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px]">
            Traveling Partner brings everyday transport, delivery, and business
            services together in one app.
          </p>
        </motion.div>

        <MobileServicesLayout
          featured={<TripCard variant="mobile" />}
          cards={MOBILE_CARDS}
        />

        <DesktopServicesLayout
          featured={<TripCard variant="desktop" />}
          cards={DESKTOP_CARDS}
        />
      </div>
    </section>
  );
}
