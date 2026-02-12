// app/page.tsx (Updated Home Component)
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiContactsFill } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa6";
import CarAnimation from "../components/CarAnimation";
import VideoPlayer from "../components/VideoPlayer";
import BlogSlider from "../components/BlogSlider";
import ContactUsForm from "../components/ContactUsForm";

export default function Home(): React.ReactElement {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="flex justify-around items-center py-8 bg-cover bg-no-repeat max-md:flex-col max-md:flex-col-reverse max-md:px-2.5 max-md:py-0"
        style={{
          backgroundImage: "url('/images/image-95.png')",
        }}
      >
        <div className="py-0 max-md:py-5 max-md:text-center">
          <div className="flex justify-center max-md:justify-center">
            <CarAnimation />
          </div>
          <p className="text-[30px] font-medium leading-[26px] max-md:text-[25px]">
            GET TO YOUR{" "}
            <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] bg-clip-text text-transparent">
              DESTINATION
            </span>
          </p>
          <h2 className="text-[60px] uppercase leading-[68px] max-md:text-[20px] max-md:leading-normal">
            safe & secured
          </h2>
          <h3 className="text-[30px] uppercase font-semibold max-md:text-[20px]">
            With{" "}
            <span className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-2.5">
              TRAVELPARTNER
            </span>
          </h3>

          <div className="flex gap-5 py-5 max-md:justify-between">
            <div className="w-full">
              <a
                href="https://play.google.com/store/apps?hl=en&gl=US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png"
                  alt="Google-PlayStore"
                  width={200}
                  height={60}
                  className="w-full h-auto"
                  // loading="lazy"
                />
                <br />
              </a>
            </div>
            <div className="w-full">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png"
                  alt="App-Store"
                  width={200}
                  height={60}
                  className="w-full h-auto"
                  // loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-full w-[40%] flex justify-end max-md:w-full max-md:p-[30px] max-md:justify-center">
          <Image
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253703/tp-Imgs/img/circle-img_ttqdsj.png"
            alt="Hero Circle"
            width={600}
            height={600}
            className="w-[90%] h-auto"
            // loading="lazy"
            priority
          />
        </div>
      </div>

      {/* Register As A Driver section */}
      <div className="flex items-center justify-around bg-gradient-to-b from-[#fce001] to-[#fdb813] max-md:flex-col max-md:p-5">
        <div className="w-1/2 flex justify-center max-md:w-full">
          <Image
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253508/tp-Imgs/Taxi-stand-img/home-page-b-img_l1ekvj.png"
            alt="Mobile-img"
            width={600}
            height={600}
            className="w-full h-auto max-md:mb-[-2px] max-md:ml-[-1px]"
            // loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-8 w-1/4 cursor-pointer max-md:w-full max-md:flex-row max-md:justify-center max-md:pb-[35px]">
          <div className="w-full">
            <a
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-[90%] h-[140px] bg-black text-white border-none text-xl uppercase px-2.5 py-2.5 shadow-[rgba(0,0,0,0.3)_13px_15px_8px] cursor-pointer flex flex-col items-center justify-center gap-2 hover:shadow-[rgba(0,0,0,0.4)_15px_17px_10px] transition-shadow max-md:w-full max-md:h-fit max-md:text-[14px]">
                <RiContactsFill className="text-white text-3xl" />
                <p>Register As A Driver</p>
              </button>
            </a>
          </div>
          <div className="w-full">
            <a
              href="https://play.google.com/store/apps?hl=en&gl=US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-[90%] h-[140px] bg-black text-white border-none text-xl uppercase px-2.5 py-2.5 shadow-[rgba(0,0,0,0.3)_13px_15px_8px] cursor-pointer flex flex-col items-center justify-center gap-2 hover:shadow-[rgba(0,0,0,0.4)_15px_17px_10px] transition-shadow max-md:w-full max-md:h-fit max-md:text-[14px]">
                <FaRegHandshake className="text-white text-3xl" />
                <p>Register As A Partner</p>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="w-[85%] mx-auto text-center py-[70px] max-md:w-full max-md:p-0">
        <h1 className="uppercase text-[50px] py-10 max-md:text-[30px] max-md:p-10">
          Featured Categories
        </h1>

        <div className="w-[90%] flex justify-center gap-10 mx-auto max-md:flex-col max-md:w-[95%] max-md:gap-10">
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253507/tp-Imgs/Taxi-stand-img/Carpool_edmkbm.png"
                alt="Taxi Stand"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">
                  Taxi stand
                </span>
                <p className="text-base font-normal text-black">
                  Traveling Partner links you directly to multiple taxi stands
                  effortlessly. Experience commission-free rides and negotiate
                  fares at your convenience for smooth, cost-effective commuting
                  without extra fees.
                </p>
              </div>
            </div>
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/Categories_3_e7lefn.png"
                alt="Logistic"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">
                  Logistic
                </span>
                <p className="text-base font-normal text-black">
                  Our innovative logistics service lets you connect directly
                  with transport providers, optimize routes, and share the costs
                  – because smart logistics make happy journeys. Ditch the
                  commission fees, not your efficiency!
                </p>
              </div>
            </div>
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center mt-10 max-md:w-full max-md:mt-0 max-md:gap-10">
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253700/tp-Imgs/img/Categories_5_mgiqwl.png"
                alt="Pool Ride"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">
                  Pool Ride
                </span>
                <p className="text-base font-normal text-black">
                  Enjoy the joys of shared rides without the burden of extra
                  costs. Traveling Partner connects you with fellow travelers
                  heading your way and If you not found any plan your own
                  one.Save money and enjoy the ride at no additional commission
                  fees.
                </p>
              </div>
            </div>
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253699/tp-Imgs/img/Categories_1_yt05mw.png"
                alt="Tracking"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">
                  Tracking
                </span>
                <p className="text-base font-normal text-black">
                  Keep tabs on your rides, deliveries, and logistics in
                  real-time with Traveling Partner's commission-free tracking
                  feature.Tracking operates based on mutual user agreement,
                  ensuring privacy and a hassle-free experience.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[30%] flex flex-col gap-10 items-center max-md:w-full max-md:gap-10">
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253811/tp-Imgs/img/Categories_4_fgj7t1.png"
                alt="Delivery"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">
                  Delivery
                </span>
                <p className="text-base font-normal text-black">
                  Connecting users directly with reliable delivery services for
                  efficient item transfers at a fraction of the cost. Birthday
                  cake or business documents, we've got you covered,
                  commission-free!
                </p>
              </div>
            </div>
            <div className="w-full p-5 justify-center shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] min-h-[300px] flex flex-col items-center hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.3)] transition-shadow max-md:w-[90%] max-md:p-10 max-md:min-h-0">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253811/tp-Imgs/img/Categories_2_nfy9aq.png"
                alt="Trip"
                width={60}
                height={60}
                className="w-[14%] h-auto max-md:w-[10%]"
                // loading="lazy"
              />
              <div className="flex flex-col text-center">
                <span className="text-xl font-semibold text-black">Trip</span>
                <p className="text-base font-normal text-black">
                  Family outing or epic road trip? Traveling Partner has your
                  back. Connect with drivers, customize your travel plan, and
                  enjoy hassle-free trip planning. No commission blues, just
                  pure travel joy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video section */}
      <div>
        <div className="text-center">
          <h1 className="uppercase text-[50px] py-10 max-md:text-[30px] max-md:px-2.5">
            how to register as a driver
          </h1>
        </div>
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <VideoPlayer
            videoSrc="https://res.cloudinary.com/dabxnoxsx/video/upload/v1708419720/Driver_Registration_fy4in8.mp4"
            posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239883/How_to_register_as_a_Driver_a01zuj.png"
          />
        </Suspense>
      </div>

      {/* About-us */}
      <div className="w-[90%] mx-auto flex justify-evenly text-center py-20 max-md:flex-col max-md:p-0 max-md:px-2.5">
        <div className="text-start w-[45%] max-md:w-full max-md:pb-[60px]">
          <h1 className="uppercase text-[50px] font-semibold py-2.5 px-5 max-md:text-[30px] max-md:font-bold max-md:p-5 max-md:text-center">
            About us
          </h1>
          <div className="hidden max-md:flex max-md:justify-center max-md:w-full max-md:p-4">
            <Image
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253700/tp-Imgs/img/About-us_ehftg2.png"
              alt="About Us"
              width={400}
              height={300}
              className="w-[70%] h-auto"
              // loading="lazy"
            />
          </div>
          <p className="text-base p-5 max-md:p-0">
            At Traveling Partner, our purpose is to revolutionize the landscape
            of mobility, creating a space where users can effortlessly connect
            and collaborate. By fostering a community-centric environment, our
            platform eliminates the financial burdens of additional fees,
            providing a dynamic hub for individuals to share rides, make
            deliveries, and plan trips collaboratively. <br />
            <br />
            Through transparency, user empowerment, and a commitment to a
            commission-free approach, we aim to redefine the very essence of
            travel and connectivity in Pakistan. Traveling Partner is not just
            an app; it's a movement towards a more connected, collaborative, and
            commission-free future for everyone.
          </p>
          <div className="mt-[-16px] ml-5 max-md:mt-0 max-md:flex max-md:justify-center">
            <Link
              href="/about-us"
              className="no-underline text-black bg-gradient-to-b from-[#fce001] to-[#fdb813] px-12 py-4 mt-12 inline-block text-base hover:shadow-lg transition-shadow"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="w-[45%] max-md:hidden">
          <Image
            src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253700/tp-Imgs/img/About-us_ehftg2.png"
            alt="About Us"
            width={600}
            height={400}
            className="w-full h-auto"
            // loading="lazy"
          />
        </div>
      </div>

      <div>
        <div className="text-center">
          <h1 className="uppercase text-[50px] py-10 max-md:text-[30px]">
            How to register as a Partner
          </h1>
        </div>
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <VideoPlayer
            videoSrc="https://res.cloudinary.com/dabxnoxsx/video/upload/v1708419830/Partner_Registration_q0k1fc.mp4"
            posterSrc="https://res.cloudinary.com/dabxnoxsx/image/upload/v1710239860/video-sing_yzrcqg.png"
          />
        </Suspense>
      </div>

      {/* Our Blog And News */}
      <div className="w-full pb-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] max-md:pb-5">
        <div className="flex flex-col items-center text-center">
          <h1 className="uppercase text-[50px] font-semibold pt-10 max-md:text-[30px]">
            Our Blog And News
          </h1>
          <p className="text-base pb-10 max-md:px-8">
            Explore travel tales, tips, and updates from our community. Get
            inspired and join the journey today!
            <br /> From breathtaking landscapes to hidden gems, let's make
            memories together.
          </p>
        </div>

        <div className="flex justify-center">
          <Suspense
            fallback={<div className="text-center p-4">Loading...</div>}
          >
            <BlogSlider />
          </Suspense>
        </div>
      </div>

      {/* Safety & Security Services */}
      <div className="py-[50px] w-[90%] mx-auto max-md:p-10 max-md:w-[96%]">
        <h1 className="text-[50px] font-semibold text-center uppercase max-md:text-[30px] max-md:text-left">
          Safety & Security Services
        </h1>
        <p className="text-center text-base pb-9 max-md:text-left">
          At Traveling Partner, we prioritize your safety, providing essential
          security features to enhance your peace of mind throughout your
          journey.
          <br /> enhance your peace of mind throughout your journey.
        </p>

        {/* Safe and Secure Section */}
        <div className="flex justify-between items-center w-full pb-16 max-md:flex-col max-md:p-0">
          <div className="w-[40%] max-md:w-full max-md:block">
            <h1 className="text-start text-[35px] font-semibold px-5 max-md:text-center max-md:p-0">
              Safe and Secure
            </h1>
            <div className="hidden max-md:block max-md:w-full">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253727/tp-Imgs/img/Female_Driver_haf5qp.png"
                alt="Female Driver"
                width={550}
                height={400}
                className="w-full h-auto"
                // loading="lazy"
              />
            </div>
            <p className="text-start text-base px-5 py-2.5 max-md:p-0">
              Experience a journey in a safe and secure environment with
              Traveling Partner. Our commitment to your well-being is reflected
              in our comprehensive safety measures. From real-time tracking to
              transparent communications, we ensure that your safety is at the
              forefront of every ride, delivery, trip or logistic service.
            </p>
            <div className="py-2.5 px-5 max-md:hidden">
              <Link
                href="/about-us"
                className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-2.5 no-underline text-black hover:shadow-md transition-shadow"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="w-1/2 max-md:hidden">
            <Image
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253813/tp-Imgs/img/safe1_j0ej4m.png"
              alt="Safe and Secure"
              width={600}
              height={400}
              className="w-full h-auto"
              // loading="lazy"
            />
          </div>
          <div className="hidden max-md:flex max-md:w-full max-md:py-4">
            <Link
              href="/about-us"
              className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-2.5 no-underline text-black"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Female Driver Section */}
        <div className="flex justify-between items-center w-full pb-16 max-md:flex-col max-md:pb-0">
          <div className="w-1/2 max-md:hidden">
            <Image
              src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253727/tp-Imgs/img/Female_Driver_haf5qp.png"
              alt="Female Driver"
              width={600}
              height={400}
              className="w-full h-auto"
              // loading="lazy"
            />
          </div>

          <div className="w-[40%] max-md:w-full max-md:block max-md:py-10">
            <h1 className="text-start text-[35px] font-semibold px-5 max-md:text-center max-md:p-0">
              Female Driver
            </h1>
            <div className="hidden max-md:block max-md:w-full">
              <Image
                src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253813/tp-Imgs/img/safe1_j0ej4m.png"
                alt="Safe and Secure"
                width={550}
                height={400}
                className="w-full h-auto"
                // loading="lazy"
              />
            </div>
            <p className="text-start text-base px-5 py-2.5 max-md:p-0">
              At Traveling Partner, we prioritize your security, offering a
              unique feature that adds an extra layer of protection, our
              Female-Only Option. This security-focused feature is designed for
              both female drivers and passengers, providing a reassuring
              environment for everyone. For female drivers, the Female-Only
              Option allows them to choose rides exclusively with female
              passengers, enhancing their comfort and confidence during each
              journey. Similarly, female passengers can opt for pooling with
              female partners and rides driven by female drivers, ensuring a
              secure and tailored travel experience.
            </p>
            <div className="py-2.5 px-5 max-md:hidden">
              <Link
                href="/about-us"
                className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-2.5 no-underline text-black hover:shadow-md transition-shadow"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="hidden max-md:flex max-md:w-full max-md:py-4">
            <Link
              href="/about-us"
              className="bg-gradient-to-b from-[#fce001] to-[#fdb813] px-8 py-2.5 no-underline text-black"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Contact us */}

      <div >
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <ContactUsForm />
        </Suspense>
      </div>
    </div>
  );
}
