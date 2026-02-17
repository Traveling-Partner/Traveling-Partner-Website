"use client";

import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

const logisticsBenefits = [
  {
    title: "Commission-Free Logistics",
    description:
      "Enjoy a commission-free model that empowers users with cost-effective and transparent logistics solutions.",
  },
  {
    title: "Direct Connections",
    description:
      "Facilitate seamless collaborations for transporting goods, ensuring a direct and reliable logistics experience.",
  },
  {
    title: "Shared Vehicle Option",
    description:
      "Opt for shared vehicle logistics, allowing users to share transportation space for more sustainable and economical shipping.",
  },
  {
    title: "Flexible Negotiations",
    description:
      "Benefit from a user-centric approach that allows for personalized negotiations, ensuring a fair and tailored logistics experience.",
  },
  {
    title: "Real-Time Shipment Tracking",
    description:
      "Experience the convenience of real-time tracking for your shipments, providing visibility and control throughout the transportation process.",
  },
  {
    title: "Community Collaboration",
    description:
      "Join a community-centric platform that fosters collaboration between users and logistics service providers.",
  },
];

export default function LogisticsBenefitsSection() {
  return (
    <div className="py-20 lg:py-32 w-full bg-gradient-to-br from-[#fce001] to-[#fdb813] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[90%] mx-auto max-w-7xl relative z-10 max-md:w-[96%]">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white px-4 py-2 rounded-full mb-6">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Key Advantages
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] uppercase tracking-tight mb-6 max-md:text-3xl max-md:text-left">
            Logistics{" "}
            <span className="text-white drop-shadow-md">Benefits</span>
          </h2>

          <p className="text-center text-lg text-[#1a1a1a]/80 max-w-3xl mx-auto leading-relaxed max-md:text-left max-md:text-base">
            Experience the future of logistics with our commission-free platform
            designed for modern transportation needs.
          </p>
        </div>

        {/* First Block - Logistics Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <svg
                  className="w-7 h-7 text-[#1a1a1a]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-sm drop-shadow-md">
                Benefits 01
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight max-md:text-2xl">
              Key Logistics Benefits
            </h3>

            <div className="space-y-4 pt-2">
              {logisticsBenefits.map((benefit, index) => (
                <div key={index} className="group flex items-start gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <FaCheck className="w-4 h-4 text-[#1a1a1a]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1a1a1a]">
                      {benefit.title}:
                    </span>{" "}
                    <span className="text-[#1a1a1a]/80">
                      {benefit.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <div className="absolute inset-0 bg-white/30 rounded-3xl transform rotate-3 scale-95 blur-xl group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fce001] opacity-20 rounded-full blur-2xl"></div>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314286/image-54_pst7as.png"
                alt="Logistics Benefits"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <span className="text-lg font-black text-[#1a1a1a]">6+</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">
                    Benefits
                  </div>
                  <div className="text-xs text-gray-500">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Block - Fast and Safe */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/30 rounded-3xl transform -rotate-3 scale-95 blur-xl group-hover:-rotate-6 transition-transform duration-500"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-2 border-white/50 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fdb813] opacity-20 rounded-full blur-2xl"></div>
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314284/image_55_rmh9l8.png"
                alt="Fast and Safe Logistics"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#1a1a1a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">24/7</div>
                  <div className="text-xs text-gray-500">Service</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                <svg
                  className="w-7 h-7 text-[#1a1a1a]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-white font-bold uppercase tracking-wider text-sm drop-shadow-md">
                Benefits 02
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight max-md:text-2xl">
              Faster Than You Think Safer Than You Expect!
            </h3>

            <p className="text-[#1a1a1a]/80 text-lg leading-relaxed max-md:text-base">
              Our courier, packing and moving services support your goods or
              documents reach at different locations worldwide. Reliable and
              safe transportation of products allow for online shopping and
              delivery to customers doors.
            </p>

            <div className="bg-white/20 rounded-2xl p-6 border border-white/30">
              <h4 className="font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#1a1a1a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Service Highlights
              </h4>
              <ul className="space-y-2 text-[#1a1a1a]/80">
                {/* <li className="flex items-start gap-2"><span className="text-[#1a1a1a] mt-1">•</span>Worldwide delivery coverage</li> */}
                <li className="flex items-start gap-2">
                  <span className="text-[#1a1a1a] mt-1">•</span>Reliable and
                  safe transportation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1a1a1a] mt-1">•</span>Door-to-door
                  delivery service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
