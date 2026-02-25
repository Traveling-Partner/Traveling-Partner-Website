// components/Terms.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Scale, 
  FileText, 
  Users, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Gavel,
  BookOpen
} from "lucide-react";

interface Section {
  id: number;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const Terms: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections: Section[] = [
    {
      id: 1,
      icon: BookOpen,
      title: "Definitions",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Understanding the key terms used throughout this agreement:
          </p>
          <div className="grid gap-4">
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Travel Partner</h4>
              <p className="text-gray-600 text-sm">refers to our platform and mobile application that enables Drivers to provide Delivery Services, Pool Rides, logistics services, and Trip planning services to Partners within and between cities.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Driver</h4>
              <p className="text-gray-600 text-sm">refers to individuals who offer transportation, delivery, logistics, or trip-planning services to Partners using the Travel Partner platform.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-[#fdb813]">
              <h4 className="font-bold text-[#1a1a1a] mb-2">Partner</h4>
              <p className="text-gray-600 text-sm">refers to individuals who use the Travel Partner platform to book rides, deliveries, logistics services, or plan trips.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: AlertTriangle,
      title: "Disclaimers",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Important limitations and disclaimers regarding our services:
          </p>
          <ul className="space-y-3">
            {[
              { title: "Service Availability", desc: "Travel Partner does not guarantee the availability of Drivers, trip planning services, or the accuracy of ride or delivery times." },
              { title: "Goods Transportation", desc: "Travel Partner is not responsible for any goods or packages transported through our platform." }
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
      title: "Registration and Accounts",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Account creation and management requirements:
          </p>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800">Account Security</h4>
                <p className="text-blue-600 text-sm">Your Responsibility</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To access and use our services, you must create an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Payment",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Payment processing terms and conditions:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Payment Processing", desc: "Payment for services is processed through our platform." },
              { title: "Terms Agreement", desc: "By using our services, you agree to the payment terms outlined in the app." },
              { title: "Cost Structure", desc: "Including the cost of services, payment methods, and any applicable fees." },
              { title: "Secure Transactions", desc: "All payments are encrypted and securely processed." }
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
      id: 5,
      icon: Shield,
      title: "Privacy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Your privacy is important to us:
          </p>
          <div className="p-5 bg-gradient-to-br from-[#fce001]/10 to-[#fdb813]/10 rounded-2xl border border-[#fce001]/20">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#fdb813] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Your use of Travel Partner is also governed by our Privacy Policy, which outlines how we collect, use, and protect your data.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By using our services, you consent to the practices outlined in the Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      icon: Gavel,
      title: "Termination",
      content: (
        <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-red-800">Account Termination</h4>
              <p className="text-red-600 text-sm">Our Rights</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to terminate or suspend your account and access to our services at our discretion, without notice, for any violation of these Terms and Conditions.
          </p>
        </div>
      )
    },
    {
      id: 7,
      icon: Scale,
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Understanding the limits of our liability:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="font-bold text-[#1a1a1a] mb-2">Not Liable For</h4>
              <p className="text-gray-600 text-sm">Indirect, incidental, special, consequential, or punitive damages</p>
            </div>
            <div className="flex-1 p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="font-bold text-[#1a1a1a] mb-2">Losses</h4>
              <p className="text-gray-600 text-sm">Loss of profits, revenues, data, use, goodwill, or other intangible losses</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      icon: FileText,
      title: "Changes to Terms and Conditions",
      content: (
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms and Conditions from time to time to reflect changes in our practices, legal requirements, or operational needs. Continued use of our services after such changes implies your consent to the revised Terms and Conditions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 9,
      icon: HelpCircle,
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            For questions, concerns, or inquiries related to these Terms and Conditions, please contact us at ( Your Contact Information ).
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
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Terms Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-20 ">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#FCE001] font-medium mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#FCE001] px-4 py-2 rounded-full mb-6">
                <Scale className="w-4 h-4 text-[#1a1a1a]" />
                <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                  Legal
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[42px] lg:text-[64px] font-black text-white leading-[1.1] mb-4 uppercase">
                Terms and Conditions for
              </h1>

              {/* Gradient Subtitle */}
              <p className="text-[32px] lg:text-[48px] font-black leading-tight mb-6">
                <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
                  Travel Partner
                </span>
              </p>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                Welcome to Travel Partner! These Terms and Conditions govern your use of our services as a Driver or a Partner. Please read this document carefully as it outlines the terms under which you may access and utilize our platform. By using our services, you agree to comply with and be bound by these Terms and Conditions.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Shield className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">Protected Rights</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <FileText className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">Transparent</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Scale className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">Fair Terms</span>
                </div>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#fce001]/20 to-[#fdb813]/20 rounded-3xl blur-2xl"></div>
                
                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <h3 className="text-white text-xl font-bold mb-6">Agreement Overview</h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Effective Date", value: "January 2024" },
                      { label: "Last Updated", value: "January 2024" },
                      { label: "Applies To", value: "All Users" },
                      { label: "Jurisdiction", value: "Local Laws" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-[#FCE001] font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#FCE001]/20 rounded-xl">
                    <p className="text-[#FCE001] text-sm font-medium text-center">
                      Please Read Carefully
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Yellow Info Bar */}
      <div className="w-full bg-gradient-to-r from-[#FCE001] to-[#FDB813] py-8">
        <div className="w-[90%] mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black/10 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <p className="text-white font-bold">Legal Agreement</p>
                <p className="text-white/70 text-sm">Binding Terms</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-white">9</p>
                <p className="text-white/70 text-sm">Sections</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-white/70 text-sm">Transparent</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="text-white/70 text-sm">Support</p>
              </div>
            </div>

            <Link
              href="#terms-content"
              className="px-6 py-3 bg-white text-[#1a1a1a] rounded-full font-semibold hover:bg-black/10 transition-colors"
            >
              Read Full Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main id="terms-content" className="w-full bg-gradient-to-b from-gray-50 to-white pb-24 ">
        {/* Section Header */}
        <div className="w-[90%] mx-auto max-w-5xl pt-16 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
              <FileText className="w-4 h-4 text-[#fdb813]" />
              <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
                Terms & Conditions
              </span>
            </div>
            <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] mb-4 uppercase">
              Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Agreement</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-[2px] bg-gray-200"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full"></div>
              <div className="w-20 h-[2px] bg-gray-200"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please review these terms carefully before using our services. By accessing Travel Partner, you agree to be bound by these conditions.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="w-[90%] mx-auto max-w-7xl  ">
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
            <p className="text-gray-500 mb-4">Have questions about these terms?</p>
            <a 
              href="/help"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold rounded-full hover:shadow-xl transition-all hover:scale-105"
            >
              Visit Help Center <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;