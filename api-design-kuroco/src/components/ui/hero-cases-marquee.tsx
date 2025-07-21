// /* src/components/ui/hero-cases-marquee.tsx */
// "use client";
// import Image from "next/image";
// import { type Case } from "@/types";
// import { useAutoAnimate } from "@formkit/auto-animate/react";

// export default function HeroCasesMarquee({ cases }: { cases: Case[] }) {
//   const [parent] = useAutoAnimate<HTMLDivElement>({ duration: 15000 });

//   return (
//     /* ★ 追加: max-w と mx-auto で中央に寄せる */
//     <div className="w-full max-w-5xl mx-auto overflow-hidden">
//       {/* 横一列に並べるラッパー */}
//       <div
//         ref={parent}
//         className="flex items-center gap-6 animate-marquee whitespace-nowrap"
//       >
//         {cases.map((c) => (
//           /* ② 画像サイズと object-cover を固定 */
//           <Image
//             key={c.topics_id}
//             src={c.ext_1.url}
//             alt={c.subject}
//             width={240} /* 好きな横幅 */
//             height={160} /*  ↑に合わせた比率 */
//             className="rounded-lg object-cover flex-shrink-0"
//           />
//         ))}
//         {/* 同じ画像をもう一巡分入れて無限ループを自然に */}
//         {cases.map((c) => (
//           <Image
//             aria-hidden
//             key={`dup-${c.topics_id}`}
//             src={c.ext_1.url}
//             alt=""
//             width={260}
//             height={160}
//             className="flex-shrink-0 rounded-lg object-cover"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/components/ui/hero-cases-marquee.tsx
import Image from "next/image";
import type { Case } from "@/types";

type Props = {
  cases: Case[];
};

// // Marqueeをシームレスに見せるため、コンテンツを2回繰り返す
// const HeroCasesMarquee = ({ cases }: Props) => {
//   if (!cases || cases.length === 0) return null;

//   const duplicatedCases = [...cases, ...cases];

//   return (
//     <div className="relative w-full overflow-hidden bg-white p-4 rounded-lg shadow">
//       <div className="flex animate-marquee whitespace-nowrap">
//         {duplicatedCases.map((c, index) => (
//           <div
//             key={`${c.topics_id}-${index}`}
//             className="flex-shrink-0 mx-4 w-48 text-center"
//           >
//             <span className="font-semibold text-gray-700">
//               事例{(index % cases.length) + 1}
//             </span>
//             <p className="truncate text-sm mt-1">{c.title}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroCasesMarquee;

export default function HeroCasesMarquee({ cases }: Props) {
  return (
    <div className="flex gap-6 overflow-hidden animate-scroll">
      {cases.map((c) => (
        <Image
          key={c.topics_id}
          src={c.ext_1.url}
          alt={c.subject}
          width={220}
          height={120}
          className="rounded-lg flex-shrink-0"
        />
      ))}
    </div>
  );
}
