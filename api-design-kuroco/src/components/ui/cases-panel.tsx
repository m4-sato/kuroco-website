import { Case } from "@/types";
import { CaseCard } from "./case-card";

export default function CasesPanel({
  heading,
  cases,
}: {
  heading: string;
  cases: Case[];
}) {
  return (
    <section>
      {heading && <h2 className="text-lg font-semibold mb-4">{heading}</h2>}
      <div className="flex flex-col gap-4">
        {cases.map((c) => (
          <CaseCard key={c.topics_id} data={c} />
        ))}
      </div>
    </section>
  );
}
