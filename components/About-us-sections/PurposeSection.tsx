// components/about/PurposeSection.tsx
import React from "react";
import Image from "next/image";
import FeatureList from "./FeatureList";

const PurposeSection: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[90%] mx-auto max-w-7xl relative z-10 py-16 space-y-20 lg:space-y-32">
        
 {/* Purpose Of Travel Partner */}
<div className="flex flex-col items-center">
  {/* Header - Centered at top */}
  <div className="text-center mb-12">
    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/30 border border-white/40 px-4 py-2 rounded-full mb-6">
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
      </svg>
      <span className="text-white text-sm font-bold uppercase tracking-wider">
        Our Mission
      </span>
    </div>
    
    {/* Title */}
    <h2 className="text-[36px] lg:text-[56px] font-black text-[#1a1a1a] leading-tight mb-4 uppercase tracking-tight">
      Purpose Of <span className="text-white">Travel Partner</span>
    </h2>
    
    {/* Subtitle */}
    <p className="text-[#1a1a1a] text-sm uppercase tracking-[0.2em] font-medium mb-6">
      With the best service
    </p>
    
    {/* Decorative line with dot */}
    {/* <div className="flex items-center justify-center gap-4">
      <div className="w-16 h-[1px] bg-[#1a1a1a]/30"></div>
      <div className="w-2 h-2 bg-[#1a1a1a] rounded-full"></div>
      <div className="w-16 h-[1px] bg-[#1a1a1a]/30"></div>
    </div> */}
  </div>

  {/* Content Row - Image and Text side by side */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full">
    {/* Text */}
    <div className="w-full lg:w-1/2 order-2 lg:order-1">
      <p className="text-base lg:text-lg text-[#1a1a1a]/80 leading-relaxed">
        At Traveling Partner, our purpose is to revolutionize the landscape
        of mobility, creating a space where users can effortlessly connect
        and collaborate. By fostering a community-centric environment, our
        platform eliminates the financial burdens of additional fees,
        providing a dynamic hub for individuals to share rides, make
        deliveries, and plan trips collaboratively. Through transparency,
        user empowerment, and a commitment to a commission-free approach, we
        aim to redefine the very essence of travel and connectivity in
        Pakistan. Traveling Partner is not just an app; it&apos;s a movement
        towards a more connected, collaborative, and commission-free future
        for everyone.
      </p>
    </div>

    {/* Image */}
    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
      <div className="relative group">
        <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-3 scale-95 blur-xl"></div>
        <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
          <Image
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253509/tp-Imgs/Taxi-stand-img/Purpose_Of_Travel_Partner_ssavpm.png"
            alt="Purpose"
            width={600}
            height={400}
            className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Feature Of The App */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/20 rounded-3xl transform -rotate-3 scale-95 blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253515/tp-Imgs/Taxi-stand-img/Feature_Of_The_App_l6ezv3.png"
                  alt="Features"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-white text-sm font-semibold uppercase tracking-wider">
                Key Features
              </span>
            </div>

            <h2 className="text-[32px] lg:text-[42px] font-bold text-[#1a1a1a] leading-tight mb-6">
              Feature Of <span className="text-white">The App</span>
            </h2>
            <div className="w-24 h-1.5 bg-[#1a1a1a] rounded-full mb-6"></div>
            
            <FeatureList />
          </div>
        </div>

        {/* Aim Of Travel Partner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Content Card */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden group hover:shadow-3xl transition-shadow duration-300">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fce001]/20 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/30 px-4 py-2 rounded-full mb-6">
                <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
                  Our Goals
                </span>
              </div>

              <h2 className="text-[32px] lg:text-[36px] font-bold text-[#1a1a1a] leading-tight mb-4">
                Aim Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Travel Partner</span>
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mb-6"></div>
              
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                At Traveling Partner, we aim to redefine how people connect,
                collaborate, and move within Pakistan by providing,
              </p>
              
              <ul className="space-y-3">
                {[
                  "Commission-Free Environment",
                  "Transform the Transportation Landscape",
                  "Facilitate Collaboration and Connectivity",
                  "User-Driven Flexibility"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[#1a1a1a] font-semibold">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#1a1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/30 to-[#fdb813]/30 rounded-3xl transform rotate-6 scale-95 blur-xl group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-[#fce001]/20">
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253507/tp-Imgs/Taxi-stand-img/Aim_yxb4uo.png"
                  alt="Aim"
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PurposeSection;