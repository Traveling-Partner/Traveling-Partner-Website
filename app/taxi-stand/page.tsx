"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old URL — send visitors to /taxi-ride. */
export default function TaxiStandRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/taxi-ride");
  }, [router]);

  return null;
}
