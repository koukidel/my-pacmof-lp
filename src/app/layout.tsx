import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "パクモフ 着ぐるみパジャマ | 全国送料無料",
  description: "脱力系着ぐるみパジャマ「パクモフ」。頭の毛をとかせる謎ギミック付き。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-100 text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
