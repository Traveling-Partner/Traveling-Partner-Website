// components/about/ChooseUsSection.tsx
import React from "react";
import Image from "next/image";

interface ChooseUsCardProps {
  image: string;
  title: string;
  description: string;
  alt: string;
}

const ChooseUsCard: React.FC<ChooseUsCardProps> = ({
  image,
  title,
  description,
  alt,
}) => (
  <div className="text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] w-full px-2.5 py-10 min-h-[300px] flex flex-col justify-center items-center">
    <Image
      src={image}
      alt={alt}
      width={60}
      height={60}
      className="w-[14%] min-w-[60px]"
      loading="lazy"
    />
    <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
    <p className="text-base px-2">{description}</p>
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
    <div className="py-[60px]">
      <div className="text-center py-10">
        <h1 className="uppercase text-[35px] lg:text-[50px] font-semibold">
          Reasons Why Choose Us
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row w-[90%] lg:w-[75%] mx-auto gap-10 justify-center items-center lg:items-start">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-full lg:w-[30%] flex flex-col gap-5 items-center ${
              index === 1 ? "lg:mt-[60px]" : ""
            }`}
          >
            <ChooseUsCard
              image={card.image}
              title={card.title}
              description={card.description}
              alt={card.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseUsSection;