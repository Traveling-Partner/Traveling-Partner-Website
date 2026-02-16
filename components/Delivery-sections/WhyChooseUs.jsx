// WhyChooseUs.jsx
"use client";

import { FaArrowRightLong } from "react-icons/fa6";

export default function WhyChooseUs() {
  return (
    <div 
      className="bg-no-repeat bg-cover bg-center py-[90px] relative"
      style={{
        backgroundImage: "url('/images/why-choose-bg.jpg')"
      }}
    >
      <div className="mx-auto w-[45%] py-[60px] px-4 backdrop-blur-[10px] bg-[rgba(118,115,115,0.5)] border-2 border-white rounded-[10px] relative max-lg:w-[96%] max-md:w-[95%] max-md:px-[10px]">
        <h3 className="text-white text-[35px] text-center font-medium max-md:text-[30px]">
          WHY CHOOSE US?
        </h3>
        <span className="text-white text-[30px] flex justify-center max-lg:text-[25px] max-md:text-center">
          We are Fast, Affordable and Reliable
        </span>
        
        <div className="flex justify-between py-5 w-[70%] mx-auto max-md:flex-col max-md:w-full max-md:px-0 max-md:pr-[10px]">
          <div className="flex gap-[10px] items-center">
            <FaArrowRightLong className="text-white text-[25px]" />
            <p className="text-white text-[16px] max-md:text-[14px]">Experienced Couriers</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <FaArrowRightLong className="text-white text-[25px]" />
            <p className="text-white text-[16px] max-md:text-[14px]">Affordable</p>
          </div>
        </div>
        
        <div className="flex justify-between py-5 w-[70%] mx-auto max-md:flex-col max-md:w-full max-md:px-0 max-md:pr-[10px]">
          <div className="flex gap-[10px] items-center">
            <FaArrowRightLong className="text-white text-[25px]" />
            <p className="text-white text-[16px] max-md:text-[14px]">Expert Customer Service</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <FaArrowRightLong className="text-white text-[25px]" />
            <p className="text-white text-[16px] max-md:text-[14px]">Save Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}