// app/privacy/page.tsx
import React from "react";
import PrivacyHeader from "@/components/privacy-sections/PrivacyHeader";
import PrivacyContent from "@/components/privacy-sections/PrivacyContent";

export default function Privacy() {
  return (
    <div className="w-full pb-12 text-black">
      <PrivacyHeader />
      <PrivacyContent />
    </div>
  );
}