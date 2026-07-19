"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, LayoutGrid, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

interface LetterReplyFormProps {
  onBack: () => void;
  onNavigate: () => void;
}

const WA_NUMBER = "628989379116";

export default function LetterReplyForm({ onBack, onNavigate }: LetterReplyFormProps) {
  const [replyText, setReplyText] = useState(
    "Makasih banyak ya sayang buat kado ultah digitalnya! Aku seneng banget dan terharu dibikinin ini sama kamu. 💗 Semoga doa-doa baik kita berdua dikabulkan ya sayang. Love you too! 🥰✨"
  );

  const handleSendWhatsApp = () => {
    const messageBody = `Halo sayang! 💌 Ini balasan untuk surat ultah kamu:\n\n"${replyText.trim()}"\n\n— Siffa Amelia 🌸`;
    const encodedMsg = encodeURIComponent(messageBody);

    // Deep link ke app WhatsApp (langsung buka app, bukan web redirect)
    const deepLink = `whatsapp://send?phone=${WA_NUMBER}&text=${encodedMsg}`;

    // Coba buka app, fallback ke wa.me jika di desktop
    window.location.href = deepLink;

    // Fallback setelah 1.5 detik jika deep link tidak berhasil
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMsg}`, "_blank");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col gap-4 font-sans"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-[#C96868]">
        <Heart className="w-5 h-5 fill-current animate-pulse" />
        <h4 className="text-xl font-bold">Balas Surat Cans 💌</h4>
      </div>

      <p className="text-xs text-[#C96868]/75 font-semibold leading-relaxed">
        Tulis balasan kamu di bawah. Pesan akan langsung dikirim ke WhatsApp Cans begitu kamu klik Kirim!
      </p>

      {/* Text area */}
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        className="w-full h-36 p-4 border border-[#C96868]/25 rounded-2xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#C96868]/40 text-sm text-gray-700 leading-relaxed resize-none shadow-inner transition-all"
        placeholder="Tulis balasanmu di sini..."
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        {/* Navigasi halaman */}
        <button
          onClick={onNavigate}
          className="flex items-center gap-1.5 text-xs text-[#C96868]/55 hover:text-[#C96868] transition-colors font-semibold py-2 px-3 rounded-xl hover:bg-[#C96868]/8"
        >
          <LayoutGrid className="w-4 h-4" />
          Halaman lain
        </button>

        <div className="flex-1" />

        {/* Kirim WA */}
        <button
          onClick={handleSendWhatsApp}
          className="flex items-center gap-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#1fba59] px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" /> Kirim via WA
        </button>
      </div>
    </motion.div>
  );
}
