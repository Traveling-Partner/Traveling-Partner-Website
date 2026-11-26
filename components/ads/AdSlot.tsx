"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ADSENSE_CLIENT,
  getAdPlacement,
  isAdsAllowedPath,
  type AdPlacement,
  type AdVariant,
} from "@/lib/ads/config";

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
};

const VARIANT_CLASS: Record<AdVariant, string> = {
  rect: "ad-slot ad-rect",
  banner: "ad-slot ad-banner",
  sidebar: "ad-slot ad-sidebar",
  infeed: "ad-slot ad-infeed",
};

export default function AdSlot({ placement, className = "" }: AdSlotProps) {
  const pathname = usePathname();
  const allowed = isAdsAllowedPath(pathname);
  const { variant, slotId } = getAdPlacement(placement);
  const boxRef = useRef<HTMLElement | null>(null);
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!allowed) return;
    const node = boxRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed]);

  useEffect(() => {
    if (!allowed || !visible || !slotId || pushedRef.current) return;
    const ins = insRef.current;
    if (!ins || ins.getAttribute("data-ad-status")) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      /* AdSense script may still be loading */
    }
  }, [allowed, visible, slotId]);

  if (!allowed) return null;

  return (
    <aside
      ref={boxRef}
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
      aria-label="Advertisement"
    >
      <span className="ad-label">Advertisement</span>
      {slotId && visible ? (
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slotId}
          data-ad-format={variant === "banner" ? "horizontal" : "rectangle"}
          data-full-width-responsive={variant === "sidebar" ? "false" : "true"}
        />
      ) : (
        <span className="ad-slot-fill" aria-hidden="true" />
      )}
    </aside>
  );
}
