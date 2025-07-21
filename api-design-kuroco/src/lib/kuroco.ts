// //home/azureuser/Git/kuroco-website/api-design-kuroco/src/lib/kuroco.ts
import type { Case, Tool } from "@/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const HEADERS = { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY! };

async function fetchSetting(id: number) {
  const res = await fetch(`${BASE}/rcms-api/1/site_settings/${id}`, {
    headers: HEADERS,
    next: { revalidate: 60 }, // 任意：ISR 60 秒
  });
  return (await res.json()).details.subject as string;
}

// ── エクスポート関数 ──────────────────────────
export const getHeaderTitle = () => fetchSetting(4); // slug: header_title
export const getSubTitle = () => fetchSetting(5); // slug: sub_title
export const getCopyright = () => fetchSetting(6); // slug: copyright

export async function getLatestCases(limit = 5): Promise<Case[]> {
  const r = await fetch(
    `${BASE}/rcms-api/1/ai_cases?orders=-published_at&limit=${limit}`,
    { headers: HEADERS, next: { revalidate: 60 } }
  );
  return (await r.json()).list;
}

export async function getAllCases(): Promise<Case[]> {
  const r = await fetch(`${BASE}/rcms-api/1/ai_cases`, {
    headers: HEADERS,
    next: { revalidate: 60 },
  });
  return (await r.json()).list;
}

export async function getTools(): Promise<Tool[]> {
  const r = await fetch(`${BASE}/rcms-api/1/ai_tools`, {
    headers: HEADERS,
    next: { revalidate: 60 },
  });
    
  const json = await r.json();
  return Array.isArray(json.list) ? json.list : [];
} catch (e) {
  console.error("getTools error", e);
  return [];            // ★ ここで必ず配列を返す
  }
}