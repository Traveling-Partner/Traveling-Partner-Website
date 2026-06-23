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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinkClass = (href: string) =>
    isActive(href)
      ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
      : "text-black hover:text-black/80";

  const contactActive =
    pathname === "/contact" || pathname.startsWith("/contact/");

  return (
    <header className="relative z-50 px-3 py-2.5 sm:px-4 sm:py-4 min-[1100px]:flex min-[1100px]:justify-center">
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] min-[1100px]:hidden"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="relative z-50 mx-auto w-full max-w-7xl min-[1100px]:w-auto min-[1100px]:max-w-none">
        <nav className="flex h-14 w-full items-center justify-between gap-3 rounded-[100px] bg-white px-3 shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)] sm:h-16 sm:px-4 min-[1100px]:h-[76px] min-[1100px]:w-fit min-[1100px]:justify-start min-[1100px]:gap-1.5 min-[1100px]:py-2">
          <Link
            href="/"
            className="block h-10 w-[72px] shrink-0 sm:h-12 sm:w-[82px] min-[1100px]:h-[56px] min-[1100px]:w-[95px]"
            onClick={handleLinkClick}
          >
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={95}
              height={56}
              className="h-full w-full object-cover object-left"
              priority
            />
          </Link>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden min-[1100px]:inline-flex h-[32px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`hidden min-[1100px]:inline-flex h-[30px] shrink-0 items-center gap-1 rounded-[100px] px-3 py-1.5 font-montserrat text-[12px] font-bold leading-none transition-all duration-200 ${
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-black/5 transition-colors min-[1100px]:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <div className="flex h-4 w-5 flex-col justify-between">
              <span
                className={`h-0.5 w-full rounded-full bg-black transition-all duration-300 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full rounded-full bg-black transition-all duration-300 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </nav>

        <div
          className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 min-[1100px]:hidden sm:rounded-3xl ${
            isOpen
              ? "visible max-h-[min(70vh,520px)] opacity-100"
              : "invisible max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain px-3 py-2 sm:px-4 sm:py-3">
            <div className="space-y-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block rounded-xl px-3 py-2 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 sm:rounded-[100px] sm:px-4 sm:py-2.5 sm:text-[14px] ${navLinkClass(link.href)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`mt-2 inline-flex h-9 w-full items-center justify-center gap-1 rounded-xl px-3 font-montserrat text-[12px] font-bold leading-none transition-all duration-200 sm:mt-3 sm:h-[30px] sm:rounded-[100px] ${
                contactActive
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
                  : "bg-black text-[#FCE001]"
              }`}
            >
              Contact Us
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
