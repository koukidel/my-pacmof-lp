"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle, Package, Truck } from "lucide-react";

export default function Home() {
  const [color, setColor] = useState("グリーン");
  const [loading, setLoading] = useState(false);

  const colors = [
    { name: "グリーン", value: "bg-green-500" },
    { name: "パープル", value: "bg-purple-500" },
    { name: "ピンク", value: "bg-pink-500" },
  ];

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("決済の準備に失敗しました。");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました。");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen relative pb-24 shadow-xl">
      <div className="bg-black text-white text-center text-xs font-bold py-2">
        🎉 全国送料無料キャンペーン中
      </div>

      <header className="p-4 flex justify-center border-b">
        <Image src="/icon.jpeg" alt="Logo" width={40} height={40} className="rounded-full" />
      </header>

      <div className="w-full">
        <video 
          src="/insta-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm font-bold text-gray-700 ml-2">4.9 / 128件のレビュー</span>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-900">パクモフ 着ぐるみパジャマ 🪮</h1>
        
        <div className="flex items-end mb-6">
          <span className="text-3xl font-extrabold text-red-600">¥4,980</span>
          <span className="text-sm text-gray-500 line-through ml-2 mb-1">¥7,980</span>
          <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-1">
            38% OFF
          </span>
        </div>

        <div className="mb-8">
          <p className="font-bold text-gray-700 mb-2">
            カラー: <span className="text-gray-900">{color}</span>
          </p>
          <div className="flex space-x-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                className={`w-12 h-12 rounded-full border-4 transition-all ${
                  color === c.name ? "border-gray-900 scale-110" : "border-gray-200"
                } ${c.value}`}
                aria-label={c.name}
              />
            ))}
          </div>
        </div>

        <div className="mb-8 rounded-xl overflow-hidden shadow-lg border">
          <Image 
            src="/hero.jpg" 
            alt="着ぐるみイメージ" 
            width={600} 
            height={450} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h2 className="font-bold text-lg mb-4 text-gray-900">商品の特徴</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-xl mr-3">🪮</span>
              <span className="text-gray-700 leading-tight">頭の毛をとかせる謎ギミック（専用クシ付属）</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-3">👾</span>
              <span className="text-gray-700 leading-tight">着るだけで脱力できるもこもこフリース</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-3">📦</span>
              <span className="text-gray-700 leading-tight">安心の追跡番号付き・全国送料無料</span>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6 mb-8">
          <h2 className="font-bold text-lg mb-3 flex items-center text-gray-900">
            <Truck className="mr-2 w-5 h-5" /> お届けについて
          </h2>
          <p className="text-gray-600 text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
            ※ 本商品は海外直送のため、お届けまでに<strong>約7〜14営業日</strong>お時間をいただいております。<br/><br/>
            発送完了後、追跡番号をメールにてお知らせいたしますのでご安心ください。
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="max-w-md mx-auto bg-white p-4 border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-black text-white font-bold text-lg py-4 rounded-full flex justify-center items-center hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                決済画面へ移動中...
              </span>
            ) : (
              "今すぐ手に入れる（送料無料）"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
