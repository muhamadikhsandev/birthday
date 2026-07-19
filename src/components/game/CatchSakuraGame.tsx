"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SakuraPetal from "./SakuraPetal";
import GameSuccessModal from "./GameSuccessModal";

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
    { id: number; x: number; y: number; count: number }[]
  >([]);

  const handleCatch = useCallback(
    (id: number) => {
      if (showSuccess) return;

      // Play click sound (sfx_love_story)
      if (typeof window !== "undefined") {
        const catchAudio = new Audio("/assets/sfx/sfx_love_story.ogg");
        catchAudio.volume = 0.55;
        catchAudio.play().catch((err) => console.log("Sound play error:", err));
      }

      // Find the caught petal to get its position for the catch effect
      const petal = petals.find((p) => p.id === id);

      setScore((prev) => {
        const next = prev + 1;

        if (petal) {
          setCatchEffects((prevEffects) => [
            ...prevEffects,
            { id: Date.now(), x: petal.x, y: 30, count: next },
          ]);
          setTimeout(() => {
            setCatchEffects((prevEffects) => prevEffects.filter((e) => e.id !== Date.now()));
          }, 800);
        }

        if (next >= TOTAL_SAKURA) {
          setShowSuccess(true);

          // Play success sound (sfx_sakura)
          if (typeof window !== "undefined") {
            const successAudio = new Audio("/assets/sfx/sfx_sakura.ogg");
            successAudio.volume = 0.65;
            successAudio.play().catch((err) => console.log("Success sound play error:", err));
          }

          setTimeout(() => onComplete(), 2800);
        }
        return next;
      });

      // Respawn the caught petal as a new one
      setPetals((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                id: Math.random(),
                x: 10 + Math.random() * 80,
                delay: 0.1 + Math.random() * 0.4,
                duration: 4 + Math.random() * 3,
                size: 28 + Math.random() * 16,
                caught: false,
              }
            : p
        )
      );
    },
    [petals, showSuccess, onComplete]
  );

  const handleMiss = useCallback(
    (id: number) => {
      if (showSuccess) return;
      setPetals((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                id: Math.random(),
                x: 10 + Math.random() * 80,
                delay: 0.1 + Math.random() * 0.4,
                duration: 4 + Math.random() * 3,
                size: 28 + Math.random() * 16,
                caught: false,
              }
            : p
        )
      );
    },
    [showSuccess]
  );

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
          <SakuraPetal
            key={petal.id}
            {...petal}
            onCatch={handleCatch}
            onMiss={handleMiss}
          />
        ))}

        {/* Catch effects */}
        <AnimatePresence>
          {catchEffects.map((effect) => (
            <motion.div
              key={effect.id}
              className="absolute pointer-events-none font-bold text-lg text-[#C96868] drop-shadow-md font-sans"
              style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
              initial={{ opacity: 1, scale: 0.8, y: 0 }}
              animate={{ opacity: 0, scale: 2.2, y: -50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {effect.count}X
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {showSuccess && <GameSuccessModal />}
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

