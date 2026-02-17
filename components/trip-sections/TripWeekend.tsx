// TripWeekend.jsx
"use client";

import Image from "next/image";

export default function TripWeekend() {
  return (
    <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#1a1a1a] rounded-full animate-pulse"></span>
              <span className="text-white text-sm font-bold uppercase tracking-wider">Weekend Special</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black text-[#1a1a1a] leading-tight mb-4">
              Enjoy your weekend <br /><span className="text-white" >with</span> <br />
              <span className="relative inline-block">
                <span className="relative z-10">Travel partner</span>
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#1a1a1a]/20 -z-0" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 4 Q 50 8 100 4" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
            
            <p className="text-[#1a1a1a]/80 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Go on a long trip with your friends and family Get a Taxi That is Just
              Made for Road Trips Freedom from Car Servicing Hassles Optimize Travelling Time
            </p>

            {/* Decorative Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8">
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#fce001]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Group Trips</div>
                  <div className="text-[#1a1a1a] text-xs">Perfect for friends</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#fce001]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-sm">24/7 Service</div>
                  <div className="text-[#1a1a1a] text-xs">Anytime, anywhere</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image with decorative elements */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative group order-1 lg:order-2">
            {/* Decorative background elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            {/* Rotating decorative ring
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[90%] h-[90%] border-2 border-dashed border-white/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute w-[85%] h-[85%] border border-white/20 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }}></div>
            </div> */}

            <div className="relative transform transition-all duration-500 hover:scale-[1.02]">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314285/image_81_1_sqeawd.png" 
                alt="Enjoy Weekend" 
                width={600} 
                height={400}
                className="w-full h-auto max-w-lg drop-shadow-2xl relative z-10 rounded-2xl"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-xl border border-gray-100 z-20 hidden sm:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#1a1a1a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 leading-none">Trusted by</div>
                    <div className="text-xs font-bold text-[#1a1a1a] leading-none">10k+ Travelers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}