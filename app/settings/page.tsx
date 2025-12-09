"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "soulmade_screen_reader_enabled";

function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function SettingsPage() {
  const [enabled, setEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Read value from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(stored === "true");
    setHydrated(true);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      }

      if (next) {
        speak(
          "Screen reader helper turned on. Navigation buttons will be read out when you tap them."
        );
      } else {
        speak("Screen reader helper turned off.");
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-[#071428]">
      <header className="max-w-5xl mx-auto px-4 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <Link
          href="/"
          className="text-xs md:text-sm text-[#123b8c] hover:underline underline-offset-4"
        >
          ← Back to home
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-24">
        <section className="rounded-2xl bg-white border border-[#e3e7f2] shadow-sm p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold">Screen reader helper</h2>
              <p className="text-xs text-[#5f6b8a] mt-1">
                When turned on, SoulMade will read out important buttons in the
                bottom navigation and key sections to help with navigation.
              </p>
              <p className="text-[11px] text-[#9aa3c3] mt-3">
                This uses your device&apos;s built-in speech engine and is an
                experimental helper focused on navigation labels only.
              </p>
            </div>

            {/* BIGGER toggle switch */}
            <button
              type="button"
              onClick={toggle}
              role="switch"
              aria-checked={enabled}
              aria-disabled={!hydrated}
              className={`
                relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border
                transition-colors focus:outline-none focus:ring-2 focus:ring-[#123b8c]/40
                ${
                  enabled
                    ? "bg-[#123b8c] border-[#123b8c]"
                    : "bg-[#e3e7f2] border-[#c8cee4]"
                }
              `}
            >
              <span
                className={`
                  pointer-events-none inline-block h-7 w-7 translate-y-[1px] transform rounded-full bg-white shadow
                  transition-transform
                  ${enabled ? "translate-x-7" : "translate-x-[2px]"}
                `}
              />
            </button>
          </div>

          <p className="mt-3 text-[11px] text-[#5f6b8a]">
            Status:{" "}
            <span className="font-medium">
              {hydrated ? (enabled ? "On" : "Off") : "Loading…"}
            </span>
          </p>
        </section>
      </main>
    </div>
  );
}
