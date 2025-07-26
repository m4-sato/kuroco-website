# 役割

優秀なヘッドレス CMS（kuroco）エンジニア

# 指示

kuroco の CMS と連携して添付画像の通りのサイトを構築したいです。step-by-step で教えてください。

# 条件

- 画面構成
  - ヘッダー
  - Hero
    - carousel
    - 活用ツール/事例の 2 カラム
  - フッター
- API 設計
  - AI 事例のコンテンツ:/rcms-api/1/ai_cases
  - AI 活用ツール：/rcms-api/1/ai_tools
  - ヘッダー・フッター・copyright：/rcms-api/1/site_settings/{topics_id}

| テーブル名 (API 名) | フィールド（例）                                                                                                | 型・設定                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **site_settings**   | header_title / sub_title / copyright                                                                            | Text                      |
| **ai_cases**        | title (Text) / thumbnail (Image) / tag (Select “人気/レア/通常”) / summary (Textarea) / published_at (DateTime) | 必要に応じて slug も      |
| **ai_tools**        | name (Text) / icon (Image) / status (Select “準備中/OK/β”) / description                                        | —                         |
| **chatbot_widget**  | embed_code (Textarea)                                                                                           | Dify スニペット貼り付け用 |

- kuroco.ts

```
// //home/azureuser/Git/kuroco-website/api-design-kuroco/src/lib/kuroco.ts
import type { Case, Tool } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const HEADERS = { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY! };

/** 共通 fetch helper（失敗しても空配列） */
// list を返す API 用
async function fetchList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: HEADERS,
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return Array.isArray(json.list) ? json.list : [];
  } catch {
    return []; // ← map() で落ちないよう常に配列
  }
}

async function fetchSetting(topicsId: number): Promise<string> {
  const res = await fetch(`${BASE}/rcms-api/1/site_settings/${topicsId}`, {
    headers: HEADERS,
    next: { revalidate: 60 },
  });
  return (await res.json()).details?.subject ?? "";
}

export const getHeaderTitle = () => fetchSetting(4); // header_title
export const getSubTitle = () => fetchSetting(5); // sub_title
export const getCopyright = () => fetchSetting(6); // copyright

// ------- 画面別データ取得 -------

export const getLatestCases = (limit = 5) =>
  fetchList<Case>(
    `/rcms-api/1/ai_cases?topics_group_id[]=10&orders=-ymd&limit=${limit}`
  );

export const getAllCases = () =>
  fetchList<Case>(`/rcms-api/1/ai_cases?topics_group_id[]=10`);

export const getTools = () =>
  fetchList<Tool>(`/rcms-api/1/ai_tools?topics_group_id[]=9`);
```

- page.tsx

```
// src/app/page.tsx
import {
  getLatestCases,
  getTools,
  getAllCases, // 右側用
} from "@/lib/kuroco";

import HeroCases from "@/components/ui/hero-cases";
import HeroCasesCarousel from "@/components/ui/hero-cases-carousel";
import ToolsPanel from "@/components/ui/tools-panel";
import CasesPanel from "@/components/ui/cases-panel";
import HeroCasesMarquee from "@/components/ui/hero-cases-marquee";

export default async function Page() {
  const [latestCases, tools, allCases] = await Promise.all([
    getLatestCases(2),
    getTools(),
    getAllCases(),
  ]);

  //   return (
  //     <>
  //       <section className="py-6">
  //         <HeroCasesMarquee cases={latestCases} />
  //       </section>

  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
  //         <section>
  //           <h2 className="font-semibold mb-3">AI 活用ツール</h2>
  //           <ToolsPanel tools={tools} />
  //         </section>

  //         <section>
  //           <h2 className="font-semibold mb-3">AI 活用事例</h2>
  //           <CasesPanel cases={allCases} />
  //         </section>
  //       </div>
  //     </>
  //   );
  // }

  return (
    // ★ 追加: 幅を制限して中央に
    <main className="w-full max-w-7xl mx-auto px-4">
      {/* カルーセル */}
      <section className="py-6">
        <HeroCasesMarquee cases={latestCases} />
      </section>

      {/* ２カラム */}
      <section className="grid gap-8 md:grid-cols-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <ToolsPanel tools={tools} />
        </div>
        <div>
          <CasesPanel cases={allCases} />
        </div>
      </section>
    </main>
  );
}
```

- layout.tsx

```
import { getHeaderTitle, getSubTitle, getCopyright } from "@/lib/kuroco";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [title, sub, copy] = await Promise.all([
//     getHeaderTitle(),
//     getSubTitle(),
//     getCopyright(),
//   ]);

//   return (
//     <html lang="ja">
//       <body className="flex min-h-screen flex-col">
//         <Header title={title} sub={sub} />
//         <main className="flex-1">{children}</main>
//         <Footer copy={copy} />
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        NameHeaderHere
        {/* 👇 追加 － 全ページ共通で幅を絞る */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
```

- global.css

```
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@import "keen-slider/keen-slider.min.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ここに追記 */
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
.marquee {
  animation: marquee 15s linear infinite;
}

.embla {
  -webkit-overflow-scrolling: touch;
}
.embla__slide {
  min-width: 0; /* Safari flex-basis バグ対策 */
}

/* src/app/globals.css ─ 末尾に追記 */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 25s linear infinite;
}

/* ――追加で “リセット” 系を入れておくと bullet が消える ―― */
ul[class] {
  @apply list-none p-0 m-0;
}
```

# 目標

ヘッドレス CMS(kuroco)と連携してコンテンツを適切に画面に表示できるようにする。

# 指示

1. 優秀な Next.js フロントエンジニア
2. 優秀なヘッドレス CMS（Kuroco）エンジニア

# 指示

添付画像の通り社内のデータ活用・AI 活用事例のサイトを構築したいです。
step-by-step で教えてください。

# 条件

## 使用する技術

- フロントエンド
  - React,Next.js
  - Tailwindcss(shadncn)
- バックエンド
  Kuroco(ヘッドレス CMS)

## 画面レイアウトイメージ

添付画像を参照

### ヘッダー

①②

### NewContents

- ③ Carousel：事例が 3 件表示される
- ⑦ 検索窓：キーワード検索

### twocolumn

- 左の列：データ活用事例
- 右の列：AI 活用事例

### フッター

⑥ copy right

## ヘッドレス CMS

kuroco 参照情報：

- [kuroco 管理サイト](https://20250627-kuroco-test.g.kuroco-mng.app/management/menu/menu/)
- [kuroco 管理画面マニュアル](https://kuroco.app/ja/docs/management/dashboard/)

## 設計

静的と動的で分けたいです。

### Jamstack

- SSG:①,②,⑥
- SSR:③

### API 設計

- 事例取得用 API
  - ヘッドレス CMS に投稿される内容を取得する API
  - エンドポイント:/rcms-api/4/cases-cards/{topics_id}
- 検索用 API
  - 事例集からキーワード検索する。
  - エンドポイント:/rcms-api/4/search

# 目標

ヘッドレス CMS ベースのサイトを構築する。
