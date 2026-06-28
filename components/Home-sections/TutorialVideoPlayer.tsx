"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { HomeSecondaryButton } from "./HomeCtaButtons";
import { HOME_SECTION_BODY } from "@/lib/homeSectionStyles";

const accentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export type TutorialVideoData = {
  id: string;
  num: string;
  badge: string;
  categoryLabel: string;
  durationLabel: string;
  headerTitle: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  statLabel: string;
  stepsLabel: string;
  ctaLabel: string;
  videoSrc: string;
  posterSrc: string;
};

type TutorialVideoPlayerProps = {
  tutorial: TutorialVideoData;
  onClose: () => void;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function TutorialVideoPlayer({
  tutorial,
  onClose,
}: TutorialVideoPlayerProps): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showCenterPlay, setShowCenterPlay] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      setIsPlaying(true);
      setShowCenterPlay(false);
    };
    const onPause = () => {
      setIsPlaying(false);
      setShowCenterPlay(true);
    };
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setShowCenterPlay(true);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {
      /* autoplay blocked */
    });
  }, [tutorial.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await el.requestFullscreen();
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: tutorial.headerTitle,
          url: tutorial.videoSrc,
        });
      } else {
        await navigator.clipboard.writeText(tutorial.videoSrc);
      }
    } catch {
      /* user cancelled */
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-poppins text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" aria-hidden />
          {tutorial.badge}
        </span>
        <span className="font-poppins text-[14px] font-normal text-white/45 sm:text-[15px]">
          {tutorial.headerTitle}
        </span>
      </div>

      <div
        ref={containerRef}
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-black shadow-[0_32px_80px_rgba(0,0,0,0.55)] sm:rounded-[32px]"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={tutorial.posterSrc}
          playsInline
          preload="metadata"
          onClick={togglePlay}
        >
          <source src={tutorial.videoSrc} type="video/mp4" />
        </video>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fdb813]/10 via-transparent to-black/50"
          aria-hidden
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/65"
          aria-label="Close video"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M2 2L12 12M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {showCenterPlay ? (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute left-1/2 top-1/2 z-10 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 sm:h-20 sm:w-20"
            aria-label="Play video"
          >
            <svg
              className="ml-1"
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              aria-hidden
            >
              <path d="M2 2L20 13L2 24V2Z" fill="#0b0b0b" />
            </svg>
          </button>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="w-9 shrink-0 font-poppins text-[11px] font-medium tabular-nums text-white">
              {formatTime(currentTime)}
            </span>
            <div className="relative h-1 min-w-0 flex-1">
              <div className="absolute inset-0 rounded-full bg-white/20" />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[#fdb813]"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                aria-label="Seek"
              />
              <span
                className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-md"
                style={{ left: `calc(${progress}% - 6px)` }}
                aria-hidden
              />
            </div>
            <span className="w-9 shrink-0 text-right font-poppins text-[11px] font-medium tabular-nums text-white/50">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                    <rect x="2" y="1" width="3.5" height="12" rx="0.5" />
                    <rect x="8.5" y="1" width="3.5" height="12" rx="0.5" />
                  </svg>
                ) : (
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden>
                    <path d="M1 1L11 7L1 13V1Z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  className="flex h-9 w-9 items-center justify-center text-white transition-colors hover:bg-white/10"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden>
                    <path
                      d="M6 4.5H2.5V9.5H6L10 12.5V1.5L6 4.5Z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                    />
                    {!isMuted ? (
                      <path
                        d="M11.5 4.5C12.5 5.5 12.5 8.5 11.5 9.5M13 2.5C15 4.5 15 9.5 13 11.5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    ) : null}
                  </svg>
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setIsMuted(false);
                    setVolume(Number(e.target.value));
                  }}
                  className="h-1 w-14 cursor-pointer accent-white sm:w-16"
                  aria-label="Volume"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/25 font-poppins text-[9px] font-bold uppercase text-white sm:inline-flex">
                HD
              </span>
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Fullscreen"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1.5 5V1.5H5M9 1.5H12.5V5M12.5 9V12.5H9M5 12.5H1.5V9"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <div className="min-w-0">
          <h3 className="font-poppins text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {tutorial.headlineLead}{" "}
            <span
              className={`${accentSerif.className} bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text font-normal text-transparent`}
            >
              {tutorial.headlineAccent}
            </span>
          </h3>
          <p className="mt-3 max-w-[480px] font-poppins text-[14px] font-normal leading-[1.55] text-white/55">
            {tutorial.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex h-9 items-center rounded-full border border-white/15 bg-white/5 px-4 font-poppins text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            {tutorial.stepsLabel}
          </span>
          <span className="inline-flex h-9 items-center rounded-full border border-white/15 bg-white/5 px-4 font-poppins text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
            {duration > 0 ? `${formatTime(duration)} MIN` : `${tutorial.durationLabel} MIN`}
          </span>
          <button
            type="button"
            onClick={() => void handleShare()}
            className="group inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#0b0b0b] py-0 pl-4 pr-1 font-poppins text-[13px] font-semibold leading-none text-white shadow-[0_8px_22px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#1a1a1a] sm:text-[14px]"
          >
            Share
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fdb813] text-[11px] font-bold leading-none text-[#0b0b0b] transition-transform group-hover:-rotate-45">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayRingButton({ onClick }: { onClick: () => void }): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex h-16 w-16 items-center justify-center transition-transform hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]"
      aria-label="Play tutorial"
    >
      <span
        className="absolute inset-0 rounded-full border-2 border-white/55"
        aria-hidden
      />
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)] sm:h-[3.25rem] sm:w-[3.25rem]">
        <svg className="ml-0.5" width="16" height="18" viewBox="0 0 18 20" fill="none" aria-hidden>
          <path d="M2 2L16 10L2 18V2Z" fill="#0b0b0b" />
        </svg>
      </span>
    </button>
  );
}

