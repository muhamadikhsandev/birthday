import type { Metadata } from "next";
import { Sacramento, Quicksand } from "next/font/google";
import "./globals.css";

const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});

const quicksand = Quicksand({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Sayang! 🦄💗",
  description: "A special birthday gift made with love by Cans ✨",
  openGraph: {
    title: "Happy Birthday Sayang! 🦄💗",
    description: "A special birthday gift made with love by Cans ✨",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sacramento.variable} ${quicksand.variable} h-full`}
    >
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
