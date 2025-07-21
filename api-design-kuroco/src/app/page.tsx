// src/app/page.tsx
import HeroCases from "@/components/ui/hero-cases";
import ToolsPanel from "@/components/ui/tools-panel";
import CasesPanel from "@/components/ui/cases-panel";

import {
  getLatestCases,
  getTools,
  getAllCases, // 右側用
} from "@/lib/kuroco";

export default async function Page() {
  const [cases5, tools, allCases] = await Promise.all([
    getLatestCases(),
    getTools(),
    getAllCases(),
  ]);

  //   return (
  //     <div className="container mx-auto px-4 py-8 space-y-12">
  //       {/* Hero */}
  //       <section className="bg-blue-200 rounded-lg p-6">
  //         <h2 className="text-xl font-semibold mb-4">AI 活用事例（最新 5 件）</h2>
  //         <HeroCases cases={cases5} />
  //       </section>

  //       {/* 2 カラム */}
  //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //         <aside className="lg:col-span-1">
  //           <h3 className="font-semibold mb-2">AI 活用ツール</h3>

  //           {/* ★ 万一空ならプレースホルダだけ表示 */}
  //           {tools.length ? (
  //             <ToolsPanel tools={tools} />
  //           ) : (
  //             <p className="text-sm text-gray-500">
  //               ツール情報が取得できませんでした
  //             </p>
  //           )}
  //         </aside>
  //         {/* <ToolsPanel tools={tools} />
  //         </aside> */}

  //         <main className="lg:col-span-2">
  //           <h3 className="font-semibold mb-2">AI 活用事例</h3>
  //           <CasesPanel cases={allCases} />
  //         </main>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <HeroCases cases={cases5} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <section>
          <h2 className="font-semibold mb-3">AI 活用ツール</h2>
          <ToolsPanel tools={tools} />
        </section>

        <section>
          <h2 className="font-semibold mb-3">AI 活用事例</h2>
          <CasesPanel cases={allCases} />
        </section>
      </div>
    </>
  );
}
