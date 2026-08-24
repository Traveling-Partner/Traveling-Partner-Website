"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";

export type ServiceStat = {
  value: string;
  detail: string;
  icon: "clock" | "car" | "star" | "shield";
};

export type ServiceItem = {
  id: string;
  href: string;
  label: string;
  short: string;
  description: string;
  features: string[];
  icon: string;
  hero: string;
  phone: string;
  /** Full composite preview (car + phone + scene). When set, replaces layered visual. */
  preview?: string;
  heroScale?: number;
  heroOffsetY?: number;
  stats: ServiceStat[];
};

/**
 * Desktop mega menu footprint:
 * - Width:  min(980px, 100vw − 32px)
 * - Height: ~min(500px, 100vh − 88px)
 */
export const SERVICES: ServiceItem[] = [
  {
    id: "taxi-ride",
    href: "/taxi-ride",
    label: "Taxi Ride",
    short: "Private rides from nearby Cab Ride.",
    description: "Reliable city rides with professional drivers.",
    features: [
      "Real-time booking",
      "Nearby drivers",
      "Cash & Digital payments",
      "Scheduled rides",
    ],
    icon: "/images/taxi-stand/services/icon-taxi.png",
    hero: "/images/taxi-stand/taxi-hero-car-v3.png",
    phone: "/images/taxi-stand/need-a-ride/phone-mockup.png",
    preview: "/images/taxi-stand/mega-menu-taxi-preview.png",
    heroScale: 1.2,
    heroOffsetY: 8,
    stats: [
      { value: "24/7", detail: "Always available for your rides.", icon: "clock" },
      { value: "12+", detail: "Vehicle options to choose from.", icon: "car" },
      { value: "4.9", detail: "Average rider rating.", icon: "star" },
      { value: "100%", detail: "Verified & trusted drivers.", icon: "shield" },
    ],
  },
  {
    id: "pool-ride",
    href: "/pool-ride",
    label: "Pool Ride",
    short: "Share your route, split the fare.",
    description: "Smarter shared travel for everyday routes.",
    features: [
      "Split fare savings",
      "Same-route match",
      "Live tracking",
      "Verified riders",
    ],
    icon: "/images/taxi-stand/services/icon-pool.png",
    hero: "/images/pool-ride/pool-hero-car.png",
    phone: "/images/pool-ride/going-same-way/bg-van-phone.png",
    preview: "/images/pool-ride/mega-menu-pool-preview.png",
    heroScale: 1.2,
    heroOffsetY: 8,
    stats: [
      { value: "50%", detail: "Save more by sharing your route.", icon: "clock" },
      { value: "Live", detail: "Instant same-route matching.", icon: "car" },
      { value: "4.8", detail: "Average rider rating.", icon: "star" },
      { value: "Safe", detail: "Verified riders & drivers.", icon: "shield" },
    ],
  },
  {
    id: "delivery",
    href: "/delivery",
    label: "Delivery",
    short: "Send parcels across the city.",
    description: "Fast parcel delivery with live status updates.",
    features: [
      "Door-to-door pickup",
      "Live tracking",
      "Secure handling",
      "Same-day options",
    ],
    icon: "/images/taxi-stand/services/icon-delivery.png",
    hero: "/images/delivery/delivery-hero-courier.png",
    phone: "/images/delivery/ready-to-send/bg-phone-van-rounded.png",
    preview: "/images/delivery/mega-menu-delivery-preview.png",
    heroScale: 1.12,
    heroOffsetY: 6,
    stats: [
      { value: "Same-day", detail: "City deliveries when you need them.", icon: "clock" },
      { value: "Live", detail: "Track your parcel in real time.", icon: "car" },
      { value: "4.9", detail: "Trusted delivery experience.", icon: "star" },
      { value: "Secure", detail: "Handled with care end to end.", icon: "shield" },
    ],
  },
  {
    id: "logistic",
    href: "/logistic",
    label: "Logistic",
    short: "Bulk cargo for your business.",
    description: "Fleet-ready logistics for growing businesses.",
    features: [
      "Fleet visibility",
      "Shipment tracking",
      "Nationwide coverage",
      "Business support",
    ],
    icon: "/images/taxi-stand/services/icon-logistics.png",
    hero: "/images/logistic/mega-menu-truck.png",
    phone: "/images/logistic/move-bulk-cargo/bg-phone-map-rounded.png",
    preview: "/images/logistic/mega-menu-logistic-preview.png",
    heroScale: 1.1,
    heroOffsetY: 6,
    stats: [
      { value: "Fleet", detail: "Full visibility across vehicles.", icon: "clock" },
      { value: "B2B", detail: "Built for business shipments.", icon: "car" },
      { value: "4.8", detail: "Trusted logistics partners.", icon: "star" },
      { value: "Wide", detail: "Nationwide cargo coverage.", icon: "shield" },
    ],
  },
  {
    id: "trip",
    href: "/tourism",
    label: "Tourism",
    short: "Out-of-town journeys made easy.",
    description: "Comfortable tourism travel beyond the city.",
    features: [
      "Tourism planning",
      "Transparent pricing",
      "Trusted drivers",
      "Intercity routes",
    ],
    icon: "/images/taxi-stand/services/icon-trip.png",
    hero: "/images/trip/mega-menu-suv.png",
    phone: "/images/trip/ready-to-trip/bg-phone-car.png",
    preview: "/images/trip/mega-menu-tourism-preview.png",
    heroScale: 1.08,
    heroOffsetY: 6,
    stats: [
      { value: "City+", detail: "Comfortable out-of-town trips.", icon: "clock" },
      { value: "Fixed", detail: "Clear pricing before you go.", icon: "car" },
      { value: "4.9", detail: "Highly rated trip drivers.", icon: "star" },
      { value: "Safe", detail: "Verified & trusted drivers.", icon: "shield" },
    ],
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;
const MENU_MAX_W = 980;
const MENU_GUTTER = 16;

function useMotionPrefs() {
  const reduceMotion = useReducedMotion();
  const t = useCallback(
    (duration = 0.22, delay = 0) =>
      reduceMotion
        ? { duration: 0, delay: 0 }
        : { duration, delay, ease: easeOut },
    [reduceMotion],
  );
  return { reduceMotion: !!reduceMotion, t };
}

function StatIcon({ name }: { name: ServiceStat["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    className: "shrink-0 text-[#FDB813]",
    "aria-hidden": true as const,
  };
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "car") {
    return (
      <svg {...common}>
        <path
          d="M4 14h16l-1.2-3.6a2 2 0 0 0-1.9-1.4H7.1a2 2 0 0 0-1.9 1.4L4 14Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M6 17.5h.01M18 17.5h.01M5 14v2.5a1.5 1.5 0 0 0 1.5 1.5h.7M17.8 18h.7A1.5 1.5 0 0 0 20 16.5V14"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common}>
        <path
          d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 18.4l.9-5.4L4.2 9.2l5.4-.8L12 3.5Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        d="M12 3.5 19 6.5v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9v-5l7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 12 1.8 1.8 3.5-3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
      aria-hidden
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="#0b0b0b"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-[#FDB813]"
      aria-hidden
    >
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 6.25 8 10.25 12 6.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PreviewVisual({ service }: { service: ServiceItem }) {
  // All mega-menu previews are 1024×682 (3:2) — match that so nothing crops
  const frameClass =
    "relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-[18px]";

  if (service.preview) {
    return (
      <div className={frameClass}>
        <Image
          src={service.preview}
          alt=""
          fill
          sizes="480px"
          className="h-full w-full object-contain object-center"
          priority
          // Already optimized public assets — skip /_next/image so idle preload hits the same URL.
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className={frameClass}>
      {/* Soft city skyline */}
      <svg
        className="absolute inset-x-0 bottom-[28%] h-[42%] w-full opacity-[0.14]"
        viewBox="0 0 640 160"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="#0b0b0b"
          d="M0 160V98h28v-34h18v34h22V72h16v26h20V54h14v44h26V66h12v32h18V48h10v50h24V80h16v18h20V60h14v38h22V90h18v28h26V70h12v48h30V84h16v34h22V76h14v42h28V96h18v64H0Z"
        />
      </svg>

      {/* Yellow dot grid */}
      <div
        className="absolute right-[34%] top-[18%] h-[72px] w-[96px] opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FCE001 1.4px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden
      />

      {/* Floor wash */}
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-white via-white/70 to-transparent" />

      {/* Hero vehicle */}
      <div className="absolute bottom-[10%] left-[2%] right-[28%] top-[8%]">
        <div
          className="relative h-full w-full"
          style={{
            transform: `translateY(${service.heroOffsetY ?? 0}px) scale(${service.heroScale ?? 1})`,
          }}
        >
          <Image
            src={service.hero}
            alt=""
            fill
            sizes="420px"
            className="object-contain object-bottom drop-shadow-[0_14px_22px_rgba(11,11,11,0.14)]"
            priority
          />
        </div>
        <div className="pointer-events-none absolute bottom-[6%] left-[18%] right-[22%] h-3 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(11,11,11,0.18)_0%,transparent_72%)] blur-[3px]" />
      </div>

      {/* Phone mockup */}
      <div className="absolute bottom-[6%] right-[4%] top-[10%] w-[34%] max-w-[148px]">
        <div className="relative h-full w-full drop-shadow-[0_16px_28px_rgba(11,11,11,0.18)]">
          <Image
            src={service.phone}
            alt=""
            fill
            sizes="160px"
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}

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
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({
    position: "fixed",
    top: 72,
    left: MENU_GUTTER,
    width: MENU_MAX_W,
    zIndex: 60,
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assetsPreloaded = useRef(false);
  const [fineHover, setFineHover] = useState(false);
  const menuId = useId();
  const listboxId = `${menuId}-list`;
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const activeIndex = SERVICES.findIndex((s) => s.id === activeId);
  const anyServiceActive = SERVICES.some((s) => isServiceActive(s.href));
  const { reduceMotion, t } = useMotionPrefs();

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const updatePanelPosition = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const nav = el.closest("nav");
    const anchor = nav?.getBoundingClientRect() ?? el.getBoundingClientRect();
    const trigger = el.getBoundingClientRect();
    const width = Math.min(MENU_MAX_W, window.innerWidth - MENU_GUTTER * 2);
    // Center under the nav pill, with a clear gap below the header
    let left = anchor.left + anchor.width / 2 - width / 2;
    left = Math.max(
      MENU_GUTTER,
      Math.min(left, window.innerWidth - width - MENU_GUTTER),
    );
    setPanelStyle({
      position: "fixed",
      top: trigger.bottom + 14,
      left,
      width,
      zIndex: 60,
    });
  }, []);

  const preloadAssets = useCallback(() => {
    if (assetsPreloaded.current || typeof window === "undefined") return;
    assetsPreloaded.current = true;
    SERVICES.forEach((service) => {
      const icon = new window.Image();
      icon.src = service.icon;
      if (service.preview) {
        const preview = new window.Image();
        preview.src = service.preview;
      }
    });
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    // Position before paint so first open doesn't mount at 0,0 then jump.
    updatePanelPosition();
    preloadAssets();
    setOpen(true);
  }, [updatePanelPosition, preloadAssets]);

  const closeMenu = useCallback((returnFocus = false) => {
    clearCloseTimer();
    setOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && wrapRef.current?.contains(target)) return;
      closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeMenu]);

  const focusItem = (index: number) => {
    const clamped = (index + SERVICES.length) % SERVICES.length;
    setActiveId(SERVICES[clamped].id);
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-service-index="${clamped}"]`,
    );
    el?.focus();
    el?.scrollIntoView({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
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

  // Keep position warm even while closed so first hover is correct.
  useEffect(() => {
    updatePanelPosition();
    const onResize = () => updatePanelPosition();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updatePanelPosition]);

  useEffect(() => {
    if (!open) return;
    updatePanelPosition();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeMenu(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", updatePanelPosition, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition, closeMenu]);

  // Prefetch mega-menu images during idle time so first open isn't blank/laggy.
  useEffect(() => {
    const run = () => preloadAssets();
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(run, 600);
    return () => window.clearTimeout(timer);
  }, [preloadAssets]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={wrapRef}
      className="relative hidden min-[1200px]:block"
      onMouseEnter={fineHover ? openMenu : undefined}
      onMouseLeave={fineHover ? scheduleClose : undefined}
      onFocusCapture={openMenu}
      onPointerEnter={preloadAssets}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && wrapRef.current?.contains(next)) return;
        if (!next) return;
        scheduleClose();
      }}
    >
      {open ? (
        <div
          aria-hidden
          className="pointer-events-auto absolute left-1/2 top-full z-[1] h-5 w-[min(980px,100vw)] -translate-x-1/2"
        />
      ) : null}
      <button
        ref={triggerRef}
        type="button"
        className={`group relative inline-flex h-[32px] shrink-0 items-center gap-1 whitespace-nowrap rounded-[100px] border border-transparent px-3.5 font-poppins text-[13px] font-medium leading-none outline-none transition-all duration-200 hover:border-[#FDB813] focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2 ${
          open || anyServiceActive
            ? "bg-[rgba(11,11,11,0.07)] text-black"
            : "text-black hover:bg-[rgba(11,11,11,0.07)]"
        }`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => {
          // Hover already opens the menu. A follow-up click must not toggle it shut.
          if (fineHover) {
            openMenu();
            return;
          }
          if (open) closeMenu();
          else openMenu();
        }}
        onKeyDown={onTriggerKeyDown}
      >
        Services
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={t(0.2)}
          className="ml-0.5 inline-flex text-[#0b0b0b]/55 transition-colors duration-200 group-hover:text-[#FDB813]"
          aria-hidden
        >
          <ChevronIcon className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Services"
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.995 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.995 }
            }
            transition={t(0.18)}
            style={panelStyle}
            onMouseEnter={fineHover ? openMenu : undefined}
            onMouseLeave={fineHover ? scheduleClose : undefined}
          >
            <div
              className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_18px_48px_rgba(11,11,11,0.12),0_4px_14px_rgba(11,11,11,0.05)]"
              style={{ maxHeight: "min(500px, calc(100vh - 96px))" }}
            >
              <div className="grid grid-cols-[240px_minmax(0,1fr)]">
                {/* LEFT — Our services */}
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Our services"
                  aria-activedescendant={`${menuId}-option-${active.id}`}
                  tabIndex={-1}
                  onKeyDown={onListKeyDown}
                  className="border-r border-black/[0.06] bg-[#fbfaf7] p-3 outline-none"
                >
                  <p className="mb-2 px-2 font-poppins text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9a968c]">
                    Our services
                  </p>
                  <div className="flex flex-col gap-0.5">
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
                            if (e.key === " ") {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }}
                          className={`group relative flex items-center gap-2.5 rounded-[12px] px-2 py-2 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001]/80 ${
                            isActive
                              ? "bg-[#FFF4C2]"
                              : "hover:bg-white/80"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="services-mega-accent"
                              className="absolute bottom-1.5 left-0 top-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      stiffness: 420,
                                      damping: 32,
                                    }
                              }
                            />
                          )}
                          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-black/[0.04] bg-white shadow-[0_1px_6px_rgba(11,11,11,0.05)]">
                            <Image
                              src={service.icon}
                              alt=""
                              width={30}
                              height={30}
                              className="h-[30px] w-[30px] object-contain"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-poppins text-[12.5px] font-bold leading-tight text-[#0b0b0b]">
                              {service.label}
                            </span>
                            <span className="mt-0.5 block truncate font-poppins text-[10.5px] leading-snug text-[#7a776e]">
                              {service.short}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 text-[13px] transition-colors ${
                              isActive
                                ? "text-[#0b0b0b]/45"
                                : "text-[#0b0b0b]/25 group-hover:text-[#0b0b0b]/45"
                            }`}
                            aria-hidden
                          >
                            ›
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT — Preview */}
                <div className="flex min-h-0 flex-col p-3.5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={
                        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
                      }
                      transition={t(0.2)}
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,0.82fr)_minmax(270px,1.28fr)] gap-3">
                        {/* Copy + features */}
                        <div className="min-w-0 pt-0.5">
                          <p className="font-poppins text-[9px] font-bold uppercase tracking-[0.16em] text-[#FDB813]">
                            Preview
                          </p>
                          <h3 className="mt-1 font-poppins text-[22px] font-bold leading-none tracking-tight text-[#0b0b0b]">
                            {active.label}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 font-poppins text-[12px] leading-snug text-[#6f6e68]">
                            {active.description}
                          </p>
                          <ul className="mt-3 space-y-2">
                            {active.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 font-poppins text-[12px] font-medium text-[#2f2e2a]"
                              >
                                <CheckIcon />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Visual — fixed slot so all services match */}
                        <div className="w-full min-w-0 self-start">
                          <PreviewVisual service={active} />
                        </div>
                      </div>

                      {/* Info cards */}
                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {active.stats.map((stat) => (
                          <div
                            key={stat.value + stat.detail}
                            className="rounded-[12px] border border-black/[0.06] bg-[#fbfaf7] px-2.5 py-2"
                          >
                            <div className="flex items-center gap-1">
                              <StatIcon name={stat.icon} />
                              <p className="font-poppins text-[13px] font-bold leading-none text-[#0b0b0b]">
                                {stat.value}
                              </p>
                            </div>
                            <p className="mt-1 font-poppins text-[9px] leading-snug text-[#7a776e]">
                              {stat.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Bottom action bar */}
                      <div className="mt-3 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3">
                        <div className="flex min-w-0 items-start gap-2">
                          <MapPinIcon />
                          <p className="min-w-0 font-poppins text-[11px] leading-snug">
                            <span className="font-bold text-[#0b0b0b]">
                              Want to know more?
                            </span>{" "}
                            <span className="text-[#7a776e]">
                              Explore how {active.label} works.
                            </span>
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center">
                          <Link
                            href={active.href}
                            onClick={(e) => {
                              closeMenu();
                              onNavigate(e, active.href);
                            }}
                            className="group inline-flex items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 font-poppins text-[11.5px] font-bold text-[#FCE001] outline-none transition-colors hover:bg-[#171717] focus-visible:ring-2 focus-visible:ring-[#FCE001]"
                          >
                            Explore {active.label}
                            <span
                              aria-hidden
                              className="transition-transform duration-150 group-hover:translate-x-0.5"
                            >
                              →
                            </span>
                          </Link>
                        </div>
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
  scrollParentRef?: RefObject<HTMLElement | null>;
};

const MOBILE_ROTATE_MS = 3400;

export function ServicesMobileAccordion({
  onNavigate,
  isServiceActive,
  onClose,
  scrollParentRef,
}: ServicesMobileAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const [autoPaused, setAutoPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const chipsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const activeIndex = Math.max(
    0,
    SERVICES.findIndex((s) => s.id === activeId),
  );
  const previewSrc = active.preview ?? active.hero;
  const anyServiceActive = SERVICES.some((s) => isServiceActive(s.href));
  const { reduceMotion, t } = useMotionPrefs();

  const pauseAuto = (ms = 5000) => {
    setAutoPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setAutoPaused(false), ms);
  };

  const selectService = (id: string, fromUser = false) => {
    setActiveId(id);
    setProgressKey((k) => k + 1);
    if (fromUser) pauseAuto(6000);
  };

  // Auto-cycle + progress restart
  useEffect(() => {
    if (!expanded || reduceMotion || autoPaused) return;
    setProgressKey((k) => k + 1);
    const id = window.setInterval(() => {
      setActiveId((current) => {
        const index = SERVICES.findIndex((s) => s.id === current);
        return SERVICES[(index + 1) % SERVICES.length].id;
      });
      setProgressKey((k) => k + 1);
    }, MOBILE_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [expanded, reduceMotion, autoPaused]);

  useEffect(() => {
    if (expanded) return;
    setAutoPaused(false);
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, [expanded]);

  // Pause while user scrolls / touches the sheet
  useEffect(() => {
    if (!expanded) return;
    const panel = scrollParentRef?.current;
    const scroller =
      panel?.querySelector<HTMLElement>("[data-mobile-nav-scroll]") ??
      panel?.querySelector<HTMLElement>(".overflow-y-auto") ??
      panel;
    if (!scroller) return;

    const onInteract = () => pauseAuto(4500);
    scroller.addEventListener("touchstart", onInteract, { passive: true });
    scroller.addEventListener("scroll", onInteract, { passive: true });
    return () => {
      scroller.removeEventListener("touchstart", onInteract);
      scroller.removeEventListener("scroll", onInteract);
    };
  }, [expanded, scrollParentRef]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  // Keep active chip centered
  useEffect(() => {
    if (!expanded) return;
    const container = chipsRef.current;
    const chip = container?.querySelector<HTMLElement>(
      `[data-chip-id="${activeId}"]`,
    );
    if (!container || !chip) return;
    const left =
      chip.offsetLeft - (container.clientWidth - chip.clientWidth) / 2;
    container.scrollTo({
      left: Math.max(0, left),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId, expanded, reduceMotion]);

  useEffect(() => {
    if (!expanded) return;
    const explore = exploreRef.current;
    const panel = scrollParentRef?.current;
    const scroller =
      panel?.querySelector<HTMLElement>("[data-mobile-nav-scroll]") ??
      panel?.querySelector<HTMLElement>(".overflow-y-auto") ??
      panel;
    if (!explore || !scroller) return;

    const bringExploreIntoView = () => {
      const exploreRect = explore.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const pad = 20;
      if (exploreRect.bottom > scrollerRect.bottom - pad) {
        scroller.scrollBy({
          top: exploreRect.bottom - scrollerRect.bottom + pad + 8,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    };

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(bringExploreIntoView);
    });
    const timer = window.setTimeout(bringExploreIntoView, reduceMotion ? 0 : 260);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [expanded, activeId, scrollParentRef, reduceMotion]);

  return (
    <div className="overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`flex min-h-[48px] w-full items-center justify-between rounded-2xl px-3.5 font-poppins text-[15px] font-semibold leading-none outline-none transition-colors ${
          anyServiceActive || expanded
            ? "bg-[#0b0b0b] text-[#FCE001]"
            : "text-[#0b0b0b] active:bg-[#f5f2ea]"
        }`}
        aria-expanded={expanded}
      >
        Services
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={t(0.2)}
          className="inline-flex text-current opacity-70"
          aria-hidden
        >
          <ChevronIcon className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={t(0.22)}
            className="overflow-hidden"
          >
            <div className="space-y-2.5 px-1 pb-2 pt-2">
              {/* Chips — snap + strong active */}
              <div
                ref={chipsRef}
                className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-0.5 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {SERVICES.map((service) => {
                  const selected = service.id === activeId;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      data-chip-id={service.id}
                      onClick={() => selectService(service.id, true)}
                      className={`relative flex min-h-[42px] shrink-0 snap-center items-center gap-2 rounded-full px-3 py-1.5 outline-none transition-colors duration-200 ${
                        selected
                          ? "bg-[#0b0b0b] text-[#FCE001]"
                          : "bg-[#f3f0e7] text-[#0b0b0b]"
                      }`}
                    >
                      {selected && (
                        <span
                          className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#FCE001] to-[#FDB813]"
                          aria-hidden
                        />
                      )}
                      <span
                        className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full ${
                          selected
                            ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
                            : "bg-white"
                        }`}
                      >
                        <Image
                          src={service.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      </span>
                      <span
                        className={`font-poppins text-[12px] ${
                          selected ? "font-bold" : "font-semibold"
                        }`}
                      >
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dot index */}
              <div className="flex items-center justify-center gap-1.5" aria-hidden>
                {SERVICES.map((service) => (
                  <span
                    key={service.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      service.id === activeId
                        ? "w-4 bg-[#FDB813]"
                        : "w-1.5 bg-black/15"
                    }`}
                  />
                ))}
              </div>

              {/* Preview card */}
              <div className="overflow-hidden rounded-[18px] border border-black/[0.06] bg-[#fbfaf7] shadow-[0_8px_22px_rgba(11,11,11,0.06)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white sm:aspect-[3/2]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      className="absolute inset-0"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                      transition={t(0.22)}
                    >
                      <Image
                        src={previewSrc}
                        alt={active.label}
                        fill
                        sizes="(max-width: 1200px) 100vw, 480px"
                        className="object-contain object-center"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Auto-rotate progress */}
                  {!reduceMotion && expanded && (
                    <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black/10">
                      <motion.div
                        key={`${active.id}-${progressKey}-${autoPaused}`}
                        className="h-full origin-left bg-gradient-to-r from-[#FCE001] to-[#FDB813]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: autoPaused ? 0 : 1 }}
                        transition={
                          autoPaused
                            ? { duration: 0 }
                            : {
                                duration: MOBILE_ROTATE_MS / 1000,
                                ease: "linear",
                              }
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 px-3.5 pb-3 pt-3">
                  <div>
                    <div className="flex items-end justify-between gap-2">
                      <h3 className="font-poppins text-[20px] font-bold leading-none tracking-tight text-[#0b0b0b]">
                        {active.label}
                      </h3>
                      <span className="shrink-0 font-poppins text-[10px] font-semibold text-[#9a968c]">
                        {activeIndex + 1}/{SERVICES.length}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-1 font-poppins text-[12px] leading-snug text-[#6f6e68]">
                      {active.short}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {active.features.slice(0, 2).map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full border border-[#FDB813]/30 bg-white px-2 py-0.5 font-poppins text-[10px] font-medium text-[#3a3934] sm:hidden"
                      >
                        {feature}
                      </li>
                    ))}
                    {active.features.slice(0, 3).map((feature) => (
                      <li
                        key={`sm-${feature}`}
                        className="hidden rounded-full border border-[#FDB813]/30 bg-white px-2 py-0.5 font-poppins text-[10px] font-medium text-[#3a3934] sm:inline-flex"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                    {active.stats
                      .slice(0, 2)
                      .map((stat) => (
                        <div
                          key={stat.value + stat.detail}
                          className="rounded-[12px] border border-black/[0.05] bg-white px-2.5 py-2 sm:hidden"
                        >
                          <p className="font-poppins text-[13px] font-bold leading-none text-[#0b0b0b]">
                            {stat.value}
                          </p>
                          <p className="mt-1 line-clamp-1 font-poppins text-[9px] text-[#7a776e]">
                            {stat.detail}
                          </p>
                        </div>
                      ))}
                    {active.stats.slice(0, 3).map((stat) => (
                      <div
                        key={`sm-${stat.value + stat.detail}`}
                        className="hidden rounded-[12px] border border-black/[0.05] bg-white px-2.5 py-2 sm:block"
                      >
                        <p className="font-poppins text-[13px] font-bold leading-none text-[#0b0b0b]">
                          {stat.value}
                        </p>
                        <p className="mt-1 line-clamp-1 font-poppins text-[9px] text-[#7a776e]">
                          {stat.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    ref={exploreRef}
                    href={active.href}
                    onClick={(e) => {
                      onClose();
                      onNavigate(e, active.href);
                    }}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0b0b0b] px-4 font-poppins text-[13px] font-bold text-[#FCE001] active:bg-[#171717]"
                  >
                    Explore {active.label}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
