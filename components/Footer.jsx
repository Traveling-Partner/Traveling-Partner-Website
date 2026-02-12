// components/Footer.jsx
import Link from "next/link";
import Image from "next/image";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { href: "/taxi-stand", label: "Taxi Stand" },
    { href: "/pool-ride", label: "Pool Ride" },
    { href: "/delivery", label: "Delivery" },
    { href: "/logistic", label: "Logistics" },
    { href: "/trip", label: "Trip Planning" },
  ];

  const company = [
    { href: "/about-us", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-[50px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="w-full pt-20 pb-12 bg-gradient-to-b from-[#fce001] via-[#ffd700] to-[#fdb813] relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Section - Newsletter */}
          <div className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-12 border border-black/5">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">
                  Stay Connected
                </h3>
                <p className="text-black/70 text-sm sm:text-base">
                  Get updates on new features and exclusive offers
                </p>
              </div>
              <div className="flex w-full lg:w-auto gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 lg:w-80 px-4 py-3 rounded-full bg-white/90 border-2 border-transparent focus:border-black/20 focus:outline-none text-black placeholder-black/40 transition-all"
                />
                <button className="px-6 py-3 bg-black text-[#fce001] rounded-full font-semibold hover:bg-black/80 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 mb-12">
            
            {/* Logo & Description - Takes 4 columns */}
            <div className="lg:col-span-4 flex flex-col items-center md:items-start">
              <Link href="/" className="inline-block mb-6 group">
                <div className="relative overflow-hidden rounded-xl bg-transparent p-4 group-hover:shadow-xl transition-all duration-300">
                  <Image
                    src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png"
                    alt="Traveling Partner Logo"
                    width={220}
                    height={140}
                    className="w-[180px] sm:w-[220px] h-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                    unoptimized
                  />
                </div>
              </Link>
              <p className="text-black/80 text-center md:text-left mb-6 max-w-sm leading-relaxed">
                Your trusted companion for seamless travel experiences. Connecting you to destinations with comfort, safety, and reliability.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black hover:bg-black hover:text-[#fce001] transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Section - Takes 2 columns */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h2 className="text-lg font-bold text-black mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-black rounded-full"></span>
                Services
              </h2>
              <nav className="flex flex-col gap-3">
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-black/80 hover:text-black font-medium transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-black transition-all duration-300"></span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company Section - Takes 2 columns */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h2 className="text-lg font-bold text-black mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-black rounded-full"></span>
                Company
              </h2>
              <nav className="flex flex-col gap-3">
                {company.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-black/80 hover:text-black font-medium transition-all duration-300 hover:translate-x-2 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-black transition-all duration-300"></span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Section - Takes 2 columns */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h2 className="text-lg font-bold text-black mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-black rounded-full"></span>
                Contact
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@traveling-partner.com"
                  className="flex items-center gap-3 text-black/80 hover:text-black transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#fce001] transition-all duration-300">
                    <MdEmail className="text-lg" />
                  </div>
                  <span className="text-sm break-all">info@traveling-partner.com</span>
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-black/80 hover:text-black transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-[#fce001] transition-all duration-300">
                    <MdPhone className="text-lg" />
                  </div>
                  <span className="text-sm">+1 (234) 567-890</span>
                </a>
                <div className="flex items-center gap-3 text-black/80">
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
                    <MdLocationOn className="text-lg" />
                  </div>
                  <span className="text-sm">123 Travel Street, NYC</span>
                </div>
              </div>
            </div>

            {/* Download Apps - Takes 2 columns */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start">
              <h2 className="text-lg font-bold text-black mb-5 flex items-center gap-2">
                <span className="w-8 h-1 bg-black rounded-full"></span>
                Download
              </h2>
              <div className="flex flex-col gap-3 w-full">
                <Link 
                  href="https://play.google.com/store/apps?hl=en&gl=US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-black/10 hover:bg-black transition-all duration-300 p-1"
                >
                  <Image
                    src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253809/tp-Imgs/img/google_wy7mc6.png"
                    alt="Get it on Google Play"
                    width={160}
                    height={48}
                    className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </Link>
                <Link 
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-black/10 hover:bg-black transition-all duration-300 p-1"
                >
                  <Image
                    src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253812/tp-Imgs/img/iso_imftsl.png"
                    alt="Download on App Store"
                    width={160}
                    height={48}
                    className="w-full h-auto rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </Link>
              </div>
              
              {/* Certification Badge */}
              <div className="mt-6 p-3 bg-white/30 rounded-xl backdrop-blur-sm border border-white/40">
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1770879272/tp-Imgs/logo/image_12_uaxjz0.png"
                  alt="Certification"
                  width={120}
                  height={60}
                  className="w-[100px] h-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-black/70 text-sm text-center md:text-left">
              © {currentYear} Traveling Partner. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-black/70 hover:text-black transition-colors">Privacy</Link>
              <Link href="/terms-conditions" className="text-black/70 hover:text-black transition-colors">Terms</Link>
              <Link href="/sitemap" className="text-black/70 hover:text-black transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar - Dark */}
      <div className="bg-black py-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/90 text-center text-sm">
            Made with passion for travelers worldwide
          </p>
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <span>Powered by</span>
            <span className="text-[#fce001] font-semibold">Traveling Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}