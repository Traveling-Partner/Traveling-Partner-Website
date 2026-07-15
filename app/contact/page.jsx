"use client";

import ContactHero from "@/components/Contact-sections/ContactHero";
import ContactFormSection from "@/components/Contact-sections/ContactFormSection";

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactFormSection />
    </div>
  );
}
