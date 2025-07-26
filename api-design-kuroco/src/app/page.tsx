import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCasesCarousel from "@/components/ui/hero-cases-carousel";
import CasesPanel from "@/components/ui/cases-panel";
import { SearchBar } from "@/components/ui/search-bar";
import { fetchCasesByCategory, fetchLatestCases } from "@/lib/kuroco";

export default async function Home() {
  const [{ list: latest3 }, { list: dataCases }, { list: aiCases }] =
    await Promise.all([
      fetchLatestCases(),
      fetchCasesByCategory("Data"),
      fetchCasesByCategory("AI"),
    ]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4">
        {/* ③ Carousel */}
        <section className="my-8">
          <HeroCasesCarousel cases={latest3} />
        </section>

        {/* ⑦ 検索窓 */}
        <SearchBar />

        {/* Two‑Column Panels */}
        <section className="grid md:grid-cols-2 gap-8 my-10">
          <CasesPanel heading="データ活用事例" cases={dataCases} />
          <CasesPanel heading="AI活用事例" cases={aiCases} />
        </section>
      </main>

      <Footer />
    </>
  );
}
