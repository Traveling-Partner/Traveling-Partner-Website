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
  const { reduceMotion, t } = useMotionPrefs();

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
        className={`relative inline-flex h-[32px] shrink-0 items-center gap-1 whitespace-nowrap rounded-[100px] px-3.5 font-montserrat text-[13px] font-medium leading-none outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2 ${
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
        {open && !reduceMotion && (
          <motion.span
            layoutId="services-trigger-glow"
            className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#FCE001] to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={t(0.25)}
            aria-hidden
          />
        )}
        Services
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={t(0.2)}
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
            initial={
              reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.99 }
            }
            transition={t(0.26)}
            style={panelStyle}
            className="pt-2.5"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div
              className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-white p-3 shadow-[0_16px_40px_rgba(11,11,11,0.1)]"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #fffcf6 100%)",
                maxHeight: "min(400px, calc(100vh - 88px))",
              }}
            >
              <div className="grid h-full grid-cols-[212px_minmax(0,1fr)] gap-3 xl:grid-cols-[220px_minmax(0,1fr)]">
                {/* Left list — staggered entrance */}
                <div
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Our services"
                  aria-activedescendant={`${menuId}-option-${active.id}`}
                  tabIndex={-1}
                  onKeyDown={onListKeyDown}
                  className="flex max-h-[calc(min(400px,100vh-88px)-24px)] flex-col gap-0.5 overflow-y-auto pr-0.5 outline-none"
                >
                  <p className="mb-1 px-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8a877f]">
                    Our services
                  </p>
                  {SERVICES.map((service, index) => {
                    const isActive = service.id === activeId;
                    return (
                      <motion.div
                        key={service.id}
                        initial={
                          reduceMotion ? false : { opacity: 0, x: -8 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={t(0.22, index * 0.03)}
                      >
                        <Link
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
                          className={`group relative flex items-center gap-2.5 rounded-[11px] px-2 py-2 outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FCE001]/80 focus-visible:ring-offset-1 ${
                            isActive
                              ? "bg-gradient-to-r from-[#FCE001]/28 via-[#FCE001]/12 to-transparent"
                              : "hover:bg-[rgba(11,11,11,0.04)]"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="services-mega-accent"
                              className="absolute bottom-1.5 left-0 top-1.5 w-[2.5px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
                              transition={
                                reduceMotion
                                  ? { duration: 0 }
                                  : { type: "spring", stiffness: 420, damping: 32 }
                              }
                            />
                          )}
                          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/5 bg-white shadow-[0_1px_6px_rgba(11,11,11,0.05)]">
                            <Image
                              src={service.icon}
                              alt=""
                              width={32}
                              height={32}
                              className="h-8 w-8 scale-110 object-contain"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-montserrat text-[12.5px] font-semibold leading-tight text-[#0b0b0b]">
                              {service.label}
                            </span>
                            <span className="mt-0.5 block truncate font-montserrat text-[10.5px] leading-snug text-[#6f6e68]">
                              {service.short}
                            </span>
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right: hero + meta — signature layout morph */}
                <div className="min-w-0">
                  <div className="flex h-full flex-col">
                    <motion.div
                      layout={!reduceMotion}
                      layoutId={
                        reduceMotion ? undefined : "services-mega-hero"
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                      className="overflow-hidden rounded-[12px] border border-black/5"
                      style={{
                        background:
                          "linear-gradient(160deg, #fffdf6 0%, #fff8e4 55%, #fff3c8 100%)",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={active.id}
                          initial={
                            reduceMotion
                              ? { opacity: 1 }
                              : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: -4 }
                          }
                          transition={t(0.18)}
                        >
                          <Link
                            href={active.href}
                            onClick={(e) => {
                              closeMenu();
                              onNavigate(e, active.href);
                            }}
                            className="group/hero relative block h-[190px] outline-none focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2"
                          >
                            <div className="absolute inset-x-1.5 inset-y-1 bottom-8 flex items-center justify-center">
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
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#fff8e4]/95 via-[#fff8e4]/35 to-transparent px-3 pb-2 pt-7">
                              <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.14em] text-[#B8860B]">
                                Preview
                              </p>
                              <p className="mt-0.5 font-montserrat text-[15px] font-bold leading-none text-[#0b0b0b]">
                                {active.label}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`meta-${active.id}`}
                        className="mt-2.5 flex items-end justify-between gap-3"
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={t(0.2)}
                      >
                        <div className="min-w-0">
                          <h3 className="font-montserrat text-[15px] font-bold tracking-tight text-[#0b0b0b]">
                            {active.label}
                          </h3>
                          <p className="mt-0.5 line-clamp-1 font-montserrat text-[11.5px] leading-snug text-[#6f6e68]">
                            {active.description}
                          </p>
                          <ul className="mt-1.5 flex flex-wrap gap-1">
                            {active.features.map((feature, i) => (
                              <motion.li
                                key={feature}
                                initial={
                                  reduceMotion ? false : { opacity: 0, y: 3 }
                                }
                                animate={{ opacity: 1, y: 0 }}
                                transition={t(0.16, 0.05 + i * 0.035)}
                                className="rounded-full border border-black/5 bg-white px-1.5 py-0.5 font-montserrat text-[10px] font-medium text-[#3a3934]"
                              >
                                {feature}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <motion.div
                          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                          transition={t(0.15)}
                        >
                          <Link
                            href={active.href}
                            onClick={(e) => {
                              closeMenu();
                              onNavigate(e, active.href);
                            }}
                            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 font-montserrat text-[11.5px] font-bold text-[#FCE001] outline-none transition-colors hover:bg-[#111] focus-visible:ring-2 focus-visible:ring-[#FCE001] focus-visible:ring-offset-2"
                          >
                            Explore
                            <span
                              aria-hidden
                              className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-[3px]"
                            >
                              →
                            </span>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
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
  /** Scroll container for keeping Explore in view when expanded */
  scrollParentRef?: RefObject<HTMLElement | null>;
};

export function ServicesMobileAccordion({
  onNavigate,
  isServiceActive,
  onClose,
  scrollParentRef,
}: ServicesMobileAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const chipsRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];
  const anyServiceActive = SERVICES.some((s) => isServiceActive(s.href));
  const { reduceMotion, t } = useMotionPrefs();

  useEffect(() => {
    if (!expanded) return;
    const container = chipsRef.current;
    const chip = container?.querySelector<HTMLElement>(
      `[data-chip-id="${activeId}"]`,
    );
    if (!container || !chip) return;
    const left =
      chip.offsetLeft - (container.clientWidth - chip.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeId, expanded]);

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
      } else if (exploreRect.top < scrollerRect.top + 8) {
        scroller.scrollBy({
          top: exploreRect.top - scrollerRect.top - 8,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    };

    // Wait for accordion height animation / layout
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(bringExploreIntoView);
    });
    const timer = window.setTimeout(bringExploreIntoView, reduceMotion ? 0 : 280);
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
        className={`flex min-h-[48px] w-full items-center justify-between rounded-2xl px-3.5 font-montserrat text-[15px] font-semibold leading-none outline-none transition-colors ${
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
          className="text-[11px] opacity-70"
          aria-hidden
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={t(0.24)}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-1 pb-2 pt-1.5">
              <div
                ref={chipsRef}
                className="flex gap-1.5 overflow-x-auto overflow-y-visible px-0.5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {SERVICES.map((service) => {
                  const selected = service.id === activeId;
                  return (
                    <motion.button
                      key={service.id}
                      type="button"
                      data-chip-id={service.id}
                      onClick={() => setActiveId(service.id)}
                      layout={!reduceMotion}
                      animate={
                        reduceMotion
                          ? undefined
                          : { scale: selected ? 1.03 : 1 }
                      }
                      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 28 }
                      }
                      style={{ transformOrigin: "center center" }}
                      className={`flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 outline-none transition-colors duration-200 ${
                        selected
                          ? "bg-[#0b0b0b] text-[#FCE001]"
                          : "bg-[#f3f0e7] text-[#0b0b0b]"
                      }`}
                    >
                      <Image
                        src={service.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 scale-110 object-contain"
                      />
                      <span className="font-montserrat text-[11px] font-semibold">
                        {service.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="relative h-[132px] overflow-hidden rounded-2xl bg-[#f7f4ec] sm:h-[148px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.96 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.98 }
                    }
                    transition={t(0.18)}
                    className="absolute inset-0 flex items-center justify-center p-1"
                  >
                    <div
                      className="relative h-full w-full"
                      style={{
                        transform: `scale(${
                          active.id === "taxi-stand" ||
                          active.id === "pool-ride"
                            ? 1.28
                            : 1.08
                        })`,
                      }}
                    >
                      <Image
                        src={active.hero}
                        alt={active.label}
                        fill
                        sizes="100vw"
                        className="object-contain object-center"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="px-1 font-montserrat text-[12px] leading-snug text-[#6f6e68]">
                {active.short}
              </p>

              <motion.div
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={t(0.12)}
              >
                <Link
                  ref={exploreRef}
                  href={active.href}
                  onClick={(e) => {
                    onClose();
                    onNavigate(e, active.href);
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-[#0b0b0b] px-4 font-montserrat text-[13px] font-bold text-[#FCE001]"
                >
                  Explore {active.label}
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
