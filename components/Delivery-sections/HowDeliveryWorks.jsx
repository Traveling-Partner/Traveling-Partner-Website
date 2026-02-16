// HowDeliveryWorks.jsx
"use client";

import Image from "next/image";

const textArray = [
  "Download the app",
  <span key="details" className="text-[20px] text-black">
    Provide delivery details{" "}
    <span className="text-[16px] text-[#747474] ml-[10px]">
      (date, time, stuff, pickup location, drop off location, Contact no.)
    </span>
  </span>,
  <span key="rider" className="text-[20px] text-black">
    Choose rider{" "}
    <span className="text-[16px] text-[#747474]">
      ( Male or Female)
    </span>
  </span>,
  "Confirm rider",
  "Driver will reach to your pickup location in the given time.s",
];

export default function HowDeliveryWorks() {
  return (
    <div className="flex items-center py-[70px] max-lg:flex-col max-lg:px-4">
      <div className="w-1/2 flex justify-center max-lg:w-full">
        <Image
          src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253508/tp-Imgs/Taxi-stand-img/home-page-b-img_l1ekvj.png"
          alt="How Delivery Works"
          width={500}
          height={400}
          className="w-[70%] h-auto max-lg:w-[80%]"
          loading="lazy"
        />
      </div>
      <div className="w-1/2 max-lg:w-full">
        <div className="w-full pt-0 max-lg:px-[15px]">
          <h3 className="text-[50px] ml-5 font-semibold text-[#1a1a1a] max-lg:text-[30px] max-md:ml-0">
            How Delivery works
          </h3>
          <div className="m-5">
            <ul className="list-none p-0 w-full">
              {textArray.map((text, index) => (
                <li key={index} className="mb-[10px] flex items-start gap-[10px]">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                  <span className="text-[20px] text-black">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}