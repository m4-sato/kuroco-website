import { Tool } from "@/types";
import ToolCard from "./tool-card";

export default function ToolsPanel({
  heading,
  tools,
}: {
  heading: string;
  tools: Tool[];
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold mb-3">{heading}</h2>
      <div className="space-y-3">
        {tools.map((t) => (
          <ToolCard key={t.topics_id} data={t} />
        ))}
      </div>
    </section>
  );
}
