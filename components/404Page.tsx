"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import DriveScene from "@/components/404/DriveScene";

/**
 * 404 — Not Found.
 * Same cream / glow / typography / sticker system as Help / About / Contact
 * heroes, driven by a GSAP entrance timeline, ambient looping motion, a
 * cursor spotlight and magnetic buttons. `DriveScene` below is the visual
 * centerpiece: a real branded car drives up to a literal dead end.
 */

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

function CompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-1.6 4.4a1 1 0 0 1-.6.6l-4.4 1.6 1.6-4.4a1 1 0 0 1 .6-.6z" />
    </svg>
  );
}

export default function NotFoundPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const stickerRef = useRef<HTMLSpanElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const primaryWrapRef = useRef<HTMLDivElement>(null);
  const secondaryWrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLSpanElement[]>([]);

  const pushBlob = (el: HTMLDivElement | null) => {
    if (el && !blobsRef.current.includes(el)) blobsRef.current.push(el);
  };
  const pushDot = (el: HTMLSpanElement | null) => {
    if (el && !dotsRef.current.includes(el)) dotsRef.current.push(el);
  };

  // Float the shared nav over this page so the yellow gradient mixes
  // behind the header (no solid white/cream band).
  useEffect(() => {
    document.body.dataset.tpChrome = "not-found";
    return () => {
      delete document.body.dataset.tpChrome;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ghostRef.current,
        { opacity: 0, scale: 0.86, y: 26, rotate: -5 },
        { opacity: 0.16, scale: 1, y: 0, rotate: 0, duration: 1.1 },
      )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.7",
        )
        .fromTo(
          [word1Ref.current, word2Ref.current],
          { opacity: 0, y: 44, rotateX: -70 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .fromTo(
          stickerRef.current,
          { opacity: 0, scale: 0.4, rotate: 14 },
          {
            opacity: 1,
            scale: 1,
            rotate: -3,
            duration: 0.65,
            ease: "back.out(2.2)",
          },
          "-=0.45",
        )
        .fromTo(
          tagRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.15",
        )
        .fromTo(
          paraRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.3",
        )
        .fromTo(
          [primaryWrapRef.current, secondaryWrapRef.current],
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.25",
        )
        .fromTo(
          sceneRef.current,
          { opacity: 0, y: 30, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          "-=0.2",
        )
        .fromTo(
          pillRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        );

      // Signature shine sweep across the sticker — a small premium-SaaS tell
      gsap.fromTo(
        shineRef.current,
        { xPercent: -20, skewX: -18 },
        {
          xPercent: 420,
          skewX: -18,
          duration: 1.1,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 2.6,
          delay: 2,
        },
      );

      // Ambient ghost watermark bob
      gsap.to(ghostRef.current, {
        y: "+=16",
        duration: 4.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Compass keeps turning, always looking for the way back
      gsap.to(".nf-compass", {
        rotate: 360,
        duration: 7,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Soft ambient blobs drifting behind the content
      blobsRef.current.forEach((blob, i) => {
        gsap.to(blob, {
          x: (i % 2 === 0 ? 1 : -1) * gsap.utils.random(24, 46),
          y: (i % 2 === 0 ? -1 : 1) * gsap.utils.random(20, 40),
          duration: gsap.utils.random(6, 9),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        });
      });

      // Tiny yellow accent dots sparkling near the headline
      dotsRef.current.forEach((dot, i) => {
        gsap.to(dot, {
          y: -10 - i * 3,
          x: i % 2 === 0 ? 6 : -6,
          opacity: 0.9,
          duration: 1.6 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.5 + 1.2,
        });
      });

      // Cursor spotlight — subtle brand-yellow glow trailing the pointer
      const spotlight = spotlightRef.current;
      if (spotlight) {
        const setX = gsap.quickTo(spotlight, "x", {
          duration: 0.7,
          ease: "power3.out",
        });
        const setY = gsap.quickTo(spotlight, "y", {
          duration: 0.7,
          ease: "power3.out",
        });
        const ghostSetX = ghostRef.current
          ? gsap.quickTo(ghostRef.current, "xPercent", {
              duration: 0.9,
              ease: "power3.out",
            })
          : null;

        const onMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          setX(relX);
          setY(relY);

          if (ghostSetX) {
            const norm = (relX / rect.width - 0.5) * 2;
            ghostSetX(norm * -1.5);
          }
        };
        const onEnter = () => gsap.to(spotlight, { opacity: 1, duration: 0.4 });
        const onLeave = () => gsap.to(spotlight, { opacity: 0, duration: 0.5 });

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseenter", onEnter);
        section.addEventListener("mouseleave", onLeave);

        // Magnetic buttons
        const magnets = [primaryWrapRef.current, secondaryWrapRef.current].filter(
          (el): el is HTMLDivElement => !!el,
        );
        const magnetCleanups = magnets.map((el) => {
          const setMX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
          const setMY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
          const onMagMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const relX = e.clientX - r.left - r.width / 2;
            const relY = e.clientY - r.top - r.height / 2;
            setMX(relX * 0.28);
            setMY(relY * 0.35);
          };
          const onMagLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
          };
          el.addEventListener("mousemove", onMagMove);
          el.addEventListener("mouseleave", onMagLeave);
          return () => {
            el.removeEventListener("mousemove", onMagMove);
            el.removeEventListener("mouseleave", onMagLeave);
          };
        });

        return () => {
          section.removeEventListener("mousemove", onMove);
          section.removeEventListener("mouseenter", onEnter);
          section.removeEventListener("mouseleave", onLeave);
          magnetCleanups.forEach((fn) => fn());
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FEFBF6]"
      style={{ perspective: 900 }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 55% 48% at 50% 6%, rgba(252,224,1,0.32), transparent 68%),
            radial-gradient(ellipse 42% 38% at 6% 60%, rgba(253,184,19,0.16), transparent 70%),
            radial-gradient(ellipse 40% 36% at 96% 55%, rgba(252,224,1,0.14), transparent 68%)
          `,
        }}
      />

      {/* Drifting ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          ref={pushBlob}
          className="absolute left-[8%] top-[18%] h-[220px] w-[220px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]/25 blur-3xl"
        />
        <div
          ref={pushBlob}
          className="absolute right-[10%] top-[38%] h-[260px] w-[260px] rounded-full bg-[#fdb813]/20 blur-3xl"
        />
        <div
          ref={pushBlob}
          className="absolute bottom-[10%] left-[42%] h-[200px] w-[200px] rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]/18 blur-3xl"
        />
      </div>

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(253,184,19,0.22) 0%, rgba(252,224,1,0.08) 45%, transparent 70%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Ghost "404" watermark — decorative, sits behind the message */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[8%] flex select-none justify-center sm:top-[6%] md:top-[7%]"
        aria-hidden="true"
      >
        <span
          ref={ghostRef}
          className="inline-block bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-poppins font-extrabold leading-none text-transparent opacity-[0.16]"
          style={{ fontSize: "clamp(7rem, 26vw, 17rem)", willChange: "transform" }}
        >
          404
        </span>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-16 pt-[120px] text-center sm:px-6 sm:pb-20 sm:pt-[136px] md:pt-[150px] lg:px-8 lg:pt-[160px]">
        <div ref={badgeRef} className="relative mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6">
          <span
            ref={pushDot}
            className="pointer-events-none absolute -right-1.5 -top-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]"
            aria-hidden="true"
          />
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white sm:text-[11px]">
            Error 404 · Off Route
          </span>
        </div>

        <h1 className="mb-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 font-poppins text-[38px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:mb-5 sm:gap-x-3 sm:text-5xl md:text-6xl lg:text-[64px]">
          <span ref={word1Ref} className="inline-block">
            Page
          </span>
          <span ref={word2Ref} className="inline-block">
            Not
          </span>
          <span
            ref={stickerRef}
            className="relative inline-block origin-center -rotate-[3deg] rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-gradient-to-b from-[#FCE001] to-[#FDB813] px-3 py-0.5 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1"
          >
            <span
              className="pointer-events-none absolute inset-[1px] overflow-hidden rounded-[8px] sm:rounded-[10px]"
              aria-hidden="true"
            >
              <span
                ref={shineRef}
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                style={{ willChange: "transform" }}
              />
            </span>
            <em className="relative font-medium italic text-black">Found.</em>
            <span
              ref={pushDot}
              className="pointer-events-none absolute -right-2 -top-2 h-2 w-2 rounded-full bg-[#0b0b0b]"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p ref={tagRef} className="mb-2 text-[13px] font-bold uppercase tracking-[0.14em] text-[#fdb813] sm:text-sm sm:tracking-[0.18em]">
          Wrong turn. Right company.
        </p>

        <p ref={paraRef} className="mb-8 max-w-[560px] text-[15px] leading-relaxed text-[#4a4a45] sm:mb-9 sm:text-base sm:leading-[1.7]">
          The page you&apos;re looking for doesn&apos;t exist, moved, or the
          link is outdated. Let&apos;s get you back to a route that actually
          goes somewhere.
        </p>

        <div className="mb-10 flex w-full max-w-md flex-col items-center gap-3 sm:mb-12 sm:max-w-none sm:flex-row sm:justify-center">
          <div ref={primaryWrapRef} style={{ willChange: "transform" }} className="w-full sm:w-auto">
            <Link
              href="/"
              className="group inline-flex h-14 w-full items-center justify-between gap-3 rounded-full bg-[#0b0b0b] pl-6 pr-2 shadow-[0_10px_28px_rgba(11,11,11,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(11,11,11,0.24)] sm:h-[58px] sm:w-auto sm:min-w-[220px]"
            >
              <span className="flex items-center gap-2 text-[14px] font-semibold text-white sm:text-[15px]">
                <HomeIcon className="h-[18px] w-[18px]" />
                Back to Home
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] text-[16px] font-bold leading-none text-[#0b0b0b] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

          <div ref={secondaryWrapRef} style={{ willChange: "transform" }} className="w-full sm:w-auto">
            <Link
              href="/#services"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#0b0b0b]/15 bg-white px-7 text-[14px] font-semibold text-[#0b0b0b] shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0b0b0b] hover:bg-[#0b0b0b] hover:text-white sm:h-[58px] sm:w-auto sm:text-[15px]"
            >
              Explore Services
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Full-bleed: spans the entire viewport so the car enters and exits
            at the real screen edges — no side spacing. Outer div handles the
            breakout, inner div keeps GSAP's entrance transform conflict-free. */}
        <div
          className="relative mb-8 sm:mb-10"
          // Symmetric negative margins are required: the parent is a
          // flex/items-center column, which centers the MARGIN box — a
          // one-sided margin would shift the strip and leave a gap on the
          // right. With both margins the strip spans the full viewport evenly.
          style={{
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
          }}
        >
          <div ref={sceneRef}>
            <DriveScene />
          </div>
        </div>

        <div
          ref={pillRef}
          className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-dashed border-[#d4d0c6] bg-white px-5 py-2.5 text-[13px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] sm:gap-x-3 sm:px-6 sm:py-3 sm:text-[14px]"
        >
          <CompassIcon className="nf-compass h-4 w-4 shrink-0 text-[#fdb813]" />
          <span className="text-[#6b6960]">Still lost?</span>
          <Link
            href="/help"
            className="font-bold text-[#0b0b0b] underline-offset-4 transition-colors hover:text-[#fdb813] hover:underline"
          >
            Visit our Help Center
          </Link>
          <span className="text-[#d4d0c6]">or</span>
          <Link
            href="/contact"
            className="font-bold text-[#0b0b0b] underline-offset-4 transition-colors hover:text-[#fdb813] hover:underline"
          >
            contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
