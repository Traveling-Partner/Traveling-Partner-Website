"use client";

import Image from "next/image";
import { type CSSProperties } from "react";

type MobileCardLabelProps = {
  left: string;
  top: string;
  width: string;
  height: string;
  icon: string;
  title: string;
  subtitle: string;
};

/**
 * Single icon + title for a mobile card slot.
 * Use only on bases where baked labels were removed.
 */
export default function MobileCardLabel({
  left,
  top,
  width,
  height,
  icon,
  title,
  subtitle,
}: MobileCardLabelProps) {
  const frameStyle: CSSProperties = { left, top, width, height };

  return (
    <div
      className="pointer-events-none absolute z-[6]"
      style={frameStyle}
      aria-hidden="true"
    >
      <div className="flex max-w-[92%] items-center gap-2.5 pl-[8%] pt-[8%]">
        <Image
          src={icon}
          alt=""
          width={52}
          height={52}
          className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[15px] font-bold text-white sm:text-[16px]">
            {title}
          </p>
          <p className="truncate text-[12px] font-medium italic text-white/90 sm:text-[13px]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
