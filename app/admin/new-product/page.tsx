"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name || !price || !category || !description || !sellerContact) {
      setError("Please fill all fields.");
      return;
    }

    if (!imageFile) {
      setError("Please choose a product image.");
      return;
    }

    setSubmitting(true);

    try {
      // 1) Upload image to Supabase Storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images") // <-- bucket name
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        setError("Failed to upload image. Please try again.");
        setSubmitting(false);
        return;
      }

      // 2) Build a public URL from that path
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath);

      // 3) Insert product row (status 'pending' for review)
      const { error: insertError } = await supabase.from("products").insert({
        name,
        price: Number(price),
        category,
        description,
        seller_contact: sellerContact,
        image_url: publicUrl, // <--- important line
        status: "pending", // this column is optional if you already added it
      });

      if (insertError) {
        console.error(insertError);
        setError("Failed to save product. Please try again.");
        setSubmitting(false);
        return;
      }

      // 4) Done
      router.push("/"); // or /creator/thanks later
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center px-4 py-8">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-[2.5rem] px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="flex justify-center mb-6">
          <div className="h-1.5 w-24 rounded-full bg-slate-700" />
        </div>

        <p className="text-xs font-medium tracking-[0.2em] text-slate-400 mb-1">
          SOULMADE · CREATOR
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 mb-2">
          Submit a new product
        </h1>
        <p className="text-xs text-slate-400 mb-6">
          Share your work with the marketplace. Listings go live after review.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-slate-400">Product name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Handmade Clay Earrings"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Price (₹)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min={0}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="799"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Art & Stationery"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 min-h-[80px]"
              placeholder="Short story about the product and the creator…"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">
              Seller contact (WhatsApp link / email)
            </label>
            <input
              value={sellerContact}
              onChange={(e) => setSellerContact(e.target.value)}
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="https://wa.me/91xxxxxxxxxx or mailto:someone@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Product image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
              }}
              className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-500 file:text-slate-950 hover:file:bg-sky-400"
            />
            <p className="text-[11px] text-slate-500">
              JPG or PNG recommended. This will be shown in listings.
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/70 rounded-2xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 rounded-full bg-sky-500 text-slate-950 text-sm font-semibold py-2.5 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-sky-400 transition-colors"
          >
            {submitting ? "Submitting…" : "Submit for review"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-4 text-[11px] text-slate-400 underline-offset-2 hover:underline"
        >
          ← Back to marketplace
        </button>
      </div>
    </div>
  );
}
