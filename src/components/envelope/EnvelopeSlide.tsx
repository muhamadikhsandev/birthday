"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import Button from "@/components/ui/Button";
import OrnamentalArrow from "./OrnamentalArrow";
import AnimatedEnvelope from "./AnimatedEnvelope";
import LetterPreview from "./LetterPreview";

interface EnvelopeSlideProps {
  onOpen: () => void;
}

type Step = "idle" | "opening" | "preview";

export default function EnvelopeSlide({ onOpen }: EnvelopeSlideProps) {
  const [step, setStep] = useState<Step>("idle");

  // Setelah animasi buka selesai → pindah ke preview
  useEffect(() => {
    if (step !== "opening") return;
    const t = setTimeout(() => setStep("preview"), 1700);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <AnimatePresence mode="wait">
      {(step === "idle" || step === "opening") && (
        <motion.div
          key="envelope-main"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-md w-full px-6 -mt-10"
        >
          {/* Judul */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-6xl text-[#C96868] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Happy Birthday
          </motion.h1>

          {/* Subtitle — icon Gift + teks satu baris */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex items-center justify-center gap-1.5 text-lg md:text-xl text-[#C96868]/75 mb-6 mt-1 whitespace-nowrap"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Ada surat &amp; kado kecil buat kamu
            <Gift className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-[#C96868]/75" />
          </motion.p>

          {/* Amplop */}
          <motion.div
            animate={step === "idle" ? { y: [0, -7, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="animate-pulse-glow mb-5"
          >
            <AnimatedEnvelope isOpening={step === "opening"} />
          </motion.div>

          {/* Panah ornamental */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 opacity-85"
          >
            <OrnamentalArrow />
          </motion.div>

          {/* Tombol buka */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              id="btn-open-envelope"
              onClick={() => setStep("opening")}
              size="lg"
              disabled={step === "opening"}
              style={{ fontFamily: "var(--font-sacramento)" }}
              className="text-2xl md:text-3xl font-bold py-2 px-8 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Buka Surat dari Cans ✨
            </Button>
          </motion.div>
        </motion.div>
      )}

      {step === "preview" && (
        <LetterPreview key="letter-preview" onContinue={onOpen} />
      )}
    </AnimatePresence>
  );
}
