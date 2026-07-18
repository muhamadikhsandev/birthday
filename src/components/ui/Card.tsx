import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
