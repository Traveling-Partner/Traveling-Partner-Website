import HeroSection from "@/components/pool-sections/HeroSection";
import BenefitsSection from "@/components/pool-sections/BenefitsSection";
import FeaturesSection from "@/components/pool-sections/FeaturesSection";
import OurServicesSection from "@/components/pool-sections/OurServicesSection";

export default function PoolRide() {
  return (
    <div className="font-poppins">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <OurServicesSection />
    </div>
  );
}