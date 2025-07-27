// src/app/search/page.tsx
import { kurocoFetch } from "@/lib/kuroco";
import { Case, ListResponse } from "@/types";
import CaseCard from "@/components/ui/case-card";
import { notFound } from "next/navigation";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  const keyword = searchParams.keyword?.trim() ?? "";

  if (!keyword) {
    return <p className="text-center mt-10">キーワードを入力してください。</p>;
  }

  const endpoint = `/search?topics_group_id=12&topics_keyword=${encodeURIComponent(
    keyword
  )}`;

  const { list } = await kurocoFetch<ListResponse<Case>>(endpoint, false);

  if (list.length === 0) {
    return <p className="text-center mt-10">該当する事例がありません。</p>;
  }

  return (
    <div className="max-w-[960px] mx-auto my-10 space-y-4 px-4">
      <h1 className="text-lg font-semibold">
        「{keyword}」の検索結果（{list.length} 件）
      </h1>
      {list.map((c) => (
        <CaseCard key={c.topics_id} data={c} />
      ))}
    </div>
  );
}
