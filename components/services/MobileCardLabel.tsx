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
      <div className="flex max-w-[92%] items-center gap-2 pl-[8%] pt-[8%]">
        <Image
          src={icon}
          alt=""
          width={48}
          height={48}
          className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[14px] font-bold text-white drop-shadow sm:text-[15px]">
            {title}
          </p>
          <p className="truncate text-[11px] font-medium italic text-white/90 drop-shadow sm:text-[12px]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
