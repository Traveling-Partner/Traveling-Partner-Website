"use client";
import React, { Suspense } from "react";
import ContactUsForm from "../ContactUsForm";

export default function ContactSection(): React.ReactElement {
  return (
    <Suspense fallback={<div className="py-16 text-center text-white/70">Loading...</div>}>
      <ContactUsForm />
    </Suspense>
  );
}