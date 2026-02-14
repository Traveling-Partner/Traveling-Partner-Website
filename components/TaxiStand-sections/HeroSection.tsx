"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div
      className="flex justify-evenly py-[30px] bg-cover bg-no-repeat flex-col-reverse items-center lg:flex-row lg:items-stretch"
      style={{ backgroundImage: "url('/Assist/img/image 95.png')" }}
    >
      <div className="w-full lg:w-[42%] mt-[50px] lg:mt-[80px] flex flex-col justify-center text-center lg:text-left px-5 lg:px-0">
        <h3 className="inline-block bg-gradient-to-b from-[#fce001] to-[#fdb813] px-5 py-0 text-[30px] lg:text-[50px] font-semibold uppercase text-center mx-auto lg:mx-0 font-[Poppins]">
          <span>Taxi Stand</span>
        </h3>
        <div className="mt-4">
          <h4 className="text-xl lg:text-2xl font-semibold">
            Connect and Commute Commission-Free
          </h4>
        </div>
        <p className="text-base font-[Poppins] py-5">
          Traveling Partner presents a modern platform connecting users to
          diverse taxi stands across Pakistan. Say goodbye to added fees when
          you access this hassle-free, commission-free service. Our platform
          ensures an affordable, direct connection with various taxi stands,
          allowing you to negotiate fares at your convenience and make your
          commuting experience both smooth and cost-effective.
        </p>
        <div className="flex justify-center lg:justify-start gap-4">
          <div>
            <Link
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/Assist/img/google.png"
                alt="Google-PlayStore"
                width={150}
                height={50}
                className="w-auto h-auto"
              />
            </Link>
          </div>
          <div>
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/Assist/img/iso.png"
                alt="App-Store"
                width={150}
                height={50}
                className="w-auto h-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
        <Image
          src="/Assist/Taxi-stand-img/Image (1).png"
          alt=""
          width={500}
          height={500}
          className="w-[90%] lg:w-full"
        />
      </div>
    </div>
  );
}