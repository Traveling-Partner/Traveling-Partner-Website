import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "city",
    title: "In & out of city",
    description: "Enjoy the convenience of Traveling Partner's pool ride service for both city and inter-city travel. Connect with users traveling in and out of the city for seamless and cost-effective rides.",
    imageSrc: "/Assist/Taxi-stand-img/In-city.png",
  },
  {
    icon: "users",
    title: "Female-Only",
    description: "Choose our dedicated female-only option for secure and comfortable rides, with the ability to select female drivers or pool with other female passengers.",
    imageSrc: "/Assist/Taxi-stand-img/Carpool.png",
  },
  {
    icon: "location",
    title: "Live tracking",
    description: "Stay informed in real-time with live tracking features. Whether you're in the city or on an inter-city journey, experience hassle-free tracking without additional charges.",
    imageSrc: "/Assist/Taxi-stand-img/Map Marker.png",
  },
];

export default function FeaturesSection() {
  return (
    <div className="relative w-full bg-white overflow-hidden py-24 px-4">
      {/* Subtle Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#fce001]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#fdb813]/10 rounded-full blur-3xl"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-[#fdb813]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] leading-tight">
            Best Things Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Travel partner</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}