"use client";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  "Connect with passengers without added fees.",
  "Independently negotiate and finalize fares.",
  "Foster a collaborative and transparent environment.",
  "Plan and execute your travel in your preferred style",
  "Receive positive reviews, enhancing your stand's reputation.",
  "Streamline operations with the app's user-friendly features.",
  "Freedom to choose your travel companions.",
];

export default function BenefitsSection() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Subtle Yellow Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#fce001]/5 to-transparent"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#fdb813]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#fce001]/10 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row justify-around items-center py-20 lg:py-28 px-4">
        <div className="w-[90%] lg:w-[41%] px-[10px] relative z-10">
          {/* Section Label */}
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
          </div>

          <h2 className="text-[32px] lg:text-[42px] font-black text-[#1a1a1a] leading-tight mb-2">
            Benefits of <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Travelpartner</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#fce001]/30 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
            <span className="text-[#1a1a1a]"> App</span>
          </h2>
          
          <p className="text-gray-500 text-lg mb-8 max-w-md">Experience the future of transportation with our commission-free platform designed for modern travelers.</p>

          <div className="space-y-1">
            {benefits.map((text, index) => (
              <BenefitItem key={index} text={text} />
            ))}
          </div>

          <div className="mt-10 lg:mt-[30px] pb-[30px] lg:pb-0">
            <Link
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fce001] to-[#fdb813]"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <button className="relative flex items-center gap-3 bg-transparent text-black px-8 py-4 text-base font-bold uppercase tracking-wider border-none cursor-pointer">
                <span>Download the app</span>
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </button>
            </Link>
          </div>
        </div>
        
        <div className="w-full lg:w-[50%] flex justify-center relative group mt-12 lg:mt-0">
          {/* Yellow Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fce001]/20 via-[#fdb813]/10 to-transparent rounded-full blur-3xl transform scale-75 group-hover:scale-90 transition-transform duration-700"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-24 h-24 border-4 border-[#fce001]/20 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 border-4 border-[#fdb813]/20 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative transform transition-all duration-500 hover:scale-[1.02]">
            <Image
              src="/Assist/Taxi-stand-img/image 61.png"
              alt="Travelpartner App Benefits"
              width={600}
              height={500}
              className="w-full h-auto lg:h-[500px] drop-shadow-2xl relative z-10"
            />
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 z-20 border border-gray-100 transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#1a1a1a]">0%</div>
                  <div className="text-sm text-gray-500 font-medium">Commission</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-3 group cursor-default">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-[#fce001] rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="relative w-6 h-6 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <p className="text-gray-700 text-base font-medium group-hover:text-[#1a1a1a] transition-colors duration-300">{text}</p>
    </div>
  );
}