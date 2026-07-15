"use client";
import LogisticsHero from "@/components/logistic-sections/LogisticsHero";
import LogisticsBenefitsSection from "@/components/logistic-sections/LogisticsBenefitsSection";
import LogisticsFasterSaferSection from "@/components/logistic-sections/LogisticsFasterSaferSection";
import LogisticsServices from "@/components/logistic-sections/LogisticsServices";

export default function Logistics() {
  return (
    <div>
      <LogisticsHero />
      <LogisticsBenefitsSection />
      <LogisticsFasterSaferSection />
      <LogisticsServices />
    </div>
  );
}