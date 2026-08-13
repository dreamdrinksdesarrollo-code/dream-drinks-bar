import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  trailingSlash: false,
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  images: {
    // Serve WebP and AVIF — smaller than JPEG/PNG with same quality
    formats: ["image/avif", "image/webp"],
    // Aggressive cache: 30 days for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
  // Cache static assets for 1 year
  async headers() {
    return [
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
