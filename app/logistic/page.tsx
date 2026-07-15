"use client";
import LogisticsHero from "@/components/logistic-sections/LogisticsHero";
import OurServicesSection from "@/components/logistic-sections/OurServicesSection";
import LogisticsBenefitsSection from "@/components/logistic-sections/LogisticsBenefitsSection";
import LogisticsFasterSaferSection from "@/components/logistic-sections/LogisticsFasterSaferSection";
import LogisticsServices from "@/components/logistic-sections/LogisticsServices";

export default function Logistics() {
  return (
    <div>
      <LogisticsHero />
      <OurServicesSection />
      <LogisticsBenefitsSection />
      <LogisticsFasterSaferSection />
      <LogisticsServices />
    </div>
  );
}
