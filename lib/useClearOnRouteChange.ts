"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Drop toasts and field errors when the user opens another page. */
export function useClearOnRouteChange(clear: () => void) {
  const pathname = usePathname();

  useEffect(() => {
    clear();
    // Only reset when the route changes, not when `clear` identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
