"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ServicesMegaMenuDesktop,
  ServicesMobileAccordion,
} from "@/components/ServicesMegaMenu";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname() ?? "";
  const reduceMotion = !!useReducedMotion();
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  const pendingFocusReturn = useRef(false);

  // 404 can be any invalid URL — NotFoundPage sets body[data-tp-chrome]
  // so we can float the nav over its yellow gradient like other heroes.
  useEffect(() => {
    const sync = () =>
      setIsNotFoundPage(document.body.dataset.tpChrome === "not-found");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-tp-chrome"],
    });
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = useCallback((returnFocus = false) => {
    if (returnFocus) pendingFocusReturn.current = true;
    setIsOpen(false);
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    closeMenu();
    const current = pathname || "/";
    const isSame =
      href === "/"
        ? current === "/"
        : current === href || current.startsWith(`${href}/`);
    if (isSame) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePanelTop = () => {
      const nav = navRef.current;
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      setPanelTop(Math.round(rect.bottom + 8));
    };

    updatePanelTop();
    window.addEventListener("resize", updatePanelTop);
    window.addEventListener("scroll", updatePanelTop, true);
    return () => {
      window.removeEventListener("resize", updatePanelTop);
      window.removeEventListener("scroll", updatePanelTop, true);
    };
  }, [isOpen]);

  // Escape + focus trap while mobile sheet is open; autofocus first item on open
  useEffect(() => {
    if (!isOpen) return;

    const getFocusable = () => {
      const panel = panelRef.current;
      const panelItems = panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter(
            (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
          )
        : [];
      return panelItems;
    };

    const focusFirst = () => {
      const items = getFocusable();
      items[0]?.focus();
    };
    const openFocusRaf = requestAnimationFrame(() => {
      requestAnimationFrame(focusFirst);
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inPanel = active ? items.includes(active) : false;

      if (e.shiftKey) {
        if (!inPanel || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inPanel || active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(openFocusRaf);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  const onMenuBtnKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkClass = (href: string) =>
    `border border-transparent text-black transition-all duration-200 hover:border-[#FDB813] hover:bg-[rgba(11,11,11,0.07)] ${
      isActive(href) ? "bg-[rgba(11,11,11,0.07)]" : ""
    }`;

  const mobileLinkClass = (href: string) =>
    `flex min-h-[48px] items-center rounded-2xl px-3.5 font-poppins text-[15px] font-semibold leading-none transition-colors ${
      isActive(href)
        ? "bg-[#0b0b0b] text-[#FCE001]"
        : "text-[#0b0b0b] active:bg-[#f5f2ea]"
    }`;

  const contactActive =
    pathname === "/contact" || pathname.startsWith("/contact/");

  const isHome = pathname === "/";

  const overlayHeroPaths = [
    "/taxi-stand",
    "/pool-ride",
    "/delivery",
    "/logistic",
    "/tourism",
    "/trip",
    "/about",
    "/contact",
    "/help",
    "/terms-conditions",
    "/privacy-policy",
  ];
  const isOverlayHeroPage =
    isHome ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    overlayHeroPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

  // Prefer smaller of dvh/svh so short phones + browser chrome don’t clip Contact
  const sheetMaxH = `min(calc(100dvh - ${panelTop + 12}px), calc(100svh - ${panelTop + 12}px))`;

  // The public live-trip tracking experience uses its own minimal header —
  // skip the full marketing navigation entirely on these routes.
  const isLiveTripRoute = pathname === "/trip/track";
  if (isLiveTripRoute) return null;

  return (
    <header
      className={`z-[60] w-full px-3 sm:px-4 ${
        isOverlayHeroPage || isNotFoundPage
          ? "absolute inset-x-0 top-0 bg-transparent pt-3 sm:pt-5 md:pt-[43px]"
          : "relative bg-white py-3 sm:py-4"
      }`}
    >
      <div className="relative mx-auto w-full max-w-4xl min-[1200px]:max-w-[1920px]">
        <nav
          ref={navRef}
          className="relative z-[70] flex h-[56px] w-full min-w-0 items-center justify-between gap-1.5 rounded-full border border-black/[0.06] bg-white px-2 shadow-[0_8px_28px_rgba(11,11,11,0.1)] sm:h-[66px] sm:gap-3 sm:px-5 md:px-6 min-[1200px]:mx-auto min-[1200px]:h-[66px] min-[1200px]:w-fit min-[1200px]:justify-center min-[1200px]:gap-1 min-[1200px]:border-0 min-[1200px]:px-5 min-[1200px]:py-2 min-[1200px]:shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)]"
        >
          <Link
            href="/"
            className="relative inline-flex h-[44px] w-[74px] shrink-0 items-center self-center overflow-hidden sm:h-[52px] sm:w-[88px] min-[1200px]:h-[52px] min-[1200px]:w-[88px]"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={440}
              height={260}
              className="h-full w-full object-contain object-left"
              priority
            />
          </Link>

          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-poppins text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/")}`}
          >
            Home
          </Link>

          <ServicesMegaMenuDesktop
            onNavigate={handleNavClick}
            isServiceActive={isActive}
          />

          <Link
            href="/about"
            onClick={(e) => handleNavClick(e, "/about")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-poppins text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/about")}`}
          >
            About Us
          </Link>

          <Link
            href="/blog"
            onClick={(e) => handleNavClick(e, "/blog")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-poppins text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/blog")}`}
          >
            Blog
          </Link>

          <Link
            href="/help"
            onClick={(e) => handleNavClick(e, "/help")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-poppins text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/help")}`}
          >
            Help Center
          </Link>

          <Link
            href="/contact"
            onClick={(e) => handleNavClick(e, "/contact")}
            className={`hidden min-[1200px]:inline-flex h-[34px] shrink-0 items-center gap-1 rounded-[100px] border px-3.5 py-1.5 font-poppins text-[12px] font-bold leading-none transition-all duration-200 ${
              contactActive
                ? "border-transparent bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
                : "border-transparent bg-black text-[#FCE001] hover:border-[#FDB813] hover:bg-black/90"
            }`}
          >
            Contact Us
            <span className="text-[12px] leading-none" aria-hidden>
              →
            </span>
          </Link>

          {/* Mobile: compact Contact + menu */}
          <div className="flex shrink-0 items-center gap-1.5 min-[1200px]:hidden">
            <Link
              href="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className={`inline-flex h-10 items-center rounded-full px-2.5 font-poppins text-[11px] font-bold leading-none transition-colors sm:px-3 ${
                contactActive
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b]"
                  : "bg-[#0b0b0b] text-[#FCE001]"
              }`}
            >
              Contact
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              onKeyDown={onMenuBtnKeyDown}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                isOpen
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_4px_12px_rgba(253,184,19,0.4)]"
                  : "bg-[#0b0b0b] text-white"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-sheet"
            >
              <div className="relative h-3.5 w-[18px]">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[6px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </nav>

        <AnimatePresence
          onExitComplete={() => {
            if (!pendingFocusReturn.current) return;
            pendingFocusReturn.current = false;
            requestAnimationFrame(() => menuBtnRef.current?.focus());
          }}
        >
          {isOpen && (
            <>
              <motion.button
                key="mobile-nav-dim"
                type="button"
                className="fixed inset-0 z-[55] bg-black/25 min-[1200px]:hidden"
                aria-label="Close menu"
                onClick={() => closeMenu()}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: easeOut }
                }
              />

              <motion.div
                key="mobile-nav-sheet"
                ref={(el) => {
                  panelRef.current = el;
                }}
                id="mobile-nav-sheet"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="fixed left-3 right-3 z-[65] flex flex-col overflow-hidden rounded-[20px] border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(11,11,11,0.2)] min-[1200px]:hidden sm:left-4 sm:right-4"
                style={{
                  top: panelTop,
                  maxHeight: sheetMaxH,
                }}
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 12, scale: 0.985 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, scale: 0.99 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.26, ease: easeOut }
                }
              >
                <div
                  data-mobile-nav-scroll
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 pt-2.5"
                >
                  <div className="grid gap-0.5 pb-3">
                    <Link
                      href="/"
                      onClick={(e) => handleNavClick(e, "/")}
                      className={mobileLinkClass("/")}
                    >
                      Home
                    </Link>

                    <ServicesMobileAccordion
                      onNavigate={handleNavClick}
                      isServiceActive={isActive}
                      onClose={() => closeMenu()}
                      scrollParentRef={panelRef}
                    />

                    <Link
                      href="/about"
                      onClick={(e) => handleNavClick(e, "/about")}
                      className={mobileLinkClass("/about")}
                    >
                      About Us
                    </Link>

                    <Link
                      href="/blog"
                      onClick={(e) => handleNavClick(e, "/blog")}
                      className={mobileLinkClass("/blog")}
                    >
                      Blog
                    </Link>

                    <Link
                      href="/help"
                      onClick={(e) => handleNavClick(e, "/help")}
                      className={mobileLinkClass("/help")}
                    >
                      Help Center
                    </Link>
                  </div>
                </div>

                <div className="shrink-0 border-t border-black/[0.06] bg-white px-2.5 py-2.5 pb-[max(10px,env(safe-area-inset-bottom))]">
                  <motion.div
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.12, ease: easeOut }
                    }
                  >
                    <Link
                      href="/contact"
                      onClick={(e) => handleNavClick(e, "/contact")}
                      className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 font-poppins text-[14px] font-bold text-[#0b0b0b] shadow-[0_6px_16px_rgba(253,184,19,0.35)]"
                    >
                      Contact Us
                      <span aria-hidden>→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
