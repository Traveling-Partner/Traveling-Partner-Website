"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Service = {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: "/images/logistic/services/icon-booking.png",
    iconAlt: "Simple booking",
    title: "Simple Booking",
    description:
      "Empower yourself with easy and user-friendly booking procedures.",
  },
  {
    icon: "/images/logistic/services/icon-pickup.png",
    iconAlt: "On time pickup",
    title: "On Time Pickup",
    description:
      "Take control of your logistics schedule with on-time pickups as per your convenience.",
  },
  {
    icon: "/images/logistic/services/icon-fast.png",
    iconAlt: "Fast shipments",
    title: "Fast Shipments",
    description:
      "Swift and efficient handling of your shipments, driven by your priorities.",
    featured: true,
  },
  {
    icon: "/images/logistic/services/icon-delivery.png",
    iconAlt: "On-time delivery",
    title: "On-Time Delivery",
    description:
      "Ensure punctual delivery by actively managing and overseeing the logistics process.",
  },
  {
    icon: "/images/logistic/services/icon-save.png",
    iconAlt: "Save time and money",
    title: "Save Time & Money",
    description:
      "Optimize your logistics operations independently, saving both time and money.",
  },
];

function ServiceCard({
  service,
  delay,
}: {
  service: Service;
  delay: number;
}) {
  const featured = Boolean(service.featured);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
      className={`flex h-full flex-col items-center rounded-[24px] px-4 py-7 text-center sm:rounded-[28px] sm:px-5 sm:py-8 ${
        featured
          ? "border border-black bg-[#FCE001] shadow-[0_14px_32px_rgba(253,184,19,0.28)]"
          : "bg-white shadow-[0_10px_28px_rgba(11,11,11,0.06)]"
      }`}
    >
      <div className="relative mb-5 h-[64px] w-[64px] shrink-0 sm:mb-6 sm:h-[72px] sm:w-[72px]">
        <Image
          src={service.icon}
          alt={service.iconAlt}
          fill
          sizes="72px"
          className="object-contain"
        />
      </div>

      <h3 className="mb-2.5 text-[16px] font-bold leading-snug tracking-tight text-[#0b0b0b] sm:mb-3 sm:text-[17px] lg:text-[18px]">
        {service.title}
      </h3>

      <p
        className={`text-[13px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] ${
          featured ? "text-[#0b0b0b]/80" : "text-[#5c5b55]"
        }`}
      >
        {service.description}
      </p>
    </motion.article>
  );
}

export default function LogisticsServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 45% 35% at 50% 0%, rgba(252,224,1,0.16), transparent 70%),
            radial-gradient(ellipse 35% 30% at 100% 100%, rgba(253,184,19,0.1), transparent 65%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#EDEAE3] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
              What We Offer
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Logistics{" "}
            <span className="font-medium italic text-[#FDB813]">Services.</span>
          </h2>

          <p className="mx-auto max-w-2xl text-[14px] leading-relaxed text-[#5c5b55] sm:text-[16px] sm:leading-[1.65]">
            Everything you need for smooth logistics — booking, pickup,
            shipping, and delivery, wrapped in one commission-free platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-4 xl:gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              delay={0.06 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
