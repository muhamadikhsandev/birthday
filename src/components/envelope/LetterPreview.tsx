"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface LetterPreviewProps {
  onContinue: () => void;
}

export default function LetterPreview({ onContinue }: LetterPreviewProps) {
  return (
    <motion.div
      key="letter-preview"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center max-w-sm px-4"
    >
      {/* Amplop mini + surat mengintip */}
      <div className="relative mb-2">
        <div
          className="w-36 h-24 rounded-xl mx-auto"
          style={{
            background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
            border: "2px solid #D2B48C",
            boxShadow: "0 4px 16px rgba(201,104,104,0.2)",
          }}
        />
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: -28, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-28 rounded-t-lg px-3 pt-3 pb-1"
          style={{
            background: "#FFFDF7",
            border: "1px solid #E8D5C0",
            boxShadow: "0 -2px 8px rgba(201,104,104,0.1)",
            zIndex: 10,
          }}
        >
          <p className="text-[#C96868] leading-snug"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "13px" }}>
            Dear Siffa Amelia...
          </p>
          <p className="text-[#C96868]/65 leading-snug mt-0.5"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "11px" }}>
            Selamat ulang tahun ya sayang! 🎂 Hari ini adalah hari yang paling spesial...
          </p>
          <div
            className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg"
            style={{ background: "linear-gradient(to bottom, transparent, #FFFDF7)" }}
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-[#C96868]/70 mt-8 mb-1 italic"
        style={{ fontFamily: "var(--font-sacramento)", fontSize: "20px" }}
      >
        masih ada lagi... 💌
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-[#C96868]/50 mb-6"
        style={{ fontFamily: "var(--font-sacramento)", fontSize: "17px" }}
      >
        tapi dulu ada mini game seru buat kamu dulu~
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      >
        <Button
          id="btn-continue-letter"
          onClick={onContinue}
          size="lg"
          style={{ fontFamily: "var(--font-sacramento)" }}
          className="text-2xl font-bold py-2 px-8"
        >
          Lanjutkan ✨
        </Button>
      </motion.div>
    </motion.div>
  );
}
