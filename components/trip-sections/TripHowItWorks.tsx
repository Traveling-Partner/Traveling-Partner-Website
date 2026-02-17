// TripHowItWorks.jsx
"use client";

import Image from "next/image";

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface StepCardProps {
  title: string;
  icon: string;
  description: string;
  index: number;
}

const steps: Step[] = [
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253507/tp-Imgs/Taxi-stand-img/Carpool_edmkbm.png",
    title: "Book a Ride",
    description: "Initiate your journey by booking a ride through Traveling Partner. Whether it's a family outing, a trip with friends, or a school excursion, easily connect with reliable trip drivers on our platform."
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253511/tp-Imgs/Taxi-stand-img/Track_your_cab_aixhyc.png",
    title: "Track Your Vehicle",
    description: "Enjoy peace of mind during your trip with real-time vehicle tracking. Our user-friendly app allows you to monitor your vehicle's location, ensuring transparency and security throughout the journey."
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1771314258/Arrive_safely_wp1cvl.png",
    title: "Arrive safely",
    description: "With Traveling Partner, safety is a shared responsibility. Arrive at your destination with the flexibility of self-negotiable arrangements, as our commission-free app empowers users to manage their travel experience independently."
  }
];

const StepCard = ({ title, icon, description, index }: StepCardProps) => (
  <div className="group relative w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-all duration-500 bg-white rounded-2xl border border-gray-100 overflow-hidden max-md:w-[90%] max-md:p-10 max-md:min-h-0">
    <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/5 to-[#fdb813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'bottom-0 left-0'} w-32 h-32 bg-gradient-to-br from-[#fce001]/10 to-transparent rounded-full blur-2xl transform ${index % 2 === 0 ? 'translate-x-16 -translate-y-16' : '-translate-x-16 translate-y-16'} group-hover:scale-150 transition-transform duration-700`}></div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <Image
          src={icon}
          alt={title}
          width={60}
          height={60}
          className="w-12 h-12 object-contain drop-shadow-sm"
        />
      </div>

      <span className="text-xl font-semibold text-black uppercase tracking-wide mb-2">{title}</span>
      <p className="text-base font-normal text-black leading-relaxed">{description}</p>
      <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-[#fce001] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  </div>
);

export default function TripHowItWorks() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#fce001]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fdb813]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[85%] mx-auto max-w-7xl relative z-10 max-md:w-full max-md:p-0">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">Easy Process</span>
          </div>

          <h1 className="uppercase text-[50px] font-bold text-[#1a1a1a] max-md:text-[30px] max-md:p-4">
            How its <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">work</span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4"></div>
        </div>

        <div className="w-[90%] flex justify-center gap-10 mx-auto max-md:flex-col max-md:w-[95%] max-md:gap-10">
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <StepCard {...steps[0]} index={0} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center mt-10 max-md:w-full max-md:mt-0 max-md:gap-10">
            <StepCard {...steps[1]} index={1} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <StepCard {...steps[2]} index={2} />
          </div>
        </div>
      </div>
    </div>
  );
}