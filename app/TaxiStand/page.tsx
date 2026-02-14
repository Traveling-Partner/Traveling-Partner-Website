// app/TaxiStand/page.tsx
import HeroSection from "@/components/TaxiStand-sections/HeroSection";
import ForDriversSection from "@/components/TaxiStand-sections/ForDriversSection";
import DriveWithUsSection from "@/components/TaxiStand-sections/DriveWithUsSection";
import ForPartnersSection from "@/components/TaxiStand-sections/ForPartnersSection";
import BenefitsSection from "@/components/TaxiStand-sections/BenefitsSection";

export default function TaxiStand() {
  return (
    <div className="font-[Poppins]">
      <HeroSection />
      <ForDriversSection />
      <DriveWithUsSection />
      <ForPartnersSection />
      <BenefitsSection />
    </div>
  );
}