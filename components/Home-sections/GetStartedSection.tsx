"use client";

import React, { useState } from "react";
import Image from "next/image";
import TutorialVideoPlayer, {
  TutorialPreviewCard,
  type TutorialVideoData,
} from "./TutorialVideoPlayer";

const accentClass =
  "bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal italic text-transparent";

const TUTORIALS: TutorialVideoData[] = [
  {
    id: "driver",
    num: "01",
    badge: "TUTORIAL · DRIVER",
    categoryLabel: "FOR DRIVERS · 3 QUICK STEPS",
    durationLabel: "2:12",
    headerTitle: "How to register as a driver",
    headlineLead: "How to register",
    headlineAccent: "as a driver.",
    description:
      "Upload your documents, get verified, and you can start accepting rides. No fixed hours — drive when it actually works for you.",
    statLabel: "10K+ drivers already onboarded",
    stepsLabel: "3 STEPS",
    ctaLabel: "Watch Tutorial",
    videoSrc:
      "https://traveling-partner-storage.nyc3.cdn.digitaloceanspaces.com/Introduction%20Videos/Driver%20Introduction-F.mp4",
    posterSrc:
      "https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239883/How_to_register_as_a_Driver_a01zuj.png",
  },
  {
    id: "rider",
    num: "02",
    badge: "TUTORIAL · RIDER",
    categoryLabel: "FOR RIDERS · QUICK SETUP",
    durationLabel: "1:49",
    headerTitle: "How to register as a rider",
    headlineLead: "How to register",
    headlineAccent: "as a rider.",
    description:
      "A couple of taps and you're set. Pop in your pickup and destination, and a verified driver's on the way, with the price shown upfront and the trip tracked the whole way.",
    statLabel: "10K+ riders already onboarded",
    stepsLabel: "3 STEPS",
    ctaLabel: "Watch Tutorial",
    videoSrc:
      "https://traveling-partner-storage.nyc3.cdn.digitaloceanspaces.com/Introduction%20Videos/Partner%20Introduction-F.mp4",
    posterSrc:
      "https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239860/video-sing_yzrcqg.png",
  },
];

export default function GetStartedSection(): React.ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeTutorial = TUTORIALS.find((t) => t.id === activeId) ?? null;

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-28 overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="get-started-heading"
    >
      {/* Figma bokeh road background */}
      <Image
        src="/images/get-started-bg.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0b0b0b]/75" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,rgba(253,184,19,0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h2
            id="get-started-heading"
            className="font-poppins text-[clamp(1.875rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.03em]"
          >
            <span className="block font-bold text-white">
              Get started in <span className={accentClass}>three</span>
            </span>
            <span className={`block ${accentClass}`}>minutes.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] font-poppins text-[13px] font-normal leading-[1.6] text-white sm:text-[14px] lg:mt-6 lg:text-[15px] lg:leading-[1.65]">
            Getting on the road with a Traveling Partner doesn&apos;t take much. Sign
            up, verify a few details, and you&apos;re ready, whether you&apos;re
            booking a ride or driving one.
          </p>
        </div>

        {activeTutorial ? (
          <TutorialVideoPlayer
            key={activeTutorial.id}
            tutorial={activeTutorial}
            onClose={() => setActiveId(null)}
          />
        ) : (
          <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6 lg:gap-7">
            {TUTORIALS.map((tutorial) => (
              <TutorialPreviewCard
                key={tutorial.id}
                tutorial={tutorial}
                onPlay={() => setActiveId(tutorial.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
