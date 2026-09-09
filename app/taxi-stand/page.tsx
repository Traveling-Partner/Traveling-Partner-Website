"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** Old URL — send visitors to /taxi-ride. */
export default function TaxiStandRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/taxi-ride");
  }, [router]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm text-[#4a4a45]">This page has moved.</p>
      <Link
        href="/taxi-ride"
        className="mt-4 font-semibold text-[#0b0b0b] underline"
      >
        Continue to Taxi Ride
      </Link>
    </div>
  );
}
