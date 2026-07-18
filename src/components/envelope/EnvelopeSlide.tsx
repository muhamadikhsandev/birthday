"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface EnvelopeSlideProps {
  onOpen: () => void;
}

export default function EnvelopeSlide({ onOpen }: EnvelopeSlideProps) {
  return (
    <motion.div
      key="envelope"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center max-w-md px-6"
    >
      {/* Decorative top petals */}
      <div className="flex gap-2 mb-4 text-2xl">
        {[..."🌸🌷🌸"].map((char, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Envelope SVG */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="animate-pulse-glow mb-6"
      >
        <div className="relative w-48 h-36 mx-auto">
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
              border: "2px solid #D2B48C",
              boxShadow:
                "0 8px 32px rgba(201, 104, 104, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          />
          {/* Envelope flap (triangle top) */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: "50%",
              overflow: "hidden",
              borderRadius: "1rem 1rem 0 0",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "96px solid transparent",
                borderRight: "96px solid transparent",
                borderTop: "60px solid #EDD5B8",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            />
          </div>
          {/* Heart seal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl z-10"
            >
              💌
            </motion.span>
          </div>
          {/* Bottom V fold lines */}
          <div
            className="absolute bottom-0 inset-x-0"
            style={{
              height: "50%",
              background:
                "linear-gradient(135deg, transparent 50%, rgba(210,180,140,0.3) 50%)",
              borderRadius: "0 0 1rem 1rem",
            }}
          />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl md:text-6xl text-[#C96868] mb-3 leading-tight"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Happy Birthday
        <br />
        Sayang 🦄
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl md:text-3xl text-[#C96868]/90 mb-8 leading-relaxed"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Ada surat &amp; kado kecil buat kamu di dalem. Buka yuk? 🎁
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button
          id="btn-open-envelope"
          onClick={onOpen}
          size="lg"
          style={{ fontFamily: "var(--font-sacramento)" }}
          className="text-2xl md:text-3xl font-bold py-2 px-8"
        >
          Buka Surat dari Cans ✨
        </Button>
      </motion.div>

      {/* Bottom flower row */}
      <motion.div
        className="mt-8 flex gap-3 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["🌹", "💐", "🌸", "💐", "🌹"].map((icon, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
          >
            {icon}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
