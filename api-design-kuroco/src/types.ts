// src/types.ts
export type Case = {
  topics_id: number;
  subject: string;
  slug: string; // ステータス判定に使う
};

export type Tool = {
  topics_id: number;
  subject: string;
  slug: string; // ステータス判定に使う
};

export interface ImageExt {
  url: string;
  desc?: string;
}

export interface Tool {
  topics_id: number;
  subject: string;
  ext_1?: {
    url: string;
    desc?: string;
  }; // ★ 追加
}

export interface Case {
  topics_id: number;
  subject: string;
  ext_1?: ImageExt; // ★ 追加
  // …他のフィールド
}
