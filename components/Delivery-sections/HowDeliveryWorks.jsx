"use client";

import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Download the app",
    description: "Get started with our easy-to-use mobile application",
  },
  {
    number: "02",
    title: "Provide delivery details",
    description: "Date, time, items, pickup & drop-off locations, contact number",
  },
  {
    number: "03",
    title: "Choose your rider",
    description: "Select preferred gender (Male or Female)",
  },
  {
    number: "04",
    title: "Confirm rider",
    description: "Review and confirm your selected delivery partner",
  },
  {
    number: "05",
    title: "Track your delivery",
    description: "Driver will reach your pickup location at the scheduled time",
  },
];

export default function HowDeliveryWorks() {
  return (
    <div className="relative w-full bg-white overflow-hidden py-20 lg:py-28 px-4">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fce001]/5 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#fdb813]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fce001]/10 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#fdb813] rounded-full animate-pulse"></span>
            <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">Simple Process</span>
          </div>
          <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] leading-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Delivery</span> Works
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-0.5 bg-[#1a1a1a]/10 rounded-full"></div>
            <div className="w-2 h-2 bg-[#fce001] rounded-full rotate-45"></div>
            <div className="w-16 h-0.5 bg-[#1a1a1a]/10 rounded-full"></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Image */}
          <div className="w-full lg:w-[45%] relative group order-2 lg:order-1">
            <div className="absolute inset-0  rounded-3xl blur-xl transform scale-95 group-hover:scale-100 transition-transform duration-500"></div>
            <Image
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253508/tp-Imgs/Taxi-stand-img/home-page-b-img_l1ekvj.png"
              alt="How Delivery Works"
              width={600}
              height={500}
              className="w-full h-auto lg:h-[450px] object-contain drop-shadow-2xl relative z-10"
              loading="lazy"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-20 border border-gray-100 transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#1a1a1a]">Fast</div>
                  <div className="text-sm text-gray-500 font-medium">Delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="w-full lg:w-[50%] order-1 lg:order-2">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:border-[#fce001]/50 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Number Badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <span className="text-xl font-black text-[#1a1a1a]">{step.number}</span>
                    </div>
                    {/* Connector Line (except last item) */}
                    {index !== steps.length - 1 && (
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-[#fce001] to-transparent"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-[#1a1a1a] text-lg font-bold uppercase tracking-wide mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#000000] group-hover:to-[#000000] transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-[#000000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}