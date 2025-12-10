"use client";

import Image from "next/image";
import Link from "next/link";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11">
            <Image
              src="/SoulMade.png"
              alt="SoulMade logo"
              fill
              className="object-contain drop-shadow-sm"
            />
          </div>
          <Link href="/" className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight text-[#16377A]">
              SoulMade
            </h1>
          </Link>
        </div>

        <div className="flex gap-2">
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-full border border-[#123b8c] text-sm font-medium text-[#123b8c] hover:bg-[#123b8c] hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-full bg-[#c12a63] text-white text-sm font-medium shadow-sm hover:bg-[#a91f54] transition-colors"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* CATEGORY CHIPS – PURELY VISUAL */}
      <section className="max-w-5xl mx-auto px-4 pb-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="px-4 py-1.5 rounded-full text-xs md:text-sm border bg-[#123b8c] text-white border-[#123b8c] shadow-sm"
          disabled
        >
          All products
        </button>
        <button
          type="button"
          className="px-4 py-1.5 rounded-full text-xs md:text-sm border bg-white text-[#4b5774] border-[#d4d9e6]"
          disabled
        >
          Handicrafts & Home Decor
        </button>
        <button
          type="button"
          className="px-4 py-1.5 rounded-full text-xs md:text-sm border bg-white text-[#4b5774] border-[#d4d9e6]"
          disabled
        >
          Essentials & Daily Products
        </button>
        <button
          type="button"
          className="px-4 py-1.5 rounded-full text-xs md:text-sm border bg-white text-[#4b5774] border-[#d4d9e6]"
          disabled
        >
          Art & Stationery
        </button>
      </section>

      {/* PRODUCT LIST – 5 CARDS, HARD CODED */}
      <main className="max-w-5xl mx-auto px-4 pb-10 space-y-3">
        {/* 1 */}
        <Link href="/product/1" className="block">
          <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
              <Image
                src="/dummy-products/clay1.jpg"
                alt="Bright clay earrings"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 160px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                    Bright clay earrings
                  </h2>
                  <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                    ₹799
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                  Jewelry & Personal Accessories
                </span>
                <p className="text-sm text-[#5f6b8a]">
                  Hand-painted clay earrings in bright colours. Lightweight and
                  perfect for daily wear.
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9aa3c3]">
                Tap to read the creator&apos;s story →
              </p>
            </div>
          </article>
        </Link>

        {/* 2 */}
        <Link href="/product/2" className="block">
          <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
              <Image
                src="/dummy-products/notebook.jpg"
                alt="Soft-cover doodle notebook"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 160px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                    Soft-cover doodle notebook
                  </h2>
                  <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                    ₹249
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                  Art & Stationery
                </span>
                <p className="text-sm text-[#5f6b8a]">
                  A5 notebook with dotted pages and a hand-drawn cover
                  illustration.
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9aa3c3]">
                Tap to read the creator&apos;s story →
              </p>
            </div>
          </article>
        </Link>

        {/* 3 */}
        <Link href="/product/3" className="block">
          <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
              <Image
                src="/dummy-products/candle.jpg"
                alt="Vanilla soy candle"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 160px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                    Vanilla soy candle
                  </h2>
                  <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                    ₹499
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                  Handicrafts & Home Decor
                </span>
                <p className="text-sm text-[#5f6b8a]">
                  Slow-burning soy candle with a soft vanilla scent, poured in
                  a reusable jar.
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9aa3c3]">
                Tap to read the creator&apos;s story →
              </p>
            </div>
          </article>
        </Link>

        {/* 4 */}
        <Link href="/product/4" className="block">
          <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
              <Image
                src="/dummy-products/mug.jpg"
                alt="Speckled ceramic mug"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 160px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                    Speckled ceramic mug
                  </h2>
                  <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                    ₹599
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                  Essentials & Daily Products
                </span>
                <p className="text-sm text-[#5f6b8a]">
                  Wheel-thrown ceramic mug with speckled glaze and a comfy
                  handle.
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9aa3c3]">
                Tap to read the creator&apos;s story →
              </p>
            </div>
          </article>
        </Link>

        {/* 5 */}
        <Link href="/product/5" className="block">
          <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
              <Image
                src="/dummy-products/pouch.jpg"
                alt="Mini embroidered pouch"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 160px, 100vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                    Mini embroidered pouch
                  </h2>
                  <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                    ₹349
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                  Textile & Fabric Products
                </span>
                <p className="text-sm text-[#5f6b8a]">
                  Zip pouch with colourful hand embroidery. Great for coins,
                  keys, or earbuds.
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9aa3c3]">
                Tap to read the creator&apos;s story →
              </p>
            </div>
          </article>
        </Link>
      </main>
    </div>
  );
}
