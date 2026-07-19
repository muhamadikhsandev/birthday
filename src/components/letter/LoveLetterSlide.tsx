"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, PenLine, Mail, Send, Heart, LayoutGrid as NavIcon } from "lucide-react";
import Button from "@/components/ui/Button";

// ── Paragraf surat ────────────────────────────────────────────────────────────
const PARAGRAPHS = [
  "Selamat ulang tahun ya sayang! 🎂🎉 Hari ini adalah hari yang paling spesial buat aku, karena di hari ini kamu hadir ke dunia — dan itu artinya banyak banget buatku.",
  "Makasih udah selalu jadi orang yang paling sabar, paling lucu, dan selalu support aku dalam keadaan apa pun — termasuk pas aku lagi lemes nyari kerja dan ngoding kayak gini demi bikin sesuatu yang bisa bikin kamu senyum. 😊",
  "Kamu itu selalu tau cara bikin hari-hariku jadi lebih ringan. Ketawa bareng kamu tuh nggak ada obatnya. Dan setiap momen kecil yang kita lewatin bareng — itu yang bikin hidupku terasa penuh.",
  "Semoga di usia yang baru ini, kamu makin berkah, dilancarkan segala urusannya di daycare, makin sehat, makin cantik (kalau itu masih mungkin 😂), dan apa yang kamu semogakan bisa segera terwujud — satu per satu, insyaallah. 🤲",
  "Di sini ada buket digital 💐 dan doa terbaik yang selalu mengalir buat kamu. Semoga kamu ngerasa dicintai hari ini — karena kamu emang selayaknya dapat itu setiap hari.",
  "I love you so much! 🫰🏻✨",
];

const WA_NUMBER = "628989379116";

// ── Foto profil dengan border ─────────────────────────────────────────────────
function ProfilePhoto() {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      {/* Pulse ring animasi di belakang */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "100%", height: "100%",
            background: "radial-gradient(circle, rgba(201,104,104,0.18) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ring gradien utama */}
        <div
          className="w-44 h-44 md:w-56 md:h-56 rounded-full p-[4px] relative"
          style={{
            background: "linear-gradient(135deg, #C96868 0%, #FBBF9E 40%, #F472B6 70%, #C96868 100%)",
            boxShadow: "0 0 0 6px rgba(201,104,104,0.12), 0 12px 40px rgba(201,104,104,0.38), 0 0 0 2px white",
          }}
        >
          {/* Inner white ring */}
          <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/photo.webp"
              alt="Siffa Amelia"
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.98) saturate(0.93) contrast(1.03)" }}
            />
          </div>
        </div>

        {/* Badge hati */}
        <motion.div
          className="absolute -bottom-1 -right-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-[#C96868]/25"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-5 h-5 text-[#C96868] fill-current" />
        </motion.div>
      </div>

      <p
        className="text-2xl text-[#C96868] font-medium"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Siffa Amelia 🌸
      </p>
    </div>
  );
}

// ── Kado inline (buket + kue) ─────────────────────────────────────────────────
function InlineGift() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="my-8 flex flex-col items-center gap-3"
    >
      <div
        className="text-3xl md:text-4xl text-center leading-relaxed"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        🌹💐🌷
      </div>
      <p
        className="text-xl md:text-2xl text-[#C96868]/80 text-center"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Buket digital dan kue dari aku buat kamu —
      </p>
      <div className="text-4xl md:text-5xl text-center">🎂🎁</div>
      <p
        className="text-lg md:text-xl text-[#C96868]/65 text-center max-w-xs"
        style={{ fontFamily: "var(--font-sacramento)" }}
      >
        Meski belum bisa kasih yang nyata, doa &amp; cinta ini nyata banget buat kamu. 💗
      </p>
    </motion.div>
  );
}

