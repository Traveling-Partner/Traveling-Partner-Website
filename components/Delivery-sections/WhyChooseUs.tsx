"use client";

import { FaArrowRightLong } from "react-icons/fa6";

const features = [
  { title: "Experienced Couriers", description: "Professional handling" },
  { title: "Affordable", description: "Best rates guaranteed" },
  { title: "Expert Customer Service", description: "24/7 support" },
  { title: "Save Time", description: "Quick delivery" },
];

export default function WhyChooseUs() {
  return (
    <div 
      className="relative bg-no-repeat bg-cover bg-center py-24 lg:py-32"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D')"
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Glass Card */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#fce001] rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-bold uppercase tracking-wider">Our Promise</span>
            </div>
            <h2 className="text-white text-4xl lg:text-5xl font-black uppercase tracking-tight mb-3">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Us?</span>
            </h2>
            <p className="text-white/80 text-xl lg:text-2xl font-medium">
              We are Fast, Affordable and Reliable
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-0.5 bg-white/30 rounded-full"></div>
              <div className="w-2 h-2 bg-[#fce001] rounded-full rotate-45"></div>
              <div className="w-12 h-0.5 bg-white/30 rounded-full"></div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#fce001]/50 rounded-2xl p-4 lg:p-5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative flex-shrink-0 w-12 h-12">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaArrowRightLong className="text-black text-xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold uppercase tracking-wide mb-1 group-hover:text-[#000000] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm  group-hover:text-[#000000]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}