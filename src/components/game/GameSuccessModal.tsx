"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function GameSuccessModal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-3xl z-20 px-6"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white/95 border border-[#C96868]/30 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-4"
      >
        {/* Animated Check Ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-[#C96868]/10 border-2 border-[#C96868] flex items-center justify-center text-[#C96868] shadow-inner"
        >
          <Check className="w-8 h-8 stroke-[3]" />
        </motion.div>

        <h3 className="text-3xl font-bold text-[#C96868] font-sans">
          Berhasil! 🌸
        </h3>
        <p className="text-sm font-medium text-[#C96868]/70 leading-relaxed font-sans">
          Hebat banget sayang! Bunga sakura berhasil ditangkap semua. Sekarang ayo lanjut buka surat cintanya~
        </p>
      </motion.div>
    </motion.div>
  );
}
