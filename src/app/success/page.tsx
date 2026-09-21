import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="max-w-md mx-auto bg-white min-h-screen relative p-6 shadow-xl flex flex-col items-center justify-center text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
      <h1 className="text-2xl font-bold mb-4 text-gray-900">ご注文ありがとうございます！</h1>
      <p className="text-gray-600 mb-2">ご注文完了の感謝メッセージをお送りします。</p>
      <div className="bg-gray-50 rounded-lg p-4 my-6 w-full border text-sm text-left">
        <ul className="space-y-3">
          <li className="flex">
            <span className="mr-2">📧</span>
            <span>注文確認メールをお送りしましたのでご確認ください。</span>
          </li>
          <li className="flex">
            <span className="mr-2">📦</span>
            <span>発送時に追跡番号をご連絡します。お届けまで約7〜14営業日お待ちください。</span>
          </li>
        </ul>
      </div>
      
      <Link 
        href="/"
        className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-800 transition-colors block text-center"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
