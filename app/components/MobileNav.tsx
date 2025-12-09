"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  PenSquare,
  BriefcaseBusiness,
  User,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "soulmade_screen_reader_enabled";

type Tab = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

const tabs: Tab[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/marketplace", icon: ShoppingBag },
  { label: "Creator space", href: "/creator-space", icon: PenSquare },
  { label: "Jobs", href: "/jobs", icon: BriefcaseBusiness },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
];

function speak(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export default function MobileNav() {
  const pathname = usePathname();
  const [screenReaderOn, setScreenReaderOn] = useState(false);

  // Read initial value and watch for changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    setScreenReaderOn(stored === "true");

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue != null) {
        setScreenReaderOn(e.newValue === "true");
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <nav
      className="
        fixed bottom-4 left-1/2 z-40 w-full max-w-md -translate-x-1/2
        rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)]
        border border-[#e3e7f2] px-2 py-1.5
      "
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const isActive =
            (tab.href === "/" && pathname === "/") ||
            (tab.href !== "/" && pathname.startsWith(tab.href));

          const Icon = tab.icon;

          const handleClick = () => {
            if (screenReaderOn) {
              speak(tab.label);
            }
          };

          return (
            <li key={tab.label} className="flex-1">
              <Link
                href={tab.href}
                onClick={handleClick}
                className={`
                  flex flex-col items-center justify-center gap-0.5 rounded-full 
                  px-2 py-1 text-[10px] font-medium transition-colors
                  ${
                    isActive
                      ? "bg-[#eef1fb] text-[#071428]"
                      : "text-[#7d88a8] hover:text-[#123b8c]"
                  }
                `}
              >
                <Icon
                  size={18}
                  strokeWidth={2.3}
                  className={isActive ? "text-[#123b8c]" : "text-[#9aa3c3]"}
                />
                <span className="leading-none">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
