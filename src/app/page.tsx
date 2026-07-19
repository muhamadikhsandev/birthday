"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";

import EnvelopeSlide from "@/components/envelope/EnvelopeSlide";
import CatchSakuraGame from "@/components/game/CatchSakuraGame";
import LoveLetterSlide from "@/components/letter/LoveLetterSlide";
import GiftSlide from "@/components/gift/GiftSlide";
import { AudioProvider, useAudio } from "@/context/AudioContext";
import BackgroundPetals from "@/components/ui/BackgroundPetals";
import PageIndicator from "@/components/ui/PageIndicator";
import BGMWidget from "@/components/ui/BGMWidget";
import PageNavigator from "@/components/ui/PageNavigator";
import FullscreenButton from "@/components/ui/FullscreenButton";

type PageSection = 1 | 2 | 3 | 4;

// ─── Konten utama ────────────────────────────────────────────────────────────
function BirthdayAppContent() {
  const [page, setPage] = useState<PageSection>(1);
  const [unlockedPages, setUnlockedPages] = useState<PageSection[]>([1]);
  const [showNavigator, setShowNavigator] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const { playBGM, playSFX } = useAudio();

  // Kunci scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Unlock halaman baru saat berpindah
  const navigateTo = (nextPage: PageSection) => {
    setPage(nextPage);
    setUnlockedPages((prev) =>
      prev.includes(nextPage) ? prev : [...prev, nextPage]
    );
  };

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top, #FFF0E6 0%, #FBF5EC 40%, #F5E6D3 100%)",
      }}
    >
      <BackgroundPetals />
      
      {/* Hanya tampilkan widget BGM jika audio sudah dimulai */}
      {audioStarted && <BGMWidget />}

      {/* Page Navigator Modal */}
      {showNavigator && (
        <PageNavigator
          unlockedPages={unlockedPages}
          currentPage={page}
          onNavigate={navigateTo}
          onClose={() => setShowNavigator(false)}
        />
      )}

      {/* Slide konten */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!audioStarted ? (
            <motion.div
              key="audio-starter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => {
                setAudioStarted(true);
                playBGM();
                playSFX();
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg border border-[#C96868]/20"
              >
                <Heart className="w-12 h-12 text-[#C96868] fill-current" />
              </motion.div>
              <p
                className="mt-6 text-3xl text-[#C96868] font-bold animate-pulse text-center select-none"
                style={{ fontFamily: "var(--font-sacramento)" }}
              >
                Sentuh untuk Mulai 💖
              </p>
            </motion.div>
          ) : (
            <>
              {page === 1 && (
                <EnvelopeSlide
                  key="slide-1"
                  onOpen={() => { playBGM(); navigateTo(2); }}
                />
              )}
              {page === 2 && (
                <CatchSakuraGame
                  key="slide-2"
                  onComplete={() => navigateTo(3)}
                />
              )}
              {page === 3 && (
                <GiftSlide
                  key="slide-3"
                  onNavigate={() => navigateTo(4)}
                />
              )}
              {page === 4 && (
                <LoveLetterSlide
                  key="slide-4"
                  onNavigate={() => setShowNavigator(true)}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {audioStarted && <PageIndicator current={page} />}
      {audioStarted && <FullscreenButton />}
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
