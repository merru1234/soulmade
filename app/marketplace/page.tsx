"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  seller_contact: string | null;
  category: string | null;
  image_url: string | null;
  status?: string | null;
};

const fallbackProducts: Product[] = [];

const CATEGORIES = [
  "All",
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
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading products (Supabase):", error.message);
          setProducts(fallbackProducts);
        } else if (data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(fallbackProducts);
        }
      } catch (e) {
        console.error("Error loading products (fetch failed):", e);
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11">
            <Image
              src="/SoulMade.png"
              alt="SoulMade logo"
              fill
              className="object-contain drop-shadow-sm"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#16377A]">
            SoulMade
          </h1>
        </Link>

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

      {/* CATEGORY CHIPS */}
      <section className="max-w-5xl mx-auto px-4 pb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={
                "px-4 py-1.5 rounded-full text-xs md:text-sm border transition-colors " +
                (isActive
                  ? "bg-[#123b8c] text-white border-[#123b8c] shadow-sm"
                  : "bg-white text-[#4b5774] border-[#d4d9e6] hover:border-[#123b8c]/50")
              }
            >
              {cat === "All" ? "All products" : cat}
            </button>
          );
        })}
      </section>

      {/* PRODUCT LIST */}
      <main className="max-w-5xl mx-auto px-4 pb-10 space-y-3">
        {loading && (
          <p className="text-sm text-[#7d88a8]">Loading products…</p>
        )}

        {!loading && visibleProducts.length === 0 && (
          <p className="text-sm text-[#7d88a8]">
            No products in this category yet. Check back soon!
          </p>
        )}

        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="block"
          >
            <article className="bg-white rounded-2xl shadow-sm border border-[#e3e7f2] hover:shadow-md hover:border-[#c12a63]/30 transition flex flex-col md:flex-row gap-4 p-4">
              {product.image_url && (
                <div className="relative w-full md:w-40 h-40 md:h-32 rounded-xl overflow-hidden bg-[#eef1fb]">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 160px, 100vw"
                  />
                </div>
              )}

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

                  {product.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63] mb-1">
                      {product.category}
                    </span>
                  )}

                  <p className="text-sm text-[#5f6b8a] line-clamp-2">
                    {product.description}
                  </p>
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
