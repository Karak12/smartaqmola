import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Smart Aqmola — цифровая платформа управления регионом",
  description:
    "Цифровой штаб Акмолинской области: данные, обращения, карты, ИИ-аналитика и мониторинг поручений в режиме реального времени.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
