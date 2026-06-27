"use client";

import React from "react";
import Link from "next/link";

/** Figma Our Services — 124:3939 / parent 124:3931 (1920 × 974.545) */
const CONTAINER_MAX = 1730.9090576171875;

/** Figma LEFT orbital composition — 124:3967 */
const BOUNDS_OX = 137.86953735351562;
const BOUNDS_OY = 151.97842407226562;
const TOTAL_W = 823.5896625529;
const TOTAL_H = 859.641953125;

const pct = (px: number, base: number) => `${(px / base) * 100}%`;

const accentYellowClass =
  "bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent";

/** Orbit diagram — scaled down slightly from Figma 824px canvas */
const ORBIT_MAX_W = 700;

const BODY_COPY =
  "Easily move people, parcels, and partners across Pakistan — every category connected through one zero-commission platform. From daily commutes to enterprise logistics, Traveling Partner does the heavy lifting for you.";

const STATS = [
  { value: "6", suffix: "+", label: "SERVICE CATEGORIES" },
  { value: "12", suffix: "+", label: "CITIES LIVE NOW" },
  { value: "10K", suffix: "+", label: "ACTIVE RIDERS" },
] as const;

type FigmaRect = { x: number; y: number; w: number; h: number };

type ServiceNode = FigmaRect & {
  label: string;
  image: string;
  imageClassName?: string;
};

/** Figma Component 2 instances — icon + white pill label composites */
const SERVICE_NODES: ServiceNode[] = [
  {
    label: "Daily Rides",
    image: "/images/our-services/daily-rides.png",
    x: 204.19580078125,
    y: -151.97842407226562,
    w: 131.60726928710938,
    h: 152.72726440429688,
  },
  {
    label: "Pool Ride",
    image: "/images/our-services/pool-ride.png",
    imageClassName: "mix-blend-screen object-contain object-center",
    x: 541.50537109375,
    y: -10.5966796875,
    w: 116.75635528564453,
    h: 152.72726440429688,
  },
  {
    label: "Delivery",
    image: "/images/our-services/delivery.png",
    x: 576.8797607421875,
    y: 350.7275390625,
    w: 108.84363555908203,
    h: 152.72726440429688,
  },
  {
    label: "Logistics",
    image: "/images/our-services/logistics.png",
    x: 213.24339294433594,
    y: 554.9306640625,
    w: 113.49817657470703,
    h: 152.72726440429688,
  },
  {
    label: "Trip",
    image: "/images/our-services/trip.png",
    x: -137.86953735351562,
    y: 350.7275390625,
    w: 93.09090423583984,
    h: 152.72726440429688,
  },
  {
    label: "Tracking",
    image: "/images/our-services/tracking.png",
    x: -117.11328125,
    y: -10.5966796875,
    w: 114.41454315185547,
    h: 152.72726440429688,
  },
];

/** Figma concentric orbit rings — 124:3968–3970 */
const ORBIT_RINGS: FigmaRect[] = [
  { x: -83.45476531982422, y: -83.45427703857422, w: 706.9091186523438, h: 706.9091186523438 },
  { x: 34.36328125, y: 34.3642578125, w: 471.2727355957031, h: 471.2727355957031 },
  { x: 144.3271942138672, y: 144.32696533203125, w: 251.345458984375, h: 251.345458984375 },
];

/** Figma decorative dot markers — 124:3971–3979 */
const ORBIT_DOTS: Array<FigmaRect & { className: string }> = [
  { x: 422.72705078125, y: -32.8359375, w: 8.727272987365723, h: 8.727272987365723, className: "bg-[#fce001]" },
  { x: 626.9306640625, y: 304.9091796875, w: 8.727272987365723, h: 8.727272987365723, className: "bg-[#ff9a3c]" },
  { x: 108.54523468017578, y: 595.5272827148438, w: 8.727272987365723, h: 8.727272987365723, className: "bg-[#4ade80]" },
  { x: -95.6877212524414, y: 422.7275390625, w: 8.727272987365723, h: 8.727272987365723, className: "bg-[#a78bfa]" },
  { x: 45.70858383178711, y: 147.81845092773438, w: 8.727272987365723, h: 8.727272987365723, className: "bg-[#f87171]" },
];

/** Figma center TP brand mark — 124:3987 */
const CENTER_BRAND: FigmaRect = {
  x: 200.181640625,
  y: 200.181640625,
  w: 139.63636779785156,
  h: 139.63636779785156,
};

function boundStyle({ x, y, w, h }: FigmaRect): React.CSSProperties {
  return {
    left: pct(x + BOUNDS_OX, TOTAL_W),
    top: pct(y + BOUNDS_OY, TOTAL_H),
    width: pct(w, TOTAL_W),
    height: pct(h, TOTAL_H),
  };
}

