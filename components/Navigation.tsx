"use client";

import Link from "next/link";
import { useState } from "react";
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

  const isHome = pathname === "/";

  return (
    <header
      className={`z-50 flex justify-center px-4 ${
        isHome ? "absolute inset-x-0 top-0 bg-transparent pt-[43px]" : "relative bg-white py-4"
      }`}
    >
      <div className="relative flex w-full max-w-[1920px] justify-center">
        <nav className="flex h-[66px] w-fit max-w-full items-center gap-1 rounded-[100px] bg-white px-[23px] py-[11px] shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)]">
          <Link
            href="/"
            className="block h-[65px] w-[110px] shrink-0"
            onClick={handleLinkClick}
          >
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={110}
              height={65}
              className="h-[65px] w-[110px] object-contain object-left"
              priority
            />
          </Link>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden min-[1200px]:inline-flex h-[36px] shrink-0 items-center whitespace-nowrap rounded-[100px] px-3.5 font-montserrat text-[13px] font-medium leading-none transition-all duration-200 ${navLinkClass(link.href)}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className={`hidden min-[1200px]:inline-flex h-[40px] shrink-0 items-center gap-1 rounded-[100px] px-4 py-2 font-montserrat text-[12px] font-bold leading-none transition-all duration-200 ${
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
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5 min-[1200px]:hidden"
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

        {isOpen && (
          <div className="absolute top-[calc(100%+8px)] left-1/2 w-[min(100%,420px)] -translate-x-1/2 overflow-hidden rounded-3xl bg-white px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.08)] min-[1200px]:hidden">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block rounded-[100px] px-4 py-2.5 font-montserrat text-[14px] font-medium leading-none transition-all duration-200 ${navLinkClass(link.href)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`mt-3 inline-flex h-[40px] w-full items-center justify-center gap-1 rounded-[100px] px-3 py-1.5 font-montserrat text-[12px] font-bold leading-none transition-all duration-200 ${
                contactActive
                  ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm"
                  : "bg-black text-[#FCE001]"
              }`}
            >
              Contact Us
              <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
