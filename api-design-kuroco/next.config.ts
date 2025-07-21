import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.kuroco-img.app", // ★ 追加
      },
    ],
  },
};

export default nextConfig;
