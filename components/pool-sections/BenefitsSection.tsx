"use client";

import Image from "next/image";
import BenefitItem from "./BenefitItem";

const benefits = [
  "Share rides with others, reducing travel expenses",
  "Fewer vehicles on the road contribute to a greener environment",
  "Meet and interact with fellow travelers",
  "Share routes and save time during your commute",
];

const benefits2 = [
  "Option to choose between male or female-only rides for added comfort",
  "Fewer cars mean less congestion and smoother journeys",
  "Save money and meet new people",
  "Enjoy flexible scheduling and route choices",
];

export default function BenefitsSection() {
  return (
    <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-20 lg:py-28 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          {/* <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-pulse"></span>
            <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
          </div> */}
          <h2 className="text-[#1a1a1a] text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight mb-3">
            Benefits Of <span className="text-white drop-shadow-md">Pool Ride</span>
          </h2>
          <p className="text-[#1a1a1a]/80 text-lg lg:text-xl font-medium uppercase tracking-widest">
            For Users
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-0.5 bg-[#1a1a1a]/20 rounded-full"></div>
            <div className="w-2 h-2 bg-[#1a1a1a] rounded-full rotate-45"></div>
            <div className="w-16 h-0.5 bg-[#1a1a1a]/20 rounded-full"></div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1 */}
          <div className="group relative">
            {/* <div className="absolute inset-0 bg-white rounded-3xl transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-30 transition-all duration-500"></div> */}
            
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src="/Assist/Taxi-stand-img/man-getting-car-medium-shot 1.png"
                  alt="Save money with pool ride"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-[#1a1a1a]">01</span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl font-black uppercase tracking-wide drop-shadow-lg">
                    Save & Connect
                  </h3>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 lg:p-8">
                <div className="space-y-4">
                  {benefits.map((text, index) => (
                    <div key={index} className="flex items-start gap-4 group/item">
                      <div className="relative flex-shrink-0 w-7 h-7 mt-0.5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full transform scale-100 group-hover/item:scale-110 transition-transform duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed group-hover/item:text-[#1a1a1a] transition-colors duration-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom Accent */}
              <div className="h-1.5 bg-gradient-to-r from-[#fce001] via-[#fdb813] to-[#fce001]"></div>
            </div>
          </div>

          {/* Card 2 - Offset on desktop */}
          <div className="group relative lg:mt-12">
            {/* <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-1 scale-[1.02] opacity-0 group-hover:opacity-30 transition-all duration-500"></div> */}
            
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:-translate-y-2">
              {/* Image Section */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src="/Assist/Taxi-stand-img/travel-city 1.png"
                  alt="Comfort and flexibility"
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-[#1a1a1a]">02</span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-2xl font-black uppercase tracking-wide drop-shadow-lg">
                    Comfort & Flexibility
                  </h3>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 lg:p-8">
                <div className="space-y-4">
                  {benefits2.map((text, index) => (
                    <div key={index} className="flex items-start gap-4 group/item">
                      <div className="relative flex-shrink-0 w-7 h-7 mt-0.5">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full transform scale-100 group-hover/item:scale-110 transition-transform duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed group-hover/item:text-[#1a1a1a] transition-colors duration-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom Accent */}
              <div className="h-1.5 bg-gradient-to-r from-[#fce001] via-[#fdb813] to-[#fce001]"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}