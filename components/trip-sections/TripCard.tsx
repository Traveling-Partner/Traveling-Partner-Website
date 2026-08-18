"use client";

import FeaturedServiceCard from "@/components/services/FeaturedServiceCard";

const FEATURES = [
  "Family trips",
  "Group tours",
  "Weekend getaways",
] as const;

type TripCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export default function TripCard({
  className = "",
  variant = "desktop",
}: TripCardProps) {
  return (
    <FeaturedServiceCard
      className={className}
      variant={variant}
      title="Tourism."
      description="Plan family trips, group tours, weekend getaways, and travel across Pakistan with flexible travel options."
      features={FEATURES}
      iconSrc="/images/taxi-stand/services/icon-trip.png"
      gradientId="tripFeaturedMobileGrad"
    />
  );
}
