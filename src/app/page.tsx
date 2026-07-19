"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import EnvelopeSlide from "@/components/envelope/EnvelopeSlide";
import CatchSakuraGame from "@/components/game/CatchSakuraGame";
import LoveLetterSlide from "@/components/letter/LoveLetterSlide";
import { AudioProvider, useAudio } from "@/context/AudioContext";
import BackgroundPetals from "@/components/ui/BackgroundPetals";
import PageIndicator from "@/components/ui/PageIndicator";
import BGMWidget from "@/components/ui/BGMWidget";

type PageSection = 1 | 2 | 3;

// ─── Konten utama ────────────────────────────────────────────────────────────
function BirthdayAppContent() {
  const [page, setPage] = useState<PageSection>(1);
  const { playBGM } = useAudio();

  // Kunci scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Autoplay — coba langsung, fallback ke interaksi pertama
  useEffect(() => {
    playBGM();
    const onInteract = () => {
      playBGM();
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
    document.addEventListener("click", onInteract);
    document.addEventListener("touchstart", onInteract);
    return () => {
      document.removeEventListener("click", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top, #FFF0E6 0%, #FBF5EC 40%, #F5E6D3 100%)",
      }}
    >
      <BackgroundPetals />
      <BGMWidget />

      {/* Slide konten */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {page === 1 && (
            <EnvelopeSlide
              key="slide-1"
              onOpen={() => { playBGM(); setPage(2); }}
            />
          )}
          {page === 2 && (
            <CatchSakuraGame
              key="slide-2"
              onComplete={() => setPage(3)}
            />
          )}
          {page === 3 && <LoveLetterSlide key="slide-3" />}
        </AnimatePresence>
      </div>

      <PageIndicator current={page} />
    </main>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function BirthdayApp() {
  return (
    <AudioProvider>
      <BirthdayAppContent />
    </AudioProvider>
  );
}
