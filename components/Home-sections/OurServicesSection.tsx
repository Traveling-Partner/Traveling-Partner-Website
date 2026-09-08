"use client";

import React from "react";
import Link from "next/link";

/** Figma Our Services — 124:3939 / parent 124:3931 (1920 × 974.545) */
/** Figma LEFT orbital composition — 124:3967 */
const BOUNDS_OX = 137.86953735351562;
const BOUNDS_OY = 151.97842407226562;
const TOTAL_W = 823.5896625529;
const TOTAL_H = 859.641953125;

const pct = (px: number, base: number) => `${(px / base) * 100}%`;

const accentYellowClass =
  "bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent";

/** Scale orbit service icons + labels slightly above Figma base */
const SERVICE_ICON_SCALE = 1.14;
/** Nudge icons/headings up a few px (as % of orbit canvas height) */
const SERVICE_ICON_NUDGE_Y = -0.9;

/** Orbit spin — six services rotate around center brand (sun) */
const ORBIT_SPIN_ORIGIN = "49.52% 49.09%";
const SERVICES_ORBIT_DURATION_S = 88;

/** Orbit diagram — scaled down slightly from Figma 824px canvas */
const ORBIT_MAX_W = 620;

const BODY_COPY =
  "One app for every journey. Whether you need a taxi service, Pool Ride, parcel delivery, business logistics, or an out-of-town trip, Traveling Partner makes moving around Pakistan simple. Traveling Partner brings everyday travel, online taxi booking, and business transport under one roof with upfront fares, real-time GPS tracking, and drivers you can actually trust. It's what makes us the best ride booking app in Pakistan.";

const STATS = [
  { value: "5", suffix: "+", label: "SERVICE CATEGORIES" },
  { value: "12K", suffix: "+", label: "RIDES EVERY MONTH" },
  { value: "10K", suffix: "+", label: "ACTIVE USERS" },
] as const;

type FigmaRect = { x: number; y: number; w: number; h: number };

type ServiceNode = FigmaRect & {
  label: string;
  image: string;
  href: string;
  imgStyle?: React.CSSProperties;
};

/** DevTools element.style — pool-ride.png */
const POOL_RIDE_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "79.48949%",
  top: "18.446585%",
  width: "15.17652%",
  height: "20.766381%",
  zIndex: 20,
  objectFit: "contain",
};

/** DevTools element.style — delivery.png */
const DELIVERY_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "81.7846%",
  top: "57.4785%",
  width: "16.2158%",
  height: "17.7664%",
  zIndex: 20,
  objectFit: "contain",
};

/** DevTools element.style — tracking.png */
const TRACKING_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "2.52022%",
  top: "21.4466%",
  width: "16.8922%",
  height: "17.7664%",
  zIndex: 20,
  objectFit: "contain",
};

/** DevTools element.style — trip.png */
const TRIP_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "1%",
  top: "58.4785%",
  width: "16.3031%",
  height: "17.7664%",
  zIndex: 20,
  objectFit: "contain",
};

/** DevTools element.style — logistics.png */
const LOGISTICS_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "42.632%",
  top: "82.233%",
  width: "16.7809%",
  height: "17.7664%",
  zIndex: 20,
  objectFit: "contain",
};

