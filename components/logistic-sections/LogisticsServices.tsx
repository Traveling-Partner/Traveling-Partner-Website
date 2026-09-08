"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

type Service = {
  number: string;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  bold: readonly string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    number: "01",
    icon: "/images/logistic/services/icon-booking.png",
    iconAlt: "Simple booking",
    title: "Simple Booking",
    description:
      "Book a pickup in a few clicks. Add the delivery details, choose a vehicle, and you're ready to go.",
    bold: [],
  },
  {
    number: "02",
    icon: "/images/logistic/services/icon-pickup.png",
    iconAlt: "On-time pickup",
    title: "On-Time Pickup",
    description:
      "Set a pickup time that works for you. Our riders arrive ready to collect your shipment, so there's no need to chase drivers.",
    bold: [],
  },
  {
    number: "03",
    icon: "/images/logistic/services/icon-fast.png",
    iconAlt: "Fast shipments",
    title: "Fast Shipments",
    description:
      "Some deliveries can't wait. We help move your goods as quickly as possible while keeping you updated from pickup to delivery.",
    bold: [],
    featured: true,
  },
  {
    number: "04",
    icon: "/images/logistic/services/icon-delivery.png",
    iconAlt: "On-time delivery",
    title: "On-Time Delivery",
    description:
      "Your shipment stays on the move until it reaches its destination. Simple updates let you know where it is without making a phone call.",
    bold: [],
  },
  {
    number: "05",
    icon: "/images/logistic/services/icon-save.png",
    iconAlt: "Save time and money",
    title: "Save Time & Money",
    description:
      "Less time arranging deliveries. Less money spent on unnecessary transport. More time for the work that matters.",
    bold: [],
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] p-5 sm:rounded-[28px] sm:p-6 ${
        featured
          ? "bg-gradient-to-br from-[#FCE001] to-[#FDB813] shadow-[0_14px_32px_rgba(253,184,19,0.25)]"
          : "bg-white shadow-[0_10px_28px_rgba(11,11,11,0.06)]"
      }`}
    >
      <div className="relative z-[1] mb-4 flex items-start justify-between gap-3 sm:mb-5">
        <div className="relative h-[48px] w-[48px] shrink-0 sm:h-[52px] sm:w-[52px]">
          <Image
            src={service.icon}
            alt={service.iconAlt}
            fill
            sizes="52px"
            className="object-contain"
          />
        </div>
        <span
          className={`select-none font-poppins text-[36px] font-bold italic leading-none tracking-tight sm:text-[40px] ${
            featured ? "text-black/10" : "text-black/[0.07]"
          }`}
        >
          {service.number}
        </span>
      </div>

      <h3 className="relative z-[1] mb-2 text-[17px] font-bold leading-[1.25] tracking-tight text-[#0b0b0b] sm:mb-2.5 sm:text-[18px] lg:text-[19px]">
        {service.title}
      </h3>

      <p
        className={`relative z-[1] text-[13px] leading-[1.5] sm:text-[14px] sm:leading-[1.55] ${
          featured ? "text-[#0b0b0b]/80" : "text-[#4a4a45]"
        }`}
      >
        {emphasizePhrases(service.description, service.bold)}
      </p>
    </motion.article>
  );
}

export default function LogisticsServices() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6] pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 40% at 50% 8%, rgba(252,224,1,0.22), transparent 70%),
            radial-gradient(ellipse 40% 35% at 92% 12%, rgba(253,184,19,0.12), transparent 65%),
            radial-gradient(ellipse 35% 30% at 8% 90%, rgba(252,224,1,0.1), transparent 70%)
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
          <div className="mb-5 inline-flex items-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
              What We Offer
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(32px,5.5vw,52px)] font-extrabold leading-[1.1] tracking-tight text-[#0b0b0b] sm:mb-5">
            Our{" "}
            <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">
              Services.
            </span>
          </h2>

          <div className="mx-auto max-w-2xl space-y-2 text-[14px] leading-relaxed text-[#5c5b55] sm:text-[16px] sm:leading-[1.65]">
            <p className="font-semibold text-[#0b0b0b]">
              Everything you need to keep deliveries moving.
            </p>
            <p>
              Running a business means deliveries don&apos;t stop. Some are
              planned. Some come in at the last minute.
            </p>
            <p>
              Traveling Partner brings booking, pickups, tracking, and delivery
              together in one place, so you spend less time managing logistics
              and more time running your business.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:max-w-none lg:grid-cols-5 lg:gap-4 xl:gap-5">
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
