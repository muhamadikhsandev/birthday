import React from "react";
import { useAudio } from "@/context/AudioContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const { playSFX } = useAudio();
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-all duration-200 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#C96868] text-white shadow-lg hover:bg-[#A84F4F] hover:scale-105 hover:shadow-xl active:scale-95",
    ghost:
      "bg-white/50 text-[#C96868] border border-[#C96868]/30 hover:bg-white/80 hover:scale-105 active:scale-95",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSFX();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

