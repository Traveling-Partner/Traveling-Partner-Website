const RING_SRC = "/images/loader/tp-loader-ring.svg";
const LOGO_SRC = "/images/loader/tp-loader-logo.svg";

const GRADIENT =
  "linear-gradient(99.88798881557781deg, rgb(252, 224, 1) 0%, rgb(253, 184, 19) 100%)";

type TPLoaderProps = {
  className?: string;
  /**
   * fullscreen — covers viewport (legacy)
   * inline — compact circular badge for splash / blog / forms
   */
  variant?: "fullscreen" | "inline";
  /** Diameter of the circular loader. Default 120. */
  size?: number;
  label?: string;
};

/**
 * Traveling Partner loader — Figma proto node 295:1584
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
      className="relative shrink-0 overflow-hidden rounded-full shadow-[0_8px_22px_rgba(253,184,19,0.28)]"
      style={{
        width: boxSize,
        height: boxSize,
        backgroundImage: GRADIENT,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Outer ring — inset 4px so yellow bg exceeds the ring by 4px */}
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
