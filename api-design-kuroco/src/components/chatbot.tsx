// src/components/chatbot.tsx
"use client"; // 埋め込みスクリプトを扱うためクライアントコンポーネントに

type ChatbotProps = {
  embedCode: string;
};

const Chatbot = ({ embedCode }: ChatbotProps) => {
  if (!embedCode) return null;

  return (
    // セキュリティリスクを理解した上で、CMSから取得したコードを埋め込む
    <div dangerouslySetInnerHTML={{ __html: embedCode }} />
  );
};

export default Chatbot;
