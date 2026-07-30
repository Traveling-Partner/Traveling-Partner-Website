"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TermsHero from "@/components/Terms-sections/TermsHero";
import { termsClosingMessage, termsNavItems, termsSections } from "./termsSections";

const NAV_OFFSET = 108;
type PinMode = "static" | "fixed" | "bottom";

const CONTACT_ACTIONS = [
  {
    label: "Mail Us",
    href: "mailto:support@traveling-partner.com",
    icon: "/images/terms/icon-contact-envelope.png",
    detail: "support@traveling-partner.com",
  },
  {
    label: "Call Us",
    href: "tel:+923252801261",
    icon: "/images/terms/icon-contact-phone.png",
    detail: "+92 325 2801261",
  },
  {
    label: "Support",
    href: "/help",
    icon: "/images/terms/icon-contact-chat.png",
    detail: "Contact Support",
  },
] as const;

function accentTitle(title: string, suffix = ""): ReactNode {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) {
    return (
      <>
        {words[0]}
        {suffix}
      </>
    );
  }
  const last = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");
  return (
    <>
      {rest}{" "}
      <span className="font-medium italic text-[#FCE001]">
        {last}
        {suffix}
      </span>
    </>
  );
}

function getPinStyle(
  pin: PinMode,
  coords: { left: number; width: number }
): CSSProperties | undefined {
  if (pin === "fixed") {
    return {
      position: "fixed",
      top: NAV_OFFSET,
      left: coords.left,
      width: coords.width,
      zIndex: 30,
    };
  }
  if (pin === "bottom") {
    return {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
    };
  }
  return undefined;
}

