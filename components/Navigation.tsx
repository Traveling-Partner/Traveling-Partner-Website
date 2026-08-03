"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ServicesMegaMenuDesktop,
  ServicesMobileAccordion,
} from "@/components/ServicesMegaMenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname() ?? "";

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Keep dropdown pinned under the nav pill on mobile
  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePanelTop = () => {
      const nav = navRef.current;
      if (!nav) return;
      const rect = nav.getBoundingClientRect();
      setPanelTop(Math.round(rect.bottom + 10));
    };

    updatePanelTop();
    window.addEventListener("resize", updatePanelTop);
    window.addEventListener("scroll", updatePanelTop, true);
    return () => {
      window.removeEventListener("resize", updatePanelTop);
      window.removeEventListener("scroll", updatePanelTop, true);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkClass = (href: string) =>
    `text-black transition-all duration-200 hover:bg-[rgba(11,11,11,0.07)] ${
      isActive(href) ? "bg-[rgba(11,11,11,0.07)]" : ""
    }`;

  const contactActive =
    pathname === "/contact" || pathname.startsWith("/contact/");

  const isHome = pathname === "/";

  /** Pages where the header floats over the hero (same as home) */
  const overlayHeroPaths = [
    "/taxi-stand",
    "/pool-ride",
    "/delivery",
    "/logistic",
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
    pathname === "/blog/detail" ||
    overlayHeroPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

  return (
    <header
      className={`z-[60] w-full px-3 sm:px-4 ${
        isOverlayHeroPage
          ? "absolute inset-x-0 top-0 bg-transparent pt-3 sm:pt-5 md:pt-[43px]"
          : "relative bg-white py-3 sm:py-4"
      }`}
    >
      <div className="relative mx-auto w-full max-w-4xl min-[1200px]:max-w-[1920px]">
        <nav
          ref={navRef}
          className={`relative z-[70] flex h-14 w-full items-center justify-between gap-2 rounded-[100px] bg-white px-3 shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)] sm:h-[66px] sm:gap-3 sm:px-5 md:px-6 min-[1200px]:mx-auto min-[1200px]:h-[66px] min-[1200px]:w-fit min-[1200px]:justify-center min-[1200px]:gap-1 min-[1200px]:px-5 min-[1200px]:py-2`}
        >
          <Link
            href="/"
            className="block h-10 w-[72px] shrink-0 sm:h-[52px] sm:w-[92px] min-[1200px]:h-[52px] min-[1200px]:w-[95px]"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={110}
              height={65}
              className="h-full w-full object-contain object-left"
              priority
            />
          </Link>

          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/")}`}
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
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/about")}`}
          >
            About Us
          </Link>

          <Link
            href="/blog"
            onClick={(e) => handleNavClick(e, "/blog")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/blog")}`}
          >
            Blog
          </Link>

          <Link
            href="/help"
            onClick={(e) => handleNavClick(e, "/help")}
            className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass("/help")}`}
          >
            Help Center
          </Link>

          <Link
            href="/contact"
            onClick={(e) => handleNavClick(e, "/contact")}
            className={`hidden min-[1200px]:inline-flex h-[34px] shrink-0 items-center gap-1 rounded-[100px] px-3.5 py-1.5 font-montserrat text-[12px] font-bold leading-none transition-all duration-200 ${
              contactActive
                ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
                : "bg-black text-[#FCE001] hover:bg-black/90"
            }`}
          >
            Contact Us
            <span className="text-[12px] leading-none" aria-hidden>
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 min-[1200px]:hidden ${
              isOpen
                ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white"
                : "bg-[#fffcf2] text-black hover:bg-[#fce001]/30"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-full rounded-full bg-current transition-all duration-300 ${isOpen ? "top-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </nav>

        {/* Mobile / tablet menu overlay */}
        {isOpen && (
          <button
            type="button"
            className="fixed inset-0 z-[55] bg-[#0b0b0b]/35 backdrop-blur-[2px] min-[1200px]:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`fixed left-3 right-3 z-[65] overflow-hidden rounded-[24px] border border-white/80 bg-white/95 shadow-[0_20px_60px_rgba(11,11,11,0.14),0_8px_24px_rgba(11,11,11,0.08)] backdrop-blur-xl transition-all duration-300 min-[1200px]:hidden sm:left-4 sm:right-4 ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          style={{
            top: panelTop,
            maxHeight: `calc(100dvh - ${panelTop + 12}px)`,
          }}
          aria-hidden={!isOpen}
        >
          <div className="border-b border-[#faf5e4] bg-gradient-to-r from-[#fffcf2] via-white to-[#faf5e4] px-4 py-3 sm:px-5">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f6e68]">
              Menu
            </p>
          </div>

          <div
            className="overflow-y-auto overscroll-contain px-3 py-3 sm:px-4"
            style={{
              maxHeight: `calc(100dvh - ${panelTop + 56}px)`,
            }}
          >
            <div className="grid gap-1">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/")}
                className={`flex min-h-[44px] items-center rounded-[100px] px-4 py-3 font-montserrat text-[15px] font-medium leading-none transition-all duration-200 ${navLinkClass("/")}`}
              >
                Home
              </Link>

              <ServicesMobileAccordion
                onNavigate={handleNavClick}
                isServiceActive={isActive}
                onClose={() => setIsOpen(false)}
              />

              <Link
                href="/about"
                onClick={(e) => handleNavClick(e, "/about")}
                className={`flex min-h-[44px] items-center rounded-[100px] px-4 py-3 font-montserrat text-[15px] font-medium leading-none transition-all duration-200 ${navLinkClass("/about")}`}
              >
                About Us
              </Link>

              <Link
                href="/blog"
                onClick={(e) => handleNavClick(e, "/blog")}
                className={`flex min-h-[44px] items-center rounded-[100px] px-4 py-3 font-montserrat text-[15px] font-medium leading-none transition-all duration-200 ${navLinkClass("/blog")}`}
              >
                Blog
              </Link>

              <Link
                href="/help"
                onClick={(e) => handleNavClick(e, "/help")}
                className={`flex min-h-[44px] items-center rounded-[100px] px-4 py-3 font-montserrat text-[15px] font-medium leading-none transition-all duration-200 ${navLinkClass("/help")}`}
              >
                Help Center
              </Link>
            </div>

            <Link
              href="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className={`mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[100px] px-4 py-3 font-montserrat text-[13px] font-bold leading-none transition-all duration-200 ${
                contactActive
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
                  : "bg-[#0b0b0b] text-[#FCE001] hover:bg-[#111]"
              }`}
            >
              Contact Us
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[13px] ${
                  contactActive ? "bg-white/20" : "bg-[#FCE001] text-[#0b0b0b]"
                }`}
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
