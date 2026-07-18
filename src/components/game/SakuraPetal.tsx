"use client";

import { motion } from "framer-motion";

interface SakuraPetalProps {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  caught: boolean;
  onCatch: (id: number) => void;
}

const PETAL_EMOJIS = ["🌸", "🌷", "🌺", "🌼", "🪷"];

export default function SakuraPetal({
  id,
  x,
  delay,
  duration,
  size,
  caught,
  onCatch,
}: SakuraPetalProps) {
  const emoji = PETAL_EMOJIS[id % PETAL_EMOJIS.length];

  if (caught) return null;

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: `${x}%`, top: 0, fontSize: size }}
      initial={{ y: -60, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
        x: [0, 15, -15, 10, -10, 0],
      }}
      transition={{
        delay,
        duration,
        ease: "linear",
        x: { duration: duration * 0.5, repeat: Infinity, ease: "easeInOut" },
      }}
      onClick={() => onCatch(id)}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
    >
      {emoji}
    </motion.div>
  );
}
