"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, isAdsAllowedPath } from "@/lib/ads/config";

export default function AdSenseLoader() {
  const pathname = usePathname();
  if (!isAdsAllowedPath(pathname)) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