export default function TermsConditionsPage() {
  const [activeSlug, setActiveSlug] = useState(termsNavItems[0]?.slug ?? "");
  const [sidebarPin, setSidebarPin] = useState<PinMode>("static");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 280 });

  const layoutRef = useRef<HTMLDivElement>(null);
  const sidebarColRef = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollLockTimer = useRef<number | null>(null);

  const updateActiveFromScroll = useCallback(() => {
    if (isProgrammaticScroll.current) return;

    const probe = NAV_OFFSET + 28;
    let current = termsNavItems[0]?.slug ?? "";

    for (const item of termsNavItems) {
      const el = document.getElementById(item.slug);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= probe) {
        current = item.slug;
      }
    }

    setActiveSlug((prev) => (prev === current ? prev : current));
  }, []);

  const updateSidebar = useCallback(() => {
    const layout = layoutRef.current;
    const column = sidebarColRef.current;
    const sidebar = sidebarInnerRef.current;
    if (!layout || !column) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      setSidebarPin("static");
      return;
    }

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
    const onScrollOrResize = () => {
      updateSidebar();
      updateActiveFromScroll();
    };

    onScrollOrResize();
    const layout = layoutRef.current;
    const ro = layout ? new ResizeObserver(onScrollOrResize) : null;
    if (layout && ro) ro.observe(layout);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (scrollLockTimer.current) window.clearTimeout(scrollLockTimer.current);
    };
  }, [updateSidebar, updateActiveFromScroll]);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;

    isProgrammaticScroll.current = true;
    setActiveSlug(slug);
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (scrollLockTimer.current) window.clearTimeout(scrollLockTimer.current);
    scrollLockTimer.current = window.setTimeout(() => {
      isProgrammaticScroll.current = false;
      updateActiveFromScroll();
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  const sidebarNav = (
    <nav
      ref={sidebarInnerRef}
      className="rounded-[28px] border border-[#eceae4] bg-white p-5 shadow-[0_6px_22px_rgba(0,0,0,0.05)] sm:rounded-[32px] sm:p-6"
      aria-label="Contents"
    >
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[12px]">
        Contents
      </p>

      <ul className="space-y-1.5 overflow-visible">
        {termsNavItems.map((item) => {
          const isActive = activeSlug === item.slug;
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => scrollToSection(item.slug)}
                className={`flex w-full items-center gap-2.5 rounded-full px-2 py-2 text-left transition-colors sm:gap-3 sm:px-2.5 sm:py-2.5 ${
                  isActive
                    ? "bg-[#0b0b0b] text-[#FCE001]"
                    : "text-[#0b0b0b] hover:bg-[#faf9f6]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold tabular-nums sm:h-8 sm:w-8 sm:text-[13px] ${
                    isActive
                      ? "bg-[#FCE001] text-[#0b0b0b]"
                      : "bg-[#f0eee8] text-[#0b0b0b]"
                  }`}
                >
                  {item.id}
                </span>
                <span
                  className={`min-w-0 text-[13px] font-semibold leading-snug sm:text-[14px] ${
                    isActive ? "text-[#FCE001]" : "text-[#0b0b0b]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-2.5 border-t border-dashed border-[#e8e4da] pt-5">
        <button
          type="button"
          onClick={handlePrint}
          className="flex w-full items-center gap-3 rounded-full border border-[#eceae4] bg-white px-3 py-2.5 text-left transition-colors hover:bg-[#faf9f6]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FCE001]">
            <Image
              src="/images/terms/icon-contact-mail.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </span>
          <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
            Print / Save as PDF
          </span>
        </button>

        <Link
          href="/contact"
          className="flex w-full items-center gap-3 rounded-full border border-[#eceae4] bg-white px-3 py-2.5 text-left transition-colors hover:bg-[#faf9f6]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FCE001]">
            <Image
              src="/images/terms/icon-contact-chat.png"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
          </span>
          <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
            Ask a question
          </span>
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <TermsHero />

      <section className="bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            ref={layoutRef}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:gap-12"
          >
            {/* Same CONTENTS sidebar on mobile + desktop (Figma match) */}
            <div ref={sidebarColRef} className="relative min-h-[1px] order-1 lg:order-none">
              <div
                className="lg:block"
                style={
                  sidebarPin === "static"
                    ? undefined
                    : getPinStyle(sidebarPin, sidebarCoords)
                }
              >
                {sidebarNav}
              </div>
            </div>

            <article className="order-2 min-w-0 rounded-[24px] border border-[#eceae4] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.05)] sm:rounded-[28px] sm:p-8 lg:order-none lg:p-10">
              {termsSections.map((section) => {
                if (section.slug === "contact-us") {
                  return (
                    <section
                      key={section.slug}
                      id={section.slug}
                      className="mt-10 scroll-mt-28"
                      aria-labelledby={`heading-${section.slug}`}
                    >
                      <div className="overflow-hidden rounded-[22px] bg-[#0b0b0b] p-5 sm:rounded-[24px] sm:p-7">
                        <div className="mb-3 flex items-center gap-3">
                          <Image
                            src="/images/terms/icon-contact-envelope.png"
                            alt=""
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                          />
                          <h2
                            id={`heading-${section.slug}`}
                            className="font-poppins text-[20px] font-extrabold text-white sm:text-[22px]"
                          >
                            Contact{" "}
                            <em
                              className="font-medium italic text-[#FCE001]"
                              style={{ fontStyle: "italic" }}
                            >
                              Us
                            </em>
                          </h2>
                        </div>
                        <div className="mb-5 space-y-3 text-[14px] leading-[1.75] sm:text-[15px] [&_p]:!text-white/75">
                          {section.content}
                        </div>
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                          {CONTACT_ACTIONS.map((action) => (
                            <Link
                              key={action.label}
                              href={action.href}
                              className="inline-flex items-center gap-2.5 rounded-full border border-[#FCE001]/50 bg-transparent px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:border-[#FCE001] hover:bg-[#FCE001]/10"
                            >
                              <Image
                                src={action.icon}
                                alt=""
                                width={22}
                                height={22}
                                className="h-[22px] w-[22px] object-contain"
                              />
                              {action.detail}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <p className="mt-6 text-center text-[14px] leading-[1.75] text-[#5c5b55] sm:mt-8 sm:text-[15px]">
                        {termsClosingMessage}
                      </p>
                    </section>
                  );
                }

                return (
                  <section
                    key={section.slug}
                    id={section.slug}
                    className="scroll-mt-28 border-b border-dashed border-[#e8e4da] py-7 first:pt-0 last:border-b-0 sm:py-8"
                    aria-labelledby={`heading-${section.slug}`}
                  >
                    <div className="mb-4 flex items-start gap-3 sm:mb-5 sm:gap-3.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-[12px] font-bold tabular-nums text-[#FCE001] sm:h-9 sm:w-9 sm:text-[13px]">
                        {section.id}
                      </span>
                      <h2
                        id={`heading-${section.slug}`}
                        className="pt-0.5 font-poppins text-[18px] font-extrabold leading-snug text-[#0b0b0b] sm:text-[22px]"
                      >
                        {accentTitle(section.title, section.titleSuffix ?? "")}
                      </h2>
                    </div>
                    <div>{section.content}</div>
                  </section>
                );
              })}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
