// next.config.ts
import withPWA from "next-pwa";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Safely derive the Supabase hostname from the env URL
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_DOMAIN = SUPABASE_URL ? new URL(SUPABASE_URL).hostname : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: SUPABASE_DOMAIN
      ? [
          {
            protocol: "https",
            hostname: SUPABASE_DOMAIN, // 👈 e.g. "uncrflinmfbkngscfnkw.supabase.co"
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd, // PWA only in production
})(nextConfig);
