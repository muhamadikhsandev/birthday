"use client";

import { motion } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import LetterContent from "./LetterContent";

export default function LoveLetterSlide() {
  return (
    <motion.div
      key="love-letter"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div
        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-8 rounded-3xl"
        style={{
          background: "rgba(255, 253, 247, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 20px 60px rgba(201, 104, 104, 0.15), 0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="animate-float-up"
        >
          <PhotoFrame
            src="/images/foto-doi-cantik.webp"
            alt="Calon Istri Cantik 🦄"
          />
        </motion.div>

        {/* Letter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 min-w-0"
        >
          <LetterContent />
        </motion.div>
      </div>
    </motion.div>
  );
}
