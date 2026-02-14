"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const safetyFeatures = [
  "Real-time GPS Tracking",
  "Emergency SOS Button",
  "24/7 Support Team",
  "Verified Drivers",
];

export default function SafetySecuritySection(): React.ReactElement {
  return (
    <div className="py-20 lg:py-32 w-full bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#fce001]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#fdb813]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[90%] mx-auto max-w-7xl relative z-10 max-md:w-[96%]">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">Your Safety First</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] uppercase tracking-tight mb-6 max-md:text-3xl max-md:text-left">
            Safety & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Security</span>
          </h2>

          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed max-md:text-left max-md:text-base">
            At Traveling Partner, we prioritize your safety with comprehensive security features designed to enhance your peace of mind throughout every journey.
          </p>
        </div>

        {/* Safe and Secure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <svg className="w-7 h-7 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[#fdb813] font-bold uppercase tracking-wider text-sm">Feature 01</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight max-md:text-2xl">Safe and Secure</h3>

            <p className="text-gray-600 text-lg leading-relaxed max-md:text-base">
              Experience a journey in a safe and secure environment with Traveling Partner. Our commitment to your well-being is reflected in our comprehensive safety measures. From real-time tracking to transparent communications, we ensure that your safety is at the forefront of every ride, delivery, trip or logistic service.
            </p>

            <ul className="space-y-3 pt-2">
              {safetyFeatures.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-[#1a1a1a] font-medium">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link href="/about-us" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#fce001]/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <span className="relative z-10">Learn More About Us</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/30 to-[#fdb813]/30 rounded-3xl transform rotate-3 scale-95 blur-xl group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-[#fce001]/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fce001] to-[#fdb813] opacity-10 rounded-full blur-2xl"></div>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253813/tp-Imgs/img/safe1_j0ej4m.png"
                alt="Safe and Secure"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">100% Secure</div>
                  <div className="text-xs text-gray-500">Verified Rides</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Female Driver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/30 to-[#fdb813]/30 rounded-3xl transform -rotate-3 scale-95 blur-xl group-hover:-rotate-6 transition-transform duration-500"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-[#fce001]/20 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#fce001] to-[#fdb813] opacity-10 rounded-full blur-2xl"></div>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253727/tp-Imgs/img/Female_Driver_haf5qp.png"
                alt="Female Driver"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">Female Only</div>
                  <div className="text-xs text-gray-500">Optional Feature</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <svg className="w-7 h-7 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-[#fdb813] font-bold uppercase tracking-wider text-sm">Feature 02</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight max-md:text-2xl">Female Driver Option</h3>

            <p className="text-gray-600 text-lg leading-relaxed max-md:text-base">
              At Traveling Partner, we prioritize your security with our unique Female-Only Option. This security-focused feature is designed for both female drivers and passengers, providing a reassuring environment for everyone.
            </p>

            <div className="bg-gradient-to-br from-[#fce001]/10 to-[#fdb813]/10 rounded-2xl p-6 border border-[#fce001]/20">
              <h4 className="font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                How It Works
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2"><span className="text-[#fdb813] mt-1">•</span>Female drivers can choose rides exclusively with female passengers</li>
                <li className="flex items-start gap-2"><span className="text-[#fdb813] mt-1">•</span>Female passengers can opt for pooling with female partners</li>
                <li className="flex items-start gap-2"><span className="text-[#fdb813] mt-1">•</span>Option to request rides driven by female drivers only</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link href="/about-us" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#fce001]/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <span className="relative z-10">Explore Safety Features</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}