import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // হোম-ফোল্ডারে থাকা অতিরিক্ত lockfile-এর কারণে Next ভুল workspace root ধরে;
  // প্রোডাকশন output tracing যেন সঠিক প্রজেক্ট root থেকেই হয়।
  outputFileTracingRoot: path.resolve(__dirname),
  // ছবি/নথি/ভিডিও আপলোডের জন্য Server Action body size
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  eslint: {
    // Production build যেন lint ব্লকে আটকে না যায় (lint আলাদা চালানো যাবে)
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["exceljs", "@prisma/client", "bcryptjs"],
};

export default nextConfig;
