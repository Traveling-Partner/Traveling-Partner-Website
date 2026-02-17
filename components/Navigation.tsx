"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const handleLinkClick = () => {
    setIsOpen(false);
    // Immediate scroll for mobile menu clicks
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <>
      {/* Spacer */}
      <div className="h-16 sm:h-20"></div>
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-md" 
            : "bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo - Smaller and responsive */}
            <Link href="/" className="flex-shrink-0" onClick={handleLinkClick}>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png"
                alt="Traveling Partner"
                width={180}
                height={65}
                className="relative w-[140px] sm:w-[160px] md:w-[180px] h-auto drop-shadow-lg mt-3 sm:mt-5"
                unoptimized
                priority
              />
            </Link>

            {/* Center Navigation - Hidden on mobile, visible on lg+ */}
            <div className={`hidden lg:flex items-center rounded-full p-1 h-10 sm:h-11 transition-colors ${
              scrolled ? "bg-gray-100" : "bg-black/5"
            }`}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 xl:px-5 py-2 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 flex items-center h-8 sm:h-9 whitespace-nowrap ${
                    pathname === link.href
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

            {/* Right Side - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 h-10 sm:h-11">
              <Link
                href="/download"
                className="bg-black text-white px-4 xl:px-5 py-2 rounded-full text-xs xl:text-sm font-semibold hover:bg-black/80 transition-colors flex items-center gap-1.5 xl:gap-2 h-8 sm:h-9 whitespace-nowrap"
              >
                Get App
                <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10 transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              <div className="w-5 sm:w-6 h-4 sm:h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-black ${isOpen ? "rotate-45 translate-y-[7px] sm:translate-y-[9px]" : ""}`} />
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-black ${isOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 bg-black ${isOpen ? "-rotate-45 -translate-y-[7px] sm:-translate-y-[9px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`lg:hidden border-t absolute left-0 right-0 ${
            scrolled ? "bg-white border-gray-200" : "bg-gradient-to-b from-[#FCE001] to-[#FDB813] border-black/10"
          }`}>
            <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? scrolled
                        ? "bg-gray-100 text-black"
                        : "bg-white text-black shadow-sm"
                      : scrolled
                        ? "text-gray-600 hover:bg-gray-50"
                        : "text-black/70 hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 sm:pt-4 flex flex-col gap-2">
                <Link
                  href="/download"
                  onClick={handleLinkClick}
                  className="block px-3 sm:px-4 py-2.5 sm:py-3 text-center bg-black text-white rounded-full text-sm font-semibold hover:bg-black/80 transition-colors"
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