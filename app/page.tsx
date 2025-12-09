// app/page.tsx  (HOME PAGE)

import Image from "next/image";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/SoulMade.png" alt="SoulMade logo" width={45} height={45} />
          <h1 className="text-2xl font-semibold tracking-tight text-[#16377A]">
            SoulMade
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {/* Settings (for accessibility, screen reader, etc.) */}
          <Link
            href="/settings"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-[#c8cee4] px-3 py-2 text-xs font-medium text-[#16377A] hover:bg-[#e5ecff] transition-colors"
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>

          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-full border border-[#123b8c] text-[#123b8c] text-sm font-medium hover:bg-[#123b8c] hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-full bg-[#c12a63] text-white text-sm font-medium hover:bg-[#a91f54] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
          A marketplace built around differently-abled creators.
        </h2>
        <p className="text-[#55627a] max-w-2xl text-sm md:text-base">
          Discover handmade products, learn from real creators, and explore inclusive job
          opportunities — all inside one simple platform.
        </p>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Marketplace */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3e7f2] flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">Marketplace</h3>
            <p className="text-sm text-[#55627a] mt-1">
              Browse products crafted by differently-abled creators and buy from them directly.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-[#123b8c] text-sm font-medium mt-3 inline-block"
          >
            View products →
          </Link>
        </div>

        {/* Creator Space */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3e7f2] flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">Creator space</h3>
            <p className="text-sm text-[#55627a] mt-1">
              Creator-led tutorials, skills, and knowledge sharing — coming soon.
            </p>
          </div>
          <span className="text-[#c12a63] text-sm font-medium mt-3 inline-block">
            Coming soon →
          </span>
        </div>

        {/* Job Board */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3e7f2] flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg">Job Board</h3>
            <p className="text-sm text-[#55627a] mt-1">
              Curated job and gig opportunities that welcome differently-abled talent.
            </p>
          </div>
          <span className="text-[#c12a63] text-sm font-medium mt-3 inline-block">
            Coming soon →
          </span>
        </div>
      </section>

      {/* View all products */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Link
          href="/marketplace"
          className="text-[#123b8c] text-sm font-medium hover:underline"
        >
          View all products →
        </Link>
      </section>
    </div>
  );
}
