/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "20250627-kuroco-test.g.kuroco-img.app",
        pathname: "/**",
      },
    ],
  },
};