type TutorialPreviewCardProps = {
  tutorial: TutorialVideoData;
  onPlay: () => void;
};

export function TutorialPreviewCard({
  tutorial,
  onPlay,
}: TutorialPreviewCardProps): React.ReactElement {
  return (
    <article className="group/card flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.32)] sm:rounded-[26px]">
      {/* Thumbnail — taller than white content panel */}
      <div className="relative h-[250px] w-full shrink-0 overflow-hidden sm:h-[270px] lg:h-[290px]">
        <Image
          src={tutorial.posterSrc}
          alt={tutorial.headerTitle}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/35" aria-hidden />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-poppins text-[10px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" aria-hidden />
          {tutorial.badge}
        </span>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-poppins text-[11px] font-semibold tabular-nums text-white backdrop-blur-sm">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.25" />
            <path d="M4 3.5L6.5 5L4 6.5V3.5Z" fill="currentColor" />
          </svg>
          {tutorial.durationLabel}
        </span>

        <div className="absolute inset-0 flex items-center justify-center">
          <PlayRingButton onClick={onPlay} />
        </div>
      </div>

      {/* White content — compact; height driven by content only */}
      <div className="flex shrink-0 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins text-[10px] font-bold text-[#0b0b0b]">
            {tutorial.num}
          </span>
          <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.1em] text-[#9a9890] sm:text-[10px]">
            {tutorial.categoryLabel}
          </span>
        </div>

        <h3 className="mt-2.5 font-poppins text-[clamp(1.35rem,2.25vw,1.875rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0b0b0b]">
          {tutorial.headlineLead}{" "}
          <span
            className={`${accentSerif.className} bg-gradient-to-b from-[#f5a623] to-[#fdb813] bg-clip-text font-normal text-transparent`}
          >
            {tutorial.headlineAccent}
          </span>
        </h3>

        <p className={`mt-2 line-clamp-2 ${HOME_SECTION_BODY}`}>
          {tutorial.description}
        </p>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <span className="min-w-0 font-poppins text-[11px] font-normal text-[#0b0b0b] sm:text-[12px]">
            {tutorial.statLabel}
          </span>
          <HomeSecondaryButton onClick={onPlay} className="shrink-0">
            {tutorial.ctaLabel}
          </HomeSecondaryButton>
        </div>
      </div>
    </article>
  );
}
