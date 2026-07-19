"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoFrame from "./PhotoFrame";
import LetterTypingView from "./LetterTypingView";
import LetterReplyForm from "./LetterReplyForm";

export default function LoveLetterSlide() {
  const [view, setView] = useState<"reading" | "replying">("reading");

  return (
    <motion.div
      key="love-letter"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-2 md:px-4"
    >
      <div
        className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-5 md:p-8 rounded-3xl w-full min-h-[75vh] md:min-h-[70vh] max-h-[85vh] overflow-hidden"
        style={{
          background: "rgba(255, 253, 247, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 20px 60px rgba(201, 104, 104, 0.15), 0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Photo Section (left on desktop, top on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="animate-float-up shrink-0 flex justify-center w-full md:w-auto"
        >
          <PhotoFrame
            src="/images/foto-doi-cantik.webp"
            alt="Calon Istri Cantik 🦄"
          />
        </motion.div>

        {/* Content Section (right on desktop, bottom on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex-1 w-full min-w-0 h-full flex flex-col justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {view === "reading" ? (
              <LetterTypingView
                key="typing-view"
                onReplyClick={() => setView("replying")}
              />
            ) : (
              <LetterReplyForm
                key="reply-form"
                onBack={() => setView("reading")}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
