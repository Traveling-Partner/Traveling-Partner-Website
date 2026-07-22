"use client";

import ContactHero from "@/components/Contact-sections/ContactHero";
import ContactFormSection from "@/components/Contact-sections/ContactFormSection";
import OurLocationSection from "@/components/Contact-sections/OurLocationSection";
import ExploreOurServices from "@/components/About-us-sections/ExploreOurServices";
import GetTheAppSection from "@/components/Contact-sections/GetTheAppSection";

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactFormSection />
      <OurLocationSection />
      <ExploreOurServices />
      <GetTheAppSection />
    </div>
  );
}