/** Figma Component 2 instances — icon + white pill label composites */
const SERVICE_NODES: ServiceNode[] = [
  {
    label: "Daily Rides",
    image: "/images/our-services/daily-rides.png",
    href: "/taxi-ride",
    x: 204.19580078125,
    y: -151.97842407226562,
    w: 131.60726928710938,
    h: 152.72726440429688,
  },
  {
    label: "Pool Ride",
    image: "/images/our-services/pool-ride.png",
    href: "/pool-ride",
    imgStyle: POOL_RIDE_IMG_STYLE,
    x: 541.50537109375,
    y: -10.5966796875,
    w: 116.75635528564453,
    h: 152.72726440429688,
  },
  {
    label: "Delivery",
    image: "/images/our-services/delivery.png",
    href: "/delivery",
    imgStyle: DELIVERY_IMG_STYLE,
    x: 576.8797607421875,
    y: 350.7275390625,
    w: 108.84363555908203,
    h: 152.72726440429688,
  },
  {
    label: "Logistics",
    image: "/images/our-services/logistics.png",
    href: "/logistic",
    imgStyle: LOGISTICS_IMG_STYLE,
    x: 213.24339294433594,
    y: 554.9306640625,
    w: 113.49817657470703,
    h: 152.72726440429688,
  },
  {
    label: "Tourism",
    image: "/images/our-services/trip.png",
    href: "/tourism",
    imgStyle: TRIP_IMG_STYLE,
    x: -137.86953735351562,
    y: 350.7275390625,
    w: 93.09090423583984,
    h: 152.72726440429688,
  },
  {
    label: "Tracking",
    image: "/images/our-services/tracking.png",
    href: "/taxi-ride",
    imgStyle: TRACKING_IMG_STYLE,
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
type OrbitDot = FigmaRect & {
  fill: string;
  core: string;
};

const ORBIT_DOTS: OrbitDot[] = [
  {
    x: 422.72705078125,
    y: -32.8359375,
    w: 8.727272987365723,
    h: 8.727272987365723,
    fill: "#fff6bf",
    core: "#fce001",
  },
  {
    x: 626.9306640625,
    y: 304.9091796875,
    w: 8.727272987365723,
    h: 8.727272987365723,
    fill: "#ffedd5",
    core: "#ff9a3c",
  },
  {
    x: 108.54523468017578,
    y: 595.5272827148438,
    w: 8.727272987365723,
    h: 8.727272987365723,
    fill: "#dcfce7",
    core: "#4ade80",
  },
  {
    x: 465,
    y: 165,
    w: 8.727272987365723,
    h: 8.727272987365723,
    fill: "#ede9fe",
    core: "#a78bfa",
  },
  {
    x: 45.70858383178711,
    y: 147.81845092773438,
    w: 8.727272987365723,
    h: 8.727272987365723,
    fill: "#fee2e2",
    core: "#f87171",
  },
];

/** Scale orbit pointers up from Figma base size */
const ORBIT_DOT_SCALE = 2.45;

/** Stagger blink around the orbit — seconds between each dot */
const ORBIT_DOT_BLINK_STAGGER_S = 0.55;
const ORBIT_DOT_BLINK_DURATION_S = 2.5;

function orbitDotStyle(dot: OrbitDot): React.CSSProperties {
  const w = dot.w * ORBIT_DOT_SCALE;
  const h = dot.h * ORBIT_DOT_SCALE;
  const dx = (w - dot.w) / 2;
  const dy = (h - dot.h) / 2;
  return boundStyle({ x: dot.x - dx, y: dot.y - dy, w, h });
}

function OrbitDotMarker({ dot, index }: { dot: OrbitDot; index: number }): React.ReactElement {
  const delay = index * ORBIT_DOT_BLINK_STAGGER_S;

  return (
    <span
      className="our-services-orbit-dot pointer-events-none absolute box-border flex items-center justify-center rounded-full"
      style={{
        ...orbitDotStyle(dot),
        backgroundColor: dot.fill,
        border: `1px solid ${dot.fill}`,
        ["--orbit-dot-glow" as string]: `${dot.core}73`,
        animation: `our-services-orbit-dot-blink ${ORBIT_DOT_BLINK_DURATION_S}s ease-in-out ${delay}s infinite`,
      }}
      aria-hidden
    >
      <span
        className="our-services-orbit-dot-core block rounded-full"
        style={{
          width: "52%",
          height: "52%",
          backgroundColor: dot.core,
          ["--orbit-dot-glow" as string]: `${dot.core}a6`,
          animation: `our-services-orbit-dot-core-blink ${ORBIT_DOT_BLINK_DURATION_S}s ease-in-out ${delay + 0.1}s infinite`,
        }}
      />
    </span>
  );
}

/** DevTools element.style — center-brand.png */
const CENTER_BRAND_IMG_STYLE: React.CSSProperties = {
  position: "absolute",
  left: "34.0461%",
  top: "36.9659%",
  width: "30.9546%",
  height: "30.2435%",
  zIndex: 10,
  objectFit: "contain",
};

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
  imgStyle,
  counterOrbit = false,
  href,
  scale = 1,
}: {
  src: string;
  alt: string;
  box: FigmaRect;
  zIndex: number;
  priority?: boolean;
  imgStyle?: React.CSSProperties;
  counterOrbit?: boolean;
  href?: string;
  scale?: number;
}): React.ReactElement {
  const nudgedImgStyle = imgStyle
    ? (() => {
        const left = parseFloat(String(imgStyle.left ?? "0"));
        const top = parseFloat(String(imgStyle.top ?? "0"));
        const width = parseFloat(String(imgStyle.width ?? "0"));
        const height = parseFloat(String(imgStyle.height ?? "0"));
        const scaledW = width * scale;
        const scaledH = height * scale;
        return {
          ...imgStyle,
          left: `${left - (scaledW - width) / 2}%`,
          top: `${top - (scaledH - height) / 2 + SERVICE_ICON_NUDGE_Y}%`,
          width: `${scaledW}%`,
          height: `${scaledH}%`,
        } as React.CSSProperties;
      })()
    : undefined;

  const scaledBox: FigmaRect =
    scale !== 1 && !imgStyle
      ? {
          x: box.x - (box.w * (scale - 1)) / 2,
          y: box.y - (box.h * (scale - 1)) / 2 + (SERVICE_ICON_NUDGE_Y / 100) * TOTAL_H,
          w: box.w * scale,
          h: box.h * scale,
        }
      : box;

  // Always clone — never mutate shared imgStyle constants (frozen in prod/Turbopack).
  const style: React.CSSProperties = {
    ...(nudgedImgStyle ?? {
      position: "absolute",
      ...boundStyle(scaledBox),
      zIndex,
      objectFit: "contain" as const,
    }),
    ...(counterOrbit
      ? {
          animation: `our-services-orbit-rotate-reverse ${SERVICES_ORBIT_DURATION_S}s linear infinite`,
          transformOrigin: "center center",
        }
      : null),
  };

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={href ? "" : alt}
      className={href ? "h-full w-full object-contain" : undefined}
      style={href ? undefined : style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="pointer-events-auto transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fdb813]"
        style={style}
        aria-label={alt}
      >
        {image}
      </Link>
    );
  }

  return image;
}

