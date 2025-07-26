import type { ListResponse } from "@/types";

/** API バージョンをまとめて管理 */
const KUROCO_API_PREFIX = "/rcms-api/1";

/** 汎用フェッチラッパー */
export async function kurocoFetch<T = unknown>(
  endpoint: string, // 例: "/cases-cards?categories=Data"
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

/* ───────────────────────────────────
   ▼ ここから “呼び出し側が使う” 専用関数
   ─────────────────────────────────── */
/** topics_group_id はコンテンツ定義ごとに固定 (ここでは 12) */
const TG_ID = 12;

/* カテゴリー別一覧 */
export const fetchCasesByCategory = (cat: "Data" | "AI") =>
  kurocoFetch<ListResponse<import("@/types").Case>>(
    `/search?topics_group_id[]=${TG_ID}&filter=category_nm:eq:${cat}&cnt=100`,
    600
  );

/* 最新 3 件 */
export const fetchLatestCases = () =>
  kurocoFetch<ListResponse<import("@/types").Case>>(
    `/search?topics_group_id[]=${TG_ID}&cnt=3&order_query=published_at=DESC`,
    60
  );

/* 詳細 */
export const fetchCaseById = (id: number) =>
  kurocoFetch<import("@/types").Case>(`/cases-cards/${id}`, 600);

/* キーワード検索 */
export const searchCases = (keyword: string) =>
  kurocoFetch<ListResponse<import("@/types").Case>>(
    `/search?topics_group_id[]=${TG_ID}&topics_keyword=${encodeURIComponent(
      keyword
    )}`,
    false
  );
