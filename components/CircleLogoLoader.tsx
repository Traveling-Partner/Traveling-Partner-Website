"use client";

import TPLoader from "@/components/TPLoader";

type CircleLogoLoaderProps = {
  size?: number;
  label?: string;
  className?: string;
};

/**
 * Compact Figma TP Loader (same design + animation as the prototype).
 * Kept as CircleLogoLoader for existing imports.
 */
export default function CircleLogoLoader({
  size = 120,
  label,
  className = "",
}: CircleLogoLoaderProps) {
  return (
    <TPLoader
      variant="inline"
      size={size}
      label={label}
      className={className}
    />
  );
}
