"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Role = "buyer" | "seller";

export default function SignupPage() {
  const [role, setRole] = useState<Role>("buyer");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName,
          role,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("Signup success! Check your email to verify your account.");
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#f3f6fb] flex items-center justify-center px-4 pt-6 pb-24">
    <div className="w-full max-w-md rounded-3xl bg-white shadow-lg border border-[#e3e7f2] p-6">
      {/* 👇 keep your existing form content here */}
      {/* Create account title, full name, email, password, buyer/seller toggle, button, etc. */}
        <div className="w-24 h-1.5 bg-slate-700 rounded-full mx-auto mb-5" />

        <div className="bg-white rounded-3xl p-5">
          <h1 className="text-xl font-bold mb-1 text-slate-900 text-center">
            Create account
          </h1>
          <p className="text-xs text-slate-600 mb-4 text-center">
            Join SoulMade as a buyer or seller.
          </p>

          {errorMsg && (
            <p className="mb-3 text-xs text-red-600 text-center">{errorMsg}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Full name
              </label>
              <input
                name="fullName"
                type="text"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <p className="block text-[11px] font-medium text-slate-700 mb-1">
                Join as
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`flex-1 py-2 rounded-full border text-xs ${
                    role === "buyer"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300"
                  }`}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  className={`flex-1 py-2 rounded-full border text-xs ${
                    role === "seller"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300"
                  }`}
                >
                  Seller
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-1 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Sign up"}
            </button>
          </form>

          <p className="mt-3 text-xs text-slate-600 text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
