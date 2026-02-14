"use client";
import React, { Suspense } from "react";
import ContactUsForm from "../ContactUsForm";

export default function ContactSection(): React.ReactElement {
  return (
    <div>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <ContactUsForm />
      </Suspense>
    </div>
  );
}