// app/components/CarAnimation.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const CarAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-20 flex items-start justify-start overflow-visible">
      {/* Single Car Container */}
      <motion.div
        className="relative"
        animate={{
          x: ["-42%", "42vw"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 6,
            ease: "linear",
          },
        }}
      >
        {/* Car Wrapper with Effects */}
        <div className="relative">
          {/* Speed Lines Behind */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col gap-1 pr-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="h-[2px] bg-gradient-to-r from-[#ffd700] to-transparent rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{
                  width: [0, 80, 0],
                  opacity: [0, 1, 0],
                  x: [0, -60],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                style={{
                  width: "60px",
                  marginTop: `${(i - 1.5) * 6}px`,
                }}
              />
            ))}
          </div>

          {/* Main Car SVG - Realistic Yellow Tesla Style */}
          <svg
            width="180"
            height="80"
            viewBox="0 0 180 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
          >
            <defs>
              {/* Metallic Yellow Body Gradient */}
              <linearGradient id="carBody" x1="0" y1="0" x2="160" y2="70">
                <stop offset="0%" stopColor="#ffb700" />
                <stop offset="20%" stopColor="#ffd700" />
                <stop offset="40%" stopColor="#ffed4a" />
                <stop offset="50%" stopColor="#fff59d" />
                <stop offset="60%" stopColor="#ffd700" />
                <stop offset="85%" stopColor="#ffb700" />
                <stop offset="100%" stopColor="#cc8e00" />
              </linearGradient>

              {/* Side Body Shadow Gradient */}
              <linearGradient id="bodyShadow" x1="0" y1="35" x2="160" y2="70">
                <stop offset="0%" stopColor="#cc8e00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b6914" stopOpacity="0.9" />
              </linearGradient>

              {/* Window Gradient - Tinted Glass */}
              <linearGradient id="window" x1="0" y1="0" x2="0" y2="45">
                <stop offset="0%" stopColor="#1a2332" />
                <stop offset="30%" stopColor="#2d3748" />
                <stop offset="60%" stopColor="#1a202c" />
                <stop offset="100%" stopColor="#0d1117" />
              </linearGradient>

              {/* Chrome Gradient */}
              <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="10">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Rim Metallic Gradient */}
              <linearGradient id="rim" x1="0" y1="0" x2="10" y2="10">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Headlight Beam */}
              <linearGradient id="headlightBeam" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Ground Shadow */}
            <ellipse
              cx="80"
              cy="62"
              rx="75"
              ry="7"
              fill="black"
              opacity="0.3"
              filter="url(#glow)"
            />

            {/* Headlight Beam Effect */}
            <motion.path
              d="M148 28 L220 20 L220 45 L148 38 Z"
              fill="url(#headlightBeam)"
              opacity="0.4"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Main Body Shape - Tesla Style Sedan */}
            <path
              d="M10 35 
                 Q10 25 25 22 
                 L45 20 
                 Q55 12 75 10 
                 L115 10 
                 Q135 12 145 20 
                 L155 25 
                 Q158 30 158 38 
                 Q158 48 150 52 
                 L130 54 
                 Q115 56 100 56 
                 L60 56 
                 Q35 56 20 54 
                 Q10 52 10 42 Z"
              fill="url(#carBody)"
              stroke="#b8860b"
              strokeWidth="0.5"
            />

            {/* Lower Body Shadow/Depth */}
            <path
              d="M12 40 
                 Q12 50 22 52 
                 L140 52 
                 Q152 50 156 40 
                 Q156 48 148 54 
                 L20 54 
                 Q10 52 10 42 Z"
              fill="url(#bodyShadow)"
              opacity="0.6"
            />

            {/* Cabin/Greenhouse - Continuous Glass */}
            <path
              d="M48 20 
                 L62 13 
                 L108 13 
                 L128 20 
                 L125 22 
                 L108 16 
                 L62 16 
                 L51 22 Z"
              fill="url(#window)"
              stroke="#334155"
              strokeWidth="1"
            />

            {/* Side Windows - B and C Pillars */}
            <path d="M65 16 L65 22" stroke="#0f172a" strokeWidth="3" />
            <path d="M95 16 L95 22" stroke="#0f172a" strokeWidth="2" />

            {/* Window Highlights */}
            <path
              d="M52 18 L60 14"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.3"
              strokeLinecap="round"
            />
            <path
              d="M110 14 L120 18"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0.2"
              strokeLinecap="round"
            />

            {/* Character Line - Body Crease */}
            <path
              d="M25 32 Q80 30 145 32"
              stroke="#b8860b"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />

            {/* Door Cut Lines */}
            <path
              d="M55 22 L55 50"
              stroke="#996d00"
              strokeWidth="1"
              opacity="0.4"
            />
            <path
              d="M105 22 L105 50"
              stroke="#996d00"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Flush Door Handles (Tesla Style) */}
            <rect
              x="58"
              y="30"
              width="12"
              height="3"
              rx="1.5"
              fill="url(#chrome)"
              opacity="0.9"
            />
            <rect
              x="108"
              y="30"
              width="12"
              height="3"
              rx="1.5"
              fill="url(#chrome)"
              opacity="0.9"
            />

            {/* Side Mirror */}
            <path
              d="M125 22 Q132 20 134 24 Q134 28 128 28 L125 26 Z"
              fill="url(#carBody)"
              stroke="#b8860b"
              strokeWidth="0.5"
            />
            <ellipse cx="130" cy="24" rx="3" ry="2" fill="url(#window)" />

            {/* Headlight - Sleek LED Strip */}
            <path
              d="M148 26 Q155 28 152 34 Q145 32 142 30 Z"
              fill="#e0f2fe"
              stroke="#bae6fd"
              strokeWidth="0.5"
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>

            {/* LED Daytime Running Light Detail */}
            <path
              d="M145 28 L150 29"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Taillight - Full Width LED */}
            <path
              d="M10 28 Q8 32 10 38 L15 36 L15 30 Z"
              fill="#dc2626"
              filter="url(#glow)"
            />
            <path
              d="M12 30 L12 36"
              stroke="#ff6b6b"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Front Wheel Arch */}
            <path
              d="M115 56 Q115 40 130 40 Q145 40 145 56"
              fill="none"
              stroke="#996d00"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Rear Wheel Arch */}
            <path
              d="M35 56 Q35 40 50 40 Q65 40 65 56"
              fill="none"
              stroke="#996d00"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Wheels - Realistic Sport Rims */}
            {/* Rear Wheel */}
            <g transform="translate(50, 56)">
              {/* Tire */}
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#1a1a1a"
                stroke="#0a0a0a"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="12"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Brake Caliper */}
              <path d="M-8 -8 Q0 -12 8 -8" fill="#dc2626" opacity="0.8" />

              {/* Rim */}
              <circle
                cx="0"
                cy="0"
                r="9"
                fill="url(#rim)"
                stroke="#64748b"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="3" fill="#1e293b" />

              {/* Spokes - 5 Spoke Design */}
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="0.4s"
                  repeatCount="indefinite"
                />
                {[0, 72, 144, 216, 288].map((angle) => (
                  <path
                    key={angle}
                    d="M0 -3 L0 -9 M-2 -2 L-7 -7 M2 -2 L7 -7"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2" fill="#94a3b8" />
              </g>

              {/* Tire Sidewall Detail */}
              <path
                d="M-10 -5 Q0 -12 10 -5"
                stroke="#333"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>

            {/* Front Wheel */}
            <g transform="translate(130, 56)">
              {/* Tire */}
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="#1a1a1a"
                stroke="#0a0a0a"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="0"
                r="12"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Brake Caliper */}
              <path d="M-8 -8 Q0 -12 8 -8" fill="#dc2626" opacity="0.8" />

              {/* Rim */}
              <circle
                cx="0"
                cy="0"
                r="9"
                fill="url(#rim)"
                stroke="#64748b"
                strokeWidth="1"
              />
              <circle cx="0" cy="0" r="3" fill="#1e293b" />

              {/* Spokes */}
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 0 0"
                  to="360 0 0"
                  dur="0.4s"
                  repeatCount="indefinite"
                />
                {[0, 72, 144, 216, 288].map((angle) => (
                  <path
                    key={angle}
                    d="M0 -3 L0 -9 M-2 -2 L-7 -7 M2 -2 L7 -7"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2" fill="#94a3b8" />
              </g>

              {/* Tire Sidewall Detail */}
              <path
                d="M-10 -5 Q0 -12 10 -5"
                stroke="#333"
                strokeWidth="1"
                fill="none"
                opacity="0.3"
              />
            </g>

            {/* Side Skirt - Aerodynamic */}
            <path
              d="M35 54 L115 54"
              stroke="#b8860b"
              strokeWidth="2"
              opacity="0.8"
            />
            <path
              d="M40 56 L110 56"
              stroke="#8b6914"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Underglow - Electric Yellow */}
            <ellipse
              cx="80"
              cy="65"
              rx="70"
              ry="5"
              fill="#ffd700"
              opacity="0.2"
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0.15;0.3;0.15"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </ellipse>

            {/* Reflection/Highlight on Body */}
            <path
              d="M25 25 Q80 20 140 25"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
              strokeLinecap="round"
            />
            <path
              d="M30 28 Q80 24 135 28"
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              opacity="0.2"
              strokeLinecap="round"
            />
          </svg>

          {/* Particle Sparks - Enhanced */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#ffd700] rounded-full"
                animate={{
                  x: [0, -60 - Math.random() * 40],
                  y: [0, (Math.random() - 0.5) * 30],
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                style={{
                  top: `${Math.random() * 20}px`,
                  boxShadow: "0 0 6px #ffd700",
                }}
              />
            ))}
          </div>

          {/* Wind Effect (front) */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 pl-2">
            <motion.div
              className="w-8 h-[1px] bg-gradient-to-r from-white/40 to-transparent"
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarAnimation;
