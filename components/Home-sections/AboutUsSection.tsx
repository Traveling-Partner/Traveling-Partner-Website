"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutUsSection(): React.ReactElement {
  return (
    <div className="w-full bg-gradient-to-br from-white via-gray-50 to-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#fce001]/5 rounded-full blur-3xl translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fdb813]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[90%] mx-auto max-w-7xl relative z-10 max-md:w-[96%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-[#fdb813] rounded-full animate-pulse"></span>
              <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">Who We Are</span>
            </div>

            <div className="space-y-4">
              <h2 className="uppercase text-[50px] font-bold text-[#1a1a1a] leading-tight max-md:text-[32px] max-md:text-center max-md:font-bold">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Us</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full max-md:mx-auto"></div>
            </div>

            <div className="hidden max-md:flex max-md:justify-center max-md:w-full">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/30 to-[#fdb813]/30 rounded-3xl transform rotate-3 scale-95 blur-xl"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl border-2 border-[#fce001]/20">
                  <Image
                    src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253700/tp-Imgs/img/About-us_ehftg2.png"
                    alt="About Us"
                    width={500}
                    height={375}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed max-md:text-base max-md:text-center">
                At Traveling Partner, our purpose is to revolutionize the landscape of mobility, creating a space where users can effortlessly connect and collaborate. By fostering a community-centric environment, our platform eliminates the financial burdens of additional fees, providing a dynamic hub for individuals to share rides, make deliveries, and plan trips collaboratively.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed max-md:text-base max-md:text-center">
                Through transparency, user empowerment, and a commitment to a commission-free approach, we aim to redefine the very essence of travel and connectivity in Pakistan. Traveling Partner is not just an app; it's a movement towards a more connected, collaborative, and commission-free future for everyone.
              </p>
            </div>

            <div className="flex gap-8 py-4 max-md:justify-center max-md:flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-black text-[#1a1a1a]">0%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Commission</div>
              </div>
              <div className="w-px bg-gray-200 max-md:hidden"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#1a1a1a]">24/7</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Support</div>
              </div>
              <div className="w-px bg-gray-200 max-md:hidden"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-[#1a1a1a]">100%</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Secure</div>
              </div>
            </div>

            <div className="max-md:flex max-md:justify-center">
              <Link
                href="/about-us"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#fce001]/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <span className="relative z-10">Learn more</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group max-md:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/30 to-[#fdb813]/30 rounded-3xl transform rotate-6 scale-90 blur-2xl group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-[#fce001]/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#fce001] to-[#fdb813] opacity-20 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-[#fdb813] to-[#fce001] opacity-20 rounded-full blur-xl"></div>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253700/tp-Imgs/img/About-us_ehftg2.png"
                alt="About Us"
                width={700}
                height={525}
                className="w-full h-auto lg:h-[500px] object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#1a1a1a]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-bold text-[#1a1a1a]">Trusted</span>
                </div>
                <p className="text-xs text-gray-500">By thousands of users across Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}