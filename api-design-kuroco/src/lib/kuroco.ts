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
