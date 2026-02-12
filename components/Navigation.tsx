"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/Assist/logo/Logo (1).png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/about");

  const links = [
    { href: "/", label: "Home" },
    { href: "/taxi-stand", label: "Taxi Stand" },
    { href: "/pool-ride", label: "Pool Ride" },
    { href: "/delivery", label: "Delivery" },
    { href: "/logistic", label: "Logistic" },
    { href: "/trip", label: "Trip" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#FCE001] to-[#FDB813] shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-18 md:h-20 lg:h-22">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={logo}
              alt="Traveling Partner Logo"
              width={200}
              height={120}
              className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 lg:w-56 lg:h-32 object-contain mt-10"
              priority
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile, visible on lg and up */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`font-poppins text-xs xl:text-sm font-medium transition-all duration-200 relative whitespace-nowrap ${
                  activeLink === link.href
                    ? "text-black font-semibold"
                    : "text-black/80 hover:text-black"
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation - Visible only on md screens */}
          <div className="hidden md:flex lg:hidden items-center space-x-3">
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`font-poppins text-xs font-medium transition-all duration-200 relative whitespace-nowrap ${
                  activeLink === link.href
                    ? "text-black font-semibold"
                    : "text-black/80 hover:text-black"
                }`}
              >
                {link.label}
                {activeLink === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black rounded-full"></span>
                )}
              </Link>
            ))}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-black/10 transition-colors"
            >
              <span className="text-xs font-poppins font-medium text-black/80">
                More
              </span>
            </button>
          </div>

          {/* Mobile menu button - Visible on small screens */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-black" />
            ) : (
              <Menu size={24} className="text-black" />
            )}
          </button>
        </div>

        {/* Mobile & Tablet Dropdown Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gradient-to-b from-[#FCE001] to-[#FDB813] border-t border-black/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-lg font-poppins text-sm font-medium transition-colors duration-200 ${
                    activeLink === link.href
                      ? "bg-black/10 text-black font-semibold"
                      : "text-black/80 hover:bg-black/5 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
