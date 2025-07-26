import { forwardRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Case } from "@/types";

interface Props {
  data: Case;
}

// forwardRef にすると shadcn のスタイル拡張が簡単
export const CaseCard = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const unavailable = data.status === "準備中";

  return (
    <article
      ref={ref}
      className={`flex gap-4 rounded-md border p-4 shadow-sm ${
        unavailable && "opacity-70"
      }`}
    >
      <Image
        src={data.thumbnail_img?.public_path ?? "/file.svg"}
        alt={data.title}
        width={96}
        height={96}
        className="rounded object-cover shrink-0"
      />

      <div className="flex-1">
        <h3 className="font-medium">{data.title}</h3>
        <p className="text-sm line-clamp-2 mb-2">{data.lead}</p>

        <div className="flex gap-2 text-xs">
          <Badge variant={unavailable ? "secondary" : "default"}>
            {unavailable ? "準備中" : "利用可"}
          </Badge>
          {data.tool && <Badge variant="outline">{data.tool}</Badge>}
        </div>
      </div>
    </article>
  );
});
CaseCard.displayName = "CaseCard";
