"use client";
import { useEffect } from "react";

export default function Chatbot({ embed }: { embed: string }) {
  useEffect(() => {
    const s = document.createElement("script");
    s.innerHTML = embed; // Dify の埋め込みコード
    document.body.appendChild(s);
  }, [embed]);

  return null; // ウィジェットが JS で DOM を追加してくれる
}
