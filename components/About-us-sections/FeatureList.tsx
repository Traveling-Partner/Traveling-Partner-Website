// components/about/FeatureList.tsx
import React from "react";

interface FeatureItem {
  title: string;
  description: string;
}

const FeatureList: React.FC = () => {
  const content: FeatureItem[] = [
    {
      title: "Empowering Connections",
      description:
        "Join a community where passengers, drivers, couriers, and travelers collaborate without extra fees.",
    },
    {
      title: "Revolutionizing Mobility",
      description:
        "Experience a commission-free environment for taxis, shared rides, deliveries, logistics, and trip planning.",
    },
    {
      title: "Community-Driven Collaboration",
      description:
        "Be part of a platform connecting users with taxi stands, ride pools, couriers, logistics services, and trip planners, all in a community-centric, commission-free setting.",
    },
    {
      title: "Transparent & Empowering",
      description:
        "Benefit from transparent transactions, allowing users to negotiate and manage their dealings independently for a personalized and flexible experience.",
    },
    {
      title: "Revamp Your Mobility Experience",
      description:
        "Explore a fresh, commission-free approach to mobility, prioritizing user-driven interactions, convenience, collaboration, and empowerment.",
    },
    {
      title: "Accessible Nationwide",
      description:
        "This app is accessible anywhere in Pakistan where internet services are available.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {content.map((item, index) => (
        <div 
          key={index} 
          className="group flex items-start gap-4 p-4 rounded-xl bg-white  transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
            <span className="text-[#1a1a1a] font-bold text-sm">{index + 1}</span>
          </div>
          <div>
            <h4 className="text-base font-bold text-[#1a1a1a] mb-1  transition-colors">
              {item.title}
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;