function OrbitImage({
  src,
  alt,
  box,
  zIndex,
  priority = false,
  imageClassName = "mix-blend-screen object-contain object-center",
}: {
  src: string;
  alt: string;
  box: FigmaRect;
  zIndex: number;
  priority?: boolean;
  imageClassName?: string;
}): React.ReactElement {
  const position = boundStyle(box);

  return (
    <div className="absolute" style={{ ...position, zIndex }}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}

function ServicesOrbit(): React.ReactElement {
  return (
    <div
      className="relative mx-auto w-full overflow-visible"
      style={{ maxWidth: ORBIT_MAX_W, aspectRatio: `${TOTAL_W} / ${TOTAL_H}` }}
      aria-hidden
    >
      {ORBIT_RINGS.map((ring, index) => (
        <div
          key={index}
          className="pointer-events-none absolute rounded-full border border-dashed border-[#c8c4b8]/80"
          style={boundStyle(ring)}
          aria-hidden
        />
      ))}

      {ORBIT_DOTS.map((dot, index) => (
        <span
          key={index}
          className={`pointer-events-none absolute rounded-full ${dot.className}`}
          style={boundStyle(dot)}
          aria-hidden
        />
      ))}

      <OrbitImage
        src="/images/our-services/center-brand.png"
        alt="Traveling Partner"
        box={CENTER_BRAND}
        zIndex={10}
        priority
      />

      {SERVICE_NODES.map((node) => (
        <OrbitImage
          key={node.label}
          src={node.image}
          alt={node.label}
          box={node}
          zIndex={20}
          imageClassName={node.imageClassName}
        />
      ))}
    </div>
  );
}

/** Figma Component 2 CTA — 124:3966 */
function LearnMoreButton(): React.ReactElement {
  return (
    <Link
      href="/about"
      className="group inline-flex w-fit max-w-full items-center gap-3 rounded-full bg-[#0b0b0b] py-[10px] pl-5 pr-[10px] font-poppins shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-colors hover:bg-[#1a1a1a] sm:gap-4 sm:pl-7 sm:pr-3"
    >
      <span className="text-[14px] font-semibold leading-none text-white sm:text-[16px]">
        Learn More
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[14px] font-bold leading-none text-[#0b0b0b] transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:text-[15px]">
        →
      </span>
    </Link>
  );
}

export default function OurServicesSection(): React.ReactElement {
  return (
    <section
      id="our-services"
      className="relative w-full scroll-mt-28 overflow-x-clip overflow-y-visible bg-[#fffcf2] py-12 sm:py-16 lg:py-[95px]"
      aria-labelledby="our-services-heading"
    >
      <div
        className="relative z-[1] mx-auto w-full overflow-visible px-4 sm:px-6 md:px-8 lg:px-[95px]"
        style={{ maxWidth: CONTAINER_MAX }}
      >
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-8 xl:gap-12">
          <div className="relative order-2 min-w-0 overflow-visible lg:order-1 lg:pt-[4%] xl:pt-[6%]">
            <ServicesOrbit />
          </div>

          <div className="order-1 min-w-0 overflow-visible lg:order-2 lg:pl-[2.84%]">
            <h2
              id="our-services-heading"
              className="font-poppins tracking-[-2.8px]"
            >
              <span className="block font-bold text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] text-[#0b0b0b]">
                Six rides.
              </span>
              <span
                className={`block text-[clamp(36px,4.167vw,80px)] leading-[clamp(36px,4.167vw,80px)] ${accentYellowClass}`}
              >
                One platform.
              </span>
            </h2>

            <p className="mt-5 max-w-[677px] font-poppins text-[14px] font-normal leading-[1.62] text-[#6f6e68] sm:mt-6 sm:text-[15px] md:text-[16px] lg:mt-8 lg:text-[17px]">
              {BODY_COPY}
            </p>

            <div className="mt-7 border-y border-[#ddd8cb] py-6 sm:mt-8 sm:py-7 lg:mt-10 lg:py-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <p className="font-poppins text-[clamp(26px,6vw,53px)] font-bold leading-none tracking-[-0.02em] text-[#0b0b0b]">
                      {stat.value}
                      <span className="text-[clamp(26px,6vw,53px)] font-bold">{stat.suffix}</span>
                    </p>
                    <p className="mt-1.5 font-poppins text-[8px] font-semibold uppercase leading-tight tracking-[0.1em] text-[#8a877f] sm:mt-2 sm:text-[10px] sm:tracking-[0.12em] md:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 sm:mt-8 lg:mt-10">
              <LearnMoreButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
