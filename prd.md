# 📝 Product Requirement Document (PRD)
## Project Name: Birthday Web App for Calon Istri 🦄💗🍓🥄

---

## 1. Overview & Objective
Membuat sebuah website interaktif bertema romantis-estetik (*earth-tone / coksu*) sebagai hadiah ulang tahun kejutan untuk pasangan. Website ini dirancang khusus menggunakan sistem *page-by-page animation* (bukan scroll ke bawah panjang) untuk memberikan sensasi eksklusif seperti membuka kado fisik dan membaca surat cinta, serta dilengkapi mini-game edukatif-cute di dalamnya.

---

## 2. Tech Stack & Library Pendukung
*   **Framework Utama:** Next.js 15 (App Router, React-based) + **TypeScript** (Statis, aman, anti-runtime error).
*   **Styling & Layout:** **Tailwind CSS v4** (Konfigurasi modern berbasis CSS murni `@theme`).
*   **Animasi:** Framer Motion (Untuk transisi slide horizontal, efek fade-in, dan *AnimatePresence*).
*   **Icons:** Lucide React / React Icons (Dekorasi ikon buket bunga, hewan lucu, dan hati).
*   **Fonts (Google Fonts via Next/Font):** 
    *   `Sacramento` (Untuk font huruf sambung surat yang estetik).
    *   `Quicksand` (Untuk UI/Teks tombol/Keterangan game agar tetap *cute* dan mudah dibaca).

---

## 3. Desain & Palet Warna (Theme v4)
*   **Primary (60%):** Cokelat Susu / Beige (`#D2B48C` atau `#F5F5DC`) ➡️ Kesan hangat dan estetik bumi (*earth-tone*).
*   **Secondary (30%):** Merah Soft / Dusty Rose (`#C96868`) ➡️ Aksen bunga sakura dan elemen romantis.
*   **Accent/Text (10%):** Hitam Lembut / Charcoal (`#2C2C2C`) ➡️ Kontras tinggi agar teks surat panjang tetap nyaman dibaca.

---

## 4. Struktur Halaman & Alur Konten (Sistem Slide/Page)

### 📑 Slide 1: The Envelope (Halaman Pembuka)
*   **Visual:** Amplop surat estetik di tengah dengan animasi berdenyut (*pulse*). Hiasan buket bunga minimalis di sudut layar.
*   **Interaksi:** Tombol "Buka Surat dari Cans ✨".
*   **Animasi:** Amplop terbuka, lalu *fade out* berganti ke Slide 2.

### 📑 Slide 2: Mini-Game "Catch the Sakuras" (Cute & Edukatif)
*   **Visual:** Karakter hewan estetik (Kelinci/Kucing) di bagian bawah menangkap bunga sakura yang jatuh.
*   **Mekanik Game:** 
    *   User mengklik/menggeser untuk menangkap 5 bunga sakura.
    *   Terdapat counter score atraktif bernuansa pink.
*   **Trigger:** Setelah skor mencapai 5/5, otomatis transisi menuju Slide 3 (Surat Utama).

### 📑 Slide 3: Foto Cantik & Surat Cinta Panjang
*   **Visual:** 
    *   Sisi Kiri/Atas: Foto doi terpilih (paling cantik, anti-komuk) berbingkai bulat estetik dengan efek *soft shadow*.
    *   Sisi Kanan/Bawah: Kotak surat putih gading berisi ucapan selamat ulang tahun yang panjang dan tulus.
*   **Font:** Menggunakan font **Sacramento** untuk tulisan surat sambungnya.

---

## 5. Implementasi Kode Sumber (TypeScript & Tailwind v4)

### A. Konfigurasi Global CSS (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme {
  --color-coksu-light: #F5F5DC;
  --color-coksu-dark: #D2B48C;
  --color-romantic-rose: #C96868;
  --color-charcoal: #2C2C2C;

  --font-script: var(--font-sacramento);
  --font-sans: var(--font-quicksand);
}
```

### B. Setup Layout Utama (`src/app/layout.tsx`)
```tsx
import type { Metadata } from "next";
import { Sacramento, Quicksand } from "next/font/google";
import "./globals.css";

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
});

