"use client";

import FeaturedServiceCard from "@/components/services/FeaturedServiceCard";

const FEATURES = [
  "Fleet support",
  "Live tracking",
  "Regular deliveries",
] as const;

type LogisticsCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export default function LogisticsCard({
  className = "",
  variant = "desktop",
}: LogisticsCardProps) {
  return (
    <FeaturedServiceCard
      className={className}
      variant={variant}
      title="Logistics."
      description="Built for businesses that need regular deliveries, fleet support, and transport they can rely on."
      features={FEATURES}
      iconSrc="/images/taxi-stand/services/icon-logistics.png"
      gradientId="logisticsFeaturedMobileGrad"
    />
  );
}
