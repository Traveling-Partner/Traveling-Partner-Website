const RING_SRC = "/images/loader/tp-loader-ring.svg";
const LOGO_SRC = "/images/loader/tp-loader-logo.svg";

const GRADIENT =
  "linear-gradient(145deg, #FCE001 0%, #FDB813 100%)";

type TPLoaderProps = {
  className?: string;
  variant?: "fullscreen" | "inline";
  /** Diameter of the circular loader. Default 120. */
  size?: number;
  label?: string;
};

/**
 * Traveling Partner loader — Figma proto motion, premium floating badge look.
 * Yellow disc is 4px larger than the outer spinning ring on every side.
 */
export default function TPLoader({
  className = "",
  variant = "inline",
  size = 120,
  label,
}: TPLoaderProps) {
  const boxSize = variant === "fullscreen" ? "min(56vw, 280px)" : size;
  const ringInsetPx = 4;

  const disc = (
    <div
      className="tp-loader-stage"
      style={{ width: boxSize, height: boxSize }}
    >
      {/* Ambient brand glow */}
      <span className="tp-loader-glow" aria-hidden />

      {/* Contact / ground shadow */}
      <span className="tp-loader-ground" aria-hidden />

      <div className="tp-loader-badge">
        <div
          className="tp-loader-disc"
          style={{ backgroundImage: GRADIENT }}
        >
          {/* Top gloss — 3D “bumped” surface */}
          <span className="tp-loader-gloss" aria-hidden />
          {/* Soft bottom shade */}
          <span className="tp-loader-shade" aria-hidden />
          {/* Crisp rim */}
          <span className="tp-loader-rim" aria-hidden />

          {/* Outer ring — inset 4px so yellow exceeds the ring by 4px */}
          <div
            className="pointer-events-none absolute"
            style={{ inset: ringInsetPx }}
          >
            <div className="tp-loader-ring absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={RING_SRC}
                alt=""
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          {/* Center logo */}
          <div className="tp-loader-logo absolute inset-[24%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="Traveling Partner"
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center ${className}`}
        style={{ backgroundImage: GRADIENT }}
        role="status"
        aria-live="polite"
        aria-label={label || "Loading"}
        data-name="TP Loader"
      >
        {disc}
        <span className="sr-only">{label || "Loading…"}</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      data-name="TP Loader"
      suppressHydrationWarning
    >
      {disc}
      {label ? (
        <p className="text-sm font-medium text-[#6b6960]">{label}</p>
      ) : null}
      <span className="sr-only">{label || "Loading…"}</span>
    </div>
  );
}
