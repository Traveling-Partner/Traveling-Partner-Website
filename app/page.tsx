// app/page.tsx
import React from "react";
import HeroSection from "@/components/Home-sections/HeroSection";
import RegisterDriverSection from "@/components/Home-sections/RegisterDriverSection";
import SixRidesSection from "@/components/Home-sections/SixRidesSection";
import GetStartedSection from "@/components/Home-sections/GetStartedSection";
import AboutUsSection from "@/components/Home-sections/AboutUsSection";
import BlogSection from "@/components/Home-sections/BlogSection";
import SafetySecuritySection from "@/components/Home-sections/SafetySecuritySection";
import ContactSection from "@/components/Home-sections/ContactSection";

export default function Home(): React.ReactElement {
  return (
    <div>
      <HeroSection />
      <RegisterDriverSection />
      <SixRidesSection />

      <GetStartedSection />

      <AboutUsSection />

      <BlogSection />
      <SafetySecuritySection />
      <ContactSection />
    </div>
  );
}
