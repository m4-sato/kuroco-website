"use client";
import Image from "next/image";
import { Case } from "@/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function HeroCases({ cases }) {
  const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 8000 });

  return (
    <div ref={parent} className="flex gap-6 overflow-hidden animate-scroll">
      {cases.map((c) => (
        <Image
          key={c.topics_id}
          src={c.ext_1.url}
          alt={c.subject}
          width={200}
          height={120}
          className="rounded-lg"
        />
      ))}
    </div>
  );
}
