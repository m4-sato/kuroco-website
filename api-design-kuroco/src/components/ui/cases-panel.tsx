import { Case } from "@/types";
import CaseCard from "@/components/ui/case-card";

export default function CasesPanel({
  heading,
  cases,
}: {
  heading: string;
  cases: Case[];
}) {
  return (
    <section className="space-y-4">
      {heading && <h2 className="text-sm font-semibold mb-3">{heading}</h2>}
      <div className="space-y-3">
        {cases.map((c) => (
          <CaseCard key={c.topics_id} data={c} />
        ))}
      </div>
    </section>
  );
}
