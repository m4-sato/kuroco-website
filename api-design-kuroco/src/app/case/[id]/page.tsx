// src/app/case/[id]/page.tsx
import { fetchCaseById } from "@/lib/kuroco";

export default async function CaseDetail({ params: { id } }: { id: string }) {
  const data = await fetchCaseById(Number(id));

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      {/* 画像・本文などを表示 */}
    </main>
  );
}
