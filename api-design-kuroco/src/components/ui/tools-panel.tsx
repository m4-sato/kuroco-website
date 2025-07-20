import { Badge } from "@/components/ui/badge";

export default function ToolsPanel({ tools }: { tools: any[] }) {
  return (
    <aside className="bg-gray-100 p-4 rounded space-y-3">
      {tools.map((t) => (
        <div key={t.id} className="flex items-center gap-3">
          <img src={t.icon.url} className="w-9 h-9" />
          <span>{t.name}</span>
          <Badge variant={t.status === "OK" ? "success" : "secondary"}>
            {t.status}
          </Badge>
        </div>
      ))}
    </aside>
  );
}
