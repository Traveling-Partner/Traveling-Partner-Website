// components/Privacy/PrivacyContent.tsx
"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  CreditCard, 
  MapPin, 
  Bell, 
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface Section {
  id: number;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

export default function PrivacyContent(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections: Section[] = [
    {
      id: 1,
      icon: Users,
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            To deliver a personalized and efficient experience, we collect various types of information:
          </p>
          <div className="grid gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Personal Information</h4>
              <p className="text-gray-600 text-sm">This encompasses your name, contact details, payment information, and, if required, identification documents to comply with local regulations.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Location Data</h4>
              <p className="text-gray-600 text-sm">We rely on your location to match you swiftly with nearby ride requests, facilitating convenience for Partners and helping Drivers optimize routes. You have the option to disable location tracking but bear in mind that this may affect certain functionalities.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Transaction Data</h4>
              <p className="text-gray-600 text-sm">We gather information related to your ride bookings, payments, and comprehensive trip history, which helps us improve and customize your experience.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: CreditCard,
      title: "How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Your data plays a pivotal role in enhancing your Travel Partner experience:
          </p>
          <ul className="space-y-3">
            {[
              { title: "Providing Services", desc: "Your information is critical for facilitating ride bookings, delivery services, logistics, and fuel cost savings within and between cities." },
              { title: "Payment Processing", desc: "We utilize your data for secure and transparent financial transactions, ensuring your peace of mind with each payment." },
              { title: "Improving Services", desc: "We continually enhance our services based on your interactions, develop innovative features, and personalize your experience to better serve your unique needs." },
              { title: "Safety and Security", desc: "Our unwavering commitment to safety includes an innovative feature that enables rides to be provided on behalf of a specific gender, ensuring a comfortable and secure journey for all." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#fdb813] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1a1a1a]">{item.title}:</span>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 3,
      icon: Users,
      title: "Data Sharing",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            To provide you with a seamless experience, we may share your information with specific parties:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Drivers", desc: "Sharing information with drivers is essential to facilitate ride bookings, delivery services, and logistics." },
              { title: "Payment Processors", desc: "Your data is used by payment processors to securely process payments." },
              { title: "Third-party Providers", desc: "Our services integrate with essential third-party APIs, Maps, Twilio, AWS S3 buckets." },
              { title: "Law Enforcement", desc: "We may share information when required by law or to protect our rights." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <h4 className="font-bold text-[#1a1a1a] mb-2 text-sm">{item.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 4,
      icon: Lock,
      title: "Data Security",
      content: (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-bold text-green-800">Enterprise-Grade Security</h4>
              <p className="text-green-600 text-sm">256-bit SSL Encryption</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We take the security of your data seriously and employ industry-standard measures to protect it from unauthorized access, disclosure, alteration, or destruction. Our encryption protocols and rigorous security practices are in place to ensure your information remains safe.
          </p>
        </div>
      )
    },
    {
      id: 5,
      icon: MapPin,
      title: "Your Choices",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">Your control is paramount:</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-5 bg-gradient-to-br from-[#fce001]/10 to-[#fdb813]/10 rounded-2xl border border-[#fce001]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <h4 className="font-bold text-[#1a1a1a] mb-2">Review and Update</h4>
              <p className="text-gray-600 text-sm">You have the power to manage your personal information in your account settings.</p>
            </div>
            <div className="flex-1 p-5 bg-gradient-to-br from-[#fce001]/10 to-[#fdb813]/10 rounded-2xl border border-[#fce001]/20">
              <div className="w-10 h-10 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-[#1a1a1a]" />
              </div>
              <h4 className="font-bold text-[#1a1a1a] mb-2">Location Tracking</h4>
              <p className="text-gray-600 text-sm">Option to enable or disable location tracking to suit your preferences.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      icon: HelpCircle,
      title: "Third-party Links",
      content: (
        <p className="text-gray-600 leading-relaxed">
          Please note that our services may include links to third-party websites or services. These entities have their privacy practices, separate from ours. As such, we encourage you to review their privacy policies when using their services.
        </p>
      )
    },
    {
      id: 7,
      icon: Bell,
      title: "Changes to this Policy",
      content: (
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 leading-relaxed">
              To keep you informed and updated, we may periodically update this Privacy Policy to reflect changes in our practices, adhere to evolving legal requirements, or address operational needs. Rest assured, you will receive notifications of significant changes.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 8,
      icon: Shield,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            For questions, concerns, or inquiries related to these Terms and Conditions, please contact us:
          </p>
          <div className="p-6 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl">
            <p className="text-[#1a1a1a] font-medium text-center mb-4">
              Thank you for choosing Travel Partner. We are dedicated to streamlining transportation, logistics, and trip planning while ensuring a secure and efficient experience for both Drivers and Partners.
            </p>
            <div className="flex justify-center">
              <a 
                href="mailto:support@travelingpartner.pk"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-semibold hover:bg-black/80 transition-colors"
              >
                Contact Support <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <main className="w-full bg-gradient-to-b from-gray-50 to-white pb-24">
      {/* Section Header */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#fdb813]" />
            <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
              Privacy Policy
            </span>
          </div>
          <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] mb-4 uppercase">
            Your Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Protection</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-[2px] bg-gray-200"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full"></div>
            <div className="w-20 h-[2px] bg-gray-200"></div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to protecting your privacy and ensuring your personal information is handled safely and responsibly.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <div
                key={section.id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? "border-[#fdb813] shadow-xl shadow-[#fce001]/10" 
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setActiveSection(isActive ? null : section.id)}
                  className="w-full p-6 lg:p-8 flex items-center gap-4 text-left"
                >
                  {/* Number Badge */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] shadow-lg" 
                      : "bg-gray-100"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${
                      isActive ? "text-[#1a1a1a]" : "text-gray-500"
                    }`} />
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? "text-[#fdb813]" : "text-gray-400"
                      }`}>
                        Section {String(section.id).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className={`text-lg lg:text-xl font-bold transition-colors ${
                      isActive ? "text-[#1a1a1a]" : "text-gray-700"
                    }`}>
                      {section.title}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] rotate-90" 
                      : "bg-gray-100"
                  }`}>
                    <ChevronRight className={`w-5 h-5 transition-colors ${
                      isActive ? "text-[#1a1a1a]" : "text-gray-500"
                    }`} />
                  </div>
                </button>

                {/* Expandable Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isActive ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                    <div className="pt-4 border-t border-gray-100">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">Have questions about your privacy?</p>
          <a 
            href="/help"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            Visit Help Center <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </main>
  );
}