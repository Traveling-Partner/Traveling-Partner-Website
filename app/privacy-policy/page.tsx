"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PrivacyHero from "@/components/privacy-sections/PrivacyHero";
import {
  privacyClosingCard,
  privacyNavItems,
  privacySections,
} from "./privacySections";

const NAV_OFFSET = 108;
type PinMode = "static" | "fixed" | "bottom";

const CONTACT_ACTIONS = [
  {
    label: "Email",
    href: "mailto:hello@traveling-partner.com",
    icon: "/images/terms/icon-contact-envelope.png",
    detail: "hello@traveling-partner.com",
  },
  {
    label: "Call",
    href: "tel:+923252801261",
    icon: "/images/terms/icon-contact-phone.png",
    detail: "+92 325 2801261",
  },
  {
    label: "Message",
    href: "/contact",
    icon: "/images/terms/icon-contact-chat.png",
    detail: "Send us a message",
  },
] as const;

function accentTitle(title: string): ReactNode {
  const words = title.trim().split(/\s+/);
  if (words.length === 1) return title;
  const last = words[words.length - 1];
  const rest = words.slice(0, -1).join(" ");
  return (
    <>
      {rest}{" "}
      <span className="font-medium italic text-[#FCE001]">{last}</span>
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

export default function PrivacyPolicyPage() {
  const [activeSlug, setActiveSlug] = useState<string>(privacyNavItems[0]?.slug ?? "");
  const [sidebarPin, setSidebarPin] = useState<PinMode>("static");
  const [sidebarCoords, setSidebarCoords] = useState({ left: 0, width: 280 });

  const layoutRef = useRef<HTMLDivElement>(null);
  const sidebarColRef = useRef<HTMLDivElement>(null);
  const sidebarInnerRef = useRef<HTMLElement>(null);

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
    updateSidebar();
    const layout = layoutRef.current;
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
    const headings = privacySections
      .map((s) => document.getElementById(s.slug))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSlug(visible[0]?.target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
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

  const sidebarNav = (
    <nav
      ref={sidebarInnerRef}
      className="rounded-[28px] border border-[#eceae4] bg-white p-5 shadow-[0_6px_22px_rgba(0,0,0,0.05)] sm:rounded-[32px] sm:p-6"
      aria-label="On this page"
    >
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FCE001] sm:text-[12px]">
        On this page
      </p>

      <ul className="space-y-1.5 overflow-visible">
        {privacyNavItems.map((item) => {
          const isActive = activeSlug === item.slug;
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => scrollToSection(item.slug)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors sm:gap-3 ${
                  isActive
                    ? "border-l-[4px] border-[#FCE001] bg-[#0b0b0b] text-white"
                    : "border-l-[4px] border-transparent text-[#0b0b0b] hover:bg-[#faf9f6]"
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
                    isActive ? "text-white" : "text-[#0b0b0b]"
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
        <Link
          href="/terms-conditions"
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
            Terms &amp; Conditions
          </span>
        </Link>
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
      <PrivacyHero />

      <section className="bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4">
        <div className="mx-auto w-[92%] max-w-[1200px]">
          <div
            ref={layoutRef}
            className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 xl:gap-12"
          >
            <div ref={sidebarColRef} className="relative order-1 min-h-[1px] lg:order-none">
              <div
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
              {privacySections.map((section) => {
                if (section.slug === "contact-us") {
                  return (
                    <section
                      key={section.slug}
                      id={section.slug}
                      className="mt-10 scroll-mt-28"
                      aria-labelledby={`heading-${section.slug}`}
                    >
                      <div className="relative overflow-hidden rounded-[22px] bg-[#0b0b0b] p-5 sm:rounded-[28px] sm:p-8">
                        {/* Decorative dotted arc (top-right) */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full border-[3px] border-dashed border-[#FCE001]/25 sm:-right-8 sm:-top-12 sm:h-52 sm:w-52"
                        />

                        <div className="relative mb-4 flex items-center gap-3 sm:mb-5 sm:gap-3.5">
                          <Image
                            src="/images/terms/icon-contact-envelope.png"
                            alt=""
                            width={48}
                            height={48}
                            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
                          />
                          <h2
                            id={`heading-${section.slug}`}
                            className="font-poppins text-[22px] font-extrabold leading-none text-white sm:text-[26px]"
                          >
                            Get in{" "}
                            <span className="font-semibold italic text-[#FCE001]">
                              Touch.
                            </span>
                          </h2>
                        </div>

                        <p className="relative mb-5 max-w-[52ch] text-[14px] leading-[1.7] text-[#9a968c] sm:mb-6 sm:text-[15px] sm:leading-[1.75]">
                          For privacy-related questions, concerns, or data requests,
                          reach out through any of the channels below.
                        </p>

                        <div className="relative flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                          {CONTACT_ACTIONS.map((action) => (
                            <Link
                              key={action.label}
                              href={action.href}
                              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1a1a1a] px-3.5 py-2.5 text-[13px] font-medium text-white transition-colors hover:border-[#FCE001]/40 hover:bg-[#222] sm:text-[14px]"
                            >
                              <Image
                                src={action.icon}
                                alt=""
                                width={28}
                                height={28}
                                className="h-7 w-7 shrink-0 rounded-full object-cover"
                              />
                              {action.detail}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 rounded-[24px] border border-dashed border-[#d4d0c6] bg-[#FFFBF0] px-5 py-6 sm:mt-8 sm:rounded-[28px] sm:px-8 sm:py-8">
                        <p className="mb-4 text-[14px] leading-[1.7] text-[#2D2D2D] sm:text-[15px] sm:leading-[1.75]">
                          {privacyClosingCard.paragraph1}
                        </p>
                        <p className="text-[14px] leading-[1.7] text-[#2D2D2D] sm:text-[15px] sm:leading-[1.75]">
                          {privacyClosingCard.paragraph2}
                        </p>
                      </div>
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
                        {accentTitle(section.title)}
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
