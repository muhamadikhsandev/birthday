"use client";

import { motion } from "framer-motion";

// Bunga ringan yang jatuh
const PETAL_EMOJIS = ["🌸", "🌷", "🌺", "🪷", "🌼"];

// Partikel cahaya kecil (titik-titik berkilau)
const SPARKLE_COUNT = 8;

export default function BackgroundPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ── Lapisan gradien sinematik ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(255,182,193,0.18) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 80% 90%, rgba(210,180,140,0.15) 0%, transparent 55%)," +
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,240,230,0.1) 0%, transparent 70%)",
        }}
      />

      {/* ── Vignette tepi halus ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 55%, rgba(180,120,100,0.08) 100%)",
        }}
      />

      {/* ── Bunga jatuh ── */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="absolute text-xl"
          style={{
            left: `${(i * 8.33) % 100}%`,
            opacity: 0.15 + (i % 3) * 0.04,
            animationName: "float-down",
            animationDuration: `${9 + (i % 5)}s`,
            animationDelay: `${i * 0.9}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          {PETAL_EMOJIS[i % PETAL_EMOJIS.length]}
        </div>
      ))}

      {/* ── Partikel cahaya / sparkle halus ── */}
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${10 + i * 11}%`,
            top: `${15 + (i % 4) * 20}%`,
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            background:
              i % 3 === 0
                ? "rgba(201,104,104,0.35)"
                : i % 3 === 1
                ? "rgba(210,180,140,0.4)"
                : "rgba(255,200,200,0.3)",
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.4, 0.5],
            y: [0, -18, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
