import { searchCases } from "@/lib/kuroco";
import { Case } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CasesPanel from "@/components/ui/cases-panel";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {
  const keyword = searchParams.keyword ?? "";
  const { list } = keyword
    ? await kurocoFetch<ListResponse<Case>>(
        `/rcms-api/1/search?keyword=${encodeURIComponent(keyword)}`,
        false // 常に SSR
      )
    : { list: [] };

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">
          「{keyword}」の検索結果（{list.length}件）
        </h1>

        {list.length === 0 ? (
          <p>該当する事例は見つかりませんでした。</p>
        ) : (
          <CasesPanel heading="" cases={list} />
        )}
      </main>

      <Footer />
    </>
  );
}
