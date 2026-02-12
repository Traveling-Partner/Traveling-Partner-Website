// app/components/CarAnimation.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const CarAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-20 overflow-hidden">
      <motion.div
        className="absolute text-4xl"
        animate={{
          x: ["-100%", "100vw"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          },
        }}
      >
        🚗
      </motion.div>
    </div>
  );
};

export default CarAnimation;