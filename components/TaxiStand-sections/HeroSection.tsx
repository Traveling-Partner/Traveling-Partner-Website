"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div
      className="w-full bg-cover bg-no-repeat relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/image-95.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1">
            {/* <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium leading-tight text-black mb-2">
              CONNECT AND COMMUTE{" "}
              <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent font-bold">
                COMMISSION-FREE
              </span>
            </p> */}
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight font-black text-black mb-2 md:mb-3">
              Taxi Stand
            </h2>
            
           <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium leading-tight text-black mb-2">
              CONNECT AND COMMUTE{" "}<br />
              <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent font-bold">
                COMMISSION-FREE
              </span>
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4 md:mb-6 max-w-md mx-auto md:mx-0">
              Traveling Partner presents a modern platform connecting users to
              diverse taxi stands across Pakistan. Say goodbye to added fees when
              you access this hassle-free, commission-free service. Our platform
              ensures an affordable, direct connection with various taxi stands,
              allowing you to negotiate fares at your convenience and make your
              commuting experience both smooth and cost-effective.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start max-w-xs sm:max-w-sm mx-auto md:mx-0">
              <Link href="https://play.google.com/store/apps?hl=en&gl=US" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
                <Image src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png" alt="Google Play" width={180} height={54} className="w-full h-auto max-h-12 sm:max-h-14 object-contain" />
              </Link>
              <Link href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
                <Image src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png" alt="App Store" width={180} height={54} className="w-full h-auto max-h-12 sm:max-h-14 object-contain" />
              </Link>
            </div>
          </div>

          {/* Image container with animated rings */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2 mb-6 md:mb-0">
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] overflow-visible">
              
              {/* All rings contained within bounds using scale */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Outer glow ring */}
                <div className="absolute w-[110%] h-[110%] rounded-full bg-gradient-to-r from-[#fce001]/20 via-[#fdb813]/30 to-[#fce001]/20 blur-md pulsing-glow"></div>
                
                {/* Outer dashed ring */}
                <div className="absolute w-[108%] h-[108%] rounded-full border-2 border-dashed border-[#fce001]/60 outer-ring"></div>
                
                {/* Middle gradient ring */}
                <div className="absolute w-[104%] h-[104%] rounded-full border-2 sm:border-3 border-t-[#fce001] border-r-[#fdb813] border-b-[#fce001] border-l-[#fdb813] middle-ring"></div>
                
                {/* Inner dotted ring */}
                <div className="absolute w-[102%] h-[102%] rounded-full border-2 border-dotted border-[#fdb813]/40 inner-ring"></div>
                
                {/* Particle dots */}
                <div className="absolute w-full h-full particle-ring">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fce001] rounded-full shadow-[0_0_10px_#fce001]"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#fdb813] rounded-full shadow-[0_0_10px_#fdb813]"></span>
                </div>
              </div>
              
              {/* Static glow behind image */}
              <div className="absolute inset-2 bg-gradient-to-br from-[#fce001]/20 to-[#fdb813]/20 rounded-full blur-xl pointer-events-none"></div>
              
              <Image
                src="/Assist/Taxi-stand-img/Image (1).png"
                alt="Taxi Stand"
                fill
                className="object-contain p-1 sm:p-2 relative z-10"
                priority
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 440px, 440px"
              />
              
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-white rounded-xl p-2 sm:p-3 shadow-lg border border-gray-100 hidden sm:block z-20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-none">Available in</p>
                    <p className="text-xs sm:text-sm font-bold text-black leading-none">All Major Cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pulsing-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
        
        .outer-ring {
          animation: rotate-slow 20s linear infinite;
          will-change: transform;
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .middle-ring {
          animation: rotate-medium 15s linear infinite reverse;
          will-change: transform;
        }
        
        @keyframes rotate-medium {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .inner-ring {
          animation: rotate-fast 10s linear infinite;
          will-change: transform;
        }
        
        @keyframes rotate-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .particle-ring {
          animation: rotate-particles 20s linear infinite;
          will-change: transform;
        }
        
        @keyframes rotate-particles {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .outer-ring { animation-duration: 30s; }
          .middle-ring { animation-duration: 22s; }
          .inner-ring { animation-duration: 15s; }
          .particle-ring { animation-duration: 30s; }
          .pulsing-glow { animation-duration: 4s; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .outer-ring, .middle-ring, .inner-ring, .particle-ring, .pulsing-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}