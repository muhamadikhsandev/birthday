"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, ChevronDown, Play } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export default function BGMWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  const {
    currentTrack,
    isPlaying,
    volume,
    tracks,
    toggleBGM,
    changeTrack,
    setVolume,
    playSFX,
  } = useAudio();

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-20 right-4 z-30 flex flex-col-reverse items-end gap-2"
    >
      {/* Badge utama */}
      <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md border border-[#C96868]/30 rounded-full shadow-lg p-1.5 pr-3 transition-all hover:border-[#C96868]/50 hover:bg-white/85">
        {/* Tombol play/pause */}
        <button
          onClick={() => { playSFX(); toggleBGM(); }}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#C96868] text-white hover:bg-[#A84F4F] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? "Pause BGM" : "Play BGM"}
        >
          {isPlaying
            ? <Volume2 className="w-4 h-4" />
            : <VolumeX className="w-4 h-4" />
          }
        </button>

        {/* Info track */}
        <div className="flex flex-col px-1 max-w-[120px] md:max-w-[180px]">
          <span className="text-[9px] text-[#C96868]/60 font-semibold uppercase tracking-wider font-sans select-none">
            Now Playing
          </span>
          <span className="text-xs font-semibold text-[#C96868] truncate font-sans select-none">
            {currentTrack.name}
          </span>
        </div>

        {/* Tombol buka dropdown */}
        <button
          onClick={() => { playSFX(); setIsOpen(!isOpen); }}
          className="p-1 rounded-full text-[#C96868] hover:bg-[#C96868]/15 active:scale-95 transition-all cursor-pointer"
          title="Pilih lagu"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown playlist — muncul ke atas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-64 bg-white/90 backdrop-blur-lg border border-[#C96868]/20 rounded-2xl shadow-xl p-4 flex flex-col gap-3 font-sans"
          >
            {/* Header */}
            <div className="flex items-center gap-1.5 pb-1 border-b border-[#C96868]/10 select-none">
              <Music className="w-3.5 h-3.5 text-[#C96868]" />
              <span className="text-xs font-bold text-[#C96868] uppercase tracking-wider">
                BGM Playlist
              </span>
            </div>

            {/* Daftar lagu */}
            <div className="flex flex-col gap-1">
              {tracks.map((track) => {
                const isActive = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => { playSFX(); changeTrack(track); }}
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

            {/* Volume slider */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#C96868]/10">
              <button
                onClick={() => { playSFX(); setVolume(volume > 0 ? 0 : 0.45); }}
                className="text-[#C96868]/80 hover:text-[#C96868] transition-colors cursor-pointer"
                title={volume === 0 ? "Unmute" : "Mute"}
              >
                {volume === 0
                  ? <VolumeX className="w-4 h-4" />
                  : <Volume2 className="w-4 h-4" />
                }
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
  );
}
