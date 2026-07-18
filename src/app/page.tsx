"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeSlide from "@/components/envelope/EnvelopeSlide";
import CatchSakuraGame from "@/components/game/CatchSakuraGame";
import LoveLetterSlide from "@/components/letter/LoveLetterSlide";

type PageSection = 1 | 2 | 3;

// Floating background petals
function BackgroundPetals() {
  const petals = ["🌸", "🌷", "🌺", "🪷", "🌼"];
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
          {petals[i % petals.length]}
        </div>
      ))}
    </div>
  );
}

// Page indicator dots
function PageIndicator({ current }: { current: PageSection }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {([1, 2, 3] as PageSection[]).map((p) => (
        <div
          key={p}
          className="rounded-full transition-all duration-300"
          style={{
            width: current === p ? 24 : 8,
            height: 8,
            background: current === p ? "#C96868" : "#D2B48C",
          }}
        />
      ))}
    </div>
  );
}

export default function BirthdayApp() {
  const [page, setPage] = useState<PageSection>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Prevent scroll bounce
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Initialize background music
  useEffect(() => {
    const audio = new Audio("/A_Lifetime_in_Your_Smile.ogg");
    audio.loop = true;
    audio.volume = 0.45; // Pleasant, clear, non-overpowering volume level
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  const playBGM = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay prevented, waiting for user interaction:", err));
    }
  };

  const toggleBGM = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Failed to play audio:", err));
    }
  };

  return (
    <main
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at top, #FFF0E6 0%, #FBF5EC 40%, #F5E6D3 100%)",
      }}
    >
      {/* Background floating petals */}
      <BackgroundPetals />

      {/* Floating BGM Toggle Button */}
      <button
        onClick={toggleBGM}
        className="fixed top-6 right-6 z-30 w-12 h-12 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-md border border-white/80 shadow-lg text-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title={isPlaying ? "Mute BGM" : "Play BGM"}
      >
        {isPlaying ? "🎵" : "🔇"}
      </button>

      {/* Slide content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {page === 1 && (
            <EnvelopeSlide
              key="slide-1"
              onOpen={() => {
                playBGM();
                setPage(2);
              }}
            />
          )}
          {page === 2 && (
            <CatchSakuraGame key="slide-2" onComplete={() => setPage(3)} />
          )}
          {page === 3 && <LoveLetterSlide key="slide-3" />}
        </AnimatePresence>
      </div>

      {/* Page indicator */}
      <PageIndicator current={page} />
    </main>
  );
}
