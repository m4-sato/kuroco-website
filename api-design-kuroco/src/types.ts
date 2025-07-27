// src/types.ts
/** ヘッドレス CMS の事例カード構造 */
export interface Case {
  topics_id: number;
  subject: string;
  contents: string;
  thumbnail?: { url: string };
  "category-data-ai"?: { key: "data" | "ai"; label: string };
  // ↓ ツールステータス (ready / preparing)
  tool_status?: { key: "ready" | "preparing"; label: string }[];
  published_at?: string;
}

/** list 付きレスポンス共通ラッパー */
export interface ListResponse<T> {
  list: T[];
}
