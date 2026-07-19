"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

export interface Track {
  id: string;
  name: string;
  url: string;
}

export const TRACKS: Track[] = [
  { id: "lifetime-smile", name: "A Lifetime in Your Smile", url: "/assets/bgm/A_Lifetime_in_Your_Smile.ogg" },
  { id: "chapter-love",   name: "A Chapter of Love",        url: "/assets/bgm/A_Chapter_of_Love.ogg"       },
  { id: "lifetime-bday",  name: "A Lifetime of Birthdays",  url: "/assets/bgm/A_Lifetime_of_Birthdays.ogg" },
];

// Preloaded SFX pool — instansiatif saat mount agar tidak ada delay saat play
const SFX_URL = "/assets/sfx/Minimal_Romantic_UI_Tap.ogg";
const SFX_POOL_SIZE = 3;

function createSFXPool(): HTMLAudioElement[] {
  return Array.from({ length: SFX_POOL_SIZE }, () => {
    const a = new Audio(SFX_URL);
    a.volume = 0.6;
    a.preload = "auto";
    return a;
  });
}

interface AudioContextType {
  currentTrack: Track;
  isPlaying: boolean;
  volume: number;
  tracks: Track[];
  playBGM: () => void;
  pauseBGM: () => void;
  toggleBGM: () => void;
  changeTrack: (track: Track) => void;
  setVolume: (vol: number) => void;
  playSFX: () => void;
}

const AudioCtx = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.45);

  const bgmRef  = useRef<HTMLAudioElement | null>(null);
  const sfxPool = useRef<HTMLAudioElement[]>([]);
  const sfxIdx  = useRef(0);

  // Inisialisasi BGM + SFX pool sekali saat mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // BGM — preload agar langsung siap
    const bgm = new Audio(TRACKS[0].url);
    bgm.loop    = true;
    bgm.volume  = 0.45;
    bgm.preload = "auto";
    bgmRef.current = bgm;

    // SFX pool
    sfxPool.current = createSFXPool();

    return () => {
      bgm.pause();
      bgm.src = "";
    };
  }, []);

  const playBGM = () => {
    if (!bgmRef.current) return;
    bgmRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("BGM blocked:", err));
  };

  const pauseBGM = () => {
    bgmRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleBGM = () => (isPlaying ? pauseBGM() : playBGM());

  const changeTrack = (track: Track) => {
    setCurrentTrack(track);
    if (!bgmRef.current) return;
    bgmRef.current.pause();
    bgmRef.current.src    = track.url;
    bgmRef.current.volume = volume;
    bgmRef.current.load();
    bgmRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const setVolume = (vol: number) => {
    const safe = Math.max(0, Math.min(1, vol));
    setVolumeState(safe);
    if (bgmRef.current) bgmRef.current.volume = safe;
  };

  // Round-robin pool agar tidak ada gap antar klik cepat
  const playSFX = () => {
    const pool = sfxPool.current;
    if (!pool.length) return;
    const el = pool[sfxIdx.current % pool.length];
    sfxIdx.current++;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return (
    <AudioCtx.Provider value={{
      currentTrack, isPlaying, volume, tracks: TRACKS,
      playBGM, pauseBGM, toggleBGM, changeTrack, setVolume, playSFX,
    }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be inside AudioProvider");
  return ctx;
}
