"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import EnvelopeSlide from "@/components/envelope/EnvelopeSlide";
import CatchSakuraGame from "@/components/game/CatchSakuraGame";
import LoveLetterSlide from "@/components/letter/LoveLetterSlide";
import { AudioProvider, useAudio } from "@/context/AudioContext";
import { Music, Volume2, VolumeX, ChevronDown, Play, Pause } from "lucide-react";

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

function BirthdayAppContent() {
  const [page, setPage] = useState<PageSection>(1);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const {
    currentTrack,
    isPlaying,
    volume,
    tracks,
    playBGM,
    toggleBGM,
    changeTrack,
    setVolume,
    playSFX,
  } = useAudio();

  // Prevent scroll bounce
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Click outside to close music selection widget
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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

      {/* Floating BGM Controller Widget */}
      <div ref={widgetRef} className="fixed top-6 right-6 z-30 flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md border border-[#C96868]/30 rounded-full shadow-lg p-1.5 pr-3 transition-all hover:border-[#C96868]/50 hover:bg-white/85">
          <button
            onClick={() => {
              playSFX();
              toggleBGM();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[#C96868] text-white hover:bg-[#A84F4F] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? "Pause BGM" : "Play BGM"}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
          
          <div className="flex flex-col px-1 max-w-[120px] md:max-w-[180px]">
            <span className="text-[9px] text-[#C96868]/60 font-semibold uppercase tracking-wider font-sans select-none">
              Now Playing
            </span>
            <span className="text-xs font-semibold text-[#C96868] truncate font-sans select-none">
              {currentTrack.name}
            </span>
          </div>

          <button
            onClick={() => {
              playSFX();
              setIsOpen(!isOpen);
            }}
            className="p-1 rounded-full text-[#C96868] hover:bg-[#C96868]/15 active:scale-95 transition-all cursor-pointer"
            title="Music Settings"
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Dropdown BGM List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-64 bg-white/90 backdrop-blur-lg border border-[#C96868]/20 rounded-2xl shadow-xl p-4 flex flex-col gap-3 font-sans"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#C96868]/10 select-none">
                <span className="text-xs font-bold text-[#C96868] flex items-center gap-1.5 uppercase tracking-wider">
                  <Music className="w-3.5 h-3.5" /> BGM Playlist
                </span>
              </div>

              {/* Track List */}
              <div className="flex flex-col gap-1">
                {tracks.map((track) => {
                  const isActive = track.id === currentTrack.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => {
                        playSFX();
                        changeTrack(track);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-[#C96868]/15 text-[#C96868]"
                          : "text-[#C96868]/70 hover:bg-[#C96868]/5 hover:text-[#C96868]"
                      }`}
                    >
                      <span className="truncate pr-2">{track.name}</span>
                      {isActive && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-0.75 bg-[#C96868] rounded-full animate-music-bar-1" style={{ height: "100%" }} />
                          <span className="w-0.75 bg-[#C96868] rounded-full animate-music-bar-2" style={{ height: "60%" }} />
                          <span className="w-0.75 bg-[#C96868] rounded-full animate-music-bar-3" style={{ height: "80%" }} />
                        </span>
                      ) : isActive ? (
                        <Play className="w-3 h-3 text-[#C96868]" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#C96868]/10">
                <button 
                  onClick={() => {
                    playSFX();
                    setVolume(volume > 0 ? 0 : 0.45);
                  }}
                  className="text-[#C96868]/80 hover:text-[#C96868] transition-colors cursor-pointer"
                  title={volume === 0 ? "Unmute" : "Mute"}
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-[#C96868] h-1 bg-[#C96868]/20 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] font-bold text-[#C96868]/70 w-6 text-right select-none">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

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

export default function BirthdayApp() {
  return (
    <AudioProvider>
      <BirthdayAppContent />
    </AudioProvider>
  );
}

