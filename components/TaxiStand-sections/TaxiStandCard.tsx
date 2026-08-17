"use client";

import FeaturedServiceCard from "@/components/services/FeaturedServiceCard";

const FEATURES = [
  "Verified drivers",
  "Fixed fares",
  "0% commission",
] as const;

type TaxiStandCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export default function TaxiStandCard({
  className = "",
  variant = "desktop",
}: TaxiStandCardProps) {
  return (
    <FeaturedServiceCard
      className={className}
      variant={variant}
      title="Taxi Stand."
      description="Book a ride online with verified drivers for your everyday travel."
      features={FEATURES}
      iconSrc="/images/taxi-stand/services/icon-taxi.png"
      gradientId="taxiFeaturedMobileGrad"
    />
  );
}
