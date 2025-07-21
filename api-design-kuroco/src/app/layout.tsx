// src/app/layout.tsx
import "@/app/globals.css";
import {
  getHeaderTitle,
  getSubTitle,
  getCopyright,
  // getChatbotEmbedCode,
} from "@/lib/kuroco";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Chatbot from "@/components/chatbot"; // Chatbotコンポーネントをインポート

export const metadata = {
  title: "AI活用ポータル", // 適切なタイトルを設定
  description: "AIを活用してビジネスを変革させる",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Promise.allでサイト設定データを並列取得
  const [title, sub, copy] = await Promise.all([
    getHeaderTitle(),
    getSubTitle(),
    getCopyright(),
    // getChatbotEmbedCode(),
  ]);

  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col bg-gray-50">
        <Header title={title} sub={sub} />
        {/* main要素にpaddingやmax-widthを設定し、コンテンツエリアを中央に配置 */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer copy={copy} />
        {/* チャットボットをbodyの末尾に配置 */}
        {/* <Chatbot embedCode={chatbotEmbed} /> */}
      </body>
    </html>
  );
}
