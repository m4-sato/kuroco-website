// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ▼▼▼ この2行を追記 ▼▼▼
  output: 'export',
  trailingSlash: true,
  // ▲▲▲ ここまで追記 ▲▲▲

  // 他の設定があれば、それはそのままにしておきます
};

export default nextConfig;
