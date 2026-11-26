import HeroSection from "@/components/pool-sections/HeroSection";
import BenefitsSection from "@/components/pool-sections/BenefitsSection";
import FeaturesSection from "@/components/pool-sections/FeaturesSection";
import OurServicesSection from "@/components/pool-sections/OurServicesSection";
import GoingSameWaySection from "@/components/pool-sections/GoingSameWaySection";
import AdSlot from "@/components/ads/AdSlot";

export default function PoolRide() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden font-poppins">
      <HeroSection />
      <BenefitsSection />
      <AdSlot placement="service1" />
      <FeaturesSection />
      <OurServicesSection />
      <GoingSameWaySection />
      <AdSlot placement="service2" />
    </div>
  );
}