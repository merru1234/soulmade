"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // path inside /public
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Bright clay earrings",
    price: 799,
    description:
      "Hand-painted clay earrings in bright colours. Lightweight and perfect for daily wear.",
    category: "Jewelry & Personal Accessories",
    image: "/dummy-products/clay1.jpg",
  },
  {
    id: 2,
    name: "Soft-cover doodle notebook",
    price: 249,
    description:
      "A5 notebook with dotted pages and a hand-drawn cover illustration.",
    category: "Art & Stationery",
    image: "/dummy-products/notebook.jpg",
  },
  {
    id: 3,
    name: "Vanilla soy candle",
    price: 499,
    description:
      "Slow-burning soy candle with a soft vanilla scent, poured in a reusable jar.",
    category: "Handicrafts & Home Decor",
    image: "/dummy-products/candle.jpg",
  },
  {
    id: 4,
    name: "Speckled ceramic mug",
    price: 599,
    description:
      "Wheel-thrown ceramic mug with speckled glaze and a comfy handle.",
    category: "Essentials & Daily Products",
    image: "/dummy-products/mug.jpg",
  },
  {
    id: 5,
    name: "Mini embroidered pouch",
    price: 349,
    description:
      "Zip pouch with colourful hand embroidery. Great for coins, keys, or earbuds.",
    category: "Textile & Fabric Products",
    image: "/dummy-products/pouch.jpg",
  },
];

const CATEGORIES = [
  "All products",
  "Handicrafts & Home Decor",
  "Essentials & Daily Products",
  "Furnitures and Utility",
  "Art & Stationery",
  "Jewelry & Personal Accessories",
  "Textile & Fabric Products",
  "Festive & Religious Items",
  "Toys & Kids’ Products",
  "Sweets, Snacks & Packaged Foods",
];

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

      {/* CATEGORY CHIPS – purely visual, no filtering */}
      <section className="max-w-5xl mx-auto px-4 pb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat, idx) => {
          const isActive = idx === 0; // only "All products" highlighted
          return (
            <button
              key={cat}
              type="button"
              className={
                "px-4 py-1.5 rounded-full text-xs md:text-sm border transition-colors " +
                (isActive
                  ? "bg-[#123b8c] text-white border-[#123b8c] shadow-sm"
                  : "bg-white text-[#4b5774] border-[#d4d9e6]")
              }
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* PRODUCT LIST – ALWAYS renders all 5 */}
      <main className="max-w-5xl mx-auto px-4 pb-10 space-y-3">
        {PRODUCTS.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
            <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
              <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h2 className="text-base md:text-lg font-semibold text-[#071428]">
                      {product.name}
                    </h2>
                    <span className="text-sm md:text-base font-semibold text-[#123b8c]">
                      ₹{product.price}
                    </span>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                    {product.category}
                  </span>

                  <p className="text-sm text-[#5f6b8a]">{product.description}</p>
                </div>

                <p className="mt-2 text-xs text-[#9aa3c3]">
                  Tap to read the creator&apos;s story →
                </p>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </div>
  );
}
