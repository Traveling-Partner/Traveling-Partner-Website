"use client";

import FeaturedServiceCard from "@/components/services/FeaturedServiceCard";

const FEATURES = [
  "Verified drivers",
  "Fixed fares",
  "0% commission",
] as const;

type PoolRideCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export default function PoolRideCard({
  className = "",
  variant = "desktop",
}: PoolRideCardProps) {
  return (
    <FeaturedServiceCard
      className={className}
      variant={variant}
      title="Pool Ride."
      description="Share your ride with people travelling in the same direction, split the fare, and make everyday commuting more affordable."
      features={FEATURES}
      iconSrc="/images/taxi-stand/services/icon-pool.png"
      gradientId="poolFeaturedMobileGrad"
    />
  );
}
