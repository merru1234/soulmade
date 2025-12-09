import type { Metadata } from "next";
import "./globals.css";
import MobileNav from "./components/MobileNav";



export const metadata = {
  title: "SoulMade",
  description: "SoulMade marketplace",
  manifest: "/manifest.webmanifest",
  themeColor: "#16377A",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f3f6fb] text-[#071428] antialiased">
  <div className="min-h-screen pb-24 bg-[#f3f6fb]">
    {children}
  </div>

  <MobileNav />
</body>

    </html>
  );
}