const quicksand = Quicksand({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Happy Birthday Sayang! 🦄💗",
  description: "A special gift made by Cans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sacramento.variable} ${quicksand.variable}`}>
      <body className="font-sans bg-coksu-light text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
```

### C. Logika Aplikasi & Animasi (`src/app/page.tsx`)
```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PageSection = 1 | 2 | 3;

export default function BirthdayWeb() {
  const [page, setPage] = useState<PageSection>(1);
  const [gameScore, setGameScore] = useState<number>(0);

  const handleScoreUp = () => {
    setGameScore((prev) => {
      const newScore = prev + 1;
      if (newScore >= 5) {
        setTimeout(() => setPage(3), 800);
      }
      return newScore;
    });
  };

  return (
    <main className="relative w-full h-screen overflow-hidden flex items-center justify-center p-4 bg-coksu-light">
      <AnimatePresence mode="wait">
        
        {/* SLIDE 1: AMPLOP */}
        {page === 1 && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-md"
          >
            <h1 className="font-script text-6xl text-romantic-rose mb-6">
              Happy Birthday Sayang
            </h1>
            <p className="font-sans mb-6 text-sm text-charcoal/80">
              Ada surat dan kado kecil buat kamu di dalem. Buka yuk?
            </p>
            <button
              onClick={() => setPage(2)}
              className="bg-romantic-rose text-white px-8 py-3 rounded-full font-sans font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              Buka Surat 🎁
            </button>
          </motion.div>
        )}

        {/* SLIDE 2: MINI GAME CUTE */}
        {page === 2 && (
          <motion.div
            key="mini-game"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h2 className="font-sans text-2xl font-bold text-romantic-rose mb-2">
              Tangkap 5 Bunga Sakura! 🌸
            </h2>
            <p className="font-sans text-sm text-charcoal/70 mb-6">
              Bantu kelinci dapetin bunga kesukaan kamu: <span className="font-bold text-romantic-rose">{gameScore}/5</span>
            </p>
            
            <div 
              onClick={handleScoreUp}
              className="w-72 h-72 border-2 border-dashed border-romantic-rose/40 rounded-2xl flex flex-col items-center justify-center bg-white/50 cursor-pointer p-4 hover:bg-white/80 transition-colors"
            >
              <span className="text-4xl mb-2">🐰</span>
              <p className="font-sans text-xs text-charcoal/50">Klik di sini buat nangkep bunga!</p>
            </div>
          </motion.div>
        )}

        {/* SLIDE 3: SURAT UTAMA & FOTO */}
        {page === 3 && (
          <motion.div
            key="love-letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-8 max-w-4xl bg-white/60 p-6 md:p-8 rounded-3xl shadow-xl backdrop-blur-sm border border-white"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-coksu-dark shadow-lg shrink-0">
              <img 
                src="/images/foto-doi-cantik.webp" 
                alt="Calon Istri Cantik 🦄" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="font-script text-5xl text-romantic-rose mb-4">
                Dear Sayangku...
              </h3>
              <p className="font-sans text-base leading-relaxed text-charcoal text-justify">
                Selamat ulang tahun ya sayang! Makasih udah selalu jadi orang yang paling sabar, 
                paling lucu, dan selalu support aku dalam keadaan apa pun—termasuk pas aku lagi 
                lemes nyari kerja dan ngoding kayak gini. Semoga di usia yang baru ini, kamu makin 
                berkah, dilancarkan segala urusannya di daycare, dan apa yang kamu semogakan bisa 
                segera terwujud. Di sini ada buket digital 💐 dan doa terbaik yang selalu mengalir 
                buat kamu. I love you so much! 🫰🏻✨
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
```