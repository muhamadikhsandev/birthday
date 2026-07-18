"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  name: string;
  url: string;
}

export const TRACKS: Track[] = [
  {
    id: "lifetime-smile",
    name: "A Lifetime in Your Smile",
    url: "/assets/bgm/A_Lifetime_in_Your_Smile.ogg",
  },
  {
    id: "chapter-love",
    name: "A Chapter of Love",
    url: "/assets/bgm/A_Chapter_of_Love.ogg",
  },
  {
    id: "lifetime-birthdays",
    name: "A Lifetime of Birthdays",
    url: "/assets/bgm/A_Lifetime_of_Birthdays.ogg",
  },
];

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

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.45);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize background music
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(currentTrack.url);
      audio.loop = true;
      audio.volume = volume;
      audioRef.current = audio;

      return () => {
        audio.pause();
      };
    }
  }, []);

  const playBGM = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("BGM play failed:", err));
    } else {
      setIsPlaying(true);
    }
  };

  const pauseBGM = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const toggleBGM = () => {
    if (isPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  };

  const changeTrack = (track: Track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = track.url;
      audioRef.current.load();
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("Failed to play track:", err);
          setIsPlaying(false);
        });
    }
  };

  const setVolume = (vol: number) => {
    const safeVol = Math.max(0, Math.min(1, vol));
    setVolumeState(safeVol);
    if (audioRef.current) {
      audioRef.current.volume = safeVol;
    }
  };

  const playSFX = () => {
    if (typeof window !== "undefined") {
      const sfx = new Audio("/assets/sfx/Minimal_Romantic_UI_Tap.ogg");
      sfx.volume = 0.6;
      sfx.play().catch((err) => console.log("SFX play failed:", err));
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        tracks: TRACKS,
        playBGM,
        pauseBGM,
        toggleBGM,
        changeTrack,
        setVolume,
        playSFX,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
