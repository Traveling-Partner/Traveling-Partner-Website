// components/privacy/PrivacyHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Lock, FileText, ArrowLeft, CheckCircle } from "lucide-react";

export default function PrivacyHeader(): React.ReactElement {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Hero Section */}
      <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Privacy Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-20">
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
                <Shield className="w-4 h-4 text-[#1a1a1a]" />
                <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                  Legal
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[42px] lg:text-[64px] font-black text-white leading-[1.1] mb-4 uppercase">
                Privacy Policy for
              </h1>

              {/* Gradient Subtitle */}
              <p className="text-[32px] lg:text-[48px] font-black leading-tight mb-6">
                <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
                  Traveling Partner
                </span>
              </p>

              {/* Description */}
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                Welcome to Travel Partner, where your privacy and security are
                central to our commitment. We are dedicated to safeguarding your
                personal information while providing you with a seamless
                experience using our diverse services. Whether you&apos;re a Driver or
                a Partner, this Privacy Policy serves as your comprehensive guide
                to how we collect, utilize, disclose, and protect your data. By
                utilizing our services, you explicitly agree to the principles
                outlined in this policy.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Lock className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">Data Protection</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <FileText className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">Transparent</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <CheckCircle className="w-4 h-4 text-[#FCE001]" />
                  <span className="text-white text-sm font-medium">GDPR Compliant</span>
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
                  <h3 className="text-white text-xl font-bold mb-6">Your Privacy Matters</h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Data Encryption", value: "256-bit SSL" },
                      { label: "User Control", value: "Full Access" },
                      { label: "Third Party Sharing", value: "Never" },
                      { label: "Data Retention", value: "Minimal Period" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-[#FCE001] font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-[#FCE001]/20 rounded-xl">
                    <p className="text-[#FCE001] text-sm font-medium text-center">
                      Last Updated: January 2024
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
                <Shield className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <p className="text-white font-bold">100% Secure</p>
                <p className="text-white/70 text-sm">Your data is protected</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-white">10M+</p>
                <p className="text-white/70 text-sm">Users Protected</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">99.9%</p>
                <p className="text-white/70 text-sm">Uptime Security</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="text-white/70 text-sm">Monitoring</p>
              </div>
            </div>

            <Link
              href="#policy-content"
              className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-black/80 transition-colors"
            >
              Read Full Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}