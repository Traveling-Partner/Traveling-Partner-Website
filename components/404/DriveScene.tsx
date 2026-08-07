"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The dead end the visitor hit.
 *
 * Built around the one asset that has to stay photoreal: a real Traveling
 * Partner car, shot at a 3/4 hero angle. That angle can't convincingly
 * side-scroll down a road — a front-facing product photo sliding sideways
 * with fake wheels bolted on just looks pasted-on. So the car stays parked,
 * confident, exactly as shot, and the *environment* tells the joke instead:
 * a boom barrier that keeps almost opening, then slams shut again. Forever.
 */

const CAR_W = 250;
const CAR_H = 173; // matches the 601:415 source photo

const ROAD_D = "M0,308 Q 720,276 1440,306";

const POST_X = 620;
const POST_TOP_Y = 224;
const POST_BASE_Y = 302;
const ARM_PIVOT_Y = POST_TOP_Y + 12;
const ARM_LEN = 168;

const FAR_BUILDINGS = [
  { x: 20, w: 70, h: 58 }, { x: 110, w: 46, h: 40 }, { x: 180, w: 90, h: 74 },
  { x: 300, w: 56, h: 46 }, { x: 380, w: 100, h: 84 }, { x: 510, w: 60, h: 50 },
  { x: 600, w: 80, h: 66 }, { x: 710, w: 50, h: 42 }, { x: 790, w: 110, h: 90 },
  { x: 930, w: 64, h: 54 }, { x: 1020, w: 84, h: 70 }, { x: 1140, w: 56, h: 46 },
  { x: 1220, w: 96, h: 80 }, { x: 1350, w: 70, h: 58 },
];

const NEAR_BUILDINGS = [
  { x: 40, w: 100, h: 40 }, { x: 170, w: 130, h: 58 }, { x: 340, w: 84, h: 34 },
  { x: 460, w: 150, h: 64 }, { x: 660, w: 96, h: 38 }, { x: 800, w: 140, h: 56 },
  { x: 990, w: 90, h: 36 }, { x: 1120, w: 160, h: 62 }, { x: 1330, w: 100, h: 40 },
];

function HonkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 12a9 9 0 1 0 3.2-6.9" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

