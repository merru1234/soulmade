// app/product/[id]/page.tsx

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string | null;
  seller_contact: string | null;
  category: string | null;
  image_url: string | null;
};

// Same dummy products as marketplace (using /public images)
const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Bright clay earrings",
    price: 799,
    description:
      "Hand-painted clay earrings with vibrant colours. Lightweight and perfect for daily wear.",
    seller_contact: "https://wa.me/919999000001",
    category: "Jewelry & Personal Accessories",
    image_url: "/clay1.jpg",
  },
  {
    id: 2,
    name: "Soft-cover doodle notebook",
    price: 249,
    description:
      "A5 notebook with dotted pages and a hand-drawn cover illustration.",
    seller_contact: "https://wa.me/919999000002",
    category: "Art & Stationery",
    image_url: "/notebook.jpg",
  },
  {
    id: 3,
    name: "Vanilla soy candle",
    price: 499,
    description:
      "Slow-burning soy candle with a soft vanilla scent, poured in a reusable jar.",
    seller_contact: "https://wa.me/919999000003",
    category: "Handicrafts & Home Decor",
    image_url: "/candle.jpg",
  },
  {
    id: 4,
    name: "Speckled ceramic mug",
    price: 599,
    description:
      "Wheel-thrown ceramic mug with speckled glaze and a comfy handle.",
    seller_contact: "https://wa.me/919999000004",
    category: "Essentials & Daily Products",
    image_url: "/mug.jpg",
  },
  {
    id: 5,
    name: "Mini embroidered pouch",
    price: 349,
    description:
      "Zip pouch with colourful hand embroidery. Great for coins, keys, or earbuds.",
    seller_contact: "https://wa.me/919999000005",
    category: "Textile & Fabric Products",
    image_url: "/pouch.jpg",
  },
];

// 🔴 IMPORTANT: no "use client" at the top of this file

// Next 16 style: params is a Promise
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Unwrap the params Promise
  const { id } = await params;

  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return (
      <NotFoundCard message="That product link looks a bit strange." />
    );
  }

  const product = DUMMY_PRODUCTS.find((p) => p.id === numericId);

  if (!product) {
    return (
      <NotFoundCard message="We couldn’t find that product. It may have been removed." />
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
        {/* Top bar */}
        <header className="mb-6 flex items-center justify-between gap-4">
          {/* Brand (link to home) */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <Image
                src="/SoulMade.png"
                alt="SoulMade logo"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#16377A]">
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

        {/* Product card */}
        <main className="rounded-3xl bg-white shadow-sm border border-[#e3e7f2] p-4 md:p-6">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            {/* Image / visual */}
            <section className="space-y-3">
              <div className="relative w-full overflow-hidden rounded-2xl bg-[#eef1fb] border border-[#e0e4f4]">
                <div className="relative h-56 w-full md:h-72">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 320px, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9aa3c3] text-sm">
                      <span>Image coming soon</span>
                      <span className="text-xs">
                        The creator hasn&apos;t added a photo yet.
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {product.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fde7f1] text-[11px] font-medium text-[#c12a63]">
                  {product.category}
                </span>
              )}
            </section>

            {/* Details + actions */}
            <section className="flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#071428]">
                  {product.name}
                </h1>

                <p className="text-lg md:text-xl font-semibold text-[#123b8c]">
                  ₹{product.price}
                </p>

                <p className="text-sm leading-relaxed text-[#4f5d7a]">
                  {product.description ??
                    "This creator hasn’t written their full story yet, but your order still means a lot to them."}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#e3e7f2] bg-[#f8f9ff] p-4">
                <h2 className="text-sm font-medium text-[#071428]">
                  Ready to place an order?
                </h2>
                <p className="text-xs text-[#5f6b8a]">
                  This is just a prototype, so the buttons below don&apos;t
                  complete payment yet — but they show how the experience will feel.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  {/* Buy now */}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-[#c12a63] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#a91f54] transition-colors"
                  >
                    Buy now
                  </button>

                  {/* Add to cart */}
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-[#c8cee4] px-4 py-2 text-sm text-[#123b8c] hover:bg-[#e5ecff] transition-colors"
                  >
                    Add to cart
                  </button>

                  {/* Optional: contact creator */}
                  {product.seller_contact && (
                    <a
                      href={product.seller_contact}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[#e3e7f2] px-4 py-2 text-xs text-[#5f6b8a] hover:bg-[#f2f4ff] transition-colors"
                    >
                      Contact creator (prototype)
                    </a>
                  )}
                </div>

                <p className="text-[11px] text-[#9aa3c3]">
                  SoulMade · Product #{product.id}
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function NotFoundCard({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#f3f6fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border border-[#e3e7f2] p-6 text-center">
        <p className="mb-2 text-sm font-medium text-[#071428]">
          Product not available
        </p>
        <p className="mb-5 text-xs text-[#5f6b8a]">{message}</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center justify-center rounded-full bg-[#16377A] px-4 py-2 text-sm font-medium text-white hover:bg-[#123b8c] transition-colors"
        >
          Back to marketplace
        </Link>
      </div>
    </div>
  );
}
