"use client";

import { motion } from "framer-motion";
import PoolRideCard from "./PoolRideCard";
import MobileServicesLayout, {
  CLEAN_MOBILE_CARDS,
} from "@/components/services/MobileServicesLayout";
import DesktopServicesLayout, {
  type DesktopPhotoCardData,
} from "@/components/services/DesktopServicesLayout";

const DELIVERY_VIDEO = "/videos/delivery-bg.mp4";
const DELIVERY_MASK = "/images/taxi-stand/services/card-delivery-mask.png";
const TRIP_VIDEO = "/videos/trip-bg.mp4";
const TRIP_MASK = "/images/taxi-stand/services/card-trip-mask.png";
const LOGISTICS_VIDEO = "/videos/logistics-bg.mp4";
const LOGISTICS_MASK = "/images/taxi-stand/services/card-logistics-mask.png";
const TAXI_VIDEO = "/videos/taxi-stand-bg.mp4";
const TAXI_MASK = "/images/taxi-stand/services/card-taxi-mask.png";

const DESKTOP_CARDS: DesktopPhotoCardData[] = [
  {
    href: "/taxi-stand",
    image: "/images/taxi-stand/services/card-taxi.png",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Stand",
    subtitle: "City rides",
    video: TAXI_VIDEO,
    mask: TAXI_MASK,
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
    href: "/logistic",
    image: "/images/taxi-stand/services/card-logistics.png",
    icon: "/images/taxi-stand/services/icon-logistics.png",
    title: "Logistics",
    subtitle: "Fleet support",
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
    subtitle: "Fleet support",
    video: LOGISTICS_VIDEO,
    ...CLEAN_MOBILE_CARDS.logistics,
  },
  {
    href: "/taxi-stand",
    icon: "/images/taxi-stand/services/icon-taxi.png",
    title: "Taxi Stand",
    subtitle: "City rides",
    video: TAXI_VIDEO,
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
    subtitle: "Live tracking",
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
            Our <em className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">Services</em>
          </h2>
          <div className="mx-auto max-w-lg space-y-1 text-[14px] leading-snug text-[#6b6a64] sm:text-[15px]">
            <p className="font-semibold text-[#0b0b0b]">
              One app. Five ways to get where you need to go.
            </p>
            <p>
              Whether you&apos;re commuting every day, sending a parcel,
              planning a road trip, or managing business deliveries, Traveling
              Partner brings everything together in one easy-to-use platform.
            </p>
          </div>
        </motion.div>

        <MobileServicesLayout
          featured={<PoolRideCard variant="mobile" />}
          cards={MOBILE_CARDS}
        />

        <DesktopServicesLayout
          featured={<PoolRideCard variant="desktop" />}
          cards={DESKTOP_CARDS}
        />
      </div>
    </section>
  );
}
