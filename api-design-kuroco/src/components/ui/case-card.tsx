// src/components/ui/case-card.tsx
import Image from "next/image";
import { Case } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function CaseCard({ data }: { data: Case }) {
  const unavailable = data.tool_status?.[0]?.key === "preparing";
  const imgSrc = data.thumbnail?.url ?? "/file.svg";

  return (
    <article
      className={
        "flex gap-3 bg-panelBg rounded-lg p-3 hover:bg-[#dcdcdc] hover:shadow-md transition cursor-pointer"
      }
    >
      <Image
        src={imgSrc}
        alt={data.subject}
        width={96}
        height={96}
        className="rounded-panel w-16 h-16 object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium">{data.subject}</h3>
        <div className="mt-2 text-xs">
          <Badge
            className="bg-accent/20 text-accent border border-accent/30"
            role="status"
          >
            {unavailable ? "準備中" : "利用可"}
          </Badge>
        </div>
      </div>
    </article>
  );
}
