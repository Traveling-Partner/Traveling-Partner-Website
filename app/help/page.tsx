// app/help-center/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  ChevronDown, 
  Phone, 
  Mail, 
  MessageCircle,
  HelpCircle,
  Car,
  CreditCard,
  Shield,
  User,
  Package,
  MapPin,
  FileText,
  ArrowRight,
  X
} from "lucide-react";

// Types
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

// Data
const categories: Category[] = [
  { id: "getting-started", icon: User, title: "Getting Started", description: "New user guides and basics" },
  { id: "rides", icon: Car, title: "Rides & Booking", description: "Book, modify, or cancel rides" },
  { id: "delivery", icon: Package, title: "Deliveries", description: "Send and track packages" },
  { id: "payment", icon: CreditCard, title: "Payments", description: "Methods, fares, and refunds" },
  { id: "safety", icon: Shield, title: "Safety", description: "Your security is priority" },
  { id: "locations", icon: MapPin, title: "Service Areas", description: "Cities we operate in" },
];

const faqs: FAQ[] = [
  {
    id: 1,
    category: "getting-started",
    question: "How do I create an account on Traveling Partner?",
    answer: "Download our app from Google Play Store or App Store. Open the app, enter your mobile number, verify with OTP, and complete your profile. That's it! You're ready to book your first ride or delivery."
  },
  {
    id: 2,
    category: "rides",
    question: "How do I book a ride?",
    answer: "Open the app, allow location access, enter your destination in the 'Where to?' field, choose your ride type (Taxi, Pool, or Premium), review the fare estimate, and tap 'Book Now'. Track your driver in real-time."
  },
  {
    id: 3,
    category: "payment",
    question: "What payment methods are accepted?",
    answer: "We accept JazzCash, Easypaisa, all major credit/debit cards, and cash. Add payment methods in Wallet > Payment Methods. For cash rides, pay the exact amount shown in the app."
  },
  {
    id: 4,
    category: "rides",
    question: "How does Pool Ride work?",
    answer: "Pool Ride matches you with passengers heading the same direction. You save up to 30% on fares. Choose 'Same Gender Only' in preferences for added comfort. Pickup may take 2-5 minutes longer."
  },
  {
    id: 5,
    category: "payment",
    question: "Is there really no commission for drivers?",
    answer: "Yes! Unlike other platforms, Traveling Partner is 100% commission-free. Drivers keep every rupee they earn. We charge a small platform fee to passengers instead, keeping fares low for everyone."
  },
  {
    id: 6,
    category: "safety",
    question: "What safety features are available?",
    answer: "Share trip status with family, 24/7 in-app emergency button, verified driver profiles with ratings, real-time GPS tracking, and optional female-only rides. Your safety is our top priority."
  },
  {
    id: 7,
    category: "delivery",
    question: "How do I send a package?",
    answer: "Select 'Delivery' from the home screen, enter pickup and drop-off addresses, describe your package, choose vehicle type (bike for small, car for large), and confirm. Track your delivery live."
  },
  {
    id: 8,
    category: "getting-started",
    question: "How do I become a driver?",
    answer: "Tap 'Drive With Us' in the app or visit our website. Submit CNIC, driving license, vehicle registration, and complete background verification. Get approved within 24-48 hours and start earning."
  },
  {
    id: 9,
    category: "locations",
    question: "Which cities is Traveling Partner available in?",
    answer: "We currently operate in Karachi, Lahore, Islamabad, Rawalpindi, Multan, Faisalabad, Gujranwala, and Peshawar. We're rapidly expanding to more cities across Pakistan."
  },
  {
    id: 10,
    category: "rides",
    question: "Can I schedule a ride in advance?",
    answer: "Yes! Tap 'Schedule' instead of 'Book Now', select your date and time (up to 7 days ahead), and confirm. We'll send reminders 30 minutes before pickup."
  },
  {
    id: 11,
    category: "payment",
    question: "How do I get a refund?",
    answer: "For cancelled rides, refunds are automatic to your original payment method within 5-7 business days. For disputes, contact support through the app with your trip details."
  },
  {
    id: 12,
    category: "safety",
    question: "What if I leave something in the vehicle?",
    answer: "Immediately report via the app: Menu > Help > Lost Items. We'll connect you with your driver. A return fee of PKR 200-500 may apply based on distance."
  }
];

