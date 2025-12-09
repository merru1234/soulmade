// app/jobs/page.tsx
import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f3f6fb] text-[#071428]">
      <main className="mx-auto max-w-4xl px-4 pt-8 pb-24 space-y-8">
        {/* Heading */}
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Job Board
          </h1>
          <p className="text-sm md:text-base text-[#5f6b8a] max-w-2xl">
            A curated job board focused on inclusive roles, gigs, and
            collaborations that actively welcome differently-abled talent.
          </p>
        </header>

        {/* Coming soon cards */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-[#e3e7f2] shadow-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold">Inclusive opportunities</h2>
            <p className="text-sm text-[#5f6b8a]">
              In the future, you&apos;ll find roles and gigs from employers who
              are explicit about accessibility, accommodations, and fair pay.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-[#e3e7f2] shadow-sm p-5 space-y-2">
            <h2 className="text-sm font-semibold">Built around creators</h2>
            <p className="text-sm text-[#5f6b8a]">
              Job suggestions will connect with marketplace activity and creator
              profiles, so opportunities match each person&apos;s skills and interests.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="rounded-2xl bg-[#f8f9ff] border border-[#e3e7f2] p-4 space-y-2">
          <p className="text-sm font-medium text-[#123b8c]">
            Job Board is coming soon.
          </p>
          <p className="text-xs text-[#5f6b8a]">
            While we build this out, you can{" "}
            <Link
              href="/marketplace"
              className="text-[#c12a63] font-medium hover:underline"
            >
              explore the marketplace
            </Link>{" "}
            and support differently-abled creators through their products.
          </p>
        </section>
      </main>
    </div>
  );
}
