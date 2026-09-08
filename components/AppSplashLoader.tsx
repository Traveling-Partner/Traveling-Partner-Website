"use client";

import { useEffect, useState } from "react";
import TPLoader from "@/components/TPLoader";

const MIN_VISIBLE_MS = 900;
const FADE_MS = 250;

/**
 * Cream full-page cover with compact Figma TP loader.
 * Dismisses via React state only (no DOM script) to avoid hydration mismatches.
 * CSS animations on TPLoader start as soon as the SSR HTML paints.
 */
export default function AppSplashLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const started = performance.now();
    let hideTimer: ReturnType<typeof setTimeout> | null = null;
    let removeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const hide = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
      hideTimer = setTimeout(() => {
        if (cancelled) return;
        setFading(true);
        removeTimer = setTimeout(() => {
          if (!cancelled) setVisible(false);
        }, FADE_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const safety = setTimeout(hide, 2200);

    return () => {
      cancelled = true;
      document.body.style.overflow = prevOverflow;
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
      clearTimeout(safety);
      window.removeEventListener("load", hide);
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="tp-app-splash"
      className={`tp-app-splash${fading ? " tp-app-splash--hide" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      // Extensions (Grammarly, rulers) often mutate this node — ignore mismatch noise.
      suppressHydrationWarning
    >
      <TPLoader variant="inline" size={120} />
    </div>
  );
}
