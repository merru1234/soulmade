import Link from "next/link";
import Image from "next/image";
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

// Next 16 style: params is a Promise
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1) Unwrap route params
  const { id } = await params;

  // 2) Parse id
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return (
      <NotFoundCard message="That product link looks a bit strange." />
    );
  }

  // 3) Fetch product from Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", numericId)
    .single();

  const product = data as Product | null;

  // 4) Missing / not approved → treat as unavailable
  if (error || !product || (product.status && product.status !== "approved")) {
    return (
      <UnavailableCard message="This product isn’t available right now. It may have been removed or is awaiting review." />
    );
  }

  // 5) Happy path – show product
  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
        {/* Top bar */}
        <header className="mb-6 flex items-center justify-between gap-4">
          {/* Brand (home link) */}
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
            ← Back to products
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
                    "The creator hasn’t added a full description yet, but this product is available to order."}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-[#e3e7f2] bg-[#f8f9ff] p-4">
                <h2 className="text-sm font-medium text-[#071428]">
                  How would you like to continue?
                </h2>
                <p className="text-xs text-[#5f6b8a]">
                  Add this item to your cart to decide later, or use{" "}
                  <span className="font-medium">Buy now</span> to contact the
                  creator directly and place your order.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  {/* Add to cart – links to cart page for now */}
                  <Link
                    href="/cart"
                    className="inline-flex items-center justify-center rounded-full bg-[#c12a63] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#a91f54] transition-colors"
                  >
                    Add to cart
                  </Link>

                  {/* Buy now – opens WhatsApp / email link */}
                  {product.seller_contact && (
                    <a
                      href={product.seller_contact}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[#123b8c] px-4 py-2 text-sm font-medium text-[#123b8c] hover:bg-[#e5ecff] transition-colors"
                    >
                      Buy now
                    </a>
                  )}

                  <Link
                    href="/marketplace"
                    className="inline-flex items-center justify-center rounded-full border border-[#c8cee4] px-4 py-2 text-sm text-[#123b8c] hover:bg-[#e5ecff] transition-colors"
                  >
                    Browse more products
                  </Link>
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

/** Shown when the URL id can't even be parsed as a number, e.g. /product/abc */
function NotFoundCard({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#f3f6fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-sm border border-[#e3e7f2] p-6 text-center">
        <p className="mb-2 text-sm font-medium text-[#071428]">
          Invalid product link
        </p>
        <p className="mb-5 text-xs text-[#5f6b8a]">{message}</p>
        <Link
          href="/marketplace"
          className="inline-flex items-center justify-center rounded-full bg-[#16377A] px-4 py-2 text-sm font-medium text-white hover:bg-[#123b8c] transition-colors"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}

/** Shown when the id is valid, but the row is missing / not approved */
function UnavailableCard({ message }: { message: string }) {
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
          Back to products
        </Link>
      </div>
    </div>
  );
}
