// src/app/page.tsx
import {
  fetchAllCases,
  fetchLatestCases,
  fetchCasesByCategory,
  fetchToolsByCategory,
} from "@/lib/kuroco";
// import HeroCasesCarousel from "@/components/ui/hero-cases-carousel";
import HeroCasesMarquee from "@/components/ui/hero-cases-marquee";
import SearchBar from "@/components/ui/search-bar";
import CasesPanel from "@/components/ui/cases-panel";
import ToolsPanel from "@/components/ui/tools-panel";

export default async function Home() {
  const [
    { list: latest3 },
    { list: dataCases },
    { list: aiCases },
    { list: dataTools }, // ★ データツール
    { list: aiTools }, // ★ AIツール
  ] = await Promise.all([
    fetchLatestCases(),
    fetchCasesByCategory("data"),
    fetchCasesByCategory("ai"),
    fetchToolsByCategory("data"), // ★
    fetchToolsByCategory("ai"), // ★
  ]);

  // // Data / AI 振り分け（category-data-ai.key で判定）
  // const dataCases = allCases.filter(
  //   (c) => c["category-data-ai"]?.key === "data"
  // );
  // const aiCases = allCases.filter((c) => c["category-data-ai"]?.key === "ai");

  return (
    <>
      {/* ③ Hero Carousel ── 青枠で囲む */}
      <div className="border border-accent rounded-lg p-2 bg-headerSub/20 shadow-sm shadow-black/10">
        <HeroCasesMarquee cases={latest3} />
      </div>

      {/* ⑦ 検索窓 */}
      <SearchBar />

      {/* ④ 事例集 2 カラム */}
      <section className="grid md:grid-cols-2 gap-8 my-10">
        <CasesPanel heading="データ活用事例" cases={dataCases} />
        <CasesPanel heading="AI活用事例" cases={aiCases} />
      </section>

      {/* ▼ ⑤ ツール集 2 カラム ------------- */}
      <section className="grid md:grid-cols-2 gap-8 mt-12">
        <ToolsPanel heading="データツール" tools={dataTools} />
        <ToolsPanel heading="AIツール" tools={aiTools} />
      </section>
    </>
  );
}
