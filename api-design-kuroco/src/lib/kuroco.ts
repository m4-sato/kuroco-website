import type { ListResponse } from "@/types";
import { Case } from "@/types";

/* ---------------------------------- 基本設定 --------------------------------- */
const KUROCO_API_PREFIX = "/rcms-api/1";
const TG_ID = 12; // topics_group_id (事例集)

/* 汎用フェッチ --------------------------------------------------------------- */
export async function kurocoFetch<T = unknown>(
  endpoint: string,
  revalidate: number | false = 0
): Promise<T> {
  if (!process.env.KUROCO_BASE_URL)
    throw new Error("KUROCO_BASE_URL is not defined");

  const url = `${process.env.KUROCO_BASE_URL}${KUROCO_API_PREFIX}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      "X-API-KEY": process.env.KUROCO_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    next: revalidate === false ? { revalidate: 0 } : { revalidate },
  });

  if (!res.ok) throw new Error(`Kuroco API error ${res.status} (${url})`);

  return (await res.json()) as T;
}

/* クエリを安全に組み立てる --------------------------------------------------- */
function buildSearch(params: Record<string, string | number>): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => usp.append(k, String(v)));
  return `/search?${usp.toString()}`;
}

/* ---------------------------- 一覧／Carousel／検索 --------------------------- */
// Data / AI 一覧
export const fetchCasesByCategory = (cat: "Data" | "AI") =>
  kurocoFetch<ListResponse<Case>>(
    buildSearch({
      topics_group_id: TG_ID,
      filter: `category-data-ai:eq:${cat.toLowerCase()}`, // ← 修正点
      cnt: 100,
    }),
    600
  );

// // 最新 3 件（Carousel）
// export const fetchLatestCases = () =>
//   kurocoFetch<ListResponse<Case>>(
//     buildSearch({
//       topics_group_id: TG_ID,
//       cnt: 3,
//       order_query: "published_at=DESC", // “=” は自動で %3D に
//     }),
//     60
//   );

// // キーワード検索
// export const searchCases = (keyword: string) =>
//   kurocoFetch<ListResponse<Case>>(
//     buildSearch({
//       topics_group_id: TG_ID,
//       topics_keyword: keyword,
//     }),
//     false
//   );

// // 詳細
// export const fetchCaseById = (id: number) =>
//   kurocoFetch<Case>(`/cases-cards/${id}`, 600);

/* 共通検索クエリ */
const SEARCH_BASE = `/search?topics_group_id=${TG_ID}`;

/* 一覧：100 件だけ取得 → フロントで振り分け */
export const fetchAllCases = () =>
  kurocoFetch<ListResponse<Case>>(`${SEARCH_BASE}&cnt=100`, 600);

/* 最新 3 件 (Carousel) */
export const fetchLatestCases = () =>
  kurocoFetch<ListResponse<Case>>(
    `${SEARCH_BASE}&cnt=3&order_query=published_at%3DDESC`,
    60
  );

/* キーワード検索（サーバー側フィルタ不可のためフルテキストで） */
export const searchCases = (keyword: string) =>
  kurocoFetch<ListResponse<Case>>(
    `${SEARCH_BASE}&topics_keyword=${encodeURIComponent(keyword)}`,
    false
  );

/* 詳細 */
export const fetchCaseById = (id: number) =>
  kurocoFetch<Case>(`/cases-cards/${id}`, 600);
