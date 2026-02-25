"use client";

import Image from "next/image";
import Link from "next/link";

export default function PrivacyHeader() {
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
              Privacy Policy for
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium leading-tight text-black mb-2">
              {/* CONNECT AND COMMUTE <br /> */}
              <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent font-bold">
                Traveling Partner
              </span>
            </p>

            <p className="text-sm sm:text-base text-gray-700 mb-4 md:mb-6 max-w-md mx-auto md:mx-0">
              Welcome to Travel Partner, where your privacy and security are
              central to our commitment. We are dedicated to safeguarding your
              personal information while providing you with a seamless
              experience using our diverse services. Whether you're a Driver or
              a Partner, this Privacy Policy serves as your comprehensive guide
              to how we collect, utilize, disclose, and protect your data. By
              utilizing our services, you explicitly agree to the principles
              outlined in this policy.
            </p>

            {/* <div
              className="flex items-center gap-4 mt-10 flex-wrap max-md:justify-center max-md:gap-3 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
               <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg text-black font-bold transition-colors duration-300 hover:text-[#fdb813] group"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
              
            </div> */}
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
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1771328218/Frame_72.1c75a8e2cad25a3e5b42_huymvl.png"
                alt="Taxi Stand"
                fill
                className="object-contain p-1 sm:p-2 relative z-10"
                priority
                sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 380px, (max-width: 1280px) 440px, 440px"
              />

              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-white rounded-xl p-2 sm:p-3 shadow-lg border border-gray-100 hidden sm:block z-20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 leading-none">
                      Your Data
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-black leading-none">
                      Protected
                    </p>
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
          0%,
          100% {
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
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .middle-ring {
          animation: rotate-medium 15s linear infinite reverse;
          will-change: transform;
        }

        @keyframes rotate-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .inner-ring {
          animation: rotate-fast 10s linear infinite;
          will-change: transform;
        }

        @keyframes rotate-fast {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .particle-ring {
          animation: rotate-particles 20s linear infinite;
          will-change: transform;
        }

        @keyframes rotate-particles {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .outer-ring {
            animation-duration: 30s;
          }
          .middle-ring {
            animation-duration: 22s;
          }
          .inner-ring {
            animation-duration: 15s;
          }
          .particle-ring {
            animation-duration: 30s;
          }
          .pulsing-glow {
            animation-duration: 4s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .outer-ring,
          .middle-ring,
          .inner-ring,
          .particle-ring,
          .pulsing-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
function AppStoreButton({ href, icon, label, store }: { href: string; icon: "google" | "apple"; label: string; store: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden flex items-center gap-4 bg-white text-[#1a1a1a] px-8 py-5 rounded-2xl hover:shadow-2xl transition-all duration-300 min-w-[220px] transform hover:-translate-y-1 border border-gray-200"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#fce001] to-[#fdb813] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
      <div className="relative z-10 flex items-center gap-4">
        {icon === "google" ? (
          <svg className="w-10 h-10 group-hover:text-[#1a1a1a] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
        ) : (
          <svg className="w-10 h-10 group-hover:text-[#1a1a1a] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
          </svg>
        )}
        <div className="text-left group-hover:text-[#1a1a1a] transition-colors duration-300">
          <div className="text-[11px] uppercase tracking-wider opacity-60 font-semibold">{label}</div>
          <div className="text-lg font-black leading-tight">{store}</div>
        </div>
      </div>
    </Link>
  );
}