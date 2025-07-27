import { Tool } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ToolCard({ data }: { data: Tool }) {
  return (
    <article className="flex items-center gap-3 bg-card border border-border/50 rounded-lg p-3 hover:shadow-md transition">
      <Image
        src={data.thumbnail?.url ?? "/file.svg"}
        alt={data.subject}
        width={48}
        height={48}
        className="rounded-md object-cover"
      />
      <h3 className="flex-1 text-sm font-medium truncate">{data.subject}</h3>
      <Badge variant="secondary">
        {data.tool_status?.[0]?.label ?? "準備中"}
      </Badge>
    </article>
  );
}
