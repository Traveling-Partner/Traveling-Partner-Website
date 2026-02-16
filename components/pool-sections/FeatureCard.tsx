"use client";

import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/20 to-[#fdb813]/20 rounded-3xl transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl transform transition-all duration-500 group-hover:-translate-y-2 border-2 border-gray-100 group-hover:border-[#fce001]/50 overflow-hidden h-full">
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 transform scale-110"></div>
          <div className="relative w-20 h-20 mx-auto">
            <Image
              src={feature.imageSrc}
              alt={feature.title}
              width={80}
              height={80}
              className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        <h3 className="text-[#1a1a1a] text-2xl font-black text-center mb-4 uppercase tracking-wide">
          {feature.title}
        </h3>
        <p className="text-gray-600 text-center leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fce001] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </div>
  );
}