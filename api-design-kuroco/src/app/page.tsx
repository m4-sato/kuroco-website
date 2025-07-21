// src/app/page.tsx
// export default function Page() {
//   // 何も描画しない ── レイアウト側 (Header / Footer) だけを確認
//   return null;
// }

// src/app/page.tsx
// export default function Page() {
//   return (
//     <div className="container mx-auto px-4 py-8 space-y-12">
//       {/* Hero セクション */}
//       <section className="bg-blue-200 rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-2">AI 活用事例（最新 5 件）</h2>
//         {/* 後で HeroCases コンポーネントを差し込む */}
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ④ AI 活用ツール（左） */}
//         <aside className="lg:col-span-1">
//           <h3 className="font-semibold mb-2">AI 活用ツール</h3>
//           {/* ToolsPanel をここに */}
//         </aside>

//         {/* ⑤ AI 活用事例（右） */}
//         <main className="lg:col-span-2">
//           <h3 className="font-semibold mb-2">AI 活用事例</h3>
//           {/* CasesPanel をここに */}
//         </main>
//       </div>
//     </div>
//   );
// }

import {
  getLatestCases,
  getTools,
  getAllCases, // 右側用
} from "@/lib/kuroco";
import HeroCases from "@/components/ui/hero-cases";
import ToolsPanel from "@/components/ui/tools-panel";
import CasesPanel from "@/components/ui/cases-panel";

export default async function Page() {
  const [cases5, tools, allCases] = await Promise.all([
    getLatestCases(),
    getTools(),
    getAllCases(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero */}
      <section className="bg-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">AI 活用事例（最新 5 件）</h2>
        <HeroCases cases={cases5} />
      </section>

      {/* 2 カラム */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <h3 className="font-semibold mb-2">AI 活用ツール</h3>

          {/* ★ 万一空ならプレースホルダだけ表示 */}
          {tools.length ? (
            <ToolsPanel tools={tools} />
          ) : (
            <p className="text-sm text-gray-500">
              ツール情報が取得できませんでした
            </p>
          )}
        </aside>
        {/* <ToolsPanel tools={tools} />
        </aside> */}

        <main className="lg:col-span-2">
          <h3 className="font-semibold mb-2">AI 活用事例</h3>
          <CasesPanel cases={allCases} />
        </main>
      </div>
    </div>
  );
}
