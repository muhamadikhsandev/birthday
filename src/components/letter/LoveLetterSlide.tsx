"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import LetterTypingView from "./LetterTypingView";
import LetterReplyForm from "./LetterReplyForm";

interface LoveLetterSlideProps {
  onNavigate: () => void;
}

export default function LoveLetterSlide({ onNavigate }: LoveLetterSlideProps) {
  const [view, setView] = useState<"reading" | "replying">("reading");

  return (
    <motion.div
      key="love-letter"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-full flex items-stretch"
    >
      {/* ── Foto menyatu di kiri (hanya desktop) ── */}
      <div
        className="hidden md:block absolute left-0 top-0 bottom-0 w-[38%] pointer-events-none"
        aria-hidden="true"
      >
        {/* Foto dengan mask gradient agar menyatu */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/images/photo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            filter: "brightness(0.9) saturate(0.85)",
          }}
        />
        {/* Warm overlay agar nyatu sama tema warna */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(255,240,230,0.25) 0%, rgba(255,240,230,0) 70%)",
          }}
        />
      </div>

      {/* ── Foto mobile (di atas teks, circular portrait) ── */}
      <div className="md:hidden absolute top-4 right-4 z-10 pointer-events-none">
        <div
          className="w-20 h-20 rounded-full border-2 border-[#C96868]/30 overflow-hidden shadow-lg"
          style={{ boxShadow: "0 4px 20px rgba(201,104,104,0.25)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/photo.png"
            alt="Siffa"
            className="w-full h-full object-cover object-top"
            style={{ filter: "brightness(0.95) saturate(0.9)" }}
          />
        </div>
      </div>

      {/* ── Konten utama surat ── */}
      <div className="relative z-10 flex flex-col w-full md:ml-[30%] max-w-2xl mx-auto md:mx-0 px-5 md:px-8 py-6 justify-center h-full">
        {/* Tombol navigasi */}
        <button
          onClick={onNavigate}
          className="absolute top-4 left-4 md:left-6 flex items-center gap-1.5 text-xs text-[#C96868]/60 hover:text-[#C96868] transition-colors font-sans font-semibold z-20"
        >
          <LayoutGrid className="w-4 h-4" />
          Halaman lain
        </button>

        <AnimatePresence mode="wait">
          {view === "reading" ? (
            <LetterTypingView
              key="typing-view"
              onReplyClick={() => setView("replying")}
            />
          ) : (
            <LetterReplyForm
              key="reply-form"
              onBack={() => setView("reading")}
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
