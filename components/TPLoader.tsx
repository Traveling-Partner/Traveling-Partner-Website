"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const RING_SRC = "/images/loader/tp-loader-ring.svg";
const LOGO_SRC = "/images/loader/tp-loader-logo.svg";

/** Exact Figma timeline: 2000ms loop (node 295:1584) */
const LOOP_DURATION = 2;

const GRADIENT =
  "linear-gradient(99.88798881557781deg, rgb(252, 224, 1) 0%, rgb(253, 184, 19) 100%)";

const easeSoft = [0.5, 0, 0.5, 1] as const;

type TPLoaderProps = {
  className?: string;
  /**
   * fullscreen — covers viewport (legacy)
   * inline — compact badge for splash / blog / forms
   */
  variant?: "fullscreen" | "inline";
  /** Pixel size of the loader square (inline). Default 120. */
  size?: number;
  label?: string;
};

/**
 * Traveling Partner loader — 100% Figma proto node 295:1584
 * Same gradient, ring rotate, and logo pulse — available compact.
 * https://www.figma.com/proto/j4zVnyhpbefS9SOKp3qmOP/Traveling-Partner-App?node-id=295-1584
 */
export default function TPLoader({
  className = "",
  variant = "inline",
  size = 120,
  label,
}: TPLoaderProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "fullscreen") {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${className}`}
        style={{ backgroundImage: GRADIENT }}
        role="status"
        aria-live="polite"
        aria-label={label || "Loading"}
        data-name="TP Loader"
      >
        <div
          className="relative"
          style={{ width: "min(72vw, 420px)", height: "min(72vw, 420px)" }}
        >
          <LoaderStage reduceMotion={!!reduceMotion} />
        </div>
        <span className="sr-only">{label || "Loading…"}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      data-name="TP Loader"
    >
      <div
        className="relative overflow-hidden rounded-[22%] shadow-[0_10px_28px_rgba(253,184,19,0.28)]"
        style={{
          width: size,
          height: size,
          backgroundImage: GRADIENT,
        }}
      >
        <LoaderStage reduceMotion={!!reduceMotion} />
      </div>
      {label ? (
        <p className="text-sm font-medium text-[#6b6960]">{label}</p>
      ) : null}
      <span className="sr-only">{label || "Loading…"}</span>
    </div>
  );
}

function LoaderStage({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <>
      {/* Outer ring — Figma inset 11.13% 13.69% 17.4% 14.25% */}
      <motion.div
        className="absolute"
        style={{
          top: "11.13%",
          right: "13.69%",
          bottom: "17.4%",
          left: "14.25%",
        }}
        initial={{ rotate: 0 }}
        animate={
          reduceMotion ? { rotate: 0 } : { rotate: [0, 349.618, 349.618] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                rotate: {
                  duration: LOOP_DURATION,
                  times: [0, 0.7951, 1],
                  ease: [easeSoft, "linear"],
                  repeat: Infinity,
                },
              }
        }
      >
        <Image
          src={RING_SRC}
          alt=""
          fill
          unoptimized
          priority
          className="object-contain"
        />
      </motion.div>

      {/* Center logo — Figma inset 29.98% 29.45% 29.96% 29.43% */}
      <motion.div
        className="absolute"
        style={{
          top: "29.98%",
          right: "29.45%",
          bottom: "29.96%",
          left: "29.43%",
        }}
        initial={{ scaleX: 1, scaleY: 1 }}
        animate={
          reduceMotion
            ? { scaleX: 1, scaleY: 1 }
            : {
                scaleX: [1, 0.74, 1, 1],
                scaleY: [1, 0.74, 1, 1],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                scaleX: {
                  duration: LOOP_DURATION,
                  times: [0, 0.2136, 0.5554, 1],
                  ease: [easeSoft, easeSoft, "linear"],
                  repeat: Infinity,
                },
                scaleY: {
                  duration: LOOP_DURATION,
                  times: [0, 0.2136, 0.5554, 1],
                  ease: [easeSoft, easeSoft, "linear"],
                  repeat: Infinity,
                },
              }
        }
      >
        <Image
          src={LOGO_SRC}
          alt="Traveling Partner"
          fill
          unoptimized
          priority
          className="object-contain"
        />
      </motion.div>
    </>
  );
}
