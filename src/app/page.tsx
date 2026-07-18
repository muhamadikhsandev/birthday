"use client";

import { useState, useEffect } from "react";
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

  // Prevent scroll bounce
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

      {/* Slide content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {page === 1 && (
            <EnvelopeSlide key="slide-1" onOpen={() => setPage(2)} />
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
