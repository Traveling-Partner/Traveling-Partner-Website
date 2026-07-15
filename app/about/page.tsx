// components/AboutUs.tsx (Main Container)
import React from "react";
import AboutHero from "@/components/About-us-sections/AboutHero";
import PurposeSection from "@/components/About-us-sections/PurposeSection";
import ChooseUsSection from "@/components/About-us-sections/ChooseUsSection";
import ExploreOurServices from "@/components/About-us-sections/ExploreOurServices";
const AboutUs: React.FC = () => {
  return (
    <div className="w-full">
      <AboutHero />
      <PurposeSection />
      <ChooseUsSection />
      <ExploreOurServices />
    </div>
  );
};

export default AboutUs;