// ── Form balas WA ─────────────────────────────────────────────────────────────
function ReplyForm({ onNavigate }: { onNavigate: () => void }) {
  const [text, setText] = useState(
    "Makasih banyak ya sayang buat kado ultah digitalnya! Aku seneng banget dan terharu dibikinin ini sama kamu. 💗 Love you too! 🥰✨"
  );

  const sendWA = () => {
    const msg = `Halo sayang! 💌 Ini balasan untuk surat ultah kamu:\n\n"${text.trim()}"\n\n— Siffa Amelia 🌸`;
    const enc = encodeURIComponent(msg);
    // Deep link langsung ke app WA
    window.location.href = `whatsapp://send?phone=${WA_NUMBER}&text=${enc}`;
    // Fallback untuk desktop setelah 1.5 detik
    setTimeout(() => { window.open(`https://wa.me/${WA_NUMBER}?text=${enc}`, "_blank"); }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 mb-10 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2 text-[#C96868]">
        <Mail className="w-5 h-5" />
        <h4 className="text-xl font-bold font-sans">Balas Surat Cans 💌</h4>
      </div>
      <p className="text-xs text-[#C96868]/70 font-semibold font-sans leading-relaxed">
        Tulis pesan balasan — langsung terkirim ke WhatsApp Cans!
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-4 border border-[#C96868]/25 rounded-2xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#C96868]/35 text-sm text-gray-700 leading-relaxed resize-none shadow-inner transition-all"
        placeholder="Tulis balasanmu di sini..."
      />
      <div className="flex items-center gap-2">
        <button
          onClick={onNavigate}
          className="flex items-center gap-1.5 text-xs text-[#C96868]/55 hover:text-[#C96868] transition-colors font-semibold font-sans py-2 px-3 rounded-xl hover:bg-[#C96868]/8"
        >
          <NavIcon className="w-4 h-4" /> Halaman lain
        </button>
        <div className="flex-1" />
        <button
          onClick={sendWA}
          className="flex items-center gap-2 text-sm font-bold text-white bg-[#25D366] hover:bg-[#1fba59] px-5 py-2.5 rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" /> Kirim via WA
        </button>
      </div>
    </motion.div>
  );
}

// ── Konten utama ──────────────────────────────────────────────────────────────
interface LoveLetterSlideProps {
  onNavigate: () => void;
}

export default function LoveLetterSlide({ onNavigate }: LoveLetterSlideProps) {
  const [doneParagraphs, setDoneParagraphs] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [paraIndex, setParaIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);
  const sakuraRef = useRef<HTMLAudioElement | null>(null);

  // Preload kedua audio saat mount supaya zero-delay
  useEffect(() => {
    if (typeof window === "undefined") return;
    const tap = new Audio("/assets/sfx/Keyboard_Typing_SFX.ogg");
    tap.loop = true; tap.volume = 0.3; tap.preload = "auto";
    typingAudioRef.current = tap;

    const sak = new Audio("/assets/sfx/sfx_sakura.ogg");
    sak.volume = 0.55; sak.preload = "auto";
    sakuraRef.current = sak;
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  // Mesin ketik per paragraf
  useEffect(() => {
    if (paraIndex >= PARAGRAPHS.length) {
      typingAudioRef.current?.pause();
      setShowSignature(true);
      setTimeout(() => {
        sakuraRef.current?.play().catch(() => {});
        setFinished(true);
      }, 700);
      return;
    }

    const full = PARAGRAPHS[paraIndex];
    let i = 0;
    setCurrentText("");
    typingAudioRef.current?.play().catch(() => {});

    const iv = setInterval(() => {
      i++;
      setCurrentText(full.slice(0, i));
      scrollToBottom();
      if (i >= full.length) {
        clearInterval(iv);
        typingAudioRef.current?.pause();
        const t = setTimeout(() => {
          setDoneParagraphs((p) => [...p, full]);
          setCurrentText("");
          setParaIndex((n) => n + 1);
        }, 550);
        return () => clearTimeout(t);
      }
    }, 55);

    return () => { clearInterval(iv); typingAudioRef.current?.pause(); };
  }, [paraIndex]);

  useEffect(() => { scrollToBottom(); }, [currentText, showSignature, finished]);

  return (
    <motion.div
      key="love-letter"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-full"
    >
      {/* Tombol navigasi pojok kiri atas */}
      <button
        onClick={onNavigate}
        className="absolute top-3 left-3 z-20 flex items-center gap-1.5 text-xs text-[#C96868]/60 hover:text-[#C96868] transition-colors font-sans font-semibold bg-white/50 backdrop-blur px-2.5 py-1.5 rounded-full border border-[#C96868]/15"
      >
        <LayoutGrid className="w-3.5 h-3.5" /> Halaman lain
      </button>

      {/* ── Scroll utama — full page scroll ── */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="max-w-xl mx-auto px-5 pt-14 pb-6 flex flex-col items-center">

          {/* Foto profil dengan border */}
          <ProfilePhoto />

          {/* Header surat */}
          <p
            className="text-3xl md:text-4xl text-[#C96868] mb-5 text-center"
            style={{ fontFamily: "var(--font-sacramento)" }}
          >
            Dear Siffa Amelia,
          </p>

          {/* Paragraf yang sudah selesai diketik */}
          <div className="space-y-5 text-center w-full" style={{ fontFamily: "var(--font-sacramento)" }}>
            {doneParagraphs.map((p, i) => (
              <p key={i} className="text-xl md:text-2xl leading-relaxed text-[#C96868]">{p}</p>
            ))}

            {/* Paragraf yang sedang diketik */}
            {currentText && (
              <p className="text-xl md:text-2xl leading-relaxed text-[#C96868]">
                {currentText}<span className="animate-pulse ml-0.5 font-light">|</span>
              </p>
            )}

            {/* Tanda tangan */}
            {showSignature && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-5 flex flex-col items-end w-full"
              >
                <p className="text-2xl text-[#C96868]/80">Dengan cinta,</p>
                <div className="flex items-center gap-2 mt-0.5">
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

          {/* ── Kado inline (buket & kue) setelah surat selesai ── */}
          {finished && <InlineGift />}

          {/* ── Form balas WA ── */}
          {finished && <ReplyForm onNavigate={onNavigate} />}
        </div>
      </div>
    </motion.div>
  );
}
