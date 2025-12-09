// app/creator-space/page.tsx
import Link from "next/link";

export default function CreatorSpacePage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f3f6fb] text-[#071428]">
      <main className="mx-auto max-w-4xl px-4 pt-8 pb-24 space-y-8">
        {/* Heading */}
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Creator space
          </h1>
          <p className="text-sm md:text-base text-[#5f6b8a] max-w-2xl">
            A dedicated space for differently-abled creators to share tutorials,
            skills, and lived experience — in formats like short lessons,
            courses, and story-based content.
          </p>
        </header>

        {/* Coming soon card */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-[#e3e7f2] shadow-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold">Learn from real creators</h2>
            <p className="text-sm text-[#5f6b8a]">
              In the future, you&apos;ll be able to follow creators, watch
              step-by-step tutorials, and learn how they built their products,
              brands, and careers.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#e3e7f2] shadow-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold">Share your knowledge</h2>
            <p className="text-sm text-[#5f6b8a]">
              Creators will be able to publish lessons, courses, and behind-the-scenes
              stories — and eventually earn from their knowledge, not just their products.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="rounded-2xl bg-[#f8f9ff] border border-[#e3e7f2] p-4 space-y-2">
          <p className="text-sm font-medium text-[#123b8c]">
            Creator space is coming soon.
          </p>
          <p className="text-xs text-[#5f6b8a]">
            For now, you can{" "}
            <Link
              href="/marketplace"
              className="text-[#c12a63] font-medium hover:underline"
            >
              browse the marketplace
            </Link>{" "}
            to discover products and stories from differently-abled creators.
          </p>
        </section>
      </main>
    </div>
  );
}
