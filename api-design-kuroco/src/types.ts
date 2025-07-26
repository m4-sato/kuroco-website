// src/types.ts
/** ヘッドレス CMS の事例カード構造 */
export interface Case {
  topics_id: number;
  title: string;
  lead: string;
  category_nm: "Data" | "AI";
  thumbnail_img?: { public_path: string };
  tool?: string; // ChatGPT / Tableau など
  status?: "利用可能" | "準備中";
  published_at?: string;
}

/** list 付きレスポンス共通ラッパー */
export interface ListResponse<T> {
  list: T[];
}
