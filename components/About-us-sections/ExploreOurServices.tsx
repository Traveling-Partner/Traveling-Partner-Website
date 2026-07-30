"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_DESCRIPTIONS = {
  taxi: "Book city rides with verified drivers and upfront pricing.",
  pool: "Share your journey with others travelling the same route and reduce your travel costs.",
  delivery:
    "Send documents, parcels, and business orders with real-time tracking from pickup to delivery.",
  logistic: "Reliable transport and fleet support for businesses of every size.",
  trip: "Travel between cities with verified drivers and flexible booking options.",
} as const;

const CONTACT_DESCRIPTIONS = {
  taxi: "Book reliable city rides with verified drivers and upfront fares.",
  pool: "Share your route with others and make everyday travel more affordable.",
  delivery: "Send parcels with real-time tracking from pickup to destination.",
  logistic: "Flexible transport and delivery support for businesses.",
  trip: "Book comfortable intercity rides with verified drivers.",
} as const;

type ServiceKey = keyof typeof ABOUT_DESCRIPTIONS;

type Service = {
  number: string;
  title: string;
  label: string;
  key: ServiceKey;
  image: string;
  icon: string;
  href: string;
  rotate: number;
  drop: number;
  z: number;
  pull: number;
};

const services: Service[] = [
  {
    number: "01",
    title: "Taxi Stand",
    label: "City rides",
    key: "taxi",
    image: "/images/about/explore/card-taxi.png",
    icon: "/images/about/explore/icon-taxi.png",
    href: "/taxi-stand",
    rotate: -10,
    drop: 44,
    z: 1,
    pull: 0,
  },
  {
    number: "02",
    title: "Pool Ride",
    label: "Shared trips",
    key: "pool",
    image: "/images/about/explore/card-pool.png",
    icon: "/images/about/explore/icon-pool.png",
    href: "/pool-ride",
    rotate: -5,
    drop: 18,
    z: 3,
    pull: -2,
  },
  {
    number: "03",
    title: "Delivery",
    label: "Fast delivery",
    key: "delivery",
    image: "/images/about/explore/card-delivery.png",
    icon: "/images/about/explore/icon-delivery.png",
    href: "/delivery",
    rotate: 0,
    drop: 8,
    z: 5,
    pull: -4,
  },
  {
    number: "04",
    title: "Logistic",
    label: "Enterprise",
    key: "logistic",
    image: "/images/about/explore/card-logistic.png",
    icon: "/images/about/explore/icon-logistic.png",
    href: "/logistic",
    rotate: 5,
    drop: 18,
    z: 4,
    pull: -4,
  },
  {
    number: "05",
    title: "Trip",
    label: "Plan journey",
    key: "trip",
    image: "/images/about/explore/card-trip.png",
    icon: "/images/about/explore/icon-trip.png",
    href: "/trip",
    rotate: 10,
    drop: 44,
    z: 2,
    pull: -2,
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3" aria-hidden="true">
      <path
        d="M3.2 8h9.6M9.2 4.4 12.8 8 9.2 11.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceCard({
  service,
  description,
  compact,
  cardRef,
}: {
  service: Service;
  description: string;
  compact?: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const rotate = compact ? 0 : service.rotate;
  const drop = compact ? 0 : service.drop;
  const cardInnerRef = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });
  const lift = useSpring(0, { stiffness: 280, damping: 24 });
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const glowBg = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(252,224,1,0.18), transparent 55%)`;
  const tiltX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const imgX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const imgY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (compact) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    lift.set(-14);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    lift.set(0);
  };

  return (
    <div
      ref={cardRef}
      data-service-card
      className={`relative shrink-0 will-change-transform ${
        compact
          ? "w-[min(288px,82vw)] snap-center"
          : "w-[176px] lg:w-[192px] xl:w-[208px]"
      }`}
      style={{
        zIndex: service.z,
        marginLeft: compact ? undefined : service.pull,
        marginTop: drop,
      }}
    >
      <motion.div
        style={{
          y: lift,
          rotateX: compact ? 0 : tiltX,
          rotateY: compact ? 0 : tiltY,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
        }}
      >
        <Link
          ref={cardInnerRef}
          href={service.href}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={`group relative block overflow-hidden rounded-[26px] shadow-[0_18px_42px_rgba(0,0,0,0.24)] transition-[box-shadow] duration-500 hover:shadow-[0_32px_64px_rgba(0,0,0,0.35)] ${
            compact
              ? "h-[340px] rounded-[24px]"
              : "h-[292px] lg:h-[312px] lg:rounded-[28px] xl:h-[330px]"
          }`}
          style={{
            transform: `rotate(${rotate}deg)`,
            transformOrigin: "50% 100%",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ x: compact ? 0 : imgX, y: compact ? 0 : imgY }}
          >
            <Image
              src={service.image}
              alt=""
              fill
              sizes={compact ? "288px" : "208px"}
              className={`object-cover object-center transition-transform duration-700 ease-out ${
                compact
                  ? "scale-[1.5] group-hover:scale-[1.55]"
                  : "scale-[1.42] group-hover:scale-[1.5]"
              }`}
              priority
            />
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.22)_38%,rgba(0,0,0,0.78)_64%,#000_100%)]"
            aria-hidden="true"
          />

          {!compact && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: glowBg }}
              aria-hidden="true"
            />
          )}

          <div
            className={`relative z-10 flex h-full flex-col ${
              compact
                ? "px-5 pb-5 pt-5"
                : "px-4 pb-4 pt-5 sm:px-[17px] sm:pb-[18px] sm:pt-5"
            }`}
          >
            <span
              data-card-el="number"
              className={`italic leading-none text-white ${
                compact ? "text-[36px]" : "text-[32px] lg:text-[36px]"
              }`}
              style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            >
              {service.number}
            </span>

            <div
              data-card-el="icon"
              className={`mt-2.5 flex items-center justify-center overflow-hidden rounded-[11px] bg-[#FEFBF6] lg:mt-3 lg:h-[46px] lg:w-[46px] lg:rounded-[12px] ${
                compact ? "h-[46px] w-[46px] rounded-[12px]" : "h-[42px] w-[42px]"
              }`}
            >
              <Image
                src={service.icon}
                alt=""
                width={46}
                height={46}
                className="h-[130%] w-[130%] max-w-none object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
              />
            </div>

            <div className="mt-auto" data-card-el="copy">
              <h3
                className={`font-poppins font-bold leading-none text-white ${
                  compact ? "text-[18px]" : "text-[16px] lg:text-[17px]"
                }`}
              >
                {service.title}
              </h3>

              <p className="mt-1.5 font-poppins text-[12px] font-medium italic leading-none text-[#FCE001]">
                {service.label}
              </p>

              <p
                className={`mt-2.5 font-poppins leading-[1.45] text-white/85 ${
                  compact
                    ? "max-w-none text-[12.5px]"
                    : "max-w-[158px] text-[11px] lg:text-[11.5px]"
                }`}
              >
                {description}
              </p>

              <span
                data-card-el="cta"
                className="mt-3.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] text-white ring-1 ring-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#FCE001] group-hover:text-black"
              >
                <ArrowIcon />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

/**
 * Explore Our Services — Figma fan + award-style GSAP unfold.
 */
export default function ExploreOurServices({
  variant = "about",
}: {
  variant?: "about" | "contact";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const copy =
    variant === "contact" ? CONTACT_DESCRIPTIONS : ABOUT_DESCRIPTIONS;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const cards = cardEls.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !fanRef.current) return;

    const ctx = gsap.context(() => {
      // Center-out fan unfold — cards deal from a stacked blur into final Figma poses
      gsap.set(cards, {
        opacity: 0,
        y: 90,
        scale: 0.72,
        rotate: (i) => (i - 2) * -18,
        filter: "blur(18px)",
        transformOrigin: "50% 100%",
      });

      cards.forEach((card) => {
        gsap.set(card.querySelectorAll("[data-card-el]"), {
          opacity: 0,
          y: 18,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: fanRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.45,
        stagger: {
          each: 0.11,
          from: "center",
        },
        ease: "elastic.out(1, 0.72)",
      });

      // Inner content cascade after each card lands
      cards.forEach((card, i) => {
        const els = card.querySelectorAll("[data-card-el]");
        tl.to(
          els,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.35 + Math.abs(i - 2) * 0.11
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FEFBF6] py-16 sm:py-20 lg:py-[100px]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14"
        >
          <div className="mb-5 inline-flex items-center rounded-full bg-[#ECE7DB] px-4 py-1.5 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0b0b0b] sm:text-[11px]">
              Our Services
            </span>
          </div>

          <h2 className="mb-4 font-poppins text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b]">
            Explore Our{" "}
            <span className="font-medium italic text-[#FCE001]">Services.</span>
          </h2>

          <p className="mx-auto max-w-[540px] text-[14px] leading-relaxed text-[#6b6a64] sm:text-[15px] sm:leading-[1.65] md:text-[16px]">
            One app. Every journey. From city taxis to shared pools, trusted
            delivery, enterprise logistics, and full-trip planning.
          </p>
        </motion.div>

        {/* Desktop fan */}
        <div className="relative mx-auto hidden justify-center overflow-visible pt-2 md:flex lg:pt-4">
          <div
            ref={fanRef}
            className="flex items-start justify-center pb-6 pl-10 pr-6 [perspective:1200px] lg:pb-8 lg:pl-12"
          >
            {services.map((service, i) => (
              <ServiceCard
                key={service.number}
                service={service}
                description={copy[service.key]}
                cardRef={(el) => {
                  cardEls.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile — upright snap carousel (same card design, no fan tilt) */}
        <div className="-mx-4 md:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Our services"
          >
            {services.map((service) => (
              <div key={service.number} role="listitem">
                <ServiceCard
                  service={service}
                  description={copy[service.key]}
                  compact
                />
              </div>
            ))}
            {/* End spacer so last card can snap cleanly */}
            <div className="w-2 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
