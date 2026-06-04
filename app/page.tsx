// app/page.tsx
import React, { Suspense } from "react";
import HeroSection from "@/components/Home-sections/HeroSection";
import RegisterDriverSection from "@/components/Home-sections/RegisterDriverSection";
import FeaturedCategoriesSection from "@/components/Home-sections/FeaturedCategoriesSection";
import VideoSection from "@/components/Home-sections/VideoSection";
import AboutUsSection from "@/components/Home-sections/AboutUsSection";
import BlogSection from "@/components/Home-sections/BlogSection";
import SafetySecuritySection from "@/components/Home-sections/SafetySecuritySection";
import ContactSection from "@/components/Home-sections/ContactSection";

const PARTNER_INTRO_VIDEO_URI =
  "https://traveling-partner-storage.nyc3.cdn.digitaloceanspaces.com/Introduction%20Videos/Partner%20Introduction-F.mp4";
const DRIVER_INTRO_VIDEO_URI =
  "https://traveling-partner-storage.nyc3.cdn.digitaloceanspaces.com/Introduction%20Videos/Driver%20Introduction-F.mp4";

export default function Home(): React.ReactElement {
  return (
    <div>
      <HeroSection />
      <RegisterDriverSection />
      <FeaturedCategoriesSection />

      <VideoSection
        title="how to register as a driver"
        videoSrc={DRIVER_INTRO_VIDEO_URI}
        posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239883/How_to_register_as_a_Driver_a01zuj.png"
      />

      <AboutUsSection />

      <VideoSection
        title="How to register as a Partner"
        videoSrc={PARTNER_INTRO_VIDEO_URI}
        posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239860/video-sing_yzrcqg.png"
      />

      <BlogSection />
      <SafetySecuritySection />
      <ContactSection />
    </div>
  );
}
