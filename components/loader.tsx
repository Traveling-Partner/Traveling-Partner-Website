"use client";

import TPLoader from "@/components/TPLoader";

/** Drop-in branded loader — exact Figma prototype, compact size. */
const CircularIndeterminate = ({
  size = 108,
  label,
}: {
  size?: number;
  label?: string;
}) => {
  return <TPLoader variant="inline" size={size} label={label} />;
};

export default CircularIndeterminate;
