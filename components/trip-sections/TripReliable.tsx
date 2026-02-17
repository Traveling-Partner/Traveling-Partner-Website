// TripReliable.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function TripReliable() {
  return (
    <div 
      className="w-full min-h-[686px] flex flex-col items-center justify-center px-5 py-20 bg-cover bg-center bg-no-repeat relative overflow-hidden max-md:min-h-[400px] max-md:py-12"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/duubabjk7/image/upload/v1771314285/image_86_vhkebd.png')"
      }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[#fce001]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-[#fdb813]/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6 animate-fade-in-up">
          <svg className="w-4 h-4 text-[#fce001]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-white text-sm font-semibold uppercase tracking-wider">
            Trusted Service
          </span>
        </div>

        {/* Main heading with gradient accent */}
        <h2 className="text-[50px] font-bold text-white text-center uppercase leading-tight max-md:text-[32px] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Reliable, Safe,{" "}
          <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
            Transparent
          </span>
        </h2>
        
        {/* Gradient underline */}
        <div className="w-32 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4 mb-6"></div>
        
        {/* Subtitle */}
        <p className="text-[25px] text-white/90 text-center uppercase max-md:text-[18px] font-medium tracking-wide animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Your trusted ride for every occasion!
        </p>

        {/* App Store Buttons with hover effects */}
        <div className="flex justify-center items-center gap-5 mt-10 flex-wrap max-md:gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <Link 
            href="https://play.google.com/store/apps?hl=en&gl=US" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#fce001]/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black/20 backdrop-blur-sm rounded-xl p-1 border border-white/10 hover:border-[#fce001]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png" 
                alt="Google-PlayStore" 
                width={220} 
                height={65}
                className="w-full max-w-[220px] h-auto rounded-lg"
              />
            </div>
          </Link>

          <Link 
            href="https://www.apple.com/app-store/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#fce001]/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-black/20 backdrop-blur-sm rounded-xl p-1 border border-white/10 hover:border-[#fce001]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png" 
                alt="App-Store" 
                width={220} 
                height={65}
                className="w-full max-w-[220px] h-auto rounded-lg"
              />
            </div>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex justify-center gap-8 mt-12 flex-wrap max-md:gap-4 max-md:mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", label: "Verified Drivers" },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "24/7 Available" },
            { icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", label: "No Hidden Fees" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              <div className="w-8 h-8 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
              </div>
              <span className="text-sm font-medium uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}