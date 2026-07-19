"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Flower, Gamepad2, Heart, Gift } from "lucide-react";

type PageSection = 1 | 2 | 3 | 4;

interface PageNavigatorProps {
  unlockedPages: PageSection[];
  currentPage: PageSection;
  onNavigate: (page: PageSection) => void;
  onClose: () => void;
}

const PAGE_META: { page: PageSection; icon: React.ReactNode; label: string }[] = [
  { page: 1, icon: <Mail className="w-5 h-5" />, label: "Amplop Kejutan" },
  { page: 2, icon: <Flower className="w-5 h-5" />, label: "Mini Game Sakura" },
  { page: 3, icon: <Heart className="w-5 h-5" />, label: "Surat Cinta" },
  { page: 4, icon: <Gift className="w-5 h-5" />, label: "Kado Virtual" },
];

export default function PageNavigator({
  unlockedPages,
  currentPage,
  onNavigate,
  onClose,
}: PageNavigatorProps) {
  return (
    <AnimatePresence>
      <motion.div
        key="nav-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 bg-white/90 backdrop-blur-xl border border-[#C96868]/20 rounded-3xl shadow-2xl p-6 w-72 max-w-[90vw]"
        >
          <p
            className="text-lg font-bold text-[#C96868] mb-4 text-center"
            style={{ fontFamily: "var(--font-sacramento)", fontSize: "22px" }}
          >
            Pilih Halaman 🌸
          </p>

          <div className="flex flex-col gap-2">
            {PAGE_META.map(({ page, icon, label }) => {
              const isUnlocked = unlockedPages.includes(page);
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  disabled={!isUnlocked}
                  onClick={() => { onNavigate(page); onClose(); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold font-sans transition-all ${
                    isActive
                      ? "bg-[#C96868] text-white shadow-md"
                      : isUnlocked
                      ? "bg-[#C96868]/10 text-[#C96868] hover:bg-[#C96868]/20"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                  {!isUnlocked && (
                    <span className="ml-auto text-xs text-gray-400">🔒</span>
                  )}
                  {isActive && (
                    <span className="ml-auto text-xs text-white/80">Aktif</span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
