"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HelpCategory } from "@/app/help/helpContent";

type HelpFaqSectionProps = {
  categories: HelpCategory[];
  searchQuery?: string;
};

const NAV_OFFSET = 108;

type SidebarPin = "static" | "fixed" | "bottom";

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 7 17 17M17 7 7 17" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function renderCategoryTitle(category: HelpCategory) {
  if (category.id === "payment-processing") {
    return (
      <>
        Payment{" "}
        <span className="font-medium italic text-[#FCE001]">Processing.</span>
      </>
    );
  }
  if (category.id === "safety-and-security") {
    return (
      <>
        Safety &{" "}
        <span className="font-medium italic text-[#FCE001]">Security.</span>
      </>
    );
  }
  return category.title;
}

export default function HelpFaqSection({
  categories,
  searchQuery = "",
}: HelpFaqSectionProps) {
  const [openId, setOpenId] = useState<number | null>(
    categories[0]?.items[0]?.id ?? null
  );
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [sidebarPin, setSidebarPin] = useState<SidebarPin>("static");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 280 });

  const faqLayoutRef = useRef<HTMLDivElement>(null);
  const sidebarColumnRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return categories;
    return categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.question.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, normalizedQuery]);

  const updateSidebar = useCallback(() => {
    const layout = faqLayoutRef.current;
    const column = sidebarColumnRef.current;
    const sidebar = sidebarRef.current;
    if (!layout || !column) return;

    const layoutRect = layout.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    const sidebarHeight = sidebar?.offsetHeight ?? 0;

    setSidebarCoords({ left: columnRect.left, width: columnRect.width });

    if (layoutRect.top > NAV_OFFSET) {
      setSidebarPin("static");
      return;
    }

    if (layoutRect.bottom <= NAV_OFFSET + sidebarHeight + 16) {
      setSidebarPin("bottom");
      return;
    }

    setSidebarPin("fixed");
  }, []);

  useEffect(() => {
    updateSidebar();
    const layout = faqLayoutRef.current;
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
    if (sidebarPin !== "static") {
      updateSidebar();
    }
  }, [sidebarPin, updateSidebar, openId]);

  useEffect(() => {
    const sections = categories
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
  }, [categories]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(id);
    }
  };

  const sidebarNav = (
    <nav
      ref={sidebarRef}
      className="rounded-[24px] border border-[#eceae4] bg-white p-5 shadow-[0_6px_22px_rgba(0,0,0,0.05)]"
      aria-label="Help categories"
    >
      <ul className="space-y-1">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => scrollToCategory(category.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors ${
                  isActive
                    ? "bg-[#FFF9E5] text-[#0b0b0b]"
                    : "text-[#6b6960] hover:bg-[#faf9f6] hover:text-[#0b0b0b]"
                }`}
              >
                <span>{category.title}</span>
                <ChevronRightIcon
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? "text-[#0b0b0b]" : "text-[#c4c0b6]"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-[18px] border border-[#eceae4] bg-[#f7f7f7] p-4">
        <p className="text-[14px] font-bold leading-snug text-[#0b0b0b]">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-[#6b6960]">
          Our support team are ready to help.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-4 py-2.5 text-[13px] font-bold text-[#0b0b0b] transition-opacity hover:opacity-90"
        >
          Contact now
        </Link>
      </div>
    </nav>
  );

  return (
    <section className="bg-[#FEFBF6] pb-16 pt-4 sm:pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={faqLayoutRef}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-12"
        >
          <div
            ref={sidebarColumnRef}
            className="relative hidden min-h-[1px] lg:block"
          >
            {sidebarPin === "static" && (
              <aside className="w-full">{sidebarNav}</aside>
            )}

            {sidebarPin === "fixed" && (
              <aside
                className="z-30"
                style={{
                  position: "fixed",
                  top: NAV_OFFSET,
                  left: sidebarCoords.left,
                  width: sidebarCoords.width,
                }}
              >
                {sidebarNav}
              </aside>
            )}

            {sidebarPin === "bottom" && (
              <aside className="absolute bottom-0 left-0 w-full">{sidebarNav}</aside>
            )}
          </div>

          <div className="min-w-0 space-y-10 sm:space-y-12">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-28"
                aria-labelledby={`help-category-${category.id}`}
              >
                <div className="mb-5 flex items-center gap-3 sm:mb-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] sm:h-12 sm:w-12">
                    <Image
                      src={category.iconSrc}
                      alt=""
                      width={48}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h2
                    id={`help-category-${category.id}`}
                    className="font-poppins text-[22px] font-extrabold leading-tight text-[#0b0b0b] sm:text-[26px]"
                  >
                    {renderCategoryTitle(category)}
                  </h2>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const isOpen = openId === item.id;
                    return (
                      <div
                        key={item.id}
                        id={`faq-${item.id}`}
                        className={`overflow-hidden rounded-[22px] border bg-white transition-all duration-300 sm:rounded-[24px] ${
                          isOpen
                            ? "border-[#FDE68A] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                            : "border-[#eceae4] shadow-[0_4px_14px_rgba(0,0,0,0.04)]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          className={`flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 ${
                            isOpen ? "bg-[#FFFDF0]" : "bg-white"
                          }`}
                          aria-expanded={isOpen}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold sm:h-10 sm:w-10 sm:text-[14px] ${
                              isOpen
                                ? "bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[#0b0b0b] shadow-[0_4px_12px_rgba(252,224,1,0.35)]"
                                : "bg-[#fff8e1] text-[#0b0b0b]"
                            }`}
                          >
                            {itemIndex + 1}
                          </span>

                          <span
                            className={`min-w-0 flex-1 text-[15px] font-bold leading-snug sm:text-[16px] ${
                              isOpen ? "text-[#0b0b0b]" : "text-[#3d3d38]"
                            }`}
                          >
                            {item.question}
                          </span>

                          <span
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 ${
                              isOpen
                                ? "bg-[#0b0b0b] text-[#FCE001]"
                                : "bg-[#f3f2ee] text-[#6b6960]"
                            }`}
                          >
                            {isOpen ? (
                              <CloseIcon className="h-4 w-4" />
                            ) : (
                              <PlusIcon className="h-4 w-4" />
                            )}
                          </span>
                        </button>

                        <div
                          className={`grid bg-white transition-all duration-300 ease-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-[#eceae4] bg-white px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
