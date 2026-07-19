"use client";

import { useState, useEffect } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <button
      onClick={toggle}
      title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen Immersive"}
      className="fixed bottom-20 left-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-[#C96868]/25 text-[#C96868]/70 hover:text-[#C96868] hover:bg-white/90 hover:border-[#C96868]/50 transition-all shadow-md active:scale-95"
    >
      {isFullscreen
        ? <Minimize2 className="w-4 h-4" />
        : <Maximize2 className="w-4 h-4" />
      }
    </button>
  );
}
