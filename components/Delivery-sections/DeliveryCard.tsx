"use client";

import FeaturedServiceCard from "@/components/services/FeaturedServiceCard";

const FEATURES = [
  "Door to door",
  "Live tracking",
  "0% commission",
] as const;

type DeliveryCardProps = {
  className?: string;
  variant?: "desktop" | "mobile";
};

export default function DeliveryCard({
  className = "",
  variant = "desktop",
}: DeliveryCardProps) {
  return (
    <FeaturedServiceCard
      className={className}
      variant={variant}
      title="Delivery."
      description="Send documents, parcels, or business orders and track them the whole way, with verified couriers and pricing you know upfront."
      features={FEATURES}
      iconSrc="/images/taxi-stand/services/icon-delivery.png"
      gradientId="deliveryFeaturedMobileGrad"
    />
  );
}
