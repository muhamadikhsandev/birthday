"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface EnvelopeSlideProps {
  onOpen: () => void;
}

// ─── Komponen kecil ───────────────────────────────────────────────────────────

function FloatingPetals() {
  return (
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
  );
}

function EnvelopeIllustration() {
  return (
    <div className="relative w-48 h-36 mx-auto">
      {/* Body amplop */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
          border: "2px solid #D2B48C",
          boxShadow:
            "0 8px 32px rgba(201, 104, 104, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      />
      {/* Flap atas (segitiga) */}
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: "50%", overflow: "hidden", borderRadius: "1rem 1rem 0 0" }}
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
      {/* Stempel hati */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl z-10"
        >
          💌
        </motion.span>
      </div>
      {/* Lipatan bawah */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: "50%",
          background: "linear-gradient(135deg, transparent 50%, rgba(210,180,140,0.3) 50%)",
          borderRadius: "0 0 1rem 1rem",
        }}
      />
    </div>
  );
}

// Pratinjau surat yang keluar setengah dari amplop
function LetterPreview({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      key="letter-preview"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center max-w-sm px-4"
    >
      {/* Amplop kecil di atas */}
      <div className="relative mb-2">
        <div
          className="w-36 h-24 rounded-xl mx-auto"
          style={{
            background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
            border: "2px solid #D2B48C",
            boxShadow: "0 4px 16px rgba(201, 104, 104, 0.2)",
          }}
        />
        {/* Kertas surat keluar dari amplop */}
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
          <p
            className="text-[10px] text-[#C96868] leading-relaxed text-left"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "13px" }}
          >
            Dear Sayangku...
          </p>
          <p
            className="text-[9px] text-[#C96868]/70 leading-snug text-left mt-0.5"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "11px" }}
          >
            Selamat ulang tahun ya sayang! 🎂 Hari ini adalah hari yang paling spesial buat aku...
          </p>
          {/* Efek teks terpotong */}
          <div
            className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg"
            style={{
              background: "linear-gradient(to bottom, transparent, #FFFDF7)",
            }}
          />
        </motion.div>
      </div>

      {/* Label "sambung..." */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-base text-[#C96868]/70 mt-8 mb-1 italic"
        style={{ fontFamily: "var(--font-sacramento)", fontSize: "20px" }}
      >
        masih ada lagi... 💌
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-sm text-[#C96868]/50 mb-6"
        style={{ fontFamily: "var(--font-sacramento)", fontSize: "17px" }}
      >
        tapi dulu ada mini game seru buat kamu dulu~
      </motion.p>

      {/* Tombol lanjutkan */}
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

// ─── Komponen utama ────────────────────────────────────────────────────────────

export default function EnvelopeSlide({ onOpen }: EnvelopeSlideProps) {
  const [step, setStep] = useState<"idle" | "preview">("idle");

  return (
    <AnimatePresence mode="wait">
      {/* Step 1 — tampilan awal amplop */}
      {step === "idle" && (
        <motion.div
          key="envelope-idle"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center max-w-md px-6"
        >
          <FloatingPetals />

          {/* Amplop */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="animate-pulse-glow mb-6"
          >
            <EnvelopeIllustration />
          </motion.div>

          {/* Judul */}
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

          {/* Tombol buka — trigger preview surat */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Button
              id="btn-open-envelope"
              onClick={() => setStep("preview")}
              size="lg"
              style={{ fontFamily: "var(--font-sacramento)" }}
              className="text-2xl md:text-3xl font-bold py-2 px-8"
            >
              Buka Surat dari Cans ✨
            </Button>
          </motion.div>

          {/* Bunga bawah */}
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
      )}

      {/* Step 2 — pratinjau surat terpotong */}
      {step === "preview" && (
        <LetterPreview key="letter-preview" onContinue={onOpen} />
      )}
    </AnimatePresence>
  );
}
