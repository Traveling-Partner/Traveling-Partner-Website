// components/AboutUs.tsx (Main Container)
import React from "react";
import AboutHero from "@/components/About-us-sections/AboutHero";
import PurposeSection from "@/components/About-us-sections/PurposeSection";
import ChooseUsSection from "@/components/About-us-sections/ChooseUsSection";
const AboutUs: React.FC = () => {
  return (
    <div className="w-full">
      <AboutHero />
      <PurposeSection />
      <ChooseUsSection />
    </div>
  );
};

export default AboutUs;
