"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface EnvelopeSlideProps {
  onOpen: () => void;
}

type Step = "idle" | "opening" | "preview";

// ─── SVG Arrow Dekoratif (ornamental, bukan flat icon) ────────────────────────
function OrnamentalArrow() {
  return (
    <svg
      width="48"
      height="80"
      viewBox="0 0 48 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="shaftGrad" x1="24" y1="12" x2="24" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C96868" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D2B48C" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="heartArrowGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#E88888" />
          <stop offset="100%" stopColor="#C96868" />
        </radialGradient>
        <linearGradient id="headGrad" x1="10" y1="58" x2="38" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C96868" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D2B48C" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Hati di atas */}
      <path
        d="M24 12 C21 8 15 9 14 13 C13 17 17 20 24 25 C31 20 35 17 34 13 C33 9 27 8 24 12Z"
        fill="url(#heartArrowGrad)"
        opacity="0.85"
      />
      {/* Highlight hati */}
      <path
        d="M17 14 C17 12.5 18.5 11.5 20 11.5"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Batang dengan gradient */}
      <rect x="22" y="24" width="4" height="32" rx="2" fill="url(#shaftGrad)" />

      {/* Daun kiri */}
      <path
        d="M23 40 Q12 33 5 40 Q12 47 23 40Z"
        fill="#D2B48C"
        opacity="0.55"
      />
      {/* Daun kanan */}
      <path
        d="M25 40 Q36 33 43 40 Q36 47 25 40Z"
        fill="#D2B48C"
        opacity="0.55"
      />
      {/* Aksen titik kiri kanan */}
      <circle cx="6" cy="40" r="2" fill="#C96868" opacity="0.35" />
      <circle cx="42" cy="40" r="2" fill="#C96868" opacity="0.35" />

      {/* Kepala panah bergaya */}
      <path
        d="M12 58 L24 76 L36 58"
        fill="none"
        stroke="url(#headGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Aksen lekuk samping kepala panah */}
      <path
        d="M12 58 Q8 53 10 47"
        fill="none"
        stroke="#D2B48C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M36 58 Q40 53 38 47"
        fill="none"
        stroke="#D2B48C"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

// ─── Amplop dengan animasi buka tutup ─────────────────────────────────────────
function AnimatedEnvelope({ isOpening }: { isOpening: boolean }) {
  return (
    <div
      className="relative w-52 h-40 mx-auto"
      style={{ perspective: "700px" }}
    >
      {/* Body amplop */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(145deg, #FFF8F0, #F5E6D3)",
          border: "2px solid #D2B48C",
          boxShadow:
            "0 10px 36px rgba(201,104,104,0.22), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      />

      {/* Surat yang mengintip saat dibuka */}
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
            <p
              className="text-[#C96868] text-center"
              style={{ fontFamily: "var(--font-sacramento)", fontSize: "16px" }}
            >
              Dear Siffa Amelia...
            </p>
            {/* Fade teks terpotong */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl"
              style={{
                background: "linear-gradient(to bottom, transparent, #FFFDF7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flap atas — animasi buka */}
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
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "104px solid transparent",
            borderRight: "104px solid transparent",
            borderTop: "68px solid #EDD5B8",
            filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.08))",
          }}
        />
      </motion.div>

      {/* Stempel hati SVG — hilang saat dibuka */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.12, 1], opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
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
              <path
                d="M10 12 C10 10 11.5 8.8 13 8.8"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lipatan bawah V */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: "50%",
          background:
            "linear-gradient(135deg, transparent 50%, rgba(210,180,140,0.22) 50%)",
          borderRadius: "0 0 1rem 1rem",
        }}
      />
    </div>
  );
}

// ─── Pratinjau surat terpotong ─────────────────────────────────────────────────
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
          <p
            className="text-[#C96868] leading-snug"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "13px" }}
          >
            Dear Siffa Amelia...
          </p>
          <p
            className="text-[#C96868]/65 leading-snug mt-0.5"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "11px" }}
          >
            Selamat ulang tahun ya sayang! 🎂 Hari ini adalah hari yang paling
            spesial...
          </p>
          <div
            className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg"
            style={{
              background: "linear-gradient(to bottom, transparent, #FFFDF7)",
            }}
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

// ─── Komponen utama ────────────────────────────────────────────────────────────
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
          {/* ── Teks Happy Birthday di atas ── */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-6xl text-[#C96868] leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Happy Birthday
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-xl md:text-2xl text-[#C96868]/75 mb-6 mt-1"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Ada surat &amp; kado kecil buat kamu di dalem 🎁
          </motion.p>

          {/* ── Amplop di tengah ── */}
          <motion.div
            animate={step === "idle" ? { y: [0, -7, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="animate-pulse-glow mb-5"
          >
            <AnimatedEnvelope isOpening={step === "opening"} />
          </motion.div>

          {/* ── Panah ornamental ── */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 opacity-85"
          >
            <OrnamentalArrow />
          </motion.div>

          {/* ── Tombol buka ── */}
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
