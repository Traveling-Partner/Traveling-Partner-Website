import type { CSSProperties, ReactElement, ReactNode } from "react";
import { heroBackgroundStyle } from "@/lib/heroBackground";

/** Decorative overlays — Figma nodes 124:3559–124:3565 */
export function HeroBackgroundDecor(): ReactElement {
  return (
    <>
      {/* Right-side warm glow */}
      <div
        className="pointer-events-none absolute bottom-[0.11%] right-[0.08%] top-[10.51%] left-[42.01%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 667px 812px at 60% 50%, rgba(253,184,19,0.1) 0%, rgba(253,184,19,0) 70%)",
        }}
        aria-hidden
      />

      {/* Column guides */}
      <div
        className="pointer-events-none absolute bottom-[0.11%] left-[0.08%] right-[0.08%] top-[10.51%]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, transparent 32.92%, rgba(11,11,11,0.05) 33%, transparent 33.08%), linear-gradient(90deg, transparent 0%, transparent 65.92%, rgba(11,11,11,0.05) 66%, transparent 66.08%)",
        }}
        aria-hidden
      />

      {/* Horizontal guide line */}
      <div
        className="pointer-events-none absolute left-[0.08%] right-[0.08%] h-px"
        style={{
          top: "calc(50% + 5.27%)",
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(11,11,11,0.03) 20%, rgba(11,11,11,0.07) 50%, rgba(11,11,11,0.03) 80%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Yellow guide dots */}
      <div
        className="pointer-events-none absolute h-[14.5px] w-[14.5px] -translate-y-1/2 rounded-full bg-[#fce001] shadow-[0_0_0_5.8px_rgba(252,224,1,0.2),0_0_23px_rgba(252,224,1,0.4)]"
        style={{ left: "32.73%", top: "calc(50% + 5.2%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute h-[14.5px] w-[14.5px] -translate-y-1/2 rounded-full bg-[#fce001] shadow-[0_0_0_5.8px_rgba(252,224,1,0.2),0_0_23px_rgba(252,224,1,0.4)]"
        style={{ left: "65.53%", top: "calc(50% + 5.2%)" }}
        aria-hidden
      />
    </>
  );
}

export function HeroBackgroundRoot({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}): ReactElement {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...heroBackgroundStyle, ...style }}
    >
      <HeroBackgroundDecor />
      {children}
    </div>
  );
}
