// app/hooks/useScreenReader.ts
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "soulmade_screen_reader";

export function useScreenReader() {
  const [enabled, setEnabled] = useState(false);

  // Read from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(saved === "on");
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!enabled) return;
      if (typeof window === "undefined") return;
      if (!("speechSynthesis" in window)) return;

      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [enabled]
  );

  return { enabled, speak };
}
