"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import TPLoader from "@/components/TPLoader";

const MIN_VISIBLE_MS = 1400;
const FADE_MS = 320;

/**
 * Full-page cream cover with the compact Figma TP loader centered
 * (same design/animation as the prototype — not stretched full-bleed).
 */
export default function AppSplashLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const started = performance.now();
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      timeoutId = setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    const safety = setTimeout(() => {
      if (!cancelled) setVisible(false);
    }, 4000);

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(safety);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="tp-splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FEFBF6]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : FADE_MS / 1000,
            ease: [0.5, 0, 0.5, 1],
          }}
        >
          <TPLoader variant="inline" size={140} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
