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

  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    // Mulai suara ketik
    if (typeof window !== "undefined") {
      const audio = new Audio("/assets/sfx/Keyboard_Typing_SFX.ogg");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
      audio.play().catch((err) => console.log("Typing audio failed to play:", err));
    }

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    }, 150);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayedText}
      <span className="animate-pulse ml-0.5 font-light">|</span>
    </span>
  );
}
