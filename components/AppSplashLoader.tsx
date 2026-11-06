"use client";

import { useEffect, useState } from "react";
import TPLoader from "@/components/TPLoader";

const FADE_MS = 80;

/**
 * Cream full-page cover with compact Figma TP loader.
 * Dismisses via React state only (no DOM script) to avoid hydration mismatches.
 * Hides as soon as the document is interactive so it cannot steal LCP.
 */
export default function AppSplashLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let removeTimer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const hide = () => {
      if (cancelled) return;
      setFading(true);
      removeTimer = setTimeout(() => {
        if (!cancelled) setVisible(false);
      }, FADE_MS);
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      hide();
    } else {
      document.addEventListener("DOMContentLoaded", hide, { once: true });
    }

    const safety = setTimeout(hide, 120);

    return () => {
      cancelled = true;
      if (removeTimer) clearTimeout(removeTimer);
      clearTimeout(safety);
      document.removeEventListener("DOMContentLoaded", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="tp-app-splash"
      className={`tp-app-splash${fading ? " tp-app-splash--hide" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      aria-hidden="true"
      // Extensions (Grammarly, rulers) often mutate this node — ignore mismatch noise.
      suppressHydrationWarning
    >
      <TPLoader variant="inline" size={120} />
    </div>
  );
}
