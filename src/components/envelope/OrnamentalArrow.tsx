// Panah ornamental SVG — bukan flat icon
export default function OrnamentalArrow() {
  return (
    <svg width="48" height="80" viewBox="0 0 48 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shaftGrad" x1="24" y1="12" x2="24" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C96868" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D2B48C" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="heartArrowGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#E88888" />
          <stop offset="100%" stopColor="#C96868" />
        </radialGradient>
        <linearGradient id="headGrad" x1="10" y1="58" x2="38" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C96868" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D2B48C" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Hati di atas */}
      <path d="M24 12 C21 8 15 9 14 13 C13 17 17 20 24 25 C31 20 35 17 34 13 C33 9 27 8 24 12Z"
        fill="url(#heartArrowGrad)" opacity="0.85" />
      <path d="M17 14 C17 12.5 18.5 11.5 20 11.5"
        stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Batang */}
      <rect x="22" y="24" width="4" height="32" rx="2" fill="url(#shaftGrad)" />

      {/* Daun kiri & kanan */}
      <path d="M23 40 Q12 33 5 40 Q12 47 23 40Z" fill="#D2B48C" opacity="0.55" />
      <path d="M25 40 Q36 33 43 40 Q36 47 25 40Z" fill="#D2B48C" opacity="0.55" />
      <circle cx="6" cy="40" r="2" fill="#C96868" opacity="0.35" />
      <circle cx="42" cy="40" r="2" fill="#C96868" opacity="0.35" />

      {/* Kepala panah */}
      <path d="M12 58 L24 76 L36 58" fill="none"
        stroke="url(#headGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 58 Q8 53 10 47" fill="none"
        stroke="#D2B48C" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      <path d="M36 58 Q40 53 38 47" fill="none"
        stroke="#D2B48C" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}
