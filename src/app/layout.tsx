import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PotolokBel | Премиальные натяжные потолки",
  description: "Трансформируем пространство светом и формой. Премиальные архитектурные натяжные потолки.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased bg-warm-white text-graphite`}>
        {children}
      </body>
    </html>
  );
}
