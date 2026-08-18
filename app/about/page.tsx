// components/AboutUs.tsx (Main Container)
import React from "react";
import AboutHero from "@/components/About-us-sections/AboutHero";
import PurposeSection from "@/components/About-us-sections/PurposeSection";
import ChooseUsSection from "@/components/About-us-sections/ChooseUsSection";
import ExploreOurServices from "@/components/About-us-sections/ExploreOurServices";
import YourTrustSection from "@/components/About-us-sections/YourTrustSection";
const AboutUs: React.FC = () => {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <AboutHero />
      <PurposeSection />
      <ChooseUsSection />
      <ExploreOurServices />
      <YourTrustSection />
    </div>
  );
};

export default AboutUs;
