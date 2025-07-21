// import { Badge } from "@/components/ui/badge";

// export default function ToolsPanel({ tools }: { tools: any[] }) {
//   return (
//     <aside className="bg-gray-100 p-4 rounded space-y-3">
//       {tools.map((t) => (
//         <div key={t.id} className="flex items-center gap-3">
//           <img src={t.icon.url} className="w-9 h-9" />
//           <span>{t.name}</span>
//           <Badge variant={t.status === "OK" ? "success" : "secondary"}>
//             {t.status}
//           </Badge>
//         </div>
//       ))}
//     </aside>
//   );
// }

// src/components/ui/tools-panel.tsx
"use client";
import Image from "next/image";
import Badge from "./badge";
import type { Tool } from "@/types";

export default function ToolsPanel({ tools = [] }: { tools: Tool[] }) {
  if (!tools.length)
    return <p className="text-sm text-gray-400">ツールは未登録です</p>;

  return (
    <ul className="space-y-3">
      {tools.map((t) => (
        <li
          key={t.topics_id}
          className="flex items-center justify-between p-3 rounded-lg bg-gray-100"
        >
          <div className="flex items-center gap-3">
            {t.ext_1?.url ? (
              <Image
                src={t.ext_1.url}
                alt={t.ext_1.desc ?? t.subject}
                width={32}
                height={32}
                className="rounded"
              />
            ) : (
              <span className="w-8 h-8 bg-gray-300 rounded" />
            )}
            <span>{t.subject}</span>
          </div>
          {/* slug でステータスを判定 */}
          {t.slug === "chatgpt" && <Badge label="準備中" variant="wip" />}
          {t.slug === "claude" && <Badge label="OK" variant="hot" />}
        </li>
      ))}
    </ul>
  );
}
