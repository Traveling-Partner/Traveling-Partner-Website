// components/about/PurposeSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import FeatureList from "./FeatureList";
import PurposeOfTravelingPartner from "./PurposeOfTravelingPartner";

const PurposeSection: React.FC = () => {
  return (
    <>
      <PurposeOfTravelingPartner />

      <div className="relative w-full overflow-hidden bg-[#FEFBF6]">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 45% 40% at 92% 8%, rgba(252,224,1,0.22), transparent 65%),
              radial-gradient(ellipse 40% 35% at 8% 90%, rgba(253,184,19,0.12), transparent 70%)
            `,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 sm:py-20 lg:space-y-24 lg:px-8 lg:py-24">
          {/* Feature Of The App */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
            <div className="flex w-full flex-col gap-5 lg:w-5/12 lg:min-h-0">
              <div className="shrink-0">
                <div className="mb-4 inline-flex items-center rounded-full bg-[#FCE001] px-4 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
                    Key Features
                  </span>
                </div>

                <h2 className="mb-4 font-poppins text-[32px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] lg:text-[40px]">
                  Feature Of{" "}
                  <span className="font-medium italic text-[#FDB813]">
                    The App
                  </span>
                </h2>
              </div>

              <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl shadow-xl sm:min-h-[280px]">
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253515/tp-Imgs/Taxi-stand-img/Feature_Of_The_App_l6ezv3.png"
                  alt="Features"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex w-full flex-col justify-center lg:w-7/12 lg:min-w-0">
              <FeatureList />
            </div>
          </div>

          {/* Aim Of Travel Partner */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(11,11,11,0.08)] lg:flex-row">
            <div className="flex w-full flex-col justify-center p-6 sm:p-8 lg:w-[45%] lg:p-10">
              <div className="mb-5 inline-flex w-fit items-center rounded-full bg-[#FCE001] px-4 py-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[11px]">
                  Our Goals
                </span>
              </div>

              <h2 className="mb-4 font-poppins text-[32px] font-extrabold leading-tight tracking-tight text-[#0b0b0b] lg:text-[36px]">
                Aim Of{" "}
                <span className="font-medium italic text-[#FDB813]">
                  Travel Partner
                </span>
              </h2>

              <p className="mb-6 text-base leading-relaxed text-[#5c5b55]">
                At Traveling Partner, we aim to redefine how people connect,
                collaborate, and move within Pakistan by providing,
              </p>

              <ul className="space-y-3">
                {[
                  "Commission-Free Environment",
                  "Transform the Transportation Landscape",
                  "Facilitate Collaboration and Connectivity",
                  "User-Driven Flexibility",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-semibold text-[#0b0b0b] sm:text-base"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCE001]">
                      <svg
                        className="h-3.5 w-3.5 text-[#0b0b0b]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[260px] w-full sm:min-h-[320px] lg:min-h-[380px] lg:w-[55%]">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253507/tp-Imgs/Taxi-stand-img/Aim_yxb4uo.png"
                alt="Aim"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PurposeSection;
