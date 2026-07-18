"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SakuraPetal from "./SakuraPetal";

const TOTAL_SAKURA = 5;

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  caught: boolean;
}

function generatePetals(): Petal[] {
  return Array.from({ length: TOTAL_SAKURA }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    delay: i * 1.2,
    duration: 4 + Math.random() * 3,
    size: 28 + Math.random() * 16,
    caught: false,
  }));
}

interface CatchSakuraGameProps {
  onComplete: () => void;
}

export default function CatchSakuraGame({ onComplete }: CatchSakuraGameProps) {
  const [petals, setPetals] = useState<Petal[]>(generatePetals);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [catchEffects, setCatchEffects] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleCatch = useCallback(
    (id: number) => {
      if (showSuccess) return;
      setPetals((prev) =>
        prev.map((p) => (p.id === id ? { ...p, caught: true } : p))
      );
      // Add catch effect
      const petal = petals.find((p) => p.id === id);
      if (petal) {
        setCatchEffects((prev) => [
          ...prev,
          { id: Date.now(), x: petal.x, y: 30 },
        ]);
        setTimeout(() => {
          setCatchEffects((prev) => prev.filter((e) => e.id !== Date.now()));
        }, 800);
      }
      setScore((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_SAKURA) {
          setShowSuccess(true);
          setTimeout(() => onComplete(), 1800);
        }
        return next;
      });
    },
    [petals, showSuccess, onComplete]
  );

  // Reset petals after all fall (loop)
  useEffect(() => {
    if (score >= TOTAL_SAKURA) return;
    const allFallen = petals.every((p) => p.caught);
    if (allFallen && score < TOTAL_SAKURA) {
      // shouldn't happen since we catch them, but safety reset
      setTimeout(() => setPetals(generatePetals()), 500);
    }
  }, [petals, score]);

  return (
    <motion.div
      key="mini-game"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full h-full flex flex-col items-center justify-start pt-8"
    >
      {/* Header */}
      <div className="text-center z-10 mb-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#C96868] mb-1"
          style={{ fontFamily: "var(--font-sacramento)" }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tangkap 5 Bunga Sakura! 🌸
        </motion.h2>
        <p
          className="text-2xl text-[#C96868]/80 mt-1"
          style={{ fontFamily: "var(--font-sacramento)" }}
        >
          Klik bunga yang jatuh buat nangkapnya
        </p>
      </div>

      {/* Score bar */}
      <div className="flex items-center gap-2 mb-4 z-10">
        {Array.from({ length: TOTAL_SAKURA }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8 }}
            animate={{
              scale: i < score ? [1, 1.4, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-2xl"
          >
            {i < score ? "🌸" : "⬜"}
          </motion.div>
        ))}
        <span
          className="ml-2 text-2xl font-bold text-[#C96868]"
          style={{ fontFamily: "var(--font-sacramento)" }}
        >
          {score}/{TOTAL_SAKURA}
        </span>
      </div>

      {/* Game area */}
      <div
        className="relative w-full flex-1 overflow-hidden"
        style={{ maxHeight: "60vh" }}
      >
        {/* Background hint */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <span className="text-9xl">🌸</span>
        </div>

        {/* Falling petals */}
        {petals.map((petal) => (
          <SakuraPetal key={petal.id} {...petal} onCatch={handleCatch} />
        ))}

        {/* Catch effects */}
        <AnimatePresence>
          {catchEffects.map((effect) => (
            <motion.div
              key={effect.id}
              className="absolute pointer-events-none text-xl"
              style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, y: -40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              ✨
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl z-20"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-6xl mb-3"
              >
                🎉
              </motion.div>
              <p
                className="text-4xl font-bold text-[#C96868]"
                style={{ fontFamily: "var(--font-sacramento)" }}
              >
                Yay, kamu berhasil! 🌸
              </p>
              <p
                className="text-2xl text-[#C96868]/80 mt-1"
                style={{ fontFamily: "var(--font-sacramento)" }}
              >
                Membuka surat cinta...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bunny mascot */}
      <motion.div
        className="text-4xl mt-2 z-10"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        🐰
      </motion.div>
    </motion.div>
  );
}
