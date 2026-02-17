// components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MdEmail, 
  MdPhone, 
  MdArrowForward,
  MdDirectionsCar,
  MdLocalShipping,
  MdFlightTakeoff,
  MdDeliveryDining,
  MdMap
} from "react-icons/md";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube
} from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { IoLogoApple } from "react-icons/io5";

const quickLinks = [
  { icon: MdDirectionsCar, label: "Taxi", href: "/taxi-stand", color: "from-[#FCE001] to-[#FDB813]", desc: "City rides" },
  { icon: MdLocalShipping, label: "Pool", href: "/pool-ride", color: "from-[#FDB813] to-[#FFA500]", desc: "Shared trips" },
  { icon: MdDeliveryDining, label: "Delivery", href: "/delivery", color: "from-[#FCE001] to-[#FFD700]", desc: "Fast delivery" },
  { icon: MdFlightTakeoff, label: "Logistics", href: "/logistic", color: "from-[#FDB813] to-[#FF8C00]", desc: "Enterprise" },
  { icon: MdMap, label: "Trip", href: "/trip", color: "from-[#FCE001] to-[#FDB813]", desc: "Plan journey" },
];

const footerLinks = {
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety", href: "/safety" },
    { label: "Terms", href: "/terms-conditions" },
    { label: "Privacy", href: "/privacy-policy" },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: "#", bg: "bg-[#1877F2]", shadow: "shadow-blue-500/30" },
  { icon: FaTwitter, href: "#", bg: "bg-[#1DA1F2]", shadow: "shadow-sky-500/30" },
  { icon: FaInstagram, href: "#", bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", shadow: "shadow-pink-500/30" },
  { icon: FaLinkedin, href: "#", bg: "bg-[#0A66C2]", shadow: "shadow-blue-600/30" },
  { icon: FaYoutube, href: "#", bg: "bg-[#FF0000]", shadow: "shadow-red-500/30" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-white text-gray-800 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FDB813 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Decorative Yellow Gradients */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#FCE001]/20 to-[#FDB813]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#FDB813]/15 to-[#FCE001]/5 rounded-full blur-[100px]" />
      </div>

      {/* Quick Access Cards */}
      <div className="relative z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FCE001] to-[#FDB813] mx-auto rounded-full" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-5 shadow-lg hover:shadow-xl transition-all duration-500 h-full"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative flex flex-col items-center text-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-gray-900 group-hover:text-[#FDB813] transition-colors">{item.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <Link href="/" className="inline-block group">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png"
                  alt="Traveling Partner"
                  width={260}
                  height={90}
                  className="relative w-[220px] h-auto drop-shadow-lg"
                  unoptimized
                />
              </motion.div>
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Revolutionizing urban mobility across Pakistan. Fast, safe, and reliable rides at your fingertips with zero commission.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <motion.a 
                href="mailto:info@traveling-partner.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-gray-600 hover:text-[#FDB813] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCE001]/20 to-[#FDB813]/20 flex items-center justify-center group-hover:from-[#FCE001] group-hover:to-[#FDB813] transition-all">
                  <MdEmail className="w-5 h-5 text-[#FDB813] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium">info@traveling-partner.com</span>
              </motion.a>
              
              <motion.a 
                href="tel:+1234567890"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-gray-600 hover:text-[#FDB813] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCE001]/20 to-[#FDB813]/20 flex items-center justify-center group-hover:from-[#FCE001] group-hover:to-[#FDB813] transition-all">
                  <MdPhone className="w-5 h-5 text-[#FDB813] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium">+92 300 1234567</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Links Columns - Only Company and Support */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
              >
                <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full" />
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <Link 
                        href={link.href}
                        className="text-gray-500 hover:text-[#FDB813] hover:translate-x-1 transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-2 h-[2px] bg-[#FDB813] transition-all duration-300" />
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Download & Social Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            <div>
              <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-4">
                Get the app
              </h4>
              <div className="space-y-3">
                <motion.a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-xl p-3 hover:bg-gray-800 transition-all group shadow-lg hover:shadow-xl"
                >
                  <FaGooglePlay className="w-8 h-8 text-black" />
                  <div>
                    <p className="text-[10px] text-black font-bold uppercase tracking-wider">Get it on</p>
                    <p className="text-sm font-bold text-black">Google Play</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-xl p-3 hover:bg-gray-800 transition-all group shadow-lg hover:shadow-xl"
                >
                  <IoLogoApple className="w-8 h-8 text-black" />
                  <div>
                    <p className="text-[10px] text-black font-bold uppercase tracking-wider">Download on</p>
                    <p className="text-sm font-bold text-black">App Store</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-gray-900 font-bold uppercase tracking-wider text-sm mb-3">
                Follow us
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`w-9 h-9 rounded-full ${social.bg} flex items-center justify-center text-white shadow-md ${social.shadow} hover:shadow-lg transition-all duration-300`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mt-2"
            >
              <div className="bg-gradient-to-r from-[#FCE001] to-[#FDB813] p-[2px] rounded-xl">
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-gray-800">Verified Partner</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              © {new Date().getFullYear()} Traveling Partner. All rights reserved.
            </motion.p>
            
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Cookies", "Sitemap"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-500 hover:text-[#FDB813] text-sm transition-colors relative group font-medium"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FCE001] to-[#FDB813] group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}