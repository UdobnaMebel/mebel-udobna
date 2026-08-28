// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Фабрика мебели «Удобна» в Ростове-на-Дону | Кухни и шкафы от цеха без наценки за салон",
  description: "Изготовление кухонь, шкафов и мебели под ключ в Ростове-на-Дону. Прямое производство на станках ЧПУ с PUR-кромлением. Штраф 1 000 ₽/день за просрочку в договоре. Бесплатный выезд с 200+ образцами.",
  keywords: [
    "кухни на заказ Ростов-на-Дону",
    "мебель на заказ Ростов",
    "кухни от производителя",
    "шкафы купе Ростов",
    "шкаф кровать трансформер",
    "мебель фабрика Удобна"
  ],
  authors: [{ name: "Фабрика мебели «Удобна»" }],
  openGraph: {
    title: "Честные кухни и мебель от фабрики «Удобна» в Ростове-на-Дону",
    description: "Рассчитайте смету в любых комплектациях без наценки 35% на салоны в ТЦ. Фиксация цены в договоре.",
    url: "https://udobna-mebel.ru",
    siteName: "Фабрика мебели «Удобна»",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // лежит в public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Фабрика мебели «Удобна» Ростов-на-Дону",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0D10] text-white">
        {children}
      </body>
    </html>
  );
}