// app/TaxiStand/components/ForDriversSection.tsx
import Image from "next/image";
import Link from "next/link";

const driverSteps = [
  {
    number: "01",
    title: "Download",
    description: "Begin your journey by downloading the Traveling Partner App from your app store. Gain instant access to a world of convenient transportation and collaboration.",
    imageSrc: "/Assist/Taxi-stand-img/download-file.png",
  },
  {
    number: "02",
    title: "Register",
    description: "Register now! by verifying your mobile number to unlock exclusive benefits. Experience a smooth registration process for a secure and verified driver account.",
    imageSrc: "/Assist/Taxi-stand-img/Register-file.png",
  },
  {
    number: "03",
    title: "Activate",
    description: "Complete your profile with your personal details and required documents. Enhance trust and visibility within the community while enjoying personalized features designed just for you.",
    imageSrc: "/Assist/Taxi-stand-img/Activate-file.png",
  },
];

export default function ForDriversSection() {
  return (
    <div className="bg-gradient-to-b from-[#fce001] to-[#fdb813] py-24 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[#1a1a1a] text-4xl lg:text-6xl font-black uppercase tracking-tight mb-4 drop-shadow-sm">
            For Drivers
          </h2>
          <p className="text-[#1a1a1a]/90 text-2xl lg:text-3xl font-light uppercase tracking-wide">
            Ready to Earn with Us?
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-1 bg-[#1a1a1a]/30 rounded-full"></div>
            <div className="w-3 h-3 bg-[#1a1a1a] rounded-full rotate-45"></div>
            <div className="w-12 h-1 bg-[#1a1a1a]/30 rounded-full"></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-20 perspective-1000">
          {driverSteps.map((step, index) => (
            <DriverCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <AppStoreButton
            href="https://play.google.com/store/apps?hl=en&gl=US"
            icon="google"
            label="Get it on"
            store="Google Play"
          />
          <AppStoreButton
            href="https://www.apple.com/app-store/"
            icon="apple"
            label="Download on the"
            store="App Store"
          />
        </div>
      </div>
    </div>
  );
}

function DriverCard({ step, index }: { step: typeof driverSteps[0]; index: number }) {
  const rotations = ["rotate-2", "-rotate-1", "-rotate-2"];
  const hoverRotations = ["rotate-1", "-rotate-1", "rotate-1"];
  const borderColors = ["border-white/50", "border-[#fce001]", "border-white/50"];

  return (
    <div className={`group relative ${index === 1 ? "md:-mt-8" : ""}`}>
      <div className={`absolute inset-0 rounded-3xl transform ${rotations[index]} scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
      <div className={`relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl transform transition-all duration-500 group-hover:-translate-y-3 group-hover:${hoverRotations[index]} border-4 ${borderColors[index]} overflow-hidden`}>
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        {/* Number Badge */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
          <span className="text-2xl font-black text-[#1a1a1a]">{step.number}</span>
        </div>

        {/* Icon/Image */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#fce001] to-[#fdb813] w-24 h-24 rounded-2xl flex items-center justify-center mx-auto shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 overflow-hidden">
            <Image
              src={step.imageSrc}
              alt={step.title}
              width={48}
              height={48}
              className="w-12 h-12 object-contain drop-shadow-sm"
            />
          </div>
        </div>

        <h3 className="text-[#1a1a1a] text-2xl font-black text-center mb-4 uppercase tracking-wide">
          {step.title}
        </h3>
        <p className="text-gray-600 text-center leading-relaxed text-sm lg:text-base">
          {step.description}
        </p>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fce001] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </div>
  );
}

function AppStoreButton({ href, icon, label, store }: { href: string; icon: "google" | "apple"; label: string; store: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden flex items-center gap-4 bg-white text-[#1a1a1a] px-8 py-5 rounded-2xl hover:shadow-2xl transition-all duration-300 min-w-[220px] transform hover:-translate-y-1 border border-gray-200"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#fce001] to-[#fdb813] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
      <div className="relative z-10 flex items-center gap-4">
        {icon === "google" ? (
          <svg className="w-10 h-10 group-hover:text-[#1a1a1a] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
          </svg>
        ) : (
          <svg className="w-10 h-10 group-hover:text-[#1a1a1a] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
          </svg>
        )}
        <div className="text-left group-hover:text-[#1a1a1a] transition-colors duration-300">
          <div className="text-[11px] uppercase tracking-wider opacity-60 font-semibold">{label}</div>
          <div className="text-lg font-black leading-tight">{store}</div>
        </div>
      </div>
    </Link>
  );
}