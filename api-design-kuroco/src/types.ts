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

// src/types.ts へ追記
export interface Tool {
  topics_id: number;
  subject: string; // タイトル（例: Tableau）
  contents: string; // HTML 詳細
  ymd: string; // 公開日
  category_data_ai?: {
    // データ or AI
    key: "data" | "ai";
    label: string;
  };
  thumbnail?: {
    url: string;
    url_org: string;
    desc: string;
  };
  tool_status?: {
    // 使用可 / 準備中
    key: "ready" | "prepare";
    label: string;
  }[];
}
export interface ToolListResponse extends ListResponse<Tool> {}
