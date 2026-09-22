"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./ServicesOrbit3D.css";

/**
 * CSS 3D Solar System — technique from Julian Garnier (MIT)
 * https://codepen.io/juliangarnier/pen/krNqZO
 * Content / brand © Traveling Partner
 *
 * Not wired into the homepage yet — OurServicesSection still uses the
 * original flat CSS orbit. To try this design later:
 * 1. dynamic-import this component in OurServicesSection (ssr: false)
 * 2. Pass view="3d" | "2d" and optionally show OrbitViewToggle
 * 3. Keep ServicesOrbit3D.css imported from this file
 */

type ServicePlanet = {
  id: string;
  label: string;
  image: string;
  href: string;
  /** Orbit diameter in em — gaps sized so planet radii never overlap */
  orbitEm: number;
  planetEm: number;
  duration: number;
  /** Sphere highlight / mid / deep colors */
  colors: { hi: string; mid: string; deep: string; ring: string };
  ring?: boolean;
};

/**
 * Same angular speed for every planet + 60° phase lock = rigid constellation.
 * They never catch each other. Wide radial gaps keep spheres off neighboring rings.
 */
const ORBIT_PERIOD_S = 42;

const SERVICES: ServicePlanet[] = [
  {
    id: "daily-rides",
    label: "Daily Rides",
    image: "/images/our-services/daily-rides.png",
    href: "/taxi-ride",
    orbitEm: 28,
    planetEm: 4.6,
    duration: ORBIT_PERIOD_S,
    colors: { hi: "#fff4a8", mid: "#fce001", deep: "#d4a000", ring: "rgba(252, 224, 1, 0.55)" },
  },
  {
    id: "pool-ride",
    label: "Pool Ride",
    image: "/images/our-services/pool-ride.png",
    href: "/pool-ride",
    orbitEm: 44,
    planetEm: 4.8,
    duration: ORBIT_PERIOD_S,
    colors: { hi: "#ffd4a8", mid: "#ff8a3d", deep: "#c45a12", ring: "rgba(255, 138, 61, 0.55)" },
  },
  {
    id: "delivery",
    label: "Delivery",
    image: "/images/our-services/delivery.png",
    href: "/delivery",
    orbitEm: 60,
    planetEm: 4.6,
    duration: ORBIT_PERIOD_S,
    colors: { hi: "#e8d5c4", mid: "#8b5e3c", deep: "#4a2f1c", ring: "rgba(139, 94, 60, 0.55)" },
  },
  {
    id: "logistics",
    label: "Logistics",
    image: "/images/our-services/logistics.png",
    href: "/logistic",
    orbitEm: 76,
    planetEm: 4.8,
    duration: ORBIT_PERIOD_S,
    ring: true,
    colors: { hi: "#e4d4ff", mid: "#8b5cf6", deep: "#5b21b6", ring: "rgba(139, 92, 246, 0.55)" },
  },
  {
    id: "tourism",
    label: "Tourism",
    image: "/images/our-services/trip.png",
    href: "/tourism",
    orbitEm: 90,
    planetEm: 4.4,
    duration: ORBIT_PERIOD_S,
    colors: { hi: "#c8f5ef", mid: "#14b8a6", deep: "#0f766e", ring: "rgba(20, 184, 166, 0.55)" },
  },
  {
    id: "tracking",
    label: "Tracking",
    image: "/images/our-services/tracking.png",
    href: "/taxi-ride",
    orbitEm: 104,
    planetEm: 4.2,
    duration: ORBIT_PERIOD_S,
    colors: { hi: "#ffc9c9", mid: "#ef4444", deep: "#991b1b", ring: "rgba(239, 68, 68, 0.55)" },
  },
];

/** Shared anchor on every orbit — angular spacing comes from animation-delay only */
const ORBIT_ANCHOR: React.CSSProperties = { left: "100%", top: "50%" };

export type OrbitViewMode = "3d" | "2d";

type ServicesOrbit3DProps = {
  view?: OrbitViewMode;
};

export default function ServicesOrbit3D({
  view = "3d",
}: ServicesOrbit3DProps): React.ReactElement {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  const bodyClasses = [
    "tp-solar",
    ready ? "tp-solar--ready" : "tp-solar--opening",
    view === "3d" ? "tp-solar--view-3d" : "tp-solar--view-2d",
    "tp-solar--zoom-large",
    reducedMotion ? "tp-solar--reduced" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={bodyClasses} aria-label="Service categories solar system">
      <div className="tp-solar__stage">
        <div className="tp-solar__universe">
          <div className="tp-solar__galaxy">
            <div className="tp-solar__system">
              {SERVICES.map((service, index) => {
                /* Even 60° phase: delay = -period * (index / n) — one spacing method only */
                const phaseDelay = `${(-service.duration * index) / SERVICES.length}s`;
                return (
                  <div
                    key={service.id}
                    id={`tp-orbit-${service.id}`}
                    className={`tp-solar__orbit tp-solar__orbit--${service.id}`}
                    style={
                      {
                        width: `${service.orbitEm}em`,
                        height: `${service.orbitEm}em`,
                        marginTop: `${-service.orbitEm / 2}em`,
                        marginLeft: `${-service.orbitEm / 2}em`,
                        animationDuration: `${service.duration}s`,
                        animationDelay: phaseDelay,
                        ["--tp-p-hi" as string]: service.colors.hi,
                        ["--tp-p-mid" as string]: service.colors.mid,
                        ["--tp-p-deep" as string]: service.colors.deep,
                        ["--tp-p-ring" as string]: service.colors.ring,
                      } as React.CSSProperties
                    }
                  >
                    <div
                      className="tp-solar__pos"
                      style={{
                        ...ORBIT_ANCHOR,
                        animationDuration: `${service.duration}s`,
                        animationDelay: phaseDelay,
                      }}
                    >
                      <Link
                        href={service.href}
                        className={`tp-solar__planet tp-solar__planet--${service.id}`}
                        aria-label={service.label}
                        style={
                          {
                            fontSize: `${service.planetEm}em`,
                            animationDuration: `${service.duration}s`,
                            animationDelay: phaseDelay,
                            ["--tp-orbit-dur" as string]: `${service.duration}s`,
                            ["--tp-p-hi" as string]: service.colors.hi,
                            ["--tp-p-mid" as string]: service.colors.mid,
                            ["--tp-p-deep" as string]: service.colors.deep,
                            ["--tp-p-ring" as string]: service.colors.ring,
                          } as React.CSSProperties
                        }
                      >
                        <span className="tp-solar__planet-sphere" aria-hidden>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={service.image}
                            alt=""
                            className="tp-solar__planet-img"
                            draggable={false}
                          />
                          <span className="tp-solar__planet-shade" />
                          <span className="tp-solar__planet-glare" />
                        </span>
                        {service.ring ? (
                          <span className="tp-solar__ring" aria-hidden />
                        ) : null}
                        <span className="tp-solar__label">{service.label}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}

              <div className="tp-solar__sun" aria-label="Traveling Partner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/our-services/center-brand.png"
                  alt="Traveling Partner"
                  className="tp-solar__sun-img"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
