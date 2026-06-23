import type { CSSProperties } from "react";

/** Figma Hero frame 124:3558 — shared background for header + hero on home. */
export const heroBackgroundStyle: CSSProperties = {
  backgroundImage:
    "radial-gradient(ellipse 1344px 908px at 100% 50%, rgba(252,224,1,0.18) 0%, rgba(252,224,1,0) 65%), radial-gradient(ellipse 768px 682px at 0% 100%, rgba(253,184,19,0.1) 0%, rgba(253,184,19,0) 70%), linear-gradient(131.83deg, #fffcf2 0%, #faf5e4 60%, #f4f0e0 100%)",
};

/** Figma nav y=43 + height=87 (desktop); mobile compact bar */
export const HERO_HEADER_OFFSET_PX = 130;
export const HERO_HEADER_OFFSET_MOBILE_PX = 88;

/** Figma hero canvas */
export const HERO_FRAME_WIDTH = 1920;
export const HERO_FRAME_HEIGHT = 1136;

/** Figma bottom fade 124:3569 — exact cream shades */
export const heroBottomFadeStyle = {
  backgroundImage:
    "linear-gradient(175.23deg, rgba(255,252,242,0.58) 22.46%, rgba(250,245,228,0.58) 71.95%, rgba(244,240,224,0.58) 104.94%)",
} as const;
