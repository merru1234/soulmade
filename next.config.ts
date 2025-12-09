// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uncfrlinmfbkngscfnkw.supabase.co",
        port: "",
        // your image URL:
        // /storage/v1/object/public/product-images/public/<file>.png
        // so we allow the whole bucket:
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
};

const withPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  // 👇 this line keeps PWA only in production
  disable: !isProd,
});

const nextConfig: NextConfig = withPwa(baseConfig);

export default nextConfig;
