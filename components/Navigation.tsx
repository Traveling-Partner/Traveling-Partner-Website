"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/taxi-stand", label: "Taxi Stand" },
  { href: "/pool-ride", label: "Pool Ride" },
  { href: "/delivery", label: "Delivery" },
  { href: "/logistic", label: "Logistic" },
  { href: "/trip", label: "Trip" },
  { href: "/about", label: "About Us" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "";

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
  ];
  const isOverlayHeroPage =
    isHome ||
    pathname === "/blog" ||
    pathname === "/blog/detail" ||
    overlayHeroPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    );

  return (
    <header
      className={`z-50 w-full px-3 sm:px-4 ${
        isOverlayHeroPage
          ? "absolute inset-x-0 top-0 bg-transparent pt-3 sm:pt-5 md:pt-[43px]"
          : "relative bg-white py-3 sm:py-4"
      }`}
    >
      <div className="relative mx-auto w-full max-w-4xl min-[1200px]:max-w-[1920px]">
        <nav
          className={`relative flex h-14 w-full items-center justify-between gap-2 rounded-[100px] bg-white px-3 shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)] sm:h-[66px] sm:gap-3 sm:px-5 md:px-6 min-[1200px]:mx-auto min-[1200px]:h-[66px] min-[1200px]:w-fit min-[1200px]:justify-center min-[1200px]:gap-1 min-[1200px]:px-5 min-[1200px]:py-2`}
        >
          <Link
            href="/"
            className="block h-10 w-[72px] shrink-0 sm:h-[52px] sm:w-[92px] min-[1200px]:h-[52px] min-[1200px]:w-[95px]"
            onClick={handleLinkClick}
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

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden min-[1200px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3.5 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
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
            onClick={() => setIsOpen(!isOpen)}
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
            className="fixed inset-0 z-40 bg-[#0b0b0b]/25 backdrop-blur-[2px] min-[1200px]:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-[28px] border border-white/80 bg-white/95 shadow-[0_20px_60px_rgba(11,11,11,0.12),0_8px_24px_rgba(11,11,11,0.08)] backdrop-blur-xl transition-all duration-300 min-[1200px]:hidden ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="border-b border-[#faf5e4] bg-gradient-to-r from-[#fffcf2] via-white to-[#faf5e4] px-4 py-3 sm:px-5">
            <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f6e68]">
              Menu
            </p>
          </div>

          <div className="max-h-[min(70vh,520px)] overflow-y-auto px-3 py-3 sm:px-4">
            <div className="grid gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex min-h-[44px] items-center rounded-[100px] px-4 py-3 font-montserrat text-[15px] font-medium leading-none transition-all duration-200 ${navLinkClass(link.href)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={handleLinkClick}
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
