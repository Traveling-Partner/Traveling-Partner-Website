"use client";
import React from "react";
import Image from "next/image";
import { RiContactsFill } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";

export default function RegisterDriverSection(): React.ReactElement {
  return (
    <div className="w-full bg-gradient-to-b from-[#fce001] to-[#fdb813] py-16 lg:py-24 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>

      <div className="w-[85%] mx-auto max-w-7xl relative z-10 max-md:w-full max-md:p-5">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white px-4 py-2 rounded-full mb-6">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Get Started
            </span>
          </div>

          <h2 className="uppercase text-[42px] lg:text-[50px] font-bold text-[#1a1a1a] leading-tight max-md:text-[30px]">
            Join Our <span className="text-white">Network</span>
          </h2>
          <div className="w-32 h-1.5 bg-[#1a1a1a] rounded-full mx-auto mt-4"></div>
        </div>

        {/* Content Grid */}
        <div className="flex items-center justify-center gap-16 max-md:flex-col max-md:gap-10">
          {/* Left - Image */}
          <div className="w-1/2 flex justify-center max-md:w-full">
            <div className="relative group">
              <div className="absolute inset-0  rounded-3xl transform -rotate-3 scale-95 blur-xl"></div>
              <div className="relative   rounded-3xl p-6 ">
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253508/tp-Imgs/Taxi-stand-img/home-page-b-img_l1ekvj.png"
                  alt="Mobile App"
                  width={500}
                  height={500}
                  className="w-full h-auto max-w-[400px] drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Right - Cards */}
          <div className="w-[40%] flex flex-col gap-8 max-md:w-full max-md:max-w-md">
            {/* Driver Card */}
            <a
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 overflow-hidden max-md:p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fce001]/20 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <RiContactsFill className="text-[#1a1a1a] text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1a1a1a] uppercase mb-1">Register As A Driver</h3>
                    <p className="text-gray-600 text-sm">Start earning on your own schedule</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-[#fdb813] transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Partner Card */}
            <a
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-2 overflow-hidden max-md:p-6">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-[#fdb813]/20 to-transparent rounded-full blur-2xl transform -translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <FaRegHandshake className="text-[#1a1a1a] text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1a1a1a] uppercase mb-1">Register As A Partner</h3>
                    <p className="text-gray-600 text-sm">Expand your business reach</p>
                  </div>
                  <svg
                    className="w-6 h-6 text-[#fdb813] transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}