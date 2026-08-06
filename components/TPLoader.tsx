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
  /** Diameter of the circular loader. Default 96. */
  size?: number;
  label?: string;
};

/**
 * Traveling Partner loader — Figma proto node 295:1584
 * CSS animations start immediately (no JS / Framer delay).
 */
export default function TPLoader({
  className = "",
  variant = "inline",
  size = 96,
  label,
}: TPLoaderProps) {
  const boxSize = variant === "fullscreen" ? "min(56vw, 280px)" : size;

  const disc = (
    <div
      className="relative shrink-0"
      style={{
        width: boxSize,
        height: boxSize,
      }}
    >
      {/* Yellow bg only — slightly smaller than the logo/ring stage */}
      <div
        className="absolute inset-[12%] rounded-full shadow-[0_8px_22px_rgba(253,184,19,0.28)]"
        style={{
          backgroundImage: GRADIENT,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-hidden
      />

      {/* Inner logo + ring keep full size (not shrunk with the bg) */}
      <div className="absolute inset-[4%]">
        <div className="tp-loader-ring absolute inset-[1%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={RING_SRC}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
        </div>
        <div className="tp-loader-logo absolute inset-[22%]">
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