export default function DriveScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const carGroupRef = useRef<SVGGElement>(null);
  const carBobRef = useRef<SVGGElement>(null);
  const carTiltRef = useRef<SVGGElement>(null);
  const headlightRef = useRef<SVGEllipseElement>(null);
  const ringRefs = useRef<SVGCircleElement[]>([]);
  const laneRef = useRef<SVGPathElement>(null);
  const farRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);
  const signRef = useRef<SVGGElement>(null);
  const armSwingRef = useRef<SVGGElement>(null);
  const armShakeRef = useRef<SVGGElement>(null);
  const tipLightRef = useRef<SVGCircleElement>(null);
  const statusDotRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const pushRing = (el: SVGCircleElement | null) => {
    if (el && !ringRefs.current.includes(el)) ringRefs.current.push(el);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(armSwingRef.current, { rotate: 0, transformOrigin: "0px 0px" });
        gsap.set(statusDotRef.current, { backgroundColor: "#ef4444" });
        if (statusTextRef.current) statusTextRef.current.textContent = "Road Closed";
        return;
      }

      gsap.set(armSwingRef.current, { transformOrigin: "0px 0px" });
      gsap.set(armShakeRef.current, { transformOrigin: "0px 0px" });

      // Live "ride status" HUD text — swaps in sync with the barrier timeline.
      const STATUS_TONES: Record<string, string> = {
        neutral: "#fdb813",
        alert: "#ef4444",
        working: "#fce001",
      };
      const setStatus = (text: string, tone: keyof typeof STATUS_TONES) => {
        const label = statusTextRef.current;
        const dot = statusDotRef.current;
        if (label) {
          gsap.to(label, {
            opacity: 0,
            y: -3,
            duration: 0.15,
            onComplete: () => {
              label.textContent = text;
              gsap.fromTo(label, { opacity: 0, y: 3 }, { opacity: 1, y: 0, duration: 0.25 });
            },
          });
        }
        if (dot) gsap.to(dot, { backgroundColor: STATUS_TONES[tone], duration: 0.3 });
      };

      const shakeBarrier = () => {
        gsap.fromTo(
          armShakeRef.current,
          { rotate: 0 },
          { rotate: 3, duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut" },
        );
      };

      // Ambient background — unaffected by whatever the barrier is doing.
      gsap.to(laneRef.current, { strokeDashoffset: -92, duration: 1.8, ease: "none", repeat: -1 });
      gsap.to(farRef.current, { x: -1440, duration: 55, ease: "none", repeat: -1 });
      gsap.to(nearRef.current, { x: -1440, duration: 32, ease: "none", repeat: -1 });
      gsap.to(tipLightRef.current, {
        opacity: 0.25,
        duration: 0.55,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(signRef.current, {
        rotate: 2,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 0%",
      });

      // The car stays put and simply feels alive: idle suspension + glow.
      gsap.to(carBobRef.current, {
        y: "+=3.5",
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(headlightRef.current, {
        opacity: 0.6,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // The barrier is the whole story: it raises like it's finally letting
      // you through, then slams back down. Forever.
      const gate = gsap.timeline({ repeat: -1 });
      gate
        .call(() => setStatus("Road Closed", "alert"))
        .to({}, { duration: 1.8 })
        .call(() => setStatus("Recalculating route…", "working"))
        .to(armSwingRef.current, { rotate: -68, duration: 0.9, ease: "power2.out" })
        .to({}, { duration: 0.55 })
        .call(() => setStatus("Almost through…", "working"))
        .to(armSwingRef.current, { rotate: 6, duration: 0.3, ease: "power3.in" })
        .to(armSwingRef.current, { rotate: 0, duration: 0.45, ease: "elastic.out(1,0.5)" })
        .call(() => {
          setStatus("Still Closed", "alert");
          shakeBarrier();
        })
        .to({}, { duration: 2.1 });

      // Ambient hint pulse — invites the visitor to tap the scene.
      gsap.fromTo(hintRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.2 });
      gsap.to(hintRef.current, {
        opacity: 0.55,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Whole-card 3D tilt, plus a light parallax lean on the car itself.
      gsap.set(wrap, { transformPerspective: 1000 });
      const setCarTilt = gsap.quickTo(carTiltRef.current, "rotation", { duration: 0.6, ease: "power3.out" });
      const setRotY = gsap.quickTo(wrap, "rotateY", { duration: 0.7, ease: "power3.out" });
      const setRotX = gsap.quickTo(wrap, "rotateX", { duration: 0.7, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setCarTilt((px - 0.5) * 3);
        setRotY((px - 0.5) * 5);
        setRotX((0.5 - py) * 3);
      };
      const onLeave = () => {
        setRotY(0);
        setRotX(0);
      };
      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);

      // Tap the scene — the car honks, the barrier flinches. Still closed.
      const honk = () => {
        gsap
          .timeline()
          .to(headlightRef.current, { opacity: 0.95, duration: 0.08 })
          .to(headlightRef.current, { opacity: 0.35, duration: 0.12 })
          .to(headlightRef.current, { opacity: 0.95, duration: 0.08 })
          .to(headlightRef.current, { opacity: 0.5, duration: 0.3 });

        ringRefs.current.forEach((ring, i) => {
          gsap.fromTo(
            ring,
            { opacity: 0.55, scale: 0.3, transformOrigin: "50% 50%" },
            { opacity: 0, scale: 2.4, duration: 0.75, delay: i * 0.12, ease: "power2.out" },
          );
        });

        gsap.fromTo(
          carGroupRef.current,
          { scale: 1.045 },
          { scale: 1, duration: 0.55, ease: "elastic.out(1,0.4)" },
        );
        shakeBarrier();
        setStatus("Nice try. Still closed.", "alert");
      };
      const onClick = () => honk();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          honk();
        }
      };
      wrap.addEventListener("click", onClick);
      wrap.addEventListener("keydown", onKeyDown);

      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
        wrap.removeEventListener("click", onClick);
        wrap.removeEventListener("keydown", onKeyDown);
      };
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label="Honk the horn"
      className="group relative aspect-[4/3] w-full cursor-pointer select-none overflow-hidden rounded-[24px] border border-[#efe8d4] shadow-[0_20px_60px_rgba(11,11,11,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-[#fdb813] sm:aspect-[16/9] sm:rounded-[28px] lg:aspect-[1440/480]"
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Illustration of a Traveling Partner car parked at a barrier with a 404 road-closed sign, the gate almost opening and slamming shut again"
      >
        <defs>
          <linearGradient id="nf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffdf6" />
            <stop offset="55%" stopColor="#fff6dd" />
            <stop offset="100%" stopColor="#ffedb8" />
          </linearGradient>
          <radialGradient id="nf-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fce001" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#fce001" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="nf-hazard"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="11" height="22" fill="#0b0b0b" />
            <rect x="11" width="11" height="22" fill="#fce001" />
          </pattern>
          <filter id="nf-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="nf-blur-lg" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1440" height="480" fill="url(#nf-sky)" />
        <circle cx="1120" cy="420" r="220" fill="url(#nf-sun)" />

        {/* Parallax cityscape — two seamless-looped copies per layer */}
        <g ref={farRef}>
          <g fill="#f0e7cd">
            {FAR_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={300 - b.h} width={b.w} height={b.h} rx="3" />
            ))}
          </g>
          <g fill="#f0e7cd" transform="translate(1440,0)">
            {FAR_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={300 - b.h} width={b.w} height={b.h} rx="3" />
            ))}
          </g>
        </g>
        <g ref={nearRef}>
          <g fill="#e7dcbd">
            {NEAR_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={306 - b.h} width={b.w} height={b.h} rx="4" />
            ))}
          </g>
          <g fill="#e7dcbd" transform="translate(1440,0)">
            {NEAR_BUILDINGS.map((b, i) => (
              <rect key={i} x={b.x} y={306 - b.h} width={b.w} height={b.h} rx="4" />
            ))}
          </g>
        </g>

        {/* Road — the ground the scene stands on; the car no longer travels it */}
        <path d={ROAD_D} stroke="#33322d" strokeWidth="92" fill="none" strokeLinecap="round" />
        <path d={ROAD_D} stroke="#403f39" strokeWidth="92" strokeOpacity="0.4" fill="none" strokeLinecap="round" strokeDasharray="2 460" />
        <path
          ref={laneRef}
          d={ROAD_D}
          stroke="#fce001"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="26 20"
        />

        {/* A faded skid mark near the barrier — proof someone else tried this too */}
        <path
          d="M470,312 C 495,316 520,316 544,309"
          stroke="#151412"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.22"
        />

        {/* Barrier — the whole punchline lives here */}
        <g>
          <rect x={POST_X - 6} y={POST_TOP_Y} width="12" height={POST_BASE_Y - POST_TOP_Y} rx="3" fill="#1c1c1a" />
          <rect x={POST_X - 16} y={POST_BASE_Y - 8} width="32" height="14" rx="3" fill="#0b0b0b" />
          <circle cx={POST_X} cy={POST_BASE_Y - 1} r="3.2" fill="#fdb813" />

          <g ref={signRef}>
            <rect x={POST_X - 168} y="150" width="134" height="78" rx="10" fill="#fffdf6" stroke="#0b0b0b" strokeWidth="3" />
            <text x={POST_X - 101} y="192" textAnchor="middle" fontFamily="var(--font-poppins), sans-serif" fontWeight="800" fontSize="32" fill="#0b0b0b">
              404
            </text>
            <text x={POST_X - 101} y="213" textAnchor="middle" fontFamily="var(--font-poppins), sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.5" fill="#fdb813">
              ROAD CLOSED
            </text>
          </g>

          <g transform={`translate(${POST_X},${ARM_PIVOT_Y})`}>
            <g ref={armSwingRef}>
              <rect x="-26" y="-7" width="26" height="14" rx="3" fill="#1c1c1a" />
              <g ref={armShakeRef}>
                <rect x="0" y="-7.5" width={ARM_LEN} height="15" rx="4" fill="url(#nf-hazard)" stroke="#0b0b0b" strokeWidth="2" />
                <rect x={ARM_LEN - 6} y="-9" width="14" height="18" rx="4" fill="#e14b3c" stroke="#0b0b0b" strokeWidth="2" />
                <circle ref={tipLightRef} cx={ARM_LEN + 7} cy="0" r="5" fill="#ff4136" />
              </g>
            </g>
          </g>
        </g>

        {/* The car — parked, confident, exactly as shot. Going nowhere. */}
        <g ref={carGroupRef} transform="translate(310,224) rotate(-3)">
          <g ref={carBobRef}>
            <g ref={carTiltRef}>
              <ellipse cx="6" cy="76" rx="104" ry="13" fill="#0b0b0b" opacity="0.2" filter="url(#nf-blur-sm)" />

              <ellipse
                ref={headlightRef}
                cx="-58"
                cy="18"
                rx="46"
                ry="30"
                fill="#fff3c4"
                opacity="0.4"
                filter="url(#nf-blur-lg)"
              />

              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  ref={pushRing}
                  cx="-95"
                  cy="30"
                  r={14 + i * 6}
                  fill="none"
                  stroke="#fdb813"
                  strokeWidth="2.5"
                  opacity="0"
                />
              ))}

              <image
                href="/images/pool-ride/pool-hero-car.png"
                x={-CAR_W / 2}
                y={-CAR_H / 2 + 6}
                width={CAR_W}
                height={CAR_H}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
          </g>
        </g>
      </svg>

      {/* Live status HUD — reads like a real trip tracker, synced to the barrier */}
      <div className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-[#0b0b0b]/90 px-3 py-1.5 shadow-[0_6px_16px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3.5 sm:py-2">
        <span
          ref={statusDotRef}
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: "#ef4444" }}
        />
        <span
          ref={statusTextRef}
          className="text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:text-[11px]"
        >
          Road Closed
        </span>
      </div>

      {/* Tap hint — this scene isn't just decoration, it's playable */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#0b0b0b] opacity-0 shadow-[0_6px_16px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:bottom-4 sm:right-4 sm:px-3.5 sm:py-2 sm:text-[11px]"
      >
        <HonkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        Tap to honk
      </div>
    </div>
  );
}
