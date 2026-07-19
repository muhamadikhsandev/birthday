"use client";

import { motion } from "framer-motion";
import { Gift, Heart, Flower2 } from "lucide-react";

interface GiftSlideProps {
  onNavigate: () => void;
}

// Animasi buket bunga SVG sederhana
function BouquetSVG() {
  return (
    <svg width="140" height="160" viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Batang */}
      <rect x="66" y="100" width="8" height="55" rx="4" fill="#8B6954" opacity="0.7" />
      {/* Daun kiri */}
      <path d="M70 115 Q50 105 42 118 Q55 122 70 115Z" fill="#6DB36D" opacity="0.75" />
      {/* Daun kanan */}
      <path d="M70 120 Q88 108 96 120 Q83 128 70 120Z" fill="#5FA05F" opacity="0.7" />

      {/* Bunga tengah atas (merah muda) */}
      <circle cx="70" cy="75" r="22" fill="#F9A8C9" opacity="0.9" />
      <circle cx="70" cy="75" r="12" fill="#F472B6" opacity="0.85" />
      <circle cx="70" cy="75" r="5" fill="#FBBF24" />

      {/* Bunga kiri atas (merah) */}
      <circle cx="40" cy="85" r="18" fill="#FCA5A5" opacity="0.85" />
      <circle cx="40" cy="85" r="9" fill="#F87171" opacity="0.9" />
      <circle cx="40" cy="85" r="4" fill="#FBBF24" />

      {/* Bunga kanan atas (ungu) */}
      <circle cx="100" cy="85" r="18" fill="#C4B5FD" opacity="0.85" />
      <circle cx="100" cy="85" r="9" fill="#A78BFA" opacity="0.9" />
      <circle cx="100" cy="85" r="4" fill="#FBBF24" />

      {/* Bunga kecil kiri */}
      <circle cx="22" cy="100" r="13" fill="#FDBA74" opacity="0.8" />
      <circle cx="22" cy="100" r="6" fill="#FB923C" opacity="0.9" />

      {/* Bunga kecil kanan */}
      <circle cx="118" cy="100" r="13" fill="#86EFAC" opacity="0.8" />
      <circle cx="118" cy="100" r="6" fill="#4ADE80" opacity="0.9" />

      {/* Pita */}
      <path d="M58 103 Q70 113 82 103" fill="none" stroke="#C96868" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="70" cy="104" r="4" fill="#C96868" />
    </svg>
  );
}

// Kue ulang tahun SVG sederhana
function CakeSVG() {
  return (
    <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lapisan bawah kue */}
      <rect x="10" y="80" width="100" height="38" rx="8" fill="#F9A8D4" />
      <rect x="10" y="80" width="100" height="16" rx="6" fill="#F472B6" />
      {/* Hiasan baris bawah */}
      {[20, 35, 50, 65, 80, 95].map((x, i) => (
        <circle key={i} cx={x} cy="92" r="3.5" fill="#FBBF24" opacity="0.85" />
      ))}

      {/* Lapisan atas kue */}
      <rect x="22" y="52" width="76" height="32" rx="7" fill="#FBCFE8" />
      <rect x="22" y="52" width="76" height="14" rx="5" fill="#F9A8D4" />
      {/* Hiasan baris atas */}
      {[32, 48, 64, 78, 90].map((x, i) => (
        <circle key={i} cx={x} cy="61" r="3" fill="#C96868" opacity="0.7" />
      ))}

      {/* Whipped cream / frosting top */}
      <path d="M22 52 Q35 44 48 52 Q58 44 70 52 Q80 44 98 52" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />

      {/* Lilin */}
      {[38, 60, 82].map((x, i) => (
        <g key={i}>
          <rect x={x - 4} y="32" width="8" height="22" rx="3" fill={i % 2 === 0 ? "#FDE68A" : "#FBCFE8"} />
          {/* Nyala api */}
          <ellipse cx={x} cy="30" rx="4" ry="6" fill="#FCD34D" opacity="0.9" />
          <ellipse cx={x} cy="29" rx="2.5" ry="4" fill="#F97316" opacity="0.8" />
        </g>
      ))}

      {/* Teks kue */}
      <text x="60" y="73" textAnchor="middle" fill="#C96868" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Happy B-Day!</text>
    </svg>
  );
}

export default function GiftSlide({ onNavigate }: GiftSlideProps) {
  return (
    <motion.div
      key="gift-slide"
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center max-w-sm px-6 w-full -mt-6"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl text-[#C96868] leading-tight"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Kado Digital Kamu 🎁
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-lg text-[#C96868]/75 mt-1 mb-6"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        dari Cans buat Sayang 💗
      </motion.p>

      {/* Gifts Row */}
      <div className="flex items-end justify-center gap-8 mb-6">
        {/* Buket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <BouquetSVG />
          </motion.div>
          <span className="text-sm font-semibold text-[#C96868]/70 font-sans">Buket Bunga 🌹</span>
        </motion.div>

        {/* Divider */}
        <div className="h-28 w-px bg-[#C96868]/15 self-center" />

        {/* Kue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 120 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <CakeSVG />
          </motion.div>
          <span className="text-sm font-semibold text-[#C96868]/70 font-sans">Kue Ulang Tahun 🎂</span>
        </motion.div>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/60 backdrop-blur border border-[#C96868]/20 rounded-2xl px-5 py-4 shadow-sm mb-6 max-w-xs"
      >
        <p
          className="text-xl text-[#C96868] leading-relaxed"
          style={{ fontFamily: "var(--font-sacramento)" }}
        >
          Meski belum bisa kasih yang nyata sekarang, tapi doa &amp; cinta ini nyata banget buat kamu. Happy Birthday, Siffa Amelia! 🌸
        </p>
      </motion.div>

      {/* Navigate button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onNavigate}
        className="flex items-center gap-2 text-sm text-[#C96868]/60 hover:text-[#C96868] transition-colors font-sans font-semibold"
      >
        <Gift className="w-4 h-4" />
        Lihat halaman lainnya
      </motion.button>
    </motion.div>
  );
}
