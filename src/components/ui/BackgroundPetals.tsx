"use client";

import { motion } from "framer-motion";

const PETALS = ["🌸", "🌷", "🌺", "🪷", "🌼"];

export default function BackgroundPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute text-xl opacity-20"
          style={{
            left: `${(i * 8.33) % 100}%`,
            animationName: "float-down",
            animationDuration: `${8 + (i % 5)}s`,
            animationDelay: `${i * 0.8}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          {PETALS[i % PETALS.length]}
        </div>
      ))}
    </div>
  );
}
