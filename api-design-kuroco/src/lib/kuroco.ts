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

// async function fetchSetting(id: number) {
//   const res = await fetch(`${BASE}/rcms-api/1/site_settings/${id}`, {
//     headers: HEADERS,
//     next: { revalidate: 60 }, // 任意：ISR 60 秒
//   });
//   return (await res.json()).details.subject as string;
// }

// 1 件取得 (site_settings 用)
async function fetchSettingBySlug(slug: string): Promise<string> {
  const list = await fetchList(`/rcms-api/1/site_settings?slug=${slug}`);
  return list[0]?.subject ?? "";
}

// ------- 画面別データ取得 -------

export const getHeaderTitle = () => fetchSettingBySlug("header_title");
export const getSubTitle = () => fetchSettingBySlug("sub_title");
export const getCopyright = () => fetchSettingBySlug("copyright");

export const getLatestCases = (limit = 5) =>
  fetchList<Case>(
    `/rcms-api/1/ai_cases?topics_group_id[]=10&orders=-ymd&limit=${limit}`
  );

export const getAllCases = () =>
  fetchList<Case>(`/rcms-api/1/ai_cases?topics_group_id[]=10`);

export const getTools = () =>
  fetchList<Tool>(`/rcms-api/1/ai_tools?topics_group_id[]=9`);

// // ── エクスポート関数 ──────────────────────────
// export const getHeaderTitle = () => fetchSetting(4); // slug: header_title
// export const getSubTitle = () => fetchSetting(5); // slug: sub_title
// export const getCopyright = () => fetchSetting(6); // slug: copyright

// export async function getLatestCases(limit = 5): Promise<Case[]> {
//   const r = await fetch(
//     `${BASE}/rcms-api/1/ai_cases?orders=-published_at&limit=${limit}`,
//     { headers: HEADERS, next: { revalidate: 60 } }
//   );
//   return (await r.json()).list;
// }

// export async function getAllCases(): Promise<Case[]> {
//   const r = await fetch(`${BASE}/rcms-api/1/ai_cases`, {
//     headers: HEADERS,
//     next: { revalidate: 60 },
//   });
//   return (await r.json()).list;
// }

// export async function getTools(): Promise<Tool[]> {
//   try {
//     const r = await fetch(`${BASE}/rcms-api/1/ai_tools`, {
//       headers: HEADERS,
//       next: { revalidate: 60 },
//     });
//     const json = await r.json();
//     return Array.isArray(json.list) ? json.list : [];
//   } catch (e) {
//     console.error("getTools error", e);
//     return []; // ★ 必ず配列を返す
//   } // ← try/catch を閉じる波かっこはここだけ
// } // ← そして関数を閉じる波かっこ

// // ---- ここからページ用 ----
// export const getLatestCases = (limit = 5) =>
//   fetchList(`/rcms-api/1/ai_cases?orders=-ymd&limit=${limit}`);

// export const getAllCases = () => fetchList(`/rcms-api/1/ai_cases`);

// export const getTools = () => fetchList(`/rcms-api/1/ai_tools`);

// export const getHeaderTitle = async () => {
//   const list = await fetchList(`/rcms-api/1/site_settings?slug=header_title`);
//   return list[0]?.subject ?? "";
// };

// export const getSubTitle = async () => {
//   const list = await fetchList(`/rcms-api/1/site_settings?slug=sub_title`);
//   return list[0]?.subject ?? "";
// };

// export const getCopyright = async () => {
//   const list = await fetchList(`/rcms-api/1/site_settings?slug=copyright`);
//   return list[0]?.subject ?? "";
// };
