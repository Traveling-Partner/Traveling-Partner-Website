"use client";

import Image from "next/image";

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServiceCardProps {
  title: string;
  icon: string;
  description: string;
  index: number;
}

const services: Service[] = [
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1771314257/Booking_yu0dwo.png",
    title: "simple booking",
    description: "Empower yourself with easy and user-friendly booking procedures.",
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253811/tp-Imgs/img/Categories_4_fgj7t1.png",
    title: "on time pickup",
    description: "Optimize your logistics operations independently, saving both time and money.",
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1771314313/Map_Marker_yjd9ga.png",
    title: "Fast Shipments",
    description: "Lorem ipsum dolor sit amet,to the consectetur adipiscing elit. Lacus, faucibus amet",
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253504/tp-Imgs/Taxi-stand-img/Local_Delivery_Time_hly4lo.png",
    title: "On-Time Delivery",
    description: "Lorem ipsum dolor sit amet,to the consectetur adipiscing elit. Lacus, faucibus amet",
  },
  {
    icon: "https://res.cloudinary.com/duubabjk7/image/upload/v1771314269/Euro_Money_x2dby9.png",
    title: "Save Time & Money",
    description: "Optimize your logistics operations independently, saving both time and money.",
  },
];

const ServiceCard = ({ title, icon, description, index }: ServiceCardProps) => (
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

export default function LogisticsServices() {
  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#fce001]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fdb813]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[85%] mx-auto max-w-7xl relative z-10 max-md:w-full max-md:p-0">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">What We Offer</span>
          </div>

          <h1 className="uppercase text-[50px] font-bold text-[#1a1a1a] max-md:text-[30px] max-md:p-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Services</span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4"></div>
        </div>

        <div className="w-[90%] flex justify-center gap-10 mx-auto max-md:flex-col max-md:w-[95%] max-md:gap-10">
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <ServiceCard {...services[0]} index={0} />
            <ServiceCard {...services[1]} index={1} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center mt-10 max-md:w-full max-md:mt-0 max-md:gap-10">
            <ServiceCard {...services[2]} index={2} />
            <ServiceCard {...services[3]} index={3} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <ServiceCard {...services[4]} index={4} />
            {/* Empty div to maintain layout balance since we only have 5 services */}
            <div className="min-h-[300px] max-md:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}