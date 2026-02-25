// app/help-center/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronUp,
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
  X,
  CheckCircle,
  Clock,
  Star,
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
  {
    id: "getting-started",
    icon: User,
    title: "Getting Started",
    description: "New user guides",
  },
  {
    id: "rides",
    icon: Car,
    title: "Rides & Booking",
    description: "Book and manage rides",
  },
  {
    id: "delivery",
    icon: Package,
    title: "Deliveries",
    description: "Send packages",
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Payments",
    description: "Fares & refunds",
  },
  {
    id: "safety",
    icon: Shield,
    title: "Safety",
    description: "Security features",
  },
  {
    id: "locations",
    icon: MapPin,
    title: "Cities",
    description: "Service areas",
  },
];

const faqs: FAQ[] = [
  {
    id: 1,
    category: "getting-started",
    question: "How do I create an account on Traveling Partner?",
    answer:
      "Download our app from Google Play Store or App Store. Open the app, enter your mobile number, verify with OTP, and complete your profile. That's it! You're ready to book your first ride or delivery.",
  },
  {
    id: 2,
    category: "rides",
    question: "How do I book a ride with Traveling Partner?",
    answer:
      "Open the app, allow location access, enter your destination in the 'Where to?' field, choose your ride type (Taxi, Pool, or Premium), review the fare estimate, and tap 'Book Now'. Track your driver in real-time on the map.",
  },
  {
    id: 3,
    category: "payment",
    question: "What payment methods are accepted?",
    answer:
      "We accept JazzCash, Easypaisa, all major credit/debit cards (Visa, Mastercard), and cash payments. Add payment methods in Wallet > Payment Methods. For cash rides, pay the exact amount shown in the app to your driver.",
  },
  {
    id: 4,
    category: "rides",
    question: "How does Pool Ride work and how much can I save?",
    answer:
      "Pool Ride matches you with passengers heading the same direction. You save up to 30% on fares compared to solo rides. Choose 'Same Gender Only' in preferences for added comfort. Pickup may take 2-5 minutes longer as we optimize the route for all passengers.",
  },
  {
    id: 5,
    category: "payment",
    question: "Is there really no commission for drivers?",
    answer:
      "Absolutely! Unlike other platforms that take 20-30% commission, Traveling Partner is 100% commission-free. Drivers keep every rupee they earn. We charge a small transparent platform fee to passengers instead, keeping fares low for everyone and income fair for drivers.",
  },
  {
    id: 6,
    category: "safety",
    question: "What safety features are available for passengers?",
    answer:
      "Your safety is our priority: Share live trip status with family/friends, 24/7 in-app emergency SOS button, verified driver profiles with photo and ratings, real-time GPS tracking, optional female-only rides and drivers, and every trip is insured.",
  },
  {
    id: 7,
    category: "delivery",
    question: "How do I send a package using Traveling Partner?",
    answer:
      "Select 'Delivery' from the home screen, enter pickup and drop-off addresses, describe your package (weight and dimensions), choose vehicle type (bike for small packages under 5kg, car for larger items), and confirm. Track your delivery in real-time and share tracking with recipient.",
  },
  {
    id: 8,
    category: "getting-started",
    question: "How do I become a driver and start earning?",
    answer:
      "Tap 'Drive With Us' in the app or visit our website. Requirements: Valid CNIC, driving license, vehicle registration, and smartphone. Complete background verification online. Get approved within 24-48 hours. Start earning immediately with zero commission deductions!",
  },
  {
    id: 9,
    category: "locations",
    question: "Which cities is Traveling Partner available in Pakistan?",
    answer:
      "We currently operate in Karachi, Lahore, Islamabad, Rawalpindi, Multan, Faisalabad, Gujranwala, Peshawar, and Sialkot. We're rapidly expanding to Quetta, Hyderabad, and more cities. Check the app for the latest service areas in your city.",
  },
  {
    id: 10,
    category: "rides",
    question: "Can I schedule a ride in advance for airport pickup?",
    answer:
      "Yes! Tap 'Schedule' instead of 'Book Now', select your date and time (up to 7 days ahead), enter pickup and drop-off locations. We'll send you reminders 30 minutes and 5 minutes before pickup. Perfect for airport transfers and important meetings.",
  },
  {
    id: 11,
    category: "payment",
    question: "How do refunds work for cancelled rides?",
    answer:
      "For cancelled rides, refunds are automatic to your original payment method within 5-7 business days. If driver cancels, you pay nothing. If you cancel within 2 minutes of booking, no charge. After 2 minutes, a small cancellation fee may apply to compensate the driver.",
  },
  {
    id: 12,
    category: "safety",
    question: "What should I do if I left something in the vehicle?",
    answer:
      "Immediately report via the app: Menu > Help > Lost Items, or call our 24/7 helpline 0800-78601. We'll connect you directly with your driver. A return fee of PKR 200-500 may apply based on distance. 90% of lost items are recovered within 24 hours.",
  },
];

