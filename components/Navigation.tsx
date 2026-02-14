"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/Assist/logo/Logo (1).png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/TaxiStand", label: "Taxi Stand" },
    { href: "/pool-ride", label: "Pool Ride" },
    { href: "/delivery", label: "Delivery" },
    { href: "/logistic", label: "Logistic" },
    { href: "/trip", label: "Trip" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <>
      {/* Spacer */}
      <div className="h-20"></div>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-md" 
            : "bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={logo}
                alt="Traveling Partner"
                width={140}
                height={50}
                className="w-32 h-auto object-contain"
                priority
              />
            </Link>

            {/* Center Navigation */}
            <div className={`hidden lg:flex items-center rounded-full p-1 h-11 transition-colors ${
              scrolled ? "bg-gray-100" : "bg-black/5"
            }`}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center h-9 ${
                    activeLink === link.href
                      ? scrolled 
                        ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-white shadow-sm" 
                        : "bg-white text-black shadow-sm"
                      : scrolled
                        ? "text-gray-600 hover:text-[#FDB813]"
                        : "text-black/70 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-4 h-11">
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors px-3 flex items-center h-9 ${
                  scrolled ? "text-gray-600 hover:text-black" : "text-black/80 hover:text-black"
                }`}
              >
                Log in
              </Link>
              <Link
                href="/download"
                className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-black/80 transition-colors flex items-center gap-2 h-9"
              >
                Get App
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10 transition-colors"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 rounded-full transition-all ${scrolled ? "bg-black" : "bg-black"} ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`w-full h-0.5 rounded-full transition-all ${scrolled ? "bg-black" : "bg-black"} ${isOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 rounded-full transition-all ${scrolled ? "bg-black" : "bg-black"} ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`lg:hidden border-t ${
            scrolled ? "bg-white border-gray-200" : "bg-gradient-to-b from-[#FCE001] to-[#FDB813] border-black/10"
          }`}>
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                    activeLink === link.href
                      ? scrolled
                        ? "bg-gray-100 text-black"
                        : "bg-white text-black shadow-sm"
                      : scrolled
                        ? "text-gray-600"
                        : "text-black/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                {/* <Link
                  href="/login"
                  className={`block px-4 py-3 text-center text-sm font-medium ${
                    scrolled ? "text-gray-600" : "text-black/80"
                  }`}
                >
                  Log in
                </Link> */}
                <Link
                  href="/download"
                  className="block px-4 py-3 text-center bg-black text-white rounded-full text-sm font-semibold"
                >
                  Get App →
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}