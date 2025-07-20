"use client";
import { Case } from "@/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function HeroCases({ cases }: { cases: Case[] }) {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 8000 }); // 左→右自動スクロール
  return (
    <section className="bg-blue-50 border p-4 overflow-hidden">
      <div ref={parent} className="flex gap-6 animate-scroll-x">
        {cases.map((c) => (
          <div key={c.id} className="min-w-[180px] flex-shrink-0">
            <img src={c.thumbnail.url} alt="" className="rounded" />
            <p className="text-center mt-1">{c.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
