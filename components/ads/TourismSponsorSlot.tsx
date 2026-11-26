"use client";

import Image from "next/image";
import { getActiveTourismSponsor, trackAdEvent } from "@/lib/ads/config";
import AdSlot from "./AdSlot";

export default function TourismSponsorSlot() {
  const sponsor = getActiveTourismSponsor();
  if (!sponsor) {
    return <AdSlot placement="tourism" />;
  }

  const text = sponsor.text.slice(0, 140);

  return (
    <aside className="ad-slot ad-sponsor" aria-label="Sponsored">
      <span className="ad-label">Sponsored</span>
      <div className="flex h-full flex-col items-center justify-center gap-3 px-5 py-5 text-center">
        {sponsor.logo ? (
          <Image
            src={sponsor.logo}
            alt=""
            width={160}
            height={48}
            className="h-12 w-auto max-w-[160px] object-contain"
          />
        ) : null}
        <p className="text-[15px] font-bold text-[#0b0b0b]">{sponsor.name}</p>
        {text ? (
          <p className="line-clamp-2 max-w-[280px] text-[13px] leading-relaxed text-[#5c5a54]">
            {text}
          </p>
        ) : null}
        <a
          href={sponsor.url}
          target="_blank"
          rel="sponsored noopener"
          onClick={() =>
            trackAdEvent("sponsor_click", {
              placement: "tourism",
              partner: sponsor.name,
            })
          }
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] px-4 py-2 text-[13px] font-bold text-[#0b0b0b]"
        >
          Visit partner
        </a>
      </div>
    </aside>
  );
}
