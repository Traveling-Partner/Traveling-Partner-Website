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

export default function Home(): React.ReactElement {
  return (
    <div>
      <HeroSection />
      <RegisterDriverSection />
      <FeaturedCategoriesSection />
      
      <VideoSection 
        title="how to register as a driver"
        videoSrc="https://res.cloudinary.com/dabxnoxsx/video/upload/v1708419720/Driver_Registration_fy4in8.mp4"
        posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239883/How_to_register_as_a_Driver_a01zuj.png"
      />
      
      <AboutUsSection />
      
      <VideoSection 
        title="How to register as a Partner"
        videoSrc="https://res.cloudinary.com/dabxnoxsx/video/upload/v1708419830/Partner_Registration_q0k1fc.mp4"
        posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239860/video-sing_yzrcqg.png"
      />
      
      <BlogSection />
      <SafetySecuritySection />
      <ContactSection />
    </div>
  );
}