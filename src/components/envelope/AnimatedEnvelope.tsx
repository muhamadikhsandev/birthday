"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedEnvelopeProps {
  isOpening: boolean;
}

// Stempel hati SVG gradient
function HeartSeal() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <defs>
        <radialGradient id="sealHeart" cx="50%" cy="38%" r="58%">
          <stop offset="0%" stopColor="#E88888" />
          <stop offset="100%" stopColor="#C96868" />
        </radialGradient>
      </defs>
      <path
        d="M17 30 C17 30 4 20 4 12 C4 7.5 7.5 4 12 4 C14.5 4 16.5 5.5 17 7.5 C17.5 5.5 19.5 4 22 4 C26.5 4 30 7.5 30 12 C30 20 17 30 17 30Z"
        fill="url(#sealHeart)"
      />
      <path d="M10 12 C10 10 11.5 8.8 13 8.8"
        stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function AnimatedEnvelope({ isOpening }: AnimatedEnvelopeProps) {
  return (
    <div className="relative w-52 h-40 mx-auto" style={{ perspective: "700px" }}>
      {/* Body amplop */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
          border: "2px solid #D2B48C",
          boxShadow: "0 10px 36px rgba(201,104,104,0.22), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      />

      {/* Surat mengintip saat dibuka */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.65, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-4 w-40 rounded-t-xl px-3 pt-3 pb-6 z-20"
            style={{
              background: "linear-gradient(155deg, #FFFDF7 65%, #FFF0E8)",
              border: "1px solid #E8D5C0",
              boxShadow: "0 -4px 20px rgba(201,104,104,0.15)",
            }}
          >
            <p className="text-[#C96868] text-center"
              style={{ fontFamily: "var(--font-sacramento)", fontSize: "16px" }}>
              Dear Siffa Amelia...
            </p>
            <div
              className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl"
              style={{ background: "linear-gradient(to bottom, transparent, #FFFDF7)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flap atas — rotasi 3D buka */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10"
        style={{
          height: "55%",
          overflow: "hidden",
          borderRadius: "1rem 1rem 0 0",
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateX: isOpening ? -175 : 0 }}
        transition={{ duration: 0.65, ease: [0.32, 0, 0.67, 0] }}
      >
        <div style={{
          width: 0, height: 0,
          borderLeft: "104px solid transparent",
          borderRight: "104px solid transparent",
          borderTop: "68px solid #EDD5B8",
          filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.08))",
        }} />
      </motion.div>

      {/* Stempel hati — hilang saat dibuka */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.12, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <HeartSeal />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lipatan bawah V */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: "50%",
          background: "linear-gradient(135deg, transparent 50%, rgba(210,180,140,0.22) 50%)",
          borderRadius: "0 0 1rem 1rem",
        }}
      />
    </div>
  );
}
