"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";

type MobileInfiniteCarouselProps = {
  children: ReactNode[];
  /** Auto-advance interval in ms */
  intervalMs?: number;
  className?: string;
};

/**
 * Infinite-loop card carousel for every mobile width (< md).
 * Fluid slide size, equal-height cards, resize-safe.
 */
export default function MobileInfiniteCarousel({
  children,
  intervalMs = 3500,
  className = "",
}: MobileInfiniteCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: false,
    slidesToScroll: 1,
  });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 4500);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keep snaps correct across orientation / keyboard / browser chrome changes
  useEffect(() => {
    if (!emblaApi) return;

    const reInit = () => emblaApi.reInit();
    window.addEventListener("resize", reInit);
    window.addEventListener("orientationchange", reInit);

    const vv = window.visualViewport;
    vv?.addEventListener("resize", reInit);

    return () => {
      window.removeEventListener("resize", reInit);
      window.removeEventListener("orientationchange", reInit);
      vv?.removeEventListener("resize", reInit);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [emblaApi, intervalMs, paused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const count = children.length;

  return (
    <div
      className={`w-full max-w-[100vw] md:hidden ${className}`}
      onPointerDown={pauseTemporarily}
    >
      {/* Full-bleed track so peeks work on every phone width */}
      <div className="-mx-4 overflow-hidden sm:-mx-6" ref={emblaRef}>
        <div className="flex touch-pan-y items-stretch">
          {children.map((child, index) => (
            <div
              key={index}
              className="box-border min-w-0 shrink-0 grow-0 basis-[88%] px-2 max-[360px]:basis-[92%] min-[390px]:basis-[84%] min-[430px]:basis-[80%] sm:basis-[72%] sm:px-3"
            >
              <div className="flex h-full min-h-[420px] max-[360px]:min-h-[400px] sm:min-h-[440px]">
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 px-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              selected === index
                ? "w-6 bg-[#FDB813]"
                : "w-2 bg-black/15 hover:bg-black/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
