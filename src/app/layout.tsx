import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "PotolokBel | Премиальные натяжные потолки в Москве и МО",
  description: "Профессиональная установка натяжных потолков под ключ. Гарантия 15 лет, чистый монтаж за 1 день. Бесплатный замер по Москве и области.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
