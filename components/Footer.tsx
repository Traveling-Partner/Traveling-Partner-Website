// components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  MdEmail, 
  MdPhone, 
  MdDirectionsCar,
  MdLocalShipping,
  MdFlightTakeoff,
  MdDeliveryDining,
  MdMap,
  MdLocationOn,
  MdAccessTime
} from "react-icons/md";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaGooglePlay 
} from "react-icons/fa";
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
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety", href: "/safety" },
    { label: "Terms", href: "/terms-conditions" },
    { label: "Privacy", href: "/privacy-policy" },
  ],
  resources: [
    { label: "Driver Guide", href: "/driver-guide" },
    { label: "Partner Hub", href: "/partner" },
    { label: "API Docs", href: "/api" },
    { label: "Status", href: "/status" },
  ]
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook", bg: "bg-[#1877F2]", shadow: "shadow-blue-500/30", hover: "hover:shadow-blue-500/50" },
  { icon: FaTwitter, href: "#", label: "Twitter", bg: "bg-[#1DA1F2]", shadow: "shadow-sky-500/30", hover: "hover:shadow-sky-500/50" },
  { icon: FaInstagram, href: "#", label: "Instagram", bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", shadow: "shadow-pink-500/30", hover: "hover:shadow-pink-500/50" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn", bg: "bg-[#0A66C2]", shadow: "shadow-blue-600/30", hover: "hover:shadow-blue-600/50" },
  { icon: FaYoutube, href: "#", label: "YouTube", bg: "bg-[#FF0000]", shadow: "shadow-red-500/30", hover: "hover:shadow-red-500/50" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(252, 224, 1, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(252, 224, 1, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-[#FCE001]/30 to-[#FDB813]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#FDB813]/20 to-[#FCE001]/5 rounded-full blur-[100px]" 
        />
        
        {/* Secondary Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#FCE001]/5 via-transparent to-transparent rounded-full opacity-30" />
      </div>

      {/* Services Strip */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FCE001]/20 to-[#FDB813]/20 border border-[#FCE001]/30 text-[#FCE001] text-xs font-bold uppercase tracking-wider mb-4">
              What We Offer
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCE001] to-[#FDB813]">Services</span>
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-[#FCE001]" />
              <div className="w-3 h-3 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full animate-pulse" />
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-[#FCE001]" />
            </div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {quickLinks.map((item, index) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-[#FCE001]/50 transition-all duration-500 h-full"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                    
                    {/* Glow */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
                    
                    <div className="relative flex flex-col items-center text-center gap-4">
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      >
                        <item.icon className="w-7 h-7 text-black" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-[#FCE001] transition-colors mb-1">{item.label}</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                      </div>
                      
                      {/* Arrow Indicator */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#FCE001]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MdDirectionsCar className="w-4 h-4 text-[#FCE001] rotate-[-45deg]" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <Link href="/" className="inline-block group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <Image
                  src="https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png"
                  alt="Traveling Partner"
                  width={280}
                  height={100}
                  className="relative w-[240px] h-auto drop-shadow-2xl brightness-110"
                  unoptimized
                />
              </motion.div>
            </Link>
            
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Revolutionizing urban mobility across Pakistan with fast, safe, and reliable rides at your fingertips. Zero commission, maximum convenience.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <motion.a 
                href="mailto:info@traveling-partner.com"
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FCE001]/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCE001] to-[#FDB813] flex items-center justify-center shadow-lg">
                  <MdEmail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email Us</p>
                  <p className="text-white font-medium group-hover:text-[#FCE001] transition-colors">info@traveling-partner.com</p>
                </div>
              </motion.a>
              
              <motion.a 
                href="tel:+923001234567"
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FCE001]/50 hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCE001] to-[#FDB813] flex items-center justify-center shadow-lg">
                  <MdPhone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Call Us</p>
                  <p className="text-white font-medium group-hover:text-[#FCE001] transition-colors">+92 300 1234567</p>
                </div>
              </motion.a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCE001]/20 to-[#FDB813]/20 flex items-center justify-center">
                  <MdAccessTime className="w-6 h-6 text-[#FCE001]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Support Hours</p>
                  <p className="text-white font-medium">24/7 Available</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + catIndex * 0.1 }}
              >
                <h4 className="text-white font-black uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full animate-pulse" />
                  {category}
                </h4>
                <ul className="space-y-4">
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
                        className="text-gray-400 hover:text-[#FCE001] transition-all duration-300 text-sm inline-flex items-center gap-2 group font-medium"
                      >
                        <span className="w-0 group-hover:w-2 h-[2px] bg-[#FCE001] transition-all duration-300 rounded-full" />
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
            className="lg:col-span-3 space-y-8"
          >
            <div>
              <h4 className="text-white font-black uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full animate-pulse" />
                Download App
              </h4>
              <div className="space-y-4">
                <motion.a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 hover:bg-gray-100 transition-all group shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FCE001]/0 via-[#FCE001]/10 to-[#FCE001]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <FaGooglePlay className="w-10 h-10 text-[#0a0a0a]" />
                  <div className="relative">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Get it on</p>
                    <p className="text-lg font-black text-[#0a0a0a]">Google Play</p>
                  </div>
                </motion.a>
                
                <motion.a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 hover:bg-gray-100 transition-all group shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FCE001]/0 via-[#FCE001]/10 to-[#FCE001]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <IoLogoApple className="w-10 h-10 text-[#0a0a0a]" />
                  <div className="relative">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">Download on</p>
                    <p className="text-lg font-black text-[#0a0a0a]">App Store</p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <h4 className="text-white font-black uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-full animate-pulse" />
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`w-11 h-11 rounded-xl ${social.bg} flex items-center justify-center text-white shadow-lg ${social.shadow} ${social.hover} transition-all duration-300 relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    <social.icon className="w-5 h-5 relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-[#FCE001] to-[#FDB813] p-[2px] rounded-2xl">
                <div className="bg-[#0a0a0a] rounded-2xl px-5 py-3 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Verified Partner</span>
                    <span className="text-[10px] text-gray-400">Trusted by 10M+ Users</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location Badge */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <MdLocationOn className="w-5 h-5 text-[#FCE001]" />
              <span>Karachi, Pakistan</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-y border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-black text-white mb-2">Stay in the loop</h4>
              <p className="text-gray-400">Get updates on new features and exclusive offers.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#FCE001] transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#FCE001] to-[#FDB813] rounded-xl font-bold text-black hover:shadow-lg hover:shadow-[#FCE001]/25 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm font-medium"
            >
              © {new Date().getFullYear()} Traveling Partner. All rights reserved.
            </motion.p>
            
            <div className="flex items-center gap-8">
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
                    className="text-gray-500 hover:text-[#FCE001] text-sm transition-colors relative group font-medium"
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