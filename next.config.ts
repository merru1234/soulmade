// next.config.ts
// ✅ Tell TypeScript to chill for this file
// @ts-nocheck

import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // We only use local images right now, so this can be simple
  images: {
    remotePatterns: [],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd, // PWA only in production
})(nextConfig);
