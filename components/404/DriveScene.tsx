"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

gsap.registerPlugin(MotionPathPlugin);

/**
 * 404 scene — the endless search.
 *
 * The Lottie car (public/lottie/car-404.json) drives left → right along a
 * rolling route, exits the frame, and re-enters from the left in a
 * mathematically seamless loop: the motion tween uses ease "none" (constant
 * speed, so the loop point has zero velocity jump) and both ends of the
 * path sit fully off-screen (so the teleport back to the start is
 * invisible). A question-mark destination pin hovers over the route — the
 * car keeps driving past it forever, still searching for the missing page.
 *
 * Physics: MotionPath autoRotate pitches the body with every slope, and an
 * idle suspension bob runs underneath the whole drive.
 */

const VB_W = 1440;
const VB_H = 400;

// Both ends just far enough off-screen that the car (≈300px wide) fully
// exits before looping back — no more, so the car is never invisible for
// longer than necessary at the edges.
const ROUTE_D =
  "M -170 302 C 120 258, 320 344, 560 298 C 760 256, 940 240, 1120 300 C 1240 338, 1440 294, 1610 292";

// The "missing destination" anchor — a knot point on the path above.
const PIN_X = 1120;
const PIN_Y = 300;

const LOOP_SECONDS = 7;

// Lottie comp ("Tourists by car") is 590×440.
const CAR_W = 300;
const CAR_H = 224;

// Faint map-grid crosses so the empty space feels like a chart, not a void.
const GRID_MARKS = [
  { x: 140, y: 96 }, { x: 420, y: 60 }, { x: 760, y: 110 }, { x: 1060, y: 70 },
  { x: 1300, y: 150 }, { x: 90, y: 210 }, { x: 1240, y: 340 }, { x: 640, y: 178 },
];

export default function DriveScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const carInnerRef = useRef<SVGGElement>(null);
  const pinRef = useRef<SVGGElement>(null);
  const pingRef = useRef<SVGCircleElement>(null);
  const dotRefs = useRef<SVGCircleElement[]>([]);

  const pushDot = (el: SVGCircleElement | null) => {
    if (el && !dotRefs.current.includes(el)) dotRefs.current.push(el);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const pathEl = routeRef.current;
    if (!wrap || !pathEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const len = pathEl.getTotalLength();

      // Waypoint dots sit ON the route — computed, never eyeballed.
      const wpFractions = [0.28, 0.55];
      dotRefs.current.forEach((dot, i) => {
        const p = pathEl.getPointAtLength(len * (wpFractions[i] ?? 0.5));
        gsap.set(dot, { attr: { cx: p.x, cy: p.y }, scale: 0, transformOrigin: "50% 50%" });
      });

      const drive = {
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.9] as [number, number],
          autoRotate: true,
          start: 0,
          end: 1,
        },
      };

      if (reduceMotion) {
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: 0 });
        const placed = gsap.to(carRef.current, { ...drive, duration: 0.01, paused: true });
        placed.progress(0.4).kill();
        gsap.set(pinRef.current, { opacity: 1 });
        gsap.set(dotRefs.current, { scale: 1 });
        return;
      }

      // One-time stage set: the route draws itself, waypoints pop.
      gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(pathEl, { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" });
      gsap.to(dotRefs.current, {
        scale: 1,
        duration: 0.5,
        ease: "back.out(3)",
        stagger: 0.15,
        delay: 0.8,
      });

      // THE loop: constant speed edge to edge, no easing, no delay — the
      // car exits fully off-screen right and re-enters from the left with
      // zero visible seam.
      gsap.to(carRef.current, {
        ...drive,
        duration: LOOP_SECONDS,
        ease: "none",
        repeat: -1,
      });

      // Idle suspension — runs underneath the drive, never pauses.
      gsap.set(carInnerRef.current, { transformOrigin: "50% 92%" });
      gsap.to(carInnerRef.current, {
        y: -2.6,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // The destination that never resolves: pin drops in once, then hovers.
      gsap.set(pinRef.current, { transformOrigin: "50% 100%" });
      gsap.fromTo(
        pinRef.current,
        { opacity: 0, scale: 0.5, y: -60 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.8)", delay: 1.2 },
      );
      gsap.to(pinRef.current, {
        y: -10,
        duration: 1.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      // Radar ping on the road beneath the pin — quietly searching.
      gsap.fromTo(
        pingRef.current,
        { scale: 0.3, opacity: 0.5, transformOrigin: "50% 50%" },
        {
          scale: 2.5,
          opacity: 0,
          duration: 1.8,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 1.1,
          delay: 1.6,
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full select-none overflow-hidden"
      // Lock the box to the drawing's exact proportions — this guarantees
      // the SVG viewBox maps edge-to-edge, so off-screen path ends can never
      // leak into view with a gap after them.
      style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      role="img"
      aria-label="A car drives endlessly across a rolling route, passing a floating question-mark pin — still searching for the missing page"
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="nf-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <linearGradient id="nf-pin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fce001" />
            <stop offset="100%" stopColor="#fdb813" />
          </linearGradient>
        </defs>

        {/* Map-grid texture — barely-there chart crosses */}
        <g stroke="#0b0b0b" strokeOpacity="0.07" strokeWidth="2" strokeLinecap="round">
          {GRID_MARKS.map((m, i) => (
            <g key={i}>
              <line x1={m.x - 7} y1={m.y} x2={m.x + 7} y2={m.y} />
              <line x1={m.x} y1={m.y - 7} x2={m.x} y2={m.y + 7} />
            </g>
          ))}
        </g>

        {/* The rolling route — spans edge to edge */}
        <path
          ref={routeRef}
          d={ROUTE_D}
          stroke="#0b0b0b"
          strokeOpacity="0.25"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Waypoints on the route */}
        <circle ref={pushDot} r="7" fill="#fffdf6" stroke="#fdb813" strokeWidth="3.5" />
        <circle ref={pushDot} r="7" fill="#fffdf6" stroke="#fdb813" strokeWidth="3.5" />

        {/* Radar ping on the road beneath the floating pin */}
        <circle
          ref={pingRef}
          cx={PIN_X}
          cy={PIN_Y}
          r="22"
          fill="none"
          stroke="#fdb813"
          strokeWidth="2.5"
          opacity="0"
        />

        {/* The car — drives the loop, pitching with every slope */}
        <g ref={carRef}>
          <g ref={carInnerRef}>
            <ellipse cx="0" cy="4" rx="118" ry="11" fill="#0b0b0b" opacity="0.13" filter="url(#nf-soft)" />
            <foreignObject x={-CAR_W / 2} y={-CAR_H + 26} width={CAR_W} height={CAR_H}>
              <DotLottieReact
                src="/lottie/car-404.json"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
              />
            </foreignObject>
          </g>
        </g>

        {/* The destination that doesn't exist — floats above the route; the
            car passes behind it, adding a little depth to the scene */}
        <g transform={`translate(${PIN_X}, ${PIN_Y - 80})`}>
          <g ref={pinRef} opacity="0">
            <path
              d="M 0 8 C -24 -18 -32 -30 -32 -48 A 32 32 0 1 1 32 -48 C 32 -30 24 -18 0 8 Z"
              fill="url(#nf-pin)"
              stroke="#0b0b0b"
              strokeWidth="3"
            />
            <circle cx="0" cy="-48" r="19" fill="#fffdf6" />
            <text
              x="0"
              y="-37"
              textAnchor="middle"
              fontFamily="var(--font-poppins), sans-serif"
              fontWeight="800"
              fontSize="30"
              fill="#0b0b0b"
            >
              ?
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
