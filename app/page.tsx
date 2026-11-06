// app/page.tsx
import React from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/Home-sections/HeroSection";
import RegisterDriverSection from "@/components/Home-sections/RegisterDriverSection";

const SixRidesSection = dynamic(
  () => import("@/components/Home-sections/SixRidesSection")
);
const GetStartedSection = dynamic(
  () => import("@/components/Home-sections/GetStartedSection")
);
const AboutUsSection = dynamic(
  () => import("@/components/Home-sections/AboutUsSection")
);
const BlogSection = dynamic(
  () => import("@/components/Home-sections/BlogSection")
);
const SafetySecuritySection = dynamic(
  () => import("@/components/Home-sections/SafetySecuritySection")
);
const ContactSection = dynamic(
  () => import("@/components/Home-sections/ContactSection")
);
const OurServicesSection = dynamic(
  () => import("@/components/Home-sections/OurServicesSection")
);

export default function Home(): React.ReactElement {
  return (
    <div className="min-w-0 overflow-x-hidden">
      <link
        rel="preload"
        as="image"
        href="/images/hero-man-figma-new.webp"
        type="image/webp"
        fetchPriority="high"
      />
      <HeroSection />
      <RegisterDriverSection />
      <SixRidesSection />

      <GetStartedSection />

      <AboutUsSection />

      <BlogSection />
      <SafetySecuritySection />
      <ContactSection />
      <OurServicesSection />
    </div>
  );
}
