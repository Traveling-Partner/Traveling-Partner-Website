"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  List,
} from "lucide-react";
import { helpCategories } from "./helpContent";
const NAV_OFFSET = 88;
const totalQuestions = helpCategories.reduce((n, c) => n + c.items.length, 0);

type SidebarPin = "hidden" | "fixed" | "bottom";

export default function HelpCenter(): React.ReactElement {
  const [openId, setOpenId] = useState<number | null>(helpCategories[0].items[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState(helpCategories[0].id);
  const pageHeaderRef = useRef<HTMLElement>(null);
  const helpLayoutRef = useRef<HTMLDivElement>(null);
  const sidebarColumnRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const [sidebarPin, setSidebarPin] = useState<SidebarPin>("hidden");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 260 });

  const updateSidebar = useCallback(() => {
    const layout = helpLayoutRef.current;
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
    const layout = helpLayoutRef.current;
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
    const sections = helpCategories
      .map((c) => document.getElementById(c.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header
        ref={pageHeaderRef}
        className="relative w-full min-h-[480px] lg:min-h-[560px] flex items-center"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="https://images.pexels.com/photos/4606338/pexels-photo-4606338.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/45" />
        </div>

        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-16 lg:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#FCE001] font-medium mb-10 transition-colors group"
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
            />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FCE001] px-4 py-2 rounded-full mb-6">
                <HelpCircle className="w-4 h-4 text-[#1a1a1a]" aria-hidden="true" />
                <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                  Support
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[42px] lg:text-[52px] font-black text-white leading-[1.08] mb-4">
                Traveling Partner{" "}
                <span className="block sm:inline bg-gradient-to-r from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
                  Help Center
                </span>
              </h1>

              <div className="flex flex-wrap gap-2 mt-6">
                {helpCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/25 hover:bg-[#FCE001] hover:text-[#1a1a1a] hover:border-[#FCE001] transition-all backdrop-blur-sm"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div
                  className="absolute -inset-3 bg-gradient-to-r from-[#fce001]/25 to-[#fdb813]/25 rounded-3xl blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h2 className="text-white text-lg font-bold mb-5">Topics</h2>
                  <ul className="space-y-3">
                    {helpCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <li key={cat.id}>
                          <button
                            type="button"
                            onClick={() => scrollToCategory(cat.id)}
                            className="w-full flex items-center justify-between gap-3 py-2.5 border-b border-white/10 last:border-0 text-left group"
                          >
                            <span className="flex items-center gap-3 text-white/90 group-hover:text-[#FCE001] transition-colors">
                              <Icon className="w-5 h-5 text-[#FCE001]" aria-hidden="true" />
                              {cat.title}
                            </span>
                            <span className="text-[#FCE001] text-sm font-bold tabular-nums">
                              {cat.items.length}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full bg-gradient-to-r from-[#FCE001] to-[#FDB813] py-6 sm:py-7">
        <div className="w-[90%] mx-auto max-w-7xl flex flex-wrap justify-center lg:justify-between items-center gap-4">
          <p className="text-[#1a1a1a] font-bold text-sm sm:text-base tabular-nums">
            {helpCategories.length} · {totalQuestions}
          </p>
          <a
            href="#help-content"
            className="px-6 py-2.5 bg-white text-[#1a1a1a] rounded-full font-semibold text-sm hover:shadow-md transition-shadow"
            aria-label="Scroll to help content"
          >
            ↓
          </a>
        </div>
      </div>

      <main
        id="help-content"
        className="w-full bg-gradient-to-b from-gray-50 via-gray-50/50 to-white pb-20 lg:pb-28"
      >
        <div className="w-[90%] mx-auto max-w-7xl pt-12 lg:pt-16">
          <nav
            className="lg:hidden mb-8 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
            aria-label="Help categories"
          >
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
              <List className="w-4 h-4 text-[#fdb813]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                Topics
              </span>
            </div>
            <ol className="scrollbar-brand grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-52 overflow-y-auto pr-1">
              {helpCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => scrollToCategory(category.id)}
                      className={`w-full flex items-center gap-2 text-left text-sm py-2.5 px-3 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? "bg-[#fce001]/25 text-[#1a1a1a] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#fdb813] shrink-0" aria-hidden="true" />
                      {category.title}:
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div
            ref={helpLayoutRef}
            className="lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] lg:gap-10 xl:gap-12"
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
                  aria-label="Help categories"
                >
                  <nav className="p-5 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                      <List className="w-4 h-4 text-[#fdb813]" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">
                        Topics
                      </span>
                    </div>
                    <ol className="scrollbar-brand space-y-1 max-h-[calc(100vh-11rem)] overflow-y-auto overscroll-contain pr-1">
                      {helpCategories.map((category) => {
                        const Icon = category.icon;
                        const isActive = activeCategory === category.id;
                        return (
                          <li key={category.id}>
                            <button
                              type="button"
                              onClick={() => scrollToCategory(category.id)}
                              className={`w-full flex items-center gap-2.5 text-left text-sm py-2.5 px-3 rounded-xl transition-all border-l-[3px] ${
                                isActive
                                  ? "border-[#fdb813] bg-gradient-to-r from-[#fce001]/20 to-transparent font-semibold text-[#1a1a1a]"
                                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-[#1a1a1a]"
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 shrink-0 ${isActive ? "text-[#fdb813]" : "text-gray-400"}`}
                                aria-hidden="true"
                              />
                              <span className="flex-1">{category.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>
                </aside>
              )}
            </div>

            <article className="min-w-0 space-y-12">
              {helpCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <section
                    key={category.id}
                    id={category.id}
                    className="scroll-mt-28"
                    aria-labelledby={`category-${category.id}`}
                  >
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className="px-6 sm:px-8 py-6 sm:py-7 border-b border-gray-100 bg-gradient-to-r from-[#fce001]/10 via-white to-white">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fce001] to-[#fdb813] flex items-center justify-center shadow-md">
                            <Icon className="w-7 h-7 text-[#1a1a1a]" aria-hidden="true" />
                          </div>
                          <div>
                            <h2
                              id={`category-${category.id}`}
                              className="text-2xl sm:text-3xl font-black text-[#1a1a1a]"
                            >
                              {category.title}:
                            </h2>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-3">
                        {category.items.map((item, itemIndex) => {
                          const isOpen = openId === item.id;
                          return (
                            <div
                              key={item.id}
                              id={`faq-${item.id}`}
                              className={`rounded-2xl border transition-all duration-300 scroll-mt-28 ${
                                isOpen
                                  ? "border-[#fdb813]/40 bg-gradient-to-br from-[#fce001]/5 to-white shadow-md"
                                  : "border-gray-100 bg-gray-50/50 hover:border-[#fce001]/30 hover:bg-white"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenId(isOpen ? null : item.id)
                                }
                                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-4 text-left group"
                                aria-expanded={isOpen}
                              >
                                <span
                                  className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                                    isOpen
                                      ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] text-[#1a1a1a] shadow-sm"
                                      : "bg-white border border-gray-200 text-gray-500 group-hover:border-[#fdb813]/50"
                                  }`}
                                >
                                  {itemIndex + 1}
                                </span>
                                <span className="flex-1 min-w-0">
                                  <span
                                    className={`block text-base sm:text-lg font-bold leading-snug transition-colors ${
                                      isOpen
                                        ? "text-[#fdb813]"
                                        : "text-[#1a1a1a] group-hover:text-[#fdb813]"
                                    }`}
                                  >
                                    {item.question}
                                  </span>
                                </span>
                                <span
                                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all mt-0.5 ${
                                    isOpen
                                      ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] rotate-180"
                                      : "bg-white border border-gray-200 group-hover:bg-gray-100"
                                  }`}
                                >
                                  <ChevronDown
                                    className={`w-5 h-5 ${isOpen ? "text-[#1a1a1a]" : "text-gray-500"}`}
                                    aria-hidden="true"
                                  />
                                </span>
                              </button>

                              <div
                                className={`grid transition-all duration-300 ease-out ${
                                  isOpen
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                                }`}
                              >
                                <div className="overflow-hidden">
                                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-0 sm:ml-[52px] border-t border-[#fce001]/20">
                                    <div className="pt-4 prose-help">
                                      {item.answer}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}

            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
