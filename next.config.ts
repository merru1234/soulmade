// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Use remotePatterns (recommended in Next 16)
    remotePatterns: [
      {
        protocol: "https",
        // 👇 REPLACE this with *your* Supabase project domain
        // e.g. "uncrflinmfbkngscfnkw.supabase.co"
        hostname: "uncrflinmfbkngscfnkw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
