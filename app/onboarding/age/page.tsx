"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5 mb-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-1 flex-1 rounded-full"
          style={i < step ? { background: "linear-gradient(90deg, #7c3aed, #f97316)" } : { background: "#e2e8f0" }}
        />
      ))}
    </div>
  );
}

export default function AgePage() {
  const [age, setAge] = useState(25);
  const router = useRouter();

  const handleInput = (val: string) => {
    const num = parseInt(val, 10);
    if (val === "") { setAge(0); return; }
    if (!isNaN(num)) setAge(Math.min(100, Math.max(0, num)));
  };

  const handleBlur = () => {
    if (age < 13) setAge(13);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col px-6 py-8 max-w-sm mx-auto w-full">
      <Link href="/sign-in" className="text-slate-400 hover:text-slate-600 transition-colors mb-6 self-start">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </Link>

      <ProgressBar step={1} />

      <p className="text-sm font-semibold text-violet-600 mb-2">Step 1 of 5</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">How old are you?</h1>
      <p className="text-slate-400 text-sm mb-0">We'll personalize your plan to match your age group.</p>

      <div className="flex flex-col items-center justify-center flex-1 gap-8 my-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAge((a) => Math.max(13, a - 1))}
            className="w-14 h-14 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold flex items-center justify-center active:scale-95 transition-transform"
          >
            −
          </button>

          <div className="flex flex-col items-center">
            <input
              type="number"
              value={age === 0 ? "" : age}
              onChange={(e) => handleInput(e.target.value)}
              onBlur={handleBlur}
              min={13}
              max={100}
              className="w-32 text-center text-6xl font-black text-slate-800 leading-none bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-slate-400 text-sm mt-2">years old</span>
          </div>

          <button
            onClick={() => setAge((a) => Math.min(100, a + 1))}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #7c3aed, #f97316)" }}
          >
            +
          </button>
        </div>

        <p className="text-xs text-slate-300">Tap the number to type directly</p>
      </div>

      <button
        onClick={() => {
          localStorage.setItem("stride_age", String(age));
          router.push("/onboarding/gender");
        }}
        disabled={age < 13}
        className={`w-full text-white font-bold text-base py-4 rounded-2xl mt-auto transition-opacity ${age < 13 ? "opacity-40" : ""}`}
        style={{ background: "linear-gradient(90deg, #7c3aed, #f97316)" }}
      >
        Continue
      </button>
    </main>
  );
}
