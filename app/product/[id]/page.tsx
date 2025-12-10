// app/product/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  seller_contact: string;
  category: string;
  image_url: string; // not nullable here – our dummy data always has one
};

// 🔹 SAME 5 DUMMY PRODUCTS AS MARKETPLACE
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Bright clay earrings",
    price: 799,
    description:
      "Hand-painted clay earrings with vibrant colours. Lightweight and perfect for daily wear.",
    seller_contact: "https://wa.me/919999000001",
    category: "Jewelry & Personal Accessories",
    image_url: "/dummy-products/clay1.jpg",
  },
  {
    id: 2,
    name: "Soft-cover doodle notebook",
    price: 249,
    description:
      "A5 notebook with dotted pages and a hand-drawn cover illustration.",
    seller_contact: "https://wa.me/919999000002",
    category: "Art & Stationery",
    image_url: "/dummy-products/notebook.jpg",
  },
  {
    id: 3,
    name: "Vanilla soy candle",
    price: 499,
    description:
      "Slow-burning soy candle with a soft vanilla scent, poured in a reusable jar.",
    seller_contact: "https://wa.me/919999000003",
    category: "Handicrafts & Home Decor",
    image_url: "/dummy-products/candle.jpg",
  },
  {
    id: 4,
    name: "Speckled ceramic mug",
    price: 599,
    description:
      "Wheel-thrown ceramic mug with a speckled glaze and a comfy handle.",
    seller_contact: "https://wa.me/919999000004",
    category: "Essentials & Daily Products",
    image_url: "/dummy-products/mug.jpg",
  },
  {
    id: 5,
    name: "Mini embroidered pouch",
    price: 349,
    description:
      "Zip pouch with colourful hand embroidery. Great for coins, keys, or earbuds.",
    seller_contact: "https://wa.me/919999000005",
    category: "Textile & Fabric Products",
    image_url: "/dummy-products/pouch.jpg",
  },
];

function getProductById(id: number): Product | null {
  return DUMMY_PRODUCTS.find((p) => p.id === id) ?? null;
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const numericId = Number(params.id);
  const product =
    Number.isFinite(numericId) && numericId > 0
      ? getProductById(numericId)
      : null;

  // ❌ If ID is invalid or not in our dummy list
  if (!product) {
    return (
      <div className="min-h-screen bg-[#f3f6fb] text-[#071428] flex flex-col">
        <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <Image
                src="/SoulMade.png"
                alt="SoulMade logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-[#16377A]">
              SoulMade
            </span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 pb-24">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#e3e7f2] px-6 py-8 text-center">
            <h1 className="text-lg font-semibold mb-1">
              Product not available
            </h1>
            <p className="text-sm text-[#5f6b8a] mb-4">
              That product link looks a bit strange. It may have been removed or
              doesn&apos;t exist in this prototype.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#123b8c] text-white text-sm font-medium hover:bg-[#0f2f70] transition-colors"
            >
              Back to marketplace
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ✅ Valid product – show full detail view
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9">
            <Image
              src="/SoulMade.png"
              alt="SoulMade logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-[#16377A]">
            SoulMade
          </span>
        </Link>

        <Link
          href="/marketplace"
          className="text-xs md:text-sm text-[#123b8c] hover:underline underline-offset-4"
        >
          ← Back to marketplace
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 pb-24">
        <section className="bg-white rounded-3xl shadow-sm border border-[#e3e7f2] p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="md:w-5/12">
            <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden bg-[#eef1fb]">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63]">
              {product.category}
            </div>
          </div>

          {/* Details */}
          <div className="md:w-7/12 flex flex-col justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold mb-1">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl font-semibold text-[#123b8c] mb-3">
                ₹{product.price}
              </p>
              <p className="text-sm md:text-base text-[#5f6b8a] leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-[#f7f4ff] border border-[#e0dafb]">
              <h2 className="text-sm font-semibold mb-1">
                Ready to place an order?
              </h2>
              <p className="text-xs text-[#5f6b8a] mb-3">
                This is just a prototype – the buttons below don&apos;t complete
                payment yet, but they show how the experience will feel.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-[#c12a63] text-white text-sm font-medium hover:bg-[#a91f54] transition-colors"
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-white text-[#123b8c] border border-[#123b8c] text-sm font-medium hover:bg-[#123b8c] hover:text-white transition-colors"
                >
                  Add to cart
                </button>
                <a
                  href={product.seller_contact}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full bg-white text-[#5f6b8a] border border-[#d4d9e6] text-xs font-medium hover:border-[#123b8c] transition-colors"
                >
                  Contact creator (prototype)
                </a>
              </div>
            </div>

            <p className="text-[11px] text-[#9aa3c3]">
              SoulMade · Product #{product.id}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
