// src/components/ui/cases-panel.tsx
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
          <span>{c.subject}</span>
          {c.slug === "document_extract" && (
            <Badge label="人気" variant="hot" />
          )}
          {c.slug === "image_search" && <Badge label="レア" variant="rare" />}
        </li>
      ))}
    </ul>
  );
}
