"use client";

import React, { useState } from "react";
import Image from "next/image";
import TutorialVideoPlayer, {
  TutorialPreviewCard,
  type TutorialVideoData,
} from "./TutorialVideoPlayer";

import {
  HOME_ACCENT_TEXT,
  HOME_SECTION_HEADING,
  HOME_SECTION_HEADER_WRAP,
  HOME_SECTION_SUBTEXT,
  HOME_SECTION_SUBTEXT_WRAP,
} from "@/lib/homeSectionStyles";

const accentClass = HOME_ACCENT_TEXT;

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
      "CNIC verification, safety training, and your first paying ride — walked through end to end. Most drivers are earning within 24 hours.",
    statLabel: "10K+ drivers already onboarded",
    stepsLabel: "3 STEPS",
    ctaLabel: "Watch Tutorial",
    videoSrc:
      "https://traveling-partner-storage.nyc3.cdn.digitaloceanspaces.com/Introduction%20Videos/Driver%20Introduction-F.mp4",
    posterSrc:
      "https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239883/How_to_register_as_a_Driver_a01zuj.png",
  },
  {
    id: "partner",
    num: "02",
    badge: "TUTORIAL · PARTNER",
    categoryLabel: "FOR BUSINESS · ONBOARDING FLOW",
    durationLabel: "1:49",
    headerTitle: "How to register as a Partner",
    headlineLead: "How to register",
    headlineAccent: "as a partner.",
    description:
      "Fleet setup, account verification, dashboard tour, and your first payout — designed for restaurants, retailers, and enterprise fleets ready to scale.",
    statLabel: "50+ business partners onboarded",
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

      <div className="relative z-[1] mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className={HOME_SECTION_HEADER_WRAP}>
          <h2
            id="get-started-heading"
            className={`${HOME_SECTION_HEADING}`}
          >
            <span className="block font-bold text-white">
              Get started in <span className={accentClass}>three</span>
            </span>
            <span className={`block ${accentClass}`}>minutes.</span>
          </h2>
          <p className={`${HOME_SECTION_SUBTEXT_WRAP} max-w-[640px] ${HOME_SECTION_SUBTEXT} text-white`}>
            <span className="md:hidden">
              <span className="block whitespace-nowrap">
                Whether you&apos;re signing up as a driver
              </span>
              <span className="block whitespace-nowrap">or partnering as a business —</span>
              <span className="block whitespace-nowrap">
                we&apos;ve got a step-by-step guide that walks
              </span>
              <span className="block whitespace-nowrap">you through every detail.</span>
            </span>
            <span className="hidden md:contents">
              <span className="block">
                Whether you&apos;re signing up as a driver or partnering as a business
              </span>
              <span className="block">
                — we&apos;ve got a step-by-step guide that walks you through every
              </span>
              <span className="block">detail.</span>
            </span>
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
