import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "20250627-kuroco-test.g.kuroco.app",
      },
    ],
  },
};

export default nextConfig;
