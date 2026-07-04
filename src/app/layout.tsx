import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Натяжные потолки под ключ в Москве | Гарантия 10 лет",
  description: "Премиальные натяжные потолки за 1 день. Чистый монтаж, без пыли, гарантия качества. Рассчитайте стоимость онлайн!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#F8F9FA] text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
