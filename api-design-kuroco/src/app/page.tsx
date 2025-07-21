// // src/app/page.tsx
// import { getLatestCases, getTools, getAllCases } from "@/lib/kuroco";
// import HeroCasesMarquee from "@/components/ui/hero-cases-marquee";
// import ToolsPanel from "@/components/ui/tools-panel";
// import CasesPanel from "@/components/ui/cases-panel";

// export default async function Page() {
//   // allCasesは不要。活用事例セクションでは最新5件を表示するなど調整すると良い
//   // ここではデザインに合わせて最新5件を取得
//   const [marqueeCases, tools, panelCases] = await Promise.all([
//     getLatestCases(5), // Marquee用に5件
//     getTools(),
//     getAllCases(), // パネル表示用に全件（またはページネーションを検討）
//   ]);

//   return (
//     <div className="space-y-12">
//       {/* ③ AI活用事例 (Marquee) */}
//       <section>
//         <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
//           AI活用事例
//         </h2>
//         {/* デザインでは静的だが、動きのあるMarqueeコンポーネントを使用 */}
//         <HeroCasesMarquee cases={marqueeCases} />
//       </section>

//       {/* ④ AI活用ツール と ⑤ AI活用事例 (2カラム) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         <section>
//           <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
//             ④ AI活用ツール
//           </h2>
//           <ToolsPanel tools={tools} />
//         </section>

//         <section>
//           <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
//             ⑤ AI活用事例
//           </h2>
//           <CasesPanel cases={panelCases} />
//         </section>
//       </div>
//     </div>
//   );
// }

import {
  getLatestCases,
  getTools,
  getAllCases,
  // ★ ラベル取得
  getLabelAiCases,
  getLabelAiTools,
  getLabelAiPanel,
} from "@/lib/kuroco";

import HeroCasesMarquee from "@/components/ui/hero-cases-marquee";
import ToolsPanel from "@/components/ui/tools-panel";
import CasesPanel from "@/components/ui/cases-panel";

export default async function Page() {
  const [
    marqueeCases, // 事例（Marquee 用）
    tools, // ツール
    panelCases, // パネル用事例（全件など）
    labelAiCases,
    labelAiTools,
    labelAiPanel,
  ] = await Promise.all([
    getLatestCases(5),
    getTools(),
    getAllCases(),
    getLabelAiCases(),
    getLabelAiTools(),
    getLabelAiPanel(),
  ]);

  return (
    <div className="space-y-12">
      {/* ① AI 活用事例（Marquee） */}
      <section>
        <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
          {labelAiCases || "AI活用事例"}
        </h2>
        <HeroCasesMarquee cases={marqueeCases} />
      </section>

      {/* ② 2 カラム */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section>
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
            {labelAiTools || "AI活用ツール"}
          </h2>
          <ToolsPanel tools={tools} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3">
            {labelAiPanel || "AI活用事例"}
          </h2>
          <CasesPanel cases={panelCases} />
        </section>
      </div>
    </div>
  );
}
