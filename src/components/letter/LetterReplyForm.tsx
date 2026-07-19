"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowLeft, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

interface LetterReplyFormProps {
  onBack: () => void;
}

export default function LetterReplyForm({ onBack }: LetterReplyFormProps) {
  const [replyText, setReplyText] = useState(
    "Makasih banyak ya sayang buat kado ultah digitalnya! Aku seneng banget dan terharu dibikinin ini sama kamu. 💗 Semoga doa-doa baik kita berdua dikabulkan ya sayang. Love you too! 🥰✨"
  );

  const handleSendWhatsApp = () => {
    const targetNumber = "628989379116";
    const formattedMessage = `Halo sayang! Ini balasan untuk surat ultah kamu:

"${replyText.trim()}"

Dikirim dari Halaman Surat Cinta 💌`;

    const waUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(formattedMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full justify-between gap-4 py-2 font-sans"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#C96868]">
          <Heart className="w-5 h-5 fill-current animate-pulse" />
          <h4 className="text-xl font-bold font-sans">Kirim Balasan Cinta</h4>
        </div>

        <p className="text-xs text-[#C96868]/80 leading-relaxed font-semibold">
          Tulis pesan ucapan terima kasih atau balasan surat untuk Cans di bawah ini. Pesan ini akan langsung dikirim ke WhatsApp Cans!
        </p>

        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full h-40 p-4 border border-[#C96868]/30 rounded-xl bg-white/60 focus:outline-none focus:ring-2 focus:ring-[#C96868]/50 focus:border-transparent text-sm text-gray-700 leading-relaxed resize-none shadow-inner"
          placeholder="Tulis balasanmu di sini..."
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base py-2.5"
        >
          <ArrowLeft className="w-4 h-4" /> Baca Surat Lagi
        </Button>
        <Button
          onClick={handleSendWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 text-sm md:text-base py-2.5 text-white bg-[#25D366] hover:bg-[#20ba56] border-none shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          Kirim via WA <Send className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
