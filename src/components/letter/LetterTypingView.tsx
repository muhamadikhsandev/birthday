"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PenLine, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

interface LetterTypingViewProps {
  onReplyClick: () => void;
}

const PARAGRAPHS = [
  "Selamat ulang tahun ya sayang! 🎂🎉 Hari ini adalah hari yang paling spesial buat aku, karena di hari ini kamu hadir ke dunia — dan itu artinya banyak banget buatku.",
  "Makasih udah selalu jadi orang yang paling sabar, paling lucu, dan selalu support aku dalam keadaan apa pun — termasuk pas aku lagi lemes nyari kerja dan ngoding kayak gini demi bikin sesuatu yang bisa bikin kamu senyum. 😊",
  "Kamu itu selalu tau cara bikin hari-hariku jadi lebih ringan. Ketawa bareng kamu tuh nggak ada obatnya. Dan setiap momen kecil yang kita lewatin bareng — itu yang bikin hidupku terasa penuh.",
  "Semoga di usia yang baru ini, kamu makin berkah, dilancarkan segala urusannya di daycare, makin sehat, makin cantik (kalau itu masih mungkin 😂), dan apa yang kamu semogakan bisa segera terwujud — satu per satu, insyaallah. 🤲",
  "Di sini ada buket digital 💐 dan doa terbaik yang selalu mengalir buat kamu. Semoga kamu ngerasa dicintai hari ini — karena kamu emang selayaknya dapat itu setiap hari.",
  "I love you so much! 🫰🏻✨"
];

export default function LetterTypingView({ onReplyClick }: LetterTypingViewProps) {
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play typing sound loop
  const startTypingSound = () => {
    if (!typingAudioRef.current && typeof window !== "undefined") {
      const audio = new Audio("/assets/sfx/Keyboard_Typing_SFX.ogg");
      audio.loop = true;
      audio.volume = 0.35;
      typingAudioRef.current = audio;
    }
    typingAudioRef.current?.play().catch((e) => console.log("Typing sound blocked:", e));
  };

  const stopTypingSound = () => {
    typingAudioRef.current?.pause();
  };

  // Auto-scroll to bottom of the container
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (currentParagraphIndex >= PARAGRAPHS.length) {
      // Type paragraphs completed. Now type signature.
      stopTypingSound();
      setShowSignature(true);

      // Play completion chime (sfx_sakura)
      if (typeof window !== "undefined") {
        const chime = new Audio("/assets/sfx/sfx_sakura.ogg");
        chime.volume = 0.55;
        chime.play().catch((e) => console.log(e));
      }
      setIsFinished(true);
      return;
    }

    const fullText = PARAGRAPHS[currentParagraphIndex];
    let index = 0;
    setDisplayedText("");
    startTypingSound();

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      scrollToBottom();

      if (index >= fullText.length) {
        clearInterval(interval);
        stopTypingSound();

        // Wait a short moment before starting next paragraph
        const timeout = setTimeout(() => {
          setDisplayedParagraphs((prev) => [...prev, fullText]);
          setDisplayedText("");
          setCurrentParagraphIndex((prev) => prev + 1);
        }, 600);

        return () => clearTimeout(timeout);
      }
    }, 60);

    return () => {
      clearInterval(interval);
      stopTypingSound();
    };
  }, [currentParagraphIndex]);

  // Keep scrolling to bottom when content updates
  useEffect(() => {
    scrollToBottom();
  }, [displayedText, showSignature]);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Scrollable Letter Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar space-y-4 text-center select-none"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        {/* Previously completed paragraphs */}
        {displayedParagraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-2xl md:text-3xl leading-relaxed text-[#C96868] font-medium"
          >
            {para}
          </p>
        ))}

        {/* Current typing paragraph */}
        {displayedText && (
          <p className="text-2xl md:text-3xl leading-relaxed text-[#C96868] font-medium">
            {displayedText}
            <span className="animate-pulse ml-0.5">|</span>
          </p>
        )}

        {/* Signature */}
        {showSignature && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-6 flex flex-col items-end pr-4 text-right"
          >
            <p className="text-2xl text-[#C96868] font-medium leading-none">Dengan cinta,</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-3xl text-[#C96868] font-bold">Cans 💗</p>
              <motion.div
                animate={{ rotate: [0, -10, 5, -5, 0], y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-[#C96868]"
              >
                <PenLine className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Reply Action Button */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4 flex justify-center z-10"
        >
          <Button
            onClick={onReplyClick}
            className="text-xl md:text-2xl px-6 py-2.5 font-bold shadow-lg"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Balas Surat Cans <Mail className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
