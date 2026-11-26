"use client";
import LogisticsHero from "@/components/logistic-sections/LogisticsHero";
import OurServicesSection from "@/components/logistic-sections/OurServicesSection";
import LogisticsBenefitsSection from "@/components/logistic-sections/LogisticsBenefitsSection";
import LogisticsFasterSaferSection from "@/components/logistic-sections/LogisticsFasterSaferSection";
import LogisticsServices from "@/components/logistic-sections/LogisticsServices";
import MoveBulkCargoSection from "@/components/logistic-sections/MoveBulkCargoSection";
import AdSlot from "@/components/ads/AdSlot";

export default function Logistics() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <LogisticsHero />
      <LogisticsBenefitsSection />
      <AdSlot placement="service1" />
      <LogisticsFasterSaferSection />
      <LogisticsServices />
      <OurServicesSection />
      <MoveBulkCargoSection />
      <AdSlot placement="service2" />
    </div>
  );
}
