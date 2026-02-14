"use client";
import Image from "next/image";
import Link from "next/link";

const features = [
  "Drive and earn on your terms.",
  "No additional fees to join or start earning.",
  "Work when it suits you best",
  "Complete autonomy to decide on fares.",
  "Effortlessly manage your rides through the app.",
];

export default function DriveWithUsSection() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      {/* Subtle Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#fce001]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#fdb813]/10 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative w-full lg:w-[90%] mx-auto flex flex-col lg:flex-row justify-around items-center py-20 lg:py-28 px-4">
        <div className="w-full lg:w-[50%] flex justify-center order-2 lg:order-1 relative group">
          {/* Yellow Glow Effect Behind Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fce001]/30 to-[#fdb813]/20 rounded-3xl blur-2xl transform scale-90 group-hover:scale-100 transition-transform duration-700"></div>
          
          <div className="relative transform transition-all duration-700 hover:scale-105">
            <Image
              src="/Assist/Taxi-stand-img/image 61.png"
              alt="Driver with Travelpartner"
              width={600}
              height={500}
              className="w-full h-auto lg:h-[500px] drop-shadow-2xl"
            />
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#fce001] to-[#fdb813] text-black px-6 py-3 rounded-2xl shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <span className="font-black text-lg">100% Free</span>
            </div>
          </div>
        </div>
        
        <div className="w-[90%] lg:w-[41%] px-[10px] order-1 lg:order-2 relative z-10">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-[#fdb813] rounded-full animate-pulse"></span>
            <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">For Drivers</span>
          </div>
          
          <h2 className="text-[32px] lg:text-[42px] font-black text-[#1a1a1a] leading-tight mb-2">
            Drive with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Travelpartner</span>
          </h2>
          <h3 className="text-[24px] lg:text-[32px] font-bold text-gray-700 mb-8">
            & Earn Money
          </h3>
          
          <div className="space-y-4">
            {features.map((text, index) => (
              <FeatureItem key={index} text={text} />
            ))}
          </div>

          <div className="mt-8 lg:mt-[30px] pb-[30px] lg:pb-0">
            <Link
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#fce001] via-[#fdb813] to-[#fce001] animate-gradient-x"></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <button className="relative bg-transparent text-black px-[50px] py-[16px] text-base font-bold uppercase tracking-wider border-none cursor-pointer min-w-[180px] flex items-center gap-3">
                Register Now
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="relative flex-shrink-0 w-8 h-8 mt-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <p className="text-gray-700 text-lg leading-relaxed group-hover:text-[#1a1a1a] transition-colors duration-300">{text}</p>
    </div>
  );
}