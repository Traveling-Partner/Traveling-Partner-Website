// components/about/ChooseUsSection.tsx
import React from "react";
import Image from "next/image";

interface ChooseUsCardProps {
  image: string;
  title: string;
  description: string;
  alt: string;
  index: number;
}

const ChooseUsCard: React.FC<ChooseUsCardProps> = ({
  image,
  title,
  description,
  alt,
  index,
}) => (
  <div className="group relative w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-all duration-500 bg-white rounded-2xl border border-gray-100 overflow-hidden max-md:w-[90%] max-md:p-10 max-md:min-h-0">
    {/* Background gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#fce001]/5 to-[#fdb813]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Decorative blur circle */}
    <div
      className={`absolute ${index % 2 === 0 ? "top-0 right-0" : "bottom-0 left-0"} w-32 h-32 bg-gradient-to-br from-[#fce001]/10 to-transparent rounded-full blur-2xl transform ${index % 2 === 0 ? "translate-x-16 -translate-y-16" : "-translate-x-16 translate-y-16"} group-hover:scale-150 transition-transform duration-700`}
    ></div>

    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Image container with yellow background */}
      <div className="w-20 h-20 rounded-2xl  flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <Image
          src={image}
          alt={alt}
          width={60}
          height={60}
          className="w-12 h-12 object-contain drop-shadow-sm"
        />
      </div>

      <h3 className="text-xl font-semibold text-black uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className="text-base font-normal text-black leading-relaxed">
        {description}
      </p>

      {/* Animated underline */}
      <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-[#fce001] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </div>
  </div>
);

const ChooseUsSection: React.FC = () => {
  const cards = [
    {
      image:
        "https://res.cloudinary.com/duubabjk7/image/upload/v1715253500/tp-Imgs/Taxi-stand-img/Choose_Us_uvxyyg.png",
      title: "Community-Centric Approach",
      description:
        "Join a community of collaborative users. Traveling Partner isn't just an app; it's a platform that connects individuals for various services, creating a community-centric environment where everyone can contribute and benefit.",
      alt: "Community-Centric",
    },
    {
      image:
        "https://res.cloudinary.com/duubabjk7/image/upload/v1715253505/tp-Imgs/Taxi-stand-img/Choose_Us_2_dd1crd.png",
      title: "Commission-Free Transactions",
      description:
        "Enjoy the freedom of cost-effective transactions. Traveling Partner operates on a commission-free model, allowing users to save more while connecting for rides, deliveries, and logistics",
      alt: "Commission-Free",
    },
    {
      image:
        "https://res.cloudinary.com/duubabjk7/image/upload/v1715253514/tp-Imgs/Taxi-stand-img/Choose_Us_3_e4l6ia.png",
      title: "User Empowerment",
      description:
        "We believe in empowering users. With Traveling Partner, you have the autonomy to negotiate and decide on fares, fostering a flexible and personalized experience tailored to your preferences",
      alt: "User Empowerment",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#fce001]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fdb813]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-[85%] mx-auto max-w-7xl relative z-10 max-md:w-full max-md:p-0">
        {/* Header section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-6">
            <svg
              className="w-4 h-4 text-[#fdb813]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>

          <h1 className="uppercase text-[50px] font-bold text-[#1a1a1a] max-md:text-[30px] max-md:p-4">
            Reasons Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">
              Choose Us
            </span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mt-4"></div>
        </div>

        {/* Cards grid - 3 columns with middle one offset */}
        <div className="w-[90%] flex justify-center gap-10 mx-auto max-md:flex-col max-md:w-[95%] max-md:gap-10">
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <ChooseUsCard {...cards[0]} index={0} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center mt-10 max-md:w-full max-md:mt-0 max-md:gap-10">
            <ChooseUsCard {...cards[1]} index={1} />
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <ChooseUsCard {...cards[2]} index={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUsSection;
