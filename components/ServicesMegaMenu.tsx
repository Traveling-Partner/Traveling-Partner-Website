"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

export type ServiceItem = {
  id: string;
  href: string;
  label: string;
  short: string;
  description: string;
  features: string[];
  icon: string;
  /** Right-side hero image from each service page */
  hero: string;
  /** Optional visual scale so padded assets match other heroes */
  heroScale?: number;
  /** Extra vertical offset in px (positive = down) */
  heroOffsetY?: number;
};

/**
 * Desktop panel target size:
 * - Width:  min(840px, 100vw − 32px)
 * - Height: min(400px, 100vh − 88px)
 * - Hero:   ~210px tall (full width, object-contain — no crop)
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "taxi-stand",
    href: "/taxi-stand",
    label: "Taxi Stand",
    short: "Private rides from nearby stands.",
    description: "Reliable city rides with professional drivers.",
    features: ["Real-time booking", "Nearby drivers", "Cash & digital pay"],
    icon: "/images/taxi-stand/services/icon-taxi.png",
    hero: "/images/taxi-stand/taxi-hero-car-v3.png",
    heroScale: 1.34,
    heroOffsetY: 16,
  },
  {
    id: "pool-ride",
    href: "/pool-ride",
    label: "Pool Ride",
    short: "Share your route, split the fare.",
    description: "Smarter shared travel for everyday routes.",
    features: ["Split fare savings", "Same-route match", "Live tracking"],
    icon: "/images/taxi-stand/services/icon-pool.png",
    hero: "/images/pool-ride/pool-hero-car.png",
    heroScale: 1.34,
    heroOffsetY: 16,
  },
  {
    id: "delivery",
    href: "/delivery",
    label: "Delivery",
    short: "Send parcels across the city.",
    description: "Fast parcel delivery with live status updates.",
    features: ["Door-to-door pickup", "Live tracking", "Secure handling"],
    icon: "/images/taxi-stand/services/icon-delivery.png",
    hero: "/images/delivery/delivery-hero-courier.png",
    heroScale: 1.22,
    heroOffsetY: 14,
  },
  {
    id: "logistic",
    href: "/logistic",
    label: "Logistic",
    short: "Bulk cargo for your business.",
    description: "Fleet-ready logistics for growing businesses.",
    features: ["Fleet visibility", "Shipment tracking", "Nationwide"],
    icon: "/images/taxi-stand/services/icon-logistics.png",
    hero: "/images/logistic/mega-menu-truck.png",
    heroScale: 1.18,
    heroOffsetY: 14,
  },
  {
    id: "trip",
    href: "/trip",
    label: "Trip",
    short: "Out-of-town journeys made easy.",
    description: "Comfortable trips beyond the city.",
    features: ["Trip planning", "Transparent pricing", "Trusted drivers"],
    icon: "/images/taxi-stand/services/icon-trip.png",
    hero: "/images/trip/mega-menu-suv.png",
    heroScale: 1.16,
    heroOffsetY: 14,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const MENU_MAX_W = 840;
const MENU_GUTTER = 16;

type ServicesMegaMenuProps = {
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
  isServiceActive: (href: string) => boolean;
};

export function ServicesMegaMenuDesktop({
  onNavigate,
  isServiceActive,
}: ServicesMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();
  const listboxId = `${menuId}-list`;
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);
  const anyServiceActive = SERVICES.some((s) => isServiceActive(s.href));

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, []);

  const closeMenu = useCallback((returnFocus = false) => {
    clearCloseTimer();
    setOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const updatePanelPosition = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Center under the full nav pill (not the Services trigger alone)
    const nav = el.closest("nav");
    const anchor = nav?.getBoundingClientRect() ?? el.getBoundingClientRect();
    const trigger = el.getBoundingClientRect();
    const width = Math.min(MENU_MAX_W, window.innerWidth - MENU_GUTTER * 2);
    let left = anchor.left + anchor.width / 2 - width / 2;
    left = Math.max(
      MENU_GUTTER,
      Math.min(left, window.innerWidth - width - MENU_GUTTER),
    );
    setPanelStyle({
      position: "fixed",
      top: trigger.bottom,
      left,
      width,
      zIndex: 60,
    });
  }, []);

  const focusItem = (index: number) => {
    const clamped = (index + SERVICES.length) % SERVICES.length;
    setActiveId(SERVICES[clamped].id);
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-service-index="${clamped}"]`,
    );
    el?.focus();
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
      requestAnimationFrame(() => focusItem(Math.max(0, activeIndex)));
    } else if (e.key === "Escape") {
      closeMenu(true);
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(SERVICES.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
    }
  };

  useEffect(() => {
    if (!open) return;
    updatePanelPosition();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition, closeMenu]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={wrapRef}
      className="relative hidden min-[1200px]:block"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (!wrapRef.current?.contains(next)) scheduleClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`inline-flex h-[32px] shrink-0 items-center gap-1 whitespace-nowrap rounded-[100px] px-3.5 font-montserrat text-[13px] font-medium leading-none outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2 ${
          open || anyServiceActive
            ? "bg-[rgba(11,11,11,0.07)] text-black"
            : "text-black hover:bg-[rgba(11,11,11,0.07)]"
        }`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => {
          if (open) closeMenu();
          else openMenu();
        }}
        onKeyDown={onTriggerKeyDown}
      >
        Services
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="text-[10px] opacity-60"
          aria-hidden
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Services"
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 0.22, ease: easeOut }}
            style={panelStyle}
            className="pt-2.5"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div
              className="overflow-hidden rounded-[18px] border border-white/60 bg-white/95 p-3.5 shadow-[0_20px_48px_rgba(11,11,11,0.12),0_6px_16px_rgba(11,11,11,0.06)] backdrop-blur-[16px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,252,242,0.92) 100%)",
                maxHeight: "min(400px, calc(100vh - 88px))",
              }}
            >
              <div className="grid h-full grid-cols-[220px_minmax(0,1fr)] gap-4 xl:grid-cols-[232px_minmax(0,1fr)]">
                {/* Left list */}
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Our services"
                  aria-activedescendant={`${menuId}-option-${active.id}`}
                  tabIndex={-1}
                  onKeyDown={onListKeyDown}
                  className="flex max-h-[calc(min(400px,100vh-88px)-28px)] flex-col gap-0.5 overflow-y-auto pr-0.5 outline-none"
                >
                  <p className="mb-1 px-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8a877f]">
                    Our services
                  </p>
                  {SERVICES.map((service, index) => {
                    const isActive = service.id === activeId;
                    return (
                      <Link
                        key={service.id}
                        id={`${menuId}-option-${service.id}`}
                        href={service.href}
                        role="option"
                        aria-selected={isActive}
                        data-service-index={index}
                        tabIndex={isActive ? 0 : -1}
                        onMouseEnter={() => setActiveId(service.id)}
                        onFocus={() => setActiveId(service.id)}
                        onClick={(e) => {
                          closeMenu();
                          onNavigate(e, service.href);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            // Link handles Enter; Space needs preventDefault to avoid scroll
                            if (e.key === " ") {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }
                        }}
                        className={`group relative flex items-center gap-3 rounded-[12px] px-2.5 py-2.5 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001]/80 focus-visible:ring-offset-1 ${
                          isActive
                            ? "bg-gradient-to-r from-[#FCE001]/28 via-[#FCE001]/12 to-transparent"
                            : "hover:bg-[rgba(11,11,11,0.04)]"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="services-mega-accent"
                            className="absolute bottom-2 left-0 top-2 w-[2.5px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
                            transition={{ duration: 0.22, ease: easeOut }}
                          />
                        )}
                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-black/5 bg-white shadow-[0_2px_8px_rgba(11,11,11,0.06)]">
                          <Image
                            src={service.icon}
                            alt=""
                            width={36}
                            height={36}
                            className="h-9 w-9 scale-110 object-contain"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-montserrat text-[13px] font-semibold leading-tight text-[#0b0b0b]">
                            {service.label}
                          </span>
                          <span className="mt-0.5 block truncate font-montserrat text-[11px] leading-snug text-[#6f6e68]">
                            {service.short}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Right: full-width hero + meta */}
                <div className="min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: easeOut }}
                      className="flex h-full flex-col"
                    >
                      <Link
                        href={active.href}
                        onClick={(e) => {
                          closeMenu();
                          onNavigate(e, active.href);
                        }}
                        className="group/hero relative block h-[210px] overflow-hidden rounded-[14px] border border-black/5 outline-none focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2"
                        style={{
                          background:
                            "linear-gradient(160deg, #fffdf6 0%, #fff8e4 55%, #fff3c8 100%)",
                        }}
                      >
                        <div className="absolute inset-x-1.5 inset-y-1 bottom-9 flex items-center justify-center">
                          <div
                            className="relative h-full w-full"
                            style={{
                              transform: `translateY(${active.heroOffsetY ?? 0}px) scale(${active.heroScale ?? 1})`,
                            }}
                          >
                            <div className="relative h-full w-full transition-transform duration-500 ease-out group-hover/hero:scale-[1.03]">
                              <Image
                                src={active.hero}
                                alt=""
                                fill
                                sizes="520px"
                                className="object-contain object-center"
                                priority
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fff8e4]/95 via-[#fff8e4]/35 to-transparent px-3.5 pb-2.5 pt-8">
                          <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B8860B]">
                            Preview
                          </p>
                          <p className="mt-0.5 font-montserrat text-[16px] font-bold leading-none text-[#0b0b0b]">
                            {active.label}
                          </p>
                        </div>
                      </Link>

                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-montserrat text-[16px] font-bold tracking-tight text-[#0b0b0b]">
                            {active.label}
                          </h3>
                          <p className="mt-0.5 line-clamp-1 font-montserrat text-[12px] leading-snug text-[#6f6e68]">
                            {active.description}
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {active.features.map((feature) => (
                              <li
                                key={feature}
                                className="rounded-full border border-black/6 bg-white/80 px-2 py-0.5 font-montserrat text-[10.5px] font-medium text-[#3a3934]"
                              >
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          href={active.href}
                          onClick={(e) => {
                            closeMenu();
                            onNavigate(e, active.href);
                          }}
                          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3.5 py-2 font-montserrat text-[12px] font-bold text-[#FCE001] outline-none transition-colors hover:bg-[#111] focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2"
                        >
                          Explore
                          <span
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ServicesMobileAccordionProps = ServicesMegaMenuProps & {
  onClose: () => void;
};

export function ServicesMobileAccordion({
  onNavigate,
  isServiceActive,
  onClose,
}: ServicesMobileAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const chipsRef = useRef<HTMLDivElement>(null);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const anyServiceActive = SERVICES.some((s) => isServiceActive(s.href));

  useEffect(() => {
    if (!expanded) return;
    const chip = chipsRef.current?.querySelector<HTMLElement>(
      `[data-chip-id="${activeId}"]`,
    );
    chip?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId, expanded]);

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#f0ebe0] bg-[#fffcf2]/70">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`flex min-h-[44px] w-full items-center justify-between px-3.5 py-2.5 font-montserrat text-[15px] font-medium leading-none outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FCE001] ${
          anyServiceActive || expanded
            ? "bg-[rgba(11,11,11,0.06)] text-black"
            : "text-black"
        }`}
        aria-expanded={expanded}
      >
        Services
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: easeOut }}
          className="text-[11px] opacity-55"
          aria-hidden
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 px-2.5 pb-2.5">
              <div
                className="relative h-[140px] overflow-hidden rounded-[14px] border border-black/5 sm:h-[160px]"
                style={{
                  background:
                    "linear-gradient(160deg, #fffdf6 0%, #fff8e4 55%, #fff3c8 100%)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    className="absolute inset-0"
                  >
                    <div
                      className="absolute inset-x-1.5 inset-y-1 bottom-10"
                      style={{
                        transform: `translateY(${active.heroOffsetY ?? 0}px) scale(${active.heroScale ?? 1})`,
                      }}
                    >
                      <Image
                        src={active.hero}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-contain object-center"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fff8e4] via-[#fff8e4]/70 to-transparent px-2.5 pb-2.5 pt-8">
                      <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B8860B]">
                        {active.label}
                      </p>
                      <p className="mt-0.5 line-clamp-2 font-montserrat text-[12px] leading-snug text-[#3a3934]">
                        {active.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div
                ref={chipsRef}
                className="-mx-0.5 flex gap-1.5 overflow-x-auto px-0.5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {SERVICES.map((service) => {
                  const selected = service.id === activeId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      data-chip-id={service.id}
                      onClick={() => setActiveId(service.id)}
                      className={`flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001] ${
                        selected
                          ? "border-[#FCE001] bg-[#FCE001]/25 shadow-[0_2px_10px_rgba(252,224,1,0.3)]"
                          : "border-black/8 bg-white/80"
                      }`}
                    >
                      <Image
                        src={service.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 scale-110 object-contain"
                      />
                      <span className="font-montserrat text-[11.5px] font-semibold text-[#0b0b0b]">
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected service detail row */}
              <div className="rounded-[14px] border border-black/5 bg-white/90 px-3 py-2.5 shadow-[0_2px_10px_rgba(11,11,11,0.04)]">
                <p className="font-montserrat text-[13px] font-semibold text-[#0b0b0b]">
                  {active.label}
                </p>
                <p className="mt-0.5 font-montserrat text-[11.5px] leading-snug text-[#6f6e68]">
                  {active.short}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {active.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full bg-[#fffcf2] px-2 py-0.5 font-montserrat text-[10px] font-medium text-[#3a3934]"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={active.href}
                onClick={(e) => {
                  onClose();
                  onNavigate(e, active.href);
                }}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0b0b0b] px-4 font-montserrat text-[13px] font-bold text-[#FCE001] outline-none focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2"
              >
                Explore {active.label}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
