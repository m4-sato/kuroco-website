//home/azureuser/Git/kuroco-website/api-design-kuroco/src/lib/kuroco.ts

const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const H = { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY! };

export async function getLatestCases(limit = 5) {
  const r = await fetch(
    `${BASE}/rcms-api/1/ai_cases?orders=-published_at&limit=${limit}`,
    { headers: H }
  );
  return (await r.json()).list;
}

export async function getTools() {
  const r = await fetch(`${BASE}/rcms-api/1/ai_tools`, { headers: H });
  return (await r.json()).list;
}

export async function getAllCases() {
  const r = await fetch(`${BASE}/rcms-api/1/ai_cases`, { headers: H });
  return (await r.json()).list;
}

export async function getSettings() {
  const r = await fetch(`${BASE}/rcms-api/1/site_settings/1`, { headers: H });
  return (await r.json()).detail;
}
