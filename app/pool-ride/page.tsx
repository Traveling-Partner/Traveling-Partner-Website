import HeroSection from "@/components/pool-sections/HeroSection";
import BenefitsSection from "@/components/pool-sections/BenefitsSection";
import FeaturesSection from "@/components/pool-sections/FeaturesSection";
import OurServicesSection from "@/components/pool-sections/OurServicesSection";
import GoingSameWaySection from "@/components/pool-sections/GoingSameWaySection";

export default function PoolRide() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden font-poppins">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <OurServicesSection />
      <GoingSameWaySection />
    </div>
  );
}