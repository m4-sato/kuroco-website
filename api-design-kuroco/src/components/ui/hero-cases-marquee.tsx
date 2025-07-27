"use client";

import HeroCaseItem from "./hero-case-item";
import { Case } from "@/types";

export default function HeroCasesMarquee({ cases }: { cases: Case[] }) {
  // 無限ループのため同一データを 2 回並べる
  const items = [...cases, ...cases];

  return (
    <div className="overflow-hidden group">
      {" "}
      {/* ← group で hover 制御に使える */}
      <div className="flex animate-marquee">
        {items.map((c, idx) => (
          <HeroCaseItem data={c} key={idx} />
        ))}
      </div>
    </div>
  );
}
