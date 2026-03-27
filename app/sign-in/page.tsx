"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BoltIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
    <path d="M 11 3 L 34 3 L 22 24 L 37 24 L 24 46 L 11 32 L 21 29 Z" fill="white" stroke="white" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function SignInPage() {
  const [mode, setMode] = useState<"create" | "signin">("create");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f8f7f4] flex flex-col px-6 py-8 max-w-sm mx-auto w-full">
      <Link href="/" className="text-slate-400 hover:text-slate-600 transition-colors mb-8 self-start">
        <BackArrow />
      </Link>

      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}>
          <BoltIcon />
        </div>
        <span className="font-bold text-lg text-slate-800">Stride</span>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-1">
        {mode === "create" ? "Create your account" : "Welcome back"}
      </h1>
      <p className="text-slate-400 text-sm mb-8">
        {mode === "create" ? "Start your fitness journey today." : "Sign in to continue your progress."}
      </p>

      <div className="flex bg-slate-100 rounded-2xl p-1 mb-8">
        {(["create", "signin"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === m ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
            }`}
          >
            {m === "create" ? "Create account" : "Sign in"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {mode === "create" && (
          <input type="text" placeholder="Full name" className="w-full px-4 py-4 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 text-sm" />
        )}
        <input type="email" placeholder="Email address" className="w-full px-4 py-4 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 text-sm" />
        <input type="password" placeholder="Password" className="w-full px-4 py-4 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 text-sm" />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-slate-400 text-xs font-medium">or continue with</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="flex gap-3 mb-8">
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Apple
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-slate-200 rounded-2xl text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
          <svg viewBox="0 0 24 24" className="w-4 h-4">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
      </div>

      <button
        onClick={() => router.push("/onboarding/age")}
        className="w-full bg-slate-900 text-white font-bold text-base py-4 rounded-xl hover:bg-slate-700 transition-colors"
      >
        {mode === "create" ? "Create account" : "Sign in"}
      </button>
    </main>
  );
}
