// src/components/ui/cases-panel.tsx
"use client";
import Image from "next/image";
import Badge from "./badge";
import type { Case } from "@/types";

export default function CasesPanel({ cases }: { cases: Case[] }) {
  return (
    <ul className="space-y-3">
      {cases.map((c) => (
        <li
          key={c.topics_id}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
        >
          <div className="flex items-center gap-3">
            {c.ext_1?.url ? (
              <Image
                src={c.ext_1.url}
                alt={c.ext_1.desc ?? c.subject}
                width={48}
                height={48}
                className="rounded"
              />
            ) : (
              <span className="w-12 h-12 bg-gray-300 rounded" />
            )}
            <span>{c.subject}</span>
          </div>
          {c.slug === "document_extract" && (
            <Badge label="人気" variant="hot" />
          )}
          {c.slug === "image_search" && <Badge label="レア" variant="rare" />}
        </li>
      ))}
    </ul>
  );
}