export default function HelpCenter(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState<
    "call" | "email" | "chat" | null
  >(null);
  const [likedFAQs, setLikedFAQs] = useState<Set<number>>(new Set());

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? faq.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setOpenFAQ(null);
  };

  const handleFAQClick = (faqId: number) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  const handleLikeFAQ = (faqId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedFAQs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(faqId)) {
        newSet.delete(faqId);
      } else {
        newSet.add(faqId);
      }
      return newSet;
    });
  };

  const handleContact = (type: "call" | "email" | "chat") => {
    setContactType(type);
    setShowContactModal(true);
  };

  const closeModal = () => {
    setShowContactModal(false);
    setContactType(null);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setOpenFAQ(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/4606338/pexels-photo-4606338.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Help Center"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 w-[90%] mx-auto max-w-7xl py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FCE001] px-4 py-2 rounded-full mb-6 animate-fade-in">
              <HelpCircle className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                Help Center
              </span>
            </div>

            <h1 className="text-[42px] lg:text-[64px] font-black text-white leading-[1.1] mb-6 uppercase">
              How Can We <span className="text-[#FCE001]">Help?</span>
            </h1>

            <p className="text-white/80 text-lg lg:text-xl mb-10 max-w-lg leading-relaxed">
              Find instant answers about rides, deliveries, payments, and more.
              Your journey matters to us.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-5 text-gray-900 placeholder-gray-400 focus:outline-none text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button className="hidden sm:block mr-2 px-6 py-3 bg-black text-white rounded-lg font-semibold text-sm hover:bg-black/80 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["Book a ride", "Payment", "Become driver", "Lost item"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-5 py-2.5 bg-white/10 hover:bg-[#FCE001] text-white hover:text-[#1a1a1a] rounded-full text-sm font-medium transition-all duration-300 border border-white/20 backdrop-blur-sm"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-[90%] mx-auto max-w-7xl py-20">
        <div className="text-center mb-14">
          <h2 className="text-[32px] lg:text-[42px] font-bold text-[#1a1a1a] mb-4">
            Browse by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">
              Category
            </span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative p-6 rounded-2xl text-center transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] shadow-xl scale-105"
                    : "bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                    isSelected
                      ? "bg-white shadow-lg"
                      : "bg-gradient-to-br from-[#fce001] to-[#fdb813] shadow-md"
                  }`}
                >
                  <Icon className="w-7 h-7 text-[#1a1a1a]" />
                </div>
                <h3
                  className={`text-sm font-bold mb-1 ${isSelected ? "text-[#1a1a1a]" : "text-[#1a1a1a]"}`}
                >
                  {category.title}
                </h3>
                <p
                  className={`text-xs ${isSelected ? "text-[#1a1a1a]/70" : "text-gray-500"}`}
                >
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              Clear filter
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* FAQs Section with Gradient Background */}
      <div className="w-full bg-gradient-to-b from-[#FCE001] via-[#FDB813] to-[#FCE001] relative overflow-hidden py-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl"></div>

        <div className="w-[90%] mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white/30 border border-white/40 px-5 py-2.5 rounded-full mb-6">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] mb-4 uppercase">
              Got <span className="text-white">Questions?</span>
            </h2>
            {/* <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-[2px] bg-[#1a1a1a]/30"></div>
              <div className="w-3 h-3 bg-[#1a1a1a] rounded-full"></div>
              <div className="w-20 h-[2px] bg-[#1a1a1a]/30"></div>
            </div> */}
            <p className="text-[#1a1a1a]/80 text-lg">
              {filteredFAQs.length}{" "}
              {filteredFAQs.length === 1 ? "answer" : "answers"} found
            </p>
          </div>

          {filteredFAQs.length > 0 ? (
            <div className="space-y-5">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <button
                    onClick={() => handleFAQClick(faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          openFAQ === faq.id
                            ? "bg-gradient-to-br from-[#fce001] to-[#fdb813]"
                            : "bg-gray-100 group-hover:bg-gray-200"
                        }`}
                      >
                        <span className="text-sm font-bold text-[#1a1a1a]">
                          {index + 1}
                        </span>
                      </div>
                      <span
                        className={`text-lg lg:text-xl font-bold transition-colors ${
                          openFAQ === faq.id
                            ? "text-[#fdb813]"
                            : "text-[#1a1a1a] group-hover:text-[#fdb813]"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        openFAQ === faq.id
                          ? "bg-gradient-to-br from-[#fce001] to-[#fdb813] rotate-180 shadow-lg"
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }`}
                    >
                      <ChevronDown
                        className={`w-6 h-6 transition-colors ${
                          openFAQ === faq.id
                            ? "text-[#1a1a1a]"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === faq.id
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                          {faq.answer}
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                          <button
                            onClick={(e) => handleLikeFAQ(faq.id, e)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              likedFAQs.has(faq.id)
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            <CheckCircle
                              className={`w-4 h-4 ${likedFAQs.has(faq.id) ? "fill-current" : ""}`}
                            />
                            {likedFAQs.has(faq.id)
                              ? "Helpful"
                              : "Was this helpful?"}
                          </button>
                          <button className="text-sm text-gray-400 hover:text-gray-600 font-medium">
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
            <div className="text-center py-20 bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">
                No results found
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                We couldn&apos;t find any answers matching &quot;{searchQuery}
                &quot;. Try different keywords or browse categories.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-8 py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-full hover:shadow-xl transition-all hover:scale-105"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="w-full bg-white py-20">
        <div className="w-[90%] mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#fce001]/10 border border-[#fce001]/20 px-5 py-2.5 rounded-full mb-6">
              <MessageCircle className="w-5 h-5 text-[#fdb813]" />
              <span className="text-[#1a1a1a] text-sm font-bold uppercase tracking-wider">
                24/7 Support
              </span>
            </div>
            <h2 className="text-[32px] lg:text-[48px] font-black text-[#1a1a1a] mb-4 uppercase">
              Still Need{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">
                Help?
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-[2px] bg-gray-200"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full"></div>
              <div className="w-16 h-[2px] bg-gray-200"></div>
            </div>
            <p className="text-gray-600 max-w-xl mx-auto text-lg">
              Our dedicated support team is ready to assist you anytime,
              anywhere in Pakistan
            </p>
          </div>

          {/* Contact Cards - Elegant Unified Design */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Call Card */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813]"></div>

              {/* Hover glow effect */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#fce001]/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                {/* Icon with ring */}
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-9 h-9 text-[#1a1a1a]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Call Us
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Speak directly with our support team for immediate assistance
                  with any issue
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#fce001]/10 text-[#fdb813] text-xs font-semibold rounded-full">
                    24/7 Available
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                    Toll Free
                  </span>
                </div>

                <a
                  href="tel:0800-78601"
                  className="group/btn relative flex items-center justify-center gap-3 w-full py-4 bg-black hover:bg-gradient-to-r from-[#fce001] to-[#fdb813] text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:shadow-xl"
                >
                  <span className="relative z-10">0800-78601</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative bg-white rounded-3xl p-8 border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#fce001] to-[#fdb813]"></div>

              <div className="absolute top-0 right-0 w-60 h-60 bg-[#fce001]/10 rounded-full blur-3xl transform translate-x-20 -translate-y-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-9 h-9 text-[#1a1a1a]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Email Us
                </h3>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  Send detailed queries and receive comprehensive responses from
                  our team
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#fce001]/10 text-[#fdb813] text-xs font-semibold rounded-full">
                    24h Response
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                    Detailed
                  </span>
                </div>

                <a
                  href="mailto:support@travelingpartner.pk"
                  className="group/btn relative flex items-center justify-center gap-3 w-full py-4 bg-[#1a1a1a] text-white font-bold text-lg rounded-xl overflow-hidden transition-all hover:shadow-xl"
                >
                  <span className="relative z-10">Send Email</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fce001] to-[#fdb813] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </a>
              </div>
            </div>

            {/* Chat Card */}
            <div className="group relative bg-white rounded-3xl p-8 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 left-0 right-0 h-1.5  bg-gradient-to-r from-[#fce001] to-[#fdb813]"></div>

              <div className="absolute top-0 right-0 w-60 h-60 bg-white/20 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

              <div className="relative z-10">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0  bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-2xl rotate-6 opacity-30 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0  bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-9 h-9 text-[#1a1a1a] " />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                  Live Chat
                </h3>
                <p className="text-[#1a1a1a]/70 mb-6 leading-relaxed">
                  Get instant answers through our in-app messaging system
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#fce001]/10 text-[#fdb813] text-xs font-bold rounded-full">
                    Instant
                  </span>
                  <span className="px-3 py-1 bg-black/10 text-[#1a1a1a] text-xs font-bold rounded-full">
                    Recommended
                  </span>
                </div>

                <button
                  onClick={() => handleContact("chat")}
                  className="group/btn relative flex items-center justify-center gap-3 w-full py-4 bg-[#1a1a1a] text-white hover:bg-gradient-to-r from-[#fce001] to-[#fdb813] font-bold text-lg rounded-xl overflow-hidden transition-all hover:shadow-xl"
                >
                  <span className="relative z-10">Start Chat</span>
                  <ArrowRight className="w-5 h-5 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges - Enhanced */}
          <div className="mt-20">
            <div className="relative bg-gray-50 rounded-3xl p-8 lg:p-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-gradient-to-r from-[#fce001] to-[#fdb813] rounded-full"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#1a1a1a]">99.9%</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Issues Resolved
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start md:border-x md:border-gray-200 md:px-8">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[#fdb813]" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#1a1a1a]">
                      &lt; 2 min
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      Average Response
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center">
                    <Star className="w-7 h-7 text-[#fce001] fill-[#fce001]" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#1a1a1a]">4.9/5</p>
                    <p className="text-sm text-gray-500 font-medium">
                      Support Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-[#1a1a1a]">
                {contactType === "call" && "Call Support"}
                {contactType === "email" && "Email Support"}
                {contactType === "chat" && "Live Chat"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {contactType === "call" && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Phone className="w-12 h-12 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-2">
                  Call our toll-free helpline
                </p>
                <p className="text-3xl font-black text-[#1a1a1a] mb-6">
                  0800-78601
                </p>
                <a
                  href="tel:0800-78601"
                  className="block w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Call Now
                </a>
                <p className="text-sm text-gray-400 mt-4">
                  Available 24/7 • All networks
                </p>
              </div>
            )}

            {contactType === "email" && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Mail className="w-12 h-12 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-2">Send us an email</p>
                <p className="text-lg font-bold text-[#1a1a1a] mb-6 break-all">
                  support@travelingpartner.pk
                </p>
                <a
                  href="mailto:support@travelingpartner.pk"
                  className="block w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Send Email
                </a>
                <p className="text-sm text-gray-400 mt-4">
                  Response within 24 hours
                </p>
              </div>
            )}

            {contactType === "chat" && (
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#fce001] to-[#fdb813] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <MessageCircle className="w-12 h-12 text-[#1a1a1a]" />
                </div>
                <p className="text-gray-600 mb-2">Open live chat in app</p>
                <p className="text-lg font-bold text-[#1a1a1a] mb-6">
                  Fastest way to get help
                </p>
                <button
                  onClick={() => {
                    alert("Please download our mobile app to use Live Chat!");
                    closeModal();
                  }}
                  className="block w-full py-4 bg-gradient-to-r from-[#fce001] to-[#fdb813] text-[#1a1a1a] font-bold text-lg rounded-xl hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  Open in App
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  Available on iOS & Android
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="w-[90%] mx-auto max-w-4xl text-center">
          <h2 className="text-[28px] lg:text-[36px] font-bold text-[#1a1a1a] mb-4">
            Download the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce001] to-[#fdb813]">
              Traveling Partner
            </span>{" "}
            App
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Get help anytime, anywhere. Available on iOS and Android.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://play.google.com/store"
              target="_blank"
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-black/80 transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </Link>
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl hover:bg-black/80 transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
