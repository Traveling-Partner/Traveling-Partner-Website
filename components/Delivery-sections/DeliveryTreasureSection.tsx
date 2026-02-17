"use client";

import Image from "next/image";

const treasureContent = [
  {
    title: "Hassle-Free Sending",
    description:
      "Say goodbye to the complexities of traditional delivery services. Traveling Partner makes sending your items a breeze.",
  },
  {
    title: "Reliable Couriers",
    description:
      "Our platform connects you with trusted couriers who will handle your treasures with care and professionalism.",
  },
  {
    title: "Cost-Effective",
    description:
      "Traveling Partner's commission-free approach means you don't have to worry about extra charges eating into your budget.",
  },
  {
    title: "Track Your Package",
    description:
      "Real-time tracking allows you to monitor your package's journey, providing peace of mind and transparency.",
  },
  {
    title: "Community-Centric",
    description:
      "We foster a community of support, allowing you to connect with reliable couriers and fellow users.",
  },
];

export default function DeliveryTreasureSection() {
  return (
    <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-20 lg:py-28 px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white text-sm font-bold uppercase tracking-wider">
              Delivery Service
            </span>
          </div>
          <h2 className="text-[#1a1a1a] text-4xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight mb-3">
            Deliver your{" "}
            <span className="text-white drop-shadow-md">Treasure</span>
          </h2>
          <p className="text-[#1a1a1a]/80 text-lg lg:text-xl font-medium uppercase tracking-widest">
            With the Best Service
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-0.5 bg-[#1a1a1a]/20 rounded-full"></div>
            <div className="w-2 h-2 bg-[#1a1a1a] rounded-full rotate-45"></div>
            <div className="w-16 h-0.5 bg-[#1a1a1a]/20 rounded-full"></div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
          {/* Image */}
          <div className="w-full lg:w-[45%] relative group">
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl transform scale-95 group-hover:scale-100 transition-transform duration-500"></div>
            <Image
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253516/tp-Imgs/Taxi-stand-img/Treasure_tafup9.png"
              alt="Treasure Delivery"
              width={600}
              height={400}
              className="w-full h-auto lg:h-[400px] object-cover rounded-3xl shadow-2xl relative z-10"
              loading="lazy"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 z-20 border border-gray-100 transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#1a1a1a]">Safe</div>
                  <div className="text-sm text-gray-500 font-medium">
                    Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="w-full lg:w-[45%] space-y-4">
            {treasureContent.map((item, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-l-4 border-transparent hover:border-[#fce001]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0 w-8 h-8 mt-0.5">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[#1a1a1a] text-base font-bold uppercase tracking-wide mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#000000] group-hover:to-[#000000] transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
