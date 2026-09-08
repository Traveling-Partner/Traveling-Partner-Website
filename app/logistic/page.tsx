"use client";
import LogisticsHero from "@/components/logistic-sections/LogisticsHero";
import OurServicesSection from "@/components/logistic-sections/OurServicesSection";
import LogisticsBenefitsSection from "@/components/logistic-sections/LogisticsBenefitsSection";
import LogisticsFasterSaferSection from "@/components/logistic-sections/LogisticsFasterSaferSection";
import LogisticsServices from "@/components/logistic-sections/LogisticsServices";
import MoveBulkCargoSection from "@/components/logistic-sections/MoveBulkCargoSection";

export default function Logistics() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <LogisticsHero />
      <LogisticsBenefitsSection />
      <LogisticsFasterSaferSection />
      <LogisticsServices />
      <OurServicesSection />
      <MoveBulkCargoSection />
    </div>
  );
}
