"use client";

import { useState, useEffect, useRef } from "react";

interface TypingTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypingTitle({ text, className = "", style }: TypingTitleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload audio saat mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/assets/sfx/Keyboard_Typing_SFX.ogg");
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Jalankan ketikan & mainkan suara ketik
  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Typing sound block:", err));
    }

    intervalRef.current = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        audioRef.current?.pause();
      }
    }, 145);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      audioRef.current?.pause();
    };
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse ml-0.5 font-light">|</span>
      )}
    </span>
  );
}