function ServicesOrbit(): React.ReactElement {
  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      style={{ maxWidth: ORBIT_MAX_W, aspectRatio: `${TOTAL_W} / ${TOTAL_H}` }}
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
        <OrbitDotMarker key={index} dot={dot} index={index} />
      ))}

      <OrbitImage
        src="/images/our-services/center-brand.png"
        alt="Traveling Partner"
        box={CENTER_BRAND}
        zIndex={10}
        imgStyle={CENTER_BRAND_IMG_STYLE}
        priority
      />

      <div
        className="our-services-planets-orbit absolute inset-0"
        style={{
          transformOrigin: ORBIT_SPIN_ORIGIN,
          animation: `our-services-orbit-rotate ${SERVICES_ORBIT_DURATION_S}s linear infinite`,
        }}
        aria-label="Service categories"
      >
        {SERVICE_NODES.map((node) => (
          <OrbitImage
            key={node.label}
            src={node.image}
            alt={node.label}
            href={node.href}
            box={node}
            zIndex={20}
            imgStyle={node.imgStyle}
            counterOrbit
            scale={SERVICE_ICON_SCALE}
          />
        ))}
      </div>
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
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#fffcf2] pt-10 pb-6 sm:pt-14 sm:pb-8 lg:pt-[72px] lg:pb-10"
      aria-labelledby="our-services-heading"
    >
      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-5 xl:gap-6">
          <div className="relative order-2 min-w-0 overflow-hidden lg:order-1 lg:pt-[2%] xl:pt-[3%]">
            <ServicesOrbit />
          </div>

          <div className="order-1 min-w-0 lg:order-2 lg:pl-[2.84%]">
            <h2
              id="our-services-heading"
              className="font-poppins tracking-[-2.8px]"
            >
              <span className="block font-bold text-[clamp(34px,4vw,72px)] leading-[1.05] text-[#0b0b0b]">
                One App. More Ways to{" "}
                <span className={accentYellowClass}>Move.</span>
              </span>
            </h2>

            <p className="mt-4 max-w-[677px] font-poppins text-[14px] font-normal leading-[1.62] text-[#6f6e68] sm:mt-5 sm:text-[15px] md:text-[16px] lg:mt-6 lg:text-[16px]">
              {BODY_COPY}
            </p>

            <div className="mt-6 border-y border-[#ddd8cb] py-5 sm:mt-7 sm:py-6 lg:mt-8 lg:py-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <p className="font-poppins text-[clamp(24px,5.5vw,48px)] font-bold leading-none tracking-[-0.02em] text-[#0b0b0b]">
                      {stat.value}
                      <span className="text-[clamp(24px,5.5vw,48px)] font-bold">{stat.suffix}</span>
                    </p>
                    <p className="mt-1.5 font-poppins text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] text-[#8a877f] sm:mt-2 sm:text-[10px] sm:tracking-[0.12em] md:text-[11px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-7 lg:mt-8">
              <LearnMoreButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
