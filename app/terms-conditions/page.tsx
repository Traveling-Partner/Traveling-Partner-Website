"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { termsSections } from "./termsSections";

const NAV_OFFSET = 88;

type SidebarPin = "hidden" | "fixed" | "bottom";

const Terms: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>(termsSections[0].slug);
  const pageHeaderRef = useRef<HTMLElement>(null);
  const termsLayoutRef = useRef<HTMLDivElement>(null);
  const sidebarColumnRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarPin, setSidebarPin] = useState<SidebarPin>("hidden");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 260 });

  const sectionLabel = (section: (typeof termsSections)[number]) => {
    if (section.slug === "contact-us") {
      return `Contact Us${section.titleSuffix ?? ""}`;
    }
    return `${section.id}. ${section.title}${section.titleSuffix ?? ""}:`;
  };

  const updateSidebar = useCallback(() => {
    const layout = termsLayoutRef.current;
    const column = sidebarColumnRef.current;
    const sidebar = sidebarRef.current;
    if (!layout || !column) return;

    const layoutRect = layout.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    const sidebarHeight = sidebar?.offsetHeight ?? 0;

    setSidebarCoords({ left: columnRect.left, width: columnRect.width });

    const heroBottom = pageHeaderRef.current?.getBoundingClientRect().bottom ?? 0;
    if (heroBottom > NAV_OFFSET) {
      setSidebarPin("hidden");
      return;
    }

    if (layoutRect.bottom <= NAV_OFFSET + sidebarHeight) {
      setSidebarPin("bottom");
      return;
    }

    setSidebarPin("fixed");
  }, []);

  useLayoutEffect(() => {
    updateSidebar();
  }, [updateSidebar]);

  useEffect(() => {
    const layout = termsLayoutRef.current;
    if (!layout) return;

    const ro = new ResizeObserver(updateSidebar);
    ro.observe(layout);
    window.addEventListener("scroll", updateSidebar, { passive: true });
    window.addEventListener("resize", updateSidebar);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", updateSidebar);
      window.removeEventListener("resize", updateSidebar);
    };
  }, [updateSidebar]);

  useEffect(() => {
    if (sidebarPin !== "hidden") {
      updateSidebar();
    }
  }, [sidebarPin, updateSidebar]);

  useEffect(() => {
    const headings = termsSections
      .map((s) => document.getElementById(s.slug))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSlug(slug);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header
        ref={pageHeaderRef}
        className="relative w-full min-h-[280px] lg:min-h-[320px] flex items-center"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>

        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-12 lg:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#FCE001] font-medium mb-8 transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            Back to Home
          </Link>

          <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-black text-white leading-tight uppercase">
            Terms and Conditions for{" "}
            <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
              Travelling Partner
            </span>
          </h1>
        </div>
      </header>

      <main
        id="terms-content"
        className="w-full bg-gradient-to-b from-gray-50 to-white pb-20 lg:pb-28"
      >
        <div className="w-[90%] mx-auto max-w-7xl pt-12 lg:pt-16">
          <nav
            className="lg:hidden mb-8 p-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100/80 shadow-sm"
            aria-label="Table of contents"
          >
            <ol className="scrollbar-brand grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-48 overflow-y-auto pr-1">
              {termsSections.map((section) => (
                <li key={section.slug}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.slug)}
                    className={`w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeSlug === section.slug
                        ? "bg-[#fce001]/20 text-[#1a1a1a] font-semibold"
                        : "text-gray-600 hover:bg-white/70"
                    }`}
                  >
                    {sectionLabel(section)}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div
            ref={termsLayoutRef}
            className="lg:grid lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] lg:gap-8 xl:gap-12"
          >
            <div
              ref={sidebarColumnRef}
              className="hidden lg:block relative h-full min-h-[1px]"
            >
              {sidebarPin !== "hidden" && (
                <aside
                  ref={sidebarRef}
                  className="z-30 w-full"
                  style={
                    sidebarPin === "fixed"
                      ? {
                          position: "fixed",
                          top: NAV_OFFSET,
                          left: sidebarCoords.left,
                          width: sidebarCoords.width,
                        }
                      : {
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                        }
                  }
                  aria-label="Table of contents"
                >
                  <nav className="p-5 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100/80 shadow-sm">
                    <ol className="scrollbar-brand space-y-0.5 max-h-[calc(100vh-11rem)] overflow-y-auto overscroll-contain pr-1">
                      {termsSections.map((section) => (
                        <li key={section.slug}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.slug)}
                            className={`w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all border-l-2 ${
                              activeSlug === section.slug
                                ? "border-[#fdb813] bg-[#fce001]/15 text-[#1a1a1a] font-semibold"
                                : "border-transparent text-gray-600 hover:bg-white/70 hover:text-[#1a1a1a]"
                            }`}
                          >
                            {sectionLabel(section)}
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </aside>
              )}
            </div>

            <article className="min-w-0 space-y-6">
              {termsSections.map((section) => (
                <section
                  key={section.slug}
                  id={section.slug}
                  className="scroll-mt-28 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                  aria-labelledby={`heading-${section.slug}`}
                >
                  <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-gray-100">
                    <h2
                      id={`heading-${section.slug}`}
                      className="text-xl sm:text-2xl font-bold text-[#1a1a1a]"
                    >
                      {sectionLabel(section)}
                    </h2>
                  </div>
                  <div className="p-6 sm:p-8">{section.content}</div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;