export default function HelpCenter(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState<"call" | "email" | "chat" | null>(null);

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? faq.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setOpenFAQ(null);
  };

  const handleFAQClick = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const handleContact = (type: "call" | "email" | "chat") => {
    setContactType(type);
    setShowContactModal(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
    setContactType(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Redesigned */}
      <div className="relative w-full min-h-[500px] lg:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/4606338/pexels-photo-4606338.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Help Center Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FCE001] px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                Help Center
              </span>
            </div>

            <h1 className="text-[40px] lg:text-[56px] font-black text-white leading-tight mb-4 uppercase">
              How Can We <span className="text-[#FCE001]">Help You?</span>
            </h1>

            <p className="text-white/80 text-lg mb-8 max-w-lg">
              Find answers to common questions about rides, deliveries, payments, and more.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FCE001] shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Book a ride", "Payment", "Driver", "Lost item"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white/10 hover:bg-[#FCE001] text-white hover:text-[#1a1a1a] rounded-full text-sm font-medium transition-all duration-300 border border-white/20"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-[90%] mx-auto max-w-7xl py-16">
        <div className="text-center mb-12">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1a1a1a] mb-4">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Category</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group p-6 rounded-2xl text-center transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] shadow-lg scale-105"
                    : "bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                  isSelected ? "bg-white" : "bg-gradient-to-br from-[#fce001] to-[#fdb813]"
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? "text-[#1a1a1a]" : "text-[#1a1a1a]"}`} />
                </div>
                <h3 className={`text-sm font-bold mb-1 ${isSelected ? "text-[#1a1a1a]" : "text-[#1a1a1a]"}`}>
                  {category.title}
                </h3>
                <p className={`text-xs ${isSelected ? "text-[#1a1a1a]/70" : "text-gray-500"}`}>
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-[#fdb813] font-medium flex items-center gap-2"
            >
              Clear filter
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="w-[90%] mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-4 py-2 rounded-full mb-4">
                <FileText className="w-4 h-4 text-[#fdb813]" />
                <span className="text-[#1a1a1a] text-sm font-semibold uppercase tracking-wider">
                  FAQs
                </span>
              </div>
              <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1a1a1a]">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Questions</span>
              </h2>
            </div>
            <p className="text-gray-500 mt-4 lg:mt-0">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? "result" : "results"} found
            </p>
          </div>

          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => handleFAQClick(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-base lg:text-lg font-semibold text-[#1a1a1a] pr-4 group-hover:text-[#fdb813] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openFAQ === faq.id 
                        ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] rotate-180" 
                        : "bg-gray-100 group-hover:bg-gray-200"
                    }`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        openFAQ === faq.id ? "text-[#1a1a1a]" : "text-gray-600"
                      }`} />
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === faq.id ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                        <div className="mt-4 flex gap-3">
                          <button className="text-sm text-[#fdb813] font-medium hover:underline">
                            Was this helpful?
                          </button>
                          <button className="text-sm text-gray-400 hover:text-gray-600">
                            Report issue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">No results found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or browse categories</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="px-6 py-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-semibold rounded-full hover:shadow-lg transition-shadow"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-[90%] mx-auto max-w-7xl py-16">
        <div className="text-center mb-12">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1a1a1a] mb-4">
            Still Need <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">Help?</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Our support team is available 24/7 to assist you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call */}
          <button
            onClick={() => handleContact("call")}
            className="group bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-[#1a1a1a]" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Call Us</h3>
            <p className="text-sm text-gray-500 mb-2">24/7 Helpline</p>
            <p className="text-base font-semibold text-[#1a1a1a] mb-4">0800-78601</p>
            <span className="inline-flex items-center gap-2 text-[#fdb813] font-medium group-hover:gap-3 transition-all">
              Call now <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* Email */}
          <button
            onClick={() => handleContact("email")}
            className="group bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-[#1a1a1a]" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Email Us</h3>
            <p className="text-sm text-gray-500 mb-2">Response in 24h</p>
            <p className="text-base font-semibold text-[#1a1a1a] mb-4">support@travelingpartner.pk</p>
            <span className="inline-flex items-center gap-2 text-[#fdb813] font-medium group-hover:gap-3 transition-all">
              Send email <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* Chat */}
          <button
            onClick={() => handleContact("chat")}
            className="group bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-[#1a1a1a]" />
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-2">Instant support</p>
            <p className="text-base font-semibold text-[#1a1a1a] mb-4">Available 24/7</p>
            <span className="inline-flex items-center gap-2 text-[#fdb813] font-medium group-hover:gap-3 transition-all">
              Start chat <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
          <div 
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1a1a1a]">
                {contactType === "call" && "Call Support"}
                {contactType === "email" && "Email Support"}
                {contactType === "chat" && "Live Chat"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {contactType === "call" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-4">Call our 24/7 helpline</p>
                <a 
                  href="tel:0800-78601" 
                  className="block w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-lg transition-shadow"
                >
                  0800-78601
                </a>
                <p className="text-sm text-gray-400 mt-4">Toll-free from all networks</p>
              </div>
            )}

            {contactType === "email" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-4">Send us an email</p>
                <a 
                  href="mailto:support@travelingpartner.pk" 
                  className="block w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-lg transition-shadow break-all"
                >
                  support@travelingpartner.pk
                </a>
                <p className="text-sm text-gray-400 mt-4">We&apos;ll respond within 24 hours</p>
              </div>
            )}

            {contactType === "chat" && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-4">Start a live chat session</p>
                <button 
                  onClick={() => { alert("Chat feature coming soon in app!"); closeModal(); }}
                  className="w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-lg transition-shadow"
                >
                  Open in App
                </button>
                <p className="text-sm text-gray-400 mt-4">Available 24/7 for instant help</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="w-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="w-[90%] mx-auto max-w-4xl relative z-10 py-16 text-center">
          <h2 className="text-[28px] lg:text-[42px] font-bold text-[#1a1a1a] mb-4">
            Download the <span className="text-white">App</span>
          </h2>
          <p className="text-[#1a1a1a]/80 mb-8 max-w-xl mx-auto">
            Get help anytime, anywhere. Download Traveling Partner for the best experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://play.google.com/store"
              target="_blank"
              className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </Link>
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-black/80 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}