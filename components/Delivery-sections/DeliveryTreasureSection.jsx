// DeliveryTreasureSection.jsx
"use client";

import Image from "next/image";

const treasureContent = [
  "Hassle-Free Sending: Say goodbye to the complexities of traditional delivery services.Traveling Partner makes sending your items a breeze.",
  "Reliable Couriers: Our platform connects you with trusted couriers who will handle your treasures with care and professionalism.",
  "Cost-Effective: Traveling Partner's commission-free approach means you don't have to worry about extra charges eating into your budget.",
  "Track Your Package: Real-time tracking allows you to monitor your package's journey, providing peace of mind and transparency.",
  "Community-Centric: We foster a community of support, allowing you to connect with reliable couriers and fellow users.",
];

export default function DeliveryTreasureSection() {
  return (
    <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-[60px]">
      <div className="text-center pb-5 w-[49%] mx-auto max-md:w-[80%]">
        <h1 className="text-[50px] font-semibold text-[#1a1a1a] max-md:text-[30px]">
          Deliver your Treasure with the best Service
        </h1>
      </div>
      
      <div className="flex justify-center gap-[50px] items-center pb-[60px] max-lg:flex-col-reverse max-lg:px-4">
        <div className="w-[40%] max-lg:w-[70%] max-md:w-[90%]">
          <Image
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253516/tp-Imgs/Taxi-stand-img/Treasure_tafup9.png"
            alt="Treasure Delivery"
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded-3xl shadow-2xl"
            loading="lazy"
          />
        </div>
        <div className="w-[40%] max-lg:w-[90%]">
          <div>
            {treasureContent.map((line, index) => {
              const [beforeColon, afterColon] = line.split(":");
              return (
                <p key={index} className="text-[16px] py-[10px] text-[#1a1a1a]">
                  <strong className="font-semibold">{beforeColon}</strong>: {afterColon}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}