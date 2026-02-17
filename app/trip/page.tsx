// app/trip/page.jsx or components/Trip.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Trip() {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="flex justify-evenly py-[30px] px-0 bg-cover bg-center bg-no-repeat max-md:flex-col-reverse max-md:px-5"
        style={{
          backgroundImage: "url('/images/image-95.png')"
        }}
      >
        <div className="w-[42%] mt-20 max-md:w-full max-md:mt-[50px] max-md:text-center">
          <h3 className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-[10px] text-[50px] font-semibold uppercase font-poppins text-center inline-block max-md:text-[40px] max-md:w-[40%] max-md:mx-auto">
            Trip
          </h3>
          <h4 className="text-[20px] font-medium pt-[10px]">
            Organize Trips with No Added Commissions
          </h4>
          <p className="text-[16px] font-poppins py-5">
            Experience stress-free trip planning for family, friends, or school outings with Traveling
            Partner. Our platform, known for its commission-free and self-negotiation nature,
            eliminates the hassle of navigating multiple locations or dealing with different trip drivers
            and prices. With just a few clicks, users can efficiently select their trip driver, ensuring a
            seamless and time-saving trip planning experience. Trust Traveling Partner for a
            community-driven approach to convenient trip coordination.
          </p>

          <div className="flex gap-5 py-5 max-md:justify-center">
            <Link href="https://play.google.com/store/apps?hl=en&gl=US" target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png" 
                alt="Google-PlayStore" 
                width={150} 
                height={45}
                className="w-full h-auto"
              />
            </Link>
            <Link href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png" 
                alt="App-Store" 
                width={150} 
                height={45}
                className="w-full h-auto"
              />
            </Link>
          </div>
        </div>

        <div className="w-[40%] flex justify-end max-md:w-full">
          <Image 
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314326/trip-circle-img_s0edm7.png" 
            alt="Trip Circle" 
            width={600} 
            height={500}
            className="w-[90%] max-md:w-full"
          />
        </div>
      </div>

      {/* Enjoy your weekend with Travel partner */}
      <div className="flex justify-evenly bg-gradient-to-b from-[#fce001] to-[#fdb813] w-full py-[50px] max-md:flex-col-reverse">
        <div className="w-[40%] flex flex-col justify-center max-md:w-full max-md:p-3">
          <h2 className="text-[50px] font-semibold max-md:text-[30px]">
            Enjoy your weekend with Travel partner
          </h2>
          <p className="text-[16px] w-[88%]">
            Go on a long trip with your friends and family Get a Taxi That is Just
            Made for Road Trips Freedom from Car Servicing Hassles Optimize Travelling Time
          </p>
        </div>
        <div className="w-[40%] max-md:w-[96%] max-md:flex max-md:mx-auto">
          <Image 
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314285/image_81_1_sqeawd.png" 
            alt="Enjoy Weekend" 
            width={600} 
            height={400}
            className="w-full"
          />
        </div>
      </div>

      {/* Reliable, Safe, Transparent */}
      <div 
        className="w-full h-[686px] flex flex-col items-center justify-center px-5 bg-cover bg-center bg-no-repeat max-md:h-[270px]"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/duubabjk7/image/upload/v1771314285/image_86_vhkebd.png')"
        }}
      >
        <h2 className="text-[50px] font-semibold text-white text-center m-0 uppercase max-md:text-[35px]">
          Reliable, Safe, Transparent
        </h2>
        <p className="text-[25px] text-white text-center m-0 uppercase max-md:text-[16px]">
          Your trusted ride for every occasion!
        </p>
        <div className="flex justify-around w-full max-w-[400px] mt-5 gap-2.5">
          <Link href="https://play.google.com/store/apps?hl=en&gl=US" target="_blank" rel="noopener noreferrer">
            <Image 
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png" 
              alt="Google-PlayStore" 
              width={250} 
              height={75}
              className="w-full max-w-[250px] h-auto"
            />
          </Link>
          <Link href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Image 
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png" 
              alt="App-Store" 
              width={250} 
              height={75}
              className="w-full max-w-[250px] h-auto"
            />
          </Link>
        </div>
      </div>

      {/* Best Things Of Travel partner - How its work */}
      <div className="py-[60px] pb-[60px] max-md:py-0">
        <div className="text-center py-10">
          <h1 className="uppercase text-[50px] font-semibold max-md:text-[30px]">
            How its work
          </h1>
        </div>
        <div className="flex w-[75%] mx-auto gap-[30px] justify-center max-md:flex-col max-md:w-full max-md:items-center">
          <div className="w-[30%] flex flex-col gap-5 items-center max-md:w-[90%]">
            <div className="text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] w-full px-2.5 py-5 min-h-[300px] flex flex-col items-center justify-center">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253507/tp-Imgs/Taxi-stand-img/Carpool_edmkbm.png" 
                alt="Book a Ride" 
                width={50} 
                height={50}
                className="w-[10%]"
              />
              <h3 className="text-xl font-semibold mt-4">Book a Ride</h3>
              <p className="text-sm mt-2">
                Initiate your journey by booking a ride through Traveling Partner. Whether it's a family
                outing, a trip with friends, or a school excursion, easily connect with reliable trip drivers
                on our platform.
              </p>
            </div>
          </div>
          <div className="w-[30%] flex flex-col gap-5 items-center mt-[60px] max-md:w-[90%] max-md:mt-0">
            <div className="text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] w-full px-2.5 py-5 min-h-[300px] flex flex-col items-center justify-center">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253511/tp-Imgs/Taxi-stand-img/Track_your_cab_aixhyc.png" 
                alt="Track Your Vehicle" 
                width={50} 
                height={50}
                className="w-[10%]"
              />
              <h3 className="text-xl font-semibold mt-4">Track Your Vehicle</h3>
              <p className="text-sm mt-2">
                Enjoy peace of mind during your trip with real-time vehicle tracking. Our user-friendly
                app allows you to monitor your vehicle's location, ensuring transparency and security
                throughout the journey.
              </p>
            </div>
          </div>
          <div className="w-[30%] flex flex-col gap-5 items-center max-md:w-[90%]">
            <div className="text-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] w-full px-2.5 py-5 min-h-[300px] flex flex-col items-center justify-center">
              <Image 
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1771314258/Arrive_safely_wp1cvl.png" 
                alt="Arrive safely" 
                width={50} 
                height={50}
                className="w-[10%]"
              />
              <h3 className="text-xl font-semibold mt-4">Arrive safely</h3>
              <p className="text-sm mt-2">
                With Traveling Partner, safety is a shared responsibility. Arrive at your destination with
                the flexibility of self-negotiable arrangements, as our commission-free app empowers
                users to manage their travel experience independently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}