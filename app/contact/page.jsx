"use client";

import ContactHero from "@/components/Contact-sections/ContactHero";
import ContactFormSection from "@/components/Contact-sections/ContactFormSection";
import OurLocationSection from "@/components/Contact-sections/OurLocationSection";

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactFormSection />
      <OurLocationSection />
    </div>
  );
}